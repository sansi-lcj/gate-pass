import { PrismaClient } from '@prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'node:path';

// Prisma 7: Use adapter for database connection
// Prisma 7: Use adapter for database connection
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export let prisma: PrismaClient;

if (process.env.POSTGRES_PRISMA_URL) {
  // Production / Vercel Postgres
  prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      datasources: {
        db: {
          url: process.env.POSTGRES_PRISMA_URL,
        },
      },
      log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    });
} else {
  // Local Development (SQLite)
  // Dynamically require adapter to avoid build changes for Vercel if separate deps are managed or optimization needed
  const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
  
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adapter = new PrismaBetterSqlite3({ url: dbPath }) as any;

  prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
      adapter,
      log: process.env.NODE_ENV === 'development' ? ['query'] : [],
    });
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;


