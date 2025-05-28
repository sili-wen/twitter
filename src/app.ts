import configureOpenApi from './lib/configureOpenApi';
import createApp from './lib/createApp';
import index from '~/lib/routes/index.route';
import tweets from '~/lib/routes/tweets/tweets.index';
import users from '~/lib/routes/users/users.index';

const app = createApp();
const routes = [index, tweets, users];

configureOpenApi(app);

routes.forEach(route => {
  app.route('/', route);
});

export default app;
