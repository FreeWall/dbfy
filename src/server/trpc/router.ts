import { t } from './common';
import example from './routes/example';
import login from './routes/login';

export const trpcRouter = t.mergeRouters(example, login);

export type TrpcRouter = typeof trpcRouter;
