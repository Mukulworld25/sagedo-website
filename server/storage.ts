import {
  users,
  services,
  orders,
  tokenTransactions,
  gallery,
  type User,
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
  siteVisits,
  type Feedback,
  type InsertFeedback,
  feedbacks,
  type ContactMessage,
  type InsertContactMessage,
  contactMessages,
  type OrderActivity,
  type InsertOrderActivity,
  orderActivities,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql, gte } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: any): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  deleteUser(id: string): Promise<void>;
  getUserByVerificationToken(token: string): Promise<User | undefined>;
  verifyUserEmail(userId: string): Promise<void>;
  submitOnboarding(userId: string, data: Partial<User>): Promise<User>; // New Onboarding Method

  // Service operations
  getAllServices(): Promise<Service[]>;
  getServiceById(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;

  // Order operations
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order | undefined>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: string, status: string, deliveryNotes?: string): Promise<Order>;

  // Token operations
  getUserTokenBalance(userId: string): Promise<number>;
  addTokenTransaction(transaction: InsertTokenTransaction): Promise<TokenTransaction>;
  getTokenTransactionsByUserId(userId: string): Promise<TokenTransaction[]>;

  // Gallery operations
  getAllGalleryItems(): Promise<Gallery[]>;
  getVisibleGalleryItems(): Promise<Gallery[]>;
  createGalleryItem(item: InsertGallery): Promise<Gallery>;

  // Analytics operations
  logVisit(visit: InsertSiteVisit): Promise<void>;
  incrementServiceClick(serviceId: string): Promise<void>;
  getDashboardStats(): Promise<{
    totalLogins: number;
    totalVisitors: number;
    mostClickedServices: Service[];
    recentVisitors: SiteVisit[];
  }>;

  // Feedback operations
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getAllFeedbacks(): Promise<Feedback[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    if (!db) throw new Error('Database not configured');
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(userData: any): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async getUserByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.googleId, googleId));
    return user;
  }

  async getUserByGithubId(githubId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.githubId, githubId));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        // Use passed values, only default to 0/false if not provided
        tokenBalance: userData.tokenBalance ?? 0,
        hasGoldenTicket: userData.hasGoldenTicket ?? false,
        hasWelcomeBonus: userData.hasWelcomeBonus ?? false,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          // On update, preserve passed values including tokenBalance
          tokenBalance: userData.tokenBalance,
          hasGoldenTicket: userData.hasGoldenTicket,
          hasWelcomeBonus: userData.hasWelcomeBonus,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    // Delete all related data first (cascade delete)
    await db.delete(tokenTransactions).where(eq(tokenTransactions.userId, id));
    await db.delete(orders).where(eq(orders.userId, id));
    await db.delete(users).where(eq(users.id, id));
  }

  async getUserByVerificationToken(token: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.verificationToken, token));
    return user;
  }

  async verifyUserEmail(userId: string): Promise<void> {
    await db.update(users)
      .set({
        isEmailVerified: true,
        verificationToken: null,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId));
  }

  async submitOnboarding(userId: string, data: any): Promise<User> {
    const [updatedUser] = await db
      .update(users)
      .set({
        ...data,
        isOnboardingCompleted: true,
        updatedAt: new Date()
      })
      .where(eq(users.id, userId))
      .returning();
    return updatedUser;
  }

  // Password reset operations
  async setResetToken(userId: string, token: string, expiry: Date): Promise<void> {
    await db
      .update(users)
      .set({ resetToken: token, resetTokenExpiry: expiry })
      .where(eq(users.id, userId));
  }

  async getUserByResetToken(token: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.resetToken, token));
    return user;
  }

  async updateUserPassword(userId: string, passwordHash: string): Promise<void> {
    await db
      .update(users)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(users.id, userId));
  }

  async clearResetToken(userId: string): Promise<void> {
    await db
      .update(users)
      .set({ resetToken: null, resetTokenExpiry: null })
      .where(eq(users.id, userId));
  }

  // Service operations
  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getServiceById(id: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }

  // Order operations
  async getAllOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrderById(id: string): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    return await db
      .select()
      .from(orders)
      .where(eq(orders.userId, userId))
      .orderBy(desc(orders.createdAt));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }

  async updateOrderStatus(id: string, status: string, deliveryNotes?: string, deliveryFileUrls?: string[]): Promise<Order> {
    const updateData: any = { status, updatedAt: new Date() };
    if (deliveryNotes) {
      updateData.deliveryNotes = deliveryNotes;
    }
    if (deliveryFileUrls && deliveryFileUrls.length > 0) {
      updateData.deliveryFileUrls = deliveryFileUrls;
    }
    if (status === "delivered") {
      updateData.deliveredAt = new Date();
    }

    const [updatedOrder] = await db
      .update(orders)
      .set(updateData)
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder;
  }

  // Token operations
  async getUserTokenBalance(userId: string): Promise<number> {
    const user = await this.getUser(userId);
    return user?.tokenBalance || 0;
  }

  async addTokenTransaction(transaction: InsertTokenTransaction): Promise<TokenTransaction> {
    const [newTransaction] = await db
      .insert(tokenTransactions)
      .values(transaction)
      .returning();

    // Update user's token balance
    const user = await this.getUser(transaction.userId);
    if (user) {
      const newBalance = (user.tokenBalance || 0) + transaction.amount;
      await db
        .update(users)
        .set({ tokenBalance: newBalance })
        .where(eq(users.id, transaction.userId));
    }

    return newTransaction;
  }

  async getTokenTransactionsByUserId(userId: string): Promise<TokenTransaction[]> {
    return await db
      .select()
      .from(tokenTransactions)
      .where(eq(tokenTransactions.userId, userId))
      .orderBy(desc(tokenTransactions.createdAt));
  }

  // Gallery operations
  async getAllGalleryItems(): Promise<Gallery[]> {
    return await db.select().from(gallery).orderBy(desc(gallery.createdAt));
  }

  async getVisibleGalleryItems(): Promise<Gallery[]> {
    return await db
      .select()
      .from(gallery)
      .where(eq(gallery.isVisible, true))
      .orderBy(desc(gallery.createdAt));
  }

  async createGalleryItem(item: InsertGallery): Promise<Gallery> {
    const [newItem] = await db.insert(gallery).values(item).returning();
    return newItem;
  }

  // Analytics operations
  async logVisit(visit: InsertSiteVisit): Promise<void> {
    await db.insert(siteVisits).values(visit);
  }

  async incrementServiceClick(serviceId: string): Promise<void> {
    await db
      .update(services)
      .set({ clickCount: sql`${services.clickCount} + 1` })
      .where(eq(services.id, serviceId));
  }

  async getDashboardStats() {
    // Total users count
    const [userStats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users);

    // Today's signups (users created today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [todaySignups] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(gte(users.createdAt, today));

    // Total logins (sum of loginCount from users)
    const [loginStats] = await db
      .select({ total: sql<number>`sum(${users.loginCount})` })
      .from(users);

    // Total visitors (count of siteVisits)
    const [visitorStats] = await db
      .select({ count: sql<number>`count(*)` })
      .from(siteVisits);

    // Most clicked services
    const mostClickedServices = await db
      .select()
      .from(services)
      .orderBy(desc(services.clickCount))
      .limit(5);

    // Recent visitors
    const recentVisitors = await db
      .select()
      .from(siteVisits)
      .orderBy(desc(siteVisits.visitedAt))
      .limit(10);

    // Recent signups (for click-to-view)
    const recentSignups = await db
      .select({ id: users.id, email: users.email, name: users.name, createdAt: users.createdAt })
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(10);

    return {
      totalUsers: Number(userStats?.count || 0),
      todaySignups: Number(todaySignups?.count || 0),
      totalLogins: Number(loginStats?.total || 0),
      totalVisitors: Number(visitorStats?.count || 0),
      mostClickedServices,
      recentVisitors,
      recentSignups,
    };
  }

  // Feedback operations
  async createFeedback(feedback: InsertFeedback): Promise<Feedback> {
    const [newFeedback] = await db.insert(feedbacks).values(feedback).returning();
    return newFeedback;
  }

  async getAllFeedbacks(): Promise<Feedback[]> {
    return await db.select().from(feedbacks).orderBy(desc(feedbacks.createdAt));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db.insert(contactMessages).values(message).returning();
    return newMessage;
  }

  // Order Activity operations
  async createOrderActivity(activity: InsertOrderActivity): Promise<OrderActivity> {
    const [newActivity] = await db.insert(orderActivities).values(activity).returning();
    return newActivity;
  }

  async getOrderActivities(orderId: string): Promise<OrderActivity[]> {
    return await db
      .select()
      .from(orderActivities)
      .where(eq(orderActivities.orderId, orderId))
      .orderBy(desc(orderActivities.createdAt));
  }

  async markActivitiesAsRead(orderId: string): Promise<void> {
    await db
      .update(orderActivities)
      .set({ isRead: true })
      .where(eq(orderActivities.orderId, orderId));
  }

  async getUnreadActivityCount(orderId: string): Promise<number> {
    const [result] = await db
      .select({ count: sql<number>`count(*)` })
      .from(orderActivities)
      .where(eq(orderActivities.orderId, orderId))
      .where(eq(orderActivities.isRead, false));
    return Number(result?.count || 0);
  }

  // Email abuse prevention - track emails that have used welcome bonus
  async isEmailUsed(email: string): Promise<boolean> {
    const { usedEmails } = await import("@shared/schema");
    const [result] = await db.select().from(usedEmails).where(eq(usedEmails.email, email.toLowerCase()));
    return !!result;
  }

  async markEmailUsed(email: string, reason: string = 'welcome_bonus'): Promise<void> {
    const { usedEmails } = await import("@shared/schema");
    await db.insert(usedEmails).values({
      email: email.toLowerCase(),
      reason
    }).onConflictDoNothing();
  }

  // Token validation methods
  async updateUserLastLogin(userId: string): Promise<void> {
    await db.update(users).set({
      lastLoginAt: new Date(),
    }).where(eq(users.id, userId));
  }

  async checkReferral(userId: string, referralEmail: string): Promise<boolean> {
    // Check token transactions for existing referral
    const [existing] = await db.select()
      .from(tokenTransactions)
      .where(eq(tokenTransactions.userId, userId))
      .where(eq(tokenTransactions.type, 'referral'))
      .where(sql`${tokenTransactions.description} ILIKE ${'%' + referralEmail.toLowerCase() + '%'}`);
    return !!existing;
  }

  async addReferral(userId: string, referralEmail: string): Promise<void> {
    // We just store the referral email in the description - no separate table needed
    // The transaction will be added by the calling code
  }

  async getLastTokenTransactionByType(userId: string, type: string): Promise<TokenTransaction | undefined> {
    const [result] = await db.select()
      .from(tokenTransactions)
      .where(eq(tokenTransactions.userId, userId))
      .where(eq(tokenTransactions.type, type))
      .orderBy(desc(tokenTransactions.createdAt))
      .limit(1);
    return result;
  }
}

import { MemStorage } from "./memStorage";

console.log("Storage check: DATABASE_URL is", process.env.DATABASE_URL ? "SET" : "NOT SET");
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
