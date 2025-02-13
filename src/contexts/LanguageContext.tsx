import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguageState] = useState<Language>('fr');

  useEffect(() => {
    const path = location.pathname;
    const langFromPath = path.split('/')[1] as Language;
    if (langFromPath && (langFromPath === 'en' || langFromPath === 'fr')) {
      setLanguageState(langFromPath);
    } else {
      navigate(`/en${path}`, { replace: true });
    }
  }, [location.pathname]);

  const setLanguage = (lang: Language) => {
    const currentPath = location.pathname;
    const pathWithoutLang = currentPath.split('/').slice(2).join('/');
    navigate(`/${lang}/${pathWithoutLang}`);
    setLanguageState(lang);
  };

  const t = (key: string): string => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    'hero.title': 'Web Solutions',
    'hero.subtitle': 'Crafting Digital Excellence, One Pixel at a Time',
    'hero.description': 'We transform your vision into stunning digital experiences. Our expert team delivers cutting-edge web solutions that drive results.',
    'hero.getStarted': 'Get Started',
    'hero.ourWork': 'Our Work',
    'hero.contactForm': 'Contact',
    'portfolio.title': 'Our Latest Projects',
    'testimonials.title': 'What Our Clients Say',
    'contact.title': 'Get in Touch',
    'contact.info': 'Contact Information',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    // Pricing translations
    'pricing.title': 'Transparent Pricing Plans',
    'pricing.subtitle': 'Choose the perfect plan for your business needs. All plans include expert design, responsive layouts, and SEO optimization.',
    'pricing.popularChoice': 'Popular Choice',
    'pricing.oneTime': 'one-time',
    'pricing.starter.name': 'Starter',
    'pricing.starter.description': 'Perfect for small businesses starting their online journey',
    'pricing.starter.feature1': '1 page landing site',
    'pricing.starter.feature2': '2 rounds of revisions',
    'pricing.starter.feature3': '3 months hosting included',
    'pricing.starter.feature4': 'Basic SEO optimization',
    'pricing.starter.feature5': 'Mobile responsive design',
    'pricing.starter.cta': 'Get Started',
    'pricing.professional.name': 'Professional',
    'pricing.professional.description': 'Ideal for growing businesses needing more features',
    'pricing.professional.feature1': '3 pages website',
    'pricing.professional.feature2': '4 rounds of revisions',
    'pricing.professional.feature3': '6 months hosting included',
    'pricing.professional.feature4': 'Advanced SEO optimization',
    'pricing.professional.feature5': 'Custom contact forms',
    'pricing.professional.feature6': 'Analytics integration',
    'pricing.professional.cta': 'Choose Professional',
    'pricing.business.name': 'Business',
    'pricing.business.description': 'Complete solution for established businesses',
    'pricing.business.feature1': '5 pages website',
    'pricing.business.feature2': '6 rounds of revisions',
    'pricing.business.feature3': '12 months hosting included',
    'pricing.business.feature4': 'Premium SEO optimization',
    'pricing.business.feature5': 'Custom animations',
    'pricing.business.feature6': 'Priority support',
    'pricing.business.feature7': 'Social media integration',
    'pricing.business.cta': 'Choose Business',
    'pricing.enterprise.name': 'Enterprise',
    'pricing.enterprise.description': 'Custom solutions for complex projects',
    'pricing.enterprise.price': '2000+',
    'pricing.enterprise.feature1': 'Unlimited pages',
    'pricing.enterprise.feature2': 'Unlimited revisions',
    'pricing.enterprise.feature3': '24 months hosting included',
    'pricing.enterprise.feature4': 'Enterprise-grade SEO',
    'pricing.enterprise.feature5': 'Custom functionality',
    'pricing.enterprise.feature6': 'Dedicated support team',
    'pricing.enterprise.feature7': 'Advanced integrations',
    'pricing.enterprise.feature8': 'Performance optimization',
    'pricing.enterprise.cta': 'Contact Us',
    'pricing.note.title': 'Custom Requirements?',
    'pricing.note.content': 'Need something specific? Our enterprise solutions are tailored to your unique needs. Contact us to discuss your project requirements.',
  },
  fr: {
    'hero.title': 'Web Solutions',
    'hero.subtitle': 'Soyez visible. Gagnez en crédibilité. Attirez plus de clients',
    'hero.description': "Nous créons votre site vitrine sur mesure pour une présence en ligne efficace et impactante. Design, contenu, hébergement, maintenance: nous nous chargeons de tout.",
    'hero.description2': "",
    'hero.getStarted': 'Commencer',
    'hero.ourWork': 'Nos Projets',
    'hero.contactForm': 'Contact',
    'portfolio.title': 'Nos Derniers Projets',
    'testimonials.title': 'Ce Que Disent Nos Clients',
    'contact.title': 'Contactez-Nous',
    'contact.info': 'Informations de Contact',
    'contact.name': 'Nom',
    'contact.email': 'Email', 
    'contact.message': 'Message',
    'contact.send': 'Envoyer le Message',
    'contact.sending': 'Envoi en cours...',
    // Pricing translations
    'pricing.title': 'Nos Forfaits Transparents',
    'pricing.subtitle': 'Choisissez le forfait parfait pour vos besoins. Tous nos forfaits incluent un design expert, des mises en page responsives et une optimisation SEO.',
    'pricing.popularChoice': 'Plus Populaire',
    'pricing.oneTime': 'unique',
    'pricing.starter.name': 'Débutant',
    'pricing.starter.description': 'Parfait pour les petites entreprises débutant leur présence en ligne',
    'pricing.starter.feature1': 'Site landing page 1 page',
    'pricing.starter.feature2': '2 cycles de révisions',
    'pricing.starter.feature3': '3 mois d\'hébergement inclus',
    'pricing.starter.feature4': 'Optimisation SEO basique',
    'pricing.starter.feature5': 'Design responsive mobile',
    'pricing.starter.cta': 'Commencer',
    'pricing.professional.name': 'Professionnel',
    'pricing.professional.description': 'Idéal pour les entreprises en croissance',
    'pricing.professional.feature1': 'Site web 3 pages',
    'pricing.professional.feature2': '4 cycles de révisions',
    'pricing.professional.feature3': '6 mois d\'hébergement inclus',
    'pricing.professional.feature4': 'Optimisation SEO avancée',
    'pricing.professional.feature5': 'Formulaires de contact personnalisés',
    'pricing.professional.feature6': 'Intégration analytics',
    'pricing.professional.cta': 'Choisir Professionnel',
    'pricing.business.name': 'Business',
    'pricing.business.description': 'Solution complète pour entreprises établies',
    'pricing.business.feature1': 'Site web 5 pages',
    'pricing.business.feature2': '6 cycles de révisions',
    'pricing.business.feature3': '12 mois d\'hébergement inclus',
    'pricing.business.feature4': 'Optimisation SEO premium',
    'pricing.business.feature5': 'Animations personnalisées',
    'pricing.business.feature6': 'Support prioritaire',
    'pricing.business.feature7': 'Intégration réseaux sociaux',
    'pricing.business.cta': 'Choisir Business',
    'pricing.enterprise.name': 'Entreprise',
    'pricing.enterprise.description': 'Solutions sur mesure pour projets complexes',
    'pricing.enterprise.price': '2000+',
    'pricing.enterprise.feature1': 'Pages illimitées',
    'pricing.enterprise.feature2': 'Révisions illimitées',
    'pricing.enterprise.feature3': '24 mois d\'hébergement inclus',
    'pricing.enterprise.feature4': 'SEO niveau entreprise',
    'pricing.enterprise.feature5': 'Fonctionnalités personnalisées',
    'pricing.enterprise.feature6': 'Équipe de support dédiée',
    'pricing.enterprise.feature7': 'Intégrations avancées',
    'pricing.enterprise.feature8': 'Optimisation des performances',
    'pricing.enterprise.cta': 'Contactez-nous',
    'pricing.note.title': 'Besoins Spécifiques ?',
    'pricing.note.content': 'Besoin de quelque chose de particulier ? Nos solutions entreprise sont adaptées à vos besoins uniques. Contactez-nous pour discuter de vos exigences.',
  }
};