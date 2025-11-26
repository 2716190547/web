
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TransitionLogo } from './Logo';
import { useSound } from '../contexts/SoundContext';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { playSwipeIn, playSwipeOut } = useSound();
  
  // Cinematic "Tech" easing
  const ease = [0.87, 0, 0.13, 1] as const;

  // Duration of the "Hold" phase (The curtain covers screen)
  const holdDuration = 0.9;

  useEffect(() => {
    // ENTERING NEW PAGE (Arrival):
    // The "Void" (black curtain) starts moving away at `holdDuration - 0.1s` (0.8s).
    // The new "playSwipeOut" sound has a fast attack (immediate swell).
    // We sync the sound to start exactly when the black curtain begins to slide, revealing content.
    const revealTimer = setTimeout(() => {
      playSwipeOut(); 
    }, (holdDuration - 0.1) * 1000);

    return () => {
      clearTimeout(revealTimer);
      // LEAVING CURRENT PAGE (Departure):
      // Play the mechanical "lock/shutter" sound immediately when transition starts.
      playSwipeIn();
    };
  }, [playSwipeIn, playSwipeOut]);

  const neonVariants = {
    initial: { x: "0%" }, 
    animate: { 
      x: "-100%",
      transition: { 
        duration: 0.7,
        ease: ease,
        delay: holdDuration 
      } 
    },
    exit: { 
      x: ["100%", "0%"], 
      transition: { 
        duration: 0.5,
        ease: ease 
      } 
    }
  };

  const voidVariants = {
    initial: { x: "0%" }, 
    animate: { 
      x: "-100%",
      transition: { 
        duration: 0.8, 
        ease: ease,
        delay: holdDuration - 0.1 
      } 
    },
    exit: { 
      x: ["100%", "0%"], 
      transition: { 
        duration: 0.6,
        ease: ease,
        delay: 0.05 
      } 
    }
  };

  const contentVariants = {
    initial: { opacity: 0, scale: 0.98, filter: "blur(8px)" },
    animate: { 
      opacity: 1, 
      scale: 1, 
      filter: "blur(0px)",
      transition: { 
        delay: holdDuration + 0.2, 
        duration: 0.6,
        ease: "easeOut" as const
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.02,
      filter: "blur(8px)", 
      transition: { duration: 0.3, ease: "easeIn" as const } 
    }
  };

  return (
    <>
      {/* Actual Page Content */}
      <motion.div
        className="relative z-10"
        variants={contentVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
      
      {/* 
         TRANSITION CURTAINS
      */}

      {/* Layer 1: Neon (Fast Lead) */}
      <motion.div
        className="fixed inset-0 z-[70] pointer-events-none bg-neon"
        variants={neonVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      />

      {/* Layer 2: The Void (Dark background that holds the logo) */}
      <motion.div
        className="fixed inset-0 z-[80] pointer-events-none flex items-center justify-center bg-void overflow-hidden"
        variants={voidVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* 
            LOGO CONTAINER 
        */}
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { duration: 0.2 } 
          }}
          exit={{ opacity: 0 }}
        >
           <TransitionLogo className="w-48 h-48 md:w-64 md:h-64 text-white" />
           
           {/* Progress Bar / Decoration */}
           <div className="mt-12 w-32 h-1 bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-neon"
               initial={{ x: "-100%" }}
               animate={{ x: "0%" }}
               transition={{ duration: holdDuration, ease: "linear" }}
             />
           </div>
        </motion.div>

        {/* Grid texture inside the void */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </motion.div>
    </>
  );
};
