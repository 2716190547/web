
import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { Magnetic } from '../components/Magnetic';
import { BackgroundShapes } from '../components/BackgroundShapes';

const skills = [
  "ART DIRECTION", "UI/UX DESIGN", "REACT / NEXT.JS", 
  "THREE.JS / WEBGL", "MOTION GRAPHICS", "BRAND IDENTITY"
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-void pt-32 pb-20 px-6 overflow-hidden relative">
      <BackgroundShapes />
      
      {/* Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-screen bg-surface/30 -skew-x-12 pointer-events-none z-0 opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Reconstructed Header - Avant Garde Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative pt-10 pb-24"
        >
           {/* Massive Watermark */}
           <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-10 opacity-[0.03] font-display font-black text-[20vw] leading-none text-white pointer-events-none select-none">
             PROFILE
           </div>

           <div className="flex flex-col justify-end gap-8 border-b border-white/10 pb-8 relative z-10">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end w-full gap-8">
                 <div>
                    <div className="font-mono text-neon text-xs mb-4 tracking-[0.2em] uppercase">/// Identity_Matrix</div>
                    <InteractiveTitle text="PROFILE & DATA" size="large" className="text-white" />
                 </div>
                 
                 <div className="hidden md:block font-mono text-right text-xs text-gray-400 space-y-1 border-l border-white/20 pl-4">
                     <div className="flex justify-between gap-8"><span>ID</span> <span className="text-white">SEAN_ZENG</span></div>
                     <div className="flex justify-between gap-8"><span>CLASS</span> <span className="text-white">DESIGNER</span></div>
                     <div className="flex justify-between gap-8"><span>STATUS</span> <span className="text-neon animate-pulse">ONLINE</span></div>
                 </div>
              </div>
           </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-8"
          >
            <p className="font-sans font-bold text-2xl md:text-4xl text-white leading-tight">
              I am a multidisciplinary designer and developer obsessed with the space where code meets chaos.
            </p>
            <p className="font-sans text-gray-400 text-lg leading-relaxed">
              My work is not just about visuals; it's about feeling. I craft digital experiences that are visceral, memorable, and slightly rebellious. With a background in both traditional graphic design and modern web engineering, I bridge the gap between static art and interactive performance.
            </p>
            <p className="font-sans text-gray-400 text-lg leading-relaxed">
              Currently based in the digital void, working with clients worldwide to push the boundaries of the browser.
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4, duration: 0.8 }}
          >
             <h3 className="font-display font-bold text-2xl text-neon mb-8 uppercase tracking-widest flex items-center gap-4">
                Core Capabilities
                <span className="h-[1px] flex-grow bg-neon/30"></span>
             </h3>
             <div className="flex flex-wrap gap-4 md:gap-6">
                {skills.map((skill, idx) => (
                  <Magnetic key={idx} strength={40}>
                    <motion.div 
                      whileHover={{ scale: 1.1, backgroundColor: '#ccff00', color: '#000000', borderColor: '#ccff00' }}
                      className="inline-block px-6 py-3 border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold font-mono text-sm md:text-base uppercase cursor-default transition-colors interactive-target rounded-full"
                    >
                      {skill}
                    </motion.div>
                  </Magnetic>
                ))}
             </div>

             <div className="mt-20 p-8 bg-surface/50 backdrop-blur-md border border-white/10 rounded-[2rem] hover:border-neon/30 transition-colors duration-500 group">
                <h4 className="font-display text-xl text-white mb-6 flex items-center gap-2">
                   <span className="w-3 h-3 bg-grape rounded-full group-hover:animate-ping"></span>
                   RECOGNITION
                </h4>
                <ul className="space-y-6 font-mono text-gray-400 text-sm">
                   <li className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-white font-bold">Awwwards</span> 
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Site of the Day x2</span>
                   </li>
                   <li className="flex justify-between items-center border-b border-white/5 pb-4">
                      <span className="text-white font-bold">CSS Design Awards</span> 
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Best UI</span>
                   </li>
                   <li className="flex justify-between items-center">
                      <span className="text-white font-bold">Behance</span> 
                      <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">Featured in Interaction</span>
                   </li>
                </ul>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
