import { cn } from '@/lib/utils';
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from 'framer-motion';

/** Apple's ease-out curve, for the few tween (non-spring) animations. */
export const EASE = [0.32, 0.72, 0, 1] as const;

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
  y?: number;
};

/** Fades + rises its children (critically damped spring) on first view. */
export const Reveal = ({ delay = 0, y = 24, ...props }: RevealProps) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', bounce: 0, duration: 0.9, delay }}
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
  stagger = 0.05,
}: SplitWordsProps) => {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  // The line (not each clipped word) watches the viewport: a word hidden
  // inside its mask never intersects, so per-word triggers can stall.
  return (
    <motion.span
      className={cn('inline-flex flex-wrap', className)}
      aria-label={text}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          aria-hidden
          className="-my-[0.15em] inline-block overflow-hidden py-[0.15em] pr-[0.25em] last:pr-0"
        >
          <motion.span
            className="inline-block"
            variants={
              reduce
                ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
                : {
                    hidden: { y: '110%' },
                    show: {
                      y: '0%',
                      transition: {
                        type: 'spring',
                        bounce: 0,
                        duration: 0.8,
                        delay: delay + i * stagger,
                      },
                    },
                  }
            }
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', bounce: 0, duration: 0.55 },
  },
};
const itemVariantsReduced: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

/** A list whose items cascade in, one after another, on first view. */
export const StaggerList = (props: HTMLMotionProps<'ul'>) => (
  <motion.ul
    variants={listVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-30px' }}
    {...props}
  />
);

export const StaggerItem = (props: HTMLMotionProps<'li'>) => {
  const reduce = useReducedMotion();
  return (
    <motion.li
      variants={reduce ? itemVariantsReduced : itemVariants}
      {...props}
    />
  );
};
