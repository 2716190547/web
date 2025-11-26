
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'zh';

interface Translations {
  nav: {
    home: string;
    work: string;
    about: string;
    contact: string;
  };
  home: {
    title_line1: string;
    title_line2: string;
    subtitle_1: string;
    subtitle_2: string;
    cta: string;
    selected_works: string;
    interact_hint: string;
    view_case: string;
    view_archive: string;
    footer_title: string;
    footer_start: string;
    copyright: string;
    rights: string;
  };
  work: {
    bg_title: string;
    index_label: string;
    title: string;
    desc: string;
    total_entries: string;
  };
  about: {
    bg_title: string;
    identity_matrix: string;
    title: string;
    id_label: string;
    class_label: string;
    class_value: string;
    status_label: string;
    status_value: string;
    bio_p1_start: string;
    bio_p1_highlight: string;
    bio_p1_end: string;
    bio_desc_1: string;
    bio_desc_2: string;
    bio_desc_3?: string;
    bio_desc_4?: string;
    professional_log: string;
    select_clients: string;
    system_capabilities: string;
    jobs: {
      meitu: { role: string; desc: string; };
      gengher: { role: string; desc: string; };
    };
  };
  contact: {
    title: string;
    subtitle_1: string;
    subtitle_2: string;
    labels: {
      mail: string;
      wechat: string;
      phone: string;
      copied: string;
    };
    resume_btn: string;
    resume_size: string;
    stats: {
      encryption: string;
      location: string;
      status: string;
      available: string;
    };
    ai: {
      title: string;
      welcome: string;
      error: string;
      placeholder: string;
    };
  };
  resume: {
    print: string;
    close: string;
    sections: {
      contact: string;
      education: string;
      skills: string;
      awards: string;
      hobbies: string;
      experience: string;
      about: string;
    }
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: { home: 'Home', work: 'Work', about: 'About Me', contact: 'Contact Me' },
    home: {
      title_line1: "Hi, I'm",
      title_line2: "SEAN ZENG",
      subtitle_1: "FORGING IMMERSIVE DIGITAL REALITIES.",
      subtitle_2: "REACT • WEBGL • INTERACTION",
      cta: "Start A Project",
      selected_works: "SELECTED WORKS",
      interact_hint: "/// Interact to expand",
      view_case: "View Case Study",
      view_archive: "View Archive",
      footer_title: "LET'S WORK TOGETHER",
      footer_start: "START",
      copyright: "© 2025 SEAN ZENG",
      rights: "ALL RIGHTS RESERVED"
    },
    work: {
      bg_title: "WORK",
      index_label: "Project_Index",
      title: "WORK ARCHIVE",
      desc: "A curated collection of digital artifacts, web experiences, and visual experiments created in the void.",
      total_entries: "Total Entries"
    },
    about: {
      bg_title: "PROFILE",
      identity_matrix: "/// Identity_Matrix",
      title: "PROFILE & DATA",
      id_label: "ID",
      class_label: "CLASS",
      class_value: "DESIGNER",
      status_label: "STATUS",
      status_value: "ONLINE",
      bio_p1_start: "",
      bio_p1_highlight: "SEAN ZENG",
      bio_p1_end: "",
      bio_desc_1: "UI/UX Designer with experience in mobile and web products. I bridge the gap between design and code.",
      bio_desc_2: "Experienced in launching B-end and C-end products, including utility apps and social platforms. Passionate about design trends, interactive experiences, and AI-driven aesthetics.",
      professional_log: "Professional_Log",
      select_clients: "VISUAL SIGNAL",
      system_capabilities: "System_Capabilities",
      jobs: {
        meitu: { 
          role: "OVERSEAS DESIGN / AIRBRUSH", 
          desc: "Familiar with product background and user needs. Participated in product quality improvement plans. Produced design schemes, optimized processes and specs. Independent interface component production." 
        },
        gengher: { 
          role: "UI DESIGN / SIX FEET", 
          desc: "Researched and produced the 'Mine' section. Participated in formulating and optimizing processes and design specifications. Independent icon production and gear purchase section." 
        }
      }
    },
    contact: {
      title: "GET CONNECTED",
      subtitle_1: "INITIATE COLLABORATION PROTOCOLS.",
      subtitle_2: "RESPONSE TIME: < 24 HOURS",
      labels: { mail: 'MAIL', wechat: 'WECHAT', phone: 'PHONE', copied: 'COPIED' },
      resume_btn: "DOWNLOAD RESUME",
      resume_size: "PDF • 2.5 MB",
      stats: { encryption: "ENCRYPTION", location: "LOCATION", status: "STATUS", available: "AVAILABLE" },
      ai: {
        title: "SEAN_AI_TWIN // v2.5",
        welcome: "System online. I am Sean's digital twin. How may I assist you?",
        error: "Connection lost. Neural link unstable. Please contact via email.",
        placeholder: "ENTER COMMAND..."
      }
    },
    resume: {
      print: "PRINT / SAVE PDF",
      close: "CLOSE",
      sections: {
        contact: "CONTACT",
        education: "EDUCATION",
        skills: "PROFESSIONAL SKILLS",
        awards: "AWARDS",
        hobbies: "HOBBIES",
        experience: "EXPERIENCE",
        about: "ABOUT ME"
      }
    }
  },
  zh: {
    nav: { home: '首页', work: '作品', about: '关于我', contact: '联系我' },
    home: {
      title_line1: "Hi, I'm",
      title_line2: "SEAN ZENG",
      subtitle_1: "锻造沉浸式数字现实。",
      subtitle_2: "REACT • WEBGL • 交互体验",
      cta: "联系我",
      selected_works: "精选作品",
      interact_hint: "/// 交互以展开",
      view_case: "查看案例",
      view_archive: "查看归档",
      footer_title: "开启合作",
      footer_start: "开始",
      copyright: "© 2025 肖恩·曾",
      rights: "版权所有"
    },
    work: {
      bg_title: "作品",
      index_label: "项目索引",
      title: "作品归档",
      desc: "汇集数字造物、网页体验与视觉实验的精选集。创造于虚空之中。",
      total_entries: "收录总数"
    },
    about: {
      bg_title: "简介",
      identity_matrix: "/// 身份矩阵",
      title: "个人档案",
      id_label: "ID",
      class_label: "职阶",
      class_value: "设计师",
      status_label: "状态",
      status_value: "在线",
      bio_p1_start: "",
      bio_p1_highlight: "曾施程",
      bio_p1_end: "",
      bio_desc_1: "UI/UX的设计师，也是一个懂代码的设计师，有 B 端C 端产品丰富的落地设计经验，如移动端工具类 APP，网页端社交类， B 端行业领域实际落地项目。",
      bio_desc_2: "不断尝试互联网的各种体验与技术，深耕数字设计领域，当前我特别关注设计的体验，动态的交互行为，丝滑流畅的动画，以及 AI 方向的风格设计。随着技术的发展，设计也一定会发生不一样的趋势，需要面对变化，拥抱变化↗",
      professional_log: "职业日志",
      select_clients: "视觉信号",
      system_capabilities: "系统能力",
      jobs: {
        meitu: { 
          role: "Airbrush移动端 海外设计", 
          desc: "前期:熟悉产品背景，了解用户需求以及偏好，参与制定可行的产品品质提升方案实现版本优化。中期:产出设计方案，参与制定，完善，优化流程和设计规范，独立完成界面组件制作。后期:根据存在问题不断跟进优化界面，修改完善交互逻辑。" 
        },
        gengher: { 
          role: "六只脚移动端 UI设计", 
          desc: "调研产出页面“我的”部分板块。参与制定，完善，优化流程和设计规范，独立完成界面icon制作，装备购板块部分。根据存在问题不断跟进优化界面，修改交互操作，完善核心链路的流程。" 
        }
      }
    },
    contact: {
      title: "建立连接",
      subtitle_1: "启动协作协议。",
      subtitle_2: "响应时间：< 24 小时",
      labels: { mail: '邮箱', wechat: '微信', phone: '电话', copied: '已复制' },
      resume_btn: "下载简历",
      resume_size: "PDF • 2.5 MB",
      stats: { encryption: "加密", location: "位置", status: "状态", available: "可用" },
      ai: {
        title: "肖恩AI分身 // v2.5",
        welcome: "系统已上线。我是Sean的数字分身。请问有什么可以帮您？",
        error: "连接断开。神经链接不稳定。请通过邮件联系。",
        placeholder: "请输入指令..."
      }
    },
    resume: {
      print: "打印 / 保存 PDF",
      close: "关闭",
      sections: {
        contact: "联系方式",
        education: "教育经历",
        skills: "专业方向",
        awards: "获奖经历",
        hobbies: "我的爱好",
        experience: "实习经历",
        about: "关于我"
      }
    }
  }
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
} | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh'); // Default to Chinese

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
