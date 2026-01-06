import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-[60]"
      style={{ scaleX }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-primary/50 opacity-80" />
      <motion.div 
        className="absolute right-0 top-0 w-3 h-3 bg-accent rounded-full -translate-y-1/2 shadow-lg shadow-accent/50"
        style={{ 
          opacity: scrollYProgress,
        }}
      />
    </motion.div>
  );
};
