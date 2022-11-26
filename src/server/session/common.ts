import { Credentials } from '@/types/credentials';
import * as http from 'http';
import { getIronSession, IronSessionOptions } from 'iron-session';
import { sessionOptions } from './options';

export async function getSession(
  req: http.IncomingMessage | Request,
  res: http.ServerResponse | Response,
  options?: Partial<IronSessionOptions>,
) {
  return await getIronSession(req, res, { ...sessionOptions, ...options });
}

declare module 'iron-session' {
  interface IronSessionData {
    id: string;
    /** credentials */
    crs: Credentials;
  }
}
