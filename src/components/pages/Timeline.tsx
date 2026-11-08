import { Reveal } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';

export type TimelineItem = {
  date: string;
  title: string;
  subtitle: string;
  /** Trusted HTML from the i18n content files. */
  description?: string;
};

type TimelineProps = {
  items: TimelineItem[];
  className?: string;
  /** Larger type for full-width page sections. */
  size?: 'sm' | 'lg';
};

/** Vertical timeline whose brand line draws itself as you scroll past it. */
export const Timeline = ({ items, className, size = 'sm' }: TimelineProps) => {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 55%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className={cn('relative pl-7', className)}>
      <span
        aria-hidden
        className="absolute bottom-3 left-[7px] top-3 w-0.5 rounded-full bg-border"
      />
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute bottom-3 left-[7px] top-3 w-0.5 origin-top rounded-full bg-gradient-to-b from-brand to-orchid"
      />
      {items.map((item, i) => {
        const present = item.date.includes('Present');
        return (
          <li key={`${item.title}-${i}`} className="relative pb-7 last:pb-0">
            <Reveal delay={Math.min(i, 4) * 0.04} y={16}>
              <span
                aria-hidden
                className="absolute -left-7 top-1.5 grid size-4 place-items-center rounded-full bg-card shadow-[0_0_0_2px_var(--brand)]"
              >
                {present ? (
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full rounded-full bg-brand opacity-70 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand" />
                  </span>
                ) : (
                  <span className="size-1.5 rounded-full bg-brand/50" />
                )}
              </span>
              <p
                className={cn(
                  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium shadow-[inset_0_0_0_1px_var(--bento-edge)]',
                  present
                    ? 'bg-brand-soft text-brand'
                    : 'bg-[var(--chip)] text-muted-foreground',
                )}
              >
                {item.date}
              </p>
              <h3
                className={cn(
                  'mt-2 font-semibold text-foreground',
                  size === 'lg' ? 'text-lg md:text-xl' : 'text-[1.05rem]',
                )}
              >
                {item.title}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {item.subtitle}
              </p>
              {item.description ? (
                <p
                  className="mt-2.5 max-w-prose text-[0.95rem] leading-relaxed text-muted-foreground [&_a]:text-brand [&_a]:underline-offset-4 hover:[&_a]:underline"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              ) : null}
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
};
