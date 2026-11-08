import { SPRING } from '@/components/motion/springs';
import { Reveal } from '@/components/motion/Reveal';
import { CategoryChip } from '@/components/portfolio/CategoryChip.component';
import { studyName } from '@/utils/content';
import { cn } from '@/lib/utils';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

type PortfolioHeaderProps = {
  media: string;
  /** Frontmatter of the case study (passed in by PortfolioEntryPage). */
  metadata?: Record<string, string>;
};

/**
 * Case-study hero: name + category + summary, then the media in a large
 * tile that gently shrinks and drifts as you scroll past it.
 */
export const PortfolioHeader = ({ media, metadata }: PortfolioHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);
  // Photo banners fill the tile; logos sit centered on a well.
  // ponytail: cover images are over-scaled 12% so the 6% drift never shows an edge.
  const isCover = String(metadata?.cover) === 'true';

  return (
    <header className="mb-3 sm:mb-4">
      {metadata ? (
        <div className="mx-auto mb-8 flex max-w-2xl flex-col items-center text-center md:mb-12">
          <Reveal y={12}>
            <CategoryChip category={metadata.category} />
          </Reveal>
          <Reveal y={20} delay={0.05}>
            <h1 className="text-gradient mt-4 pb-1 text-5xl font-semibold md:text-7xl">
              {studyName(metadata.title)}
            </h1>
          </Reveal>
          <Reveal y={20} delay={0.1}>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground md:text-lg">
              {metadata.description}
            </p>
          </Reveal>
        </div>
      ) : null}

      <motion.div
        ref={ref}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...SPRING, duration: 0.9, delay: 0.1 }}
        style={reduce ? undefined : { scale }}
        className={cn(
          'bento overflow-hidden',
          isCover
            ? 'aspect-[4/3] sm:aspect-[1600/840]'
            : 'grid min-h-56 place-items-center p-8 sm:min-h-80 md:min-h-96 md:p-16',
        )}
      >
        <motion.img
          src={media}
          alt="banner"
          style={reduce ? undefined : { y }}
          className={cn(
            isCover
              ? 'size-full scale-[1.12] object-cover'
              : 'max-h-28 w-auto max-w-[80%] object-contain md:max-h-40',
          )}
        />
      </motion.div>
    </header>
  );
};
