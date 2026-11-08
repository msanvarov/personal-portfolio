import { useTheme } from '@/providers/ThemeProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export const ThemeConfigurator = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="relative grid size-8 place-items-center overflow-hidden rounded-full text-foreground/80 transition-colors hover:bg-foreground/[0.07] hover:text-foreground active:scale-95"
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, rotate: -60, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -14, rotate: 60, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
          className="grid place-items-center"
        >
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};
