
import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12", color = "currentColor" }) => {
  return (
    <svg viewBox="0 0 100 100" className={className} fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M 10 10 L 90 10 L 60 50 L 10 50 Z" />
      <path d="M 90 90 L 10 90 L 40 50 L 90 50 Z" />
      <path d="M 65 45 L 35 55" stroke={color} strokeWidth="2" />
    </svg>
  );
};

export const TransitionLogo: React.FC<{ className?: string }> = ({ className = "w-32 h-32" }) => {
  // Slightly faster duration to match the new transition speed
  const animDuration = 0.8;
  const easeBezier = [0.22, 1, 0.36, 1] as const;
  
  const pathVariants = {
    initial: { 
      pathLength: 0, 
      fill: "rgba(204, 255, 0, 0)", // Transparent
      stroke: "#ccff00",
      strokeWidth: 2
    },
    animate: { 
      pathLength: 1, 
      fill: "rgba(204, 255, 0, 1)", // Solid Neon
      stroke: "#ccff00",
      strokeWidth: 0,
      transition: { 
        // Draw syncs with rotation
        pathLength: { duration: animDuration, ease: easeBezier }, 
        fill: { duration: 0.3, ease: "easeIn" as const, delay: animDuration * 0.7 }, 
        strokeWidth: { duration: 0.1, delay: animDuration }
      }
    }
  };

  return (
    <div className={className}>
      <motion.svg 
        viewBox="0 0 100 100" 
        className="w-full h-full overflow-visible" 
        xmlns="http://www.w3.org/2000/svg"
        // Rotate continuously with the drawing
        initial={{ rotate: -90, scale: 0.85 }} 
        animate={{ rotate: 0, scale: 1 }}
        transition={{ 
          // Rotation is smoother and "slower" (only 90 degrees) but happens simultaneously
          rotate: { duration: animDuration + 0.1, ease: easeBezier },
          scale: { duration: animDuration, ease: easeBezier }
        }}
      >
        {/* Top Triangle */}
        <motion.path 
          d="M 10 10 L 90 10 L 60 50 L 10 50 Z" 
          variants={pathVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Bottom Triangle */}
        <motion.path 
          d="M 90 90 L 10 90 L 40 50 L 90 50 Z" 
          variants={pathVariants}
          initial="initial"
          animate="animate"
        />
        
        {/* Center Glow Effect */}
        <motion.circle 
          cx="50" cy="50" r="5" 
          fill="#fff"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 0], opacity: 1 }}
          transition={{ duration: 1.0, times: [0.6, 0.8, 1] }}
        />
      </motion.svg>
    </div>
  );
};
