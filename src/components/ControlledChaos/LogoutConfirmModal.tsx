import React from "react";
import { X, LogOut, AlertTriangle } from "lucide-react";
import { useLogin } from "./LoginContext";
import { useLang } from "./LangContext";

export function LogoutConfirmModal() {
  const { isLogoutConfirmOpen, closeLogoutConfirm, logout } = useLogin();
  const { t } = useLang();

  if (!isLogoutConfirmOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeLogoutConfirm}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm mx-auto animate-in fade-in zoom-in duration-300">
        {/* Shadow */}
        <div className="absolute inset-0 bg-[var(--c-orange)] translate-x-3 translate-y-3 border-4 border-[var(--c-ink)]" />

        <div className="relative border-4 border-[var(--c-ink)] p-8" style={{ backgroundColor: "var(--c-bg)", color: "var(--c-ink)" }}>
          {/* Close */}
          <button
            onClick={closeLogoutConfirm}
            className="absolute top-4 right-4 w-8 h-8 border-2 border-[var(--c-ink)] flex items-center justify-center hover:bg-[var(--c-ink)] hover:text-[var(--c-bg)] transition-colors z-30"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 bg-[var(--c-orange)] border-4 border-[var(--c-ink)] flex items-center justify-center rotate-3 shadow-[4px_4px_0px_var(--c-ink)]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black uppercase leading-tight">
                {t("Wait! Leaving so soon?", "تمهل! هل ستغادرنا؟")}
              </h3>
              <p className="text-sm font-bold opacity-60 uppercase tracking-widest">
                {t("Are you sure you want to log out?", "هل أنت متأكد من تسجيل الخروج؟")}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full pt-4">
              <button
                onClick={logout}
                className="bg-[var(--c-ink)] text-[var(--c-bg)] px-4 py-3 font-black uppercase text-sm hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                {t("Yes, Logout", "نعم، خروج")}
              </button>
              <button
                onClick={closeLogoutConfirm}
                className="border-4 border-[var(--c-ink)] px-4 py-3 font-black uppercase text-sm hover:bg-[var(--c-lime)] transition-colors"
              >
                {t("No, Stay", "لا، البقاء")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
