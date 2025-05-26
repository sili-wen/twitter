import { OpenAPIHono } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';
import { favicon } from '~/middlewares/favicon';
import pinoLogger from '~/middlewares/pinoLogger';
import { onError, onNotFound } from '~/resourceUtils';

type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

function createApp() {
  const app = new OpenAPIHono<AppBindings>();
  app.use(pinoLogger());
  app.use(favicon('🐦'));

  app.notFound(onNotFound);
  app.onError(onError);
}

export default createApp;
