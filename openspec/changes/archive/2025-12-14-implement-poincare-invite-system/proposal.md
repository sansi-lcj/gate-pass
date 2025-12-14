# Change: Implement Poincaré Invitation System

## Why
The "Realsee Overseas 2025 Poincaré Device Internal Purchase Meeting" requires a dedicated system for managing and sending invitations. Currently, there is a lack of a structured way for sales representatives to generate personalized invitations with unique discount codes and track them.

## What Changes
- Implement a multilingual invitation creation flow for sales representatives (8 languages + RTL).
- Support 10+ distinct invitation styles (templates).
- Implement role-based access: Admin (Config, Accounts, Templates) and Sales (Create, Share, Track).
- Create a public-facing, time-zone aware invitation page with accept/decline functionality.
- Integrate Enterprise WeChat (WeCom) notifications for status updates.
- Implement robust client-side time formatting (Server Beijing Time -> Client Local Time).
- Integrate unique discount code generation linked to invitations.

## Impact
- New capability: `invitation-system`
- Affected code: `src/app/invite`, `src/components/invitation`, and new backend logic (actions/API) for handling invites.
