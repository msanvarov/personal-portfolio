import { FormattedDate } from '@/components/FormattedDate.component';
import type { Post } from '@/store';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { Form } from 'reactstrap';

type BlogNavbarProps = {
  posts: Post[];
  categories: string[];
  tags: string[];
};

const readQ = (locationSearch: string): string =>
  new URLSearchParams(locationSearch).get('q') ?? '';

export const BlogNavbar = ({ posts, categories, tags }: BlogNavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Keep the input in sync with the current ?q= so deep-linking and the
  // back button feel right.
  const [query, setQuery] = useState<string>(() =>
    readQ(typeof location.searchStr === 'string' ? location.searchStr : '')
  );

  useEffect(() => {
    const urlQ =
      typeof location.searchStr === 'string'
        ? readQ(location.searchStr)
        : '';
    setQuery(urlQ);
  }, [location.searchStr]);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    navigate({
      to: '/blog',
      search: trimmed ? { q: trimmed } : {},
    });
  };

  return (
    <div className="blog-sidebar">
      <div className="blog-sidebar-inner">
        <div className="blog-sidebar-widget search-widget">
          <div className="blog-sidebar-widget-inner" data-aos="zoom-in">
            <Form className="shadow-box" onSubmit={submit} role="search">
              <input
                type="text"
                placeholder="Find blog by name or category"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Find blog by name or category"
              />
              <button className="theme-btn" type="submit">
                Find
              </button>
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
                  <Link
                    to="/blog/$post"
                    params={{ post: post.filePath.replace(/\.mdx?$/, '') }}
                  >
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
                  <Link
                    to="/blog"
                    search={{ q: category }}
                  >
                    - {category}
                  </Link>
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
                  <Link
                    className="theme-btn"
                    to="/blog"
                    search={{ q: tag }}
                  >
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
