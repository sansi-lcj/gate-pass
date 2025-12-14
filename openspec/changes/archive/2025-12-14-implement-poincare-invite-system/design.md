# Design: Poincaré Invitation System - Technical Specification

## 1. Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js 14+ (App Router) | Server Components, Server Actions, built-in API routes |
| **Database** | SQLite (Prisma) | Simple deployment, no external DB needed for MVP |
| **Auth** | Custom JWT (jose) | Lightweight, 7-day session, no OAuth complexity |
| **i18n** | next-intl | First-class Next.js support, RSC compatible |
| **Styling** | Tailwind CSS | Rapid prototyping, responsive design |
| **QR Code** | qrcode (npm) | Server-side PNG generation |
| **Notifications** | WeCom Webhook (fetch) | Simple POST request, no SDK needed |

---

## 2. Database Schema (Prisma)

### 2.1 Models

```prisma
model User {
  id         String   @id @default(uuid())
  username   String   @unique    // Sales Code (e.g., "S001")
  name       String?             // Display name (e.g., "张三")
  password   String              // bcrypt hashed
  role       String   @default("SALES") // "ADMIN" | "SALES"
  wechatId   String?             // For @mention in WeCom
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())
  
  invitations Invitation[]
}

model Style {
  id          String   @id @default(uuid())
  name        String              // "Tech Future"
  component   String              // React component name
  previewUrl  String?             // Thumbnail image path
  isActive    Boolean  @default(true)
  
  invitations Invitation[]
}

model Invitation {
  id             String    @id @default(uuid())
  guestName      String
  uniqueToken    String    @unique   // nanoid(12)
  discountCode   String?             // "RS-2025-XXXXXX"
  status         String    @default("PENDING") 
                           // PENDING -> OPENED -> ACCEPTED | DECLINED
  language       String    @default("en")
  salesNote      String?
  
  // Analytics
  visitCount     Int       @default(0)
  openedAt       DateTime?
  acceptedAt     DateTime?
  declinedAt     DateTime?
  userAgent      String?
  
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  
  // Relations
  userId         String
  createdBy      User      @relation(fields: [userId], references: [id])
  styleId        String
  style          Style     @relation(fields: [styleId], references: [id])
}

model SystemConfig {
  id             String   @id @default("global")
  eventTime      String   // ISO 8601 Beijing Time: "2025-06-15T14:30:00+08:00"
  eventEndTime   String?  // When event ends (for post-event handling)
  meetingLink    String?  // Zoom/Teams URL
  wecomWebhook   String?  // WeCom Robot Webhook URL
  updatedAt      DateTime @updatedAt
}
```

### 2.2 Status State Machine

```
PENDING  ──(first visit)──>  OPENED
OPENED   ──(click Accept)──> ACCEPTED  [terminal, but code visible]
OPENED   ──(click Decline)─> DECLINED  [can "Reconsider" -> OPENED]
DECLINED ──(Reconsider)────> OPENED
```

---

## 3. API / Route Structure

### 3.1 Pages (App Router)

| Route | Description | Auth |
|-------|-------------|------|
| `/login` | Sales/Admin login form | Public |
| `/dashboard` | Sales overview (stats, quick actions) | Sales |
| `/dashboard/create` | Create new invitation | Sales |
| `/dashboard/invitations` | List my invitations | Sales |
| `/admin` | Admin overview | Admin |
| `/admin/accounts` | Manage sales accounts | Admin |
| `/admin/templates` | Enable/disable templates | Admin |
| `/admin/config` | Event time, webhook, meeting link | Admin |
| `/invite/[token]` | Guest invitation page | Public |

### 3.2 Server Actions

