import Hotjar from '@hotjar/browser';
import { Preloader } from '@msanvarov/core-components';
import { persistor, store } from '@msanvarov/store';
import { Analytics } from '@vercel/analytics/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { Lato } from 'next/font/google';
import Head from 'next/head';
import Router from 'next/router';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './styles-light.scss';
import './styles.scss';

const font = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

const CustomApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    AOS.init();

    const siteId = parseInt(process.env.HOTJAR_WEBSITE_UID ?? '3629844', 10);
    const hotjarVersion = parseInt(process.env.HOTJAR_VERSION ?? '6', 10);

    Hotjar.init(siteId, hotjarVersion);
  }, []);

  useEffect(() => {
    // Page transition
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setTimeout(() => setLoading(false), 250);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, [Router]);

  return (
    <Provider {...{ store }}>
      <PersistGate loading={<Preloader />} {...{ persistor }}>
        <ThemeProvider
          {...{
            defaultTheme: 'dark',
          }}
        >
          <Head>
            <title>Sal Anvarov - Personal Portfolio</title>
            <meta name="title" content="Sal Anvarov" />
            <meta
              name="description"
              content="Hard-working developer with a flair for creating elegant solutions to complex problems. Team player with a can-do attitude and a strong focus on client satisfaction. Diverse experience with modern technologies and cloud providers like AWS and GCP with enterprise DevOps experience. Likes to contribute to open-source and create apps on his free time."
            />

            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://www.sal-anvarov.com/" />
            <meta property="og:title" content="Sal Anvarov" />
            <meta
              property="og:description"
              content="Hard-working developer with a flair for creating elegant solutions to complex problems. Team player with a can-do attitude and a strong focus on client satisfaction. Diverse experience with modern technologies and cloud providers like AWS and GCP with enterprise DevOps experience. Likes to contribute to open-source and create apps on his free time."
            />
            <meta
              property="og:image"
              content="https://www.sal-anvarov.com/assets/logo/logo-lg.png"
            />

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta
              property="twitter:url"
              content="https://www.sal-anvarov.com/"
            />
            <meta property="twitter:title" content="Sal Anvarov" />
            <meta
              property="twitter:description"
              content="Hard-working developer with a flair for creating elegant solutions to complex problems. Team player with a can-do attitude and a strong focus on client satisfaction. Diverse experience with modern technologies and cloud providers like AWS and GCP with enterprise DevOps experience. Likes to contribute to open-source and create apps on his free time."
            />
            <meta
              property="twitter:image"
              content="https://www.sal-anvarov.com/assets/logo/logo-lg.png"
            />

            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/iconoir/6.9.0/css/iconoir.min.css"
            />
            {/* RUM for DebugBear */}
            <script
              src={`https://cdn.debugbear.com/${process.env.DEBUGBEAR_RUM_UID}.js`}
              async
            ></script>
            {/* Microsoft Clarity */}
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{
                __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${
                process.env.MICROSOFT_CLARITY_UID ?? 'inxvkei7ob'
              }");
            `,
              }}
            />
          </Head>
          {/* Google Tag Manager */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${
              process.env.GOOGLE_TAG_MANAGER_UID ?? 'AW-779764156'
            }`}
          />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${
            process.env.GOOGLE_TAG_MANAGER_UID ?? 'AW-779764156'
          }');
        `}
          </Script>
          <AnimatePresence mode="wait" initial={false}>
            <main className={font.className}>
              {loading ? <Preloader /> : <Component {...pageProps} />}
              <Analytics />
            </main>
          </AnimatePresence>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default CustomApp;
