
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { BackgroundShapes } from '../components/BackgroundShapes';
import { useLanguage } from '../contexts/LanguageContext';

const AirBrushCaseStudy: React.FC = () => {
   const { language } = useLanguage();

   const isZh = language === 'zh';

   const content = {
      hero: {
         year: "2024",
         title: "AIRBRUSH",
         subtitle: isZh ? "UI · 海外项目 / 工具类改版" : "UI · OVERSEAS PROJECT / TOOL REDESIGN",
         desc: isZh
            ? "AirBrush 是一个图片自拍与美容编辑的高质量工具 app，此次更新基于业务指标提升进行改版。"
            : "AirBrush is a high-quality photo editor & selfie tool. This update focuses on business metric improvement and redesign.",
         brand: "Meitu"
      }
   };

   return (
      <div className="min-h-screen bg-transparent relative z-10 pt-24 pb-20 px-4 md:px-8 overflow-x-hidden">
         <BackgroundShapes />

         {/* Back Button */}
         <div className="max-w-7xl mx-auto mb-12 relative z-20">
            <Link to="/work" className="inline-flex items-center gap-2 text-gray-500 hover:text-neon transition-colors font-mono text-sm uppercase tracking-widest interactive-target">
               <ArrowLeft className="w-4 h-4" />
               {isZh ? "返回作品集" : "Back to Archive"}
            </Link>
         </div>

         <div className="max-w-7xl mx-auto relative z-10">

            {/* HERO HEADER */}
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="relative border-b border-white/10 pb-12 mb-20"
            >
               <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4 text-neon font-mono text-sm tracking-widest uppercase">
                     <span className="bg-neon/10 px-3 py-1 rounded-full">{content.hero.brand}</span>
                     <span>{content.hero.year}</span>
                     <span className="w-12 h-[1px] bg-neon/50"></span>
                     <span>REDESIGN</span>
                  </div>

                  <InteractiveTitle text={content.hero.title} size="large" className="text-white text-[12vw] leading-none" />

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-4">
                     <h2 className="text-2xl md:text-4xl font-display font-bold text-white max-w-2xl leading-tight">
                        {content.hero.subtitle}
                     </h2>
                     <p className="font-sans text-gray-400 max-w-lg text-sm md:text-base leading-relaxed text-justify">
                        {content.hero.desc}
                     </p>
                  </div>
               </div>
            </motion.div>

            {/* IMAGE GALLERY */}
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="w-full mb-20"
            >
               <div className="flex flex-col gap-6">
                  {Array.from({ length: 24 }, (_, i) => i + 4).map((num, index) => (
                     <motion.div
                        key={num}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 * index }}
                        className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-neon/30 transition-all duration-300"
                     >
                        <img
                           src={`./image/airbrush/${String(num).padStart(2, '0')}.png`}
                           alt={`AirBrush Case Study - ${num}`}
                           className="w-full h-auto object-contain"
                           loading={index < 3 ? 'eager' : 'lazy'}
                        />
                     </motion.div>
                  ))}
               </div>
            </motion.div>

         </div>
      </div>
   );
};

export default AirBrushCaseStudy;
