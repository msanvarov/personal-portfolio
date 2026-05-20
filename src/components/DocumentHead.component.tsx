import { Helmet } from 'react-helmet-async';
import type { ReactNode } from 'react';

type DocumentHeadProps = {
  title?: string;
  children?: ReactNode;
};

export const DocumentHead = ({ title, children }: DocumentHeadProps) => {
  return (
    <Helmet>
      <title>{`Sal Anvarov - ${title ?? 'Portfolio'}`}</title>
      {children}
    </Helmet>
  );
};
