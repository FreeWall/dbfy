import { project } from '@/models/sql/constants';

export const sessionOptions = {
  password: process.env.IRONSESSION_SECRET as string,
  cookieName: project.identifier + '.session',
  cookieOptions: {
    maxAge: undefined,
    secure: process.env.NODE_ENV === 'production',
  },
};
