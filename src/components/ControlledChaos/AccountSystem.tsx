import React, { useState, useRef } from "react";
import { User, X, ChevronUp, ChevronDown, ShieldCheck, Trophy, History, Star, CreditCard, LogIn, Gamepad2, CheckCircle, Info, Check, Copy, Edit2, Trash2, Plus, Sparkles } from "lucide-react";
import { useLogin } from "./LoginContext";
import { useLang } from "./LangContext";
import { GAMES_DATA } from "./StickyWorks";

// Levels Configuration
const LEVEL_CONFIG = [
  { id: "low", name: "Novice", ar: "مبتديء", color: "var(--c-lime)", xp: 0 },
  { id: "mid", name: "Veteran", ar: "مخضرم", color: "var(--c-purple)", xp: 100 },
  { id: "high", name: "", ar: "", color: "var(--c-orange)", xp: 500 },
];

function SavedAccountsModal({ onClose }: { onClose: () => void }) {
  const { savedAccounts, saveAccount, deleteAccount, updateAccount } = useLogin();
  const { t, lang } = useLang();
  
  const [isAdding, setIsAdding] = useState(false);
  const [newGame, setNewGame] = useState("");
  const [newId, setNewId] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempId, setTempId] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGameChange = (val: string) => {
    setNewGame(val);
    if (val.length > 0) {
      const filtered = GAMES_DATA
        .map(g => g.name)
        .filter(name => name.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (game: string) => {
    setNewGame(game);
    setSuggestions([]);
  };

  const handleSave = () => {
    if (!newGame || !newId) return;
    saveAccount(newGame, newId);
    setNewGame("");
    setNewId("");
    setIsAdding(false);
    setSuggestions([]);
  };

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-xl bg-[var(--c-bg)] border-4 border-black flex flex-col max-h-[85vh] shadow-[12px_12px_0px_#000] overflow-hidden">
        
        {/* Header */}
        <div className="bg-black text-white p-4 md:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-[var(--c-lime)]" />
            <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter">{t("Account Vault", "خزنة المحفوظات")}</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-[var(--c-orange)] border-2 border-white text-black flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-[2px_2px_0px_rgba(255,255,255,0.2)]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          
          {/* Add Actions */}
          <div className="flex items-center justify-between">
             <p className="text-xs font-bold opacity-60 uppercase">{t("Your saved game identifiers", "معرفات الألعاب الخاصة بك")}</p>
             <button 
               onClick={() => setIsAdding(!isAdding)}
               className={`flex items-center gap-2 px-4 py-2 border-4 border-black font-black uppercase text-xs transition-all shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none ${isAdding ? 'bg-[var(--c-orange)]' : 'bg-[var(--c-lime)] hover:-translate-y-1'}`}
             >
               <Plus className={`w-4 h-4 transition-transform ${isAdding ? 'rotate-45' : ''}`} />
               {isAdding ? t("Cancel", "إلغاء") : t("Store New ID", "إضافة جديد")}
             </button>
          </div>

          {isAdding && (
            <div className="border-4 border-black p-4 md:p-6 bg-white space-y-6 shadow-[6px_6px_0px_var(--c-purple)] animate-in slide-in-from-top-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                <div className="relative">
                  <label className="block text-[10px] font-black uppercase mb-1">{t("Game Name", "اسم اللعبة")}</label>
                  <input 
                    type="text" 
                    value={newGame}
                    onChange={(e) => handleGameChange(e.target.value)}
                    placeholder="e.g. PUBG Mobile"
                    className="w-full border-4 border-black p-3 text-xs font-bold bg-white focus:ring-4 focus:ring-[var(--c-lime)]/20 outline-none"
                  />
                  {/* Suggestions Dropdown */}
                  {suggestions.length > 0 && (
                    <div className="absolute top-[100%] left-0 right-0 z-[10] border-4 border-black bg-white shadow-[4px_4px_0px_#000] mt-1 overflow-hidden">
                      {suggestions.map((game, i) => (
                        <button 
                          key={i} 
                          onClick={() => selectSuggestion(game)}
                          className="w-full text-left p-3 text-xs font-black uppercase hover:bg-[var(--c-lime)] transition-colors border-b-2 border-black last:border-b-0 flex items-center justify-between group"
                        >
                          {game}
                          <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase mb-1">{t("Player ID", "رقم الـ ID")}</label>
                  <input 
                    type="text" 
                    value={newId}
                    onChange={(e) => setNewId(e.target.value)}
                    placeholder="12345678"
                    className="w-full border-4 border-black p-3 text-xs font-bold bg-white focus:ring-4 focus:ring-[var(--c-lime)]/20 outline-none"
                  />
                </div>
              </div>
              <button 
                onClick={handleSave}
                className="w-full bg-[var(--c-ink)] text-white py-4 font-black uppercase text-sm hover:bg-[var(--c-purple)] transition-all shadow-[4px_4px_0px_var(--c-lime)] active:shadow-none active:translate-y-1"
              >
                {t("Verify & Save Account", "تأكيد وحفظ الحساب")}
              </button>
            </div>
          )}

          {/* List Area */}
          <div className="space-y-4">
            {savedAccounts.length === 0 && !isAdding && (
              <div className="py-16 text-center bg-black/5 border-4 border-dashed border-black/20">
                <Gamepad2 className="w-12 h-12 mx-auto mb-4 opacity-10" />
                <p className="font-bold opacity-30 text-sm uppercase tracking-widest">{t("Your vault is empty", "لا توجد معرفات محفوظة")}</p>
              </div>
            )}
            
            {savedAccounts.map((acc) => (
              <div 
                key={acc.id} 
                className={`group flex flex-col md:flex-row md:items-center justify-between p-4 border-4 border-black bg-white hover:bg-[var(--c-lime)]/5 transition-all shadow-[4px_4px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}
              >
                <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                  <div className="bg-[var(--c-purple)] text-white px-3 py-1 text-[10px] font-black uppercase shadow-[2px_2px_0px_#000]">
                    {acc.game}
                  </div>
                  
                  {editingId === acc.id ? (
                    <input 
                      type="text" 
                      value={tempId}
                      onChange={(e) => setTempId(e.target.value)}
                      className="border-2 border-black p-1 text-xs font-black focus:outline-none bg-yellow-50"
                      autoFocus
                      onBlur={() => updateAccount(acc.id, tempId)}
                      onKeyDown={(e) => e.key === 'Enter' && (updateAccount(acc.id, tempId), setEditingId(null))}
                    />
                  ) : (
                    <span className="font-black text-base md:text-xl tracking-wider text-black/80">{acc.accountId}</span>
                  )}
                </div>

                <div className={`flex items-center justify-end gap-2 mt-4 md:mt-0 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <button 
                    onClick={() => {
                        navigator.clipboard.writeText(acc.accountId);
                        setCopiedId(acc.id);
                        setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className={`w-10 h-10 border-2 border-black flex items-center justify-center transition-all shadow-[2px_2px_0px_#000] ${copiedId === acc.id ? 'bg-green-500 text-white' : 'bg-[var(--c-lime)] hover:-translate-y-1'}`}
                    title={t("Copy", "نسخ")}
                  >
                    {copiedId === acc.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                  
                  <button 
                    onClick={() => {setEditingId(acc.id); setTempId(acc.accountId);}}
                    className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center hover:bg-[var(--c-orange)] transition-all shadow-[2px_2px_0px_#000] hover:-translate-y-1"
                    title={t("Edit", "تعديل")}
                  >
                    <Edit2 className="w-5 h-5 text-black" />
                  </button>
                  
                  <button 
                    onClick={() => deleteAccount(acc.id)}
                    className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[2px_2px_0px_#000] hover:-translate-y-1"
                    title={t("Delete", "حذف")}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="bg-black/5 p-4 border-t-4 border-black text-[10px] font-bold opacity-50 uppercase text-center">
           {t("Quick search, copy and recharge your accounts", "ابحث، انسخ، واشحن حساباتك بسرعة فائقة")}
        </div>
      </div>
    </div>
  );
}

export function AccountSystem() {
  const { isProfileOpen, closeProfile, isLoggedIn, openLogin, userData } = useLogin();
  const { t, lang } = useLang();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showSavedAccounts, setShowSavedAccounts] = useState(false);
  const modalScrollRef = useRef<HTMLDivElement>(null);

  // Mocked state for orders (keeps the history logic)
  const [orders] = useState([
    { id: "ORD-9921", game: "PUBG Mobile", amount: "60 UC", date: "2024-03-25", status: "Completed", statusAr: "مكتمل" },
    { id: "ORD-8812", game: "Free Fire", amount: "100 Diamonds", date: "2024-03-22", status: "Completed", statusAr: "مكتمل" },
    { id: "ORD-7711", game: "Call of Duty", amount: "Battle Pass", date: "2024-03-15", status: "Completed", statusAr: "مكتمل" },
    { id: "ORD-6622", game: "Roblox", amount: "400 Robux", date: "2024-03-10", status: "Completed", statusAr: "مكتمل" },
    { id: "ORD-5531", game: "eFootball", amount: "250 Coins", date: "2024-03-05", status: "Completed", statusAr: "مكتمل" },
  ]);

  if (!isProfileOpen) return null;

  const getLevelInfo = (lvl: number) => {
    if (lvl > 10) return LEVEL_CONFIG[2];
    if (lvl > 5) return LEVEL_CONFIG[1];
    return LEVEL_CONFIG[0];
  };

  const levelInfo = getLevelInfo(11); // Mocked level
  const isVIP = true;

  const scrollModal = (offset: number) => {
    if (modalScrollRef.current) {
      modalScrollRef.current.scrollBy({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={closeProfile} />

      {/* Profile Modal Container */}
      <div className="relative w-[95%] max-w-2xl mx-auto animate-in fade-in zoom-in duration-300 h-[90vh] flex flex-col">
        {/* Shadow (Background effect) */}
        <div 
          className="absolute inset-0 translate-x-3 translate-y-3 border-4 border-black transition-colors duration-500 hidden md:block" 
          style={{ backgroundColor: levelInfo.color }}
        />

        {/* Main Border Box */}
        <div className="relative flex-1 border-4 border-black bg-[var(--c-bg)] flex flex-col overflow-hidden">
          
          {/* STICKY ELEMENTS (Stay fixed while scrolling) */}
          {/* Close Button */}
          <button
            onClick={closeProfile}
            className="absolute top-4 right-4 w-10 h-10 border-4 border-black bg-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-all z-[60] shadow-[2px_2px_0px_#000]"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Custom Scroll Controls */}
          <div className="absolute top-20 bottom-4 right-2 w-10 flex flex-col gap-2 z-[60] pointer-events-none">
            <button 
              onClick={() => scrollModal(-200)} 
              className="w-10 h-14 flex items-center justify-center bg-[var(--c-orange)] border-4 border-black hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000] pointer-events-auto active:translate-y-1 active:shadow-none"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
            <div className="flex-1 border-x-4 border-black/10 mx-auto w-1 my-1"></div>
            <button 
              onClick={() => scrollModal(200)} 
              className="w-10 h-14 flex items-center justify-center bg-[var(--c-orange)] border-4 border-black hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000] pointer-events-auto active:translate-y-1 active:shadow-none"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>

          {/* SCROLLABLE AREA - Natural Scroll Pattern */}
          <div className="relative flex-1 overflow-hidden">
            <div 
              ref={modalScrollRef}
              className="absolute inset-0 overflow-y-auto scroll-smooth touch-pan-y [-webkit-overflow-scrolling:touch] pr-12 p-6 md:p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {/* Profile Header */}
              <div className="flex flex-row items-center gap-4 md:gap-6 mb-8 md:mb-10 pb-6 md:pb-8 border-b-4 border-black/10">
                <div className={`relative p-1 border-4 border-black shrink-0 ${isVIP ? 'animate-pulse' : ''}`}>
                  <div className="absolute inset-0 -m-2 border-4 border-dashed border-black/20" />
                  <div 
                    className="w-16 h-16 md:w-32 md:h-32 bg-white flex items-center justify-center border-4 border-black shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000] relative"
                    style={{ borderColor: levelInfo.color }}
                  >
                    <User className="w-8 h-8 md:w-16 md:h-16 text-black opacity-20" />
                    {isVIP && (
                      <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-[var(--c-orange)] text-black font-black text-[8px] md:text-[10px] px-1 md:px-2 py-0.5 md:py-1 border-2 border-black rotate-12 shadow-[1px_1px_0px_#000] md:shadow-[2px_2px_0px_#000] animate-pulse">
                        VIP
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 md:mb-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 border-2 border-black px-2 py-0.5 rounded-sm flex items-center gap-1.5 shadow-[2px_2px_0px_var(--c-ink)]">
                      <ShieldCheck className="w-3 h-3 text-black" strokeWidth={3} />
                      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-black">
                        {isLoggedIn ? t("Premium Agent", "عميل ذهبي VIP") : t("Guest Session", "جلسة ضيف")}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl md:text-5xl font-black uppercase leading-tight md:leading-[0.8] tracking-tighter truncate">
                    {isLoggedIn ? (userData?.name || "User") : t("Explorer", "مستكشف")}
                  </h2>
                  <p className="text-[10px] md:text-sm font-bold opacity-50 mt-1 truncate">
                    {isLoggedIn ? (userData?.contact || "Not Provided") : t("Anonymous Access", "دخول مجهول")}
                  </p>
                  
                  {isLoggedIn && (
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-4">
                      <button 
                        onClick={() => setShowInfoModal(true)}
                        className="flex items-center gap-2 bg-[var(--c-ink)] text-white px-2 py-1 text-[8px] md:text-[10px] font-black uppercase hover:bg-[var(--c-purple)] transition-all border-2 border-black"
                      >
                        <Info className="w-3 h-3 md:w-4 h-4" />
                        {t("Account Info", "معلومات الحساب")}
                      </button>
                      <button 
                        onClick={() => setShowSavedAccounts(true)}
                        className="flex items-center gap-2 bg-[var(--c-orange)] text-black px-2 py-1 text-[8px] md:text-[10px] font-black uppercase hover:bg-[var(--c-lime)] transition-all border-2 border-black shadow-[2px_2px_0px_#000] active:translate-y-0.5 active:shadow-none"
                      >
                        <Star className="w-3 h-3 md:w-4 h-4" />
                        {t("Manage Favorites", "إدارة محفوظاتي")}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center shrink-0">
                  <div 
                    className="w-12 h-12 md:w-20 md:h-20 rotate-45 border-4 border-black flex items-center justify-center shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000] transition-colors duration-500"
                    style={{ backgroundColor: levelInfo.color }}
                  >
                    <div className="-rotate-45 flex flex-col items-center">
                      <span className="text-[8px] md:text-[10px] font-black leading-none opacity-60 uppercase">{t("LVL", "مستوى")}</span>
                      <span className="text-sm md:text-2xl font-black">11</span>
                    </div>
                  </div>
                  <span className="mt-2 md:mt-4 font-black uppercase text-[8px] md:text-[10px] tracking-widest">{lang === 'ar' ? levelInfo.ar : levelInfo.name}</span>
                </div>
              </div>

              {!isLoggedIn ? (
                <div className="py-12 text-center border-4 border-dashed border-black/20 p-8 bg-black/5">
                  <LogIn className="w-16 h-16 mx-auto mb-4 opacity-10" />
                  <h3 className="font-black uppercase text-xl mb-2">{t("Sign in needed", "يرجى تسجيل الدخول")}</h3>
                  <p className="font-bold text-sm opacity-50 mb-6">{t("Level up and track your recharges by logging in.", "ارتقِ بمستواك وتابع شحناتك عبر تسجيل الدخول.")}</p>
                  <button 
                    onClick={() => { closeProfile(); openLogin(); }}
                    className="bg-[var(--c-ink)] text-white px-10 py-4 font-black uppercase hover:bg-[var(--c-purple)] transition-all shadow-[4px_4px_0px_var(--c-lime)] active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    {t("Go to Login", "انتقل لتسجيل الدخول")}
                  </button>
                </div>
              ) : (
                <div className="space-y-8 pb-10">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="border-4 border-black p-3 md:p-5 bg-white shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000]">
                      <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                        <CreditCard className="w-4 h-4 md:w-5 h-5 text-[var(--c-purple)]" />
                        <span className="text-[8px] md:text-[10px] font-black uppercase opacity-60">{t("Total Recharges", "إجمالي الشحن")}</span>
                      </div>
                      <div className="text-xl md:text-4xl font-black">12 <span className="text-[8px] md:text-xs uppercase opacity-40">{t("Requests", "طلبات")}</span></div>
                    </div>
                    <div className="border-4 border-black p-3 md:p-5 bg-white shadow-[2px_2px_0px_#000] md:shadow-[4px_4px_0px_#000]">
                      <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                        <Trophy className="w-4 h-4 md:w-5 h-5 text-[var(--c-orange)]" />
                        <span className="text-[8px] md:text-[10px] font-black uppercase opacity-60">{t("Account Security", "أمان الحساب")}</span>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2">
                        <div className="flex-1 bg-black/5 h-3 md:h-4 border-2 border-black">
                          <div className="bg-[var(--c-lime)] h-full w-[95%] border-r-2 border-black" />
                        </div>
                        <span className="text-[8px] md:text-[10px] font-black">95%</span>
                      </div>
                    </div>
                  </div>

                  {/* Level Progress */}
                  <div className="border-4 border-black p-6 bg-white shadow-[6px_6px_0px_#000]">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <h4 className="font-black uppercase text-xl leading-none">{t("Status Upgrade", "تطوير رتبة الحساب")}</h4>
                        <p className="text-[10px] font-bold opacity-50 uppercase mt-1">160 XP {t("to Next Level", "للمستوى التالي")}</p>
                      </div>
                      <ShieldCheck className="w-8 h-8 opacity-20" />
                    </div>
                    <div className="h-10 border-4 border-black bg-black/5 relative overflow-hidden">
                       <div 
                        className="h-full bg-gradient-to-r from-[var(--c-purple)] to-[var(--c-lime)] transition-all duration-1000" 
                        style={{ width: '65%' }}
                       />
                       <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black uppercase tracking-[0.2em] text-white mix-blend-difference">
                         {t("Processing Experience...", "جاري معالجة الخبرة...")}
                       </div>
                    </div>
                  </div>

                  {/* Saved Accounts Button - Simplified link in main profile */}
                  <div className="border-4 border-black p-4 bg-white shadow-[4px_4px_0px_#000] flex items-center justify-between group cursor-pointer hover:bg-[var(--c-lime)]/10 transition-colors" onClick={() => setShowSavedAccounts(true)}>
                    <div className="flex items-center gap-3">
                      <Star className="w-6 h-6 text-[var(--c-orange)]" />
                      <div>
                        <h4 className="font-black uppercase text-lg leading-none">{t("Saved IDs", "معرفات محفوظة")}</h4>
                        <p className="text-[10px] font-bold opacity-50 uppercase mt-1">{t("Manage your favorite game accounts", "إدارة حسابات ألعابك المفضلة")}</p>
                      </div>
                    </div>
                    <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                  </div>

                  {/* Transaction Log */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <History className="w-6 h-6 text-[var(--c-orange)]" />
                      <h4 className="font-black uppercase text-3xl tracking-tighter">{t("Transaction Log", "سجل العمليات")}</h4>
                    </div>
                    <div className="space-y-3">
                      {orders.map((order, idx) => (
                        <div key={idx} className={`group flex flex-col md:flex-row md:items-center justify-between p-4 border-2 border-black bg-white hover:bg-[var(--c-lime)]/5 transition-all cursor-default ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}>
                          <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row-reverse text-right' : ''}`}>
                            <div className="bg-black text-[var(--c-bg)] px-2 py-1 text-[10px] font-black">{order.date}</div>
                            <span className="font-black uppercase text-base tracking-tight">{order.game}</span>
                          </div>
                          <div className={`flex items-center justify-between md:justify-end gap-6 mt-3 md:mt-0 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                            <span className="text-sm font-black text-[var(--c-purple)]">{order.amount}</span>
                            <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-100 px-3 py-1 rounded-full border border-green-600/20">
                              <CheckCircle className="w-3 h-3" /> {lang === 'ar' ? order.statusAr : order.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account Info Sub-Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in zoom-in duration-200">
           <div className="relative bg-[var(--c-bg)] border-4 border-black p-8 shadow-[10px_10px_0px_#000] w-full max-w-sm rotate-1">
              <button 
                onClick={() => setShowInfoModal(false)}
                className="absolute -top-6 -right-6 w-12 h-12 bg-[var(--c-orange)] border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_#000] hover:rotate-90 transition-transform"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-8 h-8 text-[var(--c-purple)]" />
                  <h4 className="text-2xl font-black uppercase leading-none">{t("Login Security", "بيانات الحساب")}</h4>
                </div>
                
                <div className="space-y-4">
                  <div className="border-b-2 border-black/10 pb-2">
                    <p className="text-[10px] font-black opacity-50 uppercase">{t("Method", "طريقة الدخول")}</p>
                    <p className="font-black uppercase text-sm text-[var(--c-orange)]">{userData?.method || "Unknown"}</p>
                  </div>
                  <div className="border-b-2 border-black/10 pb-2">
                    <p className="text-[10px] font-black opacity-50 uppercase">{t("Username", "اسم المستخدم")}</p>
                    <p className="font-black uppercase text-sm">{userData?.name || "Guest"}</p>
                  </div>
                  <div className="border-b-2 border-black/10 pb-2">
                    <p className="text-[10px] font-black opacity-50 uppercase">{t("Login Date", "تاريخ الدخول")}</p>
                    <p className="font-black uppercase text-sm">{userData?.date || "N/A"}</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setShowInfoModal(false)}
                    className="w-full bg-[var(--c-lime)] border-4 border-black py-3 font-black uppercase text-xs shadow-[4px_4px_0px_#000] active:translate-y-1 active:shadow-none transition-all"
                  >
                    {t("OK, GOT IT", "حسناً، فهمت")}
                  </button>
                </div>
              </div>
           </div>
        </div>
      )}

      {/* Saved Accounts Dedicated Modal */}
      {showSavedAccounts && (
        <SavedAccountsModal onClose={() => setShowSavedAccounts(false)} />
      )}
    </div>
  );
}

export function ProfileHeroLink() {
  const { openProfile, isLoggedIn, openLogin, userData } = useLogin();
  const { t } = useLang();
  const username = userData?.name || "Guest";

  return (
    <button 
      onClick={isLoggedIn ? openProfile : openLogin} 
      className="group flex items-center gap-2 text-lg font-black uppercase underline underline-offset-4 decoration-[var(--c-orange)] decoration-2 hover:text-[var(--c-purple)] transition-all"
    >
      <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-[2px_2px_0px_#000]">
        <User className="w-4 h-4" />
      </div>
      <span>{isLoggedIn ? username : t("Account", "حسابي")}</span>
    </button>
  );
}

export function NavProfileButton() {
  const { openProfile, isLoggedIn, openLogin } = useLogin();
  const { lang } = useLang();
  
  return (
    <button 
      onClick={isLoggedIn ? openProfile : openLogin}
      className={`group w-14 h-14 rounded-full border-4 border-[var(--c-ink)] bg-[var(--c-orange)] flex items-center justify-center shadow-[4px_4px_0px_#000] hover:scale-110 hover:-translate-y-2 hover:bg-[var(--c-lime)] transition-all cursor-pointer`}
      title={isLoggedIn ? "Profile" : "Login"}
    >
      <User className="w-6 h-6 text-[var(--c-ink)]" strokeWidth={3} />
    </button>
  );
}
