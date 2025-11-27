'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import type { Language, TranslationKeys } from '../lib/translations';
import { translations } from '../lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  initialLanguage 
}: { 
  children: React.ReactNode;
  initialLanguage: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const router = useRouter();
  const pathname = usePathname();

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    // Cambiar la URL al nuevo idioma
    const currentPath = pathname.split('/').slice(2).join('/'); // Remueve /es o /en
    router.push(`/${newLang}${currentPath ? '/' + currentPath : ''}`);
  };

  // Sincronizar el idioma con la URL
  useEffect(() => {
    const pathLang = pathname.split('/')[1] as Language;
    if (pathLang && (pathLang === 'es' || pathLang === 'en') && pathLang !== language) {
      setLanguageState(pathLang);
    }
  }, [pathname]);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t: translations[language] 
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}