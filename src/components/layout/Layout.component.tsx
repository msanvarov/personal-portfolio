import { DocumentHead } from '@/components/DocumentHead.component';
import { useLocation } from '@tanstack/react-router';
import classNames from 'classnames';
import { motion, useReducedMotion } from 'framer-motion';
import { lazy, Suspense, useEffect, useState, type ReactNode } from 'react';
import { Breadcrumb } from './Breadcrumb.component';
import { Footer } from './Footer.component';
import { Header } from './Header.component';

const PopupWidget = lazy(() =>
  import('react-calendly').then((mod) => ({ default: mod.PopupWidget }))
);

const calendlyUrl = import.meta.env.VITE_CALENDLY_URL;

type LayoutProps = {
  title?: string;
  breadcrumb?: string;
  heading?: string;
  wrapperClass?: string;
  children: ReactNode;
  head?: ReactNode;
};

export const Layout = ({
  title,
  breadcrumb,
  heading,
  wrapperClass,
  head,
  children,
}: LayoutProps) => {
  const [rootEl, setRootEl] = useState<HTMLElement | null>(null);
  const { pathname } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    setRootEl(document.getElementById('root'));
  }, []);

  // Soft route transition: small fade + lift on the main section. Skip
  // entirely when the user has prefers-reduced-motion turned on.
  const motionProps = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] as const },
      };

  return (
    <>
      <DocumentHead title={title}>{head}</DocumentHead>
      <motion.section
        key={pathname}
        className={classNames(wrapperClass ? wrapperClass : 'main-homepage')}
        {...motionProps}
      >
        <Header />
        {breadcrumb ? (
          <Breadcrumb breadcrumb={breadcrumb} heading={heading} />
        ) : null}
        {children}
      </motion.section>
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
