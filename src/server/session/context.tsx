import { Credentials } from '@/types/credentials';
import { createContext, useContext } from 'react';

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
