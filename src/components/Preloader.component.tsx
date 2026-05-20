import { motion } from 'framer-motion';

type PreloaderProps = {
  loading?: boolean;
};

export const Preloader = ({ loading = true }: PreloaderProps) => {
  const containerVariants = {
    open: { scaleY: 1 },
    closed: { scaleY: 0 },
  };

  const loaderVariants = {
    leftToRight: { scaleX: 1, originX: 0 },
    rightToLeft: { scaleX: 0, originX: 1 },
  };

  if (!loading) return null;

  return (
    <motion.div
      id="preloader"
      className="preloader off"
      initial="closed"
      animate="open"
      variants={containerVariants}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div className="black_wall" />
      <motion.div
        className="loader"
        variants={loaderVariants}
        initial="leftToRight"
        animate="rightToLeft"
        transition={{
          duration: 3,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
    </motion.div>
  );
};
