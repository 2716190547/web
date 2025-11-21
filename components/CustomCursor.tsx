
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 35, stiffness: 400, mass: 0.5 }; 

  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.interactive-target');
        
      setIsHovering(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          // Hover: Shrink to a small solid dot
          // Normal: Larger outlined diamond
          scale: isHovering ? 0.5 : 1,
          rotate: 45, 
        }}
      >
        {/* The Visual Cursor Shape */}
        <motion.div 
          animate={{
            width: isHovering ? 24 : 24,
            height: isHovering ? 24 : 24,
            backgroundColor: isHovering ? "#ccff00" : "transparent",
            border: isHovering ? "none" : "2px solid white",
          }}
          className="transition-colors duration-200"
        />
        
        {/* Optional Crosshair lines inside normal state */}
        {!isHovering && (
          <>
            <div className="absolute w-[140%] h-[1px] bg-white/50 -rotate-45" />
            <div className="absolute h-[140%] w-[1px] bg-white/50 -rotate-45" />
          </>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
