## ADDED Requirements

### Requirement: Application branding with custom favicon
The application MUST display the Realsee logo as its favicon across all pages and devices.

#### Scenario: Browser tab displays custom favicon
GIVEN a user navigates to any page in the application
WHEN the page loads
THEN the browser tab displays the Realsee logo favicon

#### Scenario: Apple touch icon for iOS devices
GIVEN a user adds the application to their home screen on iOS
WHEN selecting an icon for the bookmark
THEN the Realsee logo is displayed as the application icon
