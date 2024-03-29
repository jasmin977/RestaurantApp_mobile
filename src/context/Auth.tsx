import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import UserCache from '../cache/userCache';

import { user } from '../entities';

type AuthContextType = {
  user: user | null;
  token: string | null;
  setUser: (user: user | null) => void;
  setToken: (token: string | null) => void;
};
interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: UserCache.getUserData().user,
  token: UserCache.getUserData().token,
  setUser: () => {},
  setToken: () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<user | null>(UserCache.getUserData().user);
  const [token, setToken] = useState<string | null>(UserCache.getUserData().token);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
