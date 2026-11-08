import { Link } from '@tanstack/react-router';
import { menu } from './menu';

export const Footer = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-4 py-10 text-center md:flex-row md:justify-between md:px-6 md:text-left">
        <Link
          to="/"
          aria-label="Home"
          className="group flex items-center gap-3"
        >
          <img
            src="/assets/logo/logo.png"
            alt="Sal Anvarov logo"
            className="h-9 w-auto transition-transform duration-500 ease-[var(--ease-apple)] group-hover:rotate-12"
          />
          <p className="text-xs text-muted-foreground">
            Made with 💙 and ☕ by{' '}
            <span className="font-medium text-foreground">Sal Anvarov</span>
          </p>
        </Link>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {menu.map((entry) => (
            <li key={entry.path}>
              <Link
                to={entry.path}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                {entry.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};
