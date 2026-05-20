import { BlogNavbar } from '@/components/BlogNavbar.component';
import { Layout } from '@/components/layout/Layout.component';
import { getPostBySlug, postsAsStoreShape } from '@/utils/content';
import { articleLd, breadcrumbLd, Seo, SITE_URL } from '@/utils/seo';
import { MDXProvider } from '@mdx-js/react';
import {
  useLocation,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import { DiscussionEmbed } from 'disqus-react';
import { useEffect, useMemo } from 'react';

const disqusShortname = import.meta.env.VITE_DISQUS_SHORTNAME;

const PostPage = () => {
  const { post } = useParams({ from: '/posts/$post' });
  const entry = post ? getPostBySlug(post) : undefined;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const posts = postsAsStoreShape;
  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.metadata.category))),
    [posts]
  );
  const tags = useMemo(
    () => Array.from(new Set(posts.map((p) => p.metadata.tag))),
    [posts]
  );

  useEffect(() => {
    if (!entry) navigate({ to: '/posts', replace: true });
  }, [entry, navigate]);

  if (!entry) return null;

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
                  <span className="theme-btn my-4">{metadata.tag}</span>
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
