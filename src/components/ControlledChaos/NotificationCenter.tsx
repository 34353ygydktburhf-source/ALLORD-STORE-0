import React from "react";
import { X, Bell, CheckCheck, Trash2, Info, CheckCircle, AlertTriangle, AlertCircle, Calendar, ArrowRight } from "lucide-react";
import { useNotifications, Notification } from "./NotificationContext";
import { useLang } from "./LangContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function NotificationCenter({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { notifications, markAsRead, markAllAsRead, clearAll, unreadCount } = useNotifications();
  const { t, lang } = useLang();
  const navigate = useNavigate();

  const handleNotifClick = (notif: Notification) => {
    markAsRead(notif.id);
    if (notif.targetPage) {
      navigate(notif.targetPage);
      onClose();
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error": return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getColorClass = (type: string) => {
    switch (type) {
      case "success": return "border-green-500/30";
      case "error": return "border-red-500/30";
      case "warning": return "border-orange-500/30";
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md mx-auto"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {/* Brutalist Shadow */}
            <div className="absolute inset-0 bg-[var(--c-purple)] translate-x-3 translate-y-3 border-4 border-black" />

            {/* Main Content Box */}
            <div className={`relative bg-[#fffbf0] border-4 border-black flex flex-col max-h-[85vh] overflow-hidden`}>
              {/* Header */}
              <div className="p-6 border-b-8 border-black bg-black text-white flex items-center justify-between relative overflow-hidden shrink-0">
                 {/* Pattern Overlay */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:10px_10px]" />
                 
                <div className="flex items-center gap-4 relative z-10">
                  <div className="relative p-2 bg-[var(--c-lime)] border-2 border-white rounded-none rotate-3">
                    <Bell className="w-5 h-5 md:w-6 md:h-6 text-black animate-swing" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 md:w-6 md:h-6 bg-red-600 text-[9px] md:text-[10px] font-black flex items-center justify-center rounded-full border-2 border-black animate-bounce shrink-0">
                         {unreadCount}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none mb-1">
                      {t("Notifications", "الإشعارات")}
                    </h3>
                    <p className="text-[9px] md:text-[10px] font-bold text-[var(--c-lime)] uppercase tracking-widest">{t("Live Feed Activated", "البث المباشر نشط")}</p>
                  </div>
                </div>

                <button 
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center border-4 border-white hover:bg-[var(--c-lime)] hover:text-black hover:border-black transition-all rotate-45 group shrink-0"
                >
                  <X className="w-6 h-6 -rotate-45 group-hover:scale-125" />
                </button>
              </div>

              {/* Actions Bar - Brutalist Style */}
              {notifications.length > 0 && (
                <div className="grid grid-cols-2 border-b-4 border-black shrink-0">
                  <button 
                    onClick={markAllAsRead}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-[10px] md:text-[11px] font-black uppercase bg-white border-r-4 border-black hover:bg-[var(--c-lime)] transition-colors active:bg-black active:text-white"
                  >
                    <CheckCheck className="w-4 h-4" />
                    {t("Read All", "تحديد الكل")}
                  </button>
                  <button 
                    onClick={clearAll}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-[10px] md:text-[11px] font-black uppercase bg-white hover:bg-red-500 hover:text-white transition-colors active:bg-black"
                  >
                    <Trash2 className="w-4 h-4" />
                    {t("Clear", "مسح")}
                  </button>
                </div>
              )}

              {/* List */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar space-y-4 bg-white/30 backdrop-blur-sm">
                {notifications.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-20">
                     <div className="w-16 h-16 md:w-20 md:h-20 bg-black/5 rounded-full flex items-center justify-center mb-6 border-4 border-dashed border-black/20">
                        <Bell className="w-8 h-8 md:w-10 md:h-10 opacity-20" />
                     </div>
                     <p className="font-black uppercase text-[10px] md:text-xs tracking-widest opacity-40">{t("No new updates", "لا توجد تحديثات جديدة")}</p>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {notifications.map((notif, idx) => (
                      <motion.div 
                        key={notif.id}
                        layout
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => handleNotifClick(notif)}
                        className={`group relative p-4 md:p-5 border-4 border-black transition-all cursor-pointer overflow-hidden ${notif.isRead ? 'bg-white/80 grayscale opacity-60' : 'bg-white shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none'}`}
                      >
                        {!notif.isRead && (
                          <div className={`absolute top-0 ${lang === 'ar' ? 'left-0' : 'right-0'} w-1 h-full bg-[var(--c-lime)]`} />
                        )}
                        
                        <div className="flex gap-4">
                          <div className={`mt-1 shrink-0 w-10 h-10 md:w-12 md:h-12 border-4 border-black flex items-center justify-center ${notif.isRead ? 'bg-gray-100' : 'bg-black text-white group-hover:bg-[var(--c-lime)] group-hover:text-black transition-colors'}`}>
                            {getIcon(notif.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                             <div className="flex justify-between items-start mb-2 gap-2">
                               <div className={`px-2 py-0.5 text-[7px] md:text-[8px] font-black uppercase border-2 border-black inline-block whitespace-nowrap ${notif.isRead ? 'bg-gray-200' : 'bg-[var(--c-lime)]'}`}>
                                  {notif.type}
                               </div>
                               <div className="flex items-center gap-1.5 text-[9px] md:text-[10px] font-black opacity-30 uppercase whitespace-nowrap">
                                  <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                  {new Date(notif.timestamp).toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                               </div>
                             </div>
                             
                            <h4 className="font-black text-xs md:text-sm uppercase leading-tight mb-1 truncate group-hover:text-[var(--c-purple)] transition-colors">{notif.title}</h4>
                            <p className="text-[10px] md:text-xs font-bold leading-snug opacity-80 line-clamp-2">{notif.message}</p>
                            
                            {notif.targetPage && (
                              <div className="mt-4 pt-3 border-t-2 border-black/5 flex justify-end">
                                 <button className="text-[9px] md:text-[10px] font-black uppercase flex items-center gap-1 bg-black text-white px-3 py-1.5 hover:bg-[var(--c-lime)] hover:text-black transition-colors">
                                    {t("Open", "فتح")} <ArrowRight className="w-3 h-3" />
                                 </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 md:p-6 border-t-8 border-black bg-white flex flex-col items-center gap-2 shrink-0">
                <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] opacity-30">AL LORD SECURE NOTIFS</p>
                <div className="w-10 md:w-12 h-1 md:h-1.5 bg-black" />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
