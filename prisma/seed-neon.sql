-- Seed data for Neon/PostgreSQL database
-- Run this in Neon SQL Editor: https://console.neon.tech

-- Create Admin user (password: 123456, bcrypt hashed)
INSERT INTO "User" (id, username, name, password, role, "wechatId", "isActive", "createdAt")
VALUES (
  gen_random_uuid(),
  'admin',
  '系统管理员',
  '$2b$10$M3PbqpK1pXJGuwQF9pb9Ou.68Q19H8gGUEjQnVx4RhJc1w9VkN7xm', -- password: 3p49f7zn9w
  'ADMIN',
  NULL,
  true,
  NOW()
) ON CONFLICT (username) DO NOTHING;

-- Note: Invitation styles are now hardcoded in the codebase
-- No Style table seeding required

-- Create SystemConfig
INSERT INTO "SystemConfig" (id, "eventTime", "eventEndTime", "meetingLink", "wecomWebhook", "updatedAt")
VALUES (
  'global',
  '2025-06-15T14:30:00+08:00',
  '2025-06-15T17:00:00+08:00',
  NULL,
  NULL,
  NOW()
) ON CONFLICT (id) DO NOTHING;
