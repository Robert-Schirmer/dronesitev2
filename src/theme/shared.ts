// Shared theme parts

import type { PaletteOptions, ThemeOptions } from '@mui/material';
import { ColorSchemes } from './enums';

export const sharedTheme: Partial<ThemeOptions> = {
  borderRadius: '20px',
  boxShadow:
    'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;',
  typography: {
    fontFamily: 'Poppins, Roboto',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'none',
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: 'secondary',
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1800,
    },
  },
};

export const sharedPalette: Partial<PaletteOptions> = {
  colorSchemes: {
    [ColorSchemes.AVOCADO_ONION]: {
      main: '#D90368',
      secondary: '#29BF12',
    },
    [ColorSchemes.BLACK_ICE]: {
      main: '#000022',
      secondary: '#30BCED',
    },
    [ColorSchemes.BURNT_ORANGE]: {
      main: '#FF7733',
      secondary: '#107E7D',
    },
    [ColorSchemes.DARK_EMBER]: {
      main: '#323031',
      secondary: '#DB3A34',
    },
    [ColorSchemes.CROWN_ROYAL]: {
      main: '#81559B',
      secondary: '#B2EF9B',
    },
    [ColorSchemes.AQUA_BRICK]: {
      main: '#C14953',
      secondary: '#60D394',
    },
    [ColorSchemes.ROCKET_POP]: {
      main: '#D91E36',
      secondary: '#2AF5FF',
    },
  },
};
