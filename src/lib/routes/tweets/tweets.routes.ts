import { createRoute, z } from '@hono/zod-openapi';
import jsonResponse from '~/lib/jsonResponse';
import { IdRequest } from '../resources';

const tags = ['Tweets'];

const Tweet = z.object({
  id: z.string(),
  message: z.string(),
});

const NewTweet = z.object({
  message: z.string().min(1).max(512),
});

const ListTweets = z.array(Tweet);

export const get = createRoute({
  method: 'get',
  path: '/tweets/{id}',
  tags,
  request: IdRequest,
  responses: {
    200: jsonResponse(Tweet, 'The requested tweet'),
    422: jsonResponse(z.object({ message: z.string() }), 'Invalid id error.'),
  },
});

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
    422: jsonResponse(z.object({ message: z.string() }), 'Validation error'),
  },
});

export type GetRoute = typeof get;
export type ListRoute = typeof list;
export type CreateRoute = typeof create;
