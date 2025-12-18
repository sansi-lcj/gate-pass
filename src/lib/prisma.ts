import { PrismaClient } from "../../prisma/generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";

// Prevent multiple instances in development with hot reloading
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient(): PrismaClient {
  // Production: Use Neon adapter for Vercel Postgres
  const neonUrl = process.env.POSTGRES_PRISMA_URL;
  
  if (neonUrl) {
    const adapter = new PrismaNeon({ connectionString: neonUrl });
    return new PrismaClient({
      adapter,
      log: [], // Production: no query logging
    });
  }

  // Local development: Use PrismaPg adapter for PostgreSQL
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "info", "warn", "error"]
        : [],
  });
}

// Lazy initialization to avoid errors during build/prerender
function getPrismaClient(): PrismaClient {
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  const client = createPrismaClient();

  if (process.env.NODE_ENV !== "production") {
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
