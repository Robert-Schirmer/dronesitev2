import { createContext, useContext } from 'react';
import { ThemeState } from './types';

export const ThemeModeContext = createContext({} as ThemeState);
const useThemeMode = () => {
  return useContext(ThemeModeContext);
};

export default useThemeMode;
