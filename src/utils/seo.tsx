import { Helmet } from 'react-helmet-async';
import { useLocation } from '@tanstack/react-router';

export const SITE_URL = (
  import.meta.env.VITE_SITE_URL ?? 'https://www.sal-anvarov.com'
).replace(/\/+$/, '');

export const SITE_NAME = 'Sal Anvarov';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/3d-headshot.png`;

const stripSlash = (path: string) => path.replace(/\/$/, '') || '/';

export const canonicalFor = (path: string) =>
  `${SITE_URL}${stripSlash(path)}`;

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
};

export const Seo = ({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  keywords,
  noindex,
  jsonLd,
}: SeoProps) => {
  const location = useLocation();
  const resolvedPath = path ?? location.pathname;
  const url = canonicalFor(resolvedPath);
  const fullTitle = `${title} | ${SITE_NAME}`;
  const ldEntries = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={url} />
      {noindex ? <meta name="robots" content="noindex,nofollow" /> : null}

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {ldEntries.map((entry, i) => (
        <script
          key={i}
          type="application/ld+json"
          // helmet preserves the inner JSON string literally
        >
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
};

// ---- JSON-LD builders ----------------------------------------------------

export const personLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Sal Anvarov',
  alternateName: 'Salimjon Anvarov',
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  jobTitle: 'Full Stack Developer & Co-founder',
  sameAs: [
    'https://github.com/msanvarov',
    'https://linkedin.com/in/sal-anvarov',
    'https://cleanlist.ai',
  ],
  knowsAbout: [
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'NestJS',
    'AWS',
    'GCP',
    'AI engineering',
    'Full stack web development',
  ],
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: 'en',
  author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
  publisher: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
});

export const breadcrumbLd = (
  trail: Array<{ name: string; path: string }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((step, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: step.name,
    item: canonicalFor(step.path),
  })),
});

type ArticleLdInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  created?: string;
  modified?: string;
  category?: string;
  tag?: string;
};

export const articleLd = ({
  title,
  description,
  path,
  image,
  created,
  modified,
  category,
  tag,
}: ArticleLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: title,
  description,
  mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalFor(path) },
  url: canonicalFor(path),
  image: image ? [image] : [DEFAULT_OG_IMAGE],
  datePublished: created,
  dateModified: modified ?? created,
  author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
  publisher: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
  articleSection: category,
  keywords: tag,
  inLanguage: 'en',
});

type CaseStudyLdInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  client?: string;
  category?: string;
  created?: string;
  modified?: string;
};

export const caseStudyLd = ({
  title,
  description,
  path,
  image,
  client,
  category,
  created,
  modified,
}: CaseStudyLdInput) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: title,
  description,
  url: canonicalFor(path),
  image: image ? [image] : [DEFAULT_OG_IMAGE],
  author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
  creator: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
  about: client,
  genre: category,
  dateCreated: created,
  dateModified: modified ?? created,
});
