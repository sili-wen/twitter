import { eq, and, isNull } from 'drizzle-orm';
import db from '~/db';
import { tweets } from '~/db/schema';
import type { AppRouteHandler } from '~/lib/types';
import type { Create, Delete, Get, List, Update } from './tweets.routes';

export const get: AppRouteHandler<Get> = async c => {
  const id = c.req.param('id');
  const [tweet] = await db
    .select()
    .from(tweets)
    .where(and(eq(tweets.id, id!), isNull(tweets.terminatedAt)));

  if (!tweet) {
    return c.json({ message: 'Tweet not found.' }, 404);
  }

  return c.json(tweet, 200);
};

export const list: AppRouteHandler<List> = async c => {
  const allTweets = await db
    .select()
    .from(tweets)
    .where(isNull(tweets.terminatedAt));

  return c.json(allTweets, 200);
};

export const create: AppRouteHandler<Create> = async c => {
  const tweet = c.req.valid('json');
  const [newTweet] = await db.insert(tweets).values(tweet).returning();

  return c.json(newTweet, 200);
};

export const update: AppRouteHandler<Update> = async c => {
  const id = c.req.param('id');
  const tweet = c.req.valid('json');

  const [updatedTweet] = await db
    .update(tweets)
    .set(tweet)
    .where(and(eq(tweets.id, id!), isNull(tweets.terminatedAt)))
    .returning();

  if (!updatedTweet) {
    return c.json({ message: 'Tweet not found.' }, 404);
  }

  return c.json(updatedTweet, 200);
};

export const deleteTweet: AppRouteHandler<Delete> = async c => {
  const id = c.req.param('id');
  const [deletedTweet] = await db
    .update(tweets)
    .set({ terminatedAt: new Date() })
    .where(eq(tweets.id, id!))
    .returning();

  if (!deletedTweet) {
    return c.json({ message: 'Tweet not found.' }, 404);
  }

  return c.json(deletedTweet, 200);
};
