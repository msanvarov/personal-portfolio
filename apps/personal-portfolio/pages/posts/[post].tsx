import { BlogNavbar, Layout } from '@msanvarov/core-components';
import { Post } from '@msanvarov/store';
import { DiscussionEmbed } from 'disqus-react';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Link from 'next/link';
import { useRouter } from 'next/router';
import path from 'path';
import remarkGfm from 'remark-gfm';
import { POSTS_PATH, postFilePaths } from '../../utils/mdx.utils';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((post) => ({ params: { post } }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async ({
  params,
}) => {
  const posts = postFilePaths.map((filePath) => {
    const fileContents = fs.readFileSync(path.join(POSTS_PATH, filePath));
    const fileMetadata = fs.statSync(path.join(POSTS_PATH, filePath));
    const { content, data } = matter(fileContents);

    return {
      content,
      metadata: {
        ...data,
        created: fileMetadata.ctime.toISOString(),
        modified: fileMetadata.mtime.toISOString(),
      },
      filePath,
    };
  });

  const postFilePath = path.join(POSTS_PATH, `${params?.post}.mdx`);
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
      posts,
    },
  };
};

// List of custom components
const components = {};

type PostPageProps = {
  content: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  frontMatter: Record<string, string>;
  posts: Post[];
};

const PostPage = ({ content, frontMatter, posts }: PostPageProps) => {
  const { asPath } = useRouter();
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const url = `${origin}${asPath}`;
  const categories = Array.from(
    new Set(posts.map((post) => post.metadata.category))
  );
  const tags = Array.from(new Set(posts.map((post) => post.metadata.tag)));

  return (
    <Layout wrapperClass="main-workdetails-page">
      <section className="blog-details-area">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="blog-details-content">
                <div className="img-box">
                  <img src={frontMatter.thumbnail} alt="Blog" />
                </div>
                <span className="meta">{frontMatter.category}</span>
                <h1>{frontMatter.title}</h1>
                <MDXRemote {...content} components={components} />
                <div className="tags">
                  <Link href="#" className="theme-btn my-4">
                    {frontMatter.tag}
                  </Link>
                </div>
                <DiscussionEmbed
                  shortname="sal-anvarov"
                  config={{
                    url,
                    identifier: frontMatter.uid,
                    title: frontMatter.title,
                  }}
                />
              </div>
            </div>
            <div className="col-md-4">
              <BlogNavbar posts={posts} categories={categories} tags={tags} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PostPage;
