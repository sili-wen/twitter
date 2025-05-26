import type { ListRoute } from './tweets.routes';
import type { AppRouteHandler } from '~/lib/types';

export const list: AppRouteHandler<ListRoute> = c => {
  return c.json(
    [
      {
        user: '123',
        tweet: 'New release today',
      },
    ],
    200
  );
};
