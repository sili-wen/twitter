import { createRoute, z } from '@hono/zod-openapi';
import { createRouter } from '../createApp';

function createJsonResponse(schema: z.ZodSchema, description: string) {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description,
  };
}

const messageResponse = (description: string) =>
  createJsonResponse(z.object({ message: z.string() }), description);

const router = createRouter().openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: messageResponse('Twitter API Index'),
    },
  }),
  c => {
    return c.json({ message: 'Twitter API' }, 200);
  }
);

export default router;
