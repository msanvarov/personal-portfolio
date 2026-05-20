import { Preloader } from '@/components/Preloader';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { persistor, store } from '@/store';
import { TrackingProvider } from '@/utils/tracking';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import '@/styles/styles.scss';
import '@/styles/styles-light.scss';

const LandingPage = lazy(() => import('@/routes/LandingPage'));
const BioPage = lazy(() => import('@/routes/BioPage'));
const CredentialsPage = lazy(() => import('@/routes/CredentialsPage'));
const ContactPage = lazy(() => import('@/routes/ContactPage'));
const OfferingsPage = lazy(() => import('@/routes/OfferingsPage'));
const PortfolioListPage = lazy(() => import('@/routes/PortfolioListPage'));
const PortfolioEntryPage = lazy(() => import('@/routes/PortfolioEntryPage'));
const PostsListPage = lazy(() => import('@/routes/PostsListPage'));
const PostPage = lazy(() => import('@/routes/PostPage'));

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        <HelmetProvider>
          <ThemeProvider defaultTheme="dark">
            <Router>
              <AnimatePresence mode="wait" initial={false}>
                <main>
                  <Suspense fallback={<Preloader />}>
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/bio" element={<BioPage />} />
                      <Route
                        path="/credentials"
                        element={<CredentialsPage />}
                      />
                      <Route path="/contact" element={<ContactPage />} />
                      <Route path="/offerings" element={<OfferingsPage />} />
                      <Route
                        path="/portfolio"
                        element={<PortfolioListPage />}
                      />
                      <Route
                        path="/portfolio/:entry"
                        element={<PortfolioEntryPage />}
                      />
                      <Route path="/posts" element={<PostsListPage />} />
                      <Route path="/posts/:post" element={<PostPage />} />
                    </Routes>
                  </Suspense>
                  <TrackingProvider />
                </main>
              </AnimatePresence>
            </Router>
          </ThemeProvider>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
