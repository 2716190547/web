
import React from 'react';
import { MapPin, Phone, Mail, Globe, Gamepad, Activity, Bike } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ResumeContentProps {
  id?: string;
}

export const ResumeContent: React.FC<ResumeContentProps> = ({ id }) => {
  const { t, language } = useLanguage();

  const resumeData = {
    name: language === 'zh' ? "曾施程" : "SEAN ZENG",
    title: language === 'zh' ? "ui/ux设计师" : "UI/UX DESIGNER",
    contact: {
      phone: "159-8589-2442",
      email: "2716190547@qq.com",
      location: language === 'zh' ? "福建省厦门市集美区印斗校区" : "Jimei District, Xiamen, Fujian",
      portfolio: "https://worthy-thing-104972.framer.app/"
    },
    education: {
      school: language === 'zh' ? "集美大学" : "Jimei University"
    },
    skills: language === 'zh' 
      ? ["界面设计", "交互设计", "用户体验", "运营活动设计"]
      : ["Interface Design", "Interaction Design", "User Experience", "Campaign Design"],
    awards: language === 'zh' 
      ? ["第六届“国青杯”全国高校艺术设计大赛 一等奖（国家级）", "CET-4级"]
      : ["6th National Youth Cup Art Design Competition - First Prize", "CET-4"],
    hobbies: language === 'zh'
      ? ["游戏", "跑步", "骑行"]
      : ["Gaming", "Running", "Cycling"],
    experience: [
      {
        period: "2023.12 - 2024.04",
        company: language === 'zh' ? "美图公司" : "MEITU COMPANY",
        role: language === 'zh' ? "Airbrush移动端 海外设计" : "Airbrush Mobile Overseas Design",
        details: language === 'zh' 
          ? [
            "前期:熟悉产品背景，了解用户需求以及偏好，参与制定可行的产品品质提升方案实现版本优化",
            "中期:产出设计方案，参与制定，完善，优化流程和设计规范，独立完成界面组件制作",
            "后期:根据存在问题不断跟进优化界面，修改完善交互逻辑"
          ]
          : [
            "Familiar with product background, user needs. Participated in product quality improvement.",
            "Produced design schemes, optimized processes and specs. Independent interface component production.",
            "Follow-up on issues, UI optimization, interaction logic refinement."
          ]
      },
      {
        period: "2023.04 - 2023.09",
        company: language === 'zh' ? "北京更嗨科技有限公司" : "BEIJING GENGHER TECH",
        role: language === 'zh' ? "六只脚移动端 UI设计" : "Six Feet Mobile UI Design",
        details: language === 'zh'
          ? [
            "调研产出页面“我的”部分板块",
            "参与制定，完善，优化流程和设计规范，独立完成界面icon制作，装备购板块部分",
            "根据存在问题不断跟进优化界面，修改交互操作，完善核心链路的流程"
          ]
          : [
             "Researched and produced the 'Mine' section.",
             "Optimized processes and specs, icon production, gear purchase section.",
             "UI optimization, interaction improvements, core flow refinement."
          ]
      }
    ],
    selfEval: language === 'zh'
      ? [
        "关注设计趋势变化，有不同的设计语言表达能力，分享设计经验、对新鲜事物有热情。熟悉 UI的制作流程，PS/AI/FIGMA等软件可以积极与其他跨专业的团队成员沟通",
        "熟悉iOS Android Web的设计规范，有一定的产品思维和用户同理心能够参与用户研究，交互设计，设计原型的等工作",
        "热爱设计，探索技术的无限可能，是有丰富经验的设计师，也懂一些代码"
      ]
      : [
        "Focused on design trends and diverse design languages. Passionate about new things. Proficient in UI process, PS/AI/FIGMA, and cross-functional communication.",
        "Familiar with iOS/Android/Web specs. Strong product thinking and empathy. Capable in user research, interaction design, and prototyping.",
        "Passionate about design and technology. Experienced designer with coding knowledge."
      ]
  };

  return (
     <div 
       id={id}
       className="pointer-events-auto relative w-[800px] bg-white text-[#1a1a1a] p-12 shadow-2xl min-h-[1100px] mx-auto"
     >
        {/* Header */}
        <div className="flex justify-between items-start mb-12 border-b-2 border-black pb-8">
           <div>
              <h1 className="font-display font-black text-6xl mb-2 uppercase tracking-tight">{resumeData.name}</h1>
              <p className="font-mono text-lg tracking-widest uppercase text-gray-600">{resumeData.title}</p>
           </div>
           <div className="w-24 h-24 bg-gray-100 rounded-full overflow-hidden shrink-0 border-2 border-black flex items-center justify-center">
              {/* Placeholder Avatar using SVG to avoid CORS issues during PDF generation */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12 text-gray-400">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
           </div>
        </div>

        <div className="grid grid-cols-12 gap-12">
           
           {/* Left Column (Side Info) */}
           <div className="col-span-4 flex flex-col gap-8">
              {/* Contact */}
              <section>
                 <h3 className="font-bold text-lg mb-4 border-b border-black pb-1">{t.resume.sections.contact}</h3>
                 <div className="space-y-3 font-mono text-sm text-gray-700 break-words">
                    <div className="flex items-center gap-2">
                       <Phone className="w-4 h-4 shrink-0" />
                       <span>{resumeData.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Mail className="w-4 h-4 shrink-0" />
                       <span>{resumeData.contact.email}</span>
                    </div>
                    <div className="flex items-start gap-2">
                       <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                       <span>{resumeData.contact.location}</span>
                    </div>
                    <div className="flex items-start gap-2">
                       <Globe className="w-4 h-4 shrink-0 mt-0.5" />
                       <span className="text-xs break-all">{resumeData.contact.portfolio}</span>
                    </div>
                 </div>
              </section>

              {/* Skills */}
              <section>
                 <h3 className="font-bold text-lg mb-4 border-b border-black pb-1">{t.resume.sections.skills}</h3>
                 <ul className="space-y-2">
                    {resumeData.skills.map((skill, i) => (
                       <li key={i} className="flex items-center gap-2 text-sm font-medium text-gray-800">
                          <span className="w-1.5 h-1.5 bg-black rotate-45" />
                          {skill}
                       </li>
                    ))}
                 </ul>
              </section>

              {/* Awards */}
              <section>
                 <h3 className="font-bold text-lg mb-4 border-b border-black pb-1">{t.resume.sections.awards}</h3>
                 <ul className="space-y-3 text-sm text-gray-700">
                    {resumeData.awards.map((award, i) => (
                       <li key={i} className="leading-tight">{award}</li>
                    ))}
                 </ul>
              </section>

              {/* Hobbies */}
              <section>
                 <h3 className="font-bold text-lg mb-4 border-b border-black pb-1">{t.resume.sections.hobbies}</h3>
                 <div className="flex gap-4 text-gray-700">
                    {resumeData.hobbies.includes("游戏") || resumeData.hobbies.includes("Gaming") ? <Gamepad strokeWidth={1.5} /> : null}
                    {resumeData.hobbies.includes("跑步") || resumeData.hobbies.includes("Running") ? <Activity strokeWidth={1.5} /> : null}
                    {resumeData.hobbies.includes("骑行") || resumeData.hobbies.includes("Cycling") ? <Bike strokeWidth={1.5} /> : null}
                 </div>
                 <div className="mt-2 text-sm text-gray-600">
                   {resumeData.hobbies.join("  /  ")}
                 </div>
              </section>
           </div>

           {/* Right Column (Main Content) */}
           <div className="col-span-8 flex flex-col gap-10">
              
              {/* Experience */}
              <section>
                 <h3 className="font-bold text-xl mb-6 bg-black text-white inline-block px-2 py-1">{t.resume.sections.experience}</h3>
                 <div className="space-y-8">
                    {resumeData.experience.map((job, i) => (
                       <div key={i} className="relative pl-4 border-l-2 border-gray-200">
                          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-1">
                             <span className="font-mono text-xs font-bold text-gray-500 mb-1 sm:mb-0">{job.period}</span>
                          </div>
                          <h4 className="text-lg font-black uppercase mb-1">{job.company}</h4>
                          <div className="text-sm font-bold text-gray-600 mb-3 uppercase tracking-wide">{job.role}</div>
                          <ul className="space-y-2">
                             {job.details.map((detail, j) => (
                                <li key={j} className="text-sm text-gray-800 leading-relaxed relative pl-3">
                                   <span className="absolute left-0 top-1.5 w-1 h-1 bg-black rounded-full" />
                                   {detail}
                                </li>
                             ))}
                          </ul>
                       </div>
                    ))}
                 </div>
              </section>

              {/* About / Self Eval */}
              <section>
                 <h3 className="font-bold text-xl mb-4 bg-black text-white inline-block px-2 py-1">{t.resume.sections.about}</h3>
                 <div className="mb-4 text-sm">
                    <strong>{t.resume.sections.education}: </strong> {resumeData.education.school}
                 </div>
                 <div className="space-y-3 text-sm text-gray-800 leading-relaxed text-justify">
                    {resumeData.selfEval.map((p, i) => (
                       <p key={i}>{p}</p>
                    ))}
                 </div>
              </section>

           </div>
        </div>
        
        {/* Footer */}
        <div className="mt-16 pt-8 border-t-2 border-black flex justify-between items-center opacity-50">
           <div className="w-12 h-12">
              <div className="w-full h-full bg-black flex items-center justify-center text-white text-[10px] font-mono">QR</div>
           </div>
           <div className="text-right font-mono text-[10px] uppercase">
              Generated by Sean Zeng Portfolio<br/>
              {new Date().getFullYear()}
           </div>
        </div>
     </div>
  );
};
