import { createTheme, ThemeOptions } from '@mui/material/styles';

// Create the custom theme with optional defaults
export default function createCustomTheme(options: ThemeOptions) {
  return createTheme({
    // Set default theme options here
    ...options,
  });
}
