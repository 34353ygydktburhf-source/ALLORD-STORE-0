/**
 * Content Filter Utility for AL LORD STORE
 * Handles detection of profanity, religious insults, and restricted contacts.
 */

// Basic common Arabic profanity (Expandable)
const ARABIC_PROFANITY = [
  "زب", "كس", "طيز", "شرموط", "خول", "منيوك", "قحبة", "عاهره", "عرص", "لبوة", 
  "سكس", "بورن", "فاجر", "داعر", "حقير", "وسخ", "امك", "اختك", "ابوك", 
  "كسم", "كسحتك", "لحاس", "مصاص", "تفتف", "خرا", "خراء", "بول", "غائط"
];

// Basic English profanity
const ENGLISH_PROFANITY = [
  "fuck", "shit", "bitch", "asshole", "dick", "pussy", "slut", "whore", 
  "porn", "sexy", "bastard"
];

// Religious sensitivities (insults to deities, prophets, or religions)
const RELIGIOUS_SENSITIVITIES = [
  "الله", "ربك", "دينك", "الرسول", "محمد", "عيسى", "موسى", "الاسلام", "المسيحية", "اليهودية",
  "كافر", "ملحد", "جحيم", "نار", "شيطان", "ابليس"
];

// Existing restricted regex from CommunityContext (links, phones, emails)
export const RESTRICTED_REGEX = /((http|https):\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\b(?:\+?\d{1,3}[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4,8}\b|\d{7,})/i;

export interface FilterResult {
  isClean: boolean;
  type?: 'profanity' | 'religion' | 'restricted';
  foundWord?: string;
}

/**
 * Checks if the content is clean from forbidden words or restricted patterns.
 * @param text The text to verify
 * @param checkRestricted Whether to check for links/phones
 */
export const verifyContent = (text: string, checkRestricted: boolean = true): FilterResult => {
  const normalizedText = text.toLowerCase().trim();

  // 1. Check Profanity
  for (const word of ARABIC_PROFANITY) {
    if (normalizedText.includes(word)) return { isClean: false, type: 'profanity', foundWord: word };
  }
  for (const word of ENGLISH_PROFANITY) {
    if (normalizedText.includes(word)) return { isClean: false, type: 'profanity', foundWord: word };
  }

  // 2. Check Religious Insults (Strict check: usually context based, but we block sensitive terms if combined with bad words or just entirely if requested)
  // For most SaaS, we block specific combinations, but here we'll flag them if they appear in a suspicious context.
  // For simplicity, we just check if they are being used.
  for (const word of RELIGIOUS_SENSITIVITIES) {
    // We only block religious terms if they are being mentioned in "Community" or "Chat" to avoid any religious debates or insults.
    if (normalizedText.includes(word)) return { isClean: false, type: 'religion', foundWord: word };
  }

  // 3. Check Restricted (Links/Phones)
  if (checkRestricted && RESTRICTED_REGEX.test(text)) {
    return { isClean: false, type: 'restricted' };
  }

  return { isClean: true };
};

/**
 * Clean text by replacing forbidden words with asterisks (Optional helper)
 */
export const sanitizeText = (text: string): string => {
  let sanitized = text;
  [...ARABIC_PROFANITY, ...ENGLISH_PROFANITY, ...RELIGIOUS_SENSITIVITIES].forEach(word => {
    const regex = new RegExp(word, 'gi');
    sanitized = sanitized.replace(regex, '***');
  });
  return sanitized;
};
