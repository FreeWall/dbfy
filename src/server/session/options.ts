import { app } from '@/models/sql/constants';

export const sessionOptions = {
  password: process.env.IRONSESSION_SECRET as string,
  cookieName: app.identifier + '.session',
  cookieOptions: {
    maxAge: undefined,
    secure: process.env.NODE_ENV === 'production',
  },
};
