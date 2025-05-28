import { createRoute, z } from '@hono/zod-openapi';
import {
  jsonResponse,
  notFoundResponse,
  unprocessableEntityResponse,
} from '~/lib/constants';
import { IdRequest } from '../resources';

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

const UpdateUser = NewUser.partial();

const ListUsers = z.array(User);

export const create = createRoute({
  method: 'post',
  path: '/users',
  tags,
  schema: NewUser,
  request: {
    body: jsonResponse(NewUser, 'The user to create'),
  },
  responses: {
    201: jsonResponse(User, 'The created user'),
    404: notFoundResponse('User not created.'),
  },
});

export const get = createRoute({
  method: 'get',
  path: '/users/{id}',
  tags,
  request: IdRequest,
  responses: {
    200: jsonResponse(User, 'The requested user'),
    404: notFoundResponse('User'),
    422: unprocessableEntityResponse('Invalid id error.'),
  },
});

export const list = createRoute({
  method: 'get',
  path: '/users',
  tags,
  responses: {
    200: jsonResponse(ListUsers, 'The list of users'),
  },
});

export const update = createRoute({
  method: 'patch',
  path: '/users/{id}',
  tags,
  request: {
    params: IdRequest.params,
    body: jsonResponse(UpdateUser, 'The user fields to update'),
  },
  responses: {
    200: jsonResponse(User, 'The updated user'),
    404: notFoundResponse('User'),
    422: unprocessableEntityResponse('Invalid id error.'),
  },
});

export const deleteUser = createRoute({
  method: 'delete',
  path: '/users/{id}',
  tags,
  request: IdRequest,
  responses: {
    200: { description: 'User deleted successfully' },
    404: notFoundResponse('User'),
    422: unprocessableEntityResponse('Invalid id error.'),
  },
});

export type Create = typeof create;
export type Get = typeof get;
export type List = typeof list;
export type Update = typeof update;
export type Delete = typeof deleteUser;
