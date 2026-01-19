'use client';

import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ContactForm from '../../components/ContactForm';
import { Users, Shield, Zap, FileText, ExternalLink, Phone, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion'; 
import { Outfit } from 'next/font/google';

// --- FUENTE Y COLORES ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '300', '400', '500', '700', '900'] 
})

// --- TIPOS ---
interface BilingualText {
  es: string;
  en: string;
}

interface ResourceItemBilingual {
  title: BilingualText;
  content: BilingualText;
}

// --- UTILIDAD: PARSEAR MARKDOWN A HTML y LINKS ---
const parseContent = (text: string) => {
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  parsed = parsed.replace(/\n/g, '<br />');
  // Reemplazar [Link Text](URL) por etiquetas <a> con estilos
  parsed = parsed.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#B2904D] hover:text-white underline decoration-dotted transition-colors inline-flex items-center gap-1">$1 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>');
  return parsed;
};

const getText = (obj: BilingualText, lang: 'es' | 'en'): string => {
  return obj[lang] || obj.es;
};

// --- COMPONENTE RECURSO ESTÁTICO OPTIMIZADO ---
function StaticResourceItem({ item, lang }: { item: ResourceItemBilingual, lang: 'es' | 'en' }) {
    const rawContent = getText(item.content, lang);
    const contentHtml = parseContent(rawContent);
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-50px" }}
        className="w-full mb-6 p-6 lg:p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.2)] hover:border-[#B2904D]/30 transition-all duration-300"
      >
        <h3 className="text-xl font-bold mb-4 pb-3 border-b border-white/10 text-[#B2904D] flex items-center gap-2">
           <FileText size={20} />
           {getText(item.title, lang)}
        </h3>
        <div 
          className="text-white/80 text-base font-light leading-relaxed space-y-3"
          dangerouslySetInnerHTML={{ __html: contentHtml }} 
        />
      </motion.div>
    );
}

// --- TEXTOS UI ---
const texts = {
  hero: {
    title1: { es: 'AYUDA LEGAL INMEDIATA', en: 'IMMEDIATE LEGAL AID' },
    title2: { es: 'PARA DETENIDOS POR', en: 'FOR THOSE DETAINED BY' },
    title3: { es: 'INMIGRACIÓN', en: 'IMMIGRATION' }
  },
  
  section1: {
    title: { es: 'Localizando a seres queridos', en: 'Locating Loved Ones' },
    titleHighlight: { es: 'detenidos', en: 'Detained' },
    intro: { es: 'Si un ser querido ha sido detenido por el Departamento de Inmigración (ICE), es esencial **actuar inmediatamente** para encontrar su ubicación y asegurar su representación legal.', en: 'If a loved one has been detained by the Immigration Department (ICE), it is essential to **act immediately** to find their location and secure legal representation.' },
    canHelp: { es: 'Nuestro equipo inicia acción legal para:', en: 'Our team initiates legal action to:' },
    help1: { es: 'Localizar al familiar en centros de detención (ICE Locator)', en: 'Locate the family member in detention centers (ICE Locator)' },
    help2: { es: 'Buscar su liberación bajo fianza (Bond Hearings)', en: 'Seek their release through Bond Hearings' },
    help3: { es: 'Iniciar procedimientos legales (Asilo, Cancelación de Remoción)', en: 'Initiate legal proceedings (Asylum, Cancellation of Removal)' },
  },

  section2: {
    title: { es: 'Línea de Ayuda Inmediata', en: 'Immediate Assistance Hotline' },
    hours: { es: 'Disponible Lunes a Viernes (9AM a 9PM CST)', en: 'Available Monday to Friday (9AM to 9PM CST)' }
  },

  section3: {
    title: { es: 'Solicitantes de asilo:', en: 'Asylum Seekers:' },
    titleHighlight: { es: 'Navegando el proceso', en: 'Navigating the Process' },
    intro: { es: 'Los solicitantes de asilo deben participar en entrevistas rigurosas, conocidas como entrevistas de', en: 'Asylum seekers must participate in rigorous interviews, known as' }, 
    credibleFear: { es: '"miedo creíble"', en: '"credible fear"' },
    or: { es: 'o', en: 'or' },
    reasonableFear: { es: '"miedo razonable"', en: '"reasonable fear"' },
    guidance: { es: 'Nuestros abogados experimentados lo guiarán a través del proceso, asegurándose de que esté bien preparado para estas entrevistas críticas.', en: 'Our experienced attorneys can guide you through the process, ensuring you are well prepared for these critical interviews.' },
    prep: { es: 'Preparación completa para entrevistas de asilo', en: 'Complete preparation for asylum interviews' },
    advice: { es: 'Asesoría legal especializada', en: 'Specialized legal advice' },
    support: { es: 'Acompañamiento durante todo el proceso', en: 'Support throughout the process' }
  },

  section4: {
    title: { es: 'Experiencia que hace la', en: 'Experience that makes the' },
    titleHighlight: { es: 'diferencia', en: 'difference' },
    stat1Title: { es: '50,000+', en: '50,000+' },
    stat1Text: { es: 'Casos manejados exitosamente en 35 años.', en: 'Successful cases handled in 35 years.' },
    stat2Title: { es: '24/7', en: '24/7' },
    stat2Text: { es: 'Monitoreo de su caso de detención.', en: 'Monitoring of your detention case.' },
    stat3Title: { es: 'Atención', en: 'Personalized' },
    stat3Text: { es: 'Personalizada y bilingüe.', en: 'and Bilingual Attention.' },
    commitment: { es: 'Oficinas del Abogado Manuel Solís se compromete a brindarle la defensa más vigorosa y la compasión que usted y su familia merecen durante esta difícil situación.', en: 'The Law Office of Manuel Solís is committed to providing you with the most vigorous defense and the compassion you and your family deserve during this difficult situation.' }
  },

  sectionGovernment: {
    title: { es: 'Recursos Gubernamentales Clave', en: 'Key Government Resources' },
    subtitle: { es: 'Información oficial y herramientas de agencias de EE. UU. (USCIS, ICE, EOIR).', en: 'Official information and tools from U.S. agencies (USCIS, ICE, EOIR).' },
  },
  
  contact: {
      title: { es: 'Solicitar Evaluación de Caso', en: 'Request Case Evaluation' },
      subtitle: { es: 'Complete el formulario para recibir asistencia legal inmediata.', en: 'Fill out the form to receive immediate legal assistance.' }
  }
}

