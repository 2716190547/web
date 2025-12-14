
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { BackgroundShapes } from '../components/BackgroundShapes';
import { useLanguage } from '../contexts/LanguageContext';

const EdiantecCaseStudy: React.FC = () => {
    const { language } = useLanguage();

    const isZh = language === 'zh';

    const content = {
        hero: {
            year: "2025",
            title: "EDIANTEC",
            subtitle: isZh ? "B 端网页设计" : "B2B WEB DESIGN",
            desc: isZh
                ? "依电科技是一家专注于智能电力解决方案的公司，此项目为其设计了后台管理系统及大屏可视化界面，提升数据展示与操作效率。"
                : "Ediantec is a company focused on intelligent power solutions. This project designed backend management system and large-screen visualization interface to improve data display and operational efficiency.",
            brand: "Ediantec"
        }
    };

    return (
        <div className="min-h-screen bg-transparent relative z-10 pt-24 pb-20 px-4 md:px-8 overflow-x-hidden">
            <BackgroundShapes />

            {/* Back Button - 统一样式 */}
            <div className="max-w-7xl mx-auto mb-12 relative z-20">
                <Link to="/work" className="interactive-target inline-block">
                    <div className="group relative px-6 py-3 border-2 border-white/20 bg-transparent text-white font-display font-black text-xs uppercase tracking-widest overflow-hidden transition-all rounded-[2rem] hover:border-neon inline-flex items-center gap-3">
                        {/* Fill Effect */}
                        <div className="absolute inset-0 bg-neon -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                        <ArrowLeft className="w-4 h-4 relative z-10 group-hover:text-black transition-colors duration-300" />
                        <span className="relative z-10 group-hover:text-black transition-colors duration-300">{isZh ? "返回作品集" : "Back to Archive"}</span>
                    </div>
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
                            <span>B2B DESIGN</span>
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
                        {['04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'].map((num, index) => (
                            <motion.div
                                key={num}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                                className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-neon/30 transition-all duration-300"
                            >
                                <img
                                    src={`./image/Ediantec/${num}.png`}
                                    alt={`Ediantec Case Study - ${num}`}
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

export default EdiantecCaseStudy;
