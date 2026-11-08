import { ArrowChip, BentoCard } from '@/components/bento/BentoCard';
import { Badge } from '@/components/ui/badge';
import { en } from '@/i18n';
import { cn } from '@/lib/utils';
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { BookOpen, Code2, ExternalLink } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';

const os = en.opensource;
type Repo = (typeof os.repos)[number];

const GithubIcon = ({ className }: { className?: string }) => (
  <i className={cn('iconoir-github', className)} aria-hidden />
);

const Intro = ({ className }: { className?: string }) => (
  <div className={cn('flex flex-col justify-center', className)}>
    <p className="mb-3 flex items-center gap-1.5 text-sm font-semibold text-brand">
      <Code2 className="size-4" /> {os.caption}
    </p>
    <h2 className="text-gradient pb-1 text-5xl font-semibold md:text-6xl">
      {os.heading}.
    </h2>
    <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
      {os.description}
    </p>
    <a
      href={os.github}
      target="_blank"
      rel="noreferrer noopener"
      className="btn-quiet mt-8 h-11 w-fit px-5 text-sm"
    >
      <GithubIcon className="text-base" /> github.com/msanvarov
    </a>
  </div>
);

type Featured = typeof os.featured & { post?: string };
/** Live projects shown as large cards: Algo Vision, then the tools. */
const FEATURED: Featured[] = [os.featured, ...os.tools];

const FeaturedCard = ({
  item: f,
  className,
}: {
  item: Featured;
  className?: string;
}) => {
  return (
    <BentoCard
      href={f.live}
      label={`Open ${f.name}`}
      className={cn('flex flex-col p-3', className)}
    >
      <div className="relative overflow-hidden rounded-[1.25rem] border border-border">
        <img
          src={f.media}
          alt={`${f.name} screenshot`}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover object-top transition-[scale] duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Live
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-4 md:p-5">
        <div className="flex flex-wrap gap-2">
          {f.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="rounded-full">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-3xl font-semibold text-foreground">{f.name}</h3>
        <p className="leading-relaxed text-muted-foreground">{f.description}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-border pt-5">
          <a
            href={f.live}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-brand relative z-20 h-11 px-4 text-sm"
          >
            <ExternalLink className="size-4" /> Live demo
          </a>
          <a
            href={f.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-quiet relative z-20 h-11 px-4 text-sm"
          >
            <GithubIcon /> Source
          </a>
          {f.post ? (
            <Link
              to="/blog/$post"
              params={{ post: f.post }}
              className="btn-quiet relative z-20 h-11 px-4 text-sm"
            >
              <BookOpen className="size-4" /> Read the guide
            </Link>
          ) : null}
          <a
            href={f.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="relative z-20 ml-auto flex min-w-0 items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="shrink-0 text-base" />
            <span className="truncate">
              {f.repo.replace('https://github.com/', '')}
            </span>
          </a>
        </div>
      </div>
    </BentoCard>
  );
};

const RepoCard = ({
  repo,
  index,
  className,
}: {
  repo: Repo;
  index: number;
  className?: string;
}) => (
  <BentoCard
    href={repo.repo}
    label={`Open ${repo.name} on GitHub`}
    delay={0.05 * index}
    className={cn('flex flex-col gap-4 p-3', className)}
  >
    {/* The post's illustrated thumbnail doubles as the card's visual. */}
    <div className="relative overflow-hidden rounded-[calc(var(--radius-bento)-0.5rem)] bg-secondary">
      <img
        src={`/assets/thumbnails/${repo.post}.svg`}
        alt=""
        loading="lazy"
        className="aspect-[16/9] w-full object-cover transition-[scale] duration-700 ease-[var(--ease-apple)] group-hover:scale-[1.04]"
      />
      <span className="material absolute right-2.5 top-2.5 rounded-full px-2.5 py-1 font-mono text-[0.7rem] text-foreground">
        arXiv:{repo.arxiv}
      </span>
    </div>
    <div className="flex flex-1 flex-col gap-3 px-2 pb-2">
      <p className="text-[0.8rem] font-medium text-brand">{repo.org}</p>
      <h3 className="-mt-2 text-xl font-semibold leading-snug text-foreground">
        {repo.paper}
      </h3>
      <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
        {repo.description}
      </p>
      <Link
        to="/blog/$post"
        params={{ post: repo.post }}
        className="relative z-20 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
      >
        <BookOpen className="size-4" /> Read the breakdown
      </Link>
      <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4">
        <span className="flex min-w-0 items-center gap-2 font-mono text-sm text-foreground">
          <GithubIcon className="shrink-0 text-base" />
          <span className="truncate">{repo.name}</span>
        </span>
        <ArrowChip />
      </div>
    </div>
  </BentoCard>
);

/** Desktop: the row pins and slides sideways as you scroll down. */
const HorizontalScroller = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const total = os.repos.length + FEATURED.length;

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useMotionValueEvent(scrollYProgress, 'change', (p) =>
    setActive(Math.min(total - 1, Math.floor(p * total))),
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Open source projects"
      className="relative left-1/2 w-screen -translate-x-1/2"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-center gap-6 px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        >
          <Intro className="w-[26rem] shrink-0 pr-6" />
          {FEATURED.map((f) => (
            <FeaturedCard
              key={f.name}
              item={f}
              className="w-[40rem] shrink-0"
            />
          ))}
          {os.repos.map((repo, i) => (
            <RepoCard
              key={repo.name}
              repo={repo}
              index={i}
              className="w-[22rem] shrink-0"
            />
          ))}
        </motion.div>
        <div className="mx-auto mt-10 flex w-full max-w-6xl items-center gap-4 px-6">
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {String(active + 1).padStart(2, '0')} /{' '}
            {String(total).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 overflow-hidden bg-border">
            <motion.div
              style={{ scaleX: progress }}
              className="h-full origin-left bg-brand"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const StackedGrid = () => (
  <section
    aria-label="Open source projects"
    className="grid gap-4 md:grid-cols-2 md:gap-6"
  >
    <Intro className="mb-4 md:col-span-2" />
    {FEATURED.map((f) => (
      <FeaturedCard key={f.name} item={f} className="md:col-span-2" />
    ))}
    {os.repos.map((repo, i) => (
      <RepoCard
        key={repo.name}
        repo={repo}
        index={i}
        className={cn(
          // An odd last card spans the row instead of sitting alone.
          i === os.repos.length - 1 &&
            os.repos.length % 2 === 1 &&
            'md:col-span-2',
        )}
      />
    ))}
  </section>
);

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  );
  useLayoutEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
};

export const OpenSourceSection = () => {
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery(
    '(min-width: 1024px) and (min-height: 640px)',
  );
  return (
    <div id="open-source" className="mt-24 md:mt-32">
      {isDesktop && !reduce ? <HorizontalScroller /> : <StackedGrid />}
    </div>
  );
};
