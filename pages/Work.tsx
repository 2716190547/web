
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { TiltCard } from '../components/TiltCard';
import { BackgroundShapes } from '../components/BackgroundShapes';

const projects = [
  { id: 1, title: "CYBER STRUCTURE", category: "ARCHITECTURE", img: "https://picsum.photos/seed/arch/1920/1080" },
  { id: 2, title: "MONO INTERFACE", category: "UI/UX", img: "https://picsum.photos/seed/ui/1920/1080" },
  { id: 3, title: "LIQUID METAL", category: "3D RENDER", img: "https://picsum.photos/seed/3d/1920/1080" },
  { id: 4, title: "TYPO GRAPHIC", category: "EDITORIAL", img: "https://picsum.photos/seed/type/1920/1080" },
  { id: 5, title: "SPATIAL AUDIO", category: "SOUND DESIGN", img: "https://picsum.photos/seed/sound/1920/1080" },
  { id: 6, title: "DATA VISUAL", category: "DEVELOPMENT", img: "https://picsum.photos/seed/dev/1920/1080" },
];

const Work: React.FC = () => {
  return (
    <div className="min-h-screen bg-void relative z-10 pt-32 pb-20 px-6 overflow-hidden">
      <BackgroundShapes />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="relative pt-10 pb-24">
           <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-10 opacity-[0.02] font-display font-black text-[20vw] leading-none text-white pointer-events-none select-none">
             WORK
           </div>

           <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/10 pb-8 relative z-10">
             <div>
                 <div className="flex items-center gap-4 mb-4 text-neon font-mono text-sm tracking-widest uppercase">
                     <span className="animate-pulse">●</span>
                     <span>Project_Index</span>
                     <span className="w-12 h-[1px] bg-neon/50"></span>
                     <span>Vol. 01</span>
                 </div>
                 <InteractiveTitle text="WORK ARCHIVE" size="large" className="text-white" />
             </div>
             <div className="flex flex-col items-end gap-2">
                <p className="font-sans text-gray-500 max-w-md text-right pb-2 leading-relaxed">
                    A curated collection of digital artifacts, web experiences, and visual experiments created in the void.
                </p>
                <div className="font-mono text-xs text-white uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full">
                   Total Entries: {projects.length}
                </div>
             </div>
           </div>
        </div>

        {/* Project Grid - INCREASED GAP between items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-48">
          {projects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              className="group cursor-none interactive-target flex flex-col"
            >
              <TiltCard className="rounded-[2rem]" scale={1.02}>
                {/* Card Image Container - 16:9 Aspect Ratio */}
                <div className="relative w-full aspect-video bg-surface rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-neon/50 transition-colors duration-500">
                  
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    loading="lazy"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />

                  {/* Button positioned at bottom right */}
                  <div className="absolute bottom-4 right-4 z-20 overflow-hidden">
                     <motion.div 
                       initial={{ y: "120%" }}
                       whileHover={{ y: 0 }} // This triggers when hovering the card due to group
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
              
              {/* Project Info - REDUCED SPACING (mt-2) */}
              <div className="flex flex-col items-start mt-2 pl-2 transition-colors duration-300">
                 <h3 className="font-display font-black text-3xl md:text-4xl text-white group-hover:text-neon transition-colors tracking-tight">{item.title}</h3>
                 <div className="flex items-center gap-3 mt-1">
                   <span className="w-2 h-2 bg-neon rounded-full"></span>
                   <span className="font-mono font-bold text-xs md:text-sm text-gray-500 group-hover:text-white transition-colors tracking-wider">{item.category}</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
