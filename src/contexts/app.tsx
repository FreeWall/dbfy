import { CustomServerSideProps } from '@/types/app';
import { Credentials } from '@/types/credentials';
import { createContext, ReactNode, useContext } from 'react';

export interface AppContextData {
  session: {
    authenticated: boolean;
    credentials: Omit<Credentials, 'pass'>;
  };
  databases: string[];
}

export const AppContext = createContext<AppContextData>({
  session: {
    authenticated: false,
    credentials: {
      host: '',
      port: 3306,
      user: '',
    },
  },
  databases: [],
});

export function useApp() {
  return useContext(AppContext);
}

export function useSession() {
  return useContext(AppContext).session;
}

export function useDatabases() {
  return useContext(AppContext).databases;
}

export function AppProvider(props: { props?: CustomServerSideProps; children: ReactNode }) {
  const credentials = props.props?.session.crs;

  return (
    <AppContext.Provider
      value={{
        ...props.props,
        databases: props.props?.databases ?? [],
        session: {
          authenticated: !!credentials,
          credentials: {
            host: credentials?.host ?? '',
            port: credentials?.port ?? 3306,
            user: credentials?.user ?? '',
          },
        },
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
