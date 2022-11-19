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
    host: '',
    port: 3306,
    user: '',
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
            host: credentials.host,
            port: credentials.port,
            user: credentials.user,
          },
        }),
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
