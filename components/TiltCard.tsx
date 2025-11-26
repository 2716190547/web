
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  rotateAmplitude?: number;
}

export const TiltCard: React.FC<TiltCardProps> = ({ 
  children, 
  className = "", 
  scale = 1.05, 
  rotateAmplitude = 12 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Center-relative coordinates (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the tilt
  const springConfig = { damping: 30, stiffness: 400, mass: 0.2 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Calculate rotation:
  // Mouse Top (-0.5) -> Rotate X Positive (Title Up/Back)
  // Mouse Bottom (0.5) -> Rotate X Negative (Tilt Down/Forward)
  // Note: In CSS rotateX, positive is top-back.
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);
  
  // Glare moves with the mouse
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    // Calculate position relative to the center of the card
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    
    const xPct = (clientX / width) - 0.5;
    const yPct = (clientY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group/tilt ${className}`}
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: scale }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full h-full relative"
      >
        {/* Content layer - pushed forward slightly */}
        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
           {children}
        </div>

        {/* Glare Overlay - only visible on hover */}
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] overflow-hidden mix-blend-overlay"
          style={{ transform: "translateZ(30px)" }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
           <motion.div 
             className="absolute w-[200%] h-[200%] -left-1/2 -top-1/2"
             style={{
               background: 'radial-gradient(circle at center, rgba(255,255,255,0.7) 0%, transparent 60%)',
               x: glareX,
               y: glareY,
               opacity: 0.6
             }}
           />
        </motion.div>

        {/* Shadow - scales and blurs on hover */}
         <motion.div 
           className="absolute inset-4 bg-black/60 blur-xl -z-10 rounded-[inherit]"
           style={{ transform: "translateZ(-30px)" }}
           animate={{ opacity: 0.5 }}
           whileHover={{ opacity: 0.8, scale: 0.95 }}
           transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};
