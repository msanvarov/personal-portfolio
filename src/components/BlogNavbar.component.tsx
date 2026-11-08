import { TileHeader } from '@/components/bento/BentoCard';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { PostMeta } from '@/components/blog/PostCards';
import { postSlug } from '@/utils/content';
import { Reveal, StaggerItem, StaggerList } from '@/components/motion/Reveal';
import type { Post } from '@/store';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Clock3, Folder, Hash } from 'lucide-react';
import type { ReactNode } from 'react';

type BlogNavbarProps = {
  posts: Post[];
  categories: string[];
  tags: string[];
  className?: string;
};

const Widget = ({
  icon,
  caption,
  delay,
  children,
}: {
  icon: ReactNode;
  caption: string;
  delay: number;
  children: ReactNode;
}) => (
  <Reveal delay={delay} className="bento p-4">
    <TileHeader icon={icon} caption={caption} align="start" />
    {children}
  </Reveal>
);

/** Blog sidebar: search, recent posts, categories and tags. */
export const BlogNavbar = ({
  posts,
  categories,
  tags,
  className,
}: BlogNavbarProps) => (
  <aside className={className}>
    <div className="flex flex-col gap-3">
      <Reveal>
        <BlogSearch />
      </Reveal>

      <Widget icon={<Clock3 />} caption="Recent posts" delay={0.05}>
        <StaggerList className="mt-1 flex flex-col divide-y divide-border">
          {posts.slice(0, 4).map((post) => (
            <StaggerItem key={post.filePath}>
              <Link
                to="/blog/$post"
                params={{ post: postSlug(post) }}
                className="group/post block py-2.5"
              >
                <PostMeta post={post} className="text-[0.7rem]" />
                <p className="mt-1 flex items-start justify-between gap-3 text-sm font-medium leading-snug text-foreground transition-colors group-hover/post:text-brand">
                  <span className="line-clamp-2">{post.metadata.title}</span>
                  <ArrowRight className="mt-0.5 size-3.5 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 ease-[var(--ease-apple)] group-hover/post:translate-x-0 group-hover/post:opacity-100" />
                </p>
              </Link>
            </StaggerItem>
          ))}
        </StaggerList>
      </Widget>

      <Widget icon={<Folder />} caption="Categories" delay={0.1}>
        <StaggerList className="mt-2 flex flex-col gap-1">
          {categories.map((category) => (
            <StaggerItem key={category}>
              <Link
                to="/blog"
                search={{ q: category }}
                className="-mx-2 flex h-9 items-center justify-between rounded-xl px-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {category}
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[0.7rem] tabular-nums">
                  {posts.filter((p) => p.metadata.category === category).length}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerList>
      </Widget>

      <Widget icon={<Hash />} caption="Tags" delay={0.15}>
        <StaggerList className="mt-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <StaggerItem key={tag}>
              <Link
                to="/blog"
                search={{ q: tag }}
                className="inline-flex h-8 items-center rounded-full bg-secondary px-3 text-xs font-medium text-muted-foreground shadow-[inset_0_0_0_1px_var(--bento-edge)] transition-colors hover:bg-brand hover:text-brand-foreground"
              >
                {tag}
              </Link>
            </StaggerItem>
          ))}
        </StaggerList>
      </Widget>
    </div>
  </aside>
);
