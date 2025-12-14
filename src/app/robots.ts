import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // We allow everything so that social bots (Twitter, Slack, etc) can parse OG tags.
      // Privacy is enforced via 'noindex' meta tags on specific pages.
      allow: '/',
      disallow: '/private/', // Example of explicit disallow if needed, but we rely on noindex
    },
  }
}
