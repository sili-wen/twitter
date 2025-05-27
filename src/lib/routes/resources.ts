import { z } from '@hono/zod-openapi';

export const IdRequest = {
  params: z.object({
    id: z.string().min(1).max(64),
  }),
};
