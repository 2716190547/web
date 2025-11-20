
import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveTitleProps {
  text: string;
  className?: string;
  size?: "large" | "medium" | "small";
  align?: "left" | "center" | "right";
}

export const InteractiveTitle: React.FC<InteractiveTitleProps> = ({ 
  text, 
  className = "",
  size = "large",
  align = "left"
}) => {
  // Split text into words, then characters
  const words = text.split(" ");

  const containerVariants = {
    initial: {},
    hover: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0
      }
    }
  };

  const letterVariants = {
    initial: { 
      y: 0,
      skewX: 0,
      color: "#ffffff",
      textShadow: "0px 0px 0px rgba(204, 255, 0, 0)"
    },
    hover: { 
      y: -8,
      skewX: -12,
      color: "#ccff00", // Neon
      textShadow: "4px 4px 0px rgba(255, 255, 255, 0.2)",
      transition: { 
        type: "spring" as const,
        damping: 12,
        stiffness: 200
      }
    }
  };

  // Continuous ambient animation (slow breathe)
  const ambientVariants = {
    animate: {
      y: [0, -5, 0],
      scale: [1, 1.01, 1],
      transition: {
        duration: 4,
        ease: "easeInOut" as const,
        repeat: Infinity,
      }
    }
  };

  const getSizeClass = () => {
    switch(size) {
      case "large": return "text-5xl sm:text-6xl md:text-8xl lg:text-[9rem]";
      case "medium": return "text-4xl sm:text-5xl md:text-7xl";
      case "small": return "text-2xl sm:text-3xl md:text-5xl";
      default: return "text-5xl sm:text-7xl";
    }
  };

  return (
    <motion.div 
      className={`relative font-display font-black leading-[0.85] tracking-tighter cursor-none interactive-target select-none ${className}`}
      initial="initial"
      whileHover="hover"
      animate="animate"
      variants={ambientVariants}
      style={{ 
        textAlign: align,
      }}
    >
      <motion.div variants={containerVariants} className={`relative z-10 flex flex-wrap gap-x-[0.3em] ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
        {words.map((word, i) => (
          <span key={i} className={`inline-flex overflow-hidden py-4 ${getSizeClass()}`}>
            {word.split("").map((char, j) => (
              <motion.span
                key={j}
                variants={letterVariants}
                className="inline-block relative"
              >
                {char}
                {/* Ghost Character for "Bold" weight effect on hover */}
                <span className="absolute inset-0 text-transparent stroke-text stroke-white opacity-20 pointer-events-none select-none translate-x-[4px] translate-y-[4px] -z-10" 
                      style={{ WebkitTextStroke: '2px rgba(255,255,255,0.3)' }}>
                  {char}
                </span>
              </motion.span>
            ))}
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
};