| Action | Location | Description |
|--------|----------|-------------|
| `loginAction` | `/app/login/action.ts` | Validate credentials, set JWT cookie |
| `logoutAction` | `/app/login/action.ts` | Clear session cookie |
| `createInvitationAction` | `/app/dashboard/create/action.ts` | Create invite + discount code |
| `respondInvitation` | `/app/invite/[token]/action.ts` | Update status, trigger notification |
| `createUserAction` | `/app/admin/accounts/action.ts` | Admin creates sales account |
| `resetPasswordAction` | `/app/admin/accounts/action.ts` | Generate new random password |
| `toggleUserAction` | `/app/admin/accounts/action.ts` | Enable/disable account |
| `updateConfigAction` | `/app/admin/config/action.ts` | Save system config |

### 3.3 API Routes (if needed)

| Route | Method | Description |
|-------|--------|-------------|
| `/api/qr/[token]` | GET | Generate and return QR code PNG |
| `/api/export/csv` | GET | Admin: Export accepted guests as CSV |

---

## 4. Component Architecture

### 4.1 Template System

```
src/components/templates/
├── registry.ts          # Map style.component -> React Component
├── TechFuture.tsx       # Style 1
├── ElegantBusiness.tsx  # Style 2
├── ... (10 total)
└── BaseTemplate.tsx     # Shared structure (optional)
```

**Registry Pattern:**
```typescript
const TEMPLATES: Record<string, React.ComponentType<InvitationProps>> = {
  'TechFuture': TechFuture,
  'ElegantBusiness': ElegantBusiness,
  // ...
};

export const getTemplate = (name: string) => TEMPLATES[name] || TechFuture;
```

### 4.2 Invitation Data Props

```typescript
interface InvitationProps {
  data: {
    guestName: string;
    language: string;
    status: 'PENDING' | 'OPENED' | 'ACCEPTED' | 'DECLINED';
    uniqueToken: string;
    discountCode: string | null;
    eventTime: string; // ISO 8601
  };
}
```

### 4.3 i18n Structure

```
messages/
├── en.json      # English (Default)
├── zh-CN.json   # Simplified Chinese
├── zh-TW.json   # Traditional Chinese
├── ja.json      # Japanese
├── ko.json      # Korean
├── ar.json      # Arabic (RTL)
├── id.json      # Indonesian
├── th.json      # Thai
├── vi.json      # Vietnamese
├── ms.json      # Malay
├── de.json      # German
├── fr.json      # French
├── es.json      # Spanish
├── pt.json      # Portuguese
├── ru.json      # Russian
└── he.json      # Hebrew (RTL)
```

**Greeting Format Example (zh.json):**
```json
{
  "Invitation": {
    "greeting": "尊敬的 {name} 先生/女士",
    "title": "如视海外 2025 庞加莱线上内购会",
    "accept": "接受邀请",
    "decline": "暂时无法参加"
  }
}
```

---

## 5. Security Design

### 5.1 Authentication Flow

1. User submits Sales Code + Password.
2. Server validates against bcrypt hash.
3. On success, generate JWT with `{userId, username, role}`, set `HttpOnly` cookie (7 days).
4. Middleware checks cookie on protected routes, redirects to `/login` if invalid.

### 5.2 Rate Limiting

- Use `next-rate-limit` or custom middleware.
- Limit `/invite/*` to 100 requests/IP/minute.
- Log excessive attempts for review.

### 5.3 Token Generation

- Use `nanoid` with length 12, custom alphabet (no ambiguous chars: `0OIl`).
- Example: `V8xK2mNq4Zw3`

---

## 6. Notification (WeCom) Design

### 6.1 Payload Structure

```json
{
  "msgtype": "markdown",
  "markdown": {
    "content": "**📩 客户反馈通知**\n> 客户: **张三**\n> 状态: <font color=\"info\">已接受</font>\n> 邀请码: `RS-2025-ABCDEF`\n> <@销售wechatId>"
  }
}
```

### 6.2 Trigger Points

| Event | Action |
|-------|--------|
| Guest accepts | POST webhook with "已接受", include discount code |
| Guest declines | POST webhook with "已拒绝", suggest follow-up |

### 6.3 Error Handling

- Wrap webhook call in try-catch.
- Log failures to `NotificationLog` table (optional) or console.
- Do NOT block user flow on notification failure.

---

## 7. Time Management Design

