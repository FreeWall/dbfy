import { Credentials } from '@/types/credentials';
import { nanoid } from 'nanoid';
import { Sequelize } from 'sequelize';
import { z } from 'zod';
import { procedurePublic, router } from '../common';

export default router({
  login: procedurePublic
    .input(
      z.object({
        host: z.string().default('localhost:3306'),
        username: z.string(),
        password: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const hostParts = input.host.split(':');

      const credentials: Credentials = {
        host: hostParts[0] as string,
        port: (hostParts[1] ?? 3306) as number,
        username: input.username,
        password: input.password,
      };

      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: credentials.host,
        port: credentials.port,
        username: credentials.username,
        password: credentials.password,
      });

      try {
        await sequelize.authenticate();
      } catch (error) {
        return {
          status: 'failed',
        };
      }

      ctx.session.uniqueId = nanoid();
      ctx.session.credentials = credentials;
      await ctx.session.save();

      return {
        status: 'success',
      };
    }),
});
