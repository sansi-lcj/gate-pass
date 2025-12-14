# invitation-system Spec Delta

## MODIFIED Requirements

### Requirement: Invitation Styles
The system SHALL support at least 10 distinct visual styles **defined as code constants rather than database records**.

#### Scenario: Selecting from styles
- **WHEN** creating an invitation
- **THEN** the user can browse a library of 10+ design templates (e.g., Tech, Business, Creative)
- **AND** templates are loaded from hardcoded configuration, not the database.

#### Scenario: Style data structure
- **GIVEN** the system is configured
- **THEN** each style SHALL have:
  - `key`: Unique string identifier (e.g., `"TechFuture"`)
  - `name`: Display name (e.g., `"Tech Future"`)
  - `previewUrl`: Path to preview image
- **AND** the style key is stored directly on the `Invitation` record.

---

### Requirement: Template Management by Admin
The system SHALL allow Admins to view available templates.

#### Scenario: View templates
- **WHEN** an Admin views the templates page
- **THEN** they see all hardcoded templates with their names and preview images.

#### Scenario: Template activation (REMOVED)
- ~~**WHEN** an Admin disables a template~~
- ~~**THEN** it is no longer visible in the selection list for new invitations~~
- **NOTE**: Dynamic template activation/deactivation is removed in favor of code-level control. To disable a template, remove it from the code.

## REMOVED Requirements

### Requirement: Style Database Model
- The `Style` model is removed from the database schema.
- Invitations now store a `styleKey` (string) instead of `styleId` (foreign key).
