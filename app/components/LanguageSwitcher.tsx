'use client'

import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 text-white hover:text-[#002342] font-bold text-sm uppercase tracking-wider transition-colors"
      aria-label="Change language"
    >
      {language === 'es' ? (
        <>
          <span className="text-xl">🇺🇸</span>
          <span>{t.nav.english}</span>
        </>
      ) : (
        <>
          <span className="text-xl">🇲🇽</span>
          <span>ESPAÑOL</span>
        </>
      )}
    </button>
  );
}