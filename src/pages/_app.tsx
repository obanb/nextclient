import * as React from 'react';

import Head from 'next/head';
import App from 'next/app';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { green, purple } from '@material-ui/core/colors';

// This is optional but highly recommended
// since it prevents memory leak

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

class MainApp extends App<{
  apolloClient: any;
  locale: any;
  messages: any;
  formats: any;
}> {
  static async getInitialProps({ Component, ctx }: any) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    const { locale, messages, formats } =
      req || (window as any).__NEXT_DATA__.props;

    return { pageProps, locale, messages, formats };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      (jssStyles.parentElement as any).removeChild(jssStyles);
    }
  }

  render() {
    const {
      Component,
      pageProps,
      locale,
      formats,
      messages,
      apolloClient,
    } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Strategy Game</title>
          {/* Add HTML meta tags here (not in _document.tsx) to prevent duplicating of default ones and rather override them. See https://github.com/zeit/next.js/issues/6919#issuecomment-500471583 */}
          {/* By default <meta charSet="utf-8" /> is added by Next.js. See https://github.com/zeit/next.js/issues/237 */}
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, shrink-to-fit=no, viewport-fit=cover"
          />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline normalizes basic styles across browsers (CSS reset). See https://material-ui.com/components/css-baseline */}
          <CssBaseline />

          <Component {...pageProps} />
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default MainApp;
