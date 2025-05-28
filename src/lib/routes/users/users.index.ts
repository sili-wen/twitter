import { createRouter } from '~/lib/createApp';
import {
  create as createUserHandler,
  deleteUser as deleteUserHandler,
  get as getUserHandler,
  list as listUserHandler,
  update as updateUserHandler,
} from './users.handlers';
import { create, deleteUser, get, list, update } from './users.routes';

const router = createRouter()
  .openapi(create, createUserHandler)
  .openapi(get, getUserHandler)
  .openapi(list, listUserHandler)
  .openapi(update, updateUserHandler)
  .openapi(deleteUser, deleteUserHandler);

export default router;
