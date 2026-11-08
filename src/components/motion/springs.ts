import type { Transition } from 'framer-motion';

/** Critically damped spring — Apple's default for UI (no overshoot). */
export const SPRING: Transition = { type: 'spring', bounce: 0, duration: 0.5 };
/** Slower settle for content arriving on scroll. */
export const ENTER: Transition = { type: 'spring', bounce: 0, duration: 0.9 };
