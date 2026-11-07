import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/ThemeProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export const ThemeConfigurator = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      className="relative size-10 overflow-hidden rounded-full bg-background/40 backdrop-blur"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 18, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -18, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="grid place-items-center"
        >
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </motion.span>
      </AnimatePresence>
    </Button>
  );
};
