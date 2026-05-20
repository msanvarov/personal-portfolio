import { BlogNavbar } from '@/components/BlogNavbar';
import { FormattedDate } from '@/components/FormattedDate';
import { Layout } from '@/components/layout/Layout';
import { setCategories, setPosts, setTags, useAppDispatch } from '@/store';
import { postsAsStoreShape } from '@/utils/content';
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';

const PostsListPage = () => {
  const dispatch = useAppDispatch();
  const posts = postsAsStoreShape;

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.metadata.category))),
    [posts]
  );
  const tags = useMemo(
    () => Array.from(new Set(posts.map((post) => post.metadata.tag))),
    [posts]
  );

  useEffect(() => {
    dispatch(setPosts(posts));
    dispatch(setCategories(categories));
    dispatch(setTags(tags));
  }, [posts, categories, tags, dispatch]);

  return (
    <Layout>
      <section className="blog-area">
        <Container>
          <h1 className="section-heading" data-aos="fade-up">
            <img src="/assets/star-2.png" alt="star" /> Blog Posts{' '}
            <img src="/assets/star-2.png" alt="star" />
          </h1>
          <Row>
            <Col md="8">
              <div className="blog-items">
                {posts.map((post, i) => {
                  const slug = post.filePath.replace(/\.mdx?$/, '');
                  return (
                    <div className="blog-item" data-aos="zoom-in" key={i}>
                      <Link to={`/posts/${slug}`}>
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
                          <Link to={`/posts/${slug}`}>
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
