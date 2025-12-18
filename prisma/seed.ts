import { PrismaClient } from './generated/prisma/client.js'
import { PrismaPg } from '@prisma/adapter-pg'
import * as bcrypt from 'bcryptjs'

// Load environment variables
import 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// Use PrismaPg adapter for PostgreSQL connection (Prisma 7)
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')
  
  // Clean up
  await prisma.invitation.deleteMany()
  await prisma.user.deleteMany()

  // Create Users
  const passwordHash = await bcrypt.hash('123456', 10)

  // 1. Admin
  await prisma.user.create({
    data: {
      username: 'admin',
      name: '系统管理员',
      password: passwordHash, 
      role: 'ADMIN',
      wechatId: 'admin_wx'
    },
  })
  
  // 2. Sales A
  await prisma.user.create({
    data: {
      username: 'S001',
      name: '张三',
      password: passwordHash,
      role: 'SALES',
      wechatId: 'sales_001_wx'
    },
  })

  // 3. Sales B
  await prisma.user.create({
    data: {
      username: 'S002',
      name: '李四',
      password: passwordHash,
      role: 'SALES',
      wechatId: 'sales_002_wx'
    },
  })

  console.log('✅ Created Admin (admin/123456) and Sales (S001/123456, S002/123456)')

  // Create SystemConfig (singleton)
  await prisma.systemConfig.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      eventTime: '2025-06-15T14:30:00+08:00',
      eventEndTime: '2025-06-15T17:00:00+08:00',
      meetingLink: null,
      wecomWebhook: null,
    }
  })
  console.log('✅ Created SystemConfig with default event time')
  console.log('ℹ️  Invitation styles are now hardcoded in the codebase - no seeding required')
}

main()
  .then(async () => {
    await prisma.$disconnect()
    console.log('🎉 Seeding completed!')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

