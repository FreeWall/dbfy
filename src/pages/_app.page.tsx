import { SessionProvider } from '@/contexts/session';
import { TrpcRouter } from '@/server/trpc/router';
import { CustomAppProps } from '@/types/page';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: CustomAppProps) => {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>{getLayout(<Component {...pageProps} />, pageProps)}</SessionProvider>
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
