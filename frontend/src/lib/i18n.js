import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '../../public/locales/en/common.json';
import hiCommon from '../../public/locales/hi/common.json';
import bnCommon from '../../public/locales/bn/common.json';

const resources = {
  en: { common: enCommon },
  hi: { common: hiCommon },
  bn: { common: bnCommon },
};

i18n
  .use(LanguageDetector) // Detect language from browser/localStorage
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'bn'],
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    }
  });

export default i18n;
