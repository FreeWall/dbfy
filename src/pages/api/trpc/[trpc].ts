// src/pages/api/trpc/[trpc].ts
import { env } from '@/env/server.mjs';
import { createContext } from '@/server/trpc/context';
import { trpcRouter } from '@/server/trpc/router';
import { createNextApiHandler } from '@trpc/server/adapters/next';

// export API handler
export default createNextApiHandler({
  router: trpcRouter,
  createContext,
  onError:
    env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
