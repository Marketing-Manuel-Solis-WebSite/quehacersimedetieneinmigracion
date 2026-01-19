import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Los Angeles",
  address: "8337 Telegraph Rd, STE 115",
  city: "Pico Rivera",
  state: "CA",
  zip: "90660",
  phone: "+1-213-784-1554",
  // Coordenadas para 8337 Telegraph Rd, Pico Rivera
  latitude: "33.9575", 
  longitude: "-118.1065",
  mapUrl: "https://share.google/VnrxOpNfWDbNYkwjP" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Los Ángeles, CA (Pico Rivera) | Manuel Solís`
    : `Lawyers in Los Angeles, CA (Pico Rivera) | Manuel Solis`;

  const description = isEs
    ? `Oficina de Manuel Solís en Los Ángeles (Pico Rivera). Abogados expertos en inmigración sirviendo a la comunidad de California. ¡Consulta Gratis!`
    : `Manuel Solis Law Office in Los Angeles (Pico Rivera). Expert immigration attorneys serving the California community. Free Consultation!`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/losangeles`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/losangeles`,
      images: ['/public/offices/Los Angeles.png'],
      type: 'website', 
    }
  };
}

// SCHEMA LOCAL BUSINESS
const getLocalBusinessSchema = (lang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    name: 'Manuel Solis Law Firm - Los Angeles',
    description: lang === 'es' 
      ? 'Oficina legal en Los Ángeles (Pico Rivera) especializada en inmigración.' 
      : 'Law office in Los Angeles (Pico Rivera) specializing in immigration.',
    image: 'https://www.manuelsolis.com/logo-manuel-solis.png',
    url: `https://www.manuelsolis.com/${lang}/oficinas/losangeles`,
    telephone: OFFICE_INFO.phone,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: OFFICE_INFO.address,
      addressLocality: OFFICE_INFO.city,
      addressRegion: OFFICE_INFO.state,
      postalCode: OFFICE_INFO.zip,
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: OFFICE_INFO.latitude,
      longitude: OFFICE_INFO.longitude
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '14:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/AbogadoManuelSolisOficial/',
      'https://twitter.com/AbogadoMSolis',
      OFFICE_INFO.mapUrl
    ]
  };
};

export default async function LosAngelesPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLocalBusinessSchema(lang);

  return (
    <>
      <Script
        id="local-schema-los-angeles"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <OfficeClient />
    </>
  );
}