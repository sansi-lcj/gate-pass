import { PrismaClient } from '../../prisma/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

// Prevent multiple instances in development with hot reloading
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
  
  if (!connectionString) {
    throw new Error('Database connection string not found. Set POSTGRES_PRISMA_URL or DATABASE_URL environment variable.');
  }
  
  // Use Neon adapter for Vercel Postgres (powered by Neon)
  const adapter = new PrismaNeon({ connectionString });
  
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  });
}

// Lazy initialization to avoid errors during build/prerender
function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }
  
  const client = createPrismaClient();
  
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client;
  }
  
  return client;
}

// Export a getter function for lazy initialization
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrismaClient();
    return Reflect.get(client, prop);
  },
});
