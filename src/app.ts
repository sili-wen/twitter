import configureOpenApi from './lib/configureOpenApi';
import createApp from './lib/createApp';
import index from '~/lib/routes/index.route';

const app = createApp();
const routes = [index];

configureOpenApi(app);

routes.forEach(route => {
  app.route('/', route);
});

export default app;
