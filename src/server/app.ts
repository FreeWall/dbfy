import { CustomAppProps } from '@/types/app';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { initSequelize } from './sequelize/initSequelize';
import { getSession } from './session/common';
import { getSessionStore } from './session/store';

async function initSession(context: GetServerSidePropsContext) {
  const session = await getSession(context.req, context.res);

  if (session.id) {
    const store = getSessionStore(session);

    if (!store.sequelize) {
      try {
        store.sequelize = await initSequelize(session.crs);
        context.req.session = session;
      } catch (error) {
        session.destroy();
      }
    } else {
      context.req.session = session;
    }
  }

  return session;
}

export function withAppContext<P extends { [key: string]: any }>(
  handler?: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P> | void>,
) {
  return async (
    context: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<CustomAppProps<P>['pageProps']>> => {
    const session = await initSession(context);
    const result = await handler?.(context);
    const store = getSessionStore(session);

    return {
      props: {
        appContextProps: {
          session,
          databases: store.sequelize ? await store.sequelize.getDatabases() : [],
          database: context?.params?.database ?? null,
          tables: context?.params?.database
            ? await store.sequelize?.getTables(context?.params?.database as string)
            : [],
          table: context?.params?.table ?? null,
        },
        ...(result && 'props' in result ? await result.props : undefined),
      } as CustomAppProps<P>['pageProps'],
    };
  };
}
