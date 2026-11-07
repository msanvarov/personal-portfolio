import { FormattedDate } from '@/components/FormattedDate.component';
import { Reveal } from '@/components/motion/Reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Post } from '@/store';
import { Link, useLocation, useNavigate } from '@tanstack/react-router';
import { Search } from 'lucide-react';
import { useEffect, useState, type FormEvent, type ReactNode } from 'react';

type BlogNavbarProps = {
  posts: Post[];
  categories: string[];
  tags: string[];
};

const readQ = (locationSearch: string): string =>
  new URLSearchParams(locationSearch).get('q') ?? '';

const Widget = ({
  title,
  delay,
  children,
}: {
  title: string;
  delay: number;
  children: ReactNode;
}) => (
  <Reveal delay={delay} className="bento p-6">
    <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
    {children}
  </Reveal>
);

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
    <aside className="flex flex-col gap-5 lg:sticky lg:top-28">
      <Reveal>
        <form
          onSubmit={submit}
          role="search"
          className="bento flex items-center gap-2 p-2"
        >
          <Search className="ml-3 size-4 shrink-0 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Find blog by name or category"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Find blog by name or category"
            className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0 dark:bg-transparent"
          />
          <Button
            type="submit"
            className="h-11 rounded-full bg-brand px-5 text-brand-foreground hover:bg-brand/90"
          >
            Find
          </Button>
        </form>
      </Reveal>

      <Widget title="Recent Posts" delay={0.05}>
        <ul className="flex flex-col gap-4">
          {posts.slice(0, 5).map((post, i) => (
            <li key={i} className="group">
              <Link
                to="/blog/$post"
                params={{ post: post.filePath.replace(/\.mdx?$/, '') }}
                className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-brand"
              >
                {post.metadata.title}
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">
                <FormattedDate value={post.metadata.modified} />
              </p>
            </li>
          ))}
        </ul>
      </Widget>

      <Widget title="Categories" delay={0.1}>
        <ul className="flex flex-col gap-2">
          {categories.map((category, i) => (
            <li key={i}>
              <Link
                to="/blog"
                search={{ q: category }}
                className="text-sm text-muted-foreground transition-colors hover:text-brand"
              >
                - {category}
              </Link>
            </li>
          ))}
        </ul>
      </Widget>

      <Widget title="Tags" delay={0.15}>
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <li key={i}>
              <Badge
                asChild
                variant="outline"
                className="h-7 rounded-full px-3 transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
              >
                <Link to="/blog" search={{ q: tag }}>
                  {tag}
                </Link>
              </Badge>
            </li>
          ))}
        </ul>
      </Widget>
    </aside>
  );
};
