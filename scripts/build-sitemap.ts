import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

type Entry = {
  loc: string;
  lastmod: string;
  changefreq: 'weekly' | 'monthly' | 'yearly';
  priority: number;
};

const STATIC_ROUTES: Array<Omit<Entry, 'lastmod'>> = [
  { loc: '/', changefreq: 'monthly', priority: 1.0 },
  { loc: '/bio', changefreq: 'yearly', priority: 0.8 },
  { loc: '/credentials', changefreq: 'yearly', priority: 0.7 },
  { loc: '/offerings', changefreq: 'yearly', priority: 0.7 },
  { loc: '/portfolio', changefreq: 'monthly', priority: 0.9 },
  { loc: '/posts', changefreq: 'weekly', priority: 0.9 },
  { loc: '/contact', changefreq: 'yearly', priority: 0.6 },
];

const collectMdxEntries = (
  baseDir: string,
  routePrefix: string,
  changefreq: Entry['changefreq'],
  priority: number
): Entry[] => {
  let files: string[];
  try {
    files = readdirSync(baseDir).filter((f) => /\.mdx?$/.test(f));
  } catch {
    return [];
  }
  return files.map((file) => {
    const slug = file.replace(/\.mdx?$/, '');
    const full = join(baseDir, file);
    const stat = statSync(full);
    const fm = matter(readFileSync(full)).data as Record<string, string>;
    const lastmod = (fm.modified ?? stat.mtime.toISOString()).slice(0, 10);
    return {
      loc: `${routePrefix}/${slug}`,
      lastmod,
      changefreq,
      priority,
    };
  });
};

const xmlEscape = (s: string) =>
  s.replace(/[<>&'"]/g, (c) =>
    c === '<'
      ? '&lt;'
      : c === '>'
        ? '&gt;'
        : c === '&'
          ? '&amp;'
          : c === "'"
            ? '&apos;'
            : '&quot;'
  );

export const buildSitemap = (
  projectRoot: string,
  siteUrl: string
): string => {
  const today = new Date().toISOString().slice(0, 10);
  const staticEntries: Entry[] = STATIC_ROUTES.map((r) => ({
    ...r,
    lastmod: today,
  }));

  const caseStudies = collectMdxEntries(
    join(projectRoot, 'content/case-studies'),
    '/portfolio',
    'monthly',
    0.8
  );
  const posts = collectMdxEntries(
    join(projectRoot, 'content/posts'),
    '/posts',
    'monthly',
    0.7
  );

  const all = [...staticEntries, ...caseStudies, ...posts];
  const trimmedBase = siteUrl.replace(/\/+$/, '');

  const body = all
    .map(
      (e) => `  <url>
    <loc>${xmlEscape(trimmedBase + e.loc)}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
};

export const writeSitemap = (
  outDir: string,
  projectRoot: string,
  siteUrl: string
) => {
  const xml = buildSitemap(projectRoot, siteUrl);
  writeFileSync(join(outDir, 'sitemap.xml'), xml, 'utf8');
};
