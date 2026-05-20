import { useTheme } from '@/providers/ThemeProvider';

export const ThemeConfigurator = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="switcher__btn shadow-box theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      data-state={isDark ? 'dark' : 'light'}
    >
      <span className="theme-toggle__icon" aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Sun core — shrinks/fades when dark */}
          <circle className="theme-toggle__sun" cx="12" cy="12" r="4.5" />
          <g className="theme-toggle__rays">
            <line x1="12" y1="2.5" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="21.5" />
            <line x1="2.5" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="21.5" y2="12" />
            <line x1="5.1" y1="5.1" x2="6.9" y2="6.9" />
            <line x1="17.1" y1="17.1" x2="18.9" y2="18.9" />
            <line x1="5.1" y1="18.9" x2="6.9" y2="17.1" />
            <line x1="17.1" y1="6.9" x2="18.9" y2="5.1" />
          </g>
          {/* Moon mask — slides over the sun when going dark */}
          <circle
            className="theme-toggle__moon"
            cx="17"
            cy="9"
            r="5.5"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </span>
    </button>
  );
};
