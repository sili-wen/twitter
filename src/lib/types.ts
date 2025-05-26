import type { PinoLogger } from 'hono-pino';
import { OpenAPIHono } from '@hono/zod-openapi';

export type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

export type OpenApiApp = OpenAPIHono<AppBindings>;
