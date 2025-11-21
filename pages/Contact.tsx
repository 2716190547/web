
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, AlertCircle, Copy, Check, ArrowUpRight } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';
import { InteractiveTitle } from '../components/InteractiveTitle';
import { Magnetic } from '../components/Magnetic';
import { BackgroundShapes } from '../components/BackgroundShapes';

interface Message {
  role: 'user' | 'ai' | 'error';
  text: string;
}

const Contact: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "SYSTEM ONLINE. I am Sean's digital construct. Query database?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const aiResponse = await generateChatResponse(userMsg);
      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { 
        role: 'error', 
        text: "CONNECTION LOST. Neural link unstable. Please contact via email." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("hello@seanzeng.design");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-void pt-24 pb-12 px-4 md:px-6 flex flex-col items-center justify-center relative z-10 overflow-hidden">
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
            {/* Changed size to medium to prevent overflow on smaller screens */}
            <InteractiveTitle text="GET CONNECTED" size="medium" align="left" className="text-white break-words" />
            <p className="mt-6 font-sans font-bold text-gray-400 text-lg md:text-xl tracking-tight max-w-lg">
              INITIATE COLLABORATION PROTOCOLS.
              <br/>
              <span className="text-sm font-mono text-gray-600">RESPONSE TIME: &lt; 24 HOURS</span>
            </p>
          </div>

          <div className="space-y-8 md:space-y-10 w-full">
             
             {/* Email Button - Removed Magnetic wrapper per request */}
             <button 
               onClick={copyEmail}
               className="group w-full relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/20 bg-transparent interactive-target select-none transform transition-transform duration-300 active:scale-[0.98]"
             >
               {/* Fill Effect - Slide Up from Bottom */}
               <div className="absolute inset-0 bg-neon translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1] will-change-transform" />
               
               <div className="relative z-10 flex items-center justify-between p-6 md:p-10 gap-6 w-full">
                  
                  {/* Text Container - Ensures left alignment and wrapping */}
                  <span className="flex-1 font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white group-hover:text-black transition-colors duration-300 text-left leading-[0.9] break-all">
                    HELLO@SEANZENG.DESIGN
                  </span>
                  
                  {/* Icon Container - Pinned to Right */}
                  <div className="shrink-0 w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/10 group-hover:bg-black flex items-center justify-center transition-all duration-300 group-hover:scale-110 border border-transparent group-hover:border-black">
                    {copied ? (
                      <Check className="w-6 h-6 md:w-8 md:h-8 text-neon" />
                    ) : (
                      <Copy className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-neon transition-colors" />
                    )}
                  </div>

               </div>
             </button>
             
             {/* Animate Copy Feedback */}
             <AnimatePresence>
               {copied && (
                 <motion.div
                   initial={{ opacity: 0, y: -10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0 }}
                   className="text-neon font-mono font-bold text-sm pl-4"
                 >
                   /// ADDRESS COPIED TO CLIPBOARD
                 </motion.div>
               )}
             </AnimatePresence>
             
             {/* Social Links */}
             <div className="flex flex-wrap gap-3 md:gap-4 pt-4">
                {['INSTAGRAM', 'TWITTER', 'LINKEDIN'].map((social) => (
                   <Magnetic key={social} strength={30}>
                     <a href="#" className="inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 bg-surface text-white font-bold font-mono text-xs md:text-sm hover:bg-white hover:text-black transition-colors interactive-target rounded-full border border-white/10 hover:border-white group">
                        {social}
                        <ArrowUpRight className="w-3 h-3 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                     </a>
                   </Magnetic>
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
                <span className="font-display font-black text-sm md:text-lg tracking-wider">SEAN_AI_TWIN // v2.5</span>
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
                  placeholder="ENTER COMMAND..."
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
  );
};

export default Contact;
