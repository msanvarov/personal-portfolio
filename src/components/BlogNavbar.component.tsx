import { FormattedDate } from '@/components/FormattedDate.component';
import type { Post } from '@/store';
import { Link } from 'react-router-dom';
import { Form } from 'reactstrap';

type BlogNavbarProps = {
  posts: Post[];
  categories: string[];
  tags: string[];
};

export const BlogNavbar = ({ posts, categories, tags }: BlogNavbarProps) => {
  return (
    <div className="blog-sidebar">
      <div className="blog-sidebar-inner">
        <div className="blog-sidebar-widget search-widget">
          <div className="blog-sidebar-widget-inner" data-aos="zoom-in">
            <Form className="shadow-box">
              <input type="text" placeholder="Find blog by name or category" />
              <button className="theme-btn">Find</button>
            </Form>
          </div>
        </div>
        <div
          className="blog-sidebar-widget recent-post-widget"
          data-aos="zoom-in"
        >
          <div className="blog-sidebar-widget-inner shadow-box">
            <h3>Recent Posts</h3>
            <ul>
              {posts.slice(0, 5).map((post, i) => (
                <li key={i}>
                  <Link to={`/posts/${post.filePath.replace(/\.mdx?$/, '')}`}>
                    {post.metadata.title}
                  </Link>
                  <p>
                    <FormattedDate value={post.metadata.modified} />
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className="blog-sidebar-widget categories-widget"
          data-aos="zoom-in"
        >
          <div className="blog-sidebar-widget-inner shadow-box">
            <h3>Categories</h3>
            <ul>
              {categories.map((category, i) => (
                <li key={i}>
                  <Link to="/posts">- {category}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="blog-sidebar-widget tags-widget" data-aos="zoom-in">
          <div className="blog-sidebar-widget-inner shadow-box">
            <h3>Tags</h3>
            <ul>
              {tags.map((tag, i) => (
                <li key={i}>
                  <Link className="theme-btn" to="/posts">
                    {tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
