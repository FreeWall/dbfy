import { t } from './common';
import example from './routes/example';

export const trpcRouter = t.mergeRouters(example);

export type TrpcRouter = typeof trpcRouter;
