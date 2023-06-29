import React, { useContext } from 'react';
import { ThemeContext } from '../context';

const useTheme = () => {
  const { theme, toggleTheme, isDarkTheme } = useContext(ThemeContext);
  return { theme, toggleTheme, isDarkTheme };
};

export default useTheme;
