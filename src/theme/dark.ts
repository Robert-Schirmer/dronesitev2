import { responsiveFontSizes } from '@mui/material';
import createMyTheme from './CustomTheme';
import { sharedPalette, sharedTheme } from './shared';

// Create a theme instance.
let theme = createMyTheme({
  // Can't get this typed correctly all the way 🤔
  //@ts-ignore
  palette: {
    mode: 'dark',
    primary: {
      main: '#E71D36',
    },
    secondary: {
      main: '#B388EB',
    },
    text: {
      primary: '#FCF7FF',
      light: '#FCF7FF',
      dark: '#30343F',
    },
    error: {
      main: '#D81159',
    },
    background: {
      default: '#30343F',
      content: '#30343F',
      header: '#30343F',
      footer: '#30343F',
    },
    ...sharedPalette,
  },
  ...sharedTheme,
});

theme = responsiveFontSizes(theme);

export default theme;
