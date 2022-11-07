import { z } from 'zod';
import { procedure, router } from '../common';

export default router({
  example: router({
    bagr: procedure
      .output(
        z.object({
          greeting: z.string(),
          cursor: z.number().nullish(),
        }),
      )
      .query(() => {
        return { greeting: 'ahoj' };
      }),

    create: procedure
      .input(
        z.object({
          greeting: z.string(),
        }),
      )
      .output(
        z.object({
          greeting: z.string(),
        }),
      )
      .mutation(() => {
        return { greeting: 'ahoj' };
      }),
  }),
});
