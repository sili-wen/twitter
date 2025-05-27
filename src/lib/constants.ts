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

export const notFoundResponse = (resource: string) => {
  return {
    content: {
      'application/json': {
        schema: z.object({ message: z.string() }),
      },
    },
    description: `The ${resource} was not found.`,
  };
};

export const unprocessableEntityResponse = (description: string) => {
  return {
    content: {
      'application/json': {
        schema: z.object({ message: z.string() }),
      },
    },
    description,
  };
};

export default jsonResponse;
