import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@gpseries/ui';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { NextIntlProvider } from 'next-intl';
import PropTypes from 'prop-types';
import React from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <NextIntlProvider messages={pageProps.messages}>
        <ChakraProvider>
          <Head>
            <title>GPSeries</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            <div style={{ display: 'flex', height: '100%', width: '100%' }}>
              <CssBaseline />
              <Component {...pageProps} />
            </div>
          </ThemeProvider>
        </ChakraProvider>
      </NextIntlProvider>
    </NextAuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
};
