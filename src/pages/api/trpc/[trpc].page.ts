// src/pages/api/trpc/[trpc].ts
import { createContext } from '@/server/trpc/context';
import { trpcRouter } from '@/server/trpc/router';
import { createNextApiHandler } from '@trpc/server/adapters/next';

// export API handler
export default createNextApiHandler({
  router: trpcRouter,
  createContext,
  onError:
    process.env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});
