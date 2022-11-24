import { app } from '@/models/sql/constants';
import { IronSessionOptions } from 'iron-session';

export const rememberExpirationDays = 30;

export const sessionOptions: IronSessionOptions = {
  password: process.env.IRONSESSION_SECRET as string,
  cookieName: app.identifier + '.session',
};
