import React, { lazy, useReducer, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { theme, Theme } from "@utils/theme";
import {
  Transition,
  TransitionGroup,
  config as transitionConfig
} from "react-transition-group";
import GothamBook from "@assets/fonts/gotham-book.woff2";
import GothamMedium from "@assets/fonts/gotham-medium.woff2";
import useLocalStorage from "@hooks/useLocalStorage";
import { prefersReducedMotion } from "@hooks";
import prerender from "@utils/prerender";
import { HelmetProvider, Helmet } from "react-helmet-async";
import createContext from "@hooks/createContext";
import { ThemeProvider } from "styled-components";

// const NotFound = lazy(() => import("pages/404"));

const consoleMessage = `
             \u005f
   \u0028\u0029       \u007c \u007c
   \u002f\u005c  \u005f\u005f\u002c  \u007c \u007c
  \u002f  \u005c\u002f  \u007c  \u007c\u002f
 \u002f\u0028\u005f\u005f\u002f\u005c\u005f\u002f\u007c\u005f\u002f\u007c\u005f\u005f\u002f
\n\nTaking a peek huh? Check out the source: https://github.com/msanvarov/personal-portfolio\n\n
`;

const startingState = {
  menuOpen: false,
  currentTheme: theme.dark
};

type AppState = typeof startingState;

type Action =
  | { type: "setTheme"; payload: Theme }
  | { type: "updateTheme"; payload: Theme }
  | { type: "toggleTheme"; payload: boolean }
  | { type: "toggleMenu" };

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "setTheme":
      return { ...state, currentTheme: action.payload };
    case "updateTheme":
      return {
        ...state,
        currentTheme: { ...theme[state.currentTheme.id], ...action.payload }
      };
    case "toggleTheme": {
      const newThemeKey = state.currentTheme.id === "dark" ? "light" : "dark";
      window.localStorage.setItem("theme", JSON.stringify(newThemeKey));
      return { ...state, currentTheme: theme[newThemeKey] };
    }
    case "toggleMenu":
      return { ...state, menuOpen: !state.menuOpen };
    default:
      throw new Error();
  }
};

const [appContext, AppProvider] = createContext(reducer, startingState);
export const AppContext = appContext;
export const TransitionContext = createContext();

export const fontStyles = `
  @font-face {
    font-family: 'Gotham';
    font-weight: 400;
    src: url(${GothamBook}) format('woff2');
    font-display: swap;
  }
  @font-face {
    font-family: 'Gotham';
    font-weight: 500;
    src: url(${GothamMedium}) format('woff2');
    font-display: swap;
  }
`;

const App = () => {
  const [storedTheme] = useLocalStorage<string>("theme", "dark");
  const [state, dispatch] = useReducer(reducer, startingState);
  const { currentTheme } = state;

  useEffect(() => {
    if (prefersReducedMotion) {
      transitionConfig.disabled = true;
    } else {
      transitionConfig.disabled = false;
    }
  }, []);

  useEffect(() => {
    if (!prerender) console.info(consoleMessage);
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    dispatch({ type: "setTheme", payload: theme[storedTheme] });
  }, [storedTheme]);
  return (
    <HelmetProvider>
      <ThemeProvider theme={currentTheme}>
        <AppProvider>
          <BrowserRouter>
            <Route
              render={({ location }) => (
                <>
                  <Helmet>
                    <link
                      rel="canonical"
                      href={`https://msanvarov.firebaseapp.com${location.pathname}`}
                    />
                    <link
                      rel="preload"
                      href={GothamBook}
                      as="font"
                      crossOrigin=""
                    />
                    <link
                      rel="preload"
                      href={GothamMedium}
                      as="font"
                      crossOrigin=""
                    />
                    <style>{fontStyles}</style>
                  </Helmet>
                  <GlobalStyles />
                  <SkipToMain href="#MainContent">
                    Skip to main content
                  </SkipToMain>
                  <Header location={location} />
                  <TransitionGroup
                    component={AppMainContent}
                    tabIndex={-1}
                    id="MainContent"
                    role="main"
                  >
                    <Transition
                      key={location.pathname}
                      timeout={300}
                      onEnter={reflow}
                    >
                      {status => (
                        <TransitionContext.Provider
                          value={{ ...state, dispatch, status }}
                        >
                          <AppPage status={status}>
                            <Suspense fallback={<Fragment />}>
                              <Switch location={location}>
                                <Route exact path="/" component={Home} />
                                <Route path="/contact" component={Contact} />
                                <Route
                                  path="/projects/smart-sparrow"
                                  component={ProjectSPR}
                                />
                                <Route
                                  path="/projects/slice"
                                  component={ProjectSlice}
                                />
                                <Route
                                  path="/projects/volkihar-knight"
                                  component={ProjectVolkihar}
                                />
                                {/* <Route path="/articles" component={Articles} /> */}
                                <Route component={NotFound} />
                              </Switch>
                            </Suspense>
                          </AppPage>
                        </TransitionContext.Provider>
                      )}
                    </Transition>
                  </TransitionGroup>
                </>
              )}
            />
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export const GlobalStyles = createGlobalStyle`
  html,
  body {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  	-moz-osx-font-smoothing: grayscale;
    font-family: ${props => props.theme.fontStack};
    background: ${props => props.theme.colorBackground};
    color: ${props => props.theme.colorText};
    border: 0;
    margin: 0;
    width: 100vw;
    overflow-x: hidden;
    font-weight: 400;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  ::selection {
    background: ${props => props.theme.colorAccent};
    color: rgb(0, 0, 0, 0.9);
  }
  #root *,
  #root *::before,
  #root *::after {
    @media (prefers-reduced-motion: reduce) {
      animation-duration: 0s;
      animation-delay: 0s;
      transition-duration: 0s;
      transition-delay: 0s;
    }
  }
`;

const AppMainContent = styled.main`
  width: 100%;
  overflow-x: hidden;
  position: relative;
  background: ${props => props.theme.colorBackground};
  transition: background 0.4s ease;
  outline: none;
  display: grid;
  grid-template-columns: 100%;
`;

const AppPage = styled.div`
  overflow-x: hidden;
  opacity: 0;
  grid-column: 1;
  grid-row: 1;
  transition: opacity 0.3s ease;
  ${props =>
    (props.status === "exiting" || props.status === "entering") &&
    css`
      opacity: 0;
    `}
  ${props =>
    props.status === "entered" &&
    css`
      transition-duration: 0.5s;
      transition-delay: 0.2s;
      opacity: 1;
    `}
`;

const SkipToMain = styled.a`
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  color: ${props => props.theme.colorBackground};
  z-index: 99;
  &:focus {
    background: ${props => props.theme.colorPrimary};
    padding: 8px 16px;
    position: fixed;
    top: 16px;
    left: 16px;
    clip: auto;
    width: auto;
    height: auto;
    text-decoration: none;
    font-weight: 500;
    line-height: 1;
    clip-path: ${props => props.theme.clipPath(8)};
  }
`;

export default App;
