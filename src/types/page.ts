import { IronSession } from 'iron-session';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';

export type CustomNextPage<P = unknown> = AppProps<P>['Component'] & {
  getLayout: (page: ReactElement, props: CustomAppProps<P>['pageProps']) => ReactElement;
};

export type CustomAppProps<P = unknown> = AppProps<P> & {
  pageProps: AppProps<P>['pageProps'] & {
    session: IronSession;
  };
  Component: CustomNextPage;
};
