import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import session from 'express-session';
import connectPg from 'connect-pg-simple';
import type { Express, RequestHandler } from 'express';
import { storage } from './storage';

// Session setup
export function setupAuth(app: Express) {
    const pgStore = connectPg(session);

    const isProduction = process.env.NODE_ENV === 'production';

    app.use(session({
        store: new pgStore({
            conString: process.env.DATABASE_URL,
            createTableIfMissing: true,
            tableName: 'sessions',
        }),
        secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
        resave: false,
        saveUninitialized: false,
        proxy: true, // Required for Render/Vercel behind proxy
        cookie: {
            httpOnly: true,
            secure: isProduction, // HTTPS only in production
            sameSite: isProduction ? 'none' : 'lax', // 'none' required for cross-domain in production
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
    }));
}

// Customer Registration
export async function registerCustomer(email: string, password: string, name: string) {
    // Check if user exists
    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
        throw new Error('Email already registered');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await storage.createUser({
        id: uuidv4(),
        email,
        passwordHash,
        name,
        isAdmin: false,
        tokenBalance: 150, // Welcome bonus
        hasGoldenTicket: true,
        hasWelcomeBonus: true,
    });

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

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new Error('Invalid credentials');

    return user;
}

// Middleware
export const isAuthenticated: RequestHandler = (req: any, res, next) => {
    if (req.session.user) return next();
    res.status(401).json({ message: 'Unauthorized' });
};

export const isAdmin: RequestHandler = (req: any, res, next) => {
    if (req.session.user?.isAdmin) return next();
    res.status(403).json({ message: 'Forbidden: Admin access required' });
};
