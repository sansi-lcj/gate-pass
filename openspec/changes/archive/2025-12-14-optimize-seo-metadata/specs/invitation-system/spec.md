## MODIFIED Requirements
### Requirement: Privacy & Security
The system SHALL implement measures to protect guest privacy and prevent unauthorized access.

#### Scenario: Search Indexing Protection
- **WHEN** any authenticated or invitation page is served
- **THEN** it must include `X-Robots-Tag: noindex` header (or equivalent meta tag)
- **AND** a `<meta name="robots" content="noindex">` tag
- **AND** `robots.txt` SHALL allow crawling of these pages (to enable metadata scraping by social bots).

#### Scenario: Rate Limiting
- **WHEN** a single IP attempts to access >100 invalid tokens within 1 minute
- **THEN** the system blocks requests from that IP for 1 hour.

## ADDED Requirements
### Requirement: Personalized Metadata
The system SHALL provide rich, personalized metadata for invitation links to support social sharing.

#### Scenario: Invitation Link Metadata
- **GIVEN** an invitation for "John Doe"
- **WHEN** the invitation link is shared on social media
- **THEN** the preview card (Open Graph) SHALL display:
  - Title: "Invitation for John Doe" (or similar personalized text)
  - Description: Event details or "You are invited..."
  - Image: A default event image MUST be present.

### Requirement: Unauthorized Access Fallback
The system SHALL guide unauthorized users to the correct path via metadata.

#### Scenario: Default Metadata
- **WHEN** a user or crawler visits the root or an error page
- **THEN** the metadata description SHALL imply exclusivity, e.g., "Please contact your business partner to obtain your exclusive invitation link."
