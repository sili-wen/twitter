import type { AppRouteHandler } from '~/lib/types';
import type { CreateRoute, ListRoute } from './tweets.routes';
import db from '~/db';
import { tweets, type NewTweet } from '~/db/schema';

export const list: AppRouteHandler<ListRoute> = async c => {
  const allTweets = await db.select().from(tweets);

  return c.json(allTweets, 200);
};

export const create: AppRouteHandler<CreateRoute> = async c => {
  const tweet = c.req.valid('json');
  const [newTweet] = await db.insert(tweets).values(tweet).returning();

  return c.json(newTweet, 200);
};
