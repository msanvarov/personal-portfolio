import { Reveal } from '@/components/motion/Reveal';
import { Link } from '@tanstack/react-router';
import { menu } from './menu';

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/60 px-4 pb-14 pt-20">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <Link to="/" aria-label="Home" className="group">
          <img
            src="/assets/logo/logo.png"
            alt="Sal Anvarov logo"
            className="h-28 w-auto animate-float transition-transform duration-700 group-hover:rotate-12"
          />
        </Link>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {menu.map((entry) => (
            <li key={entry.path}>
              <Link
                to={entry.path}
                className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {entry.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm text-muted-foreground">
          Made with 💙 and ☕ by <span className="text-brand">Sal Anvarov</span>
        </p>
      </Reveal>
    </footer>
  );
};
