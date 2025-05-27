import { createRouter } from '~/lib/createApp';
import { list as listTweets, create as createTweet } from './tweets.routes';
import {
  list as listTweetsHandler,
  create as createTweetHandler,
} from './tweet.handlers';

const router = createRouter()
  .openapi(listTweets, listTweetsHandler)
  .openapi(createTweet, createTweetHandler);

export default router;
