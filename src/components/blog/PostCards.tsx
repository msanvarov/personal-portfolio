import { ArrowChip, BentoCard } from '@/components/bento/BentoCard';
import { FormattedDate } from '@/components/FormattedDate.component';
import { cn } from '@/lib/utils';
import type { Post } from '@/store';
import { postSlug } from '@/utils/content';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';


/** "7 April 2025 · Machine Learning" */
export const PostMeta = ({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) => (
  <p
    className={cn(
      'flex flex-wrap items-center gap-x-1.5 text-[0.8rem] text-muted-foreground',
      className
    )}
  >
    <FormattedDate
      value={post.metadata.created ?? post.metadata.modified}
      format="D MMMM YYYY"
    />
    <span aria-hidden>·</span>
    <span className="font-medium text-brand">{post.metadata.category}</span>
  </p>
);

/** Tag chip that filters the list; sits above the tile-wide link. */
export const TagChip = ({ tag }: { tag?: string }) =>
  tag ? (
    <Link
      to="/blog"
      search={{ q: tag }}
      className="relative z-20 inline-flex h-8 items-center rounded-full bg-secondary px-3 text-xs font-medium text-muted-foreground shadow-[inset_0_0_0_1px_var(--bento-edge)] transition-[color,box-shadow] duration-300 hover:text-foreground hover:shadow-[inset_0_0_0_1px_var(--bento-edge-hi)]"
    >
      {tag}
    </Link>
  ) : null;

/** Tall tile: thumbnail well, meta, big title, description at the bottom. */
export const FeaturedPostCard = ({
  post,
  delay,
  className,
}: {
  post: Post;
  delay?: number;
  className?: string;
}) => (
  <BentoCard
    to={`/blog/${postSlug(post)}`}
    label={post.metadata.title}
    delay={delay}
    className={cn('flex flex-col p-3 sm:p-4', className)}
  >
    <div className="bento-well aspect-video overflow-hidden">
      {post.metadata.thumbnail ? (
        <img
          src={post.metadata.thumbnail}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-[scale] duration-700 ease-[var(--ease-apple)] group-hover:scale-[1.04]"
        />
      ) : null}
    </div>
    <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
      <PostMeta post={post} />
      <h2 className="mt-2 text-[1.35rem] font-semibold leading-tight text-foreground md:text-2xl">
        {post.metadata.title}
      </h2>
      <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-muted-foreground">
        {post.metadata.description}
      </p>
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <TagChip tag={post.metadata.tag} />
        <ArrowChip />
      </div>
    </div>
  </BentoCard>
);

/** Text-first tile (no thumbnail), like Vercel's blog grid. */
export const PostCard = ({
  post,
  delay,
  className,
}: {
  post: Post;
  delay?: number;
  className?: string;
}) => (
  <BentoCard
    to={`/blog/${postSlug(post)}`}
    label={post.metadata.title}
    delay={delay}
    className={cn('flex flex-col p-4 sm:p-5 md:min-h-44', className)}
  >
    <PostMeta post={post} />
    <h3 className="mt-2 line-clamp-3 text-lg font-semibold leading-snug text-foreground transition-colors duration-300 group-hover:text-brand">
      {post.metadata.title}
    </h3>
    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
      <TagChip tag={post.metadata.tag} />
      <ArrowRight
        aria-hidden
        className="size-4 shrink-0 -translate-x-2 text-brand opacity-0 transition-all duration-300 ease-[var(--ease-apple)] group-hover:translate-x-0 group-hover:opacity-100"
      />
    </div>
  </BentoCard>
);
