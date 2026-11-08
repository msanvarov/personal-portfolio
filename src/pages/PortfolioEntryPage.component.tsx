import '@/styles/case-study.css';

import { Layout } from '@/components/layout/Layout.component';
import { PortfolioFooter } from '@/components/portfolio/PortfolioFooter.component';
import { PortfolioHeader } from '@/components/portfolio/PortfolioHeader.component';
import { getCaseStudyBySlug } from '@/utils/content';
import { breadcrumbLd, caseStudyLd, Seo, SITE_URL } from '@/utils/seo';
import { MDXProvider } from '@mdx-js/react';
import { useNavigate, useParams } from '@tanstack/react-router';
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  type ComponentProps,
} from 'react';

/**
 * Adapts the legacy MDX markup before first paint: drops the "- " prefix
 * from list items (they render as chips) and reveals the blocks marked
 * `data-aos` as they scroll into view.
 */
const useLegacyMarkup = (key?: string) => {
  const ref = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    // ponytail: mutates MDX text nodes; fine while the MDX is static.
    root.querySelectorAll('.project-details-info li').forEach((li) => {
      const t = li.firstChild;
      if (t?.nodeType === Node.TEXT_NODE)
        t.textContent = (t.textContent ?? '').replace(/^\s*-\s+/, '');
    });
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    root.classList.add('aos-ready');
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    root.querySelectorAll('[data-aos]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
  return ref;
};

const PortfolioEntryPage = () => {
  const { entry } = useParams({ from: '/portfolio/$entry' });
  const study = entry ? getCaseStudyBySlug(entry) : undefined;
  const navigate = useNavigate();
  const articleRef = useLegacyMarkup(study?.slug);

  // Header/footer are placed by the MDX; give them this study's data.
  const mdxComponents = useMemo(
    () => ({
      PortfolioHeader: (props: ComponentProps<typeof PortfolioHeader>) => (
        <PortfolioHeader {...props} metadata={study?.metadata} />
      ),
      PortfolioFooter: () => <PortfolioFooter slug={study?.slug} />,
    }),
    [study],
  );

  useEffect(() => {
    if (!study) navigate({ to: '/portfolio', replace: true });
  }, [study, navigate]);

  if (!study) return null;

  const { metadata, Component, slug } = study;
  const path = `/portfolio/${slug}`;
  const image = metadata.thumbnail
    ? `${SITE_URL}${metadata.thumbnail}`
    : undefined;

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
      <article ref={articleRef} className="case-study">
        <MDXProvider components={mdxComponents}>
          <Component />
        </MDXProvider>
      </article>
    </Layout>
  );
};

export default PortfolioEntryPage;
