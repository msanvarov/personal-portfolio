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
import { SPRING } from '@/components/motion/springs';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
} from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';

const os = en.opensource;

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

type Card = {
  name: string;
  repo: string;
  post: string;
  title: string;
  kicker: string;
  badge: string;
  description: string;
  demo?: string;
  media?: string;
};

type Group = { name: string; cards: Card[] };

/** Paper recreations and the Node.js security repos, each shown as one deck. */
const GROUPS: Group[] = [
  {
    name: os.papersName,
    cards: os.repos.map((r) => ({
      ...r,
      title: r.paper,
      kicker: r.org,
      badge: `arXiv:${r.arxiv}`,
    })),
  },
  {
    name: os.series.name,
    cards: os.series.repos.map((r) => ({
      ...r,
      kicker: r.topics,
      badge: 'Node.js',
    })),
  },
];

const RepoCard = ({
  repo,
  index,
  className,
}: {
  repo: Card;
  index: number;
  className?: string;
}) => (
  <BentoCard
    href={repo.repo}
    label={`Open ${repo.name} on GitHub`}
    delay={0.05 * index}
    className={cn('flex flex-col gap-4 p-3', className)}
  >
    {/* A screenshot of the live demo; it grows to fill a stretched card. */}
    <div className="relative aspect-[16/9] flex-1 overflow-hidden rounded-[calc(var(--radius-bento)-0.5rem)] border border-border bg-secondary">
      <img
        src={repo.media ?? `/assets/thumbnails/${repo.post}.svg`}
        alt={repo.media ? `${repo.title} demo screenshot` : ''}
        loading="lazy"
        className="absolute inset-0 size-full object-cover object-left-top transition-[scale] duration-700 ease-[var(--ease-apple)] group-hover:scale-[1.04]"
      />
      {repo.demo ? (
        <span className="material absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium text-foreground">
          <span className="size-1.5 rounded-full bg-emerald-400" /> Live
        </span>
      ) : null}
      <span className="material absolute right-2.5 top-2.5 rounded-full px-2.5 py-1 font-mono text-[0.7rem] text-foreground">
        {repo.badge}
      </span>
    </div>
    <div className="flex flex-col gap-3 px-2 pb-2">
      <p className="text-[0.8rem] font-medium text-brand">{repo.kicker}</p>
      <h4 className="-mt-2 text-xl font-semibold leading-snug text-foreground">
        {repo.title}
      </h4>
      <p className="text-[0.95rem] leading-relaxed text-muted-foreground">
        {repo.description}
      </p>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {repo.demo ? (
          <a
            href={repo.demo}
            target="_blank"
            rel="noreferrer noopener"
            className="relative z-20 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            <ExternalLink className="size-4" /> Live demo
          </a>
        ) : null}
        <Link
          to="/blog/$post"
          params={{ post: repo.post }}
          className="relative z-20 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
        >
          <BookOpen className="size-4" /> Read the breakdown
        </Link>
      </div>
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

const PEEK = 2; // cards visible behind the front one

/** A group of repo cards as a deck: the front card is live, the next ones peek out behind it. */
const CardStack = ({
  group,
  className,
}: {
  group: Group;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const n = group.cards.length;
  const go = (step: number) => setActive((a) => (a + step + n) % n);
  const navClass =
    'btn-quiet size-9 shrink-0 rounded-full p-0 focus-visible:outline-2 focus-visible:outline-brand';

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between gap-4 px-1">
        <h3 className="text-lg font-semibold text-foreground">{group.name}</h3>
        <div className="flex items-center gap-2">
          <span
            aria-live="polite"
            className="mr-1 font-mono text-xs tabular-nums text-muted-foreground"
          >
            {active + 1} / {n}
          </span>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={`Previous ${group.name} repo`}
            className={navClass}
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={`Next ${group.name} repo`}
            className={navClass}
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
      {/* Every card sits in the same grid cell, so the deck is as tall as its tallest card. */}
      <div className="grid flex-1" style={{ paddingTop: PEEK * 12 }}>
        {group.cards.map((repo, i) => {
          const pos = (i - active + n) % n;
          const depth = Math.min(pos, PEEK);
          return (
            <motion.div
              key={repo.name}
              initial={false}
              animate={{
                y: -12 * depth,
                scale: 1 - 0.05 * depth,
                opacity: pos > PEEK ? 0 : 1 - 0.3 * depth,
              }}
              transition={reduce ? { duration: 0 } : SPRING}
              style={{ zIndex: n - pos }}
              className="flex origin-top [grid-area:1/1]"
              aria-hidden={pos > 0}
              // Cards behind the front one can't be focused or clicked.
              {...{ inert: pos > 0 ? '' : undefined }}
            >
              <RepoCard repo={repo} index={0} className="w-full" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/** Desktop: the row pins and slides sideways as you scroll down. */
const HorizontalScroller = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const total = GROUPS.length + FEATURED.length;

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
          className="flex w-max items-stretch gap-6 px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        >
          <Intro className="w-[26rem] shrink-0 pr-6" />
          {FEATURED.map((f) => (
            <FeaturedCard
              key={f.name}
              item={f}
              className="w-[40rem] shrink-0"
            />
          ))}
          {GROUPS.map((g) => (
            <CardStack key={g.name} group={g} className="w-[32rem] shrink-0" />
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
    {GROUPS.map((g) => (
      <CardStack key={g.name} group={g} />
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
