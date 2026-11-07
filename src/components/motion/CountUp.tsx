import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  /** Display value such as "60+" — the number counts up, the suffix stays. */
  value: string;
  className?: string;
};

export const CountUp = ({ value, className }: CountUpProps) => {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : value;
  const numeric = match !== null;
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(reduce || !numeric ? target : 0);

  useEffect(() => {
    if (!inView || reduce || !numeric) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCurrent(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, target, numeric]);

  if (!numeric) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {current}
      {suffix}
    </span>
  );
};
