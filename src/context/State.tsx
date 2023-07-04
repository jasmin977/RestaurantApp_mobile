import { createContext, useState, ReactNode } from 'react';

interface StateContextProps {
  isScanned: boolean;
  scanQRcode: (scanned: boolean) => void;
}
interface StateProviderProps {
  children: ReactNode;
}

export const StateContext = createContext<StateContextProps>({
  isScanned: false,
  scanQRcode: () => {},
});

const StateProvider = ({ children }: StateProviderProps) => {
  const [isScanned, setScanned] = useState(false);

  const scanQRcode = (scanned: boolean) => {
    setScanned(scanned);
  };

  return (
    <StateContext.Provider value={{ isScanned, scanQRcode }}>{children}</StateContext.Provider>
  );
};

export default StateProvider;
