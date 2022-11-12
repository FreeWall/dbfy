import { Credentials } from '@/types/credentials';
import * as http from 'http';
import { getIronSession } from 'iron-session';
import { withIronSessionSsr } from 'iron-session/next';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { sessionOptions } from './session/options';

export function withSessionSsr<P extends { [key: string]: unknown } = { [key: string]: unknown }>(
  handler: (context: GetServerSidePropsContext) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}

export async function getSession(req: http.IncomingMessage | Request, res: http.ServerResponse | Response) {
  return await getIronSession(req, res, sessionOptions);
}

declare module 'iron-session' {
  interface IronSessionData {
    credentials?: Credentials;
  }
}
