import { Credentials } from '@/types/credentials';
import * as http from 'http';
import { getIronSession } from 'iron-session';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getSequelize } from '../sequelize/getSequelize';
import { sessionOptions } from './options';
import { getSessionStore } from './store';

export async function getSession(req: http.IncomingMessage | Request, res: http.ServerResponse | Response) {
  return await getIronSession(req, res, sessionOptions);
}

export function withSession<P extends { [key: string]: any } = { [key: string]: any }>(
  handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return async function withSessionInit(context: GetServerSidePropsContext) {
    const session = await getSession(context.req, context.res);
    const store = getSessionStore(session);

    if (!store.sequelize) {
      try {
        store.sequelize = await getSequelize(session.credentials);
      } catch (error) {
        session.destroy();
      }
    }

    context.req.session = session;

    return handler(context);
  };
}

declare module 'iron-session' {
  interface IronSessionData {
    uniqueId: string;
    credentials: Credentials;
  }
}
