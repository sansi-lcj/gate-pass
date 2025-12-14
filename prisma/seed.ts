import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import path from 'node:path'
import * as bcrypt from 'bcryptjs'

const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
const adapter = new PrismaBetterSqlite3({ url: dbPath })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')
  
  // Clean up
  await prisma.invitation.deleteMany()
  await prisma.user.deleteMany()
  await prisma.style.deleteMany()

  // Create 12 Styles (matching design.md)
  const stylesData = [
    // Tech Series (1-3)
    { name: 'Tech Future', component: 'TechFuture', previewUrl: '/styles/tech-future.png' },
    { name: 'Cyber Grid', component: 'CyberGrid', previewUrl: '/styles/cyber-grid.png' },
    { name: 'Digital Wave', component: 'DigitalWave', previewUrl: '/styles/digital-wave.png' },
    // Business Series (4-6)
    { name: 'Executive', component: 'Executive', previewUrl: '/styles/executive.png' },
    { name: 'Corporate Blue', component: 'CorporateBlue', previewUrl: '/styles/corporate-blue.png' },
    { name: 'Minimal White', component: 'MinimalWhite', previewUrl: '/styles/minimal-white.png' },
    // Creative Series (7-8)
    { name: 'Luxury Gold', component: 'LuxuryGold', previewUrl: '/styles/luxury-gold.png' },
    { name: 'Abstract Art', component: 'AbstractArt', previewUrl: '/styles/abstract-art.png' },
    // Regional Series (9-10)
    { name: 'Oriental Ink', component: 'OrientalInk', previewUrl: '/styles/oriental-ink.png' },
    { name: 'Arabic Geometry', component: 'ArabicGeometry', previewUrl: '/styles/arabic-geometry.png' },
    // Other Series (11-12)
    { name: 'Nature Green', component: 'NatureGreen', previewUrl: '/styles/nature-green.png' },
    { name: 'Dark Matter', component: 'DarkMatter', previewUrl: '/styles/dark-matter.png' },
  ]

  for (const style of stylesData) {
    await prisma.style.create({ data: style })
  }
  console.log(`✅ Created ${stylesData.length} styles`)

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

