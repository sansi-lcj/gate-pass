# Design: SEO and Metadata Strategy

## Context
The user requires that authenticated pages (invitations, dashboard) are not indexed by search engines ("prohibited from crawlers") but still retain metadata for social sharing (invitation links). They also want personalized metadata (Guest Name).

## Decisions
- **Decision**: Use `noindex` meta tag (and header) instead of blocking via `robots.txt`.
  - **Rationale**: Blocking via `robots.txt` prevents crawlers from reading the page content, including OG tags. To allow social cards (Twitter/Facebook/WeChat/Lark), we must allow crawling but instruct indexers not to index the content via `noindex`.
  - **Caveat**: Some strict crawlers might respect `noindex` by dropping the page entirely, but social bots usually parse OG tags.
- **Decision**: Implement dynamic `generateMetadata` in `page.tsx`.
  - **Rationale**: Next.js App Router supports dynamic metadata generation which can fetch data (Guest Name, Event Info) server-side before rendering.
- **Decision**: "Contact Business Partner" fallback.
  - **Rationale**: For the root page or generic/error pages, we will set the default metadata description to "Please contact your business partner to get an exclusive invitation link."

## Risks / Trade-offs
- **Risk**: Social platforms caching old metadata.
  - **Mitigation**: Not much we can do, but personalized links are unique per guest/id, so caching should be correct per link.
- **Risk**: Leaking guest names in metadata (URL preview).
  - **Mitigation**: This is the intended feature ("Personalized"). We assume guest names in invitation links are acceptable for the recipient to see.
