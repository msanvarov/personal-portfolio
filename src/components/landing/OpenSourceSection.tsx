import { ArrowChip, BentoCard } from '@/components/bento/BentoCard';
import { SplitWords } from '@/components/motion/Reveal';
import { StarMark } from '@/components/SectionHeading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
import { ExternalLink } from 'lucide-react';
import { useLayoutEffect, useRef, useState } from 'react';

const os = en.opensource;
type Repo = (typeof os.repos)[number];

const GithubIcon = ({ className }: { className?: string }) => (
  <i className={cn('iconoir-github', className)} aria-hidden />
);

const Intro = ({ className }: { className?: string }) => (
  <div className={cn('flex flex-col justify-center', className)}>
    <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-brand">
      <StarMark className="size-3" /> {os.caption}
    </p>
    <h2 className="text-5xl font-semibold uppercase leading-[0.95] text-foreground md:text-7xl">
      <SplitWords text={os.heading} />
    </h2>
    <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">
      {os.description}
    </p>
    <Button
      asChild
      variant="outline"
      className="mt-8 h-11 w-fit rounded-full px-5"
    >
      <a href={os.github} target="_blank" rel="noreferrer noopener">
        <GithubIcon className="text-base" /> github.com/msanvarov
      </a>
    </Button>
  </div>
);

const FeaturedCard = ({ className }: { className?: string }) => {
  const f = os.featured;
  return (
    <BentoCard
      href={f.live}
      label={`Open ${f.name}`}
      tilt={2}
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
          <Button
            asChild
            className="relative z-20 h-10 rounded-full bg-brand px-4 text-brand-foreground hover:bg-brand/90"
          >
            <a href={f.live} target="_blank" rel="noreferrer noopener">
              <ExternalLink className="size-4" /> Live demo
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="relative z-20 h-10 rounded-full px-4"
          >
            <a href={f.repo} target="_blank" rel="noreferrer noopener">
              <GithubIcon /> Source
            </a>
          </Button>
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
    className={cn('flex flex-col gap-6 p-6', className)}
  >
    <div className="flex items-start justify-between gap-4">
      <span className="font-heading text-6xl font-semibold leading-none text-foreground/10 transition-colors duration-500 group-hover:text-brand/40">
        {String(index + 2).padStart(2, '0')}
      </span>
      <Badge variant="outline" className="rounded-full font-mono text-[0.7rem]">
        arXiv:{repo.arxiv}
      </Badge>
    </div>
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {repo.org}
      </p>
      <p className="mt-2 font-serif text-2xl italic leading-tight text-foreground">
        {repo.paper}
      </p>
    </div>
    <p className="leading-relaxed text-muted-foreground">{repo.description}</p>
    <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-5">
      <span className="flex min-w-0 items-center gap-2 font-mono text-sm text-foreground">
        <GithubIcon className="shrink-0 text-base" />
        <span className="truncate">{repo.name}</span>
      </span>
      <ArrowChip className="size-10" />
    </div>
  </BentoCard>
);

/** Desktop: the row pins and slides sideways as you scroll down. */
const HorizontalScroller = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const total = os.repos.length + 1;

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
    setActive(Math.min(total - 1, Math.floor(p * total)))
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
          <FeaturedCard className="w-[40rem] shrink-0" />
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
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
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
  <section aria-label="Open source projects" className="grid gap-4 md:grid-cols-2 md:gap-6">
    <Intro className="mb-4 md:col-span-2" />
    <FeaturedCard className="md:col-span-2" />
    {os.repos.map((repo, i) => (
      <RepoCard
        key={repo.name}
        repo={repo}
        index={i}
        className={cn(
          // An odd last card spans the row instead of sitting alone.
          i === os.repos.length - 1 && os.repos.length % 2 === 1 && 'md:col-span-2'
        )}
      />
    ))}
  </section>
);

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
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
  const isDesktop = useMediaQuery('(min-width: 1024px) and (min-height: 640px)');
  return (
    <div id="open-source" className="mt-24 md:mt-32">
      {isDesktop && !reduce ? <HorizontalScroller /> : <StackedGrid />}
    </div>
  );
};
