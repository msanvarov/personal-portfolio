import useMedia from "@hooks/useMedia";

export const prefersReducedMotion = useMedia<boolean>(
  ["(prefers-reduced-motion: reduce)"],
  [true],
  false
);
