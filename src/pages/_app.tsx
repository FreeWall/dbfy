import Login from '@/components/layout/login';
import { sessionOptions } from '@/server/session/options';
import { SessionProvider } from '@/server/session/provider';
import { TrpcRouter } from '@/server/trpc/router';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { getIronSession, IronSession } from 'iron-session';
import type { AppContext, AppType } from 'next/app';
import App from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import superjson from 'superjson';
import '../styles/globals.css';

const queryClient = new QueryClient();

const MyApp: AppType<{ session: IronSession }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  if (!session.credentials) {
    Component = Login;
  }

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {getLayout(
          <Component
            session={session}
            {...pageProps}
          />,
        )}
      </QueryClientProvider>
    </SessionProvider>
  );
};

MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);
  const session = await getIronSession(context.ctx.req, context.ctx.res, sessionOptions);

  return {
    pageProps: {
      session,
      ...pageProps,
    },
  };
};

export default withTRPC<TrpcRouter>({
  config({ ctx }) {
    const url = 'http://localhost:' + (process.env.PORT ?? 3010) + '/api/trpc';

    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({ url }),
      ],
      url,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
