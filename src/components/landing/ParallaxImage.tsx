import { cn } from '@/lib/utils';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Total travel in px as the image crosses the viewport. */
  distance?: number;
};

/** Image that drifts against the scroll direction for a sense of depth. */
export const ParallaxImage = ({
  src,
  alt,
  className,
  distance = 40,
}: ParallaxImageProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [distance / 2, -distance / 2]
  );

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      loading="lazy"
      style={{ y }}
      className={cn(
        'pointer-events-none select-none transition-[scale] duration-700 ease-out group-hover:scale-105',
        className
      )}
    />
  );
};
