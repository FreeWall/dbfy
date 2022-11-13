import { Credentials } from '@/types/credentials';
import { IronSessionData } from 'iron-session';
import { createContext, ReactNode, useContext } from 'react';

interface SessionContextData {
  authenticated: boolean;
  credentials?: Omit<Credentials, 'password'>;
}

export const SessionContext = createContext<SessionContextData>({
  authenticated: false,
});

export function useSession() {
  return useContext(SessionContext);
}

export function SessionProvider(props: { session: IronSessionData; children: ReactNode }) {
  const credentials = props.session?.credentials;

  return (
    <SessionContext.Provider
      value={{
        authenticated: !!credentials,
        ...(!!credentials && {
          credentials: {
            host: credentials.host,
            port: credentials.port,
            username: credentials.username,
          },
        }),
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
}
