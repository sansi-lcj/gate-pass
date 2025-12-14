# Apply Brand Styling

## Summary

Redesign the site-wide styling to use the brand color `#3366ff` as the primary color. This involves replacing the current purple/pink gradient theme with a cohesive blue-based color palette derived from the brand color.

## Motivation

The current site uses a purple/pink gradient theme (`#a855f7` / `rgb(168, 85, 247)`), which doesn't align with the official Realsee brand identity. This change will establish a consistent visual identity across all pages and components.

## User Review Required

> [!IMPORTANT]
> **Color Palette Decision**: The brand color `#3366ff` will be used as the primary color. We'll derive a complementary secondary color for gradients. Two options:
> - **Option A**: Blue-only gradient (e.g., `#3366ff` → `#0ea5e9` cyan/sky blue)
> - **Option B**: Blue-teal gradient (e.g., `#3366ff` → `#14b8a6` teal)
>
> Please confirm your preference or provide an alternative secondary color.

> [!WARNING]
> **Template Consistency**: Some invitation templates (CyberGrid, DarkMatter, etc.) have unique color schemes. Should these templates also adopt the brand color, or remain as varied design options?

## Scope

### Files to Modify

| Area | Files | Changes |
|------|-------|---------|
| **Global CSS** | `src/app/globals.css` | Add brand color CSS variables |
| **Homepage** | `src/app/page.tsx` | Replace purple gradients with brand colors |
| **Login Page** | `src/app/login/page.tsx` | Update gradient and accent colors |
| **Dashboard** | `src/app/dashboard/*.tsx` | Update UI accent colors |
| **Admin** | `src/app/admin/*.tsx` | Update stat cards and UI accents |
| **Error Pages** | `src/app/error.tsx`, `src/app/not-found.tsx` | Update accent colors for brand consistency |
| **Invitation Components** | `src/components/invitation/PoincareStyle.tsx` | Replace purple with brand colors |
| **Templates** | `src/components/templates/CyberGrid.tsx` | Update if decision made on templates |

### Color Mapping

| Current Color | New Color | Usage |
|--------------|-----------|-------|
| `#a855f7` (purple-500) | `#3366ff` (brand) | Primary accent |
| `#9333ea` (purple-600) | `#2855e0` (brand-dark) | Hover states |
| `#c084fc` (purple-400) | `#5588ff` (brand-light) | Text highlights |
| `rgba(168, 85, 247, *)` | `rgba(51, 102, 255, *)` | Shadows/glows |
| Purple-to-pink gradient | Blue-to-cyan gradient | Decorative elements |

## Out of Scope

- Rebranding logos or images
- Typography changes
- Layout restructuring
- Individual template color schemes (pending user decision)
