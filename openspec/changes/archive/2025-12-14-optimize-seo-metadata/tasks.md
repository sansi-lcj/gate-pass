## 1. Implementation
- [ ] 1.1 Create `src/app/robots.ts` to configure robots.txt (allow all, but depends on noindex).
- [ ] 1.2 Update `src/app/layout.tsx` to include default metadata (Template: "Gate Pass", Description: "Contact partner...").
- [ ] 1.3 Update `src/app/invite/[id]/page.tsx` (or equivalent) to use `generateMetadata`.
  - [ ] Fetch invitation details.
  - [ ] Return metadata with `title: "Invitation for [Name]"`, `description`, `openGraph` images.
  - [ ] Ensure `robots: { index: false }` is set in this metadata.
- [ ] 1.4 Add `X-Robots-Tag` middleware or config if needed (optional, `meta` tag is usually sufficient for Next.js).
- [ ] 1.5 Verify with local build and inspection of `<head>`.
