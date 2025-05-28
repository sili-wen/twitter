import db from '~/db';
import { users } from '~/db/schema';
import type { AppRouteHandler } from '~/lib/types';
import { type Create } from './users.routes';

export const create: AppRouteHandler<Create> = async c => {
  const user = c.req.valid('json');
  const [createdUser] = await db.insert(users).values(user).returning();

  if (!createdUser) {
    return c.json({ message: 'User not created.' }, 400);
  }

  return c.json(createdUser, 201);
};
