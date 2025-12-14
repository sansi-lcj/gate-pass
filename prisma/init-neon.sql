-- =====================================================
-- 庞加莱邀请函管理系统 - Neon PostgreSQL 完整初始化脚本
-- 在 Neon SQL Editor 中执行此脚本
-- =====================================================

-- 1. 创建表结构
-- =====================================================

-- User 表 (销售/管理员)
CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "username" TEXT NOT NULL,
  "name" TEXT,
  "password" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'SALES',
  "wechatId" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- Invitation 表 (邀请函)
-- 注意: styleKey 是代码内置的样式标识符，不再使用数据库外键
CREATE TABLE IF NOT EXISTS "Invitation" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "guestName" TEXT NOT NULL,
  "uniqueToken" TEXT NOT NULL,
  "discountCode" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "language" TEXT NOT NULL DEFAULT 'en',
  "salesNote" TEXT,
  "visitCount" INTEGER NOT NULL DEFAULT 0,
  "openedAt" TIMESTAMP(3),
  "acceptedAt" TIMESTAMP(3),
  "declinedAt" TIMESTAMP(3),
  "userAgent" TEXT,
  "deviceInfo" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "userId" TEXT NOT NULL,
  "styleKey" TEXT NOT NULL,
  
  CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- SystemConfig 表 (系统配置)
CREATE TABLE IF NOT EXISTS "SystemConfig" (
  "id" TEXT NOT NULL DEFAULT 'global',
  "eventTime" TEXT,
  "eventEndTime" TEXT,
  "meetingLink" TEXT,
  "wecomWebhook" TEXT,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  
  CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("id")
);

-- NotificationLog 表 (通知日志)
CREATE TABLE IF NOT EXISTS "NotificationLog" (
  "id" TEXT NOT NULL DEFAULT gen_random_uuid(),
  "guestName" TEXT NOT NULL,
  "status" TEXT NOT NULL,
  "success" BOOLEAN NOT NULL,
  "errorMessage" TEXT,
  "httpStatus" INTEGER,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "invitationId" TEXT NOT NULL,
  
  CONSTRAINT "NotificationLog_pkey" PRIMARY KEY ("id")
);

-- 2. 创建唯一索引
-- =====================================================

CREATE UNIQUE INDEX IF NOT EXISTS "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX IF NOT EXISTS "Invitation_uniqueToken_key" ON "Invitation"("uniqueToken");

-- 3. 创建外键约束
-- =====================================================

ALTER TABLE "Invitation" 
  ADD CONSTRAINT "Invitation_userId_fkey" 
  FOREIGN KEY ("userId") REFERENCES "User"("id") 
  ON DELETE RESTRICT ON UPDATE CASCADE;

-- 注意: 邀请函模板 (Style) 已移至代码内置
-- styleKey 字段直接存储样式标识符 (如 "TechFuture", "CyberGrid" 等)
-- 不再需要 Style 表和相关外键

-- =====================================================
-- 4. 插入初始数据
-- =====================================================

-- 管理员账号 (用户名: admin, 密码: 3p49f7zn9w)
INSERT INTO "User" ("id", "username", "name", "password", "role", "wechatId", "isActive", "createdAt")
VALUES (
  gen_random_uuid(),
  'admin',
  '系统管理员',
  '$2b$10$M3PbqpK1pXJGuwQF9pb9Ou.68Q19H8gGUEjQnVx4RhJc1w9VkN7xm',
  'ADMIN',
  NULL,
  true,
  NOW()
) ON CONFLICT ("username") DO NOTHING;

-- 系统配置
INSERT INTO "SystemConfig" ("id", "eventTime", "eventEndTime", "meetingLink", "wecomWebhook", "updatedAt")
VALUES (
  'global',
  '2025-06-15T14:30:00+08:00',
  '2025-06-15T17:00:00+08:00',
  NULL,
  NULL,
  NOW()
) ON CONFLICT ("id") DO NOTHING;

-- =====================================================
-- 完成！
-- 管理员账号: admin / 3p49f7zn9w
-- 
-- 邀请函样式已内置于代码中，包括:
-- TechFuture, CyberGrid, DigitalWave, Executive,
-- CorporateBlue, MinimalWhite, LuxuryGold, AbstractArt,
-- OrientalInk, ArabicGeometry, NatureGreen, DarkMatter
-- =====================================================
