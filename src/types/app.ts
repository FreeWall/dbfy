import { IronSession } from 'iron-session';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement } from 'react';

export type CustomPage<P = unknown> = NextPage<P> & {
  getLayout?: (page: ReactElement<P>) => ReactElement;
};

export type CustomServerSideProps = {
  session: IronSession;
  databases: string[];
  database: string | null;
  tables: string[];
  table: string | null;
};

export type CustomAppProps<P = unknown> = AppProps<
  P & {
    appContextProps?: CustomServerSideProps;
  }
> & {
  Component: CustomPage<P>;
};
