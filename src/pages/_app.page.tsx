import { AppProvider } from '@/contexts/app';
import { TrpcRouter } from '@/server/trpc/router';
import { CustomAppProps } from '@/types/app';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps: { appContextProps, ...pageProps } }: CustomAppProps) => {
  const getLayout = Component.getLayout || ((page) => page);

  return <AppProvider props={appContextProps}>{getLayout(<Component {...pageProps} />, pageProps)}</AppProvider>;
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
