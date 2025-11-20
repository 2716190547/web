
import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
       {/* 
         THEME STRATEGY:
         Large shapes = Theme Color (Neon/White) for structure
         Small shapes = Accent Colors (Cyber/Grape) for energy
       */}

       {/* LARGE 1: Rotating Neon Circle - Main Anchor */}
       <motion.div 
         className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-neon/10 opacity-30"
         animate={{ 
           scale: [1, 1.05, 1],
           rotate: [0, 120, 360],
         }}
         transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
       />

       {/* LARGE 2: White Outline Square - Structural Balance */}
       <motion.div 
         className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-white/5 rounded-[3rem]"
         animate={{ 
            rotate: [0, 15, 0], 
            y: [0, 60, 0] 
         }}
         transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
       />

       {/* MEDIUM: Cyber Blue Filled Square (Floating) */}
       <motion.div 
         className="absolute top-[15%] left-[15%] w-20 h-20 md:w-32 md:h-32 bg-cyber/5 backdrop-blur-md rounded-3xl border border-cyber/20"
         animate={{ 
            y: [0, -40, 0],
            rotate: [0, 45, 0]
         }}
         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
       />
       
       {/* MEDIUM: Grape Purple Circle (Breathing) */}
       <motion.div 
         className="absolute bottom-[20%] right-[15%] w-24 h-24 md:w-40 md:h-40 bg-grape/10 rounded-full blur-2xl"
         animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2]
         }}
         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
       />

       {/* SMALL ACCENT 1: Neon Particle */}
       <motion.div 
         className="absolute top-[60%] left-[30%] w-3 h-3 bg-neon rounded-full box-shadow-neon"
         animate={{ y: [0, -80, 0], opacity: [0, 1, 0] }}
         transition={{ duration: 10, repeat: Infinity, delay: 1 }}
       />
       
       {/* SMALL ACCENT 2: Cyber Particle */}
       <motion.div 
         className="absolute top-[30%] right-[40%] w-4 h-4 bg-cyber rounded-sm"
         animate={{ x: [0, 40, 0], rotate: [0, 180, 360] }}
         transition={{ duration: 12, repeat: Infinity, delay: 3 }}
       />

        {/* SMALL ACCENT 3: Grape Particle */}
       <motion.div 
         className="absolute bottom-[15%] left-[10%] w-2 h-2 bg-grape rounded-full"
         animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
         transition={{ duration: 6, repeat: Infinity, delay: 0 }}
       />
    </div>
  );
};
