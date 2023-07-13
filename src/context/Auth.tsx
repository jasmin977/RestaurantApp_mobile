import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { MMKV } from 'react-native-mmkv';

type User = {
  username: string;
  password: string;
};

type AuthContextType = {
  user: User | null;
  isInitialized: boolean;
  firstTimeScanned: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  markFirstTimeScanned: () => void;
  markAppisInitialized: () => void;

  isLoading: boolean;
};
interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: { username: '', password: '' },
  isInitialized: false,
  login: () => {},
  logout: () => {},
  markFirstTimeScanned: () => {},
  markAppisInitialized: () => {},
  isLoading: false,
  firstTimeScanned: false,
});

const storage = new MMKV();

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  const [isLoading, setisloading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [firstTimeScanned, setFirstTimeScanned] = useState(false);

  const isLoggedIn = () => {
    setisloading(true);
    //iniliazing the app to show the introduction screen
    const isInitializedApp = storage.getBoolean('isInitialized');
    if (isInitializedApp) {
      setIsInitialized(isInitializedApp);
    }
    //does the user tried the scanned feature for the first time
    const isFirstTimeScanned = storage.getBoolean('firstTimeScanned');
    if (isFirstTimeScanned) {
      setFirstTimeScanned(isFirstTimeScanned);
    }
    //get the cashed user
    const cachedUser = storage.getString('user');
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
    }

    setisloading(false);
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  const markFirstTimeScanned = () => {
    storage.set('firstTimeScanned', true);
    setFirstTimeScanned(true);
  };
  const markAppisInitialized = () => {
    storage.set('isInitialized', true);
    setIsInitialized(true);
  };
  const login = (username: string, password: string) => {
    const user: User = { username, password };
    storage.set('user', JSON.stringify(user));
    setUser(user);
    markAppisInitialized();
  };

  const logout = () => {
    storage.delete('user');
    setUser(null);

    storage.delete('firstTimeScanned');
    setFirstTimeScanned(false);

    storage.delete('isInitialized');
    setIsInitialized(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        markAppisInitialized,
        firstTimeScanned,
        markFirstTimeScanned,
        isInitialized,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
