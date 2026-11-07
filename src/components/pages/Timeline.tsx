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
    <ol ref={ref} className={cn('relative pl-8', className)}>
      <span aria-hidden className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-brand"
      />
      {items.map((item, i) => (
        <li key={`${item.title}-${i}`} className="relative pb-8 last:pb-0">
          <Reveal delay={i * 0.04} y={16}>
            <span
              aria-hidden
              className="absolute -left-8 top-1 size-[15px] rounded-full border-2 border-brand bg-background"
            />
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-brand">
              {item.date}
            </p>
            <h3
              className={cn(
                'mt-1.5 font-semibold text-foreground',
                size === 'lg' ? 'text-2xl' : 'text-lg'
              )}
            >
              {item.title}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {item.subtitle}
            </p>
            {item.description ? (
              <p
                className="mt-3 max-w-prose leading-relaxed text-muted-foreground [&_a]:text-brand [&_a]:underline-offset-4 hover:[&_a]:underline"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            ) : null}
          </Reveal>
        </li>
      ))}
    </ol>
  );
};
