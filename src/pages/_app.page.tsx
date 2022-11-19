import { SessionProvider } from '@/contexts/session';
import { TrpcRouter } from '@/server/trpc/router';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { IronSession } from 'iron-session';
import type { AppType } from 'next/app';
import superjson from 'superjson';
import '../styles/globals.css';

const MyApp: AppType<{ session: IronSession }> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={session}>
      {getLayout(
        <Component
          session={session}
          {...pageProps}
        />,
        pageProps,
      )}
    </SessionProvider>
  );
};

export default withTRPC<TrpcRouter>({
  config({ ctx }) {
    const url = '/api/trpc';

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
