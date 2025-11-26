
import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { Magnetic } from '../components/Magnetic';
import { BackgroundShapes } from '../components/BackgroundShapes';
import { useLanguage } from '../contexts/LanguageContext';

const skills = [
  "ART DIRECTION", "UI/UX DESIGN", "REACT / NEXT.JS", 
  "THREE.JS / WEBGL", "MOTION GRAPHICS", "BRAND IDENTITY"
];

const About: React.FC = () => {
  const { t } = useLanguage();

  // Updated to match the Resume PDF content
  const experience = [
    {
      company: "MEITU",
      role: t.about.jobs.meitu.role,
      period: "2023.12 - 2024.04",
      desc: t.about.jobs.meitu.desc
    },
    {
      company: "GENGHER TECH",
      role: t.about.jobs.gengher.role,
      period: "2023.04 - 2023.09",
      desc: t.about.jobs.gengher.desc
    }
  ];

  return (
    <div className="min-h-screen bg-transparent pt-32 pb-20 px-6 overflow-hidden relative">
      <BackgroundShapes />
      
      {/* Background Element - Clean Vertical Column */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/[0.02] border-l border-white/5 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative pt-10 pb-16 border-b border-white/10 mb-12 md:mb-20"
        >
           {/* Massive Watermark */}
           <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-10 opacity-[0.03] font-display font-black text-[20vw] leading-none text-white pointer-events-none select-none">
             {t.about.bg_title}
           </div>

           <div className="flex flex-col md:flex-row md:justify-between md:items-end w-full gap-8 relative z-10">
              <div>
                 <div className="font-mono text-neon text-xs mb-4 tracking-[0.2em] uppercase">{t.about.identity_matrix}</div>
                 <InteractiveTitle text={t.about.title} size="large" className="text-white" />
              </div>
              
              <div className="hidden md:block font-mono text-right text-xs text-gray-400 space-y-1 border-l border-white/20 pl-4">
                  <div className="flex justify-between gap-8"><span>{t.about.id_label}</span> <span className="text-white">SEAN_ZENG</span></div>
                  <div className="flex justify-between gap-8"><span>{t.about.class_label}</span> <span className="text-white">{t.about.class_value}</span></div>
                  <div className="flex justify-between gap-8"><span>{t.about.status_label}</span> <span className="text-neon animate-pulse">{t.about.status_value}</span></div>
              </div>
           </div>
        </motion.div>

        {/* Grid Layout - 12 Columns for Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 gap-x-0 md:gap-x-16">
          
          {/* Left Column: Biography & Experience (Spans 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:col-span-7 flex flex-col gap-8 md:gap-12"
          >
            <div className="flex flex-col gap-8">
              <h2 className="font-display font-black text-3xl md:text-5xl text-white leading-tight">
                {t.about.bio_p1_start} <span className="text-neon">{t.about.bio_p1_highlight}</span> {t.about.bio_p1_end}
              </h2>
              <div className="font-sans text-gray-400 text-lg md:text-xl leading-relaxed space-y-6 text-justify">
                <p>{t.about.bio_desc_1}</p>
                <p>{t.about.bio_desc_2}</p>
                {t.about.bio_desc_3 && <p>{t.about.bio_desc_3}</p>}
                {t.about.bio_desc_4 && <p>{t.about.bio_desc_4}</p>}
              </div>
              
              {/* Signature / Decorative Line */}
              <div className="pt-4">
                  <div className="h-1 w-24 bg-neon" />
              </div>
            </div>

            {/* Experience Section */}
            <div className="mt-8 md:mt-12">
              <h3 className="font-mono text-xs font-bold text-neon mb-8 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 bg-neon rounded-full"></span>
                {t.about.professional_log}
              </h3>
              <div className="space-y-12">
                {experience.map((job, idx) => (
                  <div key={idx} className="group relative pl-8 border-l border-white/10 hover:border-neon transition-colors duration-300">
                     <div className="absolute left-[-5px] top-0 w-2 h-2 bg-black border border-white/20 rounded-full group-hover:bg-neon group-hover:border-neon transition-colors" />
                     <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                        <h4 className="font-display font-bold text-2xl text-white">{job.company}</h4>
                        <span className="font-mono text-xs text-gray-500">{job.period}</span>
                     </div>
                     <div className="text-neon font-mono text-xs uppercase tracking-wider mb-4">{job.role}</div>
                     <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-xl">{job.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative Visual Section (Formerly Clients) */}
            <div className="mt-12 border-t border-white/10 pt-12">
               <h3 className="font-mono text-xs font-bold text-neon mb-8 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-neon rounded-full"></span>
                  {t.about.select_clients}
               </h3>
               
               {/* Decorative Signal Visualizer */}
               <div className="relative w-full h-32 bg-surface/30 border border-white/5 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 flex items-end justify-between px-4 pb-4 opacity-30">
                    {Array.from({ length: 40 }).map((_, i) => (
                       <motion.div 
                          key={i}
                          className="w-1 md:w-2 bg-neon"
                          animate={{ height: [10, 40 + Math.random() * 60, 10] }}
                          transition={{ 
                             duration: 1.5, 
                             repeat: Infinity, 
                             ease: "easeInOut",
                             delay: Math.random() * 1
                          }}
                       />
                    ))}
                  </div>
                  <div className="z-10 font-mono text-xs md:text-sm text-neon tracking-[0.5em] uppercase mix-blend-difference">
                     AESTHETICS_DATA_STREAM
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Right Column: Stats & Specs (Spans 4 cols, offset 1) */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.4, duration: 0.8 }}
             className="md:col-span-4 md:col-start-9 flex flex-col gap-16"
          >
             {/* Skills Section - Redesigned as Technical List */}
             <div>
                 <h3 className="font-mono text-xs font-bold text-neon mb-6 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-neon rounded-full"></span>
                    {t.about.system_capabilities}
                 </h3>
                 <div className="space-y-4">
                    {skills.map((skill, idx) => (
                        <div key={idx} className="group flex items-center justify-between border-b border-white/10 pb-3 hover:border-neon/50 transition-colors interactive-target cursor-default">
                            <span className="font-sans font-bold text-white text-sm md:text-base group-hover:translate-x-2 transition-transform duration-300">{skill}</span>
                            <span className="text-[10px] font-mono text-gray-600 group-hover:text-neon">v{2 + idx}.0</span>
                        </div>
                    ))}
                 </div>
             </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
