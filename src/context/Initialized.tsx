import { createContext, useState, ReactNode } from 'react';
import { darkPalette, lightPalette } from '../themes';
import { DefaultTheme } from '@react-navigation/native';

interface InitialContextProps {
  isInitialized: boolean;
  markAppAsInitialized: () => void;
}
interface InitialProviderProps {
  children: ReactNode;
}

export const InitialContext = createContext<InitialContextProps>({
  isInitialized: false,
  markAppAsInitialized: () => {},
});

const ThemeProvider = ({ children }: InitialProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);

  const markAppAsInitialized = () => {
    setIsInitialized(prevTheme => !prevTheme);
  };

  return (
    <InitialContext.Provider value={{ isInitialized, markAppAsInitialized }}>
      {children}
    </InitialContext.Provider>
  );
};

export default ThemeProvider;
