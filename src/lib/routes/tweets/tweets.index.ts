import { createRouter } from '~/lib/createApp';
import {
  list as listTweets,
  create as createTweet,
  get as getTweet,
} from './tweets.routes';
import {
  list as listTweetsHandler,
  create as createTweetHandler,
  get as getTweetHandler,
} from './tweets.handlers';

const router = createRouter()
  .openapi(getTweet, getTweetHandler)
  .openapi(listTweets, listTweetsHandler)
  .openapi(createTweet, createTweetHandler);

export default router;
