import { IronSession } from 'iron-session';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';

export type CustomNextPage<P = unknown> = NextPage<P> & {
  getLayout: (page: ReactElement<P>) => ReactElement;
};

export type CustomServerSideProps = {
  session: IronSession;
  databases: string[];
};

export type CustomAppProps<P = unknown> = AppProps<P> & {
  pageProps: AppProps<P>['pageProps'] & {
    appContextProps?: CustomServerSideProps;
  };
  Component: CustomNextPage<P>;
};
