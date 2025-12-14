## Phase 1: Foundation & Core
- [x] 1.1 **Schema Update**: Updated Prisma schema with User.name, User.isActive, Style.isActive, SystemConfig model.
- [x] 1.2 **Auth Implementation**: Custom Login (Sales Code + Password) with JWT/Cookie session.
- [x] 1.3 **i18n Infrastructure**: Setup `next-intl` with 8 locale files (en, zh-CN, ja, ko, ar, id, th, vi).
- [x] 1.4 **RTL Support**: Implemented layout mirroring logic for Arabic locale.

## Phase 2: Sales Workflow (Back-office)
- [x] 2.1 **Sales Dashboard**: Sidebar and main layout with Overview and My Invitations.
- [x] 2.2 **Creation Form**: Form with Style Selector (12 templates), Guest Name, Language Picker (8 opts).
- [x] 2.3 **Live Preview**: Real-time split-screen preview that updates with Language/Style changes.
- [x] 2.4 **Server Actions**: `createInvitation` with discount code generation.

## Phase 3: Guest Experience
- [x] 3.1 **Public Page**: `/invite/[token]` with dynamic style loading, noindex header.
- [x] 3.2 **Time Formatting**: Client-side Beijing Time -> Local Time conversion.
- [x] 3.3 **RSVP Logic**: Accept/Decline/Reconsider buttons with status tracking.
- [x] 3.4 **Notifications**: WeCom Webhook integration (configurable in SystemConfig).

## Phase 4: Styles & Creative (12 Templates)
- [x] 4.1 **Style System**: Registry pattern for mapping style IDs to React Components.
- [x] 4.2 **Base Template**: TechFuture template with 7-section structure.
- [x] 4.3 **Tech Series (1-3)**: TechFuture, CyberGrid, DigitalWave.
- [x] 4.4 **Business Series (4-6)**: Executive, CorporateBlue, MinimalWhite.
- [x] 4.5 **Creative Series (7-8)**: LuxuryGold, AbstractArt.
- [x] 4.6 **Regional Series (9-10)**: OrientalInk, ArabicGeometry (RTL-ready).
- [x] 4.7 **Other Series (11-12)**: NatureGreen, DarkMatter.
- [x] 4.8 **Mobile Optimization**: All templates use responsive Tailwind (mobile-first).
- [x] 4.9 **Accessibility Check**: Sufficient color contrast, focus states via Tailwind.

## Phase 5: Admin & Verification
- [x] 5.1 **Admin Config**: Admin dashboard with config page for Event Time, Webhook URL.
- [x] 5.2 **Seed Data**: Admin and 2 Sales accounts seeded (admin/123456, S001/123456, S002/123456).
- [x] 5.3 **E2E Verification**: 22 strict Playwright tests passing - full flow verified.
- [ ] 5.4 **Deployment**: Deploy to Vercel and run final production checks.

## Phase 6: Advanced Refinements (New)
- [x] 6.1 **Security Hardening**: Added `noindex` headers to invitation pages.
- [x] 6.2 **Post-Event Logic**: `isEventEnded()` utility checks EventEndTime and disables RSVP buttons.
- [x] 6.3 **Admin Export**: CSV export for accepted guests implemented in `/admin/export`.
- [x] 6.4 **Failure Logging**: NotificationLog model added, all webhook calls logged to database.

## Phase 7: Comprehensive Admin (From PRD)
- [x] 7.1 **Account CRUD UI**: Admin can create, list, enable/disable, and reset passwords for Sales accounts.
- [x] 7.2 **Template Toggle**: Admin can enable/disable templates from `/admin/templates`.
- [x] 7.3 **Password Display**: Random password shown once on creation/reset.

## Phase 8: Enhanced Sales Features (From PRD)
- [x] 8.1 **QR Code Generation**: QR code API at `/api/qr/[token]` with display in invitations list.
- [x] 8.2 **Status "Opened"**: `visitCount` tracking with OPENED status in middleware.
- [x] 8.3 **Dashboard Stats**: 5 stats cards (Total, Opened, Accepted, Declined, Rate).

## Phase 9: Content & i18n Finalization (From PRD)
- [x] 9.1 **Greeting Formats**: Localized greetings in template (Dear X / 尊敬的X).
- [x] 9.2 **Notification on Decline**: WeCom webhook sends on DECLINED status.
- [x] 9.3 **Full 16 Language Support**: Added zh-TW, ms, de, fr, es, pt, ru, he (now 16 total).
- [x] 9.4 **Library Upgrades**: Updated to Next.js 16 (Proxy pattern), React 19 alpha/beta, and Prisma 7 (with driver adapter).

