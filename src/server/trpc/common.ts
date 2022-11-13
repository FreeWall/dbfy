import { initTRPC, TRPCError } from '@trpc/server';

import superjson from 'superjson';
import { Context } from './context';

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const procedurePublic = t.procedure;

export const procedure = t.procedure.use(
  t.middleware(async ({ ctx, next }) => {
    if (!ctx.session.credentials) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    return next();
  }),
);
