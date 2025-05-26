import configureOpenApi from './lib/configureOpenApi';
import createApp from './lib/createApp';
import index from '~/lib/routes/index.route';
import tweets from '~/lib/routes/tweets/tweets.index';

const app = createApp();
const routes = [index, tweets];

configureOpenApi(app);

routes.forEach(route => {
  app.route('/', route);
});

export default app;
