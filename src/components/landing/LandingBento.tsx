import { ArrowChip, BentoCard, TileHeader } from '@/components/bento/BentoCard';
import { CountUp } from '@/components/motion/CountUp';
import { FormattedDate } from '@/components/FormattedDate.component';
import { en } from '@/i18n';
import { cn } from '@/lib/utils';
import { caseStudies, postsAsStoreShape } from '@/utils/content';
import { STUDIO } from '@/utils/studio';
import { Link } from '@tanstack/react-router';
import { StaggerItem, StaggerList } from '@/components/motion/Reveal';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Code2,
  FolderGit2,
  Handshake,
  Layers,
  Mail,
  MapPin,
  MessagesSquare,
  PenLine,
  Rocket,
} from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

const { bio, facts, contact } = en.landing;
const mail = en.contact.contact.mail.links[0];
const calendly = en.contact.contact.phone.links[0]?.href;
const presentRoles = en.credentials.experience.experience.filter((e) =>
  e.date.includes('Present'),
);

/** Types the text out once, with a blinking caret. */
const Typewriter = ({ text }: { text: string }) => {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? text.length : 0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setCount((c) => {
        if (c >= text.length) window.clearInterval(id);
        return Math.min(c + 1, text.length);
      });
    }, 45);
    return () => window.clearInterval(id);
  }, [reduce, text]);
  return (
    <span aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span
        aria-hidden
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-caret bg-brand"
      />
    </span>
  );
};

/** Infinite row that drifts inside a tile; pauses while hovered. */
const Marquee = ({
  children,
  reverse,
  duration = 36,
}: {
  children: ReactNode;
  reverse?: boolean;
  duration?: number;
}) => (
  <div className="mask-fade-x -mx-4 overflow-hidden sm:-mx-5">
    <div
      className={cn(
        'flex w-max gap-2.5 pr-2.5 group-hover:[animation-play-state:paused]',
        reverse ? 'animate-marquee-reverse' : 'animate-marquee',
      )}
      style={{ ['--marquee-duration' as string]: `${duration}s` }}
    >
      {children}
      {/* Visual duplicate for the seamless loop; inert so it's not tabbable. */}
      <div aria-hidden className="contents" {...{ inert: '' }}>
        {children}
      </div>
    </div>
  </div>
);

const Monogram = ({ name }: { name: string }) => (
  <span className="chip-icon text-[0.7rem] font-semibold">
    {name.replace(/[^A-Za-z]/g, '').slice(0, 2)}
  </span>
);

/* ── Tiles ─────────────────────────────────────────────────────────── */

