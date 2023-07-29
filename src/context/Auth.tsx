import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import UserCache from '../cache/userCache';

import { user } from '../entities';

type AuthContextType = {
  user: user | null;
  setUser: (user: user | null) => void;
};
interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: UserCache.getUserData(),
  setUser: () => {},
});

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<user | null>(UserCache.getUserData());

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
