import React, { useState, useEffect } from "react";
import { Heart, Search, Filter, ArrowUpRight, ArrowLeft, Gamepad2, Languages, Loader2, CheckCircle } from "lucide-react";
import { GAMES_DATA } from "@/components/ControlledChaos/StickyWorks";
import { GlobalStyles } from "@/components/ControlledChaos/GlobalStyles";
import { BrutalButton } from "@/components/ControlledChaos/BrutalButton";
import { Link } from "react-router-dom";
import { slugify } from "@/pages/GameDetailPage";
import { useLang } from "@/components/ControlledChaos/LangContext";

type Category = "all" | "mobile" | "pc";

export default function GamesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const { lang, toggleLang, t } = useLang();
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
        window.open(`https://wa.me/201063006506?text=${encodeURIComponent(msg)}`, "_blank");
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

  const filtered = GAMES_DATA.filter((g) => {
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
            <a href="https://wa.me/201063006506" target="_blank" rel="noopener noreferrer">
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
                  className={`relative ${g.color} border-4 border-[var(--c-ink)] overflow-hidden group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300`}
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
                    <span className="absolute top-4 left-4 px-3 py-1 bg-[var(--c-ink)] text-[var(--c-bg)] text-xs font-bold uppercase">
                      {g.cat}
                    </span>
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
