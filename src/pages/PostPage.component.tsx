import { BlogNavbar } from '@/components/BlogNavbar.component';
import { Layout } from '@/components/layout/Layout.component';
import { EASE, Reveal, SplitWords } from '@/components/motion/Reveal';
import { Badge } from '@/components/ui/badge';
import { getPostBySlug, postsAsStoreShape } from '@/utils/content';
import { articleLd, breadcrumbLd, Seo, SITE_URL } from '@/utils/seo';
import { MDXProvider } from '@mdx-js/react';
import {
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
import { useEffect, useMemo, useRef } from 'react';

const disqusShortname = import.meta.env.VITE_DISQUS_SHORTNAME;

const PostPage = () => {
  const { post } = useParams({ from: '/blog/$post' });
  const entry = post ? getPostBySlug(post) : undefined;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const posts = postsAsStoreShape;
  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.metadata.category))),
    [posts]
  );
  const tags = useMemo(
    () => Array.from(new Set(posts.map((p) => p.metadata.tag))),
    [posts]
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
  const image = metadata.thumbnail ? `${SITE_URL}${metadata.thumbnail}` : undefined;
  const url = `${SITE_URL}${pathname}`;

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
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <article className="min-w-0">
          <header ref={heroRef} className="mb-6">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Badge variant="secondary" className="mb-4 rounded-full">
                {metadata.category}
              </Badge>
            </motion.div>
            <h1 className="mb-8 text-3xl font-semibold leading-tight text-foreground md:text-5xl">
              <SplitWords text={metadata.title} stagger={0.035} />
            </h1>
            {metadata.thumbnail ? (
              <div className="bento overflow-hidden p-0">
                <motion.img
                  src={metadata.thumbnail}
                  alt={metadata.title}
                  style={reduce ? undefined : { scale: heroScale, y: heroY }}
                  className="block aspect-[16/9] w-full object-cover"
                />
              </div>
            ) : null}
          </header>
          <Reveal className="bento p-6 md:p-10">
            <div className="prose prose-neutral max-w-none dark:prose-invert prose-headings:font-heading prose-headings:tracking-tight prose-a:text-brand prose-a:underline-offset-4 prose-strong:text-foreground prose-code:rounded-md prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-2xl prose-pre:border prose-pre:border-border prose-pre:bg-secondary prose-pre:text-foreground prose-img:rounded-2xl [&_pre_code]:bg-transparent [&_pre_code]:p-0">
              <MDXProvider>
                <Component />
              </MDXProvider>
            </div>
            <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
              <Badge variant="outline" className="h-8 rounded-full px-4">
                {metadata.tag}
              </Badge>
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
        <BlogNavbar posts={posts} categories={categories} tags={tags} />
      </div>
    </Layout>
  );
};

export default PostPage;
