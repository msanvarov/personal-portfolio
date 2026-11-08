import { ThemeConfigurator } from '@/components/ThemeConfigurator.component';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion';
import { Coffee, Menu } from 'lucide-react';
import { useState } from 'react';
import { menu } from './menu';

const calendlyUrl = import.meta.env.VITE_CALENDLY_URL;

const isActive = (pathname: string, path: string) =>
  path === '/' ? pathname === '/' : pathname.startsWith(path);

export const Header = () => {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Hide while scrolling down, reveal on any upward scroll.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > previous && y > 220);
  });

  return (
    <motion.header
      initial={reduce ? false : { y: -40, opacity: 0 }}
      animate={{ y: hidden && !open ? -120 : 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5"
    >
      <div
        className={cn(
          'mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border px-2 py-2 transition-[background-color,border-color,box-shadow] duration-500 md:px-3',
          scrolled
            ? 'border-border bg-background/70 shadow-[0_20px_50px_-25px_rgb(0_0_0/0.5)] backdrop-blur-xl'
            : 'border-transparent',
        )}
      >
        <Link to="/" aria-label="Home" className="group shrink-0">
          <img
            src="/assets/logo/logo.png"
            alt="Sal Anvarov logo"
            className="h-11 w-auto transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 md:h-12"
          />
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 rounded-full border border-border bg-background/40 p-1 backdrop-blur md:flex"
        >
          {menu.map((entry) => {
            const active = isActive(pathname, entry.path);
            return (
              <Link
                key={entry.path}
                to={entry.path}
                className={cn(
                  'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-secondary shadow-[inset_0_0_0_1px_var(--bento-edge)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                ) : null}
                <span className="relative">{entry.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {calendlyUrl ? (
            <Button
              asChild
              size="sm"
              className="hidden h-10 rounded-full bg-brand px-4 text-brand-foreground hover:bg-brand/90 lg:inline-flex"
            >
              <a href={calendlyUrl} target="_blank" rel="noreferrer noopener">
                <Coffee className="size-4" /> Chat with Sal
              </a>
            </Button>
          ) : null}
          <ThemeConfigurator />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open menu"
                className="size-10 rounded-full bg-background/40 backdrop-blur md:hidden"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] max-w-sm">
              <SheetHeader>
                <SheetTitle className="font-heading text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="flex flex-col gap-1 px-4">
                {menu.map((entry) => (
                  <Link
                    key={entry.path}
                    to={entry.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block rounded-2xl px-4 py-3 font-heading text-3xl font-semibold transition-colors',
                      isActive(pathname, entry.path)
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {entry.label}
                  </Link>
                ))}
                {calendlyUrl ? (
                  <Button
                    asChild
                    className="mt-4 h-12 rounded-full bg-brand text-brand-foreground hover:bg-brand/90"
                  >
                    <a
                      href={calendlyUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <Coffee className="size-4" /> Chat with Sal
                    </a>
                  </Button>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};
