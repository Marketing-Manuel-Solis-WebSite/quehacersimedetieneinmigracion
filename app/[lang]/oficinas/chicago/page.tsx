import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Chicago",
  address: "6000 W Cermak Rd",
  city: "Cicero",
  state: "IL",
  zip: "60804",
  phone: "+1-312-477-0389",
  // Coordenadas para 6000 W Cermak Rd
  latitude: "41.8517", 
  longitude: "-87.7745",
  mapUrl: "https://share.google/IwdeP5BMwUKl3rB9G"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Chicago, IL (Cicero) | Manuel Solís`
    : `Lawyers in Chicago, IL (Cicero) | Manuel Solis`;

  const description = isEs
    ? `Oficina de Manuel Solís en Chicago (Cicero, IL). Abogados de inmigración, familia y accidentes sirviendo a la comunidad hispana. ¡Consulta Gratis!`
    : `Manuel Solis Law Office in Chicago (Cicero, IL). Immigration, family, and accident attorneys serving the community. Free Consultation!`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/chicago`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/chicago`,
      images: ['/public/offices/Chicago.png'],
      type: 'website', 
    }
  };
}

// SCHEMA LOCAL BUSINESS
const getLocalBusinessSchema = (lang: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': ['LegalService', 'Attorney'],
    name: 'Manuel Solis Law Firm',
    description: lang === 'es' 
      ? 'Oficina legal en Chicago (Cicero) especializada en inmigración, familia y accidentes.' 
      : 'Law office in Chicago (Cicero) specializing in immigration, family, and accidents.',
    image: 'https://www.manuelsolis.com/logo-manuel-solis.png',
    url: `https://www.manuelsolis.com/${lang}/oficinas/chicago`,
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
        closes: '16:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/AbogadoManuelSolisOficial/',
      'https://twitter.com/AbogadoMSolis',
      OFFICE_INFO.mapUrl
    ]
  };
};

export default async function ChicagoPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLocalBusinessSchema(lang);

  return (
    <>
      <Script
        id="local-schema-chicago"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <OfficeClient />
    </>
  );
}