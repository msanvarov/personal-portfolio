import { motion } from 'framer-motion';

type PreloaderProps = {
  loading?: boolean;
};

export const Preloader = ({ loading = true }: PreloaderProps) => {
  if (!loading) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] grid place-items-center bg-background"
    >
      <div className="h-0.5 w-40 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full w-1/2 rounded-full bg-brand"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 1.1, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>
    </div>
  );
};
