# Change: Allow Invitation Indexing

## Why
The user requested that the invitation links themselves should be indexable by search engines to improve SEO and discovery of the event, while keeping other private pages protected.

## What Changes
- Update SEO strategy to ALLOW indexing for `/invite/[uniqueToken]`.
- Keep `noindex` for other authenticated routes (Dashboard, Admin).
- `robots.ts` remains permissive (already implemented).
- `generateMetadata` in invitation page will set `robots: { index: true, follow: true }`.

## Impact
- Affected specs: `invitation-system`
- Affected code: `src/app/invite/[uniqueToken]/page.tsx`.
