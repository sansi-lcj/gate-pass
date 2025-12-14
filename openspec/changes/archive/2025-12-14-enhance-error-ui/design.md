# Error UI Design

## Visual Style
- Modern, clean aesthetic.
- Use of illustrations or icons suitable for "Not Found" and "Error" states.
- Consistent with the rest of the application (using `globals.css` variables if available).

## Components
- **Heading**: Clear "404" or "Something went wrong".
- **Description**: Friendly message explaining what happened.
- **Actions**:
    - "Go Home" button.
    - "Reload" button (for errors).
    - "Contact Support" link (optional).

## Tech
- **Next.js App Router**: `error.tsx` (client component), `not-found.tsx`.
- **Styling**: Tailwind CSS.
- **Icons**: Lucide React (if available) or SVG icons.
