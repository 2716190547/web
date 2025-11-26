
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { Menu, X, Globe, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useSound } from '../contexts/SoundContext';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { isMuted, toggleMute } = useSound();
  
  const links = [
    { path: '/', label: t.nav.home },
    { path: '/work', label: t.nav.work },
    { path: '/about', label: t.nav.about },
    { path: '/contact', label: t.nav.contact },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 px-4 md:px-6 py-4 md:py-6 flex justify-between items-center bg-void/80 backdrop-blur-md border-b border-white/5 text-white transition-all duration-300">
        <Link to="/" className="group interactive-target" onClick={() => setIsOpen(false)}>
          <div className="flex items-center gap-3">
             <Logo className="w-8 h-8 md:w-10 md:h-10 group-hover:rotate-90 transition-transform duration-500 text-neon" />
             <span className="font-display font-black text-lg md:text-xl tracking-tighter block">SEAN ZENG</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className="relative font-sans font-black text-sm uppercase tracking-widest hover:text-neon transition-colors interactive-target"
            >
              {link.label}
              {location.pathname === link.path && (
                <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-neon" />
              )}
            </Link>
          ))}
          
          <div className="w-[1px] h-6 bg-white/20 mx-2" />

          {/* Sound Toggle */}
          <button
            onClick={toggleMute}
            className="font-mono text-xs font-bold uppercase tracking-wider hover:text-neon transition-colors interactive-target flex items-center gap-2"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="font-mono text-xs font-bold uppercase tracking-wider hover:text-neon transition-colors interactive-target flex items-center gap-2"
          >
            <Globe className="w-4 h-4" />
            <span>{language === 'en' ? 'CN' : 'EN'}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile Sound Toggle */}
          <button
            onClick={toggleMute}
            className="font-mono text-xs font-bold uppercase tracking-wider hover:text-neon transition-colors interactive-target"
          >
             {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>

           <button 
            onClick={toggleLanguage}
            className="font-mono text-xs font-bold uppercase tracking-wider hover:text-neon transition-colors interactive-target"
          >
            {language === 'en' ? 'CN' : 'EN'}
          </button>
          
          <button 
            onClick={toggleMenu}
            className="interactive-target p-2 text-white hover:text-neon transition-colors z-50"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-void flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col gap-8 items-center">
              {links.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link 
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="font-display font-black text-4xl text-white hover:text-neon transition-colors uppercase interactive-target block py-2"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Decorative line */}
            <motion.div 
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ delay: 0.4, duration: 0.8 }}
               className="w-24 h-1 bg-neon mt-12" 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
