import React, { useState, useEffect } from "react";
import { Trophy, Globe2, ShoppingCart, Zap, Flame, Heart, TrendingUp, TrendingDown, Crown } from "lucide-react";
import { useLang } from "./LangContext";

// Simple custom arrow icons to match the design style
const ArrowUpGreen = () => <TrendingUp className="w-4 h-4 text-green-500" strokeWidth={3} />;
const ArrowDownRed = () => <TrendingDown className="w-4 h-4 text-red-500" strokeWidth={3} />;
const MinusGray = () => <div className="w-3 h-1 bg-gray-400 rounded-full" />;

// Animated Number Component for realistic counting effect
function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const duration = 1500;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // easeOutExpo
      const easeProgress = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
      
      setCount(Math.floor(easeProgress * value));
      
      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value); // ensure exact value at end
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value]);
  
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

// Data Array with multiple metrics for real sorting simulation
const PLAYERS_DATA = [
  { id: 1, name: "أحمد الشريف", location: "دبي AE", spent: 10388, activity: 1560, loyalty: 98, level: 100, trend: "up", avatarColor: "bg-white", blobColor: "bg-[#ffd4b8]" },
  { id: 2, name: "محمد النور", location: "الدمام SA", spent: 9874, activity: 1420, loyalty: 94, level: 98, trend: "down", avatarColor: "bg-teal-500", blobColor: "bg-[#00d4ff]" },
  { id: 3, name: "سارة القاسم", location: "الدمام SA", spent: 9387, activity: 1650, loyalty: 99, level: 100, trend: "neutral", avatarColor: "bg-cyan-500", blobColor: "bg-[#00d4ff]" },
  { id: 4, name: "خالد المنصور", location: "أربيل 1Q", spent: 4572, activity: 1100, loyalty: 72, level: 94, trend: "up", avatarColor: "bg-[#00d4ff]" },
  { id: 5, name: "فاطمة الزهراء", location: "إربد JO", spent: 4445, activity: 890, loyalty: 88, level: 88, trend: "down", avatarColor: "bg-[#00d4ff]" },
  { id: 6, name: "عمر البركة", location: "الوكرة QA", spent: 4056, activity: 1250, loyalty: 81, level: 83, trend: "neutral", avatarColor: "bg-[#ff884d]" },
  { id: 7, name: "نور الدين", location: "الدوحة QA", spent: 3928, activity: 980, loyalty: 65, level: 81, trend: "up", avatarColor: "bg-slate-700" },
  { id: 8, name: "ليلى الأمين", location: "عمان JO", spent: 3772, activity: 1340, loyalty: 91, level: 70, trend: "down", avatarColor: "bg-slate-700" },
  { id: 9, name: "يوسف الحكيم", location: "جدة SA", spent: 3546, activity: 760, loyalty: 58, level: 68, trend: "neutral", avatarColor: "bg-[#ff884d]" },
  { id: 10, name: "مريم الصالح", location: "أبوظبي AE", spent: 3213, activity: 1050, loyalty: 84, level: 65, trend: "up", avatarColor: "bg-slate-700" }
];