const ProfileTile = ({ className }: { className?: string }) => (
  <BentoCard delay={0.05} className={cn('beam p-4 sm:p-6', className)}>
    <div className="flex items-start gap-4">
      <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-[#e6e3f1] via-[#b9b2dc] to-[#6f6896] sm:size-24">
        <img
          src={bio.media}
          alt="Sal Anvarov"
          className="absolute inset-x-0 bottom-0 w-full"
        />
      </div>
      <div className="min-w-0 flex-1">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground shadow-[inset_0_0_0_1px_var(--bento-edge)]">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
          </span>
          {bio.location.replace('📍 ', '')}
        </span>
        <h1 className="mt-2 text-[1.75rem] font-semibold text-foreground sm:text-4xl">
          {bio.heading}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          <Typewriter text={bio.caption} />
        </p>
      </div>
    </div>

    <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
      {bio.description}
    </p>

    <StaggerList className="mt-4 flex flex-wrap gap-2">
      {presentRoles.slice(0, 3).map((role) => (
        <StaggerItem
          key={role.company}
          className="chip py-1.5 pl-2.5 text-[0.8rem] text-muted-foreground"
        >
          <BriefcaseBusiness className="size-3.5 text-brand" />
          <span className="text-foreground">{role.title}</span>·{role.company}
        </StaggerItem>
      ))}
    </StaggerList>

    <div className="mt-5 grid grid-cols-2 gap-2.5">
      <a href={`mailto:${mail}`} className="btn-brand h-11 text-sm">
        <Mail className="size-4" /> Email me
      </a>
      <Link to="/bio" className="btn-quiet h-11 text-sm">
        Read bio <ArrowRight className="size-4" />
      </Link>
    </div>
  </BentoCard>
);

const STAT_ICONS = [BriefcaseBusiness, MessagesSquare, Rocket];

const StatsRow = ({ className }: { className?: string }) => (
  <div className={cn('grid grid-cols-3 gap-3 sm:gap-4', className)}>
    {facts.quickFacts.map((item, i) => {
      const Icon = STAT_ICONS[i % STAT_ICONS.length];
      const number = item.count.replace(/\D/g, '');
      const suffix = item.count.replace(/\d/g, '');
      return (
        <BentoCard
          key={item.label}
          delay={0.08 * i}
          className="flex flex-col items-center gap-2 px-2 py-4 sm:py-5"
        >
          <p className="flex items-start font-heading text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            <CountUp
              value={number}
              className="text-gradient text-gradient-pan"
            />
            <span className="ml-0.5 text-2xl text-brand sm:text-3xl">
              {suffix}
            </span>
          </p>
          <p className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-center text-[0.65rem] font-medium leading-tight text-muted-foreground sm:text-xs">
            <Icon className="hidden size-3.5 shrink-0 text-brand sm:block" />
            <span
              className="[&_br]:hidden"
              dangerouslySetInnerHTML={{
                __html: item.label
                  .toLowerCase()
                  .replace(/^./, (c) => c.toUpperCase()),
              }}
            />
          </p>
        </BentoCard>
      );
    })}
  </div>
);

const STACK = [
  ...en.credentials.capabilities.capabilities.map((c) => ({
    name: c.name,
    meta: c.percent.replace(' years', ' yrs'),
  })),
  { name: 'FastAPI', meta: 'API' },
];

const StackTile = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { margin: '-40px' });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  // Walk the highlight across the chips while the tile is visible.
  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % STACK.length),
      1600,
    );
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <BentoCard
      to="/credentials"
      label="Open credentials"
      className={cn('p-4 sm:p-5', className)}
    >
      <TileHeader icon={<Layers />} caption="My stack" title="Tech arsenal" />
      <StaggerList ref={ref} className="mt-4 grid grid-cols-2 gap-2">
        {STACK.map((item, i) => (
          <StaggerItem key={item.name} className="chip relative w-full pr-2.5">
            {i === active && !reduce ? (
              <motion.span
                layoutId="stack-highlight"
                aria-hidden
                className="absolute inset-0 rounded-[inherit] shadow-[inset_0_0_0_1px_var(--bento-edge-hi),0_0_24px_-6px_var(--brand)]"
                transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
              />
            ) : null}
            <span
              className={cn(
                'chip-icon text-[0.7rem] font-semibold transition-colors duration-500',
                i === active && !reduce && 'bg-brand text-brand-foreground',
              )}
            >
              {item.name.replace(/[^A-Za-z]/g, '').slice(0, 2)}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate">{item.name}</span>
              <span className="block text-[0.7rem] text-muted-foreground">
                {item.meta}
              </span>
            </span>
          </StaggerItem>
        ))}
      </StaggerList>
    </BentoCard>
  );
};

const WorksTile = ({ className }: { className?: string }) => (
  <BentoCard delay={0.1} className={cn('flex flex-col p-4 sm:p-5', className)}>
    <TileHeader
      icon={<FolderGit2 />}
      caption="Portfolio"
      title="Works gallery"
    />
    <div className="mt-4">
      <Marquee duration={40}>
        {caseStudies.map((study) => (
          <Link
            key={study.slug}
            to="/portfolio/$entry"
            params={{ entry: study.slug }}
            aria-label={study.metadata.title}
            className="relative z-20 block h-24 w-40 shrink-0 overflow-hidden rounded-xl bg-secondary shadow-[inset_0_0_0_1px_var(--bento-edge)] sm:h-28 sm:w-44"
          >
            <img
              src={study.metadata.thumbnail}
              alt=""
              loading="lazy"
              className={cn(
                'size-full transition-[scale] duration-500 ease-[var(--ease-apple)] hover:scale-105',
                study.metadata.cover ? 'object-cover' : 'object-contain p-5',
              )}
            />
          </Link>
        ))}
      </Marquee>
    </div>
    <Link
      to="/portfolio"
      className="btn-brand relative z-20 mx-auto mt-4 h-11 w-fit px-5 text-sm"
    >
      Browse portfolio <ArrowRight className="size-4" />
    </Link>
  </BentoCard>
);