// --- DATA DE RECURSOS ---
const governmentResourcesData: ResourceItemBilingual[] = [
  {
    title: { 
      es: 'Localizador de Detenidos de ICE (Online Detainee Locator System)', 
      en: 'ICE Online Detainee Locator System (ODLS)' 
    },
    content: { 
      es: 'Es la herramienta más importante para encontrar a un ser querido bajo la custodia de ICE. Puede buscar por **Número de Extranjero (A-number)** y país, o por **nombre y fecha de nacimiento**.<br />*Recuerde que los detenidos recientemente transferidos o procesados pueden tardar hasta 48 horas en aparecer en el sistema.*<br /><br />**Enlaces:**<br />- [Buscador Oficial de Detenidos (ODLS)](https://locator.ice.gov/odls)<br />- [Contacto de ERO para consultas](https://www.ice.gov/contact/ero)',
      en: 'This is the most important tool for finding a loved one in ICE custody. You can search by **Alien Number (A-number)** and country, or by **name and date of birth**.<br />*Please note that recently transferred or processed detainees may take up to 48 hours to appear in the system.*<br /><br />**Links:**<br />- [Official Detainee Search (ODLS)](https://locator.ice.gov/odls)<br />- [ERO Contact for inquiries](https://www.ice.gov/contact/ero)'
    }
  },
  {
    title: { 
      es: 'Fianzas de Inmigración (Bonds): Tipos y Pago', 
      en: 'Immigration Bonds: Types and Payment' 
    },
    content: { 
      es: 'Existen varios tipos de fianzas (e.g., Fianza de Entrega, Fianza de Salida Voluntaria). El monto es fijado por un Oficial de ICE o un Juez de Inmigración. El pago debe realizarse en efectivo o giro postal en una oficina de campo autorizada de ERO. <br /><br />**Información Vital:**<br />- **Fianza de Entrega:** Asegura que el detenido se presentará a todas las audiencias.<br />- **Pago:** Se debe pagar el 100% del monto, que es reembolsable si se cumplen todas las condiciones.',
      en: 'There are several types of bonds (e.g., Delivery Bond, Voluntary Departure Bond). The amount is set by an ICE Officer or an Immigration Judge. Payment must be made in cash or money order at an authorized ERO field office. <br /><br />**Vital Information:**<br />- **Delivery Bond:** Ensures the detainee will appear at all hearings.<br />- **Payment:** 100% of the amount must be paid, which is refundable if all conditions are met.'
    }
  },
  {
    title: {
      es: 'Directorio de Centros de Detención Clave (TX/LA)',
      en: 'Directory of Key Detention Centers (TX/LA)'
    },
    content: {
      es: '**Localizaciones Comunes y Enlaces Oficiales:**<br />- **CCA Centro de Procesamiento de Houston:** 15850 Export Plaza Dr. [Enlace ICE](https://www.ice.gov/es/instalaciones-detencion/centro-de-detencion-por-contrato-de-houston)<br />- **Joe Corley Centro de Detención:** 500 Hilbig Road, Conroe, TX. [Enlace ICE](http://www.ice.gov/detention-facility/joe-corley-detention-facility)<br />- **Centro de Procesamiento de Laredo:** 4702 Saunders St. [Enlace ICE](https://www.ice.gov/es/instalaciones-detencion/centro-de-detencion-de-laredo)<br />- **Río Grande Centro de Detención:** 1001 San Rio Blvd., Laredo. [Enlace ICE](https://www.ice.gov/detain/detention-facilities/rio-grande-detention-center)<br />- **T. Don Hutto Centro Residencial:** 1001 Welch, Taylor, TX. [Enlace ICE](http://www.ice.gov/detention-facility/t-don-hutto-residential-center)<br />- **Centro de Detención South Texas:** 566 Veteran Dr., Pearsall, TX. [Enlace ICE](https://www.ice.gov/detain/detention-facilities/south-texas-family-residential-center)',
      en: '**Common Locations and Official Links:**<br />- **CCA Houston Processing Center:** 15850 Export Plaza Dr. [ICE Link](https://www.ice.gov/es/instalaciones-detencion/centro-de-detencion-por-contrato-de-houston)<br />- **Joe Corley Detention Facility:** 500 Hilbig Road, Conroe, TX. [ICE Link](http://www.ice.gov/detention-facility/joe-corley-detention-facility)<br />- **Laredo Processing Center:** 4702 Saunders St. [ICE Link](https://www.ice.gov/es/instalaciones-detencion/centro-de-detencion-de-laredo)<br />- **Rio Grande Detention Center:** 1001 San Rio Blvd., Laredo. [ICE Link](https://www.ice.gov/detain/detention-facilities/rio-grande-detention-center)<br />- **T. Don Hutto Residential Center:** 1001 Welch, Taylor, TX. [ICE Link](http://www.ice.gov/detention-facility/t-don-hutto-residential-center)<br />- **South Texas Detention Center:** 566 Veteran Dr., Pearsall, TX. [ICE Link](https://www.ice.gov/detain/detention-facilities/south-texas-family-residential-center)',
    }
  },
  {
    title: { 
      es: 'Estatus del Caso en la Corte de Inmigración (EOIR)', 
      en: 'Immigration Court Case Status (EOIR)' 
    },
    content: { 
      es: 'Si su ser querido ya está en procedimientos de remoción, el caso es manejado por la Oficina Ejecutiva para la Revisión de Inmigración (EOIR).<br /><br />**Herramientas:**<br />- [Sistema Automatizado (teléfono)](tel:18008987180) (Debe tener el Número A-number).<br />- [Directorio de Cortes de Inmigración](https://www.justice.gov/eoir/eoir-office-locations)<br />- [Estatus de Caso de USCIS](https://egov.uscis.gov/casestatus/landing.do)', 
      en: 'If your loved one is already in removal proceedings, the case is handled by the Executive Office for Immigration Review (EOIR).<br /><br />**Tools:**<br />- [Automated System (phone)](tel:18008987180) (Must have the A-number).<br />- [Immigration Court Directory](https://www.justice.gov/eoir/eoir-office-locations)<br />- [USCIS Case Status](https://egov.uscis.gov/casestatus/landing.do)', 
    }
  },
  {
    title: { 
      es: 'Derechos Constitucionales y Asilo', 
      en: 'Constitutional Rights and Asylum' 
    },
    content: { 
      es: 'Usted tiene derecho a permanecer en silencio y a solicitar un abogado. **NUNCA FIRME** documentos sin asesoría legal, especialmente la **Salida Voluntaria**. El Formulario I-589 debe presentarse dentro del año de haber llegado.<br /><br />**Enlaces:**<br />- [Formulario I-589 (USCIS)](https://www.uscis.gov/i-589)<br />- [Guía "Conozca sus Derechos"](https://www.aclu.org/know-your-rights/immigrants-rights)', 
      en: 'You have the right to remain silent and to request an attorney. **NEVER SIGN** documents without legal advice, especially **Voluntary Departure**. Form I-589 must be filed within one year of arrival.<br /><br />**Links:**<br />- [Form I-589 (USCIS)](https://www.uscis.gov/i-589)<br />- ["Know Your Rights" Guide](https://www.aclu.org/know-your-rights/immigrants-rights)', 
    }
  },
];


