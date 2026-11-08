import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';
import { ENTER, SPRING } from '@/components/motion/springs';
import { Plus } from 'lucide-react';
import type { PointerEvent, ReactNode } from 'react';

type BentoCardProps = Omit<HTMLMotionProps<'div'>, 'children'> & {
  children?: ReactNode;
  /** Internal route — the whole tile becomes a link. */
  to?: string;
  /** External URL — the whole tile becomes a link. */
  href?: string;
  /** Accessible name for the tile-wide link. */
  label?: string;
  /** Entrance delay (seconds) for the scroll-in reveal. */
  delay?: number;
  /** Lift on hover; on by default for linked tiles. */
  interactive?: boolean;
};

export const BentoCard = ({
  children,
  className,
  to,
  href,
  label,
  delay = 0,
  interactive,
  onPointerMove,
  ...props
}: BentoCardProps) => {
  const reduce = useReducedMotion();
  const lift = !reduce && (interactive ?? Boolean(to || href));

  // Feeds the cursor spotlight (CSS ::after); mouse/pen only.
  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    onPointerMove?.(e);
    if (e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const overlayClass =
    'absolute inset-0 z-10 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand';

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ ...ENTER, delay }}
      whileHover={lift ? { y: -4, transition: SPRING } : undefined}
      // Feedback on press, not release.
      whileTap={
        lift ? { scale: 0.985, transition: { duration: 0.08 } } : undefined
      }
      onPointerMove={handleMove}
      className={cn('bento group min-w-0 overflow-hidden', className)}
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

/** Apple-style round "+" button in a tile's corner. */
export const ArrowChip = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn(
      'grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-foreground/80 shadow-[inset_0_0_0_1px_var(--bento-edge)]',
      'transition-[background-color,color,rotate] duration-500 ease-[var(--ease-apple)]',
      'group-hover:rotate-90 group-hover:bg-brand group-hover:text-brand-foreground',
      className,
    )}
  >
    <Plus className="size-4" strokeWidth={2.25} />
  </span>
);

type TileHeaderProps = {
  icon?: ReactNode;
  caption: string;
  title?: ReactNode;
  className?: string;
  align?: 'center' | 'start';
};

/** Small purple icon + caption, then a short title — tops most tiles. */
export const TileHeader = ({
  icon,
  caption,
  title,
  className,
  align = 'center',
}: TileHeaderProps) => (
  <div
    className={cn(
      'flex flex-col gap-1',
      align === 'center' ? 'items-center text-center' : 'items-start',
      className,
    )}
  >
    <p className="flex items-center gap-1.5 text-[0.8rem] font-medium text-muted-foreground">
      {icon ? (
        <span className="text-brand [&_svg]:size-3.5">{icon}</span>
      ) : null}
      {caption}
    </p>
    {title ? (
      <h3 className="text-[1.05rem] font-semibold text-foreground">{title}</h3>
    ) : null}
  </div>
);

type CardMetaProps = {
  caption?: string;
  heading: ReactNode;
  className?: string;
  arrow?: boolean;
};

/** Caption + heading + "+" button footer used by link tiles. */
export const CardMeta = ({
  caption,
  heading,
  className,
  arrow = true,
}: CardMetaProps) => (
  <div className={cn('flex items-end justify-between gap-4', className)}>
    <div className="min-w-0">
      {caption ? (
        <p className="mb-1 text-[0.8rem] font-medium text-brand">{caption}</p>
      ) : null}
      <h3 className="text-xl font-semibold text-foreground md:text-2xl">
        {heading}
      </h3>
    </div>
    {arrow ? <ArrowChip /> : null}
  </div>
);
