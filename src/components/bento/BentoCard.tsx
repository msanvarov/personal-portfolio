import { EASE } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import {
  motion,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRef, type PointerEvent, type ReactNode } from 'react';

type BentoCardProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children?: ReactNode;
  /** Internal route — the whole card becomes a link. */
  to?: string;
  /** External URL — the whole card becomes a link. */
  href?: string;
  /** Accessible name for the card-wide link. */
  label?: string;
  /** Max tilt in degrees on pointer move; 0 disables. */
  tilt?: number;
  /** Entrance delay (seconds) for the scroll-in reveal. */
  delay?: number;
};

const SPRING = { stiffness: 180, damping: 18, mass: 0.6 };

export const BentoCard = ({
  children,
  className,
  to,
  href,
  label,
  tilt = 4,
  delay = 0,
  onPointerMove,
  onPointerLeave,
  style,
  ...props
}: BentoCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);
    if (reduce || !tilt || e.pointerType !== 'mouse') return;
    rotateY.set((x / rect.width - 0.5) * tilt * 2);
    rotateX.set(-(y / rect.height - 0.5) * tilt * 2);
  };

  const handleLeave = (e: PointerEvent<HTMLDivElement>) => {
    onPointerLeave?.(e);
    rotateX.set(0);
    rotateY.set(0);
  };

  const overlayClass =
    'absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand';

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 48, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.85, delay, ease: EASE }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200, ...style }}
      className={cn('bento group overflow-hidden', className)}
      {...props}
    >
      {to ? <Link to={to} aria-label={label} className={overlayClass} /> : null}
      {!to && href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={label}
          className={overlayClass}
        />
      ) : null}
      {children}
    </motion.div>
  );
};

/** The round arrow chip in each card's corner; spins on card hover. */
export const ArrowChip = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn(
      'grid size-12 shrink-0 place-items-center rounded-full border border-border bg-background/40 text-muted-foreground backdrop-blur transition-all duration-500 ease-out',
      'group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-brand-foreground',
      className
    )}
  >
    <ArrowUpRight className="size-5" />
  </span>
);

type CardMetaProps = {
  caption?: string;
  heading: ReactNode;
  className?: string;
  arrow?: boolean;
};

/** Caption + heading + arrow footer used by most bento cards. */
export const CardMeta = ({
  caption,
  heading,
  className,
  arrow = true,
}: CardMetaProps) => (
  <div className={cn('flex items-end justify-between gap-4', className)}>
    <div className="min-w-0">
      {caption ? (
        <p className="mb-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {caption}
        </p>
      ) : null}
      <h3 className="text-2xl font-semibold text-foreground transition-transform duration-500 group-hover:translate-x-1">
        {heading}
      </h3>
    </div>
    {arrow ? <ArrowChip /> : null}
  </div>
);
