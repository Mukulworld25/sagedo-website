import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from "@shared/schema";

// Check if DATABASE_URL is properly configured
const DATABASE_URL = process.env.DATABASE_URL;
const isDatabaseConfigured = DATABASE_URL && !DATABASE_URL.includes('placeholder');

if (!isDatabaseConfigured) {
    console.warn('⚠️  DATABASE_URL not configured. Database features will be disabled.');
    console.warn('⚠️  To enable database features, set up a Neon PostgreSQL database and update .env');
}

// Create pool with production-grade PostgreSQL driver
export const pool = isDatabaseConfigured
    ? new Pool({
        connectionString: DATABASE_URL,
        max: 20, // Maximum pool size
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 30000, // 30s timeout for Neon wake-up
        ssl: { rejectUnauthorized: false } // Required for Supabase
    })
    : null as any; // Mock pool when database not configured

export const db = isDatabaseConfigured
    ? drizzle(pool, { schema })
    : null as any; // Mock db when database not configured
