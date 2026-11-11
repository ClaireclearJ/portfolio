/* ============================================================
   ★ 所有内容都在这里 —— 加新内容只需编辑这个文件 ★
   ============================================================

   这是一部「工程师编年史」：每个区块都是骑士远征的一章。
   页面会按下面的数组顺序自动编号、自动排版，无需改 HTML/CSS。

   ┌─ 字段说明 ────────────────────────────────────────────────┐
   │ 可翻译字段写成对象：{ en: "English", zh: "中文" }            │
   │ 年份、邮箱、链接等无需翻译的，直接写字符串。                 │
   │ 可选字段留空或删掉都行，页面会自动省略（不显示空按钮/空行）。│
   └──────────────────────────────────────────────────────────┘

   ★ 三种最常用的添加操作，模板见下方 projects / skills / experience 数组内的注释。★
*/

window.PORTFOLIO = {

  /* ---------- 纹章与站点元信息 ---------- */
  meta: {
    name: "Claire Jiang",
    crest: "CJ",                         // 盾徽 / 火漆印上的字母
    mottoLatin: "FERRO ET IGNI",         // 纹章绶带上的拉丁文
    motto: { en: "By iron and fire", zh: "以铁与火" },
    siteTitle: {
      en: "Claire Jiang — The Chronicle of an Engineer",
      zh: "Claire Jiang — 工程师编年史"
    },
    footerNote: { en: "Bound by hand · kept in ink", zh: "手工装帧 · 以墨续写" }
  },

  /* ---------- 界面文案（导航 / 按钮 / 标签） ---------- */
  ui: {
    nav: [
      { id: "chronicle", en: "CHRONICLE", zh: "编年史" },
      { id: "armory",    en: "ARMORY",    zh: "军械库" },
      { id: "quests",    en: "QUESTS",    zh: "远征" },
      { id: "saga",      en: "SAGA",      zh: "传奇" },
      { id: "raven",     en: "RAVEN",     zh: "传书" }
    ],

    /* 每个区块标题下的一句引言 */
    sectionLede: {
      chronicle: {
        en: "How a maker came to the trade.",
        zh: "一个造物者如何走上此道。"
      },
      armory: {
        en: "The blades, hammers and spells carried on every quest.",
        zh: "每一次远征随身携带的利刃、铁锤与法术。"
      },
      quests: {
        en: "Campaigns completed — and those still in the forge.",
        zh: "已完成的战役，与仍在炉火中的远征。"
      },
      saga: {
        en: "The road so far, told in chapters.",
        zh: "以章节记述的来路。"
      },
      raven: {
        en: "For commissions, collaborations, or a good argument.",
        zh: "为委托、合作，或一场痛快的争论而来。"
      }
    },

    heroActions: {
      primary:   { en: "ENTER THE QUESTS", zh: "踏入远征" },
      secondary: { en: "SEND A RAVEN",     zh: "飞鸦传书" }
    },

    /* 开场火漆封缄 */
    seal: {
      title: { en: "THE CHRONICLE",        zh: "编年史" },
      sub:   { en: "OF AN ENGINEER-ERRANT", zh: "一位游侠工程师" },
      hint:  { en: "CLICK TO BREAK THE SEAL", zh: "点击启封" }
    },

    heroFoot: { en: "FOLIO I", zh: "第一卷" },
    scrollCue: { en: "TURN THE PAGE", zh: "翻页" },

    questWord:    { en: "QUEST", zh: "远征" },
    chapterWord:  { en: "CHAPTER", zh: "第" },   // 中文会渲染成「第 I 章」
    chapterUnit:  { en: "", zh: "章" },
    projectLinks: {
      demo: { en: "LIVE DEMO", zh: "在线演示" },
      code: { en: "SOURCE",    zh: "源码" }
    },

    contact: {
      cta:       { en: "The raven flies straightest to", zh: "渡鸦最快抵达" },
      location:  { en: "LOCATION", zh: "坐标" },
      sealHint:  { en: "break the seal", zh: "拆开火漆" },
      socials:   { en: "OR FIND ME HERE", zh: "或在此处寻我" }
    },

    footer: {
      status: { en: "THE FORGE IS LIT", zh: "炉火正旺" },
      madeBy: { en: "A STATIC CHRONICLE · NO BUILD STEP", zh: "纯静态编年史 · 无需构建" }
    }
  },

  /* ---------- 序章 / Hero ---------- */
  hero: {
    pre: {
      en: "A CHRONICLE OF ENGINEERING · FOLIO I",
      zh: "一部工程编年史 · 第一卷"
    },
    name: "Claire Jiang",
    role: {
      en: "ENGINEER-ERRANT · FORGER OF THINGS",
      zh: "游侠工程师 · 万物锻造者"
    },
    tagline: {
      en: "I ride the borderlands between silicon and story — forging hardware and software that outlast the quest.",
      zh: "我行走在硅与故事的交界之地，锻造比远征更持久的硬件与软件。"
    },
    status: {
      en: "THE FORGE IS LIT · OPEN TO NEW QUESTS",
      zh: "炉火已燃 · 承接新的远征"
    }
  },

  /* ---------- 滚动绶带上的技术关键词 ---------- */
  ticker: [
    "PYTHON", "C++", "C", "RUST", "TYPESCRIPT",
    "ESP32", "STM32", "PCB DESIGN", "KICAD",
    "REACT", "THREE.JS", "DOCKER", "LINUX", "3D PRINTING"
  ],

  /* ---------- 编年史 / 关于 ---------- */
  about: {
    bio: [
      {
        en: "I am Claire — an engineer who has spent years crossing the borderlands between hardware and software. My quests begin as sketches on parchment and end as working devices, firmware and interfaces that people actually use.",
        zh: "我是 Claire —— 一名常年行走在硬件与软件交界之地的工程师。我的远征往往始于羊皮纸上的草图，终于真正被人使用的设备、固件与界面。"
      },
      {
        en: "This chronicle is kept current: every time a quest is completed, a new entry is inked in. The medieval shell is no costume — it is a reminder that good engineering is a craft, practiced slowly and kept sharp.",
        zh: "这部编年史持续更新：每完成一次远征，就添上一笔新的墨迹。中世纪的外壳并非戏服 —— 它提醒我，好的工程是一门手艺，需要慢慢打磨、时时锋利。"
      }
    ],
    stats: [
      { value: "20+",  label: { en: "Quests completed", zh: "完成远征" } },
      { value: "8+",   label: { en: "Realms mastered",  zh: "精通领域" } },
      { value: "∞",    label: { en: "Curiosity",        zh: "好奇心" } },
      { value: "24/7", label: { en: "At the forge",     zh: "炉火不熄" } }
    ]
  },

  /* ---------- 军械库 / 技能 ----------
     icon 可选：sword / anvil / quill / compass / tower
  */
  skills: [
    {
      icon: "sword",
      category: { en: "BLADES · LANGUAGES", zh: "利刃 · 编程语言" },
      items: ["Python", "C++", "C", "JavaScript", "TypeScript", "Rust", "SQL"]
    },
    {
      icon: "anvil",
      category: { en: "FORGE · HARDWARE", zh: "熔炉 · 硬件" },
      items: ["Arduino", "ESP32", "STM32", "Raspberry Pi", "KiCad", "PCB Design"]
    },
    {
      icon: "quill",
      category: { en: "SPELLCRAFT · SOFTWARE", zh: "法术 · 软件" },
      items: ["React", "Node.js", "Three.js", "HTML/CSS", "REST", "WebSocket"]
    },
    {
      icon: "compass",
      category: { en: "SATCHEL · TOOLS", zh: "行囊 · 工具" },
      items: ["Git", "Linux", "Docker", "CI/CD", "Figma", "3D Printing"]
    }
  ],

  /* ---------- 远征 / 项目 ----------
     ★ 加新项目：复制一个 { ... } 块粘贴到数组里，改字段即可 ★
     可选字段：
       featured: true    -> 桌面端横跨两列（建议只给一个项目）
       statusKey         -> victory / forge / ongoing，控制状态徽章配色
       icon              -> sword / anvil / quill / compass / tower（卡片水印）
       link / repo       -> 留 "" 则不显示按钮
  */
  projects: [
    {
      title: "Keyboard Arm Wrestling",
      subtitle: {
        en: "A two-player duel fought on a single keyboard",
        zh: "在一块键盘上决出胜负的双人对决"
      },
      year: "2025",
      status: { en: "VICTORY", zh: "已告捷" },
      statusKey: "victory",
      icon: "sword",
      featured: true,
      summary: {
        en: "A zero-dependency, single-file HTML arcade game: two players mash their keys to win a thirty-second arm-wrestling bout.",
        zh: "零依赖的单文件 HTML 街机游戏：两名玩家狂按按键，在三十秒内决出掰手腕的胜负。"
      },
      highlights: [
        { en: "Single file — no build, no dependencies", zh: "单文件 —— 无构建、零依赖" },
        { en: "Custom keybinds remembered by the browser", zh: "自定义按键，浏览器自动记住" },
        { en: "Sound, pause, fullscreen and best-of-three", zh: "音效、暂停、全屏与三局两胜" }
      ],
      tech: ["HTML", "CSS", "JavaScript", "Canvas"],
      link: "",
      repo: ""
    },
    {
      title: "Telemetry Dashboard",
      subtitle: {
        en: "Real-time telemetry, read like an augur's glass",
        zh: "如占卜镜一般阅读的实时遥测"
      },
      year: "2024",
      status: { en: "IN THE FORGE", zh: "锻造中" },
      statusKey: "forge",
      icon: "compass",
      summary: {
        en: "A live dashboard that streams device telemetry over WebSocket and paints it as precise, readable charts.",
        zh: "通过 WebSocket 实时接收设备遥测，并绘制成精确、易读图表的实时面板。"
      },
      highlights: [
        { en: "Sub-second live updates over WebSocket", zh: "WebSocket 亚秒级实时更新" },
        { en: "Custom chart rendering tuned for dense data", zh: "为高密度数据调校的自定义图表" }
      ],
      tech: ["React", "TypeScript", "D3", "WebSocket"],
      link: "",
      repo: ""
    },
    {
      title: "Tiny Terminal OS",
      subtitle: {
        en: "A miniature command line for microcontrollers",
        zh: "面向微控制器的迷你命令行"
      },
      year: "2023",
      status: { en: "ONGOING", zh: "征途未竟" },
      statusKey: "ongoing",
      icon: "tower",
      summary: {
        en: "A minimal command-line OS for embedded boards — bootloader, memory allocator and a blinking-cursor REPL.",
        zh: "面向嵌入式开发板的最小命令行系统 —— 引导程序、内存分配器与闪烁光标的 REPL。"
      },
      highlights: [
        { en: "Custom bootloader and heap allocator", zh: "自研引导程序与堆分配器" },
        { en: "Interactive REPL over UART", zh: "通过 UART 的交互式 REPL" }
      ],
      tech: ["C", "Assembly", "ESP32"],
      link: "",
      repo: ""
    }

    /* ── 在这里粘贴你的下一个项目（记得上一行末尾的逗号）──
    ,
    {
      title: "My New Quest",
      subtitle: { en: "one-line description", zh: "一句话简介" },
      year: "2026",
      status: { en: "IN THE FORGE", zh: "锻造中" },
      statusKey: "forge",
      icon: "quill",
      summary: { en: "What it does.", zh: "它做了什么。" },
      highlights: [
        { en: "highlight one", zh: "亮点一" },
        { en: "highlight two", zh: "亮点二" }
      ],
      tech: ["React", "Node.js"],
      link: "",
      repo: ""
    }
    */
  ],

  /* ---------- 传奇 / 经历 ---------- */
  experience: [
    {
      period: "2023 — NOW",
      role: { en: "Independent Engineer / Builder", zh: "独立工程师 / 创造者" },
      org:  { en: "Self-directed quests",           zh: "独立远征" },
      description: {
        en: "Designing and shipping hardware and software end to end — from PCB to interface.",
        zh: "端到端设计与交付软硬件项目 —— 从 PCB 到界面。"
      },
      tech: ["ESP32", "React", "KiCad"]
    },
    {
      period: "2021 — 2023",
      role: { en: "Embedded Software Engineer", zh: "嵌入式软件工程师" },
      org:  { en: "[ Your company ]",           zh: "[ 你的公司 ]" },
      description: {
        en: "Wrote firmware and drivers for connected devices; built tooling that cut bring-up time in half.",
        zh: "为联网设备编写固件与驱动；搭建工具链，把调试上线时间缩短一半。"
      },
      tech: ["C", "STM32", "Python"]
    },
    {
      period: "2019 — 2021",
      role: { en: "Student · Engineering", zh: "学生 · 工程方向" },
      org:  { en: "[ Your university ]",   zh: "[ 你的学校 ]" },
      description: {
        en: "Focused on embedded systems, control theory and hands-on prototyping.",
        zh: "专注嵌入式系统、控制理论与动手原型制作。"
      },
      tech: ["C++", "Arduino", "MATLAB"]
    }
  ],

  /* ---------- 传书 / 联系 ---------- */
  contact: {
    email: "claire.jiang@example.com",
    location: { en: "Earth · UTC+8", zh: "地球 · UTC+8" },
    note: {
      en: "Letters are answered within a day's ride.",
      zh: "书信将在一日骑行之内答复。"
    },
    social: [
      { label: "GitHub",   url: "https://github.com/" },
      { label: "Email",    url: "mailto:claire.jiang@example.com" },
      { label: "LinkedIn", url: "https://www.linkedin.com/" }
    ]
  }
};
