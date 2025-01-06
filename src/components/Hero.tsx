import React from 'react';
import { Code2, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function Hero() {
  const { t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 text-white">
      <div className="container mx-auto px-6 py-32">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-6">
            <Code2 size={40} className="text-purple-400" />
            <h1 className="text-4xl md:text-6xl font-bold">{t('hero.title')}</h1>
          </div>
          <h2 className="text-xl md:text-2xl text-purple-200 mb-8">
            {t('hero.subtitle')}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12">
            {t('hero.description')}
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => scrollToSection('pricing')}
              className="bg-purple-500 hover:bg-purple-600 px-8 py-3 rounded-full font-semibold flex items-center gap-2"
            >
              {t('hero.getStarted')} <Sparkles size={20} />
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="border border-purple-400 hover:bg-purple-800/30 px-8 py-3 rounded-full font-semibold"
            >
              {t('hero.ourWork')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="border border-purple-400 hover:bg-purple-800/30 px-8 py-3 rounded-full font-semibold"
            >
              {t('hero.contactForm')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}