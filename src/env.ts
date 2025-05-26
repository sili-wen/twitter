import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';
import type { ZodError } from 'zod/v4';

expand(config());

const envSchema = z.object({
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(9999),
  TWITTER_DATABASE_CONNECTION: z.string(),
});

type Env = z.infer<typeof envSchema>;
let env: Env;
try {
  env = envSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;

  console.error('Invalid env:');
  console.error(error.flatten());
  process.exit(1);
}

export default env;
