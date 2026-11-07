import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

type VelocityMarqueeProps = {
  children: ReactNode;
  /** Base speed in % of one copy per second. */
  speed?: number;
};

/**
 * Infinite marquee that speeds up with scroll velocity and flips direction
 * when the user scrolls back up.
 */
export const VelocityMarquee = ({ children, speed = 3 }: VelocityMarqueeProps) => {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), {
    damping: 50,
    stiffness: 400,
  });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) direction.current = 1;
    else if (f > 0) direction.current = -1;
    const move = direction.current * speed * (delta / 1000);
    baseX.set(baseX.get() + move + move * Math.abs(f));
  });

  return (
    <div className="mask-fade-x overflow-hidden">
      <motion.div className="flex w-max whitespace-nowrap" style={{ x }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
