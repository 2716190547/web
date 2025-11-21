
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUp, Crosshair, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { TiltCard } from '../components/TiltCard';
import { BackgroundShapes } from '../components/BackgroundShapes';
import { Logo } from '../components/Logo';

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

// New Floating Logo Component for Hero
const FloatingLogo = ({ delay, x, y, scale = 1, rotateDuration = 20, opacity = 0.3 }: any) => (
  <motion.div
    className="absolute pointer-events-none z-0"
    style={{ top: y, left: x }}
    animate={{
      y: [0, -15, 0],
      rotate: [0, 360],
    }}
    transition={{
      y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay },
      rotate: { duration: rotateDuration, repeat: Infinity, ease: "linear" }
    }}
  >
    <motion.div style={{ scale }}>
       <Logo className="w-16 h-16 text-neon" color="currentColor" />
    </motion.div>
  </motion.div>
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
          ease: "linear" as const,
        },
      },
    },
  };

  // Bottom Marquee (Left to Right)
  const bottomMarqueeVariants = {
    animate: {
      x: ["-50%", "0%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 15,
          ease: "linear" as const,
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

  const marqueeText = "UI/UX DESIGN SEAN ZENG  ";
  const marqueeContent = Array(20).fill(marqueeText).join(" • ");

  return (
    <div ref={containerRef} className="relative min-h-[250vh] bg-void overflow-hidden">
      
      {/* GLOBAL BACKGROUND SHAPES (Ambient Colors) */}
      <BackgroundShapes />

      {/* RICH BACKGROUND IMAGE LAYERS */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none overflow-hidden">
         {/* Abstract Image Layer - Adds Texture & Depth */}
         <div className="absolute top-0 left-0 w-full h-[120vh] opacity-30 mix-blend-lighten">
           <img 
             src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2670&auto=format&fit=crop" 
             alt="Abstract Background"
             className="w-full h-full object-cover grayscale contrast-125" 
           />
           <div className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void" />
         </div>

         {/* Vertical Grid Lines */}
         <div className="absolute top-0 left-[10%] w-[1px] h-full bg-white/5 hidden md:block" />
         <div className="absolute top-0 right-[10%] w-[1px] h-full bg-white/5 hidden md:block" />
         <div className="absolute top-0 left-[50%] w-[1px] h-full bg-white/5 hidden md:block opacity-50" />
         
         {/* Floating Data Artifacts */}
         <div className="absolute top-[15%] right-[5%] font-mono text-[10px] text-white/30 rotate-90 origin-top-left tracking-widest">
            SYS_ARCHIVE_V2
         </div>
         <div className="absolute bottom-[30%] left-[2%] font-mono text-[10px] text-white/30 -rotate-90 origin-bottom-left tracking-widest">
            RENDER_QUEUE_EMPTY
         </div>
      </div>

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
      <div className="fixed top-1/2 -translate-y-1/2 left-0 w-full pointer-events-none z-0 rotate-[-5deg] scale-110 opacity-[0.02]">
        <motion.div variants={marqueeVariants} animate="animate" className="whitespace-nowrap">
          <span className="font-display font-black text-[20vw] leading-none text-white select-none">DESIGN CODE MOTION ART DESIGN CODE MOTION ART </span>
          <span className="font-display font-black text-[20vw] leading-none text-white select-none">DESIGN CODE MOTION ART DESIGN CODE MOTION ART </span>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden z-10">
        
        <motion.div 
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
           <h1 className="font-display font-black text-[25vw] leading-none text-white/[0.02] select-none tracking-tighter">
             ZENG
           </h1>
        </motion.div>

        <div className="z-10 text-center space-y-8 px-4 relative text-white mix-blend-normal w-full flex flex-col items-center">
          
          {/* Replaced CircularText with Floating Logos */}
          <div className="mb-4 relative flex items-center justify-center w-full h-[300px] md:h-[400px]">
            
            {/* Floating Logo Variants */}
            <div className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
               {/* Top Left */}
               <FloatingLogo x="20%" y="10%" delay={0} scale={0.8} rotateDuration={15} />
               {/* Bottom Right */}
               <FloatingLogo x="75%" y="70%" delay={2} scale={1.2} rotateDuration={25} />
               {/* Top Right (Far) */}
               <FloatingLogo x="80%" y="20%" delay={1} scale={0.6} rotateDuration={10} />
               {/* Bottom Left */}
               <FloatingLogo x="25%" y="80%" delay={3} scale={0.9} rotateDuration={18} />
            </div>

            <div className="relative z-10">
               <InteractiveTitle 
                  text="DIGITAL ALCHEMIST" 
                  size="large" 
                  align="center"
                  className="text-white"
               />
            </div>
          </div>
          
          <motion.p 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             className="font-sans font-bold text-gray-400 max-w-xl mx-auto text-lg md:text-xl leading-tight tracking-tight relative z-10"
          >
            FORGING IMMERSIVE DIGITAL REALITIES.
            <br />
            REACT • WEBGL • INTERACTION
          </motion.p>

          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.6 }}
             className="pt-4 md:pt-8 relative z-10"
          >
             <Link to="/contact" className="interactive-target inline-block">
                <div className="group relative px-8 py-4 md:px-10 md:py-5 bg-neon text-black font-display font-black text-sm uppercase tracking-widest overflow-hidden hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-[2rem]">
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Start A Project</span>
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
        <div className="pl-6 md:pl-20 mb-12 md:mb-16 relative border-l-[4px] border-neon">
           <InteractiveTitle text="SELECTED WORKS" size="medium" align="left" />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 md:gap-y-32">
            {/* Project 1 - Matching Work Layout */}
            <div className="mt-0 md:mt-24">
                <Link to="/work" className="block group interactive-target cursor-none">
                  <TiltCard className="rounded-[2rem]" scale={1.02}>
                    <div className="aspect-video w-full bg-ash border border-white/10 relative overflow-hidden group-hover:border-neon transition-colors duration-500 rounded-[2rem]">
                       <img 
                         src="https://picsum.photos/seed/neon1/1920/1080" 
                         alt="Project 1" 
                         className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                       />
                       {/* Reveal Button */}
                       <div className="absolute bottom-4 right-4 z-20 overflow-hidden">
                         <motion.div 
                           initial={{ y: "120%" }}
                           whileHover={{ y: 0 }} // Triggers on parent hover due to motion propagation
                           transition={{ type: "spring", stiffness: 300, damping: 20 }}
                           className="translate-y-[120%] group-hover:translate-y-0"
                         >
                            <button className="bg-neon text-black w-14 h-14 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-xl">
                              <ArrowUpRight className="w-6 h-6" />
                            </button>
                         </motion.div>
                       </div>
                    </div>
                  </TiltCard>
                  <div className="flex flex-col items-start mt-2 pl-2 transition-colors duration-300">
                    <h4 className="font-display font-black text-3xl md:text-4xl text-white mb-0 leading-[0.85] group-hover:text-neon transition-colors">NEON GENESIS</h4>
                     <div className="flex items-center gap-3 mt-1">
                       <span className="w-2 h-2 bg-neon rounded-full"></span>
                       <span className="font-mono font-bold text-xs md:text-sm text-gray-500 group-hover:text-white transition-colors tracking-wider">WEB DESIGN / THREE.JS</span>
                     </div>
                  </div>
                </Link>
            </div>

            {/* Project 2 - Matching Work Layout */}
            <div>
                <Link to="/work" className="block group interactive-target cursor-none">
                  <TiltCard className="rounded-[2rem]" scale={1.02}>
                    <div className="aspect-video w-full bg-ash border border-white/10 relative overflow-hidden group-hover:border-neon transition-colors duration-500 rounded-[2rem]">
                       <img 
                         src="https://picsum.photos/seed/void2/1920/1080" 
                         alt="Project 2" 
                         className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                       />
                        {/* Reveal Button */}
                       <div className="absolute bottom-4 right-4 z-20 overflow-hidden">
                         <motion.div 
                           initial={{ y: "120%" }}
                           whileHover={{ y: 0 }} 
                           transition={{ type: "spring", stiffness: 300, damping: 20 }}
                           className="translate-y-[120%] group-hover:translate-y-0"
                         >
                            <button className="bg-neon text-black w-14 h-14 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-xl">
                              <ArrowUpRight className="w-6 h-6" />
                            </button>
                         </motion.div>
                       </div>
                    </div>
                  </TiltCard>
                  <div className="flex flex-col items-start mt-2 pl-2 transition-colors duration-300">
                    <h4 className="font-display font-black text-3xl md:text-4xl text-white mb-0 leading-[0.85] group-hover:text-neon transition-colors">VOID WALKER</h4>
                    <div className="flex items-center gap-3 mt-1">
                       <span className="w-2 h-2 bg-neon rounded-full"></span>
                       <span className="font-mono font-bold text-xs md:text-sm text-gray-500 group-hover:text-white transition-colors tracking-wider">BRANDING / MOTION</span>
                     </div>
                  </div>
                </Link>
            </div>
        </div>
        
        <div className="flex justify-center mt-24 md:mt-32">
           <Link to="/work" className="interactive-target">
            <button className="group relative px-12 py-5 md:px-16 md:py-6 bg-transparent text-white font-display font-black text-lg md:text-xl uppercase tracking-widest overflow-hidden border-2 border-white hover:border-neon transition-all rounded-[2rem]">
               <span className="relative z-10 group-hover:text-black transition-colors duration-300">View Archive</span>
               <div className="absolute inset-0 bg-neon transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left" />
            </button>
           </Link>
        </div>
      </section>
      
      {/* Bottom Marquee Loop (Left to Right) */}
      <section className="w-full overflow-hidden bg-neon py-4 relative z-20 border-y border-black">
         <motion.div 
            className="whitespace-nowrap flex"
            variants={bottomMarqueeVariants}
            animate="animate"
         >
            <span className="font-display font-black text-black text-2xl md:text-4xl tracking-tighter px-4">
               {marqueeContent}
            </span>
         </motion.div>
      </section>

      {/* Footer with Turbine Animation */}
      <section ref={footerRef} className="min-h-screen bg-void flex flex-col items-center justify-center relative overflow-hidden text-white z-20 border-t border-white/10">
         
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

         <motion.div style={{ scale: scaleText }} className="text-center px-6 z-10 relative max-w-6xl flex flex-col items-center gap-8">
            <InteractiveTitle 
              text="LET'S WORK TOGETHER" 
              size="large" 
              align="center" 
              className="text-white"
            />
            
            <Link to="/contact" className="interactive-target group relative mt-8 md:mt-16">
               <motion.div 
                 whileHover={{ scale: 1.1, rotate: 5 }}
                 whileTap={{ scale: 0.95 }}
                 className="w-48 h-48 md:w-64 md:h-64 bg-neon rounded-full flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(204,255,0,0.2)]"
               >
                 <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
                 <span className="font-display font-black text-2xl md:text-4xl text-black z-10">
                   START
                 </span>
                 <ArrowRight className="absolute bottom-12 text-black w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
               </motion.div>
            </Link>

            <a href="mailto:hello@seanzeng.design" className="interactive-target flex items-center gap-3 font-mono text-lg md:text-xl font-bold text-gray-400 hover:text-neon hover:scale-110 transition-all mt-8">
              <Mail className="w-5 h-5" />
              hello@seanzeng.design
            </a>
         </motion.div>

         <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 flex justify-between items-end font-mono text-xs font-bold border-t border-white/10 text-gray-500">
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
