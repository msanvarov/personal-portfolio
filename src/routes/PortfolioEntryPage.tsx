import { Layout } from '@/components/layout/Layout';
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter';
import { PortfolioHeader } from '@/components/portfolio/PortfolioHeader';
import { getCaseStudyBySlug } from '@/utils/content';
import { breadcrumbLd, caseStudyLd, Seo, SITE_URL } from '@/utils/seo';
import { MDXProvider } from '@mdx-js/react';
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

  const { metadata, Component, slug } = study;
  const path = `/portfolio/${slug}`;
  const image = metadata.thumbnail ? `${SITE_URL}${metadata.thumbnail}` : undefined;

  return (
    <Layout title={metadata.title}>
      <Seo
        title={metadata.title}
        description={metadata.description}
        path={path}
        keywords={metadata.category}
        type="article"
        image={image}
        jsonLd={[
          caseStudyLd({
            title: metadata.title,
            description: metadata.description,
            path,
            image,
            client: metadata.title,
            category: metadata.category,
            created: metadata.created,
            modified: metadata.modified,
          }),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Portfolio', path: '/portfolio' },
            { name: metadata.title, path },
          ]),
        ]}
      />
      <section className="project-details-wrap">
        <MDXProvider components={mdxComponents}>
          <Component />
        </MDXProvider>
      </section>
    </Layout>
  );
};

export default PortfolioEntryPage;
