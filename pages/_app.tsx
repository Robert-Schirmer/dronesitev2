import { CacheProvider, EmotionCache } from '@emotion/react';
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
import createEmotionCache from '../src/utils/functions/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  useEffect(() => {
    // Kick off ployfill for native smooth scrolling
    smoothscroll.polyfill();
  }, []);

  return (
    <CacheProvider value={emotionCache}>
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
    </CacheProvider>
  );
}

export default MyApp;

interface MyAppProps extends AppProps {
  emotionCache: EmotionCache;
}