/** Offerings live on the studio site; this tile just points there. */
const StudioTile = ({ className }: { className?: string }) => (
  <BentoCard
    href={STUDIO.url}
    label={`${STUDIO.name} — visit by-sal.dev`}
    delay={0.15}
    className={cn(
      'flex flex-col items-center p-5 text-center sm:p-6',
      className,
    )}
  >
    <TileHeader icon={<Building2 />} caption="Studio" title={STUDIO.name} />
    <p className="mt-3 max-w-xs text-[0.95rem] leading-relaxed text-muted-foreground">
      Consulting and product engineering now run through my studio.
    </p>
    <span className="btn-brand mt-5 h-11 w-fit px-5 text-sm">
      by-sal.dev <ArrowUpRight className="size-4" />
    </span>
  </BentoCard>
);

const RepoRow = ({
  href,
  name,
  meta,
  mono,
}: {
  href: string;
  name: string;
  meta: ReactNode;
  mono?: boolean;
}) => (
  <StaggerItem>
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="chip relative z-20 w-full justify-between py-2 pr-3 transition-shadow hover:shadow-[inset_0_0_0_1px_var(--bento-edge-hi)]"
    >
      <span className="flex min-w-0 items-center gap-2">
        <span className="chip-icon">
          <i className="iconoir-github" aria-hidden />
        </span>
        <span className={cn('truncate', mono && 'font-mono text-[0.8rem]')}>
          {name}
        </span>
      </span>
      <span className="shrink-0 text-[0.7rem] text-muted-foreground">
        {meta}
      </span>
    </a>
  </StaggerItem>
);

const OpenSourceTile = ({ className }: { className?: string }) => {
  const os = en.opensource;
  return (
    <BentoCard delay={0.1} className={cn('p-4 sm:p-5', className)}>
      <TileHeader
        icon={<Code2 />}
        caption={os.caption}
        title="Built in public"
      />
      <StaggerList className="mt-4 flex flex-col gap-2">
        <RepoRow
          href={os.featured.live}
          name={os.featured.name}
          meta={
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" /> Live
            </span>
          }
        />
        {os.repos.map((repo) => (
          <RepoRow
            key={repo.name}
            href={repo.repo}
            name={repo.name}
            meta={<span className="font-mono">{repo.arxiv}</span>}
            mono
          />
        ))}
      </StaggerList>
      <a href="#open-source" className="btn-quiet mt-4 h-11 w-full text-sm">
        Explore the research <ArrowRight className="size-4" />
      </a>
    </BentoCard>
  );
};

const ExperienceTile = ({ className }: { className?: string }) => (
  <BentoCard
    to="/credentials"
    label="Open credentials"
    delay={0.05}
    className={cn('p-4 sm:p-5', className)}
  >
    <TileHeader
      icon={<BriefcaseBusiness />}
      caption="Experience"
      title="Career highlights"
    />
    <StaggerList className="mt-4 flex flex-col gap-2">
      {en.credentials.experience.experience.slice(0, 5).map((role) => (
        <StaggerItem
          key={`${role.company}-${role.title}`}
          className="chip w-full justify-between whitespace-normal py-2 pr-3"
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <Monogram name={role.company} />
            <span className="min-w-0">
              <span className="block truncate text-sm text-foreground">
                {role.title}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {role.company.split(' — ')[0]}
              </span>
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-[0.7rem] text-muted-foreground">
            {role.date.includes('Present') ? (
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
              </span>
            ) : null}
            {role.date.replace('Present', 'Now')}
          </span>
        </StaggerItem>
      ))}
    </StaggerList>
  </BentoCard>
);

