import { OpenAPIHono } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';
import { favicon } from './middlewares/favicon';
import pinoLogger from './middlewares/pinoLogger';
import { onError, onNotFound } from './resourceUtils';

type AppBindings = {
  Variables: {
    logger: PinoLogger;
  };
};

const app = new OpenAPIHono<AppBindings>();
app.use(pinoLogger());
app.use(favicon('🐦'));

app.get('/', c => {
  return c.json({
    message: 'Homepage',
  });
});
app.get('/error', c => {
  c.var.logger.info('logging test error');
  throw new Error('This is a test error endpoint - something went wrong!');
});

app.notFound(onNotFound);
app.onError(onError);

export default app;
