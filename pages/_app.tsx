import { CssBaseline, StyledEngineProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import '../src/theme/app.css';
import '../src/theme/fonts.css';
import '../src/theme/animations.css';
import smoothscroll from 'smoothscroll-polyfill';
import AppHead from '../src/components/Layout/AppHead';
import DynamicProviders from '../src/components/Providers/DynamicProviders';
import ThemeProvider from '../src/contexts/ThemeContext/ThemeProvider';
import { consoleArt } from '../src/utils/functions';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Kick off ployfill for native smooth scrolling
    smoothscroll.polyfill();
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
    consoleArt();
  }, []);

  return (
    <>
      <AppHead />
      <StyledEngineProvider injectFirst>
        <ThemeProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <DynamicProviders>
            <Component {...pageProps} />
          </DynamicProviders>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
