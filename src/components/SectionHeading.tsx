import { SplitWords } from '@/components/motion/Reveal';
import { cn } from '@/lib/utils';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/** The template's four-point star, drawn in currentColor so it themes. */
export const StarMark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden className={cn('size-6', className)}>
    <path
      fill="currentColor"
      d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"
    />
  </svg>
);

type SectionHeadingProps = {
  children: string;
  eyebrow?: string;
  className?: string;
};

/**
 * Big uppercase page heading flanked by stars. The stars spin as the
 * heading scrolls through the viewport.
 */
export const SectionHeading = ({
  children,
  eyebrow,
  className,
}: SectionHeadingProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 270]);
  const rotateBack = useTransform(rotate, (r) => -r);

  return (
    <div ref={ref} className={cn('mb-10 text-center md:mb-14', className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="flex items-center justify-center gap-3 text-5xl font-semibold uppercase text-foreground md:gap-5 md:text-7xl lg:text-8xl">
        <motion.span style={{ rotate }} className="text-brand">
          <StarMark className="size-6 md:size-9" />
        </motion.span>
        <SplitWords text={children} />
        <motion.span style={{ rotate: rotateBack }} className="text-brand">
          <StarMark className="size-6 md:size-9" />
        </motion.span>
      </h1>
    </div>
  );
};
