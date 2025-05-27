import { createRoute, z } from '@hono/zod-openapi';
import jsonResponse from '~/lib/jsonResponse';

const tags = ['Tweets'];

const Tweet = z.object({
  id: z.string(),
  message: z.string(),
});

const NewTweet = z.object({
  message: z.string(),
});

const ListTweets = z.array(Tweet);

export const list = createRoute({
  method: 'get',
  path: '/tweets',
  tags,
  responses: {
    200: jsonResponse(ListTweets, 'The list of tweets'),
  },
});

export const create = createRoute({
  method: 'post',
  path: '/tweets',
  tags,
  request: {
    body: jsonResponse(NewTweet, 'The tweet to create'),
  },
  responses: {
    200: jsonResponse(Tweet, 'The created tweet'),
  },
});

export type ListRoute = typeof list;
export type CreateRoute = typeof create;
