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
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
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
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...userData,
        tokenBalance: 0,
        hasGoldenTicket: false,
        hasWelcomeBonus: false,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
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

  async updateOrderStatus(id: string, status: string, deliveryNotes?: string): Promise<Order> {
    const updateData: any = { status, updatedAt: new Date() };
    if (deliveryNotes) {
      updateData.deliveryNotes = deliveryNotes;
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
}

export const storage = new DatabaseStorage();
