import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Memphis",
  address: "3385 Airways Blvd, STE 320",
  city: "Memphis",
  state: "TN",
  zip: "38116",
  phone: "+1-901-557-8357",
  // Coordenadas aproximadas para 3385 Airways Blvd
  latitude: "35.0673", 
  longitude: "-89.9928",
  mapUrl: "https://share.google/Fc3ISgQAihcayfmws" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Memphis, TN (Airways Blvd) | Manuel Solís`
    : `Lawyers in Memphis, TN (Airways Blvd) | Manuel Solis`;

  const description = isEs
    ? `Oficina de Manuel Solís en Memphis (Airways Blvd). Abogados de inmigración, multas y criminal. Abogada Lupita Martínez lista para ayudarle.`
    : `Manuel Solis Law Office in Memphis (Airways Blvd). Immigration, ticket, and criminal defense attorneys. Attorney Lupita Martinez ready to help you.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/memphis`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/memphis`,
      images: ['/public/offices/ofAirways.png'],
      type: 'website', 
    }
  };
}

// SCHEMA LOCAL BUSINESS
const getLocalBusinessSchema = (lang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    name: 'Manuel Solis Law Firm - Memphis',
    description: lang === 'es' 
      ? 'Oficina legal en Memphis especializada en inmigración y ley civil.' 
      : 'Law office in Memphis specializing in immigration and civil law.',
    image: 'https://www.manuelsolis.com/logo-manuel-solis.png',
    url: `https://www.manuelsolis.com/${lang}/oficinas/memphis`,
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
        closes: '17:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/AbogadoManuelSolisOficial/',
      'https://twitter.com/AbogadoMSolis',
      OFFICE_INFO.mapUrl
    ]
  };
};

export default async function MemphisPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLocalBusinessSchema(lang);

  return (
    <>
      <Script
        id="local-schema-memphis"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <OfficeClient />
    </>
  );
}