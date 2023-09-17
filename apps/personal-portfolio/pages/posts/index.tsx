import { BlogNavbar, Layout } from '@msanvarov/core-components';
import {
  Post,
  setCategories,
  setPosts,
  setTags,
  useAppDispatch,
} from '@msanvarov/store';
import fs from 'fs';
import matter from 'gray-matter';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import path from 'path';
import { useEffect } from 'react';
import Moment from 'react-moment';
import { Col, Container, Row } from 'reactstrap';
import { POSTS_PATH, postFilePaths } from '../../utils/mdx.utils';

export const getStaticProps: GetStaticProps<PostsPageProps> = () => {
  const posts = postFilePaths
    .map((filePath) => {
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
    })
    .sort((a, b) => {
      const aDate = new Date(a.metadata.created).getTime();
      const bDate = new Date(b.metadata.created).getTime();
      return isNaN(aDate) || isNaN(bDate) ? 0 : bDate - aDate;
    });

  return { props: { posts } };
};

type PostsPageProps = {
  posts: Post[];
};

const PostsPage = ({ posts }: PostsPageProps) => {
  const dispatch = useAppDispatch();
  const categories = Array.from(
    new Set(posts.map((post) => post.metadata.category))
  );
  const tags = Array.from(new Set(posts.map((post) => post.metadata.tag)));

  useEffect(() => {
    if (posts) {
      dispatch(setPosts(posts));
      dispatch(setCategories(categories));
      dispatch(setTags(tags));
    }
  }, [posts, categories, tags]);

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
                {posts.map((post, i) => (
                  <div className="blog-item" data-aos="zoom-in" key={i}>
                    <Link
                      as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                      href={`/posts/[post]`}
                    >
                      <div className="img-box">
                        <img src={post.metadata.thumbnail} alt="thumbnail" />
                      </div>
                    </Link>
                    <div className="content">
                      <span className="meta">
                        Category: {post.metadata.category}
                      </span>
                      <h1>
                        <Link
                          as={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}
                          href={`/posts/[post]`}
                        >
                          {post.metadata.title}
                        </Link>
                      </h1>
                      <Moment format="LLL">{post.metadata.modified}</Moment>
                      <p>{post.metadata.description}</p>
                    </div>
                  </div>
                ))}
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

export default PostsPage;
