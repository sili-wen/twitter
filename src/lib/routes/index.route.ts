import { createRoute, z } from '@hono/zod-openapi';
import { createRouter } from '../createApp';
import jsonResponse from '../jsonResponse';

const router = createRouter().openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: jsonResponse(z.object({ message: z.string() }), 'Twitter API Index'),
    },
  }),
  c => {
    return c.json({ message: 'Twitter API' }, 200);
  }
);

export default router;
