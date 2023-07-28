import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import UserCache from '../cache/userCache';

import { user } from '../entities';

type AuthContextType = {
  user: user | null;
  setUser: (user: user | null) => void;
  isLoading: boolean;
};
interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: false,
});

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<user | null>(null);
  const [isLoading, setisloading] = useState(false);

  const isLoggedIn = () => {
    const cachedUser = UserCache.getUserData();
    if (cachedUser) {
      setUser(cachedUser);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
