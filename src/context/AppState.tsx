import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import AppDataCache from '../cache/appData';

type AppStateContextType = {
  isInitialized: boolean;
  firstTimeScanned: boolean;

  markFirstTimeScanned: () => void;
  setIsInitialized: (s: boolean) => void;
  markAppisInitialized: () => void;
};
interface Props {
  children: ReactNode;
}

const AppStateContext = createContext<AppStateContextType>({
  isInitialized: false,
  firstTimeScanned: false,
  setIsInitialized: () => {},
  markFirstTimeScanned: () => {},
  markAppisInitialized: () => {},
});

const AppStateProvider = ({ children }: Props) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [firstTimeScanned, setFirstTimeScanned] = useState(false);

  const getSotredData = () => {
    const isInitializedApp = AppDataCache.getAppData()?.isInitialized;
    if (isInitializedApp) {
      setIsInitialized(isInitializedApp);
    }

    const isFirstTimeScanned = AppDataCache.getAppData()?.firstTimeScanned;
    if (isFirstTimeScanned) {
      setFirstTimeScanned(isFirstTimeScanned);
    }
  };

  useEffect(() => {
    getSotredData();
  }, []);

  const markFirstTimeScanned = () => {
    AppDataCache.storeAppData({ firstTimeScanned: true });
    setFirstTimeScanned(true);
  };
  const markAppisInitialized = () => {
    AppDataCache.storeAppData({ isInitialized: true });

    setIsInitialized(true);
  };

  return (
    <AppStateContext.Provider
      value={{
        markAppisInitialized,
        firstTimeScanned,
        markFirstTimeScanned,
        isInitialized,
        setIsInitialized,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
export default AppStateProvider;
export const useAppState = () => useContext(AppStateContext);
