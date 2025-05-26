import { type OpenApiApp } from '~/lib/types';
import packageJson from '../../package.json';
import { Scalar } from '@scalar/hono-api-reference';

export default function configureOpenApi(app: OpenApiApp) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJson.version,
      title: 'Twitter API',
    },
  });

  app.get(
    '/reference',
    Scalar({
      defaultHttpClient: {
        targetKey: 'node',
        clientKey: 'fetch',
      },
      theme: 'deepSpace',
      url: '/doc',
    })
  );
}
