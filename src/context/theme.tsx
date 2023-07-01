import { createContext, useState, ReactNode } from 'react';
import { darkPalette, lightPalette } from '../themes';
import { DefaultTheme } from '@react-navigation/native';

interface IThemeCommonColor {
  black: string;
  white: string;
}

interface IThemeColors {
  [key: string]: string;
  primary: string;
  onPrimary: string;
  background: string;
  onBackground: string;
  card: string;
  onCard: string;
  black: string;
  white: string;
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
      key: '',
      primary: '',
      onPrimary: '',
      background: '',
      onBackground: '',
      card: '',
      onCard: '',

      black: '',
      white: '',
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
      key: isDarkTheme ? 'dark' : 'light',
      primary: chosenTheme.primary,
      onPrimary: chosenTheme.onPrimary,
      background: chosenTheme.background,
      onBackground: chosenTheme.onBackground,
      card: chosenTheme.card,
      onCard: chosenTheme.onCard,
      black: chosenTheme.black,
      white: chosenTheme.white,
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
