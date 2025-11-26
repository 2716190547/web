
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { TiltCard } from '../components/TiltCard';
import { BackgroundShapes } from '../components/BackgroundShapes';
import { useLanguage } from '../contexts/LanguageContext';

const projects = [
  {
    id: 1,
    title: "AirBrush",
    category_en: "UI - OVERSEAS/TOOL REDESIGN",
    category_zh: "UI-海外项目/工具类改版",
    img: "./image/cover/AirBrush.png",
    path: "/work/airbrush"
  },
  {
    id: 2,
    title: "Cat Pi",
    category_en: "AI COMPANY WEBSITE",
    category_zh: "AI 公司官网",
    img: "./image/cover/Cat Pi 官网.png",
    path: "/work/catpi"
  },
  {
    id: 3,
    title: "3D展示",
    category_en: "3D WORKS SHOWCASE",
    category_zh: "部分3d 作品展示",
    img: "./image/cover/3D展示.png",
    path: "/work/3d-showcase"
  },
  {
    id: 4,
    title: "响应式网站设计",
    category_en: "RESPONSIVE WEB DESIGN",
    category_zh: "多端适配设计",
    img: "./image/cover/响应式网站设计.png",
    path: "/work/responsive-web"
  },
  {
    id: 5,
    title: "运营活动设计",
    category_en: "CAMPAIGN DESIGN",
    category_zh: "咚咚历程挑战",
    img: "./image/cover/运营活动设计.png",
    path: "/work/campaign"
  },
  {
    id: 6,
    title: "鱿鲜烧",
    category_en: "BRAND VISUAL DESIGN",
    category_zh: "品牌视觉设计",
    img: "./image/cover/品牌视觉设计.png",
    path: "/work/brand-visual"
  },
];

const Work: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-transparent relative z-10 pt-32 pb-20 px-6 overflow-hidden">
      <BackgroundShapes />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="relative pt-10 pb-6">
          <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-10 opacity-[0.02] font-display font-black text-[20vw] leading-none text-white pointer-events-none select-none">
            {t.work.bg_title}
          </div>

          <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/10 pb-6 relative z-10">
            <div>
              <div className="flex items-center gap-4 mb-4 text-neon font-mono text-sm tracking-widest uppercase">
                <span className="animate-pulse">●</span>
                <span>{t.work.index_label}</span>
                <span className="w-12 h-[1px] bg-neon/50"></span>
                <span>Vol. 01</span>
              </div>
              <InteractiveTitle text={t.work.title} size="large" className="text-white" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <p className="font-sans text-gray-500 max-w-md text-right pb-2 leading-relaxed">
                {t.work.desc}
              </p>
              <div className="font-mono text-xs text-white uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full">
                {t.work.total_entries}: {projects.length}
              </div>
            </div>
          </div>
        </div>

        {/* Project Grid - OPTIMIZED GAP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              className="group cursor-none interactive-target flex flex-col relative z-0 hover:z-50"
            >
              <Link to={item.path} className="block h-full">
                <TiltCard className="rounded-[2rem] h-full" scale={1.02}>
                  {/* Unified Card Container: Image + Content */}
                  <div className="flex flex-col h-full bg-surface/30 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-white/10 group-hover:border-neon/50 transition-colors duration-500">

                    {/* Image Section - Top */}
                    <div className="relative w-full aspect-video overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />

                      {/* Button positioned at bottom right of image area */}
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

                    {/* Content Section - Bottom */}
                    <div className="flex flex-col items-start p-6 md:p-8 bg-gradient-to-b from-black/20 to-black/40 flex-grow">
                      <h3 className="font-display font-black text-3xl md:text-4xl text-white group-hover:text-neon transition-colors tracking-tight leading-none mb-3">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 bg-neon rounded-full"></span>
                        <span className="font-mono font-bold text-xs md:text-sm text-gray-500 group-hover:text-white transition-colors tracking-wider">
                          {language === 'zh' ? item.category_zh : item.category_en}
                        </span>
                      </div>
                    </div>

                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
