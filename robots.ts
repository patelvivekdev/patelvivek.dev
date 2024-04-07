export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
      },
    ],
    sitemap: 'https://patelvivek.dev/sitemap.xml',
    host: 'https://patelvivek.dev',
  };
}
