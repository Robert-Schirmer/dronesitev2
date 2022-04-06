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
      main: '#35A7FF',
    },
    secondary: {
      main: '#05F140',
    },
    text: {
      primary: '#EAEAEA',
      light: '#EAEAEA',
      dark: '#020300',
    },
    error: {
      main: '#D81159',
    },
    background: {
      default: '#020300',
      content: '#020300',
      header: '#020300',
      footer: '#020300',
    },
    ...sharedPalette,
  },
  ...sharedTheme,
});

theme = responsiveFontSizes(theme);

export default theme;
