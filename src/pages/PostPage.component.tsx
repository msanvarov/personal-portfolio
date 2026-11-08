import { BlogNavbar } from '@/components/BlogNavbar.component';
import { PostCard, TagChip } from '@/components/blog/PostCards';
import { FormattedDate } from '@/components/FormattedDate.component';
import { Layout } from '@/components/layout/Layout.component';
import { EASE, Reveal } from '@/components/motion/Reveal';
import { getPostBySlug, postSlug, postsAsStoreShape } from '@/utils/content';
import { articleLd, breadcrumbLd, Seo, SITE_URL } from '@/utils/seo';
import { MDXProvider } from '@mdx-js/react';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from '@tanstack/react-router';
import { DiscussionEmbed } from 'disqus-react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';

const disqusShortname = import.meta.env.VITE_DISQUS_SHORTNAME;

// Readable article type: 16px on phones, 17px up; code and tables scroll
// sideways inside the column instead of widening the page.
const PROSE = [
  'prose prose-neutral max-w-none break-words dark:prose-invert sm:text-[1.0625rem]',
  'prose-headings:font-heading prose-headings:font-semibold prose-headings:tracking-tight',
  'prose-a:text-brand prose-a:underline-offset-4 prose-strong:text-foreground',
  'prose-code:rounded-md prose-code:[box-decoration-break:clone] prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none',
  'prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:rounded-2xl prose-pre:bg-secondary prose-pre:text-[0.85rem] prose-pre:text-foreground prose-pre:shadow-[inset_0_0_0_1px_var(--bento-edge)]',
  '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
  'prose-img:rounded-2xl [&_table]:block [&_table]:overflow-x-auto',
].join(' ');

const PostPage = () => {
  const { post } = useParams({ from: '/blog/$post' });
  const entry = post ? getPostBySlug(post) : undefined;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const posts = postsAsStoreShape;
  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.metadata.category))),
    [posts],
  );
  const tags = useMemo(
    () => Array.from(new Set(posts.map((p) => p.metadata.tag))),
    [posts],
  );

  // Hero image eases out and drifts as the reader scrolls into the post.
  const heroRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  useEffect(() => {
    if (!entry) navigate({ to: '/blog', replace: true });
  }, [entry, navigate]);

  if (!entry) return null;

  const { metadata, Component, slug } = entry;
  const path = `/blog/${slug}`;
  const image = metadata.thumbnail
    ? `${SITE_URL}${metadata.thumbnail}`
    : undefined;
  const url = `${SITE_URL}${pathname}`;
  const morePosts = posts.filter((p) => postSlug(p) !== slug).slice(0, 3);

  return (
    <Layout title={metadata.title}>
      <Seo
        title={metadata.title}
        description={metadata.description}
        path={path}
        type="article"
        keywords={[metadata.category, metadata.tag].filter(Boolean).join(', ')}
        image={image}
        jsonLd={[
          articleLd({
            title: metadata.title,
            description: metadata.description,
            path,
            image,
            created: metadata.created,
            modified: metadata.modified,
            category: metadata.category,
            tag: metadata.tag,
          }),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: metadata.title, path },
          ]),
        ]}
      />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
        <article className="min-w-0">
          <header ref={heroRef} className="mb-6 md:mb-8">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Link
                to="/blog"
                className="group/back -ml-1 mb-3 inline-flex h-11 items-center gap-1.5 px-1 text-sm text-muted-foreground transition-colors hover:text-foreground md:mb-5"
              >
                <ArrowLeft className="size-4 transition-transform duration-300 ease-[var(--ease-apple)] group-hover/back:-translate-x-0.5" />
                Blog
              </Link>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
                <Link
                  to="/blog"
                  search={{ q: metadata.category }}
                  className="chip py-1 pl-3 text-[0.8rem] font-medium text-brand transition-shadow hover:shadow-[inset_0_0_0_1px_var(--bento-edge-hi)]"
                >
                  {metadata.category}
                </Link>
                <FormattedDate
                  value={metadata.created ?? metadata.modified}
                  format="D MMMM YYYY"
                />
              </div>
            </motion.div>
            {/* Plain mount animation: SplitWords' per-word whileInView can
                leave a word hidden when it wraps (observer never fires). */}
            <motion.h1
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                bounce: 0,
                duration: 0.8,
                delay: 0.05,
              }}
              className="mt-4 text-[2rem] font-semibold leading-[1.08] text-foreground sm:text-4xl md:text-5xl"
            >
              {metadata.title}
            </motion.h1>
            {metadata.description ? (
              <Reveal y={12} delay={0.15}>
                <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-muted-foreground md:text-lg">
                  {metadata.description}
                </p>
              </Reveal>
            ) : null}
            {metadata.thumbnail ? (
              <Reveal
                delay={0.2}
                className="bento mt-6 overflow-hidden p-0 md:mt-8"
              >
                <motion.img
                  src={metadata.thumbnail}
                  alt={metadata.title}
                  style={reduce ? undefined : { scale: heroScale, y: heroY }}
                  className="block aspect-[16/9] w-full object-cover"
                />
              </Reveal>
            ) : null}
          </header>
          {/* Phones read on the page itself; the tile appears from sm up. */}
          <Reveal className="bento px-1 sm:p-8 md:p-10 max-sm:rounded-none max-sm:bg-transparent max-sm:bg-none max-sm:shadow-none">
            <div className={PROSE}>
              <MDXProvider>
                <Component />
              </MDXProvider>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-6 text-sm text-muted-foreground">
              Tagged
              <TagChip tag={metadata.tag} />
            </div>
            {disqusShortname ? (
              <div className="mt-8">
                <DiscussionEmbed
                  shortname={disqusShortname}
                  config={{
                    url,
                    identifier: metadata.uid,
                    title: metadata.title,
                  }}
                />
              </div>
            ) : null}
          </Reveal>
        </article>

        <BlogNavbar
          posts={posts}
          categories={categories}
          tags={tags}
          className="hidden lg:sticky lg:top-16 lg:block"
        />

        {/* Phones and tablets: a compact list instead of the sidebar. */}
        <section aria-labelledby="more-posts" className="lg:hidden">
          <h2
            id="more-posts"
            className="mb-4 text-2xl font-semibold text-foreground"
          >
            More posts
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {morePosts.map((p, i) => (
              <PostCard key={postSlug(p)} post={p} delay={i * 0.06} />
            ))}
          </div>
          <Link to="/blog" className="btn-quiet mt-4 h-11 w-full text-sm">
            All posts <ArrowRight className="size-4" />
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default PostPage;
