import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - Dallas",
  address: "1120 Empire Central PL",
  city: "Dallas",
  state: "TX",
  zip: "75247",
  phone: "+1-214-753-8315",
  // Coordenadas para 1120 Empire Central PL
  latitude: "32.8122", 
  longitude: "-96.8728",
  mapUrl: "https://share.google/sotBoLXMzRVJcTVJ5"
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en Dallas, TX (Empire Central) | Manuel Solís`
    : `Lawyers in Dallas, TX (Empire Central) | Manuel Solis`;

  const description = isEs
    ? `Oficina de Manuel Solís en Dallas (Empire Central PL). Abogados de inmigración y accidentes listos para defender sus derechos. ¡Consulta Gratis!`
    : `Manuel Solis Law Office in Dallas (Empire Central PL). Immigration and accident attorneys ready to defend your rights. Free Consultation!`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/dallas`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/dallas`,
      images: ['/public/offices/Dallas.png'],
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
      ? 'Oficina legal en Dallas especializada en inmigración y accidentes.' 
      : 'Law office in Dallas specializing in immigration and accidents.',
    image: 'https://www.manuelsolis.com/logo-manuel-solis.png',
    url: `https://www.manuelsolis.com/${lang}/oficinas/dallas`,
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
        closes: '15:00'
      }
    ],
    sameAs: [
      'https://www.facebook.com/AbogadoManuelSolisOficial/',
      'https://twitter.com/AbogadoMSolis',
      OFFICE_INFO.mapUrl
    ]
  };
};

export default async function DallasPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLocalBusinessSchema(lang);

  return (
    <>
      <Script
        id="local-schema-dallas"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <OfficeClient />
    </>
  );
}