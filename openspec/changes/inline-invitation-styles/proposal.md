# Inline Invitation Styles

## Summary

This change removes the `Style` model from the database and migrates invitation style configuration to hardcoded constants in the codebase. This simplifies deployment by eliminating the need for database seeding of styles.

## Motivation

Currently, invitation styles require database seeding:
- The `Style` table must be populated during initial setup
- Each style needs an entry with `id`, `name`, `component`, `previewUrl`, and `isActive`
- The `Invitation.styleId` foreign key references the database Style

By hardcoding styles in code:
- **Simplified deployment**: No database seeding required for styles
- **Type-safe**: Style identifiers are compile-time checked
- **Easier maintenance**: Style changes are tracked in version control
- **Reduced complexity**: One less database table to manage

## Scope

### In Scope
- Remove `Style` model from Prisma schema
- Create hardcoded `STYLES` constant with style metadata
- Replace `Invitation.styleId` with `Invitation.styleKey` (string identifier)
- Update template registry to use new style keys
- Update create form and admin pages to use hardcoded styles

### Out of Scope
- Changes to visual templates (components remain unchanged)
- Changes to invitation workflow
- Migration of existing invitation data (breaking change)

## Impact

> [!CAUTION]
> This is a **breaking change** that requires database migration. Existing invitations with `styleId` will need to be migrated or recreated.

| Component | Impact |
|-----------|--------|
| `prisma/schema.prisma` | Remove `Style` model, change `Invitation.styleId` → `styleKey` |
| `src/components/templates/registry.ts` | Add `STYLES` metadata alongside `TEMPLATES` |
| `src/app/dashboard/create/` | Use hardcoded styles instead of DB query |
| `src/app/admin/templates/` | Admin template management uses hardcoded styles |
| `src/app/admin/actions.ts` | Remove style-related DB actions |
| `prisma/*.sql` seed files | Remove style seeding |

## Status

**Implemented** - All changes have been applied and build passes successfully.
