import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Gamepad2, ShieldCheck, Zap, Headphones, Star, X, Send, Info, CreditCard, Clock, CheckCircle, Plus, Minus, Languages, Loader2, ChevronUp, ChevronDown } from "lucide-react";
import { GAMES_DATA } from "@/components/ControlledChaos/StickyWorks";
import { GlobalStyles } from "@/components/ControlledChaos/GlobalStyles";
import { BrutalButton } from "@/components/ControlledChaos/BrutalButton";
import { useLang } from "@/components/ControlledChaos/LangContext";

const WHATSAPP_NUMBER = "201063006506";

interface Package {
  name: string;
  price: string;
  popular?: boolean;
  image?: string;
}

// Package placeholder images - different visuals per tier
const PKG_IMAGES = [
  "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&q=80", // coins/gold
  "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&q=80", // treasure
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80", // abstract purple
  "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&q=80", // neon
  "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&q=80", // crystals
  "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400&q=80", // gems
];

const GAME_PACKAGES: Record<string, Package[]> = {
  "pubg-mobile": [
    { name: "60 UC", price: "25 جنيه", image: "https://i.pinimg.com/1200x/a1/e5/5c/a1e55cd5aaf0cc7ac32525adf4ff0506.jpg" },
    { name: "325 UC", price: "120 جنيه", image: "https://i.pinimg.com/1200x/a1/e5/5c/a1e55cd5aaf0cc7ac32525adf4ff0506.jpg" },
    { name: "660 UC", price: "230 جنيه", popular: true, image: "https://i.pinimg.com/1200x/a1/e5/5c/a1e55cd5aaf0cc7ac32525adf4ff0506.jpg" },
    { name: "1800 UC", price: "600 جنيه", image: "https://i.pinimg.com/1200x/a1/e5/5c/a1e55cd5aaf0cc7ac32525adf4ff0506.jpg" },
    { name: "3850 UC", price: "1200 جنيه", image: "https://i.pinimg.com/1200x/a1/e5/5c/a1e55cd5aaf0cc7ac32525adf4ff0506.jpg" },
    { name: "8100 UC", price: "2400 جنيه", image: "https://i.pinimg.com/1200x/a1/e5/5c/a1e55cd5aaf0cc7ac32525adf4ff0506.jpg" },
  ],
  "call-of-duty-mobile": [
    { name: "80 CP", price: "30 جنيه", image: "https://i.pinimg.com/736x/25/5b/42/255b42d170bcb6be7a9306d3e7534423.jpg" },
    { name: "400 CP", price: "140 جنيه", image: "https://i.pinimg.com/736x/25/5b/42/255b42d170bcb6be7a9306d3e7534423.jpg" },
    { name: "880 CP", price: "280 جنيه", popular: true, image: "https://i.pinimg.com/736x/25/5b/42/255b42d170bcb6be7a9306d3e7534423.jpg" },
    { name: "2400 CP", price: "750 جنيه", image: "https://i.pinimg.com/736x/25/5b/42/255b42d170bcb6be7a9306d3e7534423.jpg" },
    { name: "5000 CP", price: "1500 جنيه", image: "https://i.pinimg.com/736x/25/5b/42/255b42d170bcb6be7a9306d3e7534423.jpg" },
  ],
  "fortnite": [
    { name: "1000 V-Bucks", price: "200 جنيه", image: "https://i.pinimg.com/1200x/c1/01/e9/c101e952596d47d2b14bc8666a01d44a.jpg" },
    { name: "2800 V-Bucks", price: "500 جنيه", popular: true, image: "https://i.pinimg.com/1200x/c1/01/e9/c101e952596d47d2b14bc8666a01d44a.jpg" },
    { name: "5000 V-Bucks", price: "850 جنيه", image: "https://i.pinimg.com/1200x/c1/01/e9/c101e952596d47d2b14bc8666a01d44a.jpg" },
    { name: "13500 V-Bucks", price: "2000 جنيه", image: "https://i.pinimg.com/1200x/c1/01/e9/c101e952596d47d2b14bc8666a01d44a.jpg" },
  ],
  "Mobile Legends": [
    { name: "650 RP", price: "150 جنيه", image: "https://i.pinimg.com/1200x/d0/22/50/d02250140705fc8af43e18f17c69d31e.jpg" },
    { name: "1380 RP", price: "300 جنيه", popular: true, image: "https://i.pinimg.com/1200x/d0/22/50/d02250140705fc8af43e18f17c69d31e.jpg" },
    { name: "2800 RP", price: "580 جنيه", image: "https://i.pinimg.com/1200x/d0/22/50/d02250140705fc8af43e18f17c69d31e.jpg" },
    { name: "5000 RP", price: "1000 جنيه", image: "https://i.pinimg.com/1200x/d0/22/50/d02250140705fc8af43e18f17c69d31e.jpg" },
  ],
  "efootball-pes-mobile": [
    { name: "100 eFootball Coins", price: "50 جنيه", image: "https://i.pinimg.com/736x/0b/d8/d4/0bd8d422c8ee3a3c3610837e230d247b.jpg" },
    { name: "500 eFootball Coins", price: "240 جنيه", image: "https://i.pinimg.com/736x/0b/d8/d4/0bd8d422c8ee3a3c3610837e230d247b.jpg" },
    { name: "1000 eFootball Coins", price: "450 جنيه", popular: true, image: "https://i.pinimg.com/736x/0b/d8/d4/0bd8d422c8ee3a3c3610837e230d247b.jpg" },
    { name: "2100 eFootball Coins", price: "900 جنيه", image: "https://i.pinimg.com/736x/0b/d8/d4/0bd8d422c8ee3a3c3610837e230d247b.jpg" },
    { name: "Value Match Pass", price: "150 جنيه", image: "https://i.pinimg.com/736x/0b/d8/d4/0bd8d422c8ee3a3c3610837e230d247b.jpg" },
  ],
  "genshin-impact": [
    { name: "60 Genesis Crystals", price: "30 جنيه", image: "https://i.pinimg.com/736x/11/5b/34/115b34a5552d6c56fc1d7d1001b20800.jpg" },
    { name: "300 Genesis Crystals", price: "150 جنيه", image: "https://i.pinimg.com/736x/11/5b/34/115b34a5552d6c56fc1d7d1001b20800.jpg" },
    { name: "980 Genesis Crystals", price: "450 جنيه", popular: true, image: "https://i.pinimg.com/736x/11/5b/34/115b34a5552d6c56fc1d7d1001b20800.jpg" },
    { name: "1980 Genesis Crystals", price: "900 جنيه", image: "https://i.pinimg.com/736x/11/5b/34/115b34a5552d6c56fc1d7d1001b20800.jpg" },
    { name: "Welkin Moon", price: "120 جنيه", image: "https://i.pinimg.com/736x/11/5b/34/115b34a5552d6c56fc1d7d1001b20800.jpg" },
  ],
  "free-fire": [
    { name: "100 Diamonds", price: "20 جنيه", image: "https://i.pinimg.com/736x/f3/7d/21/f37d2191d9bc1cd979cb742b00d5ffae.jpg" },
    { name: "310 Diamonds", price: "55 جنيه", image: "https://i.pinimg.com/736x/f3/7d/21/f37d2191d9bc1cd979cb742b00d5ffae.jpg" },
    { name: "520 Diamonds", price: "100 جنيه", popular: true, image: "https://i.pinimg.com/736x/f3/7d/21/f37d2191d9bc1cd979cb742b00d5ffae.jpg" },
    { name: "1060 Diamonds", price: "200 جنيه", image: "https://i.pinimg.com/736x/f3/7d/21/f37d2191d9bc1cd979cb742b00d5ffae.jpg" },
    { name: "2180 Diamonds", price: "400 جنيه", image: "https://i.pinimg.com/736x/f3/7d/21/f37d2191d9bc1cd979cb742b00d5ffae.jpg" },
  ],
  "valorant": [
    { name: "475 VP", price: "120 جنيه", image: "https://i.pinimg.com/1200x/0b/d2/90/0bd29018298b5bb1ecc31f247e283587.jpg" },
    { name: "1000 VP", price: "240 جنيه", image: "https://i.pinimg.com/1200x/0b/d2/90/0bd29018298b5bb1ecc31f247e283587.jpg" },
    { name: "2050 VP", price: "470 جنيه", popular: true, image: "https://i.pinimg.com/1200x/0b/d2/90/0bd29018298b5bb1ecc31f247e283587.jpg" },
    { name: "3650 VP", price: "800 جنيه", image: "https://i.pinimg.com/1200x/0b/d2/90/0bd29018298b5bb1ecc31f247e283587.jpg" },
    { name: "5350 VP", price: "1150 جنيه", image: "https://i.pinimg.com/1200x/0b/d2/90/0bd29018298b5bb1ecc31f247e283587.jpg" },
  ],
  "roblox": [
    { name: "400 Robux", price: "120 جنيه", image: "https://i.pinimg.com/736x/ff/0d/d4/ff0dd41f3a2b13c7f098be411259a264.jpg" },
    { name: "800 Robux", price: "230 جنيه", popular: true, image: "https://i.pinimg.com/736x/ff/0d/d4/ff0dd41f3a2b13c7f098be411259a264.jpg" },
    { name: "1700 Robux", price: "460 جنيه", image: "https://i.pinimg.com/736x/ff/0d/d4/ff0dd41f3a2b13c7f098be411259a264.jpg" },
    { name: "4500 Robux", price: "1100 جنيه", image: "https://i.pinimg.com/736x/ff/0d/d4/ff0dd41f3a2b13c7f098be411259a264.jpg" },
  ],
  "clash-of-clans": [
    { name: "80 Gems", price: "25 جنيه", image: "https://i.pinimg.com/736x/f1/0a/d8/f10ad873ddc910a301dc46d835d8d762.jpg" },
    { name: "500 Gems", price: "120 جنيه", image: "https://i.pinimg.com/736x/f1/0a/d8/f10ad873ddc910a301dc46d835d8d762.jpg" },
    { name: "1200 Gems", price: "250 جنيه", popular: true, image: "https://i.pinimg.com/736x/f1/0a/d8/f10ad873ddc910a301dc46d835d8d762.jpg" },
    { name: "2500 Gems", price: "500 جنيه", image: "https://i.pinimg.com/736x/f1/0a/d8/f10ad873ddc910a301dc46d835d8d762.jpg" },
    { name: "Gold Pass", price: "130 جنيه", image: "https://i.pinimg.com/736x/f1/0a/d8/f10ad873ddc910a301dc46d835d8d762.jpg" },
  ],
  "fifa-ea-fc": [
    { name: "500 coins", price: "130 جنيه", image: "https://i.pinimg.com/1200x/e0/ea/a4/e0eaa49dc67ec8bbbd6924801d1d0c95.jpg" },
    { name: "1050 coins", price: "260 جنيه", image: "https://i.pinimg.com/1200x/e0/ea/a4/e0eaa49dc67ec8bbbd6924801d1d0c95.jpg" },
    { name: "2200 coins", price: "520 جنيه", popular: true, image: "https://i.pinimg.com/1200x/e0/ea/a4/e0eaa49dc67ec8bbbd6924801d1d0c95.jpg" },
    { name: "4600 coins", price: "1050 جنيه", image: "https://i.pinimg.com/1200x/e0/ea/a4/e0eaa49dc67ec8bbbd6924801d1d0c95.jpg" },
  ],
  "minecraft": [
    { name: "320 Minecoins", price: "50 جنيه", image: "https://i.pinimg.com/736x/6c/86/b5/6c86b598fe8ed62abc9b9816c5a25108.jpg" },
    { name: "1020 Minecoins", price: "150 جنيه", popular: true, image: "https://i.pinimg.com/736x/6c/86/b5/6c86b598fe8ed62abc9b9816c5a25108.jpg" },
    { name: "1720 Minecoins", price: "240 جنيه", image: "https://i.pinimg.com/736x/6c/86/b5/6c86b598fe8ed62abc9b9816c5a25108.jpg" },
    { name: "Premium Account", price: "350 جنيه", image: "https://i.pinimg.com/736x/6c/86/b5/6c86b598fe8ed62abc9b9816c5a25108.jpg" },
  ],
};

// Game-specific field configs
interface GameFieldConfig {
  fields: { key: string; label: string; placeholder: string; required: boolean }[];
  chargingInfo: string[];
  chargingMethod: string;
  deliveryTime: string;
}

const GAME_FIELD_CONFIG: Record<string, GameFieldConfig> = {
  "pubg-mobile": {
    fields: [
      { key: "playerId", label: "Player ID", placeholder: "أدخل Player ID الخاص بك", required: true },
      { key: "serverId", label: "Server ID (Zone ID)", placeholder: "مثال: 5XXX", required: false },
    ],
    chargingInfo: ["يتم الشحن عبر ID مباشرة بدون كلمة سر", "تأكد من صحة الـ ID قبل الإرسال", "الشحن يتم خلال دقائق من تأكيد الدفع"],
    chargingMethod: "Vodafone Cash / InstaPay / تحويل بنكي",
    deliveryTime: "5 - 15 دقيقة",
  },
  "call-of-duty-mobile": {
    fields: [
      { key: "playerId", label: "Player UID", placeholder: "أدخل UID الخاص بك من إعدادات اللعبة", required: true },
      { key: "openId", label: "Open ID", placeholder: "أدخل Open ID (إن وجد)", required: false },
    ],
    chargingInfo: ["يمكنك إيجاد UID من داخل اللعبة > الإعدادات > Legal & Privacy", "الشحن يتم مباشرة على حسابك"],
    chargingMethod: "Vodafone Cash / InstaPay",
    deliveryTime: "5 - 30 دقيقة",
  },
  "fortnite": {
    fields: [
      { key: "epicEmail", label: "Epic Games Email", placeholder: "أدخل إيميل حساب Epic Games", required: true },
      { key: "epicDisplay", label: "Display Name", placeholder: "اسم العرض في Epic Games", required: true },
    ],
    chargingInfo: ["يتم الشحن عبر حساب Epic Games", "لا نحتاج كلمة السر — فقط الإيميل واسم العرض", "قد يتطلب تأكيد عبر إيميل Epic"],
    chargingMethod: "Vodafone Cash / InstaPay / تحويل بنكي",
    deliveryTime: "15 - 60 دقيقة",
  },
  "league-of-legends": {
    fields: [
      { key: "riotId", label: "Riot ID", placeholder: "مثال: Player#TAG", required: true },
      { key: "server", label: "السيرفر", placeholder: "مثال: EUW, EUNE, NA", required: true },
    ],
    chargingInfo: ["يتم الشحن عبر Riot ID مباشرة", "تأكد من السيرفر الصحيح لحسابك"],
    chargingMethod: "Vodafone Cash / InstaPay",
    deliveryTime: "10 - 30 دقيقة",
  },
  "genshin-impact": {
    fields: [
      { key: "playerId", label: "UID", placeholder: "أدخل UID من داخل اللعبة", required: true },
      { key: "server", label: "السيرفر", placeholder: "مثال: Asia, Europe, America", required: true },
    ],
    chargingInfo: ["يتم الشحن عبر UID مباشرة بدون كلمة سر", "تأكد من اختيار السيرفر الصحيح", "Welkin Moon يتم تفعيله فوراً"],
    chargingMethod: "Vodafone Cash / InstaPay",
    deliveryTime: "5 - 15 دقيقة",
  },
  "free-fire": {
    fields: [
      { key: "playerId", label: "Player ID", placeholder: "أدخل ID اللاعب من داخل اللعبة", required: true },
    ],
    chargingInfo: ["الشحن فوري عبر ID فقط", "لا نحتاج كلمة سر أو إيميل"],
    chargingMethod: "Vodafone Cash / InstaPay",
    deliveryTime: "1 - 10 دقائق",
  },
  "valorant": {
    fields: [
      { key: "riotId", label: "Riot ID", placeholder: "مثال: Player#TAG", required: true },
      { key: "server", label: "السيرفر", placeholder: "مثال: EU, NA, AP", required: true },
    ],
    chargingInfo: ["يتم الشحن عبر Riot ID", "تأكد من السيرفر الصحيح"],
    chargingMethod: "Vodafone Cash / InstaPay",
    deliveryTime: "10 - 30 دقيقة",
  },
  "roblox": {
    fields: [
      { key: "username", label: "Roblox Username", placeholder: "أدخل اسم المستخدم في Roblox", required: true },
    ],
    chargingInfo: ["يتم إرسال Robux عبر Game Pass أو Group Funds", "سيتم التواصل معك لتأكيد الطريقة"],
    chargingMethod: "Vodafone Cash / InstaPay",
    deliveryTime: "15 - 60 دقيقة",
  },
  "clash-of-clans": {
    fields: [
      { key: "playerTag", label: "Player Tag", placeholder: "مثال: #XXXXXXXX", required: true },
    ],
    chargingInfo: ["يتم الشحن عبر Player Tag", "Gold Pass يتم تفعيله مباشرة"],
    chargingMethod: "Vodafone Cash / InstaPay",
    deliveryTime: "5 - 20 دقيقة",
  },
  "fifa-ea-fc": {
    fields: [
      { key: "platform", label: "المنصة", placeholder: "PS / Xbox / PC", required: true },
      { key: "eaEmail", label: "EA Email", placeholder: "أدخل إيميل حساب EA", required: true },
    ],
    chargingInfo: ["يتم الشحن عبر حساب EA مباشرة", "تأكد من ربط المنصة الصحيحة بحسابك"],
    chargingMethod: "Vodafone Cash / InstaPay / تحويل بنكي",
    deliveryTime: "30 - 60 دقيقة",
  },
  "minecraft": {
    fields: [
      { key: "username", label: "Minecraft Username", placeholder: "أدخل اسم المستخدم", required: true },
      { key: "edition", label: "النسخة", placeholder: "Java / Bedrock", required: true },
    ],
    chargingInfo: ["يتم إرسال الكود عبر واتساب", "تأكد من اختيار النسخة الصحيحة"],
    chargingMethod: "Vodafone Cash / InstaPay",
    deliveryTime: "10 - 30 دقيقة",
  },
  "efootball-pes-mobile": {
    fields: [
      { key: "ownerId", label: "Owner ID", placeholder: "أدخل Owner ID الخاص بك", required: true },
      { key: "region", label: "Region", placeholder: "مثال: Europe / Middle East", required: true },
    ],
    chargingInfo: ["يتم الشحن عبر Owner ID مباشرة", "لا نحتاج لبيانات الدخول", "الشحن يتم خلال دقائق"],
    chargingMethod: "Vodafone Cash / InstaPay",
    deliveryTime: "5 - 15 دقيقة",
  },
};

const DEFAULT_FIELD_CONFIG: GameFieldConfig = {
  fields: [
    { key: "playerId", label: "Player ID", placeholder: "أدخل ID الخاص بك", required: true },
  ],
  chargingInfo: ["يتم الشحن مباشرة بعد تأكيد الدفع"],
  chargingMethod: "Vodafone Cash / InstaPay",
  deliveryTime: "10 - 30 دقيقة",
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function GameDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const game = GAMES_DATA.find((g) => slugify(g.name) === slug);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState<Package | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [playerName, setPlayerName] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const { lang, toggleLang, t } = useLang();
  const [paymentMethod, setPaymentMethod] = useState("vodafone");
  const [username, setUsername] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const MAX_QUANTITY = 22;
  const checkoutScrollRef = React.useRef<HTMLDivElement>(null);

  const [orderCheck, setOrderCheck] = useState<{isOpen: boolean, step: "checking"|"success", orderId: string}>({
    isOpen: false,
    step: "checking",
    orderId: ""
  });

  const [isOtherModalOpen, setIsOtherModalOpen] = useState(false);
  const [otherCountry, setOtherCountry] = useState("");
  const [otherCountryCode, setOtherCountryCode] = useState("");
  const [otherMethod, setOtherMethod] = useState("");
  const [otherMethodInput, setOtherMethodInput] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  const ARAB_COUNTRIES = [
    { name: "مصر", flag: "🇪🇬", code: "eg", suffix: "(الدولة المستضيفة)" },
    { name: "فلسطين", flag: "🇵🇸", code: "ps", suffix: "فلسطين حرة.. إدعم القضية" },
    { name: "السعودية", flag: "🇸🇦", code: "sa" },
    { name: "الإمارات", flag: "🇦🇪", code: "ae" },
    { name: "الكويت", flag: "🇰🇼", code: "kw" },
    { name: "قطر", flag: "🇶🇦", code: "qa" },
    { name: "البحرين", flag: "🇧🇭", code: "bh" },
    { name: "عمان", flag: "🇴🇲", code: "om" },
    { name: "الأردن", flag: "🇯🇴", code: "jo" },
    { name: "لبنان", flag: "🇱🇧", code: "lb" },
    { name: "سوريا", flag: "🇸🇾", code: "sy" },
    { name: "العراق", flag: "🇮🇶", code: "iq" },
    { name: "ليبيا", flag: "🇱🇾", code: "ly" },
    { name: "تونس", flag: "🇹🇳", code: "tn" },
    { name: "الجزائر", flag: "🇩🇿", code: "dz" },
    { name: "المغرب", flag: "🇲🇦", code: "ma" },
    { name: "اليمن", flag: "🇾🇪", code: "ye" },
    { name: "السودان", flag: "🇸🇩", code: "sd" }
  ];

  const BrutalFlag = ({ code, className = "" }: { code: string; className?: string }) => (
    <div className={`w-6 h-6 rounded-full overflow-hidden border-2 border-[var(--c-ink)] shadow-[2px_2px_0px_var(--c-ink)] shrink-0 bg-white inline-flex items-center justify-center ${className}`}>
      <img 
        src={`https://flagcdn.com/w80/${code.toLowerCase()}.png`} 
        alt={code}
        className={`w-full h-full object-cover ${code.toLowerCase() === 'ps' ? 'object-left scale-125' : 'object-center scale-150'}`}
      />
    </div>
  );

  const PAYMENT_SUGGESTIONS = [
    "Vodafone Cash", "InstaPay", "STC Pay", "Urpay", "Zain Cash", "PayPal", "Apple Pay", "Google Pay", "Fawry", "Mada", "Aman", "Orange Money", "Etisalat Cash", "Sadaq", "CashU"
  ];

  if (!game) {
    return (
      <>
        <GlobalStyles />
        <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: "var(--c-bg)", color: "var(--c-ink)" }}>
          <h1 className="text-6xl font-black uppercase mb-4">Game Not Found</h1>
          <Link to="/games">
            <BrutalButton>Back to Games</BrutalButton>
          </Link>
        </div>
      </>
    );
  }

  const fieldConfig = GAME_FIELD_CONFIG[slug!] || DEFAULT_FIELD_CONFIG;

  const packages = GAME_PACKAGES[slug!] || [
    { name: "Basic Pack", price: "100 جنيه" },
    { name: "Standard Pack", price: "250 جنيه", popular: true },
    { name: "Premium Pack", price: "500 جنيه" },
  ];

  const openModal = (pkg: Package) => {
    setSelectedPkg(pkg);
    setFormData({});
    setPlayerName("");
    setPromoCode("");
    setQuantity(1);
    setDiscount(0);
    setPromoError("");
    setModalOpen(true);
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "LORD15" || code === "WELCOME") {
      setDiscount(0.15);
      setPromoError("");
    } else {
      setDiscount(0);
      setPromoError(lang === "ar" ? "كود الخصم غير صالح" : "Invalid promo code");
    }
  };

  const sendWhatsApp = () => {
    if (!selectedPkg) return;
    setModalOpen(false); // Close the package form modal
    const generatedOrder = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderCheck({ isOpen: true, step: "checking", orderId: generatedOrder });

    setTimeout(() => {
      setOrderCheck(prev => ({ ...prev, step: "success" }));
      setTimeout(() => {
        const fieldsText = fieldConfig.fields
          .map((f) => `${f.label}: ${formData[f.key] || "-"}`)
          .join("\n");
        const paymentLabel = 
          paymentMethod === "vodafone" ? "Vodafone Cash" : 
          paymentMethod === "instapay" ? "InstaPay" : 
          paymentMethod === "other" ? `${otherMethod} - ${otherCountry}` : paymentMethod;
        
        let finalPriceLabel = "";
        const unitPriceNum = parseInt(selectedPkg.price.replace(/\D/g, ""), 10) || 0;
        const totalBasePrice = unitPriceNum * quantity;
        
        if (discount > 0) {
          const discountedPrice = Math.round(totalBasePrice * (1 - discount));
          finalPriceLabel = `${discountedPrice} ج.م (شامل خصم ${discount * 100}% على إجمالي ${totalBasePrice})`;
        } else {
          finalPriceLabel = `${totalBasePrice} ج.م`;
        }
        
        const msg = encodeURIComponent(
          `مرحبا، أريد شحن طلب جديد #${generatedOrder}\nاللعبة: ${game.name} - ${selectedPkg.name}\nالكمية: ${quantity}\n\nاسم المستخدم: ${username}\n${fieldsText}${playerName ? `\nالاسم: ${playerName}` : ""}\n\nكود الخصم: ${promoCode || "لا يوجد"}\nالسعر الإجمالي: ${finalPriceLabel}\n\nطريقة الدفع: ${paymentLabel}\n\nشكراً لك.`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
        setOrderCheck(prev => ({ ...prev, isOpen: false }));
      }, 1500);
    }, 2000);
  };

  const scrollCheckout = (offset: number) => {
    if (checkoutScrollRef.current) {
      checkoutScrollRef.current.scrollBy({ top: offset, behavior: 'smooth' });
    }
  };

  const isFormValid = 
    username.trim().length > 0 && 
    agreedToTerms && 
    fieldConfig.fields.filter((f) => f.required).every((f) => formData[f.key]?.trim());

  return (
    <>
      <GlobalStyles />
      <div className="min-h-screen" style={{ backgroundColor: "var(--c-bg)", color: "var(--c-ink)" }}>
        {/* Header */}
        <div className="border-b-4 border-[var(--c-ink)] px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/games" className="flex items-center gap-2 text-sm font-bold uppercase hover:text-[var(--c-orange)] transition-colors">
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
          </div>
        </div>

        {/* Banner */}
        <div className="relative h-64 md:h-80 overflow-hidden border-b-4 border-[var(--c-ink)]">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${game.image})` }} />
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--c-lime)] mb-2">{game.cat}</span>
            <h1 className="text-5xl md:text-7xl font-black uppercase text-white">{game.name}</h1>
            <p className="text-lg text-white/80 mt-2 max-w-xl">{t(game.desc, (game as any).descAr || game.desc)}</p>
          </div>
        </div>

        {/* Packages */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-2">
            <span className="font-marker text-[var(--c-orange)]">{t("PACKAGES", "الحزم")}</span> {t("AVAILABLE", "المتاحة")}
          </h2>
          <p className="text-sm font-bold uppercase tracking-widest opacity-50 mb-10">{t("CHOOSE THE RIGHT PACKAGE AND TOP UP NOW", "اختر الحزمة المناسبة واشحن الآن")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, i) => (
              <div key={i} className="group relative">
                {/* Shadow */}
                <div className={`absolute inset-0 ${pkg.popular ? "bg-[var(--c-orange)]" : game.color} translate-x-3 translate-y-3 border-4 border-[var(--c-ink)]`} />

                {/* Card */}
                <div
                  className={`relative ${pkg.popular ? "bg-[var(--c-orange)]" : game.color} border-4 border-[var(--c-ink)] overflow-hidden group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300`}
                >
                  {/* Popular badge */}
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-[var(--c-ink)] text-[var(--c-bg)] px-3 py-1 text-xs font-black uppercase flex items-center gap-1 z-10">
                      <Star className="w-3 h-3" /> {t("POPULAR", "الأكثر طلباً")}
                    </div>
                  )}

                  {/* Image placeholder */}
                  <div className="h-36 bg-cover bg-center relative" style={{ backgroundImage: `url(${pkg.image || PKG_IMAGES[i % PKG_IMAGES.length]})` }}>
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-black text-white uppercase">{pkg.name}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-black uppercase mb-1">{pkg.name}</h3>
                    <p className="text-3xl font-black mb-4">{pkg.price}</p>

                    {/* Features */}
                    <div className="flex flex-col gap-2 mb-5 text-sm font-bold">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4" /> {t("Instant Delivery", "تسليم فوري")}
                      </div>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> {t("100% Safe", "آمن 100%")}
                      </div>
                      <div className="flex items-center gap-2">
                        <Headphones className="w-4 h-4" /> {t("24/7 Support", "دعم 24/7")}
                      </div>
                    </div>

                    <button
                      onClick={() => openModal(pkg)}
                      className="w-full bg-[var(--c-ink)] text-[var(--c-bg)] px-4 py-3 text-sm font-black uppercase hover:opacity-90 transition-opacity"
                    >
                      {t("Top Up Now 🎮", "اشحن الآن 🎮")}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Modal */}
        {modalOpen && selectedPkg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setModalOpen(false)} />

            {/* Modal Container */}
            <div className="relative w-full max-w-md my-auto">
              {/* Shadow */}
              <div className="absolute inset-0 bg-[var(--c-lime)] translate-x-3 translate-y-3 border-4 border-[var(--c-ink)]" />

              <div className="relative border-4 border-[var(--c-ink)] p-4 pr-14 flex flex-col max-h-[90vh]" style={{ backgroundColor: "var(--c-bg)" }}>
                {/* Close */}
                <button
                  onClick={() => setModalOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 border-2 border-[var(--c-ink)] flex items-center justify-center hover:bg-[var(--c-ink)] hover:text-[var(--c-bg)] transition-colors z-30"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Custom Scroll Arrows */}
                <div className="absolute top-16 bottom-4 right-2 w-10 flex flex-col gap-2 z-20">
                  <button onClick={() => scrollCheckout(-100)} className="w-10 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]">
                    <ChevronUp className="w-6 h-6" />
                  </button>
                  <div className="flex-1 border-x-4 border-[var(--c-ink)]/20 mx-auto w-1 my-1"></div>
                  <button onClick={() => scrollCheckout(100)} className="w-10 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_#000]">
                    <ChevronDown className="w-6 h-6" />
                  </button>
                </div>

                {/* Sticky Package Header */}
                <div className="shrink-0 mb-4 pr-2 z-10">
                  {/* Package info */}
                  <div className="border-4 border-[var(--c-ink)] overflow-hidden shadow-[4px_4px_0px_var(--c-ink)]">
                    <div className={`${game.color} p-4`}>
                      <p className="text-xs font-bold uppercase opacity-70 mb-1">{game.name}</p>
                      <p className="text-2xl font-black leading-none">{selectedPkg.name}</p>
                      <p className="text-xl font-bold mt-2">
                        {(() => {
                           const unitPrice = parseInt(selectedPkg.price.replace(/\D/g, ""), 10) || 0;
                           const totalBase = unitPrice * quantity;
                           if (discount > 0) {
                             return (
                               <span className="flex items-center gap-2">
                                 <span className="line-through opacity-70">{totalBase} ج.م</span>
                                 <span className="text-[var(--c-ink)] bg-white px-2 py-1 text-sm font-black transform -rotate-2">
                                   {Math.round(totalBase * (1 - discount))} ج.م
                                 </span>
                               </span>
                             );
                           }
                           return `${totalBase} ج.م`;
                        })()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div 
                  ref={checkoutScrollRef}
                  className="flex-1 overflow-y-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pr-2 pb-8 text-[var(--c-ink)] relative"
                >
                  {/* Charging Info */}
                  <div className="border-4 border-[var(--c-ink)] p-4 mb-6 bg-[var(--c-lime)]/10">
                    <div 
                      className="flex justify-between items-center cursor-pointer select-none"
                      onClick={() => setShowInfo(!showInfo)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--c-orange)] animate-bounce">
                          <Info className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-black uppercase">{t("Charging Info", "معلومات الشحن")}</span>
                      </div>
                      <div className="text-[var(--c-ink)]">
                        {showInfo ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </div>
                    </div>

                    {showInfo && (
                      <div className="mt-4 pt-4 border-t-4 border-[var(--c-ink)] transition-all duration-300">
                        <ul className="space-y-2">
                          {fieldConfig.chargingInfo.map((info, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm font-bold">
                              <CheckCircle className="w-4 h-4 mt-0.5 shrink-0 text-[var(--c-orange)]" />
                              {info}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t-4 border-[var(--c-ink)]">
                          <div className="flex items-center gap-2 text-xs font-black">
                            <CreditCard className="w-4 h-4" />
                            {fieldConfig.chargingMethod}
                          </div>
                          <div className="flex items-center gap-2 text-xs font-black">
                            <Clock className="w-4 h-4" />
                            {fieldConfig.deliveryTime}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6 p-4 border-4 border-[var(--c-ink)] bg-white shadow-[4px_4px_0px_var(--c-ink)]">
                    <label className="block text-sm font-black uppercase mb-3 text-[var(--c-purple)]">
                      {t("Choose Quantity", "اختر الكمية")}
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="w-12 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] font-black text-xl hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_var(--c-ink)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Minus className="w-6 h-6" />
                      </button>
                      <div className="flex-1 text-center border-x-4 border-[var(--c-ink)]/10">
                        <span className="text-3xl font-black">{quantity}</span>
                        <p className="text-[10px] font-bold opacity-50 uppercase mt-1">{t("Times", "مرات الشحن")}</p>
                      </div>
                      <button
                        onClick={() => setQuantity(q => Math.min(MAX_QUANTITY, q + 1))}
                        disabled={quantity >= MAX_QUANTITY}
                        className="w-12 h-12 flex items-center justify-center bg-[var(--c-orange)] border-4 border-[var(--c-ink)] text-[var(--c-ink)] font-black text-xl hover:bg-[var(--c-lime)] transition-colors shadow-[2px_2px_0px_var(--c-ink)] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                      >
                        <Plus className="w-6 h-6" />
                      </button>
                    </div>
                    {quantity === MAX_QUANTITY && (
                      <p className="text-[10px] font-black uppercase text-[var(--c-orange)] mt-2 text-center animate-pulse">
                        {t("Maximum quantity reached!", "لقد وصلت للحد الأقصى (22)!")}
                      </p>
                    )}
                  </div>

                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-black uppercase mb-3 text-[var(--c-purple)]">
                      {t("Payment Method", "طريقة الدفع")}
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: "vodafone", label: "Vodafone Cash", ar: "فودافون كاش", icon: <CreditCard className="w-4 h-4" /> },
                        { id: "instapay", label: "InstaPay", ar: "انستاباي", icon: <Zap className="w-4 h-4" /> },
                        { id: "other", label: "Other Method", ar: "طريقة أخرى", icon: <Send className="w-4 h-4" /> }
                      ].map((pm) => (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => {
                            if (pm.id === "other") {
                              setIsOtherModalOpen(true);
                            } else {
                              setPaymentMethod(pm.id);
                            }
                          }}
                          className={`flex items-center justify-between p-3 border-4 transition-all ${
                            paymentMethod === pm.id 
                              ? "border-[var(--c-ink)] bg-[var(--c-lime)] translate-x-1 translate-y-1 shadow-none" 
                              : "border-[var(--c-ink)] bg-white hover:bg-[var(--c-lime)]/10 shadow-[4px_4px_0px_var(--c-ink)]"
                          }`}
                        >
                          <span className="flex items-center gap-3 font-black uppercase text-xs">
                             {pm.id === "other" && paymentMethod === "other" && otherMethod ? (
                               <span className="flex items-center gap-2">
                                 <BrutalFlag code={otherCountryCode} /> <span className="text-[var(--c-purple)]">{otherMethod}</span>
                               </span>
                             ) : (
                               <>{pm.icon} {lang === "ar" ? pm.ar : pm.label}</>
                             )}
                          </span>
                          {paymentMethod === pm.id && <CheckCircle className="w-4 h-4 text-[var(--c-ink)]" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Promo Code System */}
                  <div className="mb-6 p-4 border-4 border-[var(--c-ink)] bg-[var(--c-bg)] shadow-[4px_4px_0px_var(--c-ink)]">
                    <label className="block text-sm font-black uppercase mb-3 text-[var(--c-purple)]">
                      {t("Promo Code", "كود الخصم")}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder={t("E.g. LORD15", "مثال: LORD15")}
                        className={`flex-1 border-4 border-[var(--c-ink)] px-3 py-2 text-sm font-bold bg-white focus:outline-none focus:border-[var(--c-orange)] transition-colors tracking-widest uppercase ${lang === "ar" ? "text-right" : "text-left"}`}
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        className="bg-[var(--c-ink)] text-[var(--c-bg)] px-4 py-2 text-sm font-black uppercase hover:bg-[var(--c-orange)] transition-colors whitespace-nowrap border-4 border-[var(--c-ink)]"
                      >
                        {t("Apply", "تطبيق")}
                      </button>
                    </div>
                    
                    {/* Feedback Messages */}
                    {promoError && (
                      <div className="mt-4 p-3 border-4 border-red-500 bg-red-50 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="w-6 h-6 bg-red-500 flex items-center justify-center shrink-0">
                          <X className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-xs font-black uppercase text-red-600">{promoError}</p>
                      </div>
                    )}
                    
                    {discount > 0 && (
                      <div className="mt-4 p-3 border-4 border-[var(--c-ink)] bg-[var(--c-lime)] shadow-[4px_4px_0px_var(--c-ink)] flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="w-6 h-6 bg-[var(--c-ink)] flex items-center justify-center shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <p className="text-xs font-black uppercase text-[var(--c-ink)] tracking-tighter">
                          {t("Discount Applied! 15% off", "تم تفعيل الخصم بنجاح! 15%")}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Login / User Info */}
                  <div className="mb-8 p-5 border-4 border-[var(--c-ink)] bg-white shadow-[6px_6px_0px_var(--c-purple)]">
                    <label className="block text-sm font-black uppercase mb-3 text-[var(--c-purple)]">
                      {t("Account Information", "معلومات الحساب")}
                    </label>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-black uppercase mb-1 opacity-70">
                          {t("Username", "اسم المستخدم")} *
                        </label>
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder={t("Enter store username", "أدخل اسم المستخدم بالمتجر")}
                          className="w-full border-4 border-[var(--c-ink)] px-4 py-3 text-lg font-bold bg-transparent focus:outline-none focus:border-[var(--c-orange)] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Form Fields */}
                  <div className="space-y-4 mb-8">
                    {fieldConfig.fields.map((field) => (
                      <div key={field.key}>
                        <label className="block text-sm font-black uppercase mb-2">
                          {field.label} {field.required && "*"}
                        </label>
                        <input
                          type="text"
                          value={formData[field.key] || ""}
                          onChange={(e) => setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                          className="w-full border-4 border-[var(--c-ink)] px-4 py-3 text-lg font-bold bg-transparent focus:outline-none focus:border-[var(--c-orange)] transition-colors"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-sm font-black uppercase mb-2">{t("Name (Optional)", "الاسم (اختياري)")}</label>
                      <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder={t("Enter your name", "أدخل اسمك")}
                        className={`w-full border-4 border-[var(--c-ink)] px-4 py-3 text-lg font-bold bg-transparent focus:outline-none focus:border-[var(--c-orange)] transition-colors ${lang === "ar" ? "text-right" : "text-left"}`}
                      />
                    </div>
                  </div>

                  {/* Terms & Rights Agreement */}
                  <div className="mb-8">
                    <button 
                      onClick={() => setAgreedToTerms(!agreedToTerms)}
                      className={`w-full p-4 border-4 transition-all flex items-start gap-4 text-left ${
                        agreedToTerms 
                          ? "bg-[var(--c-lime)] border-[var(--c-ink)] shadow-none translate-x-1 translate-y-1" 
                          : "bg-white border-[var(--c-ink)] shadow-[4px_4px_0px_var(--c-ink)] hover:bg-[var(--c-lime)]/10"
                      }`}
                    >
                      <div className={`mt-1 w-6 h-6 shrink-0 border-4 border-[var(--c-ink)] flex items-center justify-center ${agreedToTerms ? 'bg-[var(--c-ink)]' : 'bg-white'}`}>
                        {agreedToTerms && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                      <div className="text-xs font-bold leading-tight">
                        {lang === "ar" ? (
                          <>
                            أوافق على <span className="underline font-black">شروط الخدمة</span>، <span className="underline font-black">سياسة الخصوصية</span>، وحقوق المستخدم والموقع.
                          </>
                        ) : (
                          <>
                            I agree to the <span className="underline font-black">Terms of Service</span>, <span className="underline font-black">Privacy Policy</span>, and User/Site Rights.
                          </>
                        )}
                      </div>
                    </button>
                  </div>

                  <button
                    onClick={sendWhatsApp}
                    disabled={!isFormValid}
                    className={`w-full bg-[var(--c-ink)] text-[var(--c-bg)] px-6 py-5 text-xl font-black uppercase flex items-center justify-center gap-2 transition-all shadow-[6px_6px_0px_var(--c-orange)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none mb-8 ${
                      !isFormValid ? "opacity-40 cursor-not-allowed" : "hover:opacity-90 transition-opacity"
                    }`}
                  >
                    <Send className="w-6 h-6" /> {t("Send Order", "إرسال الطلب")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                      {t("Verifying Data...", "جاري مراجعة البيانات...")}
                    </h3>
                    <p className="text-sm font-bold opacity-70 text-[var(--c-ink)]" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
                      {t("Please wait while we prepare your request for", "يرجى الانتظار بينما نجهز طلبك لـ")} <br/>
                      <span className="text-[var(--c-purple)] font-black text-lg">{game.name} - {selectedPkg?.name}</span>
                    </p>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-16 h-16 text-[var(--c-lime)] mb-6 animate-in zoom-in duration-300" />
                    <h3 className="text-xl font-black uppercase mb-2 text-[var(--c-ink)]" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
                      {t("Verification Complete!", "تمت المراجعة بنجاح!")}
                    </h3>
                    <p className="text-sm font-bold opacity-70 text-[var(--c-ink)]" style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
                      {t("Redirecting you to WhatsApp...", "جاري تحويلك للمحادثة...")}
                    </p>
                    <div className="mt-4 p-2 border-2 border-[var(--c-ink)] bg-white shadow-[2px_2px_0px_var(--c-ink)]">
                      <span className="text-[10px] font-black uppercase opacity-60 block tracking-widest leading-none mb-1">{t("Order ID", "رقم الطلب")}</span>
                      <span className="text-lg font-black tracking-widest uppercase">{orderCheck.orderId}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Other Payment Method Modal */}
        {isOtherModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsOtherModalOpen(false)} />
            <div className="relative w-full max-w-sm mx-auto animate-in zoom-in duration-300">
              <div className="absolute inset-0 bg-[var(--c-purple)] translate-x-3 translate-y-3 border-4 border-[var(--c-ink)]" />
              <div className="relative border-4 border-[var(--c-ink)] p-8 flex flex-col gap-6" style={{ backgroundColor: "var(--c-bg)" }}>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-[var(--c-ink)] text-center">
                  {t("Other Payment Method", "طريقة دفع أخرى")}
                </h3>

                {/* Country Dropdown */}
                <div className="relative">
                  <label className="block text-[10px] font-black uppercase opacity-60 mb-1">{t("Select Country", "اختر الدولة")}</label>
                  <button 
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="w-full flex items-center justify-between p-3 border-4 border-[var(--c-ink)] bg-white font-black text-sm uppercase shadow-[4px_4px_0px_var(--c-ink)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-none transition-all"
                  >
                    <span>{otherCountry || t("Select...", "اختر...")}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isCountryDropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isCountryDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-56 overflow-y-auto border-4 border-[var(--c-ink)] bg-white shadow-[6px_6px_0px_var(--c-ink)] scroll-smooth animate-in slide-in-from-top-2">
                       {ARAB_COUNTRIES.map(country => (
                         <button 
                           key={country.name}
                           onClick={() => {
                             setOtherCountry(`${country.flag} ${country.name} ${country.suffix || ""}`.trim());
                             setOtherCountryCode(country.code);
                             setIsCountryDropdownOpen(false);
                           }}
                           className="w-full text-right p-3 hover:bg-[var(--c-lime)] border-b-2 border-[var(--c-ink)]/10 last:border-0 group transition-colors"
                         >
                           <div className="flex items-center justify-between gap-3">
                             {country.suffix && (
                               <span className={`text-[10px] font-black uppercase ${country.name === "فلسطين" ? "text-red-600 animate-pulse" : "opacity-50"}`}>
                                 {country.suffix}
                               </span>
                             )}
                             <span className="flex-1 text-sm font-black uppercase flex items-center justify-end gap-3">
                               {country.name} <BrutalFlag code={country.code} />
                             </span>
                           </div>
                         </button>
                       ))}
                    </div>
                  )}
                </div>

                {/* Method Input with Suggestions */}
                <div className="relative">
                  <label className="block text-[10px] font-black uppercase opacity-60 mb-1">{t("Payment System", "وسيلة الدفع")}</label>
                  <input 
                    type="text"
                    value={otherMethodInput}
                    onChange={(e) => {
                      setOtherMethodInput(e.target.value);
                      setIsSuggestionsOpen(true);
                    }}
                    onFocus={() => setIsSuggestionsOpen(true)}
                    placeholder={t("e.g. STC Pay / PayPal", "مثال: STC Pay / PayPal ")}
                    className="w-full p-3 border-4 border-[var(--c-ink)] bg-white font-black text-sm uppercase shadow-[4px_4px_0px_var(--c-ink)] focus:outline-none focus:bg-[var(--c-lime)]/10"
                  />
                  {isSuggestionsOpen && otherMethodInput.length > 0 && (
                    <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-48 overflow-y-auto border-4 border-[var(--c-ink)] bg-white shadow-[6px_6px_0px_var(--c-ink)]">
                      {PAYMENT_SUGGESTIONS.filter(s => s.toLowerCase().includes(otherMethodInput.toLowerCase())).map(suggestion => (
                        <button 
                          key={suggestion}
                          onClick={() => {
                            setOtherMethodInput(suggestion);
                            setIsSuggestionsOpen(false);
                          }}
                          className="w-full text-left p-3 text-xs font-black hover:bg-[var(--c-orange)] border-b-2 border-[var(--c-ink)]/10 last:border-0"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Smart Warning for Custom Methods */}
                  {otherMethodInput && !PAYMENT_SUGGESTIONS.some(s => s.toLowerCase() === otherMethodInput.toLowerCase()) && (
                    <div className="bg-[var(--c-orange)]/10 border-4 border-[var(--c-orange)] p-3 flex flex-col gap-2 mt-4 animate-in fade-in slide-in-from-top-1 duration-300">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[var(--c-orange)] border-2 border-[var(--c-ink)] flex items-center justify-center -rotate-12">
                          <Zap className="w-3.5 h-3.5 text-[var(--c-ink)] animate-pulse" />
                        </div>
                        <p className="text-[10px] font-black uppercase text-[var(--c-ink)]">
                          {t("Check Support Status", "تأكد من حالة الدعم")}
                        </p>
                      </div>
                      <p className="text-[9px] font-bold opacity-70 leading-relaxed">
                        {t("This method might need manual verification. Check with support first.", "هذه الطريقة قد تتطلب مراجعة يدوية. تأكد من توفرها عبر الدعم الفني.")}
                      </p>
                      <button 
                        type="button"
                        onClick={() => window.dispatchEvent(new CustomEvent('open-faq', { detail: { topic: 'payment' } }))}
                        className="bg-[var(--c-ink)] text-white text-[9px] font-black uppercase py-2 border-2 border-[var(--c-ink)] shadow-[3px_3px_0px_var(--c-orange)] hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
                      >
                        {t("Ask about this method 💬", "اسأل عن هذه الوسيلة 💬")}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      if (otherCountry && otherMethodInput) {
                        setOtherMethod(otherMethodInput);
                        setPaymentMethod("other");
                        setIsOtherModalOpen(false);
                      }
                    }}
                    disabled={!otherCountry || !otherMethodInput}
                    className="flex-1 bg-[var(--c-ink)] text-white p-4 font-black uppercase text-sm border-2 border-[var(--c-ink)] shadow-[4px_4px_0px_var(--c-orange)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-none transition-all disabled:opacity-30"
                  >
                    {t("Confirm", "تأكيد")}
                  </button>
                  <button 
                    onClick={() => setIsOtherModalOpen(false)}
                    className="flex-1 bg-white text-[var(--c-ink)] p-4 font-black uppercase text-sm border-2 border-[var(--c-ink)] shadow-[4px_4px_0px_var(--c-ink)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-none transition-all"
                  >
                    {t("Cancel", "إلغاء")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export { slugify };
