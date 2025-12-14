# Design: Poincaré Promotional Homepage

## 1. Visual Style
- **Theme**: "Tech Future" / Poincaré aesthetics (Dark mode, Purple/Blue gradients, Neon accents).
- **Assets**:
    - Hero Background: `/images/poincare/hero.jpg` (with overlay/blur).
    - Detail Image: `/images/poincare/detail_1.jpg`.
- **Typography**: `Geist` / `Geist_Mono` (project defaults) or specialized fonts if available (e.g., `Orbitron` logic from existing design docs, though we likely stick to available fonts).

## 2. Layout Structure
A single-page, full-screen landing layout.

```
+-------------------------------------------------------+
|  [Background Image with Dark Overlay]                 |
|                                                       |
|          [Poincaré Logo / Detail Image]               |
|                                                       |
|       Realsee 2025 (Small extended text)      |
|                                                       |
|      POINCARÉ PURCHASE (Large Title)         |
|                                                       |
|    "Please contact your business partner to get       |
|     an exclusive invitation link."                    |
|                                                       |
|          [No Login Button]                            |
|                                                       |
|  [Footer: Copyright / Brand]                          |
+-------------------------------------------------------+
```

## 3. Component Architecture
- **Root Page**: `src/app/page.tsx`
    - Replace the current `redirect('/login')`.
    - Implement the layout using Tailwind CSS.
    - Use `next/image` for optimized asset loading.

## 4. Navigation
- **No Navigation Bar**: Keep the header clean.
- **No Login Link**: As requested, do not provide a visible entry to `/login`.

## 5. Mobile Responsiveness
- Ensure text is readable on mobile.
- Stack layout vertically.
- Adjust padding for smaller screens.
