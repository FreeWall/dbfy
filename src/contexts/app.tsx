import { CustomServerSideProps } from '@/types/app';
import { Credentials } from '@/types/credentials';
import { createContext, ReactNode, useContext } from 'react';

export interface AppContextData {
  session: {
    authenticated: boolean;
    credentials: Omit<Credentials, 'pass'>;
  };
  databases: string[];
  database?: string;
  tables: string[];
  table?: string;
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
  tables: [],
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

export function useDatabase() {
  return useContext(AppContext).database;
}

export function useTables() {
  return useContext(AppContext).tables;
}

export function useTable() {
  return useContext(AppContext).table;
}

export function AppProvider(props: { props?: CustomServerSideProps; children: ReactNode }) {
  const credentials = props.props?.session.crs;

  return (
    <AppContext.Provider
      value={{
        ...props.props,
        session: {
          authenticated: !!credentials,
          credentials: {
            host: credentials?.host ?? '',
            port: credentials?.port ?? 3306,
            user: credentials?.user ?? '',
          },
        },
        databases: props.props?.databases ?? [],
        database: props.props?.database ?? undefined,
        tables: props.props?.tables ?? [],
        table: props.props?.table ?? undefined,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
