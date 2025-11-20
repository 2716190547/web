
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, AlertCircle, Copy, Check } from 'lucide-react';
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
    <div className="min-h-screen bg-transparent pt-32 pb-10 px-4 md:px-6 flex flex-col items-center justify-center relative z-10 overflow-hidden">
      <BackgroundShapes />
      
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start md:items-center relative z-10">
        
        {/* Contact Info */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-8 md:space-y-12"
        >
          {/* Unified Title */}
          <div className="border-l-[8px] border-neon pl-6 md:pl-10 py-2">
            <InteractiveTitle text="GET CONNECTED" size="large" align="left" className="text-white" />
            <p className="mt-4 font-sans font-bold text-white text-lg md:text-xl tracking-tight">
              INITIATE COLLABORATION PROTOCOLS.
            </p>
          </div>

          <div className="space-y-8">
             <div className="relative inline-block group w-full md:w-auto">
               <button 
                 onClick={copyEmail}
                 className="block w-full md:w-auto font-display font-black text-xl md:text-4xl hover:bg-neon hover:text-black transition-all px-8 py-4 border-2 border-white interactive-target relative overflow-hidden text-center md:text-left rounded-[2rem]"
               >
                 <span className="flex items-center justify-center md:justify-start gap-4 relative z-10 break-all md:break-normal">
                    HELLO@SEANZENG.DESIGN
                    {copied ? <Check className="w-6 h-6 shrink-0" /> : <Copy className="w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity shrink-0" />}
                 </span>
                 {/* Fill effect */}
                 <div className="absolute inset-0 bg-neon transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ease-out" />
               </button>
               <AnimatePresence>
                 {copied && (
                   <motion.div
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0 }}
                     className="absolute -top-8 left-0 w-full text-center md:text-left text-neon font-mono font-bold text-sm"
                   >
                     [COPIED TO CLIPBOARD]
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
             
             <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                {['INSTAGRAM', 'TWITTER', 'LINKEDIN'].map((social) => (
                   <Magnetic key={social} strength={20}>
                     <a href="#" className="inline-block px-6 py-3 bg-ash text-white font-bold font-mono hover:bg-white hover:text-black transition-colors interactive-target rounded-full border border-white/10">
                        {social}
                     </a>
                   </Magnetic>
                ))}
             </div>
          </div>
        </motion.div>

        {/* AI Chat Interface */}
        <motion.div 
           initial={{ x: 50, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="bg-black/90 backdrop-blur-xl border border-ash relative h-[500px] md:h-[600px] flex flex-col shadow-2xl rounded-[2.5rem] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 bg-neon text-black flex items-center justify-between">
             <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 fill-black" />
                <span className="font-display font-black text-sm md:text-lg tracking-wider">SEAN_AI_TWIN // v2.5</span>
             </div>
             <div className="flex gap-2">
               <div className="w-3 h-3 bg-black rounded-full" />
               <div className="w-3 h-3 bg-black rounded-full" />
             </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 font-mono" ref={scrollRef}>
             {messages.map((msg, idx) => (
               <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 text-sm md:text-base font-bold rounded-[1.5rem] ${
                    msg.role === 'user' 
                      ? 'bg-cyber text-black border border-cyber rounded-tr-none' // Cyber Blue for User
                      : msg.role === 'error'
                        ? 'bg-red-900/20 text-red-400 border border-red-500/30'
                        : 'bg-ash text-neon border border-neon/30 rounded-tl-none'
                  }`}>
                    {msg.role === 'error' && <AlertCircle className="inline-block mr-2 w-4 h-4" />}
                    {msg.text}
                  </div>
               </div>
             ))}
             {isTyping && (
               <div className="flex justify-start">
                 <div className="bg-ash p-4 border border-neon/30 flex gap-2 items-center rounded-[1.5rem] rounded-tl-none">
                    <span className="w-2 h-2 bg-neon animate-pulse rounded-full" />
                    <span className="w-2 h-2 bg-neon animate-pulse delay-75 rounded-full" />
                    <span className="w-2 h-2 bg-neon animate-pulse delay-150 rounded-full" />
                 </div>
               </div>
             )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-ash/50 border-t border-white/5">
             <div className="relative flex flex-col sm:flex-row gap-3 md:gap-4">
               <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="ENTER COMMAND..."
                  className="w-full bg-black border border-gray-800 p-4 text-white font-mono focus:outline-none focus:border-cyber focus:bg-gray-900 transition-colors placeholder:text-gray-600 text-sm md:text-base rounded-[1.5rem]"
               />
               <button 
                  onClick={handleSend}
                  className="bg-neon text-black px-6 py-3 sm:py-0 font-bold hover:bg-white transition-colors interactive-target flex justify-center items-center rounded-[1.5rem]"
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
