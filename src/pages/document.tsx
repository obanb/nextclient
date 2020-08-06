import * as React from 'react';

import Document, { DocumentContext, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class MainDocument extends Document<any> {
  render() {
    // Polyfill Intl API for older browsers
    const polyfill = `https://cdn.polyfill.io/v3/polyfill.min.js?features=Intl.~locale.${this.props.locale}`;

    return (
      <html>
      <Head>
      </Head>
      <body>
      <Main />
      <script src={polyfill} />
      <script
        dangerouslySetInnerHTML={{
          __html: this.props.localeDataScript,
        }}
      />
      <NextScript />
      </body>
      </html>
    );
  }
}

MainDocument.getInitialProps = async (ctx: DocumentContext) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const props = await Document.getInitialProps(ctx);

  const {
    req: { locale, localeDataScript },
  } = ctx as any;

  return {
    ...props,
    locale,
    localeDataScript,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(props.styles), sheets.getStyleElement()],
  };
};