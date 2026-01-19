import type { Metadata } from 'next';
import { LanguageProvider } from '../context/LanguageContext';
import WhatsAppButton from '../components/WhatsAppButton';
import AIChatButton from '../components/AIChatButton';
import { translations, Language } from '../lib/translations';
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import '../globals.css'; 

interface LayoutParams {
  lang: Language; 
}

type Props = {
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
};

const SITE_URL = 'https://www.manuelsolis.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LawFirm',
  name: 'Manuel Solis Law Firm',
  alternateName: 'Abogados Manuel Solis',
  url: SITE_URL,
  logo: `${SITE_URL}/logo-manuel-solis.png`,
  sameAs: [
    'https://www.facebook.com/AbogadoManuelSolisOficial/',
    'https://twitter.com/AbogadoMSolis',
    'https://www.linkedin.com/company/manuel-solis-law-firm/',
    'https://www.instagram.com/abogadomanuelsolisoficial/',
    'https://www.youtube.com/channel/UCWD61mNBq6qJ0BMhj_-a4Vg'
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-866-979-5146',
    contactType: 'customer service',
    areaServed: 'US', // Audiencia principal: Estados Unidos
    availableLanguage: ['English', 'Spanish']
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? (lang as Language) : 'es';
  const t = translations[currentLang];
  
  const localeSEO = currentLang === 'es' ? 'es-US' : 'en-US';

  const keywordList = typeof t.seo.home.keywords === 'string' 
    ? t.seo.home.keywords.split(',').map(k => k.trim()) 
    : t.seo.home.keywords;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.seo.home.title,
      template: `%s | Manuel Solis Law Firm`
    },
    description: t.seo.home.description,
    keywords: [
      ...keywordList,
      "Abogado de Inmigración USA",
      "Immigration Lawyer USA",
      "Defensa Criminal",
      "Accidentes de Auto"
    ],
    authors: [{ name: 'Manuel Solis Law Firm' }],
    creator: 'Manuel Solis',
    publisher: 'Manuel Solis Law Firm',
    
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
      other: [
        { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#009b3a' },
        { rel: 'manifest', url: '/site.webmanifest' },
      ],
    },
    
    themeColor: '#051120',
    
    openGraph: {
      title: t.seo.home.title,
      description: t.seo.home.description,
      url: `${SITE_URL}/${currentLang}`,
      siteName: 'Manuel Solis Law Firm',
      locale: localeSEO,
      type: 'website',
      images: [
        {
          url: `/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Manuel Solis Law Firm - Inmigración y Accidentes',
        },
      ],
    },
    
    twitter: {
      card: 'summary_large_image',
      title: t.seo.home.title,
      description: t.seo.home.description,
      creator: '@manuelsolis',
      images: [`/og-image.jpg`],
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
      canonical: `${SITE_URL}/${currentLang}`,
      languages: {
        'es-US': `${SITE_URL}/es`, // SEO Targeting específico para hispanos en USA
        'en-US': `${SITE_URL}/en`,
        'x-default': `${SITE_URL}/es`, // Fallback por defecto
      },
    },
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  const currentLang = (lang === 'es' || lang === 'en') ? (lang as Language) : 'es';
  
  // HTML Lang attribute corregido para targeting
  const htmlLang = currentLang === 'es' ? 'es-US' : 'en-US';
  
  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        {/* 1. SCHEMA ORG GLOBAL - ORGANIZATION ENTITY */}
        <Script
          id="schema-org-global"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          strategy="beforeInteractive"
        />
        
        {/* 2. GOOGLE ANALYTICS (GA4) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-V5F8J8QMZ4"
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
              gtag('config', 'G-V5F8J8QMZ4'); 
            `,
          }}
        />

        {/* 3. META PIXEL */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1679590710105917');
              fbq('track', 'PageView');
            `,
          }}
        />

        {/* 4. TIKTOK PIXEL */}
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                
                ttq.load('CVERFVJC77U9L0C1P6O0');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      </head>
      
      <body suppressHydrationWarning>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1679590710105917&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <LanguageProvider initialLanguage={currentLang}>
          {children}
          <WhatsAppButton />
          <AIChatButton />
          
          <Analytics />
          <SpeedInsights />
          
        </LanguageProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return [{ lang: 'es' }, { lang: 'en' }];
}