### 7.1 Storage

- Store event time as ISO 8601 string with Beijing timezone: `2025-06-15T14:30:00+08:00`.

### 7.2 Client Display

```typescript
// On client (using invitation's language)
const localTime = new Intl.DateTimeFormat(language, {
  dateStyle: 'full',
  timeStyle: 'short',
}).format(new Date(eventTimeISO));
```

### 7.3 Fallback

- If `Intl` fails, display raw Beijing time with label: "北京时间 2025-06-15 14:30".

---

## 8. Deployment Considerations

- **Platform**: Vercel (recommended for Next.js).
- **Database**: SQLite works in Vercel serverless (read-heavy, low write). For production scale, migrate to PostgreSQL/PlanetScale.
- **Environment Variables**:
  - `DATABASE_URL`: SQLite path or Postgres connection string.
  - `JWT_SECRET`: Strong random string (32+ chars).
  - `WECOM_WEBHOOK`: (set via Admin UI, stored in DB).

---

## 9. Template Design System

### 9.1 Template Categories (12 Templates)

| ID | Name | Category | Primary Color | Style |
|----|------|----------|---------------|-------|
| 1 | **Tech Future** | 科技几何 | `#3B82F6` (Blue) | Cyberpunk, neon borders, monospace fonts |
| 2 | **Cyber Grid** | 科技几何 | `#8B5CF6` (Purple) | Grid patterns, glowing lines |
| 3 | **Digital Wave** | 科技几何 | `#06B6D4` (Cyan) | Wave animations, gradient meshes |
| 4 | **Executive** | 商务简约 | `#1F2937` (Charcoal) | Clean lines, serif fonts, minimal |
| 5 | **Corporate Blue** | 商务简约 | `#1E40AF` (Navy) | Professional, crisp edges |
| 6 | **Minimal White** | 商务简约 | `#FFFFFF` (White) | Ultra-minimal, lots of whitespace |
| 7 | **Luxury Gold** | 创意视觉 | `#D4AF37` (Gold) | Gold accents, premium textures |
| 8 | **Abstract Art** | 创意视觉 | `#EC4899` (Pink) | Bold shapes, artistic gradients |
| 9 | **Oriental Ink** | 区域特色 | `#374151` (Ink) | Chinese ink painting style |
| 10 | **Arabic Geometry** | 区域特色 | `#059669` (Emerald) | Islamic geometric patterns, RTL optimized |
| 11 | **Nature Green** | 其他 | `#10B981` (Green) | Organic shapes, nature imagery |
| 12 | **Dark Matter** | 其他 | `#111827` (Black) | Dark mode, subtle particle effects |

---

### 9.2 Template Structure (All Templates)

Each template MUST render the following 7 sections in order:

```
┌─────────────────────────────────────┐
│         [1] BRAND HEADER            │
│   Logo + "Poincaré Series" Badge    │
├─────────────────────────────────────┤
│         [2] GREETING                │
│   "Dear {GuestName}," (localized)   │
├─────────────────────────────────────┤
│         [3] EVENT TITLE             │
│   Main Title + Subtitle             │
├─────────────────────────────────────┤
│         [4] EVENT DETAILS           │
│   📅 Time (localized)               │
│   🎯 Event Highlights (3 bullets)   │
├─────────────────────────────────────┤
│         [5] BENEFITS SECTION        │
│   Exclusive discount mention        │
│   (Code revealed after Accept)      │
├─────────────────────────────────────┤
│         [6] ACTION BUTTONS          │
│   [Accept Invitation] [Decline]     │
├─────────────────────────────────────┤
│         [7] FOOTER                  │
│   Brand info + Copyright            │
└─────────────────────────────────────┘
```

---

### 9.3 Detailed Template Specs

