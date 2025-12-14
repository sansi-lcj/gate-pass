# Tasks: Apply Brand Styling

## Phase 1: Design System Foundation

- [x] **1.1** Update `globals.css` with brand color CSS variables
  - Add `--brand`, `--brand-light`, `--brand-dark`, `--brand-glow` variables
  - Configure Tailwind theme inline for brand colors

## Phase 2: Core Pages

- [x] **2.1** Update homepage (`src/app/page.tsx`)
  - Replace purple borders, shadows, and gradients with brand colors
  - Update text colors from purple-400 to brand-light

- [x] **2.2** Update login page (`src/app/login/page.tsx`)
  - Replace purple glow background with brand color
  - Update gradient from blue-purple to brand gradient
  - Update button styling

- [x] **2.3** Update error pages
  - `src/app/error.tsx`: Add brand accent to buttons
  - `src/app/not-found.tsx`: Add brand accent to buttons

## Phase 3: Dashboard & Admin

- [x] **3.1** Update dashboard layout (`src/app/dashboard/layout.tsx`)
  - Replace blue-purple gradient with brand gradient

- [x] **3.2** Update dashboard page (`src/app/dashboard/page.tsx`)
  - Replace purple stat card styling with brand colors

- [x] **3.3** Update admin pages (`src/app/admin/*.tsx`)
  - Replace purple stat card styling with brand colors

## Phase 4: Invitation Components

- [x] **4.1** Update PoincareStyle component
  - Replace all purple references with brand colors
  - Update glow effects

- [x] **4.2** Keep CyberGrid and other templates with varied designs
  - User decision: Keep templates varied for design flexibility

## Phase 5: Validation

- [x] **5.1** Visual inspection of all pages
  - Homepage, Login, Dashboard, Admin
  - Error pages (404, 500)
  - Sample invitation pages

- [x] **5.2** Run existing E2E tests
  - All styling changes are CSS-only, no functional changes
