'use client';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Persist header or let backend know if needed later, but localstorage is handled
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm text-sm font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
        {i18n.language === 'hi' ? 'हिंदी' : i18n.language === 'bn' ? 'বাংলা' : 'English'}
      </button>

      <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-1 flex flex-col">
          <button 
            onClick={() => changeLanguage('en')}
            className={`px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${i18n.language === 'en' ? 'font-bold text-blue-600' : ''}`}
          >
            English
          </button>
          <button 
            onClick={() => changeLanguage('hi')}
            className={`px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${i18n.language === 'hi' ? 'font-bold text-blue-600' : ''}`}
          >
            हिंदी
          </button>
          <button 
            onClick={() => changeLanguage('bn')}
            className={`px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800 ${i18n.language === 'bn' ? 'font-bold text-blue-600' : ''}`}
          >
            বাংলা
          </button>
        </div>
      </div>
    </div>
  );
}
