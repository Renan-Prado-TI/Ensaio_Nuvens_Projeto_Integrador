import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

type PageTransitionProps = {
  children: React.ReactNode;
};

export const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.3
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      delay,
      duration: 0.6,
      ease: 'easeOut'
    }}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      delay,
      duration: 0.5,
      ease: 'backOut'
    }}
  >
    {children}
  </motion.div>
);

export const SlideIn = ({ children, from = 'left' }: { children: React.ReactNode; from?: 'left' | 'right' | 'top' | 'bottom' }) => {
  const direction = {
    left: { x: -50 },
    right: { x: 50 },
    top: { y: -50 },
    bottom: { y: 50 }
  };

  return (
    <motion.div
      initial={{ ...direction[from], opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        duration: 0.4
      }}
    >
      {children}
    </motion.div>
  );
};
