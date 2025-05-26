import { pinoLogger as logger } from 'hono-pino';
import { pino } from 'pino';
import pretty from 'pino-pretty';
import env from '~/env';

function pinoLogger() {
  const prettyFormat = env.NODE_ENV === 'production' ? undefined : pretty();
  return logger({
    pino: pino(
      {
        level: env.LOG_LEVEL || 'info',
      },
      prettyFormat
    ),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}

export default pinoLogger;