export default function RecursosPage() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';

  const t = (key: string) => {
    // Simple helper to access nested keys if needed, but here we access direct objects
    return key; 
  };

  const getT = (obj: BilingualText) => getText(obj, lang);

  return (
    <main className={`relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden ${font.className}`}>
      
      <Header />

      {/* =========================================================================
          FONDO ATMOSFÉRICO (OPTIMIZADO)
      ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
         <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

         <motion.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
           style={{ willChange: "transform, opacity" }}
           className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[80px]" 
         />
         <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ willChange: "transform, opacity" }}
            className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[90px]" 
         />
      </div>

      {/* =========================================================================
          HERO & INTRO
      ========================================================================= */}
      <section className="relative pt-54 pb-16 z-10 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl text-center">
            
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl lg:text-8xl font-thin tracking-tight mb-6"
            >
                <span className="block text-white/90">{getT(texts.hero.title1)}</span>
                <span className="block text-white/80 text-2xl md:text-4xl lg:text-5xl mt-2 tracking-widest">{getT(texts.hero.title2)}</span>
                <span className="block font-black text-[#B2904D] mt-2 drop-shadow-xl">{getT(texts.hero.title3)}</span>
            </motion.h1>

            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-32 h-1 bg-gradient-to-r from-transparent via-[#B2904D] to-transparent mx-auto mb-12"
            />
        </div>
      </section>

      {/* =========================================================================
          INFO GRID (Locating, Hotline, Asylum)
      ========================================================================= */}
      <section className="relative z-10 px-6 lg:px-12 pb-24">
        <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* 1. Localizando Seres Queridos */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md hover:border-[#B2904D]/30 transition-all duration-300"
                >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 text-[#B2904D]">
                        <Users size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        {getT(texts.section1.title)} <span className="text-[#B2904D]">{getT(texts.section1.titleHighlight)}</span>
                    </h3>
                    <p 
                        className="text-white/70 font-light mb-6 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: parseContent(getT(texts.section1.intro)) }}
                    />
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3 text-sm text-white/80">
                            <span className="w-1.5 h-1.5 bg-[#B2904D] rounded-full mt-2 flex-shrink-0" />
                            {getT(texts.section1.help1)}
                        </li>
                        <li className="flex items-start gap-3 text-sm text-white/80">
                            <span className="w-1.5 h-1.5 bg-[#B2904D] rounded-full mt-2 flex-shrink-0" />
                            {getT(texts.section1.help2)}
                        </li>
                        <li className="flex items-start gap-3 text-sm text-white/80">
                            <span className="w-1.5 h-1.5 bg-[#B2904D] rounded-full mt-2 flex-shrink-0" />
                            {getT(texts.section1.help3)}
                        </li>
                    </ul>
                </motion.div>

                {/* 2. Hotline (Destacado) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="p-8 bg-gradient-to-b from-[#B2904D]/20 to-[#001026] border border-[#B2904D]/40 rounded-3xl backdrop-blur-md relative overflow-hidden flex flex-col justify-center text-center"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#B2904D]" />
                    <div className="w-16 h-16 bg-[#B2904D]/20 rounded-full flex items-center justify-center mb-6 text-[#B2904D] mx-auto">
                        <Phone size={32} />
                    </div>
                    <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-wider">
                        {getT(texts.section2.title)}
                    </h3>
                    <p className="text-sm text-white/60 mb-8">{getT(texts.section2.hours)}</p>
                    
                    <a 
                        href="tel:+18669795146" 
                        className="text-3xl lg:text-4xl font-black text-white hover:text-[#B2904D] transition-colors"
                    >
                        866-979-5146
                    </a>
                    <p className="text-xs text-white/40 mt-4 uppercase tracking-widest">
                        {lang === 'es' ? 'Atención Inmediata' : 'Immediate Attention'}
                    </p>
                </motion.div>

                {/* 3. Solicitantes de Asilo */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-md hover:border-[#B2904D]/30 transition-all duration-300"
                >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 text-[#B2904D]">
                        <Shield size={24} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        {getT(texts.section3.title)} <span className="text-[#B2904D]">{getT(texts.section3.titleHighlight)}</span>
                    </h3>
                    <p className="text-white/70 font-light mb-6 leading-relaxed">
                        {getT(texts.section3.intro)} <strong className="text-white">{getT(texts.section3.credibleFear)}</strong> {getT(texts.section3.or)} <strong className="text-white">{getT(texts.section3.reasonableFear)}</strong>.
                    </p>
                    <div className="space-y-3">
                         <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <Zap size={18} className="text-[#B2904D]" />
                            <span className="text-sm font-medium">{getT(texts.section3.prep)}</span>
                         </div>
                         <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/5">
                            <Zap size={18} className="text-[#B2904D]" />
                            <span className="text-sm font-medium">{getT(texts.section3.advice)}</span>
                         </div>
                    </div>
                </motion.div>

            </div>
        </div>
      </section>

      {/* =========================================================================
          EXPERIENCE STATS
      ========================================================================= */}
      <section className="py-20 bg-black/20 border-y border-white/5">
        <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-2">
                    {getT(texts.section4.title)} <span className="text-[#B2904D]">{getT(texts.section4.titleHighlight)}</span>
                </h2>
                <p className="text-white/60 max-w-2xl mx-auto">{getT(texts.section4.commitment)}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center p-6">
                    <div className="text-5xl font-black text-white mb-2">{getT(texts.section4.stat1Title)}</div>
                    <div className="text-sm uppercase tracking-widest text-[#B2904D]">{getT(texts.section4.stat1Text)}</div>
                </div>
                <div className="text-center p-6 border-x border-white/10">
                    <div className="text-5xl font-black text-white mb-2">{getT(texts.section4.stat2Title)}</div>
                    <div className="text-sm uppercase tracking-widest text-[#B2904D]">{getT(texts.section4.stat2Text)}</div>
                </div>
                <div className="text-center p-6">
                    <div className="text-5xl font-black text-white mb-2">{getT(texts.section4.stat3Title)}</div>
                    <div className="text-sm uppercase tracking-widest text-[#B2904D]">{getT(texts.section4.stat3Text)}</div>
                </div>
            </div>
        </div>
      </section>

      {/* =========================================================================
          RECURSOS GUBERNAMENTALES
      ========================================================================= */}
      <section className="relative z-10 px-6 lg:px-12 py-24">
         <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-6">
                   <ExternalLink size={14} className="text-[#B2904D]" />
                   <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">Enlaces Oficiales</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-thin text-white mb-4">
                    {getT(texts.sectionGovernment.title)}
                </h2>
                <p className="text-lg text-white/60 font-light">
                    {getT(texts.sectionGovernment.subtitle)}
                </p>
            </div>

            <div className="space-y-4">
                {governmentResourcesData.map((item, index) => (
                    <StaticResourceItem key={index} item={item} lang={lang} />
                ))}
            </div>
            
            <div className="mt-12 p-6 bg-[#B2904D]/10 border border-[#B2904D]/30 rounded-2xl flex items-start gap-4">
                <AlertTriangle className="text-[#B2904D] flex-shrink-0 mt-1" />
                <p className="text-sm text-white/80 italic">
                    {lang === 'es' 
                        ? 'Descargo de responsabilidad: Los enlaces proporcionados dirigen a sitios web gubernamentales oficiales (.gov). El Bufete Manuel Solís no es responsable del contenido de sitios externos.'
                        : 'Disclaimer: The links provided direct to official government websites (.gov). The Law Office of Manuel Solís is not responsible for the content of external sites.'
                    }
                </p>
            </div>
         </div>
      </section>

      {/* =========================================================================
          CONTACT FORM SECTION
      ========================================================================= */}
      <section id="contacto" className="relative py-24 z-10 bg-gradient-to-b from-transparent to-[#000a20]">
        <div className="container mx-auto px-4 max-w-4xl">
             <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {getT(texts.contact.title)}
                </h2>
                <p className="text-blue-100/60 font-light text-lg">
                    {getT(texts.contact.subtitle)}
                </p>
             </div>
             
             <div className="bg-[#001026]/80 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
                 <ContactForm />
             </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}