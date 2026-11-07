import { cn } from '@/lib/utils';
import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
  y?: number;
};

/** Fades + lifts its children in the first time they scroll into view. */
export const Reveal = ({ delay = 0, y = 28, ...props }: RevealProps) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...props}
    />
  );
};

type SplitWordsProps = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

/** Reveals a line of text word by word, each word rising from a mask. */
export const SplitWords = ({
  text,
  className,
  delay = 0,
  stagger = 0.06,
}: SplitWordsProps) => {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  return (
    <span className={cn('inline-flex flex-wrap', className)} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="-my-[0.15em] inline-block overflow-hidden py-[0.15em] pr-[0.25em] last:pr-0"
        >
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: '110%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, delay: delay + i * stagger, ease: EASE }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};
