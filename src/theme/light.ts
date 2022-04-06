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
      main: '#35A7FF',
    },
    secondary: {
      main: '#05F140',
    },
    text: {
      primary: '#020300',
      light: '#EAEAEA',
      dark: '#020300',
    },
    error: {
      main: '#D81159',
    },
    background: {
      default: '#EAEAEA',
      content: '#EAEAEA',
      header: '#EAEAEA',
      footer: '#EAEAEA',
    },
    ...sharedPalette,
  },
  ...sharedTheme,
});

theme = responsiveFontSizes(theme);

export default theme;
