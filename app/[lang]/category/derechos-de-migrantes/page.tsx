'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useLanguage } from '../../../context/LanguageContext'; // IMPORTACIÓN REQUERIDA

// --- DATOS BILINGÜES COMPLETOS ---
const texts = {
  header: {
    library: { es: 'Biblioteca Legal', en: 'Legal Library' },
    title: { es: 'Derechos de Migrantes', en: 'Migrant Rights' },
    subtitle: {
      es: 'Información esencial, guías y recursos legales para proteger tu estatus y bienestar en Estados Unidos.',
      en: 'Essential information, guides, and legal resources to protect your status and well-being in the United States.',
    },
  },
  article: {
    tag: { es: 'Artículo Legal', en: 'Legal Article' },
    read_full: { es: 'Leer artículo completo', en: 'Read Full Article' },
    author_icon: { es: 'Autor', en: 'Author' }
  },
  articles: [
    {
      id: 12015,
      title: { es: "Derechos Migratorios: Qué hacer si son transgredidos", en: "Immigration Rights: What to do if they are violated" },
      url: "/derechos-de-migrantes/derechos-migratorios-que-hacer-si-son-transgredidos",
      author: "Julio César Sánchez",
      date: { es: "noviembre 29, 2024", en: "November 29, 2024" },
      isoDate: "2024-11-29",
      excerpt: {
        es: "El respeto a los derechos migratorios es un tema fundamental para la comunidad de migrantes latinoamericanos en Estados Unidos. Conocer y defender tus derechos es crucial, especialmente en situaciones donde puedes enfrentar abusos o discriminación...",
        en: "Respect for immigration rights is a fundamental issue for the community of Latin American migrants in the United States. Knowing and defending your rights is crucial, especially in situations where you may face abuse or discrimination...",
      },
    },
    {
      id: 11960,
      title: { es: "Asesoría Legal para Migrantes: Asegura tus Derechos", en: "Legal Advice for Migrants: Secure Your Rights" },
      url: "/derechos-de-migrantes/asesoria-legal-para-migrantes-asegura-tus-derechos",
      author: "Julio César Sánchez",
      date: { es: "noviembre 28, 2024", en: "November 28, 2024" },
      isoDate: "2024-11-28",
      excerpt: {
        es: "Enfrentar un proceso migratorio en Estados Unidos puede ser un desafío complejo, especialmente cuando los derechos migratorios no siempre son claros para quienes los necesitan y se desconoce sobre la asesoría legal para migrantes...",
        en: "Facing an immigration process in the United States can be a complex challenge, especially when immigration rights are not always clear to those who need them and legal advice for migrants is unknown...",
      },
    },
    {
      id: 11883,
      title: { es: "Derechos Migratorios para Víctimas de Crimen en EE.UU.", en: "Immigration Rights for Crime Victims in the U.S." },
      url: "/derechos-de-migrantes/derechos-migratorios-para-victimas-de-crimen",
      author: "Julio César Sánchez",
      date: { es: "noviembre 28, 2024", en: "November 28, 2024" },
      isoDate: "2024-11-28",
      excerpt: {
        es: "Si has sido víctima de un delito en Estados Unidos, comprender tus derechos migratorios puede ser clave para tu bienestar. En el Bufete de Abogados Manuel Solís reconocemos que ser víctima de un crimen puede ser abrumador y aterrador...",
        en: "If you have been a victim of a crime in the United States, understanding your immigration rights can be key to your well-being. At the Law Offices of Manuel Solís, we recognize that being a victim of a crime can be overwhelming and frightening...",
      },
    },
    {
      id: 11799,
      title: { es: "Protección de Derechos Migratorios Durante el Proceso", en: "Protection of Immigration Rights During the Process" },
      url: "/derechos-de-migrantes/proteccion-de-derechos-migratorios",
      author: "Julio César Sánchez",
      date: { es: "noviembre 27, 2024", en: "November 27, 2024" },
      isoDate: "2024-11-27",
      excerpt: {
        es: "El proceso migratorio en los Estados Unidos puede ser complejo y lleno de desafíos. Más aún para quienes buscan regularizar su estatus legal o enfrentar situaciones de detención y deportación. Por ello, la protección de derechos...",
        en: "The immigration process in the United States can be complex and full of challenges. Even more so for those seeking to regularize their legal status or face detention and deportation situations. Therefore, the protection of rights...",
      },
    },
    {
      id: 11529,
      title: { es: "Derechos fundamentales de Migrantes en EE.UU.", en: "Fundamental Rights of Migrants in the U.S." },
      url: "/derechos-de-migrantes/derechos-fundamentales-de-migrantes-en-ee-uu",
      author: "Julio César Sánchez",
      date: { es: "noviembre 26, 2024", en: "November 26, 2024" },
      isoDate: "2024-11-26",
      excerpt: {
        es: "Migrar a Estados Unidos es una decisión trascendental y, a menudo, un acto de valentía orillado por distintas situaciones. Muchas personas buscan un futuro mejor, estabilidad y oportunidades para ellas y sus familias...",
        en: "Migrating to the United States is a transcendental decision and often an act of courage driven by different situations. Many people seek a better future, stability, and opportunities for themselves and their families...",
      },
    },
    {
      id: 11319,
      title: { es: "Protección Legal para Migrantes Víctimas de Abuso o Crimen", en: "Legal Protection for Migrants Who Are Victims of Abuse or Crime" },
      url: "/derechos-de-migrantes/proteccion-legal-para-migrantes",
      author: "Julio César Sánchez",
      date: { es: "noviembre 25, 2024", en: "November 25, 2024" },
      isoDate: "2024-11-25",
      excerpt: {
        es: "Llegar a un nuevo país trae consigo desafíos significativos, especialmente para quienes enfrentan situaciones de abuso, violencia o explotación. Sin embargo, en Estados Unidos, las víctimas de abuso o crimen...",
        en: "Arriving in a new country brings significant challenges, especially for those facing situations of abuse, violence, or exploitation. However, in the United States, victims of abuse or crime...",
      },
    }
  ]
};

