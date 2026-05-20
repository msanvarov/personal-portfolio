import { Layout } from '@/components/layout/Layout';
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter';
import { PortfolioHeader } from '@/components/portfolio/PortfolioHeader';
import { getCaseStudyBySlug } from '@/utils/content';
import { MDXProvider } from '@mdx-js/react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useParams } from 'react-router-dom';

const mdxComponents = {
  PortfolioHeader,
  PortfolioFooter,
};

const PortfolioEntryPage = () => {
  const { entry } = useParams();
  const study = entry ? getCaseStudyBySlug(entry) : undefined;

  if (!study) {
    return <Navigate to="/portfolio" replace />;
  }

  const { metadata, Component } = study;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <Layout title={metadata.title}>
      <Helmet>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.category} />
        <meta name="author" content="Sal Anvarov" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        {metadata.thumbnail ? (
          <meta property="og:image" content={`${origin}${metadata.thumbnail}`} />
        ) : null}
        <meta property="og:url" content={`${origin}${metadata.uid ?? ''}`} />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        {metadata.thumbnail ? (
          <meta
            name="twitter:image"
            content={`${origin}${metadata.thumbnail}`}
          />
        ) : null}
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <section className="project-details-wrap">
        <MDXProvider components={mdxComponents}>
          <Component />
        </MDXProvider>
      </section>
    </Layout>
  );
};

export default PortfolioEntryPage;
