import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = 'theme';

const ThemeContext = createContext<ThemeContextValue | null>(null);

const readInitialTheme = (defaultTheme: Theme): Theme => {
  if (typeof window === 'undefined') return defaultTheme;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
    return defaultTheme;
  } catch {
    // localStorage can throw in private mode, sandboxed iframes, or when
    // the user has disabled site storage. Fall back to the default.
    return defaultTheme;
  }
};

type ThemeProviderProps = {
  defaultTheme?: Theme;
  children: ReactNode;
};

export const ThemeProvider = ({
  defaultTheme = 'dark',
  children,
}: ThemeProviderProps) => {
  const [theme, setThemeState] = useState<Theme>(() =>
    readInitialTheme(defaultTheme)
  );

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${theme}`);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore quota/SecurityErrors in private mode
    }
  }, [theme]);

  const setTheme = useCallback((next: Theme) => setThemeState(next), []);
  const toggleTheme = useCallback(
    () => setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark')),
    []
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: 'dark' as Theme,
      setTheme: () => undefined,
      toggleTheme: () => undefined,
    };
  }
  return ctx;
};
