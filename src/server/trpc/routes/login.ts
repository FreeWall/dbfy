import { initSequelize } from '@/server/sequelize/initSequelize';
import { getSession } from '@/server/session/common';
import { rememberExpirationDays } from '@/server/session/options';
import { getSessionStore } from '@/server/session/store';
import { Credentials } from '@/types/credentials';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { procedurePublic, router } from '../common';

export default router({
  login: procedurePublic
    .input(
      z.object({
        server: z.string().default('localhost:3306'),
        username: z.string(),
        password: z.string().optional(),
        remember: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hostParts = input.server.split(':');

      const credentials: Credentials = {
        host: hostParts[0] as string,
        port: (hostParts[1] ?? 3306) as number,
        user: input.username,
        pass: input.password,
      };

      const sequelize = await initSequelize(credentials);

      const session = await getSession(ctx.req, ctx.res, {
        cookieOptions: {
          maxAge: input.remember ? rememberExpirationDays * 86400 : undefined,
          secure: false, //process.env.NODE_ENV === 'production',
        },
      });

      session.id = nanoid(8);
      session.crs = credentials;
      await session.save();

      const store = getSessionStore(session);
      store.sequelize = sequelize;

      return {
        status: 'success',
      };
    }),
});
