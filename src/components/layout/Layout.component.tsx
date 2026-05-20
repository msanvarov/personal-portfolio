import { DocumentHead } from '@/components/DocumentHead.component';
import classNames from 'classnames';
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

  useEffect(() => {
    setRootEl(document.getElementById('root'));
  }, []);

  return (
    <>
      <DocumentHead title={title}>{head}</DocumentHead>
      <section
        className={classNames(wrapperClass ? wrapperClass : 'main-homepage')}
      >
        <Header />
        {breadcrumb ? (
          <Breadcrumb breadcrumb={breadcrumb} heading={heading} />
        ) : null}
        {children}
      </section>
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
