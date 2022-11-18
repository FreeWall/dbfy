import { getSequelize } from '@/server/sequelize/getSequelize';
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
        h: hostParts[0] as string,
        p: (hostParts[1] ?? 3306) as number,
        u: input.username,
        pw: input.password,
      };

      try {
        await getSequelize(credentials);
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
