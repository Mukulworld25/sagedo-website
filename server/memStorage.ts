import {
    type User,
    type InsertUser,
    type UpsertUser,
    type Service,
    type InsertService,
    type Order,
    type InsertOrder,
    type TokenTransaction,
    type InsertTokenTransaction,
    type Gallery,
    type InsertGallery,
    type SiteVisit,
    type InsertSiteVisit,
    type Feedback,
    type InsertFeedback,
    type ContactMessage,
    type InsertContactMessage,
    type OrderActivity,
    type InsertOrderActivity,
} from "@shared/schema";
import { IStorage } from "./storage";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class MemStorage implements IStorage {
    private users: Map<string, User> = new Map();
    private services: Map<string, Service> = new Map();
    private orders: Map<string, Order> = new Map();
    private tokenTransactions: Map<string, TokenTransaction> = new Map();
    private gallery: Map<string, Gallery> = new Map();
    private siteVisits: SiteVisit[] = [];
    private feedbacks: Feedback[] = [];
    private contactMessages: ContactMessage[] = [];
    private orderActivities: Map<string, OrderActivity[]> = new Map();
    private usedEmails: Set<string> = new Set();

    constructor() {
        this.seedData();
    }

    private seedData() {
        // Admin User
        const adminId = 'admin';
        const hash = bcrypt.hashSync('admin123', 10);
        const admin: User = {
            id: adminId,
            email: 'admin@sagedo.in',
            name: 'Admin User',
            passwordHash: hash,
            isAdmin: true,
            tokenBalance: 1000,
            hasGoldenTicket: true,
            hasWelcomeBonus: true,
            isEmailVerified: true,
            verificationToken: null,
            resetToken: null,
            resetTokenExpiry: null,
            googleId: null,
            githubId: null,
            isOnboardingCompleted: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            loginCount: 5,
            lastLoginAt: new Date(),
        };
        this.users.set(adminId, admin);

        // Seed Services (Indian Market Optimized 2025)
        const servicesList = [
            // Business (High Value, Trust)
            { id: '1', name: 'Business Logo & Branding', description: 'Professional Logo, Visiting Cards & Letterhead', fullDescription: 'Complete branding kit for your business.', price: 9999, category: 'Business', imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop', isGoldenEligible: true, freeEligible: false, deliveryTime: '3-4 Days', revisionsIncluded: 3, clickCount: 45 },
            { id: '2', name: 'Business Website (5 Pages)', description: 'Full Website for your Company', fullDescription: 'Get your business online with a professional 5-page website.', price: 14999, category: 'Business', imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop', isGoldenEligible: false, freeEligible: false, deliveryTime: '7 Days', revisionsIncluded: 3, clickCount: 32 },
            { id: '3', name: 'Google & Insta Ads Setup', description: 'Run Ads to get more Customers', fullDescription: 'We set up high-converting ads for you.', price: 7999, category: 'Business', imageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=300&fit=crop', isGoldenEligible: true, freeEligible: false, deliveryTime: '2 Days', revisionsIncluded: 2, clickCount: 28 },

            // Student (Pocket Friendly)
            { id: '13', name: 'Assignment Writing', description: 'Handwritten or Typed Assignments', fullDescription: 'We write your assignments for you.', price: 499, category: 'Student', imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop', isGoldenEligible: true, freeEligible: true, deliveryTime: '24h', revisionsIncluded: 1, clickCount: 65 },
            { id: '14', name: 'College Project PPT', description: 'PowerPoint Presentation for Projects', fullDescription: 'A+ Grade Presentations.', price: 699, category: 'Student', imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=300&fit=crop', isGoldenEligible: true, freeEligible: true, deliveryTime: '24h', revisionsIncluded: 1, clickCount: 50 },

            // Professional (Career Growth)
            { id: '21', name: 'Resume Writing (CV)', description: 'Professional CV to get Hired', fullDescription: 'ATS Friendly Resume.', price: 2499, category: 'Professional', imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop', isGoldenEligible: true, freeEligible: true, deliveryTime: '2 Days', revisionsIncluded: 2, clickCount: 40 },
            { id: '22', name: 'LinkedIn Profile Makeover', description: 'Rank High on LinkedIn', fullDescription: 'Attract recruiters.', price: 1999, category: 'Professional', imageUrl: 'https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=400&h=300&fit=crop', isGoldenEligible: true, freeEligible: true, deliveryTime: '2 Days', revisionsIncluded: 2, clickCount: 35 },

            // Personal
            { id: '31', name: 'Viral Reel Script', description: 'Scripts for Instagram/YouTube', fullDescription: 'Go viral.', price: 299, category: 'Personal', imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop', isGoldenEligible: true, freeEligible: true, deliveryTime: '24h', revisionsIncluded: 1, clickCount: 20 },
        ];

        servicesList.forEach(s => {
            this.services.set(s.id, { ...s, whatYouGet: [], process: [] } as any);
        });

        // Seed Orders
        const order1: Order = {
            id: uuidv4(),
            userId: adminId,
            serviceId: '1',
            status: 'completed',
            amount: 199,
            requirements: 'Test order',
            createdAt: new Date(),
            updatedAt: new Date(),
            paymentId: 'pay_123',
            paymentStatus: 'captured',
            deliveryNotes: 'Here is your file.',
            deliveryFileUrls: [],
            deliveredAt: new Date(),
        };
        this.orders.set(order1.id, order1);
    }

    // User
    async getUser(id: string): Promise<User | undefined> { return this.users.get(id); }
    async getUserByEmail(email: string): Promise<User | undefined> {
        return Array.from(this.users.values()).find(u => u.email === email);
    }
    async createUser(user: any): Promise<User> {
        const newUser = { ...user, id: user.id || uuidv4(), createdAt: new Date() };
        this.users.set(newUser.id, newUser);
        return newUser;
    }
    async upsertUser(user: UpsertUser): Promise<User> {
        const existing = Array.from(this.users.values()).find(u => u.email === user.email);
        const id = existing ? existing.id : uuidv4();
        const newUser = { ...existing, ...user, id } as User;
        this.users.set(id, newUser);
        return newUser;
    }
    async deleteUser(id: string): Promise<void> { this.users.delete(id); }
    async getUserByVerificationToken(token: string): Promise<User | undefined> { return undefined; }
    async verifyUserEmail(userId: string): Promise<void> {
        const u = this.users.get(userId);
        if (u) { u.isEmailVerified = true; this.users.set(userId, u); }
    }
    async submitOnboarding(userId: string, data: Partial<User>): Promise<User> {
        const u = this.users.get(userId);
        if (!u) throw new Error('User not found');
        const updated = { ...u, ...data, isOnboardingCompleted: true };
        this.users.set(userId, updated);
        return updated;
    }
    async getUserByGoogleId(id: string): Promise<User | undefined> { return undefined; }
    async getUserByGithubId(id: string): Promise<User | undefined> { return undefined; }

    // Services
    async getAllServices(): Promise<Service[]> { return Array.from(this.services.values()); }
    async getServiceById(id: string): Promise<Service | undefined> { return this.services.get(id); }
    async createService(service: InsertService): Promise<Service> {
        const s = { ...service, id: uuidv4() } as Service;
        this.services.set(s.id, s);
        return s;
    }

    // Orders
    async getAllOrders(): Promise<Order[]> { return Array.from(this.orders.values()); }
    async getOrderById(id: string): Promise<Order | undefined> { return this.orders.get(id); }
    async getOrdersByUserId(userId: string): Promise<Order[]> {
        return Array.from(this.orders.values()).filter(o => o.userId === userId);
    }
    async createOrder(order: InsertOrder): Promise<Order> {
        const newOrder = { ...order, id: uuidv4(), createdAt: new Date(), updatedAt: new Date() } as Order;
        this.orders.set(newOrder.id, newOrder);
        return newOrder;
    }
    async updateOrderStatus(id: string, status: string): Promise<Order> {
        const o = this.orders.get(id);
        if (!o) throw new Error('Order not found');
        o.status = status;
        this.orders.set(id, o);
        return o;
    }

    // Tokens
    async getUserTokenBalance(userId: string): Promise<number> {
        return this.users.get(userId)?.tokenBalance || 0;
    }
    async addTokenTransaction(transaction: InsertTokenTransaction): Promise<TokenTransaction> {
        const t = { ...transaction, id: uuidv4(), createdAt: new Date() } as TokenTransaction;
        this.tokenTransactions.set(t.id, t);
        return t;
    }
    async getTokenTransactionsByUserId(userId: string): Promise<TokenTransaction[]> {
        return Array.from(this.tokenTransactions.values()).filter(t => t.userId === userId);
    }

    // Password reset (stub)
    async setResetToken(userId: string, token: string, expiry: Date): Promise<void> { }
    async getUserByResetToken(token: string): Promise<User | undefined> { return undefined; }
    async updateUserPassword(userId: string, passwordHash: string): Promise<void> { }
    async clearResetToken(userId: string): Promise<void> { }
    async getDashboardStats() {
        return {
            totalUsers: this.users.size,
            todaySignups: 0,
            totalLogins: 10,
            totalVisitors: 5,
            mostClickedServices: Array.from(this.services.values()).slice(0, 5),
            recentVisitors: [],
            recentSignups: [],
        };
    }

    // Others (stub)
    async getAllGalleryItems(): Promise<Gallery[]> { return []; }
    async getVisibleGalleryItems(): Promise<Gallery[]> { return []; }
    async createGalleryItem(item: InsertGallery): Promise<Gallery> { throw new Error('Not impl'); }
    async logVisit(visit: InsertSiteVisit): Promise<void> { }
    async incrementServiceClick(serviceId: string): Promise<void> { }
    async createFeedback(feedback: InsertFeedback): Promise<Feedback> { throw new Error('Not impl'); }
    async getAllFeedbacks(): Promise<Feedback[]> { return []; }
    async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> { throw new Error('Not impl'); }

    // Order Activity
    async createOrderActivity(activity: InsertOrderActivity): Promise<OrderActivity> {
        const newActivity = { ...activity, id: uuidv4(), createdAt: new Date() } as OrderActivity;
        const orderActivities = this.orderActivities.get(activity.orderId) || [];
        orderActivities.push(newActivity);
        this.orderActivities.set(activity.orderId, orderActivities);
        return newActivity;
    }
    async getOrderActivities(orderId: string): Promise<OrderActivity[]> { return this.orderActivities.get(orderId) || []; }
    async markActivitiesAsRead(orderId: string): Promise<void> { }
    async getUnreadActivityCount(orderId: string): Promise<number> { return 0; }

    // Abuse
    async isEmailUsed(email: string): Promise<boolean> { return this.usedEmails.has(email); }
    async markEmailUsed(email: string, reason: string): Promise<void> { this.usedEmails.add(email); }

    // User updates
    async updateUserLastLogin(userId: string): Promise<void> { }
    async checkReferral(userId: string, email: string): Promise<boolean> { return false; }
    async addReferral(userId: string, email: string): Promise<void> { }
    async getLastTokenTransactionByType(userId: string, type: string): Promise<TokenTransaction | undefined> { return undefined; }
}
