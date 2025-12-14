## ADDED Requirements

### Requirement: Invitation Creation
The system SHALL allow sales representatives to create invitations by selecting a style and entering a guest name.

#### Scenario: Sales creates an invite
- **WHEN** a sales rep logs in with their Sales Code
- **AND** selects a style (from >10 options)
- **AND** enters a guest name "John Doe"
- **AND** selects a language (e.g., "Japanese")
- **AND** optionally adds a "Sales Note"
- **THEN** a new invitation is created with a unique access token
- **AND** a unique discount code is generated
- **AND** the sales rep is redirected to the dashboard

### Requirement: Invitation Preview
The system SHALL provide a multi-language real-time preview of the invitation.

#### Scenario: Previewing style
- **WHEN** a sales rep selects a style and enters a name
- **THEN** a visual preview is shown
- **AND** changing the Language dropdown immediately updates the preview text

### Requirement: Invitation Styles
The system SHALL support at least 10 distinct visual styles.

#### Scenario: Selecting from styles
- **WHEN** creating an invitation
- **THEN** the user can browse a library of 10+ design templates (e.g., Tech, Business, Creative)

### Requirement: Multilingual Support
The system SHALL support 15+ languages including RTL languages.

#### Scenario: Supported Languages
- **GIVEN** the system is configured
- **THEN** it SHALL support the following languages:

| Code | Language | Region | Notes |
|------|----------|--------|-------|
| `en` | English | Global | Default |
| `zh-CN` | Simplified Chinese | China | |
| `zh-TW` | Traditional Chinese | Taiwan/HK | |
| `ja` | Japanese | Japan | |
| `ko` | Korean | Korea | |
| `ar` | Arabic | Middle East | **RTL** |
| `id` | Indonesian | Indonesia | |
| `th` | Thai | Thailand | |
| `vi` | Vietnamese | Vietnam | |
| `ms` | Malay | Malaysia | |
| `de` | German | Germany/EU | |
| `fr` | French | France/EU | |
| `es` | Spanish | Spain/LatAm | |
| `pt` | Portuguese | Portugal/Brazil | |
| `ru` | Russian | Russia/CIS | |
| `he` | Hebrew | Israel | **RTL** |

#### Scenario: RTL Layout
- **WHEN** an invitation is created with Language="Arabic" or "Hebrew"
- **THEN** the layout direction flips to Right-to-Left (RTL)
- **AND** text alignment and icon placement are mirrored.

### Requirement: Time Management
The system SHALL store event time in Beijing Time but display it in the user's Local Time.

#### Scenario: Time Formatting
- **GIVEN** the event is at "2025-06-15 14:30 UTC+8"
- **WHEN** a guest views the invite from London (UTC+1)
- **THEN** the time is displayed as "June 15, 2025 at 07:30 (Your Local Time)" via `Intl.DateTimeFormat`.

### Requirement: WeCom Notifications
The system SHALL notify the sales rep via Enterprise WeChat when a guest responds.

#### Scenario: Guest accepts
- **WHEN** a guest clicks "Accept"
- **THEN** the system sends a webhook request to WeCom
- **AND** the notification @mentions the specific Sales Rep (via `wechatId`)
- **AND** includes the Guest Name and Generated Discount Code
- **AND** logs any failure to send the webhook for Admin review.

### Requirement: Guest Experience & RSVP
The system SHALL allow guests to respond and view their code.

#### Scenario: Guest accepts invitation
- **WHEN** a guest clicks "Accept"
- **THEN** status becomes "Accepted"
- **AND** the discount code is revealed
- **AND** the "Join Meeting" link is shown (if configured by Admin).

#### Scenario: Guest declines
- **WHEN** a guest clicks "Decline"
- **THEN** status becomes "Declined"
- **AND** a "Reconsider" option is available to revert the choice.

### Requirement: Admin Configuration
The system SHALL allow Admins to configure global settings.

#### Scenario: System Config
- **WHEN** an Admin logs in
- **THEN** they can set the "Global Event Time" (Beijing Time)
- **AND** set the "WeCom Webhook URL"
- **AND** set the "Meeting Link".

### Requirement: Authentication
The system SHALL use a custom form-based login with simple credentials.

#### Scenario: Sales Login
- **WHEN** a sales rep enters their "Sales Code" and "Password"
- **THEN** they are logged in for 7 days.

### Requirement: Privacy & Security
The system SHALL implement measures to protect guest privacy and prevent unauthorized access.

#### Scenario: Search Indexing Protection
- **WHEN** a public invitation page is served
- **THEN** it must include `X-Robots-Tag: noindex` header
- **AND** a `<meta name="robots" content="noindex">` tag.

