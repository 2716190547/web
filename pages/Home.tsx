
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUp, Crosshair, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { TiltCard } from '../components/TiltCard';

// Floating Shape Component
const FloatingShape = ({ delay, className, style }: { delay: number, className: string, style?: any }) => (
  <motion.div
    className={`absolute pointer-events-none z-0 ${className}`}
    style={style}
    animate={{ 
      y: [0, -20, 0],
      rotate: [0, 10, 0],
    }}
    transition={{ 
      duration: 8, 
      ease: "easeInOut", 
      repeat: Infinity,
      delay: delay
    }}
  />
);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const yHero = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scaleText = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  
  // Footer Rotation Effect
  const { scrollYProgress: footerScroll } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"]
  });
  const turbineRotate = useTransform(footerScroll, [0, 1], [0, 360]);
  
  const marqueeVariants = {
    animate: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 20,
          ease: "linear",
        },
      },
    },
  };

  const reverseMarqueeVariants = {
    animate: {
      x: [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 25,
          ease: "linear",
        },
      },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div ref={containerRef} className="relative min-h-[250vh] bg-transparent overflow-hidden">
      
      {/* Technical details / Crosshairs */}
      <div className="fixed top-24 left-6 z-0 opacity-30 hidden md:block">
        <Crosshair className="w-6 h-6 text-white mb-2" />
        <div className="font-mono text-xs text-white">SYS.READY</div>
      </div>
      <div className="fixed bottom-6 right-6 z-0 opacity-30 hidden md:block text-right">
        <div className="font-mono text-xs text-white">COORD: 34.0522° N</div>
        <div className="font-mono text-xs text-white">118.2437° W</div>
      </div>

      {/* Solid Marquee Text Background (Rotated) */}
      <div className="fixed top-1/2 -translate-y-1/2 left-0 w-full pointer-events-none z-0 rotate-[-5deg] scale-110 opacity-20">
        <motion.div variants={marqueeVariants} animate="animate" className="whitespace-nowrap">
          <span className="font-display font-black text-[20vw] leading-none text-ash">DESIGN CODE MOTION ART DESIGN CODE MOTION ART </span>
          <span className="font-display font-black text-[20vw] leading-none text-ash">DESIGN CODE MOTION ART DESIGN CODE MOTION ART </span>
        </motion.div>
      </div>

      {/* Horizontal Marquee (Straight) */}
      <div className="absolute top-[85vh] left-0 w-full z-0 overflow-hidden py-4 bg-neon/5 border-y border-neon/20">
         <motion.div variants={reverseMarqueeVariants} animate="animate" className="whitespace-nowrap flex items-center gap-12">
            {[...Array(8)].map((_, i) => (
               <React.Fragment key={i}>
                  <span className="font-display font-bold text-6xl text-transparent stroke-text stroke-white/20" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>
                     UI/UX DESIGN
                  </span>
                  <span className="font-display font-black text-6xl text-neon">
                     SEAN ZENG
                  </span>
               </React.Fragment>
            ))}
         </motion.div>
      </div>

      {/* Hero Section */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden z-10">
        
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
           <h1 className="font-display font-black text-[25vw] leading-none text-ash/50 select-none tracking-tighter mix-blend-overlay">
             ZENG
           </h1>
        </motion.div>

        <div className="z-10 text-center space-y-8 px-4 relative text-white mix-blend-normal w-full flex flex-col items-center">
          <div className="mb-4 relative">
            {/* 
              GEOMETRIC SHAPES STRATEGY:
              Large = Theme (Neon/White)
              Small = Accent (Cyber/Grape)
            */}
            
            {/* Main Large Shape (Neon Ring) */}
            <FloatingShape delay={0} className="-top-12 -left-12 md:-top-24 md:-left-32 w-32 h-32 md:w-48 md:h-48 border-[8px] border-neon opacity-50 rounded-full" />
            
            {/* Secondary Large Shape (White Square) */}
            <FloatingShape delay={1} className="top-0 -right-16 md:-right-32 w-20 h-20 md:w-32 md:h-32 border-[3px] border-white opacity-30 rounded-[2rem] rotate-12" />

            {/* Accent 1 (Cyber Blue Filled Square) */}
            <FloatingShape delay={2} className="-bottom-8 -right-8 md:-bottom-12 md:-right-16 w-10 h-10 md:w-16 md:h-16 bg-cyber mix-blend-screen opacity-90 rounded-xl rotate-45" />
            
            {/* Accent 2 (Grape Purple Dot) */}
            <FloatingShape delay={1.5} className="bottom-12 -left-16 md:-left-32 w-6 h-6 md:w-8 md:h-8 bg-grape rounded-full opacity-100" />

             {/* Accent 3 (Cyber Small) */}
             <FloatingShape delay={3} className="-top-20 right-0 w-4 h-4 bg-cyber rounded-sm opacity-80" />

            <InteractiveTitle 
              text="DIGITAL ALCHEMIST" 
              size="large" 
              align="center"
              className="text-white"
            />
          </div>
          
          <motion.p 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             className="font-sans font-bold text-white max-w-xl mx-auto text-lg md:text-xl leading-tight tracking-tight"
          >
            FORGING IMMERSIVE DIGITAL REALITIES.
            <br />
            REACT • WEBGL • INTERACTION
          </motion.p>

          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.6 }}
             className="pt-4 md:pt-8"
          >
             <Link to="/contact" className="interactive-target inline-block">
                <div className="group relative px-8 py-4 md:px-10 md:py-5 bg-neon text-black font-display font-black text-sm uppercase tracking-widest overflow-hidden shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-[2rem]">
                  <span className="relative z-10 group-hover:text-neon transition-colors duration-300">Start A Project</span>
                  <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left" />
                </div>
             </Link>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight className="w-8 h-8 text-neon rotate-90" />
        </motion.div>
      </section>

      {/* Featured Work */}
      <section className="relative py-20 md:py-32 z-10 border-t border-white/10 bg-void/80 backdrop-blur-sm">
        <div className="pl-6 md:pl-20 mb-12 md:mb-20 relative border-l-[8px] md:border-l-[12px] border-neon">
           <InteractiveTitle text="SELECTED WORKS" size="medium" align="left" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            {/* Project 1 */}
            <div className="space-y-4 mt-0 md:mt-24">
                <Link to="/work" className="block group interactive-target">
                  <TiltCard className="rounded-[2.5rem]" scale={1.05}>
                    <div className="aspect-video w-full bg-ash relative overflow-hidden border-4 border-transparent group-hover:border-neon transition-colors duration-500 rounded-[2.5rem]">
                       <img 
                         src="https://picsum.photos/seed/neon1/1920/1080" 
                         alt="Project 1" 
                         className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" 
                       />
                       
                       <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="w-16 h-16 bg-neon text-black rounded-full flex items-center justify-center shadow-xl hover:bg-white transition-colors">
                            <ArrowUpRight className="w-8 h-8" />
                          </div>
                       </div>
                    </div>
                  </TiltCard>
                  <div className="pt-3 px-4">
                    <h4 className="font-display font-black text-4xl text-white mb-2 group-hover:text-neon transition-colors">NEON GENESIS</h4>
                    <p className="font-mono font-bold text-sm text-cyber tracking-widest">WEB DESIGN / THREE.JS</p>
                  </div>
                </Link>
            </div>

            {/* Project 2 */}
            <div className="space-y-4">
                <Link to="/work" className="block group interactive-target">
                  <TiltCard className="rounded-[2.5rem]" scale={1.05}>
                    <div className="aspect-video w-full bg-ash relative overflow-hidden border-4 border-transparent group-hover:border-neon transition-colors duration-500 rounded-[2.5rem]">
                       <img 
                         src="https://picsum.photos/seed/void2/1920/1080" 
                         alt="Project 2" 
                         className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" 
                       />
                       
                       <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                          <div className="w-16 h-16 bg-neon text-black rounded-full flex items-center justify-center shadow-xl hover:bg-white transition-colors">
                            <ArrowUpRight className="w-8 h-8" />
                          </div>
                       </div>
                    </div>
                  </TiltCard>
                  <div className="pt-3 px-4">
                    <h4 className="font-display font-black text-4xl text-white mb-2 group-hover:text-neon transition-colors">VOID WALKER</h4>
                    <p className="font-mono font-bold text-sm text-cyber tracking-widest">BRANDING / MOTION</p>
                  </div>
                </Link>
            </div>
        </div>
        
        <div className="flex justify-center mt-20 md:mt-32">
           <Link to="/work" className="interactive-target">
            <button className="group relative px-12 py-5 md:px-16 md:py-6 bg-white text-black font-display font-black text-lg md:text-xl uppercase tracking-widest overflow-hidden border-4 border-transparent hover:border-white transition-colors rounded-[2rem]">
               <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Archive</span>
               <div className="absolute inset-0 bg-neon transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left" />
            </button>
           </Link>
        </div>
      </section>

      {/* Footer - UPDATED TO HIGH CONTRAST (BLACK BG) */}
      <section ref={footerRef} className="min-h-screen bg-void flex flex-col items-center justify-center relative overflow-hidden text-white z-20 border-t border-white/10">
         
         {/* Giant Rotating Turbine Background - Improved contrast by making it white with very low opacity instead of neon */}
         <motion.div 
            style={{ rotate: turbineRotate }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05] text-white"
         >
            <svg viewBox="0 0 200 200" className="w-[150vw] h-[150vw]">
               <path d="M100 0 L110 90 L200 100 L110 110 L100 200 L90 110 L0 100 L90 90 Z" fill="currentColor" />
               <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="2" fill="none" />
               <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="5 5" />
            </svg>
         </motion.div>

         {/* Marquee Loop */}
         <div className="absolute top-10 w-full overflow-hidden border-y-4 border-neon bg-neon py-2 rotate-1 scale-105">
           <motion.div 
             variants={marqueeVariants}
             animate="animate"
             className="whitespace-nowrap font-display font-black text-3xl md:text-4xl text-black tracking-tighter flex gap-8"
           >
             {Array(10).fill("AVAILABLE FOR WORK • LETS CREATE CHAOS • ").map((text, i) => (
               <span key={i}>{text}</span>
             ))}
           </motion.div>
         </div>

         <motion.div style={{ scale: scaleText }} className="text-center px-6 z-10 relative max-w-6xl flex flex-col items-center gap-8">
            <InteractiveTitle 
              text="LET'S WORK TOGETHER" 
              size="large" 
              align="center" 
              className="text-white"
            />
            
            <Link to="/contact" className="interactive-target group relative mt-4 md:mt-8">
               {/* Magnetic-style big button */}
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: 5 }}
                 whileTap={{ scale: 0.95 }}
                 className="w-48 h-48 md:w-64 md:h-64 bg-neon rounded-full flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(204,255,0,0.3)]"
               >
                 <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                 <span className="font-display font-black text-2xl md:text-4xl text-black z-10">
                   START
                 </span>
                 <ArrowRight className="absolute bottom-12 text-black w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
               </motion.div>
            </Link>

            <a href="mailto:hello@seanzeng.design" className="interactive-target flex items-center gap-3 font-mono text-lg md:text-xl font-bold text-gray-300 hover:text-neon hover:scale-110 transition-all">
              <Mail className="w-5 h-5" />
              hello@seanzeng.design
            </a>
         </motion.div>

         {/* Footer Bottom Info - Increased contrast */}
         <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 flex justify-between items-end font-mono text-xs font-bold border-t border-white/10 text-gray-300">
            <div className="flex flex-col">
              <span>© 2025 SEAN ZENG</span>
              <span>ALL RIGHTS RESERVED</span>
            </div>
            
            <div className="hidden md:flex gap-8 uppercase">
              <a href="#" className="hover:text-neon hover:underline interactive-target transition-colors">Instagram</a>
              <a href="#" className="hover:text-neon hover:underline interactive-target transition-colors">Twitter</a>
              <a href="#" className="hover:text-neon hover:underline interactive-target transition-colors">LinkedIn</a>
            </div>

            <motion.button
              onClick={scrollToTop}
              className="interactive-target flex flex-col items-center gap-2 group text-white"
              whileHover={{ y: -5 }}
            >
              <div className="w-10 h-10 border-2 border-white/20 flex items-center justify-center group-hover:bg-neon group-hover:border-neon transition-colors duration-300 relative overflow-hidden rounded-lg">
                <ArrowUp className="w-5 h-5 text-white group-hover:text-black transition-colors duration-300" />
              </div>
              <span className="tracking-widest">TOP</span>
            </motion.button>
         </div>
      </section>
    </div>
  );
};

export default Home;
