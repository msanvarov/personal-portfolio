import { Preloader } from '@/components/Preloader.component';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { router } from '@/router';
import { persistor, store } from '@/store';
import '@/styles/styles-light.scss';
import '@/styles/styles.scss';
import { TrackingProvider } from '@/utils/tracking';
import { RouterProvider } from '@tanstack/react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        <HelmetProvider>
          <ThemeProvider defaultTheme="dark">
            <RouterProvider router={router} />
            <TrackingProvider />
          </ThemeProvider>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
