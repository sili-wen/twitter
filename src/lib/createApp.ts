import { OpenAPIHono } from '@hono/zod-openapi';
import { favicon } from '~/middlewares/favicon';
import pinoLogger from '~/middlewares/pinoLogger';
import { onError, onNotFound } from '~/resourceUtils';
import { type AppBindings } from './types';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(pinoLogger());
  app.use(favicon('🐦'));

  app.notFound(onNotFound);
  app.onError(onError);

  return app;
}
