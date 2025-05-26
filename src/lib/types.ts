import {
  OpenAPIHono,
  type RouteConfig,
  type RouteHandler,
} from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';

export type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

export type OpenApiApp = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;
