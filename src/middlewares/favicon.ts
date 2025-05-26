import type { Context, Next } from 'hono';

function favicon(emoji: string = '🐦') {
  return async (c: Context, next: Next) => {
    const faviconPaths = [
      '/favicon.ico',
      '/favicon.svg',
      '/apple-touch-icon.png',
    ];

    if (faviconPaths.includes(c.req.path)) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <text y="0.9em" font-size="90" text-anchor="middle" x="50">${emoji}</text>
</svg>`;

      // Set proper headers for favicon caching and content type
      const headers = {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
        ETag: `"${Buffer.from(emoji).toString('base64')}"`,
      };

      return c.body(svg, 200, headers);
    }

    await next();
  };
}

export { favicon };
