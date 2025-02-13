import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import terminalCV from '../assets/portfolio/terminal-cv.png';
import naturePaysage from '../assets/portfolio/nature-paysage.png';

const projects = [
  {
    title: "Nature Paysage",
    description: "Réalisation d'une landing page moderne pour un paysagiste, mettant en avant ses services et projets.",
    image: naturePaysage,
    tags: ["Paysaiste", "Jardin", "Espace vert"],
    url: "https://nature-paysage.vercel.app/"
  },
  {
    title: "Terminal CV",
    description: "Interactive application designed as a computer terminal interface",
    image: terminalCV,
    tags: ["Terminal", "Interactive", "React"],
    url: "https://cv.demesh.link"
  },
];

export function Portfolio() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-gray-50 min-h-screen" id="portfolio">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">{t('portfolio.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden group">
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative overflow-hidden"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ExternalLink className="text-white" size={24} />
                </div>
              </a>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <a 
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex} 
                      className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}