import { createRouter } from '~/lib/createApp';
import {
  list as listTweets,
  create as createTweet,
  get as getTweet,
  update as updateTweet,
  deleteTweet,
} from './tweets.routes';
import {
  list as listTweetsHandler,
  create as createTweetHandler,
  get as getTweetHandler,
  update as updateTweetHandler,
  deleteTweet as deleteTweetHandler,
} from './tweets.handlers';

const router = createRouter()
  .openapi(createTweet, createTweetHandler)
  .openapi(getTweet, getTweetHandler)
  .openapi(listTweets, listTweetsHandler)
  .openapi(updateTweet, updateTweetHandler)
  .openapi(deleteTweet, deleteTweetHandler);

export default router;
