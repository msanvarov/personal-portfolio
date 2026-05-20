import { BlogNavbar } from '@/components/BlogNavbar';
import { Layout } from '@/components/layout/Layout';
import { getPostBySlug, postsAsStoreShape } from '@/utils/content';
import { MDXProvider } from '@mdx-js/react';
import { DiscussionEmbed } from 'disqus-react';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';

const disqusShortname = import.meta.env.VITE_DISQUS_SHORTNAME;

const PostPage = () => {
  const { post } = useParams();
  const entry = post ? getPostBySlug(post) : undefined;
  const { pathname } = useLocation();

  const posts = postsAsStoreShape;
  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.metadata.category))),
    [posts]
  );
  const tags = useMemo(
    () => Array.from(new Set(posts.map((p) => p.metadata.tag))),
    [posts]
  );

  if (!entry) {
    return <Navigate to="/posts" replace />;
  }

  const { metadata, Component } = entry;
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const url = `${origin}${pathname}`;

  return (
    <Layout title={metadata.title} wrapperClass="main-workdetails-page">
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
      <section className="blog-details-area">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <div className="blog-details-content">
                <div className="img-box">
                  <img src={metadata.thumbnail} alt="Blog" />
                </div>
                <span className="meta">{metadata.category}</span>
                <h1>{metadata.title}</h1>
                <MDXProvider>
                  <Component />
                </MDXProvider>
                <div className="tags">
                  <Link to="#" className="theme-btn my-4">
                    {metadata.tag}
                  </Link>
                </div>
                {disqusShortname ? (
                  <DiscussionEmbed
                    shortname={disqusShortname}
                    config={{
                      url,
                      identifier: metadata.uid,
                      title: metadata.title,
                    }}
                  />
                ) : null}
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
