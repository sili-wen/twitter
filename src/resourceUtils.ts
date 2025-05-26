import type { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';

export const onNotFound = (c: Context) => {
  return c.json(
    { error: 'Not Found', message: 'The requested resource was not found' },
    StatusCodes.NOT_FOUND
  );
};

export const onError = (error: Error, c: Context) => {
  return c.json(
    {
      error: error.message,
      stack: error.stack,
      message: 'An unexpected error occurred',
    },
    StatusCodes.INTERNAL_SERVER_ERROR
  );
};
