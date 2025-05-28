import { createRouter } from '~/lib/createApp';
import { create } from './users.routes';

const router = createRouter().openapi(create, createUserHandler);

export default router;
