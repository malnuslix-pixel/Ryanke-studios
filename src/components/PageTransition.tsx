import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode, useEffect } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

// Optimized page variants with smooth mobile-first transitions
const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  enter: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -8,
  },
};

const pageTransition = {
  type: 'tween',
  ease: [0.22, 1, 0.36, 1], // Expo-like ease for smooth feel
  duration: 0.5,
};

const reducedMotionTransition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.15,
};

export const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  const prefersReducedMotion = useReducedMotion();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={prefersReducedMotion ? {
        initial: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 },
      } : pageVariants}
      transition={prefersReducedMotion ? reducedMotionTransition : pageTransition}
      className={`will-change-[opacity,transform] ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Stagger container for page content
export const PageContent = ({ children, className = '' }: PageTransitionProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
