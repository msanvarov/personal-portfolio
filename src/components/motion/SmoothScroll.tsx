import { useLocation } from '@tanstack/react-router';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

/**
 * Lenis smooth scrolling + a thin scroll-progress bar pinned to the top.
 * Lenis drives the real window scroll, so framer-motion's useScroll keeps
 * working everywhere. Disabled when the user prefers reduced motion.
 */
export const SmoothScroll = () => {
  const reduce = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduce]);

  // New route → start at the top without a long smooth glide.
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-brand via-[#9aa9ff] to-brand"
      style={{ scaleX }}
    />
  );
};
