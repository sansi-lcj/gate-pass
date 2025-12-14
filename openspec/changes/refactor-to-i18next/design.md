# Design: i18next Architecture for "Gate Pass"

## Goal
Replace `next-intl` with `i18next` while maintaining the core requirement: **Invite-specific locale determined by database**.

## Current vs New Architecture

| Feature | Current (next-intl variant) | New (i18next) |
| :--- | :--- | :--- |
| **Locale Source** | `invitation.language` (Database) | `invitation.language` (Database) |
| **Loading** | Server-side (`getMessages` in page) | Server-side prop + Client hydration |
| **Consumption** | Manual prop drilling (`messages={...}`) | `useTranslation()` Hook |
| **Config** | `src/i18n/request.ts` | `src/lib/i18n.ts` (init logic) |

## Implementation Details

### 1. Dependencies
- `i18next`: Core library.
- `react-i18next`: React bindings (`I18nextProvider`, `useTranslation`).
- `i18next-resources-to-backend`: For loading JSON files.

### 2. Client-Side Hydration Strategy
Since the locale is fixed per invitation, we can initialize a **fresh i18next instance** for each `InvitationPage` render on the server (or pass resources as props) and hydrate the client provider.
Given the Next.js App Router context:
1. **Server Component (`page.tsx`)**:
   - Load JSON for the specific locale (e.g., `import(messages/${locale}.json)`).
   - Pass `locale` and `resources` to a specialized Client Component wrapper (`I18nProvider`).
2. **Client Provider (`I18nProvider.tsx`)**:
   - `useMemo(() => createInstance(...), [])`.
   - `i18n.init(...)` with passed resources.
   - Render `I18nextProvider`.
3. **Templates (`TechFuture.tsx`)**:
   - `const { t } = useTranslation()`.

### 3. Folder Structure
- `src/components/I18nProvider.tsx`: New component.
- `src/lib/i18n.ts`: Helper for i18n instance creation (optional, if logic is complex).

### 4. Code Migration
- **Remove**: `src/i18n/request.ts`, `next.config.ts`.
- **Refactor**: `src/app/invite/[uniqueToken]/page.tsx` to use Provider.
- **Refactor**: All files in `src/components/templates/` to remove `messages` prop and use hook.
