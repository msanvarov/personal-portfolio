import {
  Layout,
  PortfolioFooter,
  PortfolioHeader,
} from '@msanvarov/core-components';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import path from 'path';
import remarkGfm from 'remark-gfm';
import { CASE_STUDIES_PATH, caseStudiesFilePaths } from '../../utils/mdx.utils';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = caseStudiesFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((entry) => ({ params: { entry } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PortfolioEntryPageProps> = async ({
  params,
}) => {
  const postFilePath = path.join(CASE_STUDIES_PATH, `${params?.entry}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const markdownContent = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
    scope: data,
  });

  return {
    props: {
      content: markdownContent,
      frontMatter: data,
    },
  };
};

type PortfolioEntryPageProps = {
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  frontMatter: Record<string, string>;
};

// List of custom components
const components = {
  PortfolioHeader: PortfolioHeader,
  PortfolioFooter: PortfolioFooter,
};

const PortfolioEntryPage = ({ content }: PortfolioEntryPageProps) => {
  return (
    <Layout>
      <section className="project-details-wrap">
        <MDXRemote {...content} components={components} />
      </section>
    </Layout>
  );
};

export default PortfolioEntryPage;
