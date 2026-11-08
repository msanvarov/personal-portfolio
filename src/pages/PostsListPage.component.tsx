import { BlogSearch } from '@/components/blog/BlogSearch';
import { FeaturedPostCard, PostCard } from '@/components/blog/PostCards';
import { Layout } from '@/components/layout/Layout.component';
import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';
import { setCategories, setPosts, setTags, useAppDispatch } from '@/store';
import { postSlug, postsAsStoreShape } from '@/utils/content';
import { breadcrumbLd, Seo, SITE_URL } from '@/utils/seo';
import { Link, useSearch } from '@tanstack/react-router';
import { motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useMemo } from 'react';

/** "All" + one tab per category, with a pill that slides to the active one. */
const CategoryTabs = ({
  categories,
  active,
}: {
  categories: string[];
  active: string | null;
}) => {
  const reduce = useReducedMotion();
  return (
    // Phones: the row scrolls sideways (snap, no scrollbar, faded edges).
    <nav
      aria-label="Blog categories"
      className="-mx-3 snap-x scroll-px-3 overflow-x-auto px-3 [mask-image:linear-gradient(to_right,transparent,#000_12px,#000_calc(100%-28px),transparent)] [scrollbar-width:none] sm:-mx-4 sm:scroll-px-4 sm:px-4 md:mx-0 md:overflow-visible md:px-0 md:[mask-image:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max gap-1 rounded-full bg-[var(--chip)] p-1 pr-1 shadow-[inset_0_0_0_1px_var(--bento-edge)]">
        {[null, ...categories].map((category) => {
          const isActive = active === (category ?? 'All');
          return (
            <li key={category ?? 'All'} className="snap-start">
              <Link
                to="/blog"
                search={category ? { q: category } : {}}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'relative flex h-11 items-center whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors duration-300 md:h-9',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="blog-tab-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-brand-soft shadow-[inset_0_0_0_1px_var(--bento-edge-hi)]"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: 'spring', bounce: 0, duration: 0.5 }
                    }
                  />
                ) : null}
                <span className="relative">{category ?? 'All'}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const PostsListPage = () => {
  const dispatch = useAppDispatch();
  const posts = postsAsStoreShape;
  const { q } = useSearch({ from: '/blog/' });

  const categories = useMemo(
    () => Array.from(new Set(posts.map((post) => post.metadata.category))),
    [posts],
  );
  const tags = useMemo(
    () => Array.from(new Set(posts.map((post) => post.metadata.tag))),
    [posts],
  );

  // Filter against title / category / description / tag (case-insensitive).
  // Tabs and tags keep the full list so they don't collapse as the user
  // narrows results.
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

  // A category tab is active when ?q= names it; a free-text query has none.
  const activeTab = q
    ? (categories.find((c) => c.toLowerCase() === q.toLowerCase()) ?? null)
    : 'All';

  useEffect(() => {
    dispatch(setPosts(posts));
    dispatch(setCategories(categories));
    dispatch(setTags(tags));
  }, [posts, categories, tags, dispatch]);

  // Newest three get the tall tiles; filtered results all do.
  const featured = q ? visiblePosts : visiblePosts.slice(0, 3);
  const rest = q ? [] : visiblePosts.slice(3);

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

      <header className="mb-6 md:mb-10">
        <Reveal y={20}>
          <h1 className="text-gradient w-fit pb-1 text-5xl font-semibold md:text-7xl">
            Blog
          </h1>
        </Reveal>
        <Reveal y={12} delay={0.08}>
          <p className="mt-2 max-w-xl text-base text-muted-foreground md:mt-3 md:text-lg">
            Software architecture, developer experience, PyTorch internals,
            frontend safety, and the trade-offs behind every line of code.
          </p>
        </Reveal>
      </header>

      <Reveal
        y={12}
        delay={0.12}
        className="mb-5 flex flex-col gap-3 md:mb-6 md:flex-row md:items-center md:justify-between"
      >
        <CategoryTabs categories={categories} active={activeTab} />
        <BlogSearch skip={categories} className="md:w-72" />
      </Reveal>

      {q && visiblePosts.length > 0 ? (
        <p className="mb-4 flex items-center gap-1 text-sm text-muted-foreground">
          <span>
            {visiblePosts.length} {visiblePosts.length === 1 ? 'post' : 'posts'}{' '}
            for <strong className="text-foreground">“{q}”</strong>
          </span>
          <Link
            to="/blog"
            className="ml-1 inline-flex h-8 items-center gap-1 rounded-full px-2.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-3.5" /> Clear
          </Link>
        </p>
      ) : null}

      {visiblePosts.length === 0 ? (
        <Reveal className="bento p-8 text-center text-muted-foreground">
          No posts match <strong className="text-foreground">“{q}”</strong>. Try
          a different keyword, category, or tag.
        </Reveal>
      ) : null}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {featured.map((post, i) => (
          <FeaturedPostCard
            key={postSlug(post)}
            post={post}
            delay={(i % 3) * 0.07}
            // Two-up on tablets: let the newest post span the row.
            className={cn(!q && i === 0 && 'sm:col-span-2 lg:col-span-1')}
          />
        ))}
      </div>

      {rest.length > 0 ? (
        <section aria-labelledby="more-posts" className="mt-10 md:mt-14">
          <h2
            id="more-posts"
            className="mb-4 text-2xl font-semibold text-foreground md:text-3xl"
          >
            Earlier posts
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <PostCard
                key={postSlug(post)}
                post={post}
                delay={(i % 3) * 0.06}
              />
            ))}
          </div>
        </section>
      ) : null}
    </Layout>
  );
};

export default PostsListPage;
