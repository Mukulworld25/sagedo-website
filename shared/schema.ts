import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  integer,
  text,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  passwordHash: varchar("password_hash"),
  name: varchar("name"),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  tokenBalance: integer("token_balance").default(0).notNull(),
  hasGoldenTicket: boolean("has_golden_ticket").default(false).notNull(),
  hasWelcomeBonus: boolean("has_welcome_bonus").default(false).notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
  loginCount: integer("login_count").default(0).notNull(),
  lastLoginAt: timestamp("last_login_at"),
  resetToken: varchar("reset_token"),
  resetTokenExpiry: timestamp("reset_token_expiry"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Services catalog
export const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in rupees
  category: varchar("category", { length: 50 }).notNull(), // Business, Student, Professional, Personal
  imageUrl: text("image_url"),
  isGoldenEligible: boolean("is_golden_eligible").default(false).notNull(),
  deliveryTime: text("delivery_time"), // e.g., "24 hours", "2-3 days"
  clickCount: integer("click_count").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Orders
export const orders = pgTable("orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  serviceId: varchar("service_id"),
  serviceName: text("service_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerName: text("customer_name"),
  requirements: text("requirements"),
  fileUrls: text("file_urls").array(),
  status: varchar("status", { length: 50 }).default("pending").notNull(), // pending, processing, finalizing, delivered
  paidWithTokens: boolean("paid_with_tokens").default(false),
  paidWithGolden: boolean("paid_with_golden").default(false),
  amountPaid: integer("amount_paid").default(0),
  paymentId: varchar("payment_id"), // Razorpay payment ID
  paymentStatus: varchar("payment_status", { length: 50 }).default("pending"), // pending, paid, failed
  deliveryPreference: varchar("delivery_preference", { length: 20 }).default("platform"), // platform, email
  deliveryFileUrls: text("delivery_file_urls").array(), // Files uploaded by admin for delivery
  deliveryNotes: text("delivery_notes"),
  deliveredAt: timestamp("delivered_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Token transactions
export const tokenTransactions = pgTable("token_transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  amount: integer("amount").notNull(), // positive for earn, negative for spend
  type: varchar("type", { length: 50 }).notNull(), // welcome, referral, survey, daily_login, spend
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Gallery items (testimonials and work showcase)
export const gallery = pgTable("gallery", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: varchar("type", { length: 50 }).notNull(), // testimonial, work_showcase
  title: text("title"),
  content: text("content"),
  imageUrl: text("image_url"),
  clientName: text("client_name"),
  clientRole: text("client_role"),
  rating: integer("rating"), // 1-5 stars for testimonials
  isVisible: boolean("is_visible").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Site visits tracking
export const siteVisits = pgTable("site_visits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  ipHash: varchar("ip_hash"), // Hashed IP for privacy
  userAgent: text("user_agent"),
  path: varchar("path"),
  visitedAt: timestamp("visited_at").defaultNow(),
});

// Feedback system
export const feedbacks = pgTable("feedbacks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id), // Nullable for anonymous feedback
  message: text("message").notNull(),
  rating: integer("rating"), // 1-5 stars
  createdAt: timestamp("created_at").defaultNow(),
});

// Track emails that have used welcome bonus (prevents abuse on account delete/recreate)
export const usedEmails = pgTable("used_emails", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique().notNull(),
  reason: varchar("reason", { length: 50 }).default("welcome_bonus"), // welcome_bonus, golden_ticket_used
  usedAt: timestamp("used_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  orders: many(orders),
  transactions: many(tokenTransactions),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  service: one(services, {
    fields: [orders.serviceId],
    references: [services.id],
  }),
}));

export const tokenTransactionsRelations = relations(tokenTransactions, ({ one }) => ({
  user: one(users, {
    fields: [tokenTransactions.userId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertServiceSchema = createInsertSchema(services).omit({
  id: true,
  createdAt: true,
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTokenTransactionSchema = createInsertSchema(tokenTransactions).omit({
  id: true,
  createdAt: true,
});

export const insertGallerySchema = createInsertSchema(gallery).omit({
  id: true,
  createdAt: true,
});

export const insertSiteVisitSchema = createInsertSchema(siteVisits).omit({
  id: true,
  visitedAt: true,
});

export const insertFeedbackSchema = createInsertSchema(feedbacks).omit({
  id: true,
  createdAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type TokenTransaction = typeof tokenTransactions.$inferSelect;
export type InsertTokenTransaction = z.infer<typeof insertTokenTransactionSchema>;

export type Gallery = typeof gallery.$inferSelect;
export type InsertGallery = z.infer<typeof insertGallerySchema>;

export type SiteVisit = typeof siteVisits.$inferSelect;
export type InsertSiteVisit = z.infer<typeof insertSiteVisitSchema>;

export type Feedback = typeof feedbacks.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
