
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, AlertCircle, Copy, Check, Mail, Phone, Download, FileText, Loader2, Eye } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { BackgroundShapes } from '../components/BackgroundShapes';
import { useLanguage } from '../contexts/LanguageContext';
import { ResumeModal } from '../components/ResumeModal';
import { ResumeContent } from '../components/ResumeContent';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// Custom WeChat Icon Component with specific path shape
const WeChatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 1024 1024" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
     <path d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z" />
  </svg>
);

interface Message {
  role: 'user' | 'ai' | 'error';
  text: string;
}

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  
  // States for Resume interactions
  const [showResume, setShowResume] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize chat
  useEffect(() => {
    setMessages([{ role: 'ai', text: t.contact.ai.welcome }]);
  }, [language, t.contact.ai.welcome]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // EFFECT: Handle PDF generation when triggered
  useEffect(() => {
    if (isGeneratingPDF) {
       // Give React a moment to render the hidden component
       const timer = setTimeout(async () => {
          try {
            const element = document.getElementById('resume-to-print');
            if (!element) throw new Error("Resume element not found");
            
            // Generate Canvas
            const canvas = await html2canvas(element, {
               scale: 2, // Higher resolution
               useCORS: true,
               backgroundColor: '#ffffff',
               logging: false
            });
            
            // Generate PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            // Calculate image size to fit width
            const imgProps = pdf.getImageProperties(imgData);
            const pdfImgHeight = (imgProps.height * pdfWidth) / imgProps.width;
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfImgHeight);
            pdf.save('Sean_Zeng_Resume.pdf');
            
          } catch (error) {
             console.error("PDF Generation Failed", error);
             alert("Failed to generate PDF. Please try again.");
          } finally {
             setIsGeneratingPDF(false);
          }
       }, 500); // 500ms delay to ensure rendering
       
       return () => clearTimeout(timer);
    }
  }, [isGeneratingPDF]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const aiResponse = await generateChatResponse(userMsg, language);
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'error', text: t.contact.ai.error }]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(id);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const contactMethods = [
    { id: 'email', label: t.contact.labels.mail, value: '2716190547@qq.com', icon: Mail },
    { id: 'wechat', label: t.contact.labels.wechat, value: 'zsc4253', icon: WeChatIcon },
    { id: 'phone', label: t.contact.labels.phone, value: '15985892442', icon: Phone }
  ];

  const decorativeStats = [
      { label: t.contact.stats.encryption, value: "256-BIT" },
      { label: t.contact.stats.location, value: "CN/ZHEJIANG" },
      { label: t.contact.stats.status, value: t.contact.stats.available },
  ];

  return (
    <>
      <ResumeModal isOpen={showResume} onClose={() => setShowResume(false)} />

      {/* HIDDEN RESUME RENDERER FOR PDF GENERATION */}
      {isGeneratingPDF && (
         <div className="fixed top-0 left-0 z-[-50] opacity-0 pointer-events-none overflow-hidden w-[900px] h-[1200px] bg-white">
            <ResumeContent id="resume-to-print" />
         </div>
      )}

      <div className="min-h-screen bg-transparent pt-24 pb-12 px-4 md:px-6 flex flex-col items-center justify-center relative z-10 overflow-hidden">
        <BackgroundShapes />
        
        {/* Layout Container */}
        <div className="w-full max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start lg:items-center relative z-10">
          
          {/* Contact Info - Left Side */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex flex-col justify-center h-full w-full"
          >
            {/* Unified Title */}
            <div className="border-l-[6px] border-neon pl-6 md:pl-8 py-2 mb-10 md:mb-14">
              <InteractiveTitle text={t.contact.title} size="medium" align="left" className="text-white break-words" />
              <p className="mt-6 font-sans font-bold text-gray-400 text-lg md:text-xl tracking-tight max-w-lg">
                {t.contact.subtitle_1}
                <br/>
                <span className="text-sm font-mono text-gray-600">{t.contact.subtitle_2}</span>
              </p>
            </div>

            <div className="space-y-6 w-full">
              
              {/* Contact Method Buttons */}
              {contactMethods.map((method) => (
                  <button 
                    key={method.id}
                    onClick={() => copyToClipboard(method.value, method.id)}
                    className="group w-full relative overflow-hidden rounded-[2rem] border border-white/20 bg-surface/50 interactive-target select-none transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-neon -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] will-change-transform" />
                    
                    <div className="relative z-10 flex items-center justify-between p-6 gap-4 w-full">
                        <div className="flex items-center gap-6 overflow-hidden">
                            <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-black flex items-center justify-center transition-colors duration-300 shrink-0">
                                <method.icon className="w-6 h-6 text-white group-hover:text-neon transition-colors" />
                            </div>
                            <div className="flex flex-col items-start overflow-hidden">
                                <span className="font-mono text-xs text-gray-500 group-hover:text-black/60 tracking-widest uppercase transition-colors mb-1">
                                    {method.label}
                                </span>
                                <span className="font-display font-black text-xl sm:text-2xl md:text-3xl text-white group-hover:text-black transition-colors duration-300 truncate w-full text-left">
                                    {method.value}
                                </span>
                            </div>
                        </div>
                        <div className="shrink-0">
                          {copiedItem === method.id ? (
                            <div className="flex items-center gap-2 bg-black/10 px-3 py-1 rounded-full">
                              <Check className="w-5 h-5 text-green-500 group-hover:text-black" />
                              <span className="text-xs font-bold text-green-500 group-hover:text-black hidden sm:inline">{t.contact.labels.copied}</span>
                            </div>
                          ) : (
                            <Copy className="w-6 h-6 text-gray-600 group-hover:text-black/40 transition-colors" />
                          )}
                        </div>
                    </div>
                  </button>
              ))}
              
              {/* DOWNLOAD / VIEW RESUME ROW */}
              <div className="flex flex-col sm:flex-row gap-4">
                  {/* Main Download Button */}
                  <button 
                    onClick={() => setIsGeneratingPDF(true)}
                    disabled={isGeneratingPDF}
                    className="flex-1 group relative overflow-hidden rounded-[2rem] border border-white/20 bg-surface/50 interactive-target select-none transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                      <div className="absolute inset-0 bg-white -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] will-change-transform" />
                      
                      <div className="relative z-10 flex items-center justify-between p-6 gap-4 w-full">
                          <div className="flex items-center gap-6 overflow-hidden">
                              <div className="w-12 h-12 rounded-full bg-white/10 group-hover:bg-black flex items-center justify-center transition-colors duration-300 shrink-0">
                                  {isGeneratingPDF ? <Loader2 className="w-6 h-6 text-white group-hover:text-white animate-spin" /> : <FileText className="w-6 h-6 text-white group-hover:text-white transition-colors" />}
                              </div>
                              <div className="flex flex-col items-start overflow-hidden">
                                  <span className="font-mono text-xs text-gray-500 group-hover:text-black/60 tracking-widest uppercase transition-colors mb-1">
                                      {t.contact.resume_size}
                                  </span>
                                  <span className="font-display font-black text-xl text-white group-hover:text-black transition-colors duration-300 truncate w-full text-left">
                                      {isGeneratingPDF ? "GENERATING..." : t.contact.resume_btn}
                                  </span>
                              </div>
                          </div>
                          <div className="shrink-0">
                              <Download className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                          </div>
                      </div>
                  </button>

                  {/* Preview Button (Icon only on mobile, small text on desktop) */}
                  <button 
                    onClick={() => setShowResume(true)}
                    className="group sm:w-auto relative overflow-hidden rounded-[2rem] border border-white/20 bg-surface/50 interactive-target select-none transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center"
                  >
                     <div className="absolute inset-0 bg-neon -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-[0.16,1,0.3,1] will-change-transform" />
                     <div className="relative z-10 p-6 flex flex-col items-center justify-center gap-1">
                         <Eye className="w-6 h-6 text-white group-hover:text-black transition-colors" />
                         <span className="font-mono text-[10px] uppercase text-gray-500 group-hover:text-black/60 hidden sm:block">Preview</span>
                     </div>
                  </button>
              </div>
              
              {/* Decorative Stats Row */}
              <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
                  {decorativeStats.map((stat) => (
                    <div key={stat.label} className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-surface/30 text-gray-500 font-bold font-mono text-xs md:text-sm rounded-full border border-white/5 cursor-default select-none hover:border-white/20 hover:text-gray-300 transition-colors">
                        <span className="text-neon mr-2">●</span>
                        {stat.label}: <span className="ml-2 text-gray-300">{stat.value}</span>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>

          {/* AI Chat Interface - Right Side */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-ash/80 backdrop-blur-xl border border-white/10 relative h-[500px] md:h-[600px] lg:h-[700px] flex flex-col shadow-2xl rounded-[2rem] overflow-hidden w-full mt-12 lg:mt-0"
          >
            {/* Header */}
            <div className="p-6 bg-neon text-black flex items-center justify-between">
              <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 fill-black" />
                  <span className="font-display font-black text-sm md:text-lg tracking-wider">{t.contact.ai.title}</span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-black rounded-full opacity-50" />
                <div className="w-3 h-3 bg-black rounded-full opacity-50" />
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 font-mono scrollbar-hide" ref={scrollRef}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] p-4 text-sm md:text-base font-bold rounded-[1.5rem] leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-cyber text-black border border-cyber rounded-tr-none' 
                        : msg.role === 'error'
                          ? 'bg-red-900/20 text-red-400 border border-red-500/30'
                          : 'bg-surface text-neon border border-white/10 rounded-tl-none'
                    }`}>
                      {msg.role === 'error' && <AlertCircle className="inline-block mr-2 w-4 h-4" />}
                      {msg.text}
                    </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface p-4 border border-white/10 flex gap-2 items-center rounded-[1.5rem] rounded-tl-none">
                      <span className="w-2 h-2 bg-neon animate-pulse rounded-full" />
                      <span className="w-2 h-2 bg-neon animate-pulse delay-75 rounded-full" />
                      <span className="w-2 h-2 bg-neon animate-pulse delay-150 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-5 bg-surface border-t border-white/10">
              <div className="relative flex flex-col sm:flex-row gap-3 md:gap-4">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.contact.ai.placeholder}
                    className="w-full bg-black border border-white/10 p-4 text-white font-mono focus:outline-none focus:border-cyber focus:bg-black transition-colors placeholder:text-gray-700 text-sm md:text-base rounded-[1rem]"
                />
                <button 
                    onClick={handleSend}
                    className="bg-neon text-black px-6 py-3 sm:py-0 font-bold hover:bg-white transition-colors interactive-target flex justify-center items-center rounded-[1rem] min-w-[80px]"
                >
                    <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default Contact;
