import { z } from 'zod';

const jsonResponse = (schema: z.ZodSchema, description: string) => {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description,
  };
};

export default jsonResponse;
