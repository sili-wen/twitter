import { defineConfig } from 'drizzle-kit';
import env from '~/env';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  dialect: 'postgresql',
  casing: 'snake_case',
  dbCredentials: {
    url: env.TWITTER_DATABASE_CONNECTION,
  },
});
