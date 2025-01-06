import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
        className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors"
      >
        <Languages size={20} />
        {language === 'en' ? 'FR' : 'EN'}
      </button>
    </div>
  );
}