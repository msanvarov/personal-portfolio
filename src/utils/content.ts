import type { ComponentType } from 'react';

type MDXModule = {
  default: ComponentType;
  frontmatter?: Record<string, string>;
};

export type ContentEntry = {
  slug: string;
  filePath: string;
  metadata: Record<string, string>;
  Component: ComponentType;
};

const caseStudyModules = import.meta.glob<MDXModule>(
  '../../content/case-studies/*.mdx',
  { eager: true }
);

const postModules = import.meta.glob<MDXModule>(
  '../../content/posts/*.mdx',
  { eager: true }
);

const toEntries = (
  modules: Record<string, MDXModule>,
  prefix: string
): ContentEntry[] => {
  return Object.entries(modules).map(([file, mod]) => {
    const fileName = file.split('/').pop() ?? '';
    const slug = fileName.replace(/\.mdx?$/, '');
    return {
      slug,
      filePath: `${prefix}/${fileName}`,
      metadata: mod.frontmatter ?? {},
      Component: mod.default,
    };
  });
};

const sortByCreatedDesc = (entries: ContentEntry[]) =>
  [...entries].sort((a, b) => {
    const aTime = Date.parse(a.metadata.created ?? '') || 0;
    const bTime = Date.parse(b.metadata.created ?? '') || 0;
    return bTime - aTime;
  });

export const caseStudies = toEntries(caseStudyModules, 'case-studies');

export const posts = sortByCreatedDesc(toEntries(postModules, 'posts'));

export const getCaseStudyBySlug = (slug: string) =>
  caseStudies.find((entry) => entry.slug === slug);

export const getPostBySlug = (slug: string) =>
  posts.find((entry) => entry.slug === slug);

export const postsAsStoreShape = posts.map((entry) => ({
  content: '',
  metadata: entry.metadata,
  filePath: `${entry.slug}.mdx`,
}));
