import { Preloader } from '@msanvarov/core-components';
import { persistor, store } from '@msanvarov/store';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { Lato } from 'next/font/google';
import Head from 'next/head';
import Router from 'next/router';
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

    // Page transition
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      console.log('CALLING');
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <Provider {...{ store }}>
      <PersistGate loading={<Preloader />} {...{ persistor }}>
        <ThemeProvider>
          <Head>
            <title>Sal Anvarov - Personal Portfolio</title>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/iconoir/6.9.0/css/iconoir.min.css"
            />
          </Head>
          <AnimatePresence mode="wait" initial={false}>
            <main className={font.className}>
              {loading ? <Preloader /> : <Component {...pageProps} />}
            </main>
          </AnimatePresence>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default CustomApp;
