export const sessionOptions = {
  password: process.env.IRONSESSION_SECRET as string,
  cookieName: 'dbfy.session',
  cookieOptions: {
    maxAge: undefined,
    secure: process.env.NODE_ENV === 'production',
  },
};
