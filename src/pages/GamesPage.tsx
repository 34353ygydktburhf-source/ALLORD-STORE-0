import React, { useState, useEffect } from "react";
import { Heart, Search, Filter, ArrowUpRight, ArrowLeft, Gamepad2, Languages, Loader2, CheckCircle, Flame, Star, Trophy, Sparkles } from "lucide-react";
import { useGames } from "@/components/ControlledChaos/GamesContext";
import { useSettings } from "@/components/ControlledChaos/SettingsContext";
import { GlobalStyles } from "@/components/ControlledChaos/GlobalStyles";
import { BrutalButton } from "@/components/ControlledChaos/BrutalButton";
import { Link } from "react-router-dom";
import { slugify } from "@/pages/GameDetailPage";
import { useLang } from "@/components/ControlledChaos/LangContext";
import { useWallet } from "@/components/ControlledChaos/WalletContext";
import { GemIcon } from "@/components/ControlledChaos/GemIcon";
import { useLogin } from "@/components/ControlledChaos/LoginContext";

type Category = "all" | "mobile" | "pc";

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const { lang, toggleLang, t } = useLang();
  const { games } = useGames();
  const { settings } = useSettings();
  const { balance } = useWallet();
  const { isLoggedIn } = useLogin();
  const [favorites, setFavorites] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("al-lord-favorites") || "[]"); } catch { return []; }
  });

  const [orderCheck, setOrderCheck] = useState<{isOpen: boolean, game: string, step: "checking"|"success"}>({
    isOpen: false,
    game: "",
    step: "checking"
  });

  const handleDirectOrder = (e: React.MouseEvent, gameName: string) => {
    e.preventDefault();
    setOrderCheck({ isOpen: true, game: gameName, step: "checking" });
    
    setTimeout(() => {
      setOrderCheck(prev => ({ ...prev, step: "success" }));
      setTimeout(() => {
        const userContact = localStorage.getItem("user_contact") || (lang === "ar" ? "زائر" : "Guest");
        const msg = lang === "ar" 
          ? `مرحباً، أريد شحن لعبة ${gameName} بشكل مباشر. اسم الحساب في الموقع: ${userContact}`
          : `Hello, I want to top up ${gameName} directly. My account contact: ${userContact}`;
        window.open(`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank");
        setOrderCheck(prev => ({ ...prev, isOpen: false }));
      }, 1500);
    }, 2000);
  };

  useEffect(() => {
    localStorage.setItem("al-lord-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (name: string) => {
    setFavorites((prev) => prev.includes(name) ? prev.filter((f) => f !== name) : [...prev, name]);
  };

  const filtered = games.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "all" || g.category === category;
    return matchSearch && matchCategory;
  });

  const categories: { label: string; value: Category }[] = [
    { label: "All Games", value: "all" },
    { label: "Mobile", value: "mobile" },
    { label: "PC / Console", value: "pc" },
  ];

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen" style={{ backgroundColor: "var(--c-bg)", color: "var(--c-ink)" }}>
        {/* Header */}
        <div className="border-b-4 border-[var(--c-ink)] px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm font-bold uppercase hover:text-[var(--c-orange)] transition-colors">
              <ArrowLeft className="w-5 h-5" /> {t("Back", "رجوع")}
            </Link>
            {/* Redundant mobile balance hidden per user request */}
            {isLoggedIn && (
              <Link 
                to="/buy-gems" 
                className="hidden flex-row items-center gap-1 border-2 px-1.5 py-1 transition-all text-xs font-black cursor-pointer bg-[#b084ff] text-black border-black shadow-[2px_2px_0px_#000]"
              >
                 <span>{balance}</span>
                 <GemIcon size={14} />
              </Link>
            )}
            <div className="hidden md:flex items-center gap-2" dir="ltr">
              <Gamepad2 className="w-6 h-6 text-[var(--c-lime)]" />
              <span className="text-2xl font-black uppercase">AL LORD STORE</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleLang} className="flex items-center gap-1 hover:text-[var(--c-lime)] transition-colors cursor-pointer text-sm font-bold uppercase">
              <Languages className="w-4 h-4" />
              {lang === "en" ? "عربي" : "EN"}
            </button>
            {isLoggedIn && (
              <Link 
                to="/buy-gems" 
                className="hidden md:flex flex-row items-center gap-2 border-2 px-2.5 py-1 transition-all text-sm font-black hover:-translate-y-0.5 cursor-pointer bg-[#b084ff] text-black border-black shadow-[2px_2px_0px_#000] hover:shadow-[4px_4px_0px_#000]"
              >
                 <span>{balance.toLocaleString()}</span>
                 <GemIcon size={16} />
              </Link>
            )}
            <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
              <BrutalButton>{t("Order Now", "اطلب الآن")}</BrutalButton>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-black uppercase mb-8">
            <span className="font-marker text-[var(--c-orange)]">All</span> Games
          </h1>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 opacity-50" />
              <input
                type="text"
                placeholder={t("Search games...", "ابحث عن اللعبة...")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full border-4 border-[var(--c-ink)] ${lang === "ar" ? "pr-12 pl-4" : "px-12"} py-3 text-lg font-bold uppercase bg-transparent focus:outline-none focus:border-[var(--c-orange)] transition-colors`}
              />
            </div>

            {/* Category Filters */}
            <div className="flex gap-2">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`px-6 py-3 border-4 border-[var(--c-ink)] text-sm font-black uppercase transition-all ${
                    category === c.value
                      ? "bg-[var(--c-lime)] translate-x-1 translate-y-1"
                      : "hover:bg-[var(--c-lime)] hover:translate-x-1 hover:translate-y-1"
                  }`}
                >
                  <Filter className="w-4 h-4 inline mr-2" />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm font-bold uppercase tracking-widest mb-8 opacity-50">
            {lang === "ar" 
              ? `${filtered.length} لعبة وجدت ${favorites.length > 0 ? ` • ${favorites.length} بالمفضلة` : ""}`
              : `${filtered.length} ${filtered.length === 1 ? "game" : "games"} found${favorites.length > 0 ? ` • ${favorites.length} favorites` : ""}`
            }
          </p>

          {/* Games Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((g, i) => (
              <div key={i} className="group relative">
                {/* Shadow */}
                <div className={`absolute inset-0 ${g.color} translate-x-3 translate-y-3 border-4 border-[var(--c-ink)]`} />

                {/* Card */}
                <div
                  className={`relative ${g.color} border-4 border-[var(--c-ink)] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300`}
                >
                  {/* Image */}
                  <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${g.image})` }}>
                    <div className="absolute inset-0 bg-black/30" />
                    <button
                      onClick={() => toggleFavorite(g.name)}
                      className="absolute top-4 right-4 w-10 h-10 bg-[var(--c-bg)] border-2 border-[var(--c-ink)] flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Heart
                        className={`w-5 h-5 ${favorites.includes(g.name) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </button>
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[var(--c-ink)] text-[var(--c-bg)] text-xs font-bold uppercase transition-transform group-hover:scale-110">
                      {g.cat}
                    </span>
                    {g.discount != null && g.discount > 0 && (
                      <div className="absolute top-0 left-0 z-20 pointer-events-none -translate-x-2 -translate-y-2">
                        <div className="bg-red-600 text-white flex flex-col items-center justify-center px-4 py-2 border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,0.3)] relative min-w-[75px]">
                          <span className="text-[10px] font-black tracking-tighter leading-none mb-1 opacity-80">{t("SALE", "خصم")}</span>
                          <span className="text-2xl font-black leading-none">-{g.discount}%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-3xl font-black uppercase mb-2">{g.name}</h3>
                    <p className="text-sm mb-4 opacity-80">{t(g.desc, g.descAr || g.desc)}</p>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {g.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 border-2 border-[var(--c-ink)] text-xs font-bold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        to={`/game/${slugify(g.name)}`}
                        className="flex-1 bg-[var(--c-ink)] text-[var(--c-bg)] px-4 py-3 text-center text-sm font-bold uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                      >
                        {t("Top Up Now", "اشحن الآن")} <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={(e) => handleDirectOrder(e, g.name)}
                        className="border-4 border-[var(--c-ink)] px-4 py-3 text-sm font-bold uppercase hover:bg-[var(--c-ink)] hover:text-[var(--c-bg)] transition-colors text-center shrink-0 flex items-center justify-center cursor-pointer"
                      >
                        {t("Direct Order", "طلب مباشر")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-4xl font-black uppercase mb-4">{t("No games found", "لم يتم إيجاد اللعبة")}</p>
              <p className="text-lg opacity-50">{t("Try a different search or category", "جرب بحث مختلف أو غيّر التصنيف")}</p>
            </div>
          )}
        </div>
      </div>

      {/* Verification Modal */}
      {orderCheck.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-sm mx-auto animate-in fade-in zoom-in duration-300">
            {/* Shadow */}
            <div className="absolute inset-0 bg-[var(--c-orange)] translate-x-3 translate-y-3 border-4 border-[var(--c-ink)]" />
            
            <div className="relative border-4 border-[var(--c-ink)] p-8 text-center flex flex-col items-center justify-center min-h-[250px]" style={{ backgroundColor: "var(--c-bg)" }}>
              {orderCheck.step === "checking" ? (
                <>
                  <Loader2 className="w-16 h-16 text-[var(--c-ink)] animate-spin mb-6" />
                  <h3 className="text-xl font-black uppercase mb-2 text-[var(--c-ink)]" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
                    {t("Fetching Account Details...", "جاري جلب بيانات الحساب...")}
                  </h3>
                  <p className="text-sm font-bold opacity-70 text-[var(--c-ink)]" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
                    {t("Please wait while we prepare your request for", "يرجى الانتظار بينما نجهز طلبك لـ")} <br/>
                    <span className="text-[var(--c-purple)] font-black text-lg">{orderCheck.game}</span>
                  </p>
                </>
              ) : (
                <>
                  <CheckCircle className="w-16 h-16 text-[var(--c-lime)] mb-6 animate-in zoom-in duration-300" />
                  <h3 className="text-xl font-black uppercase mb-2 text-[var(--c-ink)]" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
                    {t("Account Fetched Successfully!", "تم استرجاع بيانات الحساب بنجاح!")}
                  </h3>
                  <p className="text-sm font-bold opacity-70 text-[var(--c-ink)]" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
                    {t("Redirecting you to WhatsApp...", "جاري تحويلك للمحادثة...")}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
