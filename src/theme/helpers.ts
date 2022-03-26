import type { Theme } from '@mui/material';
import type { ColorScheme } from './augments';
import { ColorSchemes } from './enums';

// Index into theme to grab a color scheme
export const cScheme = (theme: Theme, scheme: ColorSchemes): ColorScheme => {
  return theme.palette.colorSchemes[scheme];
};
