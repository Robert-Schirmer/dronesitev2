// Modify the theme to add new properties and remain strongly typed
import type { ColorSchemes } from './enums';

// https://material-ui.com/guides/typescript/#customization-of-theme
export interface ColorScheme {
  main: React.CSSProperties['color'];
  secondary: React.CSSProperties['color'];
}

export type DefinedColors = {
  [key in ColorSchemes]: ColorScheme;
};
declare module '@mui/material/styles' {
  interface Theme {
    boxShadow: string;
    borderRadius: string;
  }
  interface ThemeOptions {
    boxShadow: string;
    borderRadius: string;
  }
  interface Palette {
    colorSchemes: DefinedColors;
  }
  interface PaletteOptions {
    colorSchemes: DefinedColors;
  }
}

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    content: React.CSSProperties['color'];
    header: React.CSSProperties['color'];
    footer: React.CSSProperties['color'];
  }

  interface TypeText {
    light: React.CSSProperties['color'];
    dark: React.CSSProperties['color'];
  }
}
