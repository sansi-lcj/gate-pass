## Phase 1: Setup & Infrastructure
- [x] 1.1 **Dependency Swap**: Remove `next-intl`, install `i18next`, `react-i18next`, `i18next-resources-to-backend`.
- [x] 1.2 **Configuration Cleanup**: Remove `next.config.ts` (or revert to empty), delete `src/i18n` folder.
- [x] 1.3 **Provider Implementation**: Create `src/components/providers/I18nProvider.tsx` for client-side instance management.

## Phase 2: Core Refactor
- [x] 2.1 **Page Refactor**: Update `src/app/invite/[uniqueToken]/page.tsx` to load resources and wrap content in `I18nProvider`.
- [x] 2.2 **Template Interface**: Update `InvitationProps` type in `registry.tsx` (remove `messages`).
- [x] 2.3 **Template Migration**: Refactor `TechFuture.tsx` (and others) to use `useTranslation`.
- [x] 2.4 **Component Migration**: Refactor `InvitationRow.tsx` (skipped: no existing i18n usage).
 
 ## Phase 3: Verification
- [x] 3.1 **Build Check**: Ensure `npm run build` passes (no `next-intl` remnants).
- [x] 3.2 **E2E Validation**: Re-run `invitation.spec.ts` to confirm text still renders correctly (functionality unchanged).
- [x] 3.3 **Manual Check**: Verify `npm run dev` and standard invite flow.
