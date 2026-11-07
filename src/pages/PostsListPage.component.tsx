import { ArrowChip, BentoCard } from '@/components/bento/BentoCard';
import { BlogNavbar } from '@/components/BlogNavbar.component';
import { FormattedDate } from '@/components/FormattedDate.component';
import { Layout } from '@/components/layout/Layout.component';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { setCategories, setPosts, setTags, useAppDispatch } from '@/store';
import { postsAsStoreShape } from '@/utils/content';
import { breadcrumbLd, Seo, SITE_URL } from '@/utils/seo';
import { useSearch } from '@tanstack/react-router';
import { useEffect, useMemo } from 'react';

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
      <SectionHeading>Blog Posts</SectionHeading>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="flex flex-col gap-5">
          {visiblePosts.length === 0 ? (
            <Reveal className="bento p-8 text-center text-muted-foreground">
              No posts match <strong className="text-foreground">“{q}”</strong>
              . Try a different keyword, category, or tag.
            </Reveal>
          ) : null}
          {visiblePosts.map((post, i) => {
            const slug = post.filePath.replace(/\.mdx?$/, '');
            return (
              <BentoCard
                key={slug}
                to={`/blog/${slug}`}
                label={post.metadata.title}
                delay={Math.min(i, 3) * 0.06}
                tilt={2}
                className="grid gap-5 p-4 md:grid-cols-[18rem_minmax(0,1fr)] md:p-5"
              >
                <div className="bento-well aspect-[16/9] self-start overflow-hidden">
                  <img
                    src={post.metadata.thumbnail}
                    alt="thumbnail"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-3 px-1 py-1 md:pr-2">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="rounded-full">
                      Category: {post.metadata.category}
                    </Badge>
                    <FormattedDate value={post.metadata.modified} />
                  </div>
                  <h2 className="text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-brand md:text-2xl">
                    {post.metadata.title}
                  </h2>
                  <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {post.metadata.description}
                  </p>
                  <div className="mt-auto flex justify-end">
                    <ArrowChip className="size-10" />
                  </div>
                </div>
              </BentoCard>
            );
          })}
        </div>
        <BlogNavbar posts={posts} categories={categories} tags={tags} />
      </div>
    </Layout>
  );
};

export default PostsListPage;
