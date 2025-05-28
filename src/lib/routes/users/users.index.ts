import { createRouter } from '~/lib/createApp';
import { create } from './users.routes';
import { create as createUserHandler } from './users.handlers';

const router = createRouter().openapi(create, createUserHandler);

export default router;
