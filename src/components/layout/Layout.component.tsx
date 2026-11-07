import { DocumentHead } from '@/components/DocumentHead.component';
import { cn } from '@/lib/utils';
import { useLocation } from '@tanstack/react-router';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { Footer } from './Footer.component';
import { Header } from './Header.component';

const PopupWidget = lazy(() =>
  import('react-calendly').then((mod) => ({ default: mod.PopupWidget }))
);

const calendlyUrl = import.meta.env.VITE_CALENDLY_URL;

type LayoutProps = {
  title?: string;
  className?: string;
  children: ReactNode;
  head?: ReactNode;
};

/** Grid + glow backdrop; the glows drift as the page scrolls. */
const Backdrop = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      <motion.div
        style={{ y: y1 }}
        className="absolute -left-40 -top-40 size-[34rem] rounded-full bg-brand/20 blur-[120px] dark:bg-brand/15"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute -right-40 top-1/3 size-[30rem] rounded-full bg-[#9aa9ff]/20 blur-[140px] dark:bg-[#7c5cff]/10"
      />
    </div>
  );
};

export const Layout = ({ title, className, head, children }: LayoutProps) => {
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    setRootEl(document.getElementById('root'));
  }, []);

  return (
    <>
      <DocumentHead title={title}>{head}</DocumentHead>
      <Backdrop />
      <Header />
      <motion.main
        key={pathname}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'relative mx-auto w-full max-w-6xl px-4 pb-24 pt-28 md:px-6 md:pt-36',
          className
        )}
      >
        {children}
      </motion.main>
      {calendlyUrl && rootEl ? (
        <Suspense fallback={null}>
          <PopupWidget
            url={calendlyUrl}
            rootElement={rootEl}
            text="☕ Chat with Sal"
            color="#5b78f6"
          />
        </Suspense>
      ) : null}
      <Footer />
    </>
  );
};
