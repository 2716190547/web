
import React from 'react';
import { motion } from 'framer-motion';

export const BackgroundShapes: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
       {/* Noise Texture Overlay for Grit */}
       <div 
         className="absolute inset-0 opacity-[0.15] mix-blend-overlay z-10"
         style={{
           backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")`,
           backgroundRepeat: 'repeat',
         }}
       />

       {/* 
         AMBIENT THEME COLORS (Always visible)
         These provide the "theme color" requested when not hovering.
       */}
       
       {/* Neon Glow - Top Left */}
       <motion.div 
         className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] bg-neon/5 blur-[120px] rounded-full mix-blend-screen"
         animate={{ 
           scale: [1, 1.1, 1],
           opacity: [0.05, 0.1, 0.05],
         }}
         transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
       />

       {/* Grape Glow - Bottom Right */}
       <motion.div 
         className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-grape/10 blur-[100px] rounded-full mix-blend-screen"
         animate={{ 
           scale: [1, 1.2, 1],
           opacity: [0.1, 0.15, 0.1],
         }}
         transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
       />

       {/* Cyber Glow - Floating Middle */}
       <motion.div 
         className="absolute top-[30%] left-[40%] w-[40vw] h-[40vw] bg-cyber/5 blur-[150px] rounded-full mix-blend-screen"
         animate={{ 
           x: [-50, 50, -50],
           y: [-50, 50, -50],
         }}
         transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
       />

       {/* 
         GEOMETRIC SHAPES 
       */}

       {/* LARGE 1: Rotating Neon Circle - Main Anchor */}
       <motion.div 
         className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-neon/10 opacity-20"
         animate={{ 
           scale: [1, 1.05, 1],
           rotate: [0, 120, 360],
         }}
         transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
       />

       {/* LARGE 2: White Outline Square */}
       <motion.div 
         className="absolute top-[40%] -left-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-white/5 rounded-[3rem]"
         animate={{ 
            rotate: [0, 15, 0], 
            y: [0, 60, 0] 
         }}
         transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
       />

       {/* SMALL ACCENTS */}
       <motion.div 
         className="absolute top-[60%] left-[30%] w-3 h-3 bg-neon rounded-full box-shadow-neon"
         animate={{ y: [0, -80, 0], opacity: [0, 1, 0] }}
         transition={{ duration: 10, repeat: Infinity, delay: 1 }}
       />
    </div>
  );
};
