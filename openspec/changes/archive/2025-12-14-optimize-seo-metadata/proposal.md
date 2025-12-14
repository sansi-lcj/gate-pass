# Change: Optimize SEO and Metadata

## Why
The system needs to protect authenticated pages from search engine crawling while maintaining rich metadata for social sharing and personalization. Additionally, unauthenticated users should be guided to contact business partners for invitations.

## What Changes
- Implement `robots.ts` to control crawler access.
- personalized `generateMetadata` for invitation pages to display Guest Name and dynamic info.
- Add `noindex` headers to authenticated/private routes.
- Configure default metadata for the application.

## Impact
- Affected specs: `invitation-system`
- Affected code: `src/app/layout.tsx`, `src/app/robots.ts`, `src/app/invite/[id]/page.tsx` (to be created or modified).
