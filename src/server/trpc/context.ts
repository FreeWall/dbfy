import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from '../session';

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = await getSession(opts.req, opts.res);

  return {
    req: opts.req,
    res: opts.res,
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
