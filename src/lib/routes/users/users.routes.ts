import { createRoute, z } from '@hono/zod-openapi';
import jsonResponse from '~/lib/constants';

const tags = ['Users'];

const User = z.object({
  id: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
});

const NewUser = User.omit({
  id: true,
});

export const create = createRoute({
  method: 'post',
  path: '/users',
  tags,
  request: {
    body: jsonResponse(NewUser, 'The user to create'),
  },
  responses: {
    201: jsonResponse(User, 'The created user'),
  },
});

export type Create = typeof create;
