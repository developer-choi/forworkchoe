import React from 'react';
import type {AppProps} from 'next/app';
import {ThemeProvider} from 'styled-components';
import {theme} from '../src/utils/style/theme';
import {GlobalStyle} from '../src/utils/style/global';

/**
 * https://github.com/vercel/next.js/blob/master/examples/with-styled-components/pages/_app.js
 */
export default function App({Component, pageProps}: AppProps) {
  return (
      <>
        <GlobalStyle/>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
  );
}
