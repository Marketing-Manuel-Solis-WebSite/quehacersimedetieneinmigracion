import type { Metadata } from 'next';
import OfficeClient from './OfficeClient';
import Script from 'next/script';

type Props = {
  params: Promise<{ lang: string }>;
};

// --- CONFIGURACIÓN SEO ESPECÍFICA DE LA OFICINA ---
const OFFICE_INFO = {
  name: "Manuel Solis Law Firm - El Paso",
  address: "3632 Admiral ST",
  city: "El Paso",
  state: "TX",
  zip: "79925",
  phone: "+1-915-233-7127",
  // Coordenadas para 3632 Admiral ST
  latitude: "31.7770", 
  longitude: "-106.3932",
  mapUrl: "https://share.google/uVjOe9OdhnatA0rr6" // URL CORRECTA DE GMB
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isEs = lang === 'es';

  const title = isEs 
    ? `Abogados en El Paso, TX (Admiral St) | Manuel Solís`
    : `Lawyers in El Paso, TX (Admiral St) | Manuel Solis`;

  const description = isEs
    ? `Oficina de Manuel Solís en El Paso (Admiral ST). Abogados de inmigración y accidentes en la frontera sirviendo a la comunidad hispana. ¡Llámenos!`
    : `Manuel Solis Law Office in El Paso (Admiral ST). Immigration and accident attorneys on the border serving the Hispanic community. Call us!`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.manuelsolis.com/${lang}/oficinas/el-paso`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.manuelsolis.com/${lang}/oficinas/el-paso`,
      images: ['/public/offices/El paso.png'],
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
      ? 'Oficina legal en El Paso especializada en inmigración y accidentes.' 
      : 'Law office in El Paso specializing in immigration and accidents.',
    image: 'https://www.manuelsolis.com/logo-manuel-solis.png',
    url: `https://www.manuelsolis.com/${lang}/oficinas/el-paso`,
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
      }
    ],
    sameAs: [
      'https://www.facebook.com/AbogadoManuelSolisOficial/',
      'https://twitter.com/AbogadoMSolis',
      OFFICE_INFO.mapUrl
    ]
  };
};

export default async function ElPasoPage({ params }: Props) {
  const { lang } = await params;
  const schemaData = getLocalBusinessSchema(lang);

  return (
    <>
      <Script
        id="local-schema-el-paso"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <OfficeClient />
    </>
  );
}