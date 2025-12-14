# Change: Refactor to usage of i18next

## Why
The user explicitly requested to use `i18next` instead of `next-intl`. The current `next-intl` implementation relies on manual prop-drilling or non-standard patterns to handle database-driven locales. Migrating to `i18next` aligns with the user's technology constraints and provides a widely adopted ecosystem for translation management.

## What Changes
- **Dependency Replacement**: Uninstall `next-intl`, install `i18next`, `react-i18next`, `i18next-resources-to-backend`.
- **Configuration**: Remove `next.config.ts` plugin, `src/i18n/request.ts`. Create standard `src/i18n/index.ts` (or similar) initialization.
- **Provider**: Implement a client-side `I18nProvider` (wrapping `I18nextProvider` or initializing instance) to handle dynamic locale switching from the database.
- **Component Usage**: Refactor `InvitationPage` to provide the i18n instance. Refactor templates (`TechFuture`, etc.) to use `useTranslation` hook instead of `messages` prop.
- **Messages**: Existing `messages/*.json` files will remain as the source of truth but will be loaded via i18next backend or resource bundler.

## Impact
- **Affected Components**: `InvitationPage`, all template components (`src/components/templates/*`), `InvitationRow`.
- **Performance**: Client-side bundle size may change slightly. Message loading strategy (lazy vs bundled) needs to be defined in `design.md`.
