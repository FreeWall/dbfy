import { z } from 'zod';
import { procedure, procedurePublic, router } from '../common';

export default router({
  example: router({
    get: procedure.query(({ ctx }) => {
      return { greeting: 'ahoj', session: ctx.session };
    }),

    getPublic: procedurePublic.query(() => {
      return { greeting: 'ahoj' };
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
