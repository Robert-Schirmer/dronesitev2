import { useCallback, useEffect, useState } from 'react';
import type { ThemeMode } from './types';
import { ThemeModeContext } from './useThemeMode';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import lightTheme from '../../theme/light';
import darkTheme from '../../theme/dark';
import { getCookie, setCookie } from '../../utils/cookies';
import { CookieName } from '../../utils/cookies/enums';

export const ThemeProvider: React.FC = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    //See what user has set
    const themeMode = getCookie(CookieName.THEME_MODE);
    if (['light', 'dark'].includes(themeMode)) {
      setMode(themeMode as ThemeMode);
    }
  }, []);

  const setThemeMode = useCallback((newMode: ThemeMode) => {
    setMode(newMode);
    setCookie(CookieName.THEME_MODE, newMode, 1000);
  }, []);

  return (
    <ThemeModeContext.Provider value={{ mode, setThemeMode }}>
      <MUIThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>{children}</MUIThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeProvider;
