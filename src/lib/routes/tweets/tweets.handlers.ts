import { eq } from 'drizzle-orm';
import db from '~/db';
import { tweets } from '~/db/schema';
import type { AppRouteHandler } from '~/lib/types';
import type { CreateRoute, GetRoute, ListRoute } from './tweets.routes';

export const get: AppRouteHandler<GetRoute> = async c => {
  const id = c.req.param('id');
  const [tweet] = await db.select().from(tweets).where(eq(tweets.id, id!));

  if (!tweet) {
    return c.json({ message: 'Tweet not found.' }, 404);
  }

  return c.json(tweet, 200);
};

export const list: AppRouteHandler<ListRoute> = async c => {
  const allTweets = await db.select().from(tweets);

  return c.json(allTweets, 200);
};

export const create: AppRouteHandler<CreateRoute> = async c => {
  const tweet = c.req.valid('json');
  const [newTweet] = await db.insert(tweets).values(tweet).returning();

  return c.json(newTweet, 200);
};
