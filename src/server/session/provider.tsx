import { IronSessionData } from 'iron-session';
import { ReactNode } from 'react';
import { SessionContext } from './context';

export function SessionProvider(props: { session: IronSessionData; children: ReactNode }) {
  const credentials = props.session.credentials;

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
