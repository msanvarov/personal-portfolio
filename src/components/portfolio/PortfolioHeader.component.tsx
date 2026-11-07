import { EASE } from '@/components/motion/Reveal';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef } from 'react';

type PortfolioHeaderProps = {
  media: string;
};

/** Case-study hero: the media scales down and drifts as you scroll past. */
export const PortfolioHeader = ({ media }: PortfolioHeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="bento mb-6 grid min-h-64 place-items-center overflow-hidden px-6 py-12 md:min-h-96 md:px-12 md:py-20"
    >
      <motion.img
        src={media}
        alt="banner"
        style={reduce ? undefined : { scale, y }}
        className="max-h-[26rem] w-auto max-w-full rounded-2xl object-contain"
      />
    </motion.div>
  );
};
