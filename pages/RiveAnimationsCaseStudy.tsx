
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { BackgroundShapes } from '../components/BackgroundShapes';
import { useLanguage } from '../contexts/LanguageContext';

// Animation Card with Image Cover
interface AnimationCardProps {
    id: string;
    title_en: string;
    title_zh: string;
    description: string;
    coverImage: string;
}

const AnimationCard: React.FC<AnimationCardProps> = ({ id, title_en, title_zh, description, coverImage }) => {
    const { language } = useLanguage();
    const isZh = language === 'zh';

    return (
        <Link to={`/work/rive-animations/${id}`}>
            <div className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-neon/30 transition-all duration-300 cursor-pointer h-full">
                <div className="relative aspect-square overflow-hidden">
                    {/* Cover Image */}
                    <img
                        src={coverImage}
                        alt={isZh ? title_zh : title_en}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* View Button */}
                    <div className="absolute bottom-4 right-4">
                        <div className="w-12 h-12 rounded-full bg-neon group-hover:bg-white transition-colors flex items-center justify-center">
                            <ArrowUpRight className="w-6 h-6 text-black" />
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-neon transition-colors">{isZh ? title_zh : title_en}</h3>
                    <p className="font-sans text-sm text-gray-400 leading-relaxed">{description}</p>
                </div>
            </div>
        </Link>
    );
};

const RiveAnimationsCaseStudy: React.FC = () => {
    const { language } = useLanguage();

    const isZh = language === 'zh';

    const content = {
        hero: {
            year: "2024",
            title: "RIVE ANIMATIONS",
            subtitle: isZh ? "动效设计" : "ANIMATION DESIGN",
            desc: isZh
                ? "使用 Rive 创建的高性能交互动效作品集，展示从 UI 微动效到复杂交互动画的设计能力，为用户体验增添生动细节。"
                : "Collection of high-performance interactive animations created with Rive, showcasing design capabilities from UI micro-interactions to complex interactive animations, adding vivid details to user experience.",
            brand: "Rive Design"
        }
    };

    const animations = [
        {
            id: 'western-wasteland',
            src: '/web/assets/西部废土.riv',
            title_en: 'Western Wasteland',
            title_zh: '西部废土',
            description: isZh
                ? '荒凉的西部废土场景。'
                : 'Desolate western wasteland scene.',
            coverImage: './image/动效/西部废土.png'
        },
        {
            id: 'stars',
            src: '/web/assets/星星.riv',
            title_en: 'Stars',
            title_zh: '星星',
            description: isZh
                ? '点击星星，或许会有不一样的变化！'
                : 'Click the stars for surprises!',
            coverImage: './image/动效/星星.png'
        },
        {
            id: 'firework',
            src: '/web/assets/花火.riv',
            title_en: 'Firework',
            title_zh: '花火',
            description: isZh
                ? '绢丽的烟花动画。'
                : 'Gorgeous firework animation.',
            coverImage: './image/动效/花火.png'
        },
        {
            id: 'text-swing',
            src: '/web/assets/文字摆动.riv',
            title_en: 'Text Swing',
            title_zh: '文字摆动',
            description: isZh
                ? '文字动态摆动效果。'
                : 'Dynamic text swinging effect.',
            coverImage: './image/动效/文字摆动.png'
        },
        {
            id: 'monster',
            src: '/web/assets/小怪物.riv',
            title_en: 'Little Monster',
            title_zh: '小怪物',
            description: isZh
                ? '可爱的小怪物角色。'
                : 'Cute monster character.',
            coverImage: './image/动效/小怪物.png'
        }
    ];

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
                            <span>INTERACTIVE</span>
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

                {/* ANIMATIONS GALLERY */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-full mb-20"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
                        {animations.map((animation, index) => (
                            <motion.div
                                key={animation.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 * index }}
                            >
                                <AnimationCard
                                    id={animation.id}
                                    title_en={animation.title_en}
                                    title_zh={animation.title_zh}
                                    description={animation.description}
                                    coverImage={animation.coverImage}
                                />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default RiveAnimationsCaseStudy;
