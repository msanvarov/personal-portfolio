import { DocumentHead } from '@/components/DocumentHead.component';
import { cn } from '@/lib/utils';
import { useLocation } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { type ReactNode } from 'react';
import { Footer } from './Footer.component';
import { Header } from './Header.component';

type LayoutProps = {
  title?: string;
  className?: string;
  children: ReactNode;
  head?: ReactNode;
};

export const Layout = ({ title, className, head, children }: LayoutProps) => {
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  return (
    <div className="relative isolate">
      <DocumentHead title={title}>{head}</DocumentHead>
      {/* Soft lavender light at the top of the page; static, never moves. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-[radial-gradient(60%_55%_at_50%_0%,var(--glow),transparent_70%)]"
      />
      <Header />
      <motion.main
        key={pathname}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
        className={cn(
          'relative mx-auto w-full max-w-6xl px-3 pb-20 pt-6 sm:px-4 md:px-6 md:pt-12',
          className,
        )}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};
