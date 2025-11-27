import type { Metadata } from 'next';
import { LanguageProvider } from '../context/LanguageContext';
import WhatsAppButton from '../components/WhatsAppButton';
import { translations, Language } from '../lib/translations';
import Script from 'next/script';

// --- CORRECCIÓN FINAL DEL IMPORT CSS ---
// Al estar en 'app/[lang]/layout.tsx', subimos un nivel (..) para encontrar 'app/globals.css'
import '../globals.css'; 

// --- DEFINICIONES DE TIPOS ---

interface LayoutParams {
  lang: Language; 
}

type Props = {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
};

// --- GENERATE METADATA ---

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  
  // Validación de seguridad por si acaso llega algo que no es idioma
  const currentLang = (lang === 'es' || lang === 'en') ? (lang as Language) : 'es';
  const t = translations[currentLang];
  
  return {
    title: t.seo.home.title,
    description: t.seo.home.description,
    keywords: t.seo.home.keywords,
    authors: [{ name: 'Manuel Solis Law Offices' }],
    openGraph: {
      title: t.seo.home.title,
      description: t.seo.home.description,
      url: 'https://comopuedoarreglar.com',
      siteName: 'Como Puedo Arreglar',
      locale: currentLang === 'es' ? 'es_MX' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://comopuedoarreglar.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: t.seo.home.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.home.title,
      description: t.seo.home.description,
      images: ['https://comopuedoarreglar.com/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://comopuedoarreglar.com/${currentLang}`,
      languages: {
        'es-MX': 'https://comopuedoarreglar.com/es',
        'en-US': 'https://comopuedoarreglar.com/en',
      },
    },
    other: {
      'og:site_name': 'Como Puedo Arreglar',
      'article:publisher': 'https://manuelsolis.com',
    },
  };
}

// --- LAYOUT PRINCIPAL ---

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  // Validación/Casteo
  const currentLang = (lang === 'es' || lang === 'en') ? (lang as Language) : 'es';
  const t = translations[currentLang];
  
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'Law Offices of Manuel Solis',
    alternateName: 'Como Puedo Arreglar',
    description: t.seo.home.description,
    url: 'https://comopuedoarreglar.com',
    telephone: '+1-866-979-5146',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '34.0522',
      longitude: '-118.2437',
    },
    areaServed: ['US', 'MX'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
    },
    sameAs: [
      'https://facebook.com/manuelsolis',
      'https://twitter.com/manuelsolis',
      'https://linkedin.com/company/manuelsolis',
      'https://instagram.com/manuelsolis',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Legal Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Immigration Law',
            description: 'Immigration legal services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Personal Injury',
            description: 'Accident and injury cases',
          },
        },
      ],
    },
    parentOrganization: {
      '@type': 'LegalService',
      name: 'Manuel Solis',
      url: 'https://manuelsolis.com',
    },
  };
  
  return (
    <html lang={currentLang} suppressHydrationWarning>
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
          strategy="beforeInteractive"
        />
        
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider initialLanguage={currentLang}>
          {children}
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}