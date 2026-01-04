import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import type { Express, RequestHandler } from 'express';
import { storage } from './storage';
import { pool } from './db';
import { sendVerificationEmail } from './email';
import { InsertUser } from '@shared/schema';

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { authenticator } from 'otplib';
import qrcode from 'qrcode';

// Session setup
export function setupAuth(app: Express) {
    const pgStore = connectPg(session);

    // Always use cross-origin settings since Vercel frontend → Render backend
    const isProduction = process.env.NODE_ENV === 'production' ||
        process.env.RENDER === 'true' ||
        !process.env.NODE_ENV; // Default to production behavior

    console.log('Session config:', { isProduction, NODE_ENV: process.env.NODE_ENV });

    app.use(session({
        store: new pgStore({
            pool, // Use shared connection pool with SSL config
            createTableIfMissing: true,
            tableName: 'sessions',
        }),
        secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
        resave: false,
        saveUninitialized: false,
        proxy: true, // Required for Render/Vercel behind proxy
        cookie: {
            httpOnly: true,
            secure: true, // Always HTTPS for cross-origin
            sameSite: 'lax', // 'lax' is more robust for same-domain (proxied) requests
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
    }));

    // Passport Init
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user: any, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        try {
            if (id === 'admin') {
                return done(null, { id: 'admin', isAdmin: true, name: 'Admin', email: process.env.ADMIN_EMAIL });
            }
            const user = await storage.getUser(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });

    // Google Strategy (Fail-safe: Only if keys exist)
    if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
            passReqToCallback: true
        }, async (req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
            try {
                // Check if user exists by Google ID
                let user = await storage.getUserByGoogleId(profile.id);

                // If not, check by email
                if (!user && profile.emails && profile.emails[0]) {
                    const email = profile.emails[0].value;
                    const existingUser = await storage.getUserByEmail(email);

                    if (existingUser) {
                        // Link Google ID to existing user
                        user = await storage.upsertUser({ ...existingUser, googleId: profile.id } as any);
                    } else {
                        // Create new user
                        const userData: any = {
                            email,
                            name: profile.displayName,
                            googleId: profile.id,
                            passwordHash: '', // No password for social login
                            tokenBalance: 0,
                            hasGoldenTicket: true,
                            hasWelcomeBonus: true,
                            isEmailVerified: true, // Trusted provider
                            verificationToken: uuidv4()
                        };
                        user = await storage.createUser(userData);
                        await sendVerificationEmail(email, profile.displayName, userData.verificationToken).catch(console.error);
                    }
                }
                return done(null, user);
            } catch (err) {
                return done(err as any);
            }
        }));
    }

    // GitHub Strategy (Fail-safe)
    if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
        passport.use(new GitHubStrategy({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/api/auth/github/callback"
        }, async (accessToken: any, refreshToken: any, profile: any, done: any) => {
            try {
                let user = await storage.getUserByGithubId(profile.id);

                if (!user && profile.emails && profile.emails[0]) {
                    const email = profile.emails[0].value;
                    const existingUser = await storage.getUserByEmail(email);

                    if (existingUser) {
                        user = await storage.upsertUser({ ...existingUser, githubId: profile.id } as any);
                    } else {
                        const userData: any = {
                            email,
                            name: profile.displayName || profile.username,
                            githubId: profile.id,
                            passwordHash: '',
                            tokenBalance: 0,
                            hasGoldenTicket: true,
                            hasWelcomeBonus: true,
                            isEmailVerified: true,
                            verificationToken: uuidv4()
                        };
                        user = await storage.createUser(userData);
                        await sendVerificationEmail(email, userData.name, userData.verificationToken).catch(console.error);
                    }
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }));
    }
}

// Customer Registration
export async function registerCustomer(email: string, password: string, name: string) {
    // Check if user exists
    // SECURITY: Normalize email to prevent alias abuse (e.g. gmail+1)
    // Remove dots before @, remove everything after + before @
    const normalizeEmail = (e: string) => {
        const [local, domain] = e.split('@');
        if (!domain) return e;
        if (domain.toLowerCase() === 'gmail.com' || domain.toLowerCase() === 'googlemail.com') {
            // Gmail specific: dots ignored, + ignored
            let cleanLocal = local.split('+')[0].replace(/\./g, '');
            return `${cleanLocal}@${domain}`;
        }
        return e;
    };

    const normalizedEmail = normalizeEmail(email);

    // Check if user exists (using normalized email lookup would be ideal, but for now strict check)
    // Actually, we should check if THIS email (normalized) matches any existing usage.
    // Since we store raw emails, checking 'normalized' against 'raw' is hard without scanning.
    // BETTER FIX: Check if 'isEmailUsed' (used_emails table) has this normalized email?

    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
        throw new Error('Email already registered');
    }

    // Check if this email (NORMALIZED) has previously used welcome bonus
    // We update 'isEmailUsed' to use normalized emails? Or just normalize here.
    const emailPreviouslyUsed = await storage.isEmailUsed(normalizedEmail);

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user - Golden Ticket on first signup, tokens start at 0 (must be earned)
    const verificationToken = uuidv4();

    // Cast to any to bypass strict type checking for now, or use InsertUser
    const userData: any = {
        id: uuidv4(),
        email,
        passwordHash,
        name,
        isAdmin: false,
        tokenBalance: 0,
        hasGoldenTicket: emailPreviouslyUsed ? false : true,
        hasWelcomeBonus: emailPreviouslyUsed ? false : true,
        isEmailVerified: false,
        verificationToken,
    };

    const user = await storage.createUser(userData);

    // Send verification email
    try {
        await sendVerificationEmail(email, name, verificationToken);
    } catch (error) {
        console.error("Failed to send verification email during registration:", error);
    }

    // Mark email as used for future abuse prevention
    if (!emailPreviouslyUsed) {
        await storage.markEmailUsed(normalizedEmail, 'welcome_bonus');
    }

    return user;
}

// Customer/Admin Login
export async function loginUser(email: string, password: string) {
    // Check if admin
    if (email === process.env.ADMIN_EMAIL) {
        const isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!);
        if (!isValid) throw new Error('Invalid credentials');

        return {
            id: 'admin',
            email: process.env.ADMIN_EMAIL!,
            name: 'Admin',
            isAdmin: true,
            tokenBalance: 0,
            hasGoldenTicket: false,
            hasWelcomeBonus: false,
        };
    }

    // Check customer
    const user = await storage.getUserByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.passwordHash || '');
    if (!isValid) throw new Error('Invalid credentials');

    return user;
}

// Middleware
export const isAuthenticated: RequestHandler = (req: any, res, next) => {
    if (req.session.user) return next();
    res.status(401).json({ message: 'Unauthorized' });
};

// 2FA Helpers
export const generate2FASecret = () => authenticator.generateSecret();

export const generate2FAQRCode = async (email: string, secret: string) => {
    const otpauth = authenticator.keyuri(email, 'SAGEDO AI', secret);
    return await qrcode.toDataURL(otpauth);
};

export const verify2FAToken = (token: string, secret: string) => authenticator.verify({ token, secret });

export const isAdmin: RequestHandler = (req: any, res, next) => {
    if (req.session.user?.isAdmin) return next();
    res.status(403).json({ message: 'Forbidden: Admin access required' });
};
