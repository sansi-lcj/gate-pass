# i18n Refactor

## MODIFIED Requirements

### Requirement: i18n Library
The system MUST use `i18next` and `react-i18next` for all client-side translations, including template rendering and invitation pages. `next-intl` MUST be removed.

#### Scenario: Client-side translation
- **Given** the user visits an invitation page
- **When** the page renders
- **Then** the application initializes an `i18next` instance on the client with resources loaded from the server
- **And** the components consume translations via `react-i18next` `useTranslation` hook
- **And** `next-intl` is NOT used

### Requirement: Dynamic Locale Loading
The system MUST support dynamic locale loading where the locale is strictly determined by the `Invitation.language` database field, overriding any URL or browser settings.

#### Scenario: Database-driven locale
- **Given** an invitation has `language='zh-CN'` in the database
- **When** the page loads
- **Then** the server loads `messages/zh-CN.json`
- **And** passes it to the `I18nProvider` to initialize the client state
- **And** no URL prefix or cookie negotiation logic overrides this (strict DB locale)