#### Scenario: Rate Limiting
- **WHEN** a single IP attempts to access >100 invalid tokens within 1 minute
- **THEN** the system blocks requests from that IP for 1 hour.

### Requirement: Post-Event Handling
The system SHALL handle access to invitations after the event has concluded.

#### Scenario: Event Concluded
- **GIVEN** the current time is AFTER the administered "Event End Time"
- **WHEN** a guest visits the invitation
- **THEN** the RSVP buttons are disabled
- **AND** a "Event has concluded" banner is displayed
- **AND** if they had already accepted, their Discount Code is still visible.

### Requirement: Advanced Admin Tools
The system SHALL provide data export capabilities involved in the event.

#### Scenario: CSV Export
- **WHEN** an Admin clicks "Export Accepted Gurests"
- **THEN** the system generates a CSV file containing: Guest Name, Sales Rep, Status, Discount Code, Accepted Time.

---

### Requirement: Sales Account Management
The system SHALL allow Admins to create, manage, and reset sales representative accounts.

#### Scenario: Admin creates a sales account
- **WHEN** an Admin fills the "Create Account" form (Sales Name, Sales Code, WeChat ID)
- **THEN** the system auto-generates a random 8-10 char alphanumeric password
- **AND** displays the credentials once for the Admin to copy and distribute
- **AND** stores the password hashed (bcrypt).

#### Scenario: Admin resets password
- **WHEN** an Admin clicks "Reset Password" for a sales rep
- **THEN** a new random password is generated
- **AND** it is displayed once for the Admin.

#### Scenario: Admin enables/disables account
- **WHEN** an Admin toggles the status of a sales account
- **THEN** a disabled account cannot log in until re-enabled.

### Requirement: QR Code Generation
The system SHALL generate a QR Code for each invitation link.

#### Scenario: Download QR Code
- **WHEN** a sales rep clicks "Download QR" for an invitation
- **THEN** the system generates a PNG image containing the QR code for the invite URL
- **AND** the image is downloadable.

### Requirement: Invitation Status Tracking
The system SHALL track distinct statuses beyond just "Accepted/Declined".

#### Scenario: Unopened vs Opened
- **GIVEN** an invitation is created
- **THEN** its initial status is "PENDING" (Unopened).
- **WHEN** a guest first visits the invitation URL
- **THEN** the status changes to "OPENED"
- **AND** `openedAt` timestamp is recorded.

#### Scenario: Visit Count
- **WHEN** a guest visits the invitation multiple times
- **THEN** each visit increments `visitCount`.

### Requirement: Sales Data Dashboard
The system SHALL provide analytics for sales representatives.

#### Scenario: Personal Statistics
- **WHEN** a sales rep views their dashboard
- **THEN** they see: Total Invitations, Opened Count, Accepted Count, Declined Count, Acceptance Rate (%).

### Requirement: Template Management by Admin
The system SHALL allow Admins to enable or disable templates.

#### Scenario: Disable a Template
- **WHEN** an Admin disables a template
- **THEN** it is no longer visible in the selection list for new invitations
- **AND** existing invitations using that template remain unaffected.

### Requirement: Invitation Content Standard Structure
All templates SHALL display a standardized content structure.

#### Scenario: Content Sections
- **WHEN** a guest views an invitation
- **THEN** it SHALL display the following sections in order:
  1. Brand Logo (Realsee + Poincaré Series)
  2. Personalized Greeting (e.g., "Dear [Guest Name],")
  3. Event Title & Subtitle
  4. Event Time (localized)
  5. Event Highlights (3 bullet points)
  6. Action Buttons (Accept / Decline)
  7. Footer (Brand Info)

### Requirement: Personalized Greeting by Language
The system SHALL format the guest's greeting according to their selected language.

#### Scenario: Chinese Greeting
- **WHEN** language is "Chinese"
- **THEN** greeting is "尊敬的 [姓名] 先生/女士"

#### Scenario: Japanese Greeting
- **WHEN** language is "Japanese"
- **THEN** greeting is "[姓名] 様"

#### Scenario: Arabic Greeting
- **WHEN** language is "Arabic"
- **THEN** greeting is "عزيزي [الاسم],"
- **AND** layout is RTL.

### Requirement: Notification on Decline
The system SHALL also notify the sales rep when a guest declines.

#### Scenario: Guest declines notification
- **WHEN** a guest clicks "Decline"
- **THEN** the system sends a WeCom notification to the sales rep
- **AND** the message includes the Guest Name and a suggestion to follow up.
