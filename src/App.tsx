import '@/styles/globals.css';

import { Preloader } from '@/components/Preloader.component';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { router } from '@/router';
import { persistor, store } from '@/store';
import { TrackingProvider } from '@/utils/tracking';
import { RouterProvider } from '@tanstack/react-router';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<Preloader />} persistor={persistor}>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
          <TrackingProvider />
        </ThemeProvider>
      </HelmetProvider>
    </PersistGate>
  </Provider>
);

export default App;
