
import React from 'react';
import { motion } from 'framer-motion';

interface CircularTextProps {
  text: string;
  radius?: number;
  className?: string;
  duration?: number;
}

export const CircularText: React.FC<CircularTextProps> = ({ 
  text, 
  radius = 100, 
  className = "",
  duration = 20
}) => {
  // Repeat text to fill circle
  const repeatedText = `${text} • ${text} • ${text} • `;

  return (
    <motion.div
      className={`absolute pointer-events-none select-none flex items-center justify-center ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: duration, ease: "linear", repeat: Infinity }}
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <svg viewBox="0 0 300 300" className="w-full h-full overflow-visible animate-spin-slow">
        <defs>
          <path
            id="circlePath"
            d="M 150, 150 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
          />
        </defs>
        <text className="fill-current font-mono font-bold uppercase tracking-[0.2em] text-[10px]">
          <textPath xlinkHref="#circlePath" startOffset="0%">
             {repeatedText}
          </textPath>
        </text>
      </svg>
    </motion.div>
  );
};
