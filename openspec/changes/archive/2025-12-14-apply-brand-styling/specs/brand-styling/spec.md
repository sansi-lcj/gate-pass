# Brand Styling Specification

## ADDED Requirements

### Requirement: Brand Color System
The application SHALL use a consistent brand color palette based on `#3366ff`.

#### Scenario: CSS Variables Defined
Given the application loads
When the global styles are applied
Then the following CSS variables MUST be available:
- `--brand: #3366ff`
- `--brand-light: #5588ff`
- `--brand-dark: #2855e0`

#### Scenario: Tailwind Theme Integration
Given the Tailwind configuration
When using utility classes
Then `bg-brand`, `text-brand`, `border-brand` classes SHALL use the brand color `#3366ff`

---

### Requirement: Consistent Accent Colors
All interactive elements and UI accents SHALL use the brand color palette.

#### Scenario: Primary Buttons
Given a primary button element
When displayed to the user
Then the button MUST use brand color gradients or solid brand backgrounds

#### Scenario: Focus States
Given an input field with focus
When the user focuses the element
Then the focus ring SHALL use the brand color

#### Scenario: Decorative Glows
Given an element with glow effects
When displayed to the user
Then the glow SHALL use `rgba(51, 102, 255, *)` (brand color with opacity)

---

## MODIFIED Requirements

### Requirement: Homepage Styling
The homepage SHALL use brand colors instead of purple/pink gradients.

#### Scenario: Homepage Card Border
Given the homepage card container
When displayed to the user
Then the border color MUST be brand-based (not purple)

#### Scenario: Homepage Text Gradient
Given the homepage title text
When displayed to the user
Then the text gradient SHALL use brand colors

---

### Requirement: Login Page Styling
The login page SHALL use brand colors for accents and gradients.

#### Scenario: Login Button Gradient
Given the login submit button
When displayed to the user
Then the button MUST use a brand-based gradient

---

### Requirement: Dashboard Accent Colors
The dashboard SHALL use brand colors for stat cards and accents.

#### Scenario: Dashboard Stat Cards
Given the dashboard displays statistics
When the "acceptance rate" card is shown
Then the card MUST use brand accent colors (not purple)
