## MODIFIED Requirements
### Requirement: Privacy & Security
The system SHALL implement measures to protect guest privacy and prevent unauthorized access.

#### Scenario: Search Indexing
- **WHEN** an invitation page is served
- **THEN** it SHALL be indexable by search engines (`index, follow`)
- **AND** authenticated pages (Dashboard, Admin) SHALL remain `noindex`.
- **AND** `robots.txt` SHALL allow crawling.
