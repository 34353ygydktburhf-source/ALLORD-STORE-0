export interface CountryData {
  id: string; // ISO A3 or Name to match TopoJSON
  nameEn: string;
  nameAr: string;
  flagUrl: string;
  gamesEn: string[];
  gamesAr: string[];
  paymentsEn: string[];
  paymentsAr: string[];
  offersEn: string;
  offersAr: string;
}

// using precise English names to match popular topojson properties.name 
export const ARAB_COUNTRIES: Record<string, CountryData> = {
  "Egypt": {
    id: "Egypt",
    nameEn: "Egypt",
    nameAr: "مصر",
    flagUrl: "https://flagcdn.com/w160/eg.png",
    gamesEn: ["PUBG Mobile", "Free Fire", "eFootball"],
    gamesAr: ["ببجي موبايل", "فري فاير", "إي فوتبول"],
    paymentsEn: ["Vodafone Cash", "InstaPay", "Visa"],
    paymentsAr: ["فودافون كاش", "انستا باي", "فيزا"],
    offersEn: "20% Bonus on all PUBG UC",
    offersAr: "عرض 20% شدات ببجي إضافية"
  },
  "Saudi Arabia": {
    id: "Saudi Arabia",
    nameEn: "Saudi Arabia",
    nameAr: "السعودية",
    flagUrl: "https://flagcdn.com/w160/sa.png",
    gamesEn: ["Call of Duty", "PUBG Mobile", "FIFA"],
    gamesAr: ["كول أوف ديوتي", "ببجي موبايل", "فيفا"],
    paymentsEn: ["STC Pay", "Mada", "Apple Pay"],
    paymentsAr: ["إس تي سي باي", "مدى", "أبل باي"],
    offersEn: "Instant Delivery on PSN Cards",
    offersAr: "تسليم فوري لبطاقات بلايستيشن"
  },
  "United Arab Emirates": {
    id: "United Arab Emirates",
    nameEn: "UAE",
    nameAr: "الإمارات",
    flagUrl: "https://flagcdn.com/w160/ae.png",
    gamesEn: ["Valorant", "Roblox", "Fortnite"],
    gamesAr: ["فالورانت", "روبلوكس", "فورتنايت"],
    paymentsEn: ["Apple Pay", "Credit Card"],
    paymentsAr: ["أبل باي", "بطاقات ائتمان"],
    offersEn: "10% Cashback on Valorant Points",
    offersAr: "كاش باك 10% على نقاط فالورانت"
  },
  "Algeria": {
    id: "Algeria",
    nameEn: "Algeria",
    nameAr: "الجزائر",
    flagUrl: "https://flagcdn.com/w160/dz.png",
    gamesEn: ["Free Fire", "PUBG Mobile"],
    gamesAr: ["فري فاير", "ببجي موبايل"],
    paymentsEn: ["BaridiMob", "Flexy"],
    paymentsAr: ["بريدي موب", "فليكسي"],
    offersEn: "Special Free Fire Diamond Bundles",
    offersAr: "حزم جواهر فري فاير مميزة"
  },
  "Morocco": {
    id: "Morocco",
    nameEn: "Morocco",
    nameAr: "المغرب",
    flagUrl: "https://flagcdn.com/w160/ma.png",
    gamesEn: ["Free Fire", "League of Legends"],
    gamesAr: ["فري فاير", "ليج أوف ليجيندز"],
    paymentsEn: ["Cash Plus", "WafaCash"],
    paymentsAr: ["كاش بلس", "وفا كاش"],
    offersEn: "Extra 5% on Riot Points",
    offersAr: "5% إضافية لـ Riot Points"
  },
  "Iraq": {
    id: "Iraq",
    nameEn: "Iraq",
    nameAr: "العراق",
    flagUrl: "https://flagcdn.com/w160/iq.png",
    gamesEn: ["PUBG Mobile", "Call of Duty"],
    gamesAr: ["ببجي موبايل", "كول أوف ديوتي"],
    paymentsEn: ["Zain Cash", "AsiaHawala"],
    paymentsAr: ["زين كاش", "آسيا حوالة"],
    offersEn: "Double UC Event",
    offersAr: "الفعالية المضاعفة لشدات ببجي"
  },
  "Jordan": {
    id: "Jordan",
    nameEn: "Jordan",
    nameAr: "الأردن",
    flagUrl: "https://flagcdn.com/w160/jo.png",
    gamesEn: ["Roblox", "PUBG Mobile"],
    gamesAr: ["روبلوكس", "ببجي موبايل"],
    paymentsEn: ["Zain Cash", "CliQ", "Orange Money"],
    paymentsAr: ["زين كاش", "كليك", "أورانج ماني"],
    offersEn: "Robux Mega Deals",
    offersAr: "عروض ضخمة للـ Robux"
  },
  "Kuwait": {
    id: "Kuwait",
    nameEn: "Kuwait",
    nameAr: "الكويت",
    flagUrl: "https://flagcdn.com/w160/kw.png",
    gamesEn: ["FIFA", "Call of Duty"],
    gamesAr: ["فيفا", "كول أوف ديوتي"],
    paymentsEn: ["KNET", "Visa"],
    paymentsAr: ["كي نت", "فيزا"],
    offersEn: "EA Sports FC Coins Discount",
    offersAr: "عروض مخفضة لكوينز EA Sports"
  },
  "Qatar": {
    id: "Qatar",
    nameEn: "Qatar",
    nameAr: "قطر",
    flagUrl: "https://flagcdn.com/w160/qa.png",
    gamesEn: ["Fortnite", "Call of Duty"],
    gamesAr: ["فورتنايت", "كول أوف ديوتي"],
    paymentsEn: ["Ooredoo Money", "Credit Card"],
    paymentsAr: ["أوريدو ماني", "بطاقات ائتمان"],
    offersEn: "Fastest Delivery in GCC",
    offersAr: "التسليم الأسرع في دول الخليج"
  },
  "Bahrain": {
    id: "Bahrain",
    nameEn: "Bahrain",
    nameAr: "البحرين",
    flagUrl: "https://flagcdn.com/w160/bh.png",
    gamesEn: ["Genshin Impact", "Roblox"],
    gamesAr: ["جينشين إمباكت", "روبلوكس"],
    paymentsEn: ["BenefitPay", "Apple Pay"],
    paymentsAr: ["بنفت باي", "أبل باي"],
    offersEn: "Genshin Crystals Promo",
    offersAr: "تصفيات كريستال جينشين"
  },
  "Oman": {
    id: "Oman",
    nameEn: "Oman",
    nameAr: "عُمان",
    flagUrl: "https://flagcdn.com/w160/om.png",
    gamesEn: ["PUBG Mobile", "FIFA"],
    gamesAr: ["ببجي موبايل", "فيفا"],
    paymentsEn: ["Omantel", "Thawani"],
    paymentsAr: ["عمانتل", "ثواني"],
    offersEn: "Exclusive Omantel UC Offer",
    offersAr: "عروض عمانتل الحصرية لشدات ببجي"
  },
  "Palestine": {
    id: "Palestine",
    nameEn: "Palestine",
    nameAr: "فلسطين",
    flagUrl: "https://flagcdn.com/w160/ps.png",
    gamesEn: ["Free Fire", "PUBG Mobile"],
    gamesAr: ["فري فاير", "ببجي موبايل"],
    paymentsEn: ["Jawwal Pay", "Bank Transfer"],
    paymentsAr: ["جوال باي", "حوالة بنكية"],
    offersEn: "Support Deals",
    offersAr: "عروض الدعم المتكاملة"
  },
  "Lebanon": {
    id: "Lebanon",
    nameEn: "Lebanon",
    nameAr: "لبنان",
    flagUrl: "https://flagcdn.com/w160/lb.png",
    gamesEn: ["PUBG Mobile", "League of Legends"],
    gamesAr: ["ببجي موبايل", "ليج أوف ليجيندز"],
    paymentsEn: ["OMT", "Whish Money"],
    paymentsAr: ["أو إم تي", "ويش موني"],
    offersEn: "Special Riot PIN Deals",
    offersAr: "عروض مميزة للـ Riot PIN"
  },
  "Syria": {
    id: "Syria",
    nameEn: "Syria",
    nameAr: "سوريا",
    flagUrl: "https://flagcdn.com/w160/sy.png",
    gamesEn: ["PUBG Mobile"],
    gamesAr: ["ببجي موبايل"],
    paymentsEn: ["Syriatel Cash", "MTN Cash"],
    paymentsAr: ["سيرياتيل كاش", "إم تي إن كاش"],
    offersEn: "Limited Time UC Discount",
    offersAr: "تخفيضات شدات ببجي لفترة محدودة"
  },
  "Yemen": {
    id: "Yemen",
    nameEn: "Yemen",
    nameAr: "اليمن",
    flagUrl: "https://flagcdn.com/w160/ye.png",
    gamesEn: ["PUBG Mobile", "Free Fire"],
    gamesAr: ["ببجي موبايل", "فري فاير"],
    paymentsEn: ["Kuraimi", "Jawali"],
    paymentsAr: ["بنك الكريمي", "جوالي"],
    offersEn: "Mega Free Fire Diamond Offer",
    offersAr: "عروض جواهر فري فاير الكبرى"
  },
  "Libya": {
    id: "Libya",
    nameEn: "Libya",
    nameAr: "ليبيا",
    flagUrl: "https://flagcdn.com/w160/ly.png",
    gamesEn: ["Free Fire", "eFootball"],
    gamesAr: ["فري فاير", "إي فوتبول"],
    paymentsEn: ["Sada Pay", "MobiCash"],
    paymentsAr: ["سداد باي", "موبي كاش"],
    offersEn: "Extra Bonus Coins",
    offersAr: "كوينز مضافة لكل عملية شحن"
  },
  "Tunisia": {
    id: "Tunisia",
    nameEn: "Tunisia",
    nameAr: "تونس",
    flagUrl: "https://flagcdn.com/w160/tn.png",
    gamesEn: ["Free Fire", "League of Legends"],
    gamesAr: ["فري فاير", "ليج أوف ليجيندز"],
    paymentsEn: ["D17", "RunPay"],
    paymentsAr: ["دي 17", "رن باي"],
    offersEn: "Double RP Weekend",
    offersAr: "نقاط RP مضاعفة في عطلة نهاية الأسبوع"
  },
  "Sudan": {
    id: "Sudan",
    nameEn: "Sudan",
    nameAr: "السودان",
    flagUrl: "https://flagcdn.com/w160/sd.png",
    gamesEn: ["PUBG Mobile", "Roblox"],
    gamesAr: ["ببجي موبايل", "روبلوكس"],
    paymentsEn: ["Bankak"],
    paymentsAr: ["تطبيق بنكك"],
    offersEn: "Special Local Offer",
    offersAr: "عرض محلي خاص بجميع الأعضاء"
  },
  "Mauritania": {
    id: "Mauritania",
    nameEn: "Mauritania",
    nameAr: "موريتانيا",
    flagUrl: "https://flagcdn.com/w160/mr.png",
    gamesEn: ["Free Fire", "PUBG Mobile"],
    gamesAr: ["فري فاير", "ببجي موبايل"],
    paymentsEn: ["Bankily", "Masrvi"],
    paymentsAr: ["تطبيق بنكيلي", "تطبيق مصرفي"],
    offersEn: "VIP Delivery Service",
    offersAr: "خدمة التوصيل السريع VIP"
  },
  "Somalia": {
    id: "Somalia",
    nameEn: "Somalia",
    nameAr: "الصومال",
    flagUrl: "https://flagcdn.com/w160/so.png",
    gamesEn: ["PUBG Mobile", "Fortnite"],
    gamesAr: ["ببجي موبايل", "فورتنايت"],
    paymentsEn: ["EVC Plus", "Zaad"],
    paymentsAr: ["إي في سي بلس", "تطبيق زاد"],
    offersEn: "Fast Crypto Transfers",
    offersAr: "بطاقات مشفرة وتسليم آمن"
  },
  "Djibouti": {
    id: "Djibouti",
    nameEn: "Djibouti",
    nameAr: "جيبوتي",
    flagUrl: "https://flagcdn.com/w160/dj.png",
    gamesEn: ["PUBG Mobile", "FIFA"],
    gamesAr: ["ببجي موبايل", "فيفا"],
    paymentsEn: ["Waafi", "D-Money"],
    paymentsAr: ["تطبيق وافي", "دي ماني"],
    offersEn: "Exclusive FIFA Pack",
    offersAr: "حزم فيفا كوينز الحصرية"
  },
  "Comoros": {
    id: "Comoros",
    nameEn: "Comoros",
    nameAr: "جزر القمر",
    flagUrl: "https://flagcdn.com/w160/km.png",
    gamesEn: ["Free Fire"],
    gamesAr: ["فري فاير"],
    paymentsEn: ["Hollo"],
    paymentsAr: ["تطبيق هولو"],
    offersEn: "New Season Diamonds",
    offersAr: "مكافآت وتخفيضات ألماسات الموسم"
  }
};
