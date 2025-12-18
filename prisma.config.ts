import "dotenv/config";
import path from "path";
import { defineConfig } from "prisma/config";

// Load .env.local if exists (for local development)
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: path.join(__dirname, "prisma/schema.prisma"),
  migrations: {
    path: path.join(__dirname, "prisma/migrations"),
    seed: "npx tsx --tsconfig tsconfig.seed.json prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL || "",
  },
});
