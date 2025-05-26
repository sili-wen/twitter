import { createRoute, z } from '@hono/zod-openapi';
import jsonResponse from '~/lib/jsonResponse';

const tags = ['Tweets'];

export const list = createRoute({
  method: 'get',
  path: 'tweets',
  tags,
  responses: {
    200: jsonResponse(
      z.array(
        z.object({
          user: z.string(),
          tweet: z.string(),
        })
      ),
      'The list of tweets'
    ),
  },
});

export type ListRoute = typeof list;
