import { initSequelize } from '@/server/sequelize/initSequelize';
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

      try {
        await initSequelize(credentials);
      } catch (error) {
        return {
          status: 'failed',
        };
      }

      ctx.session.id = nanoid(8);
      ctx.session.crs = credentials;
      await ctx.session.save();

      return {
        status: 'success',
      };
    }),
});
