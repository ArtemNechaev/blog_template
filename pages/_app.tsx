import React, { useState } from 'react';
import { AppProps } from "next/app"
//import { Provider } from 'next-auth/client'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Provider from '../components/Provider'
import {useStore} from '../store/index'

import Layout from '../components/Layout'
import theme from '../lib/theme'


const App = ({ Component, pageProps }: AppProps) => {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  const store = useStore(pageProps.initialReduxState)
  return (
    <Provider session={pageProps.session} store = {store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>

  );
};

export default App;
