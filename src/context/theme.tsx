import { createContext, useState, ReactNode } from 'react';
import { darkPalette, lightPalette } from '../themes';
import { DefaultTheme } from '@react-navigation/native';

interface IThemeColors {
  primary: string;
  background: string;
  card: string;
  text: string;
  border: string;
  notification: string;
  common: string;
}

interface ITheme {
  mode: 'dark' | 'light';
  colors: IThemeColors;
}

interface ThemeContextProps {
  theme: ITheme;
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: {
    mode: 'dark',
    colors: {
      primary: '',
      background: '',
      card: '',
      text: '',
      border: '',
      notification: '',
      common: '',
    },
  },
  isDarkTheme: false,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const getTheme = (isDarkTheme: boolean): ITheme => {
  const chosenTheme = isDarkTheme ? darkPalette : lightPalette;
  return {
    ...DefaultTheme,
    mode: isDarkTheme ? 'dark' : 'light',
    colors: {
      ...DefaultTheme.colors,
      primary: chosenTheme.primary,
      background: chosenTheme.background,
      card: chosenTheme.surface,
      text: chosenTheme.onSurface,
      border: chosenTheme.common.black,
      notification: chosenTheme.error,
      common: chosenTheme.common.black,
    },
  };
};
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const theme = getTheme(isDarkTheme);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
