import type { AppRouteHandler } from '~/lib/types';
import type { ListRoute } from './tweets.routes';
import db from '~/db';
import { tweets } from '~/db/schema';

export const list: AppRouteHandler<ListRoute> = async c => {
  const allTweets = await db.select().from(tweets);

  return c.json(allTweets, 200);
};