export function CommunityLeaderboard() {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState<"spent" | "active" | "loyal">("spent"); // 'spent', 'active', 'loyal'
  const [expandedPlayerId, setExpandedPlayerId] = useState<number | null>(null);

  // Sort logic for realism
  const sortedPlayers = [...PLAYERS_DATA].sort((a, b) => {
    if (activeFilter === 'spent') return b.spent - a.spent;
    if (activeFilter === 'active') return b.activity - a.activity;
    return b.loyalty - a.loyalty;
  });

  const getScoreDisplay = (player: typeof PLAYERS_DATA[0]) => {
    if (activeFilter === 'spent') return { label: t("Total Spent", "إجمالي الإنفاق"), value: `${player.spent.toLocaleString()} ج.م` };
    if (activeFilter === 'active') return { label: t("Activity Points", "نقاط النشاط"), value: `${player.activity.toLocaleString()} نقطة` };
    return { label: t("Loyalty Score", "مؤشر الولاء"), value: `${player.loyalty}%` };
  };

  const top3 = sortedPlayers.slice(0, 3);
  const remainingPlayers = sortedPlayers.slice(3, 10); // Display 4 to 10 for neatness

  return (
    <div className="w-full bg-[#f9f7f0] p-4 md:p-8 border-4 border-black shadow-[8px_8px_0px_#000] relative font-sans text-black" dir="rtl">
      
      {/* Top Banner */}
      <div className="w-full bg-black text-white p-2 flex justify-center items-center gap-4 text-[10px] md:text-xs font-black uppercase mb-12 border-b-4 border-black relative z-10 overflow-hidden">
        <span className="flex items-center gap-2 animate-pulse"><Trophy className="w-4 h-4 text-yellow-400" /> LEADERBOARD</span>
        <span className="hidden md:inline">• أبطال متجرنا •</span>
        <span>TOP PLAYERS</span>
        <span className="hidden md:inline">• المتصدرين •</span>
      </div>

      {/* Title Section */}
      <div className="flex flex-col items-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700 fill-mode-both">
        <div className="bg-[var(--c-lime)] border-4 border-black px-4 py-1 flex items-center gap-2 font-black mb-6 shadow-[4px_4px_0px_#000] rotate-[-2deg] transition-transform hover:rotate-0 hover:scale-105 cursor-pointer">
          <Trophy className="w-5 h-5" />
          <span>{t("Hall of Fame", "قاعة المشاهير")}</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-2 text-center" style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}>أبطال</h1>
        <div className="bg-[var(--c-orange)] px-4 py-1 border-4 border-black shadow-[8px_8px_0px_#000] rotate-[2deg] mb-6 transition-transform hover:rotate-0 hover:-translate-y-1 cursor-default">
          <h1 className="text-6xl md:text-8xl text-white font-black" style={{ textShadow: "4px 4px 0px #000" }}>متجرنا</h1>
        </div>
        
        <p className="font-bold opacity-80 text-center max-w-lg mt-4 text-lg">
          {t("Get to know the elite players and most trusted and active users in our secure community.", "تعرّف على نخبة اللاعبين والتجار الأكثر نشاطاً وموثوقية في مجتمعنا السري.")}
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-8 mb-12 w-full max-w-3xl mx-auto px-1 md:px-4">
        <div className="border-4 border-black bg-white p-2 md:p-4 flex flex-col items-center justify-center w-full shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000] hover:-translate-y-2 transition-all hover:shadow-[4px_4px_0px_#000] md:hover:shadow-[8px_8px_0px_#000] cursor-default animate-in slide-in-from-bottom-8 fade-in duration-500 delay-100 fill-mode-both">
          <Globe2 className="w-5 h-5 md:w-8 md:h-8 text-[var(--c-teal)] mb-1 md:mb-2 group-hover:animate-spin" />
          <span className="text-sm md:text-2xl font-black"><AnimatedNumber value={22} /></span>
          <span className="text-[8px] md:text-xs font-bold opacity-70">دولة</span>
        </div>
        <div className="border-4 border-black bg-white p-2 md:p-4 flex flex-col items-center justify-center w-full shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000] hover:-translate-y-2 transition-all hover:shadow-[4px_4px_0px_#000] md:hover:shadow-[8px_8px_0px_#000] cursor-default animate-in slide-in-from-bottom-8 fade-in duration-500 delay-200 fill-mode-both">
          <ShoppingCart className="w-5 h-5 md:w-8 md:h-8 text-black mb-1 md:mb-2 opacity-50 transition-transform group-hover:scale-110" />
          <span className="text-sm md:text-2xl font-black"><AnimatedNumber value={18300} prefix="+" /></span>
          <span className="text-[8px] md:text-xs font-bold opacity-70">عملية شراء</span>
        </div>
        <div className="border-4 border-black bg-white p-2 md:p-4 flex flex-col items-center justify-center w-full shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000] hover:-translate-y-2 transition-all hover:shadow-[4px_4px_0px_#000] md:hover:shadow-[8px_8px_0px_#000] cursor-default animate-in slide-in-from-bottom-8 fade-in duration-500 delay-300 fill-mode-both">
          <Zap className="w-5 h-5 md:w-8 md:h-8 text-yellow-500 mb-1 md:mb-2 fill-yellow-500 transition-transform group-hover:scale-125 group-hover:rotate-12" />
          <span className="text-sm md:text-2xl font-black"><AnimatedNumber value={2450} prefix="+" /></span>
          <span className="text-[8px] md:text-xs font-bold opacity-70 text-center">مستخدم نشط</span>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-row flex-wrap sm:flex-nowrap justify-center gap-2 md:gap-6 mb-16 px-1 md:px-4 animate-in fade-in zoom-in-95 duration-500 delay-400 fill-mode-both">
        <button 
          onClick={() => setActiveFilter('spent')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1 md:gap-2 px-2 py-2 md:px-6 md:py-3 text-[10px] md:text-base font-black border-4 border-black shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000] md:hover:shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none ${activeFilter === 'spent' ? 'bg-black text-[var(--c-lime)]' : 'bg-white hover:bg-[var(--c-lime)]/20'}`}
        >
          <Trophy className={`w-3 h-3 md:w-5 md:h-5 ${activeFilter === 'spent' ? 'text-[var(--c-lime)]' : 'text-gray-500'}`} />
          الأكثر إنفاقاً
        </button>
        <button 
          onClick={() => setActiveFilter('active')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1 md:gap-2 px-2 py-2 md:px-6 md:py-3 text-[10px] md:text-base font-black border-4 border-black shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000] md:hover:shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none ${activeFilter === 'active' ? 'bg-black text-[var(--c-lime)]' : 'bg-white hover:bg-[var(--c-lime)]/20'}`}
        >
          <Flame className={`w-3 h-3 md:w-5 md:h-5 ${activeFilter === 'active' ? 'text-[var(--c-lime)]' : 'text-gray-500'}`} />
          الأكثر نشاطاً
        </button>
        <button 
          onClick={() => setActiveFilter('loyal')}
          className={`flex-1 sm:flex-none flex items-center justify-center gap-1 md:gap-2 px-2 py-2 md:px-6 md:py-3 text-[10px] md:text-base font-black border-4 border-black shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000] transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000] md:hover:shadow-[6px_6px_0px_#000] active:translate-y-1 active:shadow-none ${activeFilter === 'loyal' ? 'bg-black text-[var(--c-lime)]' : 'bg-white hover:bg-[var(--c-lime)]/20'}`}
        >
          <Heart className={`w-3 h-3 md:w-5 md:h-5 ${activeFilter === 'loyal' ? 'text-[var(--c-lime)]' : 'text-gray-500'}`} />
          الأكثر تعاملاً
        </button>
      </div>

      {/* Podium Section */}
      <div className="flex items-end justify-center gap-2 md:gap-6 mb-16 h-[400px] mt-24">
        
        {/* Third Place */}
        <div className="flex flex-col items-center relative w-[100px] md:w-[140px] group animate-in slide-in-from-bottom-20 fade-in duration-700 delay-[600ms] fill-mode-both">
          {/* Avatar Area */}
          <div className="absolute bottom-full mb-2 flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-4 w-[140px]">
            <div className={`w-16 h-16 md:w-20 md:h-20 bg-black border-4 border-black relative mb-2 shadow-[4px_4px_0px_#000] transition-transform duration-300 group-hover:scale-110`}>
               <div className={`w-full h-full ${top3[2].avatarColor} relative overflow-hidden rounded-t-[50%]`}>
                 <div className="absolute bottom-1/4 left-1/3 w-1 h-2 bg-black rounded-full shadow-[6px_0px_0_#000]"></div>
                 <div className="absolute top-1/2 right-1/4 w-3 h-1 bg-black rounded-full transition-transform group-hover:scale-y-50"></div>
               </div>
               <div className="absolute -bottom-3 -left-3 bg-[var(--c-lime)] border-2 border-black text-[#000] font-black text-[10px] px-1 shadow-[2px_2px_0px_#000] z-10 w-fit transition-transform group-hover:scale-110">LV.{top3[2].level}</div>
            </div>
            <span className="font-black text-sm text-center mb-1 group-hover:text-[#a76b4b] transition-colors">{top3[2].name}</span>
            <span className="text-[10px] font-bold opacity-60 text-center mb-1">{top3[2].location}</span>
            <div className="bg-white border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_#000] my-1">
              <span className="text-xs font-black text-center">{getScoreDisplay(top3[2]).value}</span>
            </div>
            <div className="h-6 w-px bg-gray-300 my-1 group-hover:bg-[#a76b4b] transition-colors hidden md:block"></div>
          </div>
          
          <div className="w-full h-[80px] md:h-[100px] bg-[#a76b4b] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] transition-shadow duration-300 group-hover:shadow-[8px_8px_0px_rgba(167,107,75,0.4)]">
            <span className="text-3xl md:text-5xl font-black text-black/20 group-hover:text-black/40 transition-colors">#3</span>
          </div>
        </div>

        {/* First Place */}
        <div className="flex flex-col items-center relative w-[120px] md:w-[160px] z-10 group animate-in slide-in-from-bottom-24 fade-in duration-700 delay-1000 fill-mode-both">
          <div className="absolute bottom-full mb-2 flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-6 w-[180px]">
            <Crown className="w-8 h-8 text-[var(--c-lime)] fill-[var(--c-lime)] mb-[-8px] relative z-20 drop-shadow-[2px_2px_0_#000] transition-all duration-300 group-hover:scale-125 group-hover:-translate-y-2 group-hover:rotate-12" strokeWidth={2} stroke="black" />
            <div className="w-20 h-24 md:w-24 md:h-28 bg-[var(--c-orange)] border-4 border-black relative mb-2 shadow-[8px_8px_0px_#000] transition-transform duration-300 group-hover:scale-110">
               <div className={`absolute bottom-0 left-[10%] w-[80%] h-[90%] bg-white rounded-t-full border-r-4 border-l-4 border-t-4 border-black overflow-hidden flex items-center justify-center`}>
                  <div className="absolute top-[40%] text-black flex flex-col items-center gap-1 transition-transform group-hover:translate-y-[-2px]">
                      <div className="flex gap-2">
                        <div className="w-1.5 h-3 bg-black rounded-full group-hover:h-4 transition-all"></div>
                        <div className="w-1.5 h-3 bg-black rounded-full group-hover:h-4 transition-all"></div>
                      </div>
                      <div className="w-3 h-1 bg-black rounded-full mt-1 group-hover:w-4 group-hover:h-2 group-hover:rounded-t-none transition-all"></div>
                  </div>
               </div>
               <div className="absolute -bottom-3 -left-3 bg-[var(--c-lime)] border-2 border-black text-[#000] font-black text-[10px] px-1 shadow-[2px_2px_0px_#000] z-10 w-fit transition-transform group-hover:scale-110 group-hover:bg-white">LV.{top3[0].level}</div>
            </div>
            <span className="font-black text-sm md:text-lg text-center mb-1 mt-2 group-hover:text-[var(--c-orange)] transition-colors">{top3[0].name}</span>
            <span className="text-[10px] font-bold opacity-60 text-center mb-1">{top3[0].location}</span>
            <div className="bg-white border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_#000] my-1">
              <span className="text-sm font-black text-center text-green-700">{getScoreDisplay(top3[0]).value}</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-green-600 font-bold bg-green-100 border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_#000]">
              <TrendingUp className="w-3 h-3 group-hover:animate-bounce" /> {t("Top Pick", "متصدر الأسبوع")}
            </div>
          </div>
          
          <div className="w-full h-[140px] md:h-[180px] bg-[var(--c-orange)] border-4 border-black flex items-center justify-center shadow-[6px_6px_0px_#000] transition-shadow duration-300 group-hover:shadow-[12px_12px_0px_rgba(255,102,0,0.4)]">
            <span className="text-5xl md:text-7xl font-black text-black/20 group-hover:text-black/40 transition-colors">#1</span>
          </div>
        </div>

        {/* Second Place */}
        <div className="flex flex-col items-center relative w-[100px] md:w-[140px] group animate-in slide-in-from-bottom-20 fade-in duration-700 delay-[800ms] fill-mode-both">
          <div className="absolute bottom-full mb-2 flex flex-col items-center transition-transform duration-300 group-hover:-translate-y-4 w-[140px]">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#16273a] border-4 border-black relative mb-2 shadow-[4px_4px_0px_#000] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
               <div className={`absolute bottom-0 left-[15%] w-[70%] h-[80%] ${top3[1].avatarColor} border-r-4 border-l-4 border-t-4 border-black rounded-t-[40%] flex items-center justify-center`}>
                  <div className="absolute top-[35%] flex flex-col items-center gap-0.5">
                     <div className="flex gap-2">
                        <div className="w-1 h-2 bg-white rounded-full"></div>
                        <div className="w-1 h-2 bg-white rounded-full"></div>
                     </div>
                     <svg width="12" height="6" viewBox="0 0 12 6" fill="none" className="mt-1 transition-transform group-hover:scale-y-[-1]">
                        <path d="M2 2C4 5 8 5 10 2" stroke="white" strokeWidth="2" strokeLinecap="round" />
                     </svg>
                  </div>
               </div>
               <div className="absolute -bottom-3 -left-3 bg-[var(--c-lime)] border-2 border-black text-[#000] font-black text-[10px] px-1 shadow-[2px_2px_0px_#000] z-10 w-fit transition-transform group-hover:scale-110">LV.{top3[1].level}</div>
            </div>
            <span className="font-black text-sm text-center mb-1 group-hover:text-[#9ba1a8] transition-colors">{top3[1].name}</span>
            <span className="text-[10px] font-bold opacity-60 text-center mb-1">{top3[1].location}</span>
            <div className="bg-white border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_#000] my-1">
              <span className="text-sm font-black text-center">{getScoreDisplay(top3[1]).value}</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] text-red-600 font-bold bg-red-100 border-2 border-black px-2 py-0.5 shadow-[2px_2px_0px_#000]">
              <TrendingDown className="w-3 h-3 group-hover:animate-ping" /> {t("Rising Star", "شديد المنافسة")}
            </div>
          </div>
          
          <div className="w-full h-[110px] md:h-[140px] bg-[#9ba1a8] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] transition-shadow duration-300 group-hover:shadow-[8px_8px_0px_rgba(155,161,168,0.4)]">
            <span className="text-3xl md:text-5xl font-black text-black/20 group-hover:text-black/40 transition-colors">#2</span>
          </div>
        </div>

      </div>

      {/* Separator / Ranks List Banner */}
      <div className="relative flex justify-center items-center mb-10 w-full z-10 animate-in fade-in zoom-in-95 duration-700 delay-1000 fill-mode-both">
        <div className="h-1 w-full bg-black absolute left-0 right-0 top-1/2 -translate-y-1/2"></div>
        <div className="bg-[var(--c-lime)] border-4 border-black px-6 py-2 font-black shadow-[4px_4px_0px_#000] relative z-10 font-mono text-xl tracking-widest uppercase transition-transform hover:scale-105 active:scale-95 cursor-default">
          #4 — #10
        </div>
      </div>

      {/* Players List */}
      <div className="flex flex-col gap-3 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-1000 fill-mode-both pb-12">
        {remainingPlayers.map((player, index) => {
          const rank = index + 4;
          const scoreInfo = getScoreDisplay(player);
          const isExpanded = expandedPlayerId === player.id;
          
          return (
            <div 
              key={`${player.id}-${activeFilter}`} 
              className={`group flex flex-col border-4 border-black transition-all duration-300 ${isExpanded ? 'bg-[var(--c-lime)] shadow-[8px_8px_0px_#000] -translate-y-2 -translate-x-1 z-10 relative' : 'bg-white hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#000] hover:bg-gray-50'} animate-in fade-in slide-in-from-bottom-4`}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
            >
              {/* Row Header - Clickable */}
              <div 
                className="flex items-center justify-between p-2 md:p-3 cursor-pointer w-full gap-2 relative z-20"
                onClick={() => setExpandedPlayerId(isExpanded ? null : player.id)}
              >
                <div className="flex items-center gap-2 md:gap-4 min-w-0 flex-1 md:flex-none md:min-w-[200px]">
                  {/* Rank Badge */}
                  <div className={`shrink-0 w-8 h-8 md:w-10 md:h-10 border-2 md:border-4 border-black flex items-center justify-center font-black text-sm md:text-lg transition-colors ${isExpanded ? 'bg-black text-[var(--c-lime)]' : 'bg-white group-hover:bg-black group-hover:text-white'}`}>
                    {rank}
                  </div>
                  
                  {/* Trend Icon */}
                  <div className="w-4 md:w-6 shrink-0 flex justify-center transition-transform group-hover:scale-125">
                    {player.trend === 'up' && <ArrowUpGreen />}
                    {player.trend === 'down' && <ArrowDownRed />}
                    {player.trend === 'neutral' && <MinusGray />}
                  </div>

                  {/* Avatar */}
                  <div className={`w-8 h-8 md:w-10 md:h-10 shrink-0 border-2 md:border-4 border-black relative overflow-hidden bg-black ml-1 md:ml-2 hidden sm:block transition-transform duration-300 ${isExpanded ? 'scale-110' : 'group-hover:scale-110'}`}>
                    <div className={`w-full h-full ${player.avatarColor} opacity-90 rounded-t-[30%] mt-1`}></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-0.5 md:gap-1 transition-transform group-hover:translate-y-[-2px]">
                       <div className="w-1 h-1.5 bg-black rounded-full" />
                       <div className="w-1 h-1.5 bg-black rounded-full" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-black text-xs md:text-sm leading-none transition-transform group-hover:translate-x-2 truncate">{player.name}</span>
                    <span className="text-[8px] md:text-[10px] font-bold opacity-60 mt-1 transition-transform group-hover:translate-x-2 truncate">{player.location} </span>
                  </div>
                </div>

                {/* LV */}
                <div className="hidden sm:flex items-center shrink-0">
                  <div className={`border-2 border-black font-black text-[8px] md:text-[10px] px-1 md:px-2 py-0.5 shadow-[2px_2px_0px_#000] transition-colors ${isExpanded ? 'bg-white text-black' : 'bg-[var(--c-lime)] group-hover:bg-white'}`}>
                    LV.{player.level}
                  </div>
                </div>

                {/* Spent & Select */}
                <div className="flex items-center gap-2 md:gap-4 text-left ml-auto pl-1 shrink-0">
                  <div className="flex flex-col items-end transition-transform group-hover:-translate-x-2">
                    <span className={`text-[8px] md:text-xs font-bold transition-colors ${isExpanded ? 'text-black' : 'opacity-60 group-hover:text-black'} whitespace-nowrap`}>{scoreInfo.label}</span>
                    <span className={`text-xs md:text-base font-black ${isExpanded ? 'scale-110 origin-right transition-transform' : ''} whitespace-nowrap`}>{scoreInfo.value}</span>
                  </div>
                  <div className={`shrink-0 w-6 h-6 md:w-8 md:h-8 border-2 border-black flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-black text-[var(--c-lime)]' : 'bg-transparent text-black md:opacity-30 group-hover:opacity-100 group-hover:bg-black group-hover:text-white'}`}>
                    <svg className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Expanded Details Panel */}
              {isExpanded && (
                <div className="flex flex-col animate-in slide-in-from-top-2 fade-in duration-300 border-t-4 border-black bg-white mx-1 mb-1 shadow-[inset_0px_4px_0px_rgba(0,0,0,0.1)] overflow-hidden">
                  <div className="grid grid-cols-3 gap-4 p-4 md:grid-cols-4 items-center">
                    
                    <div className="flex flex-col items-center p-3 border-2 border-black bg-[#f4f4f4] hover:bg-[var(--c-orange)] hover:text-black transition-colors cursor-default">
                      <span className="text-[10px] font-bold opacity-60 uppercase mb-1">{t("Purchases", "المشتريات")}</span>
                      <span className="font-black text-sm md:text-base text-green-700">{player.spent.toLocaleString()} ج.م</span>
                    </div>

                    <div className="flex flex-col items-center p-3 border-2 border-black bg-[#f4f4f4] hover:bg-[var(--c-lime)] hover:text-black transition-colors cursor-default">
                      <span className="text-[10px] font-bold opacity-60 uppercase mb-1">{t("Activity Points", "نقاط النشاط")}</span>
                      <span className="font-black text-sm md:text-base flex items-center gap-1"><Flame className="w-3 h-3 text-red-500" /> {player.activity.toLocaleString()}</span>
                    </div>

                    <div className="flex flex-col items-center p-3 border-2 border-black bg-[#f4f4f4] hover:bg-pink-300 hover:text-black transition-colors cursor-default">
                      <span className="text-[10px] font-bold opacity-60 uppercase mb-1">{t("Loyalty", "مؤشر الولاء")}</span>
                      <span className="font-black text-sm md:text-base flex items-center gap-1"><Heart className="w-3 h-3 text-pink-600" /> %{player.loyalty}</span>
                    </div>

                    <div className="col-span-3 md:col-span-1 border-2 border-black bg-black text-white p-3 flex flex-col justify-center items-center h-full hover:bg-[var(--c-teal)] hover:text-black transition-colors cursor-default">
                      <span className="text-[10px] font-bold opacity-70 uppercase mb-1">{t("Join Date", "تاريخ الانضمام")}</span>
                      <span className="font-black text-sm">2021/04/12</span>
                    </div>

                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

    </div>
  );
}
