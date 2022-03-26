export type ThemeMode = 'light' | 'dark';

export interface ThemeState {
  mode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}
