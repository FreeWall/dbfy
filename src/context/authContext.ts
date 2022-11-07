import { createContext, useContext } from 'react';

type authContextType = {
  user?: string;
};

const authContextDefaultValues: authContextType = {
  user: 'FreeWall',
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}
