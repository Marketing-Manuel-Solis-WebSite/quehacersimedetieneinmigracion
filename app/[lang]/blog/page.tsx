import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';

// Componentes
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BlogFeed from '../../components/blogs/BlogFeed';

// --- CONFIGURACIÓN DEL SITIO ---
const SITE_URL = 'https://www.manuelsolis.com';
// ✅ CLAVE: Esta es la imagen que se mostrará al compartir el link general del blog
const DEFAULT_OG_IMAGE = `${SITE_URL}/blog/visa-u.png`; 

// --- DATOS CENTRALIZADOS DEL BLOG (CMS Simulado) ---
const BLOG_DATA = {
  posts: [
    {
      id: 'permiso_de_trabajo_visa_u',
      slug: 'permiso_de_trabajo_visa_u',
      title: { 
        es: 'Permiso de trabajo Visa U (Bona Fide) antes de la aprobación final', 
        en: 'U Visa Work Permit (Bona Fide) Before Final Approval' 
      },
      excerpt: { 
        es: '¿Solicitaste la Visa U y esperas sin poder trabajar? Descubre cómo obtener un permiso de trabajo bajo la determinación Bona Fide y asegura tu estabilidad económica.', 
        en: 'Did you apply for the U Visa and are waiting without being able to work? Discover how to obtain a work permit under Bona Fide determination and secure your financial stability.' 
      },
      categoryId: 'visa-u',
      category: { es: 'Visa U', en: 'U Visa' },
      author: 'Manuel Solís',
      date: '2025-01-16',
      readTime: '8 min',
      // ✅ ACTUALIZADO: Ruta correcta de la imagen subida en public
      image: '/blog/visa-u.png', 
      featured: true
    }
    // Aquí puedes agregar más posts en el futuro...
  ],
  categories: [
    { id: 'all', es: 'Todos', en: 'All' },
    { id: 'visa-u', es: 'Visa U', en: 'U Visa' },
    { id: 'immigration', es: 'Inmigración', en: 'Immigration' },
    { id: 'work-permits', es: 'Permisos de Trabajo', en: 'Work Permits' }
  ],
  uiText: {
    hero: {
      badge: { es: 'BLOG LEGAL', en: 'LEGAL BLOG' },
      title: { es: 'Noticias de Inmigración y Consejos Legales', en: 'Immigration News & Legal Advice' },
      subtitle: { es: 'Recursos confiables sobre la Visa U, residencia, defensa contra deportación y más, escritos por expertos.', en: 'Reliable resources on U Visa, residency, deportation defense, and more, written by experts.' }
    },
    featured: { es: 'Artículo Destacado', en: 'Featured Article' },
    latest: { es: 'Últimos Artículos', en: 'Latest Articles' },
    noResults: { es: 'No se encontraron artículos', en: 'No articles found' }
  }
};

// --- METADATA SEO POTENCIADA ---
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? 'Blog de Inmigración y Noticias Legales | Manuel Solís Law Firm' 
    : 'Immigration Blog & Legal News | Manuel Solis Law Firm';
  
  const description = isEs
    ? 'Manténgase informado con las últimas noticias de inmigración, cambios en la Visa U, consejos para la residencia y guías legales del Abogado Manuel Solís.'
    : 'Stay informed with the latest immigration news, U Visa updates, residency tips, and legal guides from Attorney Manuel Solis.';

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/blog`,
      languages: {
        'es-US': `${SITE_URL}/es/blog`,
        'en-US': `${SITE_URL}/en/blog`,
      },
    },
    // ✅ OPEN GRAPH: Aquí aseguramos que al compartir se vea la imagen
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/${lang}/blog`,
      type: 'website',
      siteName: 'Manuel Solís Law Firm',
      locale: isEs ? 'es_US' : 'en_US',
      images: [{
        url: DEFAULT_OG_IMAGE, // La imagen de la Visa U
        width: 1200,
        height: 630,
        alt: title
      }]
    },
    // ✅ TWITTER CARD: Para que se vea grande en X/Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [DEFAULT_OG_IMAGE], 
      creator: '@AbogadoMSolis'
    },
    keywords: isEs 
      ? ['blog inmigración', 'noticias visa u', 'abogado manuel solis', 'permiso trabajo', 'noticias legales usa', 'bona fide visa u']
      : ['immigration blog', 'u visa news', 'attorney manuel solis', 'work permit', 'legal news usa', 'bona fide u visa'],
  };
}

// --- SCHEMA.ORG (JSON-LD) PARA BLOG ---
const getBlogSchema = (lang: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": lang === 'es' ? "Blog Legal Manuel Solís" : "Manuel Solis Legal Blog",
    "description": lang === 'es' ? "Recursos y noticias legales de inmigración." : "Immigration legal resources and news.",
    "url": `${SITE_URL}/${lang}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Manuel Solis Law Firm",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo-manuel-solis.png`
      }
    },
    "blogPost": BLOG_DATA.posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title[lang as 'es'|'en'],
      "description": post.excerpt[lang as 'es'|'en'],
      "datePublished": post.date,
      "author": {
        "@type": "Person",
        "name": post.author
      },
      "url": `${SITE_URL}/${lang}/blog/${post.slug}`,
      "image": `${SITE_URL}${post.image}`
    }))
  };
};

export default async function BlogPageIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? lang : 'es';
  const schemaData = getBlogSchema(currentLang);

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Header />
      
      <BlogFeed 
        initialPosts={BLOG_DATA.posts}
        categories={BLOG_DATA.categories}
        uiText={BLOG_DATA.uiText}
        lang={currentLang}
      />

      <Footer />
    </>
  );
}