import React, { useState, useEffect } from 'react';
import { useLang } from './LangContext';
import { Gamepad2, UserPlus, Fingerprint, KeyRound, X, Heart } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrutalFlag } from './BrutalFlag';
import { useSettings } from './SettingsContext';

const NOTIFICATIONS_AR = [
  { type: 'update', user: 'المطور', action: 'قام لتوّه', item: 'بتخفيض أسعار', game: 'بعض الباقات', method: 'تحديث النظام', icon: Gamepad2, color: '#ff5e00' },
  { type: 'purchase', user: 'عبدالله', action: 'قام بشحن', item: 'حزمة 60 شدة', game: 'PUBG Mobile', method: 'عبر الـ ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'ياسمين', action: 'قامت بشحن', item: 'Battle Pass', game: 'Call of Duty', method: 'بالحساب', icon: KeyRound, color: '#b084ff' },
  { type: 'join', user: 'سليمان', action: 'انضم إلينا!', item: 'وأصبح عضواً في الموقع', game: '', method: '', icon: UserPlus, color: '#ff5e00' },
  { type: 'purchase', user: 'أحمد', action: 'قام بشحن', item: 'عضوية أسبوعية', game: 'Free Fire', method: 'عبر الـ ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'زين', action: 'قام بشحن', item: '800 Robux', game: 'Roblox', method: 'بالحساب', icon: KeyRound, color: '#b084ff' },
  { type: 'join', user: 'مريم', action: 'سجلت للتو!', item: 'وحصلت على مكافأة الترحيب', game: '', method: '', icon: UserPlus, color: '#ff5e00' },
  { type: 'purchase', user: 'عمر', action: 'قام بشحن', item: '1040 كوينز', game: 'eFootball PES', method: 'عبر الـ ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'سارة', action: 'قامت بشراء', item: '325 شدة', game: 'PUBG Mobile', method: 'عبر الـ ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'مصطفى', action: 'الآن طلب', item: '520 مجوهرة', game: 'Free Fire', method: 'عبر الـ ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'نور', action: 'قامت بشحن', item: '420 CP', game: 'Call of Duty', method: 'بالحساب', icon: KeyRound, color: '#b084ff' },
  { type: 'join', user: 'علي', action: 'أنشأ حساباً!', item: 'ويستعد لأول طلب شحن له', game: '', method: '', icon: UserPlus, color: '#ff5e00' },
  { type: 'purchase', user: 'فاطمة', action: 'قامت بطلب', item: '1700 Robux', game: 'Roblox', method: 'بالحساب', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'محمود', action: 'قام بشحن', item: '660 شدة', game: 'PUBG Mobile', method: 'عبر الـ ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'ليلى', action: 'حصلت على', item: '2130 كوينز', game: 'eFootball PES', method: 'بالحساب', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'كريم', action: 'قام بتفعيل', item: 'العضوية الشهرية', game: 'Free Fire', method: 'عبر الـ ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'يوسف', action: 'طلب لتوه', item: 'Royal Pass', game: 'PUBG Mobile', method: 'عبر الـ ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'join', user: 'ندى', action: 'انضمت للمتجر!', item: 'شاهد الألعاب المتاحة', game: '', method: '', icon: UserPlus, color: '#ff5e00' },
  { type: 'purchase', user: 'خالد', action: 'شحن حسابه بـ', item: 'حزمة كريستال', game: 'Genshin Impact', method: 'بالحساب', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'شروق', action: 'قامت بشراء', item: '800 CP', game: 'Call of Duty', method: 'بالحساب', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'حسن', action: 'شحن', item: 'Premium 450', game: 'Roblox', method: 'بالحساب', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'آية', action: 'حصلت على', item: '1060 مجوهرة', game: 'Free Fire', method: 'عبر الـ ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'سامي', action: 'قام بشحن', item: '1800 شدة', game: 'PUBG Mobile', method: 'بالحساب', icon: KeyRound, color: '#b084ff' },
  { type: 'join', user: 'دينا', action: 'أنشأت حساباً!', item: 'أهلاً بك دينا في اللورد!', game: '', method: '', icon: UserPlus, color: '#ff5e00' },
  { type: 'purchase', user: 'طارق', action: 'قام بشحن', item: '520 كوينز', game: 'eFootball PES', method: 'عبر الـ ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'منى', action: 'اضافت لمحفظتها', item: 'حزمة المبتدئين', game: 'Genshin Impact', method: 'بالحساب', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'زياد', action: 'شحن', item: '100 مجوهرة', game: 'Free Fire', method: 'عبر الـ ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'حسين', action: 'طَلب', item: '400 Robux', game: 'Roblox', method: 'بالحساب', icon: KeyRound, color: '#b084ff' },
  { type: 'support', user: 'اللورد', action: 'يدعم دائماً', item: 'القضية الفلسطينية', game: 'فلسـطين حرة', method: 'نحن معكم', icon: Heart, color: '#f00' },
  { type: 'support', user: 'فلسطين حرة', action: 'ستبقى دائماً', item: 'في قلوبنا', game: 'نحن معكم', method: 'دعم مطلق', icon: Heart, color: '#f00' },
  { type: 'support', user: 'اللورد', action: 'يدعم', item: 'المجتمع العربي بالكامل', game: 'كلنا واحد', method: 'أمة واحدة', icon: Heart, color: '#ff5e00' },
  { type: 'support', user: 'رسالة تضامن', action: 'من المتجر', item: 'دعم لا ينقطع', game: 'لأهلنا في فلسطين', method: 'قلب واحد', icon: Heart, color: '#f00' }
];

const NOTIFICATIONS_EN = [
  { type: 'update', user: 'Developer', action: 'just updated', item: 'new discounts', game: 'some packages', method: 'System Update', icon: Gamepad2, color: '#ff5e00' },
  { type: 'purchase', user: 'Abdullah', action: 'topped up', item: '60 UC Package', game: 'PUBG Mobile', method: 'via ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'Yasmine', action: 'topped up', item: 'Battle Pass', game: 'Call of Duty', method: 'via Account', icon: KeyRound, color: '#b084ff' },
  { type: 'join', user: 'Soliman', action: 'just joined!', item: 'and became a new member', game: '', method: '', icon: UserPlus, color: '#ff5e00' },
  { type: 'purchase', user: 'Ahmed', action: 'topped up', item: 'Weekly Membership', game: 'Free Fire', method: 'via ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'Zain', action: 'topped up', item: '800 Robux', game: 'Roblox', method: 'via Account', icon: KeyRound, color: '#b084ff' },
  { type: 'join', user: 'Mariam', action: 'registered!', item: 'and got a welcome bonus', game: '', method: '', icon: UserPlus, color: '#ff5e00' },
  { type: 'purchase', user: 'Omar', action: 'topped up', item: '1040 Coins', game: 'eFootball PES', method: 'via ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'Sarah', action: 'bought', item: '325 UC', game: 'PUBG Mobile', method: 'via ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'Mustafa', action: 'ordered', item: '520 Diamonds', game: 'Free Fire', method: 'via ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'Nour', action: 'topped up', item: '420 CP', game: 'Call of Duty', method: 'via Account', icon: KeyRound, color: '#b084ff' },
  { type: 'join', user: 'Ali', action: 'created an account!', item: 'getting ready to top up', game: '', method: '', icon: UserPlus, color: '#ff5e00' },
  { type: 'purchase', user: 'Fatma', action: 'ordered', item: '1700 Robux', game: 'Roblox', method: 'via Account', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'Mahmoud', action: 'topped up', item: '660 UC', game: 'PUBG Mobile', method: 'via ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'Laila', action: 'received', item: '2130 Coins', game: 'eFootball PES', method: 'via Account', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'Kareem', action: 'activated', item: 'Monthly Sub', game: 'Free Fire', method: 'via ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'Youssef', action: 'ordered', item: 'Royal Pass', game: 'PUBG Mobile', method: 'via ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'join', user: 'Nada', action: 'joined the store!', item: 'exploring our games', game: '', method: '', icon: UserPlus, color: '#ff5e00' },
  { type: 'purchase', user: 'Khaled', action: 'topped up', item: 'Crystal Pack', game: 'Genshin Impact', method: 'via Account', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'Shorouk', action: 'bought', item: '800 CP', game: 'Call of Duty', method: 'via Account', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'Hassan', action: 'topped up', item: 'Premium 450', game: 'Roblox', method: 'via Account', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'Aya', action: 'received', item: '1060 Diamonds', game: 'Free Fire', method: 'via ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'Samy', action: 'topped up', item: '1800 UC', game: 'PUBG Mobile', method: 'via Account', icon: KeyRound, color: '#b084ff' },
  { type: 'join', user: 'Dina', action: 'created an account!', item: 'welcome Dina to the Lord!', game: '', method: '', icon: UserPlus, color: '#ff5e00' },
  { type: 'purchase', user: 'Tarek', action: 'topped up', item: '520 Coins', game: 'eFootball PES', method: 'via ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'Mona', action: 'added', item: 'Starter Pack', game: 'Genshin Impact', method: 'via Account', icon: KeyRound, color: '#b084ff' },
  { type: 'purchase', user: 'Ziad', action: 'topped up', item: '100 Diamonds', game: 'Free Fire', method: 'via ID', icon: Fingerprint, color: '#ccff00' },
  { type: 'purchase', user: 'Hussein', action: 'ordered', item: '400 Robux', game: 'Roblox', method: 'via Account', icon: KeyRound, color: '#b084ff' },
  { type: 'support', user: 'AL LORD', action: 'always supports', item: 'Palestinian Cause', game: 'Free Palestine', method: 'Solidarity', icon: Heart, color: '#f00' },
  { type: 'support', user: 'Free Palestine', action: 'will always be', item: 'in our hearts', game: 'We are with you', method: 'Full Support', icon: Heart, color: '#f00' },
  { type: 'support', user: 'AL LORD', action: 'supports', item: 'Entire Arab Community', game: 'Global Arab Unity', method: 'One Nation', icon: Heart, color: '#ff5e00' },
  { type: 'support', user: 'Solidarity', action: 'from the store', item: 'Unstoppable Support', game: 'For our people in PS', method: 'One Heart', icon: Heart, color: '#f00' }
];

import { useLocation } from 'react-router-dom';

export function LivePurchases() {
  const location = useLocation();
  const { lang, t } = useLang();
  const { settings } = useSettings();
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = React.useRef(0); // Sequence step: 0 to 4 using Ref to avoid stale closure
  const prevIndex = React.useRef(-1);
  const isRtl = lang === "ar";

  if (!settings.notificationsEnabled) return null;

  // Sequence: Recharge (purchase), Palestine (support), Update (update), Recharge, Recharge
  const sequence = ['purchase', 'support', 'update', 'purchase', 'purchase'];

  useEffect(() => {
    let hideTimer: any;

    const showNotification = () => {
      // Check if any modal is open to pause notifications
      const isModalOpen = 
        document.querySelector('.fixed.inset-0') !== null || // Standard modal backdrops
        document.querySelector('.bg-black\\/60') !== null || // Game detail modal backdrop
        document.querySelector('.bg-black\\/80') !== null || // Auth modal backdrops
        document.querySelector('[role="dialog"]') !== null || // Dialogs
        document.querySelector('.slide-in-from-bottom-5') !== null || // Support Chat Widget
        document.body.style.overflow === 'hidden'; // Scroll locks

      if (isModalOpen) {
        setIsVisible(false); // ensure hidden if already showing
        return; // Skip cycle
      }

      const type = sequence[stepRef.current];
      const activeDataList = isRtl ? NOTIFICATIONS_AR : NOTIFICATIONS_EN;
      
      // Filter by type
      const possibleIndices = activeDataList
        .map((n, i) => n.type === type ? i : -1)
        .filter(i => i !== -1);

      if (possibleIndices.length === 0) return;

      // Pick random from filtered list
      let nextIndex = possibleIndices[Math.floor(Math.random() * possibleIndices.length)];
      
      // Try to avoid repeating same exact notification if possible
      if (nextIndex === prevIndex.current && possibleIndices.length > 1) {
        nextIndex = possibleIndices.find(i => i !== prevIndex.current) || nextIndex;
      }
      
      prevIndex.current = nextIndex;
      setCurrentIndex(nextIndex);
      setIsVisible(true);
      
      // Move to next step in sequence using Ref
      stepRef.current = (stepRef.current + 1) % sequence.length;
      
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 2500);
    };

    // Show first one quickly (1.5 seconds after load)
    const initialTimer = setTimeout(() => {
      showNotification();
    }, 1500);

    // Then repeat less frequently (2.5s visible + 12.5s invisible)
    const intervalTimer = setInterval(() => {
      showNotification();
    }, 15000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(hideTimer);
      clearInterval(intervalTimer);
    };
  }, [isRtl]); // added dependency so language changes behave nicely

  if (currentIndex === -1 || location.pathname === '/profile' || location.pathname === '/community') return null;

  const activeDataList = isRtl ? NOTIFICATIONS_AR : NOTIFICATIONS_EN;
  const data = activeDataList[currentIndex];
  const Icon = data.icon;

  // Opposite side of FaqChatWidget (which is bottom-6 left-6 in RTL, right-6 in LTR)
  // To prevent overlap on small screens, raise it higher on mobile (bottom-24)
  const positionClasses = isRtl ? "bottom-24 right-4 md:bottom-6 md:right-6" : "bottom-24 left-4 md:bottom-6 md:left-6";

  return (
    <div className={`fixed z-[90] ${positionClasses} pointer-events-none`} dir={isRtl ? "rtl" : "ltr"}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="pointer-events-auto flex items-center gap-3 bg-[#fffbf0] border-4 border-[#101010] p-3 shadow-[6px_6px_0px_#101010] relative w-[280px] sm:w-[320px]"
          >
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute -top-3 -right-3 w-6 h-6 bg-[#101010] text-[#fffbf0] flex items-center justify-center border-2 border-white hover:bg-[#ff5e00] hover:scale-110 transition-transform z-10"
            >
              <X className="w-3 h-3" />
            </button>
            
            <div 
              className="w-10 h-10 border-2 border-[#101010] shrink-0 flex items-center justify-center shadow-[2px_2px_0px_#101010] overflow-hidden rounded-full bg-white" 
            >
              {data.type === 'support' ? (
                <BrutalFlag code="ps" size="w-full h-full" className="border-0 shadow-none scale-125" />
              ) : (
                <Icon className="w-5 h-5 text-[#101010]" />
              )}
            </div>

            <div className={`flex flex-col flex-1 overflow-hidden ${isRtl ? "text-right" : "text-left"}`}>
              {data.type === 'purchase' ? (
                <>
                  <p className="text-[11px] font-black uppercase text-[#101010] leading-none mb-1 truncate">
                    <span className="text-[#b084ff]">{data.user}</span> {data.action} <span className="font-sans opacity-70">({data.method})</span>
                  </p>
                  <p className="text-[13px] font-black uppercase text-[#ff5e00] leading-none truncate">
                    {data.item}
                  </p>
                  <p className="text-[10px] font-bold uppercase opacity-60 truncate">
                    {t("in", "في")} {data.game}
                  </p>
                </>
              ) : data.type === 'support' ? (
                <>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[12px] font-black uppercase text-[#101010] leading-none truncate">
                      {data.user} {data.action}
                    </p>
                    <BrutalFlag code="ps" size="w-4 h-4" className="border-1 shadow-none" />
                  </div>
                  <p className="text-[11px] font-black uppercase text-red-600 leading-none truncate">
                    {data.item}
                  </p>
                  <p className="text-[10px] font-bold uppercase opacity-60 truncate">
                    {data.game}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[12px] font-black uppercase text-[#101010] leading-none mb-1 truncate">
                    <span className="text-[#b084ff]">{data.user}</span> {data.action}
                  </p>
                  <p className="text-[11px] font-bold uppercase text-[#ff5e00] leading-none truncate">
                    {data.item}
                  </p>
                </>
              )}
            </div>
            
            {/* Small subtle time "just now" text */}
            <span className="absolute bottom-1 right-2 left-auto text-[8px] font-bold opacity-40 uppercase" style={{ [isRtl ? "left" : "right"]: "8px", [isRtl ? "right" : "auto"]: "auto" }}>
              {t("Just Now", "الآن")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
