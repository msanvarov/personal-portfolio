import { ThemeConfigurator } from '@/components/ThemeConfigurator.component';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ArrowUpRight, Coffee } from 'lucide-react';
import { useState } from 'react';
import { STUDIO } from '@/utils/studio';
import { menu } from './menu';

const calendlyUrl = import.meta.env.VITE_CALENDLY_URL;

const isActive = (pathname: string, path: string) =>
  path === '/' ? pathname === '/' : pathname.startsWith(path);

/** Two-line "hamburger" that morphs into an X, like Apple's mobile nav. */
const MenuGlyph = ({ open }: { open: boolean }) => (
  <span className="relative block h-3 w-4" aria-hidden>
    <span
      className={cn(
        'absolute left-0 h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-apple)]',
        open ? 'top-[5px] rotate-45' : 'top-[2px]',
      )}
    />
    <span
      className={cn(
        'absolute left-0 h-[1.5px] w-4 rounded-full bg-current transition-transform duration-300 ease-[var(--ease-apple)]',
        open ? 'top-[5px] -rotate-45' : 'top-[8px]',
      )}
    />
  </span>
);

export const Header = () => {
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // The pill lifts with a soft shadow once content scrolls underneath it.
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 8));

  return (
    <header className="pointer-events-none sticky top-0 z-50 px-3 pt-3 md:pt-4">
      <div
        className={cn(
          'material pointer-events-auto mx-auto flex h-14 max-w-4xl items-center justify-between gap-4 rounded-full border border-border pl-4 pr-2.5 transition-shadow duration-300 md:pl-5',
          scrolled
            ? 'shadow-[0_8px_32px_-12px_rgb(0_0_0/0.18)]'
            : 'shadow-[0_2px_12px_-6px_rgb(0_0_0/0.08)]',
        )}
      >
        <Link to="/" aria-label="Home" className="group shrink-0">
          <img
            src="/assets/logo/logo.png"
            alt="Sal Anvarov logo"
            className="h-8 w-auto transition-transform duration-500 ease-[var(--ease-apple)] group-hover:-rotate-12 group-active:scale-90"
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {menu.map((entry) => {
            const active = isActive(pathname, entry.path);
            return (
              <Link
                key={entry.path}
                to={entry.path}
                className={cn(
                  'relative rounded-full px-3.5 py-1.5 text-[0.8rem] transition-colors',
                  active
                    ? 'font-medium text-foreground'
                    : 'text-foreground/65 hover:text-foreground',
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-foreground/[0.07]"
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  />
                ) : null}
                <span className="relative">{entry.label}</span>
              </Link>
            );
          })}
          <a
            href={STUDIO.url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-[0.8rem] text-foreground/65 transition-colors hover:text-foreground"
          >
            Studio <ArrowUpRight className="size-3" />
          </a>
        </nav>

        <div className="flex items-center gap-2">
          {calendlyUrl ? (
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-brand hidden h-8 rounded-full px-3.5 text-[0.8rem] md:inline-flex"
            >
              <Coffee className="size-3.5" /> Chat with Sal
            </a>
          ) : null}
          <ThemeConfigurator />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-8 place-items-center rounded-full text-foreground transition-colors hover:bg-foreground/[0.07] active:scale-95 md:hidden"
            >
              <MenuGlyph open={open} />
            </SheetTrigger>
            <SheetContent
              side="top"
              showCloseButton={false}
              overlayClassName="bg-background/30"
              className="material rounded-[1.75rem] border border-border bg-transparent shadow-[0_16px_48px_-16px_rgb(0_0_0/0.25)] data-[side=top]:inset-x-3 data-[side=top]:top-[4.75rem] data-[side=top]:max-h-[calc(100dvh-5.5rem)] data-[side=top]:overflow-y-auto data-[side=top]:border-b"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav aria-label="Mobile" className="flex flex-col gap-1 p-5">

                {menu.map((entry) => (
                  <Link
                    key={entry.path}
                    to={entry.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-2xl py-2.5 text-[1.75rem] font-semibold tracking-[-0.02em] transition-colors',
                      isActive(pathname, entry.path)
                        ? 'text-foreground'
                        : 'text-foreground/55 hover:text-foreground',
                    )}
                  >
                    {entry.label}
                  </Link>
                ))}
                <a
                  href={STUDIO.url}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 rounded-2xl py-2.5 text-[1.75rem] font-semibold tracking-[-0.02em] text-foreground/55 transition-colors hover:text-foreground"
                >
                  Studio <ArrowUpRight className="size-6" />
                </a>
                {calendlyUrl ? (
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="btn-brand mt-6 h-12 text-base"
                  >
                    <Coffee className="size-4" /> Chat with Sal
                  </a>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
