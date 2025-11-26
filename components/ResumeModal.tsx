
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { ResumeContent } from './ResumeContent';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Print Styles Injection */}
          <style>
            {`
              @media print {
                @page { margin: 0; size: auto; }
                body * { visibility: hidden; }
                #resume-preview-container, #resume-preview-container * { visibility: visible; }
                #resume-preview-container {
                  position: absolute;
                  left: 0;
                  top: 0;
                  width: 100%;
                  height: auto;
                  margin: 0;
                  padding: 0;
                  background: white !important;
                  color: black !important;
                  z-index: 9999;
                  overflow: visible !important;
                  transform: scale(0.8); /* Fit to page attempt */
                  transform-origin: top left;
                }
                .no-print { display: none !important; }
              }
            `}
          </style>

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8 overflow-y-auto no-print"
          >
            {/* Controls */}
            <div className="fixed top-6 right-6 flex gap-4 z-[110]">
              <button 
                onClick={(e) => { e.stopPropagation(); handlePrint(); }}
                className="bg-white text-black px-4 py-2 rounded-full font-bold font-mono text-sm flex items-center gap-2 hover:bg-neon transition-colors"
              >
                <Printer className="w-4 h-4" />
                {t.resume.print}
              </button>
              <button 
                onClick={onClose}
                className="bg-white/10 text-white p-2 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </motion.div>

          {/* Resume Paper Container */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 pointer-events-none flex items-center justify-center z-[105] overflow-y-auto py-20 md:py-10"
          >
             <div id="resume-preview-container" className="origin-top scale-[0.8] md:scale-100">
                <ResumeContent />
             </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
