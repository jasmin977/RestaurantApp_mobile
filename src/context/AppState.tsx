import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import AppDataCache from '../cache/appData';

type AppStateContextType = {
  isInitialized: boolean;
  firstTimeScanned: boolean;
  isDrawerOpen: boolean;
  isToastVisible: boolean;
  setToastVisible: (s: boolean) => void;
  setFirstTimeScanned: (s: boolean) => void;
  setIsInitialized: (s: boolean) => void;
  setIsDrawerOpen: (s: boolean) => void;
};
interface Props {
  children: ReactNode;
}

const AppStateContext = createContext<AppStateContextType>({
  isInitialized: false,
  isToastVisible: false,
  firstTimeScanned: false,
  isDrawerOpen: false,
  setIsInitialized: () => {},
  setToastVisible: () => {},
  setIsDrawerOpen: () => {},
  setFirstTimeScanned: () => {},
});

const AppStateProvider = ({ children }: Props) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [firstTimeScanned, setFirstTimeScanned] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isToastVisible, setToastVisible] = useState(false);

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

  return (
    <AppStateContext.Provider
      value={{
        firstTimeScanned,
        setFirstTimeScanned,
        isInitialized,
        setIsInitialized,
        isDrawerOpen,
        setIsDrawerOpen,
        isToastVisible,
        setToastVisible,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
export default AppStateProvider;
export const useAppState = () => useContext(AppStateContext);
