import { BlogNavbar } from '@/components/BlogNavbar.component';
import { FormattedDate } from '@/components/FormattedDate.component';
import { Layout } from '@/components/layout/Layout.component';
import { setCategories, setPosts, setTags, useAppDispatch } from '@/store';
import { postsAsStoreShape } from '@/utils/content';
import { breadcrumbLd, Seo, SITE_URL } from '@/utils/seo';
import { Link, useSearch } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';
import { Col, Container, Row } from 'reactstrap';

const PostsListPage = () => {
  const dispatch = useAppDispatch();
  const posts = postsAsStoreShape;
  const { q } = useSearch({ from: '/blog/' });

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.metadata.category))),
    [posts]
  );
  const tags = useMemo(
    () => Array.from(new Set(posts.map((post) => post.metadata.tag))),
    [posts]
  );

  // Filter against title / category / description / tag (case-insensitive).
  // Sidebar widgets keep the full list so categories and tags don't collapse
  // as the user narrows results.
  const visiblePosts = useMemo(() => {
    if (!q) return posts;
    const needle = q.toLowerCase();
    return posts.filter((post) => {
      const meta = post.metadata;
      return (
        meta.title?.toLowerCase().includes(needle) ||
        meta.category?.toLowerCase().includes(needle) ||
        meta.description?.toLowerCase().includes(needle) ||
        meta.tag?.toLowerCase().includes(needle)
      );
    });
  }, [posts, q]);

  useEffect(() => {
    dispatch(setPosts(posts));
    dispatch(setCategories(categories));
    dispatch(setTags(tags));
  }, [posts, categories, tags, dispatch]);

  return (
    <Layout>
      <Seo
        title="Blog"
        description="Long-form posts by Sal Anvarov: software architecture, developer experience, PyTorch internals, frontend safety, and the trade-offs behind every line of code."
        path="/blog"
        jsonLd={[
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            url: `${SITE_URL}/blog`,
            name: 'Sal Anvarov — Blog',
            author: { '@type': 'Person', name: 'Sal Anvarov', url: SITE_URL },
            blogPost: posts.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.metadata.title,
              url: `${SITE_URL}/blog/${p.filePath.replace(/\.mdx?$/, '')}`,
              datePublished: p.metadata.created,
              dateModified: p.metadata.modified ?? p.metadata.created,
            })),
          },
        ]}
      />
      <section className="blog-area">
        <Container>
          <h1 className="section-heading" data-aos="fade-up">
            <img src="/assets/star-2.png" alt="star" /> Blog Posts{' '}
            <img src="/assets/star-2.png" alt="star" />
          </h1>
          <Row>
            <Col md="8">
              <div className="blog-items">
                {visiblePosts.length === 0 ? (
                  <p className="blog-empty-state">
                    No posts match <strong>“{q}”</strong>. Try a different
                    keyword, category, or tag.
                  </p>
                ) : null}
                {visiblePosts.map((post, i) => {
                  const slug = post.filePath.replace(/\.mdx?$/, '');
                  return (
                    <div className="blog-item" data-aos="zoom-in" key={i}>
                      <Link to="/blog/$post" params={{ post: slug }}>
                        <div className="img-box">
                          <img
                            src={post.metadata.thumbnail}
                            alt="thumbnail"
                          />
                        </div>
                      </Link>
                      <div className="content">
                        <span className="meta">
                          Category: {post.metadata.category}
                        </span>
                        <h1>
                          <Link to="/blog/$post" params={{ post: slug }}>
                            {post.metadata.title}
                          </Link>
                        </h1>
                        <FormattedDate value={post.metadata.modified} />
                        <p>{post.metadata.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col md="4">
              <BlogNavbar posts={posts} categories={categories} tags={tags} />
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default PostsListPage;
