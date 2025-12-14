# homepage-promotion Specification

## Purpose
TBD - created by archiving change redesign-homepage. Update Purpose after archive.
## Requirements
### Requirement: Promotional Display
The homepage MUST serve as a promotional landing page for the Poincaré Device, featuring high-quality visuals and branding text.

#### Scenario: Visitor lands on homepage
- **Given** a visitor accesses the root URL `/`
- **Then** they should see the "Poincaré Device" promotional visuals
- **And** they should see the text "Realsee 2025" or similar branding
- **And** they should NOT be redirected to `/login` automatically

### Requirement: Access Control Guidance
The homepage MUST clearly instruct users on how to obtain access, specifically by contacting their business partner, as no public sign-up is available.

#### Scenario: Visitor seeks access
- **Given** a visitor is on the homepage
- **Then** they should see a message instructing them to "contact your business partner to get an exclusive invitation link"
- **And** there should be NO visible button or link to the login page

### Requirement: Visual Style
The page MUST adhere to the "Poincaré" visual identity, using dark themes, purple accents, and existing project assets.

#### Scenario: Visual Aesthetics
- **Given** the homepage loads
- **Then** it should use the "Poincaré" dark mode aesthetic (black/purple theme)
- **And** it should display the Poincaré product images

