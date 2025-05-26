import { serve } from '@hono/node-server';
import env from './env';
import app from './app';

const port = Number(env.PORT) || 3000;

serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running on http://localhost:${port}`);
