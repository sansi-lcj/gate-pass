# Proposal: Redesign Homepage as Poincaré Promotional Page

## Summary
The current homepage (`/`) automatically redirects to `/login`. We propose to transform the homepage into a visually appealing promotional page for the "Poincaré Device" (庞加莱设备). This page will **not** serve as a login entry point but instead guide visitors to contact their business partners to obtain an exclusive invitation link.

## Goals
1.  **Visual Appeal**: Create a "good looking" promotional page using the Poincaré design aesthetic (dark mode, purple/neons, existing assets).
2.  **Information Only**: Remove the automatic redirect to `/login`.
3.  **Call to Action**: Explicitly instruct users to contact their business partners for an invitation link.
4.  **No Login Link**: Ensure the page does not provide a direct link to the login page, maintaining exclusivity.

## Non-Goals
- Adding public registration functionality.
- Adding details about the device specs (beyond high-level promotional visuals).

## Risks
- Users might be confused if they expect a login page at root. However, the requirement is explicit about "exclusive invitation links", so this aligns with the business model.

## Timeline
- **Draft & Design**: 1 day
- **Implementation**: 0.5 days
