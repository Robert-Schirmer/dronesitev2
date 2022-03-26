import { responsiveFontSizes } from '@mui/material';
import createMyTheme from './CustomTheme';
import { sharedPalette, sharedTheme } from './shared';

// Create a theme instance.
let theme = createMyTheme({
  // Can't get this typed correctly all the way 🤔
  //@ts-ignore
  palette: {
    mode: 'light',
    primary: {
      main: '#E71D36',
    },
    secondary: {
      main: '#38AECC',
    },
    text: {
      primary: '#343633',
      light: '#FCF7FF',
      dark: '#343633',
    },
    error: {
      main: '#D81159',
    },
    background: {
      default: '#FCF7FF',
      content: '#FCF7FF',
      header: '#FCF7FF',
      footer: '#FCF7FF',
    },
    ...sharedPalette,
  },
  ...sharedTheme,
});

theme = responsiveFontSizes(theme);

export default theme;
