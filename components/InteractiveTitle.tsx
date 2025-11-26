
import React from 'react';
import { motion } from 'framer-motion';

interface InteractiveTitleProps {
  text: string;
  className?: string;
  size?: "large" | "medium" | "small";
  align?: "left" | "center" | "right";
  baseColor?: string;
}

export const InteractiveTitle: React.FC<InteractiveTitleProps> = ({ 
  text, 
  className = "",
  size = "large",
  align = "left",
  baseColor = "#ffffff"
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
      scale: 1,
      color: baseColor,
      // Added linear shadow for rich texture in idle state
      textShadow: "0px 0px 0px rgba(255, 255, 255, 0)"
    },
    hover: { 
      y: -10,
      skewX: -15,
      scale: 1.05,
      color: "#ccff00", // Neon
      textShadow: "5px 5px 0px rgba(0, 0, 0, 1)", // Hard shadow for contrast
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
      y: [0, -3, 0],
      transition: {
        duration: 5,
        ease: "easeInOut" as const,
        repeat: Infinity,
      }
    }
  };

  const getSizeClass = () => {
    switch(size) {
      // Improved responsiveness: More granular scaling for smoother mobile adaptation
      case "large": return "text-[3rem] sm:text-6xl md:text-8xl lg:text-9xl xl:text-[11rem] tracking-tighter";
      case "medium": return "text-3xl sm:text-4xl md:text-6xl lg:text-7xl";
      case "small": return "text-xl sm:text-2xl md:text-4xl";
      default: return "text-4xl sm:text-6xl";
    }
  };
  
  // Square size calculations based on title size
  const squareSize = size === 'large' ? 'w-3 h-3 md:w-6 md:h-6' : size === 'medium' ? 'w-2 h-2 md:w-4 md:h-4' : 'w-2 h-2 md:w-3 md:h-3';
  const squareMargin = size === 'large' ? 'ml-2 md:ml-8' : 'ml-2 md:ml-6';
  const squareOffset = size === 'large' ? 'mt-2 md:mt-4' : 'mt-1 md:mt-2';

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
      <motion.div variants={containerVariants} className={`relative z-10 flex flex-wrap gap-x-[0.2em] gap-y-2 ${align === 'center' ? 'justify-center' : align === 'right' ? 'justify-end' : 'justify-start'}`}>
        {words.map((word, i) => (
          <span key={i} className={`inline-flex overflow-visible py-2 ${getSizeClass()}`}>
            {word.split("").map((char, j) => (
              <motion.span
                key={j}
                variants={letterVariants}
                className="inline-block relative transform-style-3d"
              >
                {char}
                {/* Ghost Character: More visible now for "Printed/Industrial" look */}
                <span 
                  className="absolute inset-0 text-transparent stroke-text pointer-events-none select-none -z-10 transition-transform duration-300" 
                  style={{ 
                    WebkitTextStroke: `1px ${baseColor === '#ccff00' ? 'rgba(204,255,0,0.5)' : 'rgba(255,255,255,0.5)'}`,
                    transform: 'translate(4px, 4px)'
                  }}
                >
                  {char}
                </span>
                
                {/* Second Ghost for extreme hover depth */}
                <motion.span 
                  className="absolute inset-0 text-transparent stroke-text pointer-events-none select-none -z-20 opacity-0"
                  variants={{
                    hover: { opacity: 0.5, x: 8, y: 8 }
                  }}
                  style={{ WebkitTextStroke: '1px #ccff00' }}
                >
                  {char}
                </motion.span>
              </motion.span>
            ))}
          </span>
        ))}
        
        {/* Glitch Square Decoration */}
        <div className={`relative inline-flex items-center justify-center ${squareSize} ${squareMargin} ${squareOffset} self-center`}>
           <motion.div 
             className="absolute inset-0 bg-neon"
             animate={{ 
                x: [-2, 10, -2, -10, -2],
                opacity: [1, 0.4, 1, 0.4, 1],
             }}
             transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: (t: number) => Math.ceil(t * 4) / 4, // Stepped motion
                times: [0, 0.2, 0.5, 0.8, 1]
             }}
           />
           <motion.div 
             className="absolute inset-0 border border-neon"
             animate={{ 
                scale: [1, 2.5],
                opacity: [0.6, 0]
             }}
             transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeOut",
                delay: 0.5
             }}
           />
        </div>
      </motion.div>
    </motion.div>
  );
};
