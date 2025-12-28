import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export const ParallaxSection = ({ 
  children, 
  offset = 50, 
  className = '' 
}: ParallaxSectionProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export const ParallaxImage = ({ 
  src, 
  alt, 
  className = '',
  speed = 0.5 
}: ParallaxImageProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 100}%`, `${speed * 100}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

interface ParallaxTextProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export const ParallaxText = ({
  children,
  speed = 0.3,
  direction = 'up',
  className = '',
}: ParallaxTextProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const directionConfig = {
    up: { y: useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `-${speed * 100}%`]) },
    down: { y: useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]) },
    left: { x: useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `-${speed * 100}%`]) },
    right: { x: useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`]) },
  };

  return (
    <motion.div
      ref={ref}
      style={directionConfig[direction]}
      className={className}
    >
      {children}
    </motion.div>
  );
};
