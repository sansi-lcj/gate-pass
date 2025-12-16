-- SQLite version of init script for gate-pass invitation system
-- Drop existing tables if they exist
DROP TABLE IF EXISTS "NotificationLog";
DROP TABLE IF EXISTS "Invitation";
DROP TABLE IF EXISTS "SystemConfig";
DROP TABLE IF EXISTS "Style";
DROP TABLE IF EXISTS "User";

-- User table (Sales/Admin)
CREATE TABLE "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "username" TEXT NOT NULL UNIQUE,
  "name" TEXT,
  "password" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'SALES',
  "wechatId" TEXT,
  "isActive" INTEGER NOT NULL DEFAULT 1,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Invitation table
-- Note: styleKey is a hardcoded style identifier, no database foreign key
CREATE TABLE "Invitation" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "guestName" TEXT NOT NULL,
  "uniqueToken" TEXT NOT NULL UNIQUE,
  "discountCode" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "language" TEXT NOT NULL DEFAULT 'en',
  "salesNote" TEXT,
  "visitCount" INTEGER NOT NULL DEFAULT 0,
  "openedAt" DATETIME,
  "acceptedAt" DATETIME,
  "declinedAt" DATETIME,
  "userAgent" TEXT,
  "deviceInfo" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "userId" TEXT NOT NULL,
  "styleKey" TEXT NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- SystemConfig table (singleton)
CREATE TABLE "SystemConfig" (
  "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'global',
  "eventTime" TEXT,
  "eventEndTime" TEXT,
  "meetingLink" TEXT,
  "wecomWebhook" TEXT,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- NotificationLog table
CREATE TABLE "NotificationLog" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "guestName" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "success" INTEGER NOT NULL,
  "errorMessage" TEXT,
  "httpStatus" INTEGER,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "invitationId" TEXT NOT NULL
);

-- Create indexes
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "Invitation_uniqueToken_key" ON "Invitation"("uniqueToken");
