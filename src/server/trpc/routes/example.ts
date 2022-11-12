import { z } from 'zod';
import { procedure, router } from '../common';

export default router({
  example: router({
    get: procedure.query(({ ctx }) => {
      return { greeting: 'ahoj', session: ctx.session };
    }),

    post: procedure
      .input(
        z.object({
          greeting: z.string(),
        }),
      )
      .mutation((req) => {
        return { greeting: 'ahoj' };
      }),
  }),
});
