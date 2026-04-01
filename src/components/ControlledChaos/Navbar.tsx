import React from "react";
import { Gamepad2, Languages, LogIn, LogOut } from "lucide-react";
import { BrutalButton } from "./BrutalButton";
import { useLang } from "./LangContext";
import { useLogin } from "./LoginContext";
import { Link } from "react-router-dom";
import { NavProfileButton } from "./AccountSystem";

export function Navbar() {
  const { lang, toggleLang, t } = useLang();
  const { openLogin, isLoggedIn, openLogoutConfirm } = useLogin();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-difference">
        <div className="flex items-center gap-2" dir="ltr">
          <Gamepad2 className="w-8 h-8 text-[var(--c-lime)]" />
          <span className="text-xl font-black uppercase text-white">AL LORD STORE</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-white">
          <a href="#games" className="hover:line-through">{t("Games", "الألعاب")}</a>
          <a href="#about" className="hover:line-through">{t("About", "عنّا")}</a>
          <a href="#reviews" className="hover:line-through">{t("Reviews", "آراء العملاء")}</a>
          <a href="#contact" className="hover:line-through">{t("Contact", "تواصل")}</a>
          <Link to="/games" className="hover:line-through">{t("All Games", "كل الألعاب")}</Link>
          <button onClick={toggleLang} className="flex items-center gap-1 hover:text-[var(--c-lime)] transition-colors cursor-pointer">
            <Languages className="w-4 h-4" />
            {lang === "en" ? "عربي" : "EN"}
          </button>
          {isLoggedIn ? (
            <button onClick={openLogoutConfirm} className="flex items-center gap-1 bg-red-600 text-white px-3 py-1 text-xs font-black hover:bg-black hover:text-white transition-colors cursor-pointer ml-4 border-2 border-black">
              <LogOut className="w-4 h-4" />
              {t("LOGOUT", "خروج")}
            </button>
          ) : (
            <button onClick={openLogin} className="flex items-center gap-1 bg-white text-black px-3 py-1 text-xs font-black hover:bg-[var(--c-lime)] transition-colors cursor-pointer ml-4 border-2 border-black">
              <LogIn className="w-4 h-4" />
              {t("LOGIN", "دخول")}
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={isLoggedIn ? openLogoutConfirm : openLogin} className="md:hidden text-white flex items-center gap-1 text-xs uppercase tracking-widest">
            {isLoggedIn ? <LogOut className="w-5 h-5 text-red-500" /> : <LogIn className="w-5 h-5" />}
          </button>
          <button onClick={toggleLang} className="md:hidden text-white flex items-center gap-1 text-xs uppercase tracking-widest">
            <Languages className="w-4 h-4" />
            {lang === "en" ? "عربي" : "EN"}
          </button>
          {/* Spacing for absolute Profile Button */}
          <div className="w-14 h-14 md:hidden" />
        </div>
      </nav>
      {/* Profile Button - Standalone (NOT Blended) to match Chat Widget perfectly */}
      <div className={`fixed top-4 ${lang === "ar" ? "left-6" : "right-6"} z-[60]`}>
        <NavProfileButton />
      </div>
    </>
  );
}
