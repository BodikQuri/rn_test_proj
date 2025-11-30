import { en } from "./en";
import { TranslationKeys, uk } from "./uk";

type Locale = "uk" | "en";

const translations: Record<Locale, TranslationKeys> = {
  uk,
  en: en as TranslationKeys,
};

let currentLocale: Locale = "uk";

export const i18n = {
  t: translations[currentLocale],
  
  setLocale: (locale: Locale) => {
    currentLocale = locale;
    i18n.t = translations[locale];
  },
  
  getLocale: () => currentLocale,
};

// Helper hook for React components
export const useTranslation = () => {
  return i18n.t;
};
