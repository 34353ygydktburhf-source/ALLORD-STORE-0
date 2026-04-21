import React, { useState, useRef } from "react";
import { User, X, ChevronUp, ChevronDown, ShieldCheck, Trophy, History, Star, CreditCard, LogIn, Gamepad2, CheckCircle, Info, Check, Copy, Edit2, Trash2, Plus, Sparkles } from "lucide-react";
import { useLogin } from "./LoginContext";
import { useLang } from "./LangContext";
import { useGames } from "./GamesContext";
import { Link, useNavigate } from "react-router-dom";
import { useAdminStatus } from "./AdminStatusContext";
import { StatusRing } from "./StatusRing";

// Levels Configuration
const LEVEL_CONFIG = [
  { id: "low", name: "Novice", ar: "مبتديء", color: "var(--c-lime)", xp: 0 },
  { id: "mid", name: "Veteran", ar: "مخضرم", color: "var(--c-purple)", xp: 100 },
  { id: "high", name: "", ar: "", color: "var(--c-orange)", xp: 500 },
];

export function SavedAccountsModal({ onClose }: { onClose: () => void }) {
  const { savedAccounts, saveAccount, deleteAccount, updateAccount } = useLogin();
  const { t, lang } = useLang();
  const { games } = useGames();
  
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
      const filtered = games
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

export function ProfileHeroLink() {
  const { isLoggedIn, userData } = useLogin();
  const { t } = useLang();
  const username = userData?.name || "Guest";

  return (
    <Link 
      to="/profile"
      className="group flex items-center gap-2 text-lg font-black uppercase underline underline-offset-4 decoration-[var(--c-orange)] decoration-2 hover:text-[var(--c-purple)] transition-all"
    >
      <div className="w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-[2px_2px_0px_#000]">
        <User className="w-4 h-4" />
      </div>
      <span>{isLoggedIn ? username : t("Account", "حسابي")}</span>
    </Link>
  );
}

export function NavProfileButton() {
  const { isLoggedIn, openLogin } = useLogin();
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate('/profile')}
      className={`group w-14 h-14 rounded-full border-4 border-[var(--c-ink)] bg-[var(--c-orange)] flex items-center justify-center shadow-[4px_4px_0px_#000] hover:scale-110 hover:-translate-y-2 hover:bg-[var(--c-lime)] transition-all cursor-pointer`}
      title={isLoggedIn ? "Profile" : "Login"}
    >
      <User className="w-6 h-6 text-[var(--c-ink)]" strokeWidth={3} />
    </button>
  );
}
