
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUp, Crosshair, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { BackgroundShapes } from '../components/BackgroundShapes';
import { Logo } from '../components/Logo';
import { useLanguage } from '../contexts/LanguageContext';

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

const projects = [
  {
    id: 1,
    title: "AIRBRUSH",
    category_en: "UI - OVERSEAS/TOOL",
    category_zh: "UI - 海外/工具",
    year: "2024",
    img: "/image/cover/AirBrush.png",
    path: "/work/airbrush"
  },
  {
    id: 2,
    title: "CAT PI",
    category_en: "AI COMPANY SITE",
    category_zh: "AI 公司官网",
    year: "2024",
    img: "/image/cover/Cat Pi 官网.png",
    path: "/work/catpi"
  },
  {
    id: 3,
    title: "3D SHOWCASE",
    category_en: "3D WORKS",
    category_zh: "3D 作品展示",
    year: "2024",
    img: "/image/cover/3D展示.png",
    path: "/work/3d-showcase"
  },
  {
    id: 4,
    title: "RESPONSIVE",
    category_en: "WEB DESIGN",
    category_zh: "响应式设计",
    year: "2024",
    img: "/image/cover/响应式网站设计.png",
    path: "/work/responsive-web"
  },
];

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // State for Accordion Hover Effect
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Handle resize logic
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

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

  // Always English for marquee text as requested
  const marqueeText = "DESIGN CODE MOTION ART SEAN ZENG  ";
  const marqueeContent = Array(20).fill(marqueeText).join(" • ");

  return (
    <div ref={containerRef} className="relative min-h-[250vh] bg-transparent overflow-hidden">

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

      {/* Solid Marquee Text Background (Rotated) - Always English */}
      <div className="fixed top-1/2 -translate-y-1/2 left-0 w-full pointer-events-none z-0 rotate-[-5deg] scale-110 opacity-[0.02]">
        <motion.div variants={marqueeVariants} animate="animate" className="whitespace-nowrap">
          <span className="font-display font-black text-[20vw] leading-none text-white select-none">
            DESIGN CODE MOTION ART
          </span>
          <span className="font-display font-black text-[20vw] leading-none text-white select-none">
            DESIGN CODE MOTION ART
          </span>
        </motion.div>
      </div>

      {/* Hero Section */}
      <section className="min-h-[100dvh] flex flex-col items-center justify-center relative overflow-hidden z-10 pt-20 md:pt-0">

        <motion.div
          style={{ y: yHero, opacity: opacityHero }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h1 className="font-display font-black text-[25vw] leading-none text-white/[0.02] select-none tracking-tighter">
            ZENG
          </h1>
        </motion.div>

        <div className="z-10 text-center space-y-8 px-4 relative text-white mix-blend-normal w-full flex flex-col items-center">

          {/* Stacked Title Container - Optimized for multi-line layout */}
          <div className="relative flex flex-col items-center justify-center w-full py-12 md:py-24 min-h-[40vh] perspective-[1000px]">

            {/* Floating Logo Variants */}
            <div className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              {/* Top Left */}
              <FloatingLogo x="15%" y="10%" delay={0} scale={0.6} rotateDuration={15} />
              {/* Bottom Right */}
              <FloatingLogo x="85%" y="65%" delay={2} scale={1.0} rotateDuration={25} />
              {/* Top Right */}
              <FloatingLogo x="80%" y="20%" delay={1} scale={0.5} rotateDuration={10} />
              {/* Bottom Left */}
              <FloatingLogo x="10%" y="75%" delay={3} scale={0.7} rotateDuration={18} />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center">
              {/* First Line */}
              <div className="relative z-30">
                <InteractiveTitle
                  text={t.home.title_line1}
                  size="large"
                  align="center"
                  className="text-white"
                />
              </div>

              {/* Second Line - Stacked with responsive negative margin */}
              <div className="relative z-20 -mt-3 sm:-mt-4 md:-mt-6 lg:-mt-10">
                <InteractiveTitle
                  text={t.home.title_line2}
                  size="large"
                  align="center"
                  baseColor="#ccff00"
                  className="text-neon"
                />
              </div>
            </div>
          </div>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-sans font-bold text-gray-400 max-w-[85%] md:max-w-xl mx-auto text-base md:text-xl leading-tight tracking-tight relative z-10 mt-4 md:mt-8"
          >
            {t.home.subtitle_1}
            <br className="hidden md:block" />
            <span className="mt-2 block md:inline">{t.home.subtitle_2}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-6 md:pt-8 relative z-10"
          >
            <Link to="/contact" className="interactive-target inline-block">
              <div className="group relative px-8 py-4 md:px-10 md:py-5 border-2 border-white bg-transparent text-white font-display font-black text-xs md:text-sm uppercase tracking-widest overflow-hidden transition-all rounded-[2rem]">
                {/* Fill Effect: Slide Left to Right */}
                <div className="absolute inset-0 bg-neon -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">{t.home.cta}</span>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight className="w-8 h-8 text-neon rotate-90" />
        </motion.div>
      </section>

      {/* Featured Work - NEW DESIGN (INTERACTIVE ACCORDION for Desktop, Stack for Mobile) */}
      <section className="relative py-20 md:py-32 z-10 border-t border-white/10 bg-void/80 backdrop-blur-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 px-4">
            <div className="border-l-4 border-neon pl-6 py-2">
              <InteractiveTitle text={t.home.selected_works} size="medium" align="left" />
            </div>
            <div className="hidden md:block text-right">
              <p className="font-mono text-gray-500 text-sm tracking-widest uppercase">
                {t.home.interact_hint}
              </p>
            </div>
          </div>

          {/* Accordion Layout (Desktop) vs Stack (Mobile) */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-4 w-full h-auto md:h-[650px]">
            {projects.map((project) => (
              <motion.div
                layout
                key={project.id}
                onHoverStart={() => isDesktop && setHoveredProject(project.id)}
                onHoverEnd={() => isDesktop && setHoveredProject(null)}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 group cursor-none interactive-target w-full min-h-[360px] md:min-h-0 md:w-auto"
                animate={{
                  flex: isDesktop ? (hoveredProject === project.id ? 3 : 1) : 1,
                }}
                transition={{ type: "spring", stiffness: 180, damping: 25, mass: 1 }}
              >
                <Link to={project.path} className="block w-full h-full relative">
                  <motion.div
                    className="h-full w-full relative flex flex-col"
                    animate={{
                      opacity: (isDesktop && hoveredProject !== null && hoveredProject !== project.id) ? 0.5 : 1
                    }}
                  >
                    {/* Image Background - Absolute positioned to avoid squashing */}
                    <div className="absolute inset-0 w-full h-full md:min-w-[500px]">
                      <motion.div
                        className="w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                      >
                        <img
                          src={project.img}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale md:grayscale group-hover:grayscale-0 transition-all duration-700"
                        />
                      </motion.div>
                      {/* Dark Overlay */}
                      <div className="absolute inset-0 bg-black/40 md:bg-black/60 group-hover:bg-black/20 transition-colors duration-500" />
                      {/* Gradient Bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 md:opacity-80" />
                    </div>

                    {/* Vertical Title (Visible ONLY when collapsed on Desktop) */}
                    <div
                      className={`hidden md:flex absolute inset-0 items-center justify-center pointer-events-none transition-opacity duration-300 ${hoveredProject === project.id ? 'opacity-0' : 'opacity-100'}`}
                    >
                      <h3 className="font-display font-black text-2xl lg:text-3xl xl:text-4xl text-white rotate-90 whitespace-nowrap tracking-wider uppercase mix-blend-overlay">
                        {project.title}
                      </h3>
                    </div>

                    {/* Content - Always visible on Mobile, Hover-only on Desktop */}
                    <div className={`
                             relative z-10 mt-auto p-8 md:p-12 w-full flex flex-col justify-end transition-all duration-500 transform 
                             ${/* Mobile: Always show. Desktop: Only show if hovered */ ''}
                             md:opacity-0 md:translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0
                           `}>
                      <div className="overflow-hidden">
                        <span className="text-neon font-mono text-xs md:text-sm tracking-[0.2em] uppercase block mb-2 md:mb-2">
                          {language === 'zh' ? project.category_zh : project.category_en} — {project.year}
                        </span>
                      </div>

                      <h3 className="font-display font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-none mb-4 md:mb-8 tracking-tighter">
                        {project.title}
                      </h3>

                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <ArrowUpRight className="w-5 h-5 md:w-8 md:h-8" />
                        </div>
                        <span className="font-bold text-white text-xs md:text-base tracking-widest uppercase border-b border-transparent group-hover:border-neon transition-all">
                          {t.home.view_case}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-20 md:mt-24">
          <Link to="/work" className="interactive-target">
            <div className="group relative px-8 py-4 md:px-12 md:py-5 border-2 border-white bg-transparent text-white font-display font-black text-sm md:text-base uppercase tracking-widest overflow-hidden transition-all rounded-[2rem]">
              <div className="absolute inset-0 bg-neon -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              <span className="relative z-10 group-hover:text-black transition-colors duration-300">{t.home.view_archive}</span>
            </div>
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
          <span className="font-display font-black text-black text-2xl md:text-4xl tracking-tighter px-4 italic">
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
            text={t.home.footer_title}
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
                {t.home.footer_start}
              </span>
              <ArrowRight className="absolute bottom-12 text-black w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
            </motion.div>
          </Link>

          <a href="mailto:2716190547@qq.com" className="interactive-target flex items-center gap-3 font-mono text-lg md:text-xl font-bold text-gray-400 hover:text-neon hover:scale-110 transition-all mt-8">
            <Mail className="w-5 h-5" />
            2716190547@qq.com
          </a>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 flex justify-between items-end font-mono text-xs font-bold border-t border-white/10 text-gray-500">
          <div className="flex flex-col">
            <span>{t.home.copyright}</span>
            <span>{t.home.rights}</span>
          </div>

          <div className="hidden md:flex gap-8 uppercase">
            <span className="hover:text-neon cursor-none">Instagram</span>
            <span className="hover:text-neon cursor-none">Twitter</span>
            <span className="hover:text-neon cursor-none">LinkedIn</span>
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
