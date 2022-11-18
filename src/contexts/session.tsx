import { Credentials } from '@/types/credentials';
import { IronSessionData } from 'iron-session';
import { createContext, ReactNode, useContext } from 'react';

interface SessionContextData {
  authenticated: boolean;
  credentials: Omit<Credentials, 'pw'>;
}

export const SessionContext = createContext<SessionContextData>({
  authenticated: false,
  credentials: {
    h: '',
    p: 3306,
    u: '',
  },
});

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider(props: { session: IronSessionData; children: ReactNode }) {
  const credentials = props.session?.crs;

  return (
    <SessionContext.Provider
      value={{
        authenticated: !!credentials,
        ...(!!credentials && {
          credentials: {
            h: credentials.h,
            p: credentials.p,
            u: credentials.u,
          },
        }),
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
