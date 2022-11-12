import { procedure, router } from '../common';

export default router({
  login: procedure.query(async ({ ctx }) => {
    ctx.session.credentials = {
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'f3e45f9xNd654serg126fg',
    };
    await ctx.session.save();
  }),
});
