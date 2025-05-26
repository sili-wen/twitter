import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { z } from 'zod';
import type { ZodError } from 'zod/v4';

expand(config());

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
  PORT: z.coerce.number().default(9999),
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
