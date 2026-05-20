import { BlogNavbar } from '@/components/BlogNavbar';
import { Layout } from '@/components/layout/Layout';
import { getPostBySlug, postsAsStoreShape } from '@/utils/content';
import { articleLd, breadcrumbLd, Seo, SITE_URL } from '@/utils/seo';
import { MDXProvider } from '@mdx-js/react';
import { DiscussionEmbed } from 'disqus-react';
import { useMemo } from 'react';
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

  const { metadata, Component, slug } = entry;
  const path = `/posts/${slug}`;
  const image = metadata.thumbnail ? `${SITE_URL}${metadata.thumbnail}` : undefined;
  const url = `${SITE_URL}${pathname}`;

  return (
    <Layout title={metadata.title} wrapperClass="main-workdetails-page">
      <Seo
        title={metadata.title}
        description={metadata.description}
        path={path}
        type="article"
        keywords={[metadata.category, metadata.tag].filter(Boolean).join(', ')}
        image={image}
        jsonLd={[
          articleLd({
            title: metadata.title,
            description: metadata.description,
            path,
            image,
            created: metadata.created,
            modified: metadata.modified,
            category: metadata.category,
            tag: metadata.tag,
          }),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/posts' },
            { name: metadata.title, path },
          ]),
        ]}
      />
      <section className="blog-details-area">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              <article className="blog-details-content">
                {metadata.thumbnail ? (
                  <div className="img-box">
                    <img src={metadata.thumbnail} alt={metadata.title} />
                  </div>
                ) : null}
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
              </article>
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