// Función auxiliar para obtener el texto traducido del objeto 'texts'
const getTranslatedText = (key: string, lang: 'es' | 'en') => {
  const parts = key.split('.');
  let current: any = texts;
  for (const part of parts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      return ''; 
    }
  }
  // Intenta devolver el idioma solicitado, si no existe, usa español como fallback.
  return current[lang] || current.es;
};


export default function DerechosDeMigrantesPage() {
  const { language } = useLanguage(); 

  // Función t (translate) que usa el idioma del contexto
  const t = (key: string) => getTranslatedText(key, language as 'es' | 'en');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="flex-grow pt-42 pb-20 px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <span className="block text-sm font-bold tracking-widest text-yellow-600 uppercase mb-2">
            {t('header.library')}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
            {t('header.title')}
          </h1>
          <div className="w-24 h-1 bg-yellow-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('header.subtitle')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {texts.articles.map((article) => (
            <Link href={article.url} key={article.id} className="group">
              <article className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-yellow-500/30 relative">
                
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 to-blue-700 transform origin-left transition-transform duration-300 group-hover:scale-x-100 scale-x-0"></div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-yellow-600 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                    {t('article.tag')}
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-800 transition-colors">
                    {article.title[language]}
                  </h2>

                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {article.excerpt[language]}
                  </p>

                  <div className="pt-6 mt-auto border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                      </div>
                      <span className="font-medium text-gray-700">{article.author}</span>
                    </div>
                    <time dateTime={article.isoDate} className="text-gray-400 font-medium text-xs">
                      {article.date[language]}
                    </time>
                  </div>
                </div>

                <div className="bg-gray-50 px-8 py-3 flex items-center justify-between group-hover:bg-blue-50 transition-colors duration-300">
                  <span className="text-sm font-bold text-blue-900 group-hover:text-blue-700">
                    {t('article.read_full')}
                  </span>
                  <svg className="w-5 h-5 text-blue-900 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}