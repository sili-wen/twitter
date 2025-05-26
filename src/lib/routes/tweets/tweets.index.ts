import { createRouter } from '~/lib/createApp';
import { list as listTweets } from './tweets.routes';
import { list as listTweetsHandler } from './tweet.handlers';

const router = createRouter().openapi(listTweets, listTweetsHandler);

export default router;
