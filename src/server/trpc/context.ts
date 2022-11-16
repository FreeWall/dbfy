import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSequelize } from '../sequelize/sequelize';
import { getSession } from '../session/common';
import { getSessionStore } from '../session/store';

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = await getSession(opts.req, opts.res);

  if (session.uniqueId && session.credentials) {
    const store = getSessionStore(session);

    if (!store.sequelize) {
      try {
        store.sequelize = await getSequelize(session.credentials);
      } catch (error) {
        session.destroy();
      }
    }
  }

  return {
    req: opts.req,
    res: opts.res,
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
