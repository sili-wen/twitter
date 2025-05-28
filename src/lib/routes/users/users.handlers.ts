import { and, eq, isNull } from 'drizzle-orm';
import db from '~/db';
import { users } from '~/db/schema';
import type { AppRouteHandler } from '~/lib/types';
import {
  type Create,
  type Delete,
  type Get,
  type List,
  type Update,
} from './users.routes';

export const create: AppRouteHandler<Create> = async c => {
  const user = c.req.valid('json');
  const [createdUser] = await db.insert(users).values(user).returning();

  if (!createdUser) {
    return c.json({ message: 'User not created.' }, 404);
  }

  return c.json(createdUser, 201);
};

export const get: AppRouteHandler<Get> = async c => {
  const id = c.req.param('id');
  const [user] = await db
    .select()
    .from(users)
    .where(and(eq(users.id, id!), isNull(users.terminatedAt)));

  if (!user) {
    return c.json({ message: 'User not found.' }, 404);
  }

  return c.json(user, 200);
};

export const list: AppRouteHandler<List> = async c => {
  const allUsers = await db
    .select()
    .from(users)
    .where(isNull(users.terminatedAt));

  return c.json(allUsers, 200);
};

export const update: AppRouteHandler<Update> = async c => {
  const id = c.req.param('id');
  const user = c.req.valid('json');

  const [updatedUser] = await db
    .update(users)
    .set(user)
    .where(and(eq(users.id, id), isNull(users.terminatedAt)))
    .returning();

  if (!updatedUser) {
    return c.json({ message: 'User not found.' }, 404);
  }

  return c.json(updatedUser, 200);
};

export const deleteUser: AppRouteHandler<Delete> = async c => {
  const id = c.req.param('id');

  const [deletedUser] = await db
    .update(users)
    .set({
      terminatedAt: new Date(),
    })
    .where(and(eq(users.id, id!), isNull(users.terminatedAt)))
    .returning();

  if (!deletedUser) {
    return c.json({ message: 'User not found.' }, 404);
  }

  return c.json({ message: 'User deleted successfully' }, 200);
};