const WritingTile = ({ className }: { className?: string }) => (
  <BentoCard delay={0.1} className={cn('flex flex-col p-4 sm:p-5', className)}>
    <TileHeader icon={<PenLine />} caption="Blog" title="Latest writing" />
    <StaggerList className="mt-3 flex flex-col divide-y divide-border">
      {postsAsStoreShape.slice(0, 3).map((post) => (
        <StaggerItem key={post.filePath}>
          <Link
            to="/blog/$post"
            params={{ post: post.filePath.replace(/\.mdx?$/, '') }}
            className="group/post relative z-20 block py-3"
          >
            <p className="flex items-center gap-2 text-[0.7rem] text-muted-foreground">
              <FormattedDate
                value={post.metadata.created}
                format="D MMM YYYY"
              />
              <span className="text-brand">{post.metadata.category}</span>
            </p>
            <p className="mt-1 flex items-start justify-between gap-3 text-[0.95rem] font-medium leading-snug text-foreground transition-colors group-hover/post:text-brand">
              <span className="line-clamp-2">{post.metadata.title}</span>
              <ArrowRight className="mt-0.5 size-4 shrink-0 -translate-x-2 opacity-0 transition-all duration-300 ease-[var(--ease-apple)] group-hover/post:translate-x-0 group-hover/post:opacity-100" />
            </p>
          </Link>
        </StaggerItem>
      ))}
    </StaggerList>
    <Link
      to="/blog"
      className="btn-quiet relative z-20 mt-auto h-11 w-full text-sm"
    >
      All posts <ArrowRight className="size-4" />
    </Link>
  </BentoCard>
);

const ContactTile = ({ className }: { className?: string }) => (
  <BentoCard
    delay={0.15}
    className={cn(
      'flex flex-col items-center justify-center p-5 text-center sm:p-6',
      className,
    )}
  >
    <span className="ring-spin grid size-14 place-items-center rounded-full bg-brand-soft text-foreground">
      <Handshake className="size-6" strokeWidth={1.75} />
    </span>
    <h2
      className="mt-4 text-2xl font-semibold text-foreground [&_br]:hidden [&_span]:text-gradient"
      dangerouslySetInnerHTML={{ __html: contact.heading }}
    />
    <div className="mt-5 grid w-full gap-2.5">
      {calendly ? (
        <a
          href={calendly}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-brand h-11 text-sm"
        >
          <CalendarDays className="size-4" /> Schedule a call
        </a>
      ) : null}
      <a href={`mailto:${mail}`} className="btn-quiet h-11 text-sm">
        <Mail className="size-4" /> {mail}
      </a>
    </div>
    <StaggerList className="mt-4 flex gap-2">
      {en.credentials.navbar.profiles.map((item) => (
        <StaggerItem key={item.link}>
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={item.icon.replace('iconoir-', '')}
            className="grid size-11 place-items-center rounded-full bg-secondary text-lg text-foreground shadow-[inset_0_0_0_1px_var(--bento-edge)] transition-colors hover:bg-brand hover:text-brand-foreground active:scale-95"
          >
            <i className={item.icon} aria-hidden />
          </a>
        </StaggerItem>
      ))}
    </StaggerList>
    <Link
      to="/contact"
      className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <MapPin className="size-3.5" /> {en.contact.contact.location.location}
      <ArrowChip className="size-6 [&_svg]:size-3" />
    </Link>
  </BentoCard>
);

/* ── Layout ────────────────────────────────────────────────────────── */

/**
 * Phones: one column in priority order. Tablets: two columns. Desktop:
 * three balanced columns of stacked tiles (columns become flex stacks).
 */
export const LandingBento = () => (
  <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1.4fr_1fr]">
    <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-4">
      <StackTile className="order-3 lg:order-none" />
      <WorksTile className="order-4 lg:order-none" />
      <WritingTile className="order-7 lg:order-none lg:flex-1" />
    </div>
    <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-4">
      <StatsRow className="order-2 md:col-span-2 lg:order-none lg:col-span-1" />
      <ProfileTile className="order-1 md:col-span-2 lg:order-none lg:col-span-1" />
      <OpenSourceTile className="order-8 lg:order-none lg:flex-1" />
    </div>
    <div className="contents lg:flex lg:min-w-0 lg:flex-col lg:gap-4">
      <ExperienceTile className="order-6 lg:order-none" />
      <StudioTile className="order-5 md:col-span-2 lg:order-none lg:col-span-1" />
      <ContactTile className="order-9 lg:order-none lg:flex-1" />
    </div>
  </div>
);