#### Template 1: Tech Future
```yaml
Background: 
  - Base: #0A0A0A (Near Black)
  - Overlay: Animated grid pattern (subtle pulse)
  - Accent: Neon blue glow edges

Typography:
  - Heading: "Orbitron" or "Space Grotesk", uppercase, tracking-wide
  - Body: "JetBrains Mono" or system monospace
  - Size: H1=48px, H2=24px, Body=16px

Colors:
  - Primary: #3B82F6 (Electric Blue)
  - Secondary: #1E3A8A
  - Text: #E5E7EB
  - Accent: #60A5FA (glow)

Effects:
  - Border: 1px solid with blue glow (box-shadow: 0 0 20px rgba(59,130,246,0.5))
  - Buttons: Skewed (-10deg transform), hover scale 1.05
  - Code reveal: Typewriter animation

RTL Adaptation: Mirror layout, keep LTR for code/numbers
```

#### Template 4: Executive
```yaml
Background:
  - Base: #FAFAFA (Off-white)
  - Pattern: Subtle paper texture

Typography:
  - Heading: "Playfair Display" (Serif), normal case
  - Body: "Inter" or system sans-serif
  - Size: H1=42px, H2=22px, Body=15px

Colors:
  - Primary: #1F2937 (Charcoal)
  - Secondary: #374151
  - Text: #1F2937
  - Accent: #D4AF37 (Gold line accents)

Effects:
  - Border: None, rely on whitespace
  - Dividers: Thin gold lines (1px)
  - Buttons: Rounded corners, solid fill
  - Hover: Subtle shadow elevation

RTL Adaptation: Full mirror, text alignment right
```

#### Template 7: Luxury Gold
```yaml
Background:
  - Base: #0C0C0C (Deep Black)
  - Overlay: Subtle gold particle effect (optional)

Typography:
  - Heading: "Cinzel" or "Cormorant Garamond", uppercase
  - Body: "Lato" or "Open Sans"
  - Size: H1=52px, H2=26px, Body=16px

Colors:
  - Primary: #D4AF37 (Gold)
  - Secondary: #B8860B (Dark Gold)
  - Text: #F5F5F5
  - Accent: Gold gradient (#D4AF37 → #FFD700)

Effects:
  - Borders: Gold gradient borders
  - Shadows: Golden glow (box-shadow: 0 0 30px rgba(212,175,55,0.3))
  - Buttons: Gold outline, fill on hover
  - Text: Subtle gold text-shadow on headings

RTL Adaptation: Full mirror
```

#### Template 10: Arabic Geometry
```yaml
Background:
  - Base: #0F172A (Dark Blue)
  - Pattern: Islamic geometric tile pattern (SVG overlay, low opacity)

Typography:
  - Arabic: "Noto Naskh Arabic" or "Amiri"
  - Latin fallback: "Inter"
  - Size: H1=44px, H2=24px, Body=18px (larger for Arabic readability)

Colors:
  - Primary: #059669 (Emerald)
  - Secondary: #10B981
  - Text: #F0FDF4
  - Accent: Gold (#D4AF37)

Effects:
  - Borders: Geometric corner ornaments
  - Direction: RTL by default
  - Animations: Gentle fade-in for sections

RTL Default: Yes, optimized for Arabic/Hebrew
```

---

### 9.4 Animation Guidelines

| Animation | Trigger | Duration | Easing |
|-----------|---------|----------|--------|
| Page fade-in | On load | 400ms | ease-out |
| Section stagger | On load | 100ms delay per section | ease-out |
| Button hover | Mouse enter | 200ms | ease-in-out |
| Code reveal | After Accept | 600ms | typewriter effect |
| Status change | Accept/Decline | 300ms | scale + fade |

---

### 9.5 Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Mobile | < 640px | Stack layout, 100% width, smaller fonts |
| Tablet | 640-1024px | Centered card (max-width: 600px) |
| Desktop | > 1024px | Centered card (max-width: 700px), full effects |

---

### 9.6 Accessibility Requirements

- **Contrast**: All text must meet WCAG AA (4.5:1 ratio)
- **Focus states**: Visible focus rings on all interactive elements
- **Screen readers**: Proper heading hierarchy, ARIA labels on buttons
- **Reduced motion**: Respect `prefers-reduced-motion` media query
