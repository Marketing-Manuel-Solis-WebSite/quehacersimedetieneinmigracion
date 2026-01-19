'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
import {
  X,
  PhoneCall,
  ArrowRight,
  Car,
  Truck,
  Stethoscope,
  Zap,
  HardHat,
  CheckCircle2,
  Scale,
  FileText,
  HandCoins,
  Star,
  Quote,
  Globe, 
  Shield
} from 'lucide-react';

import Image from 'next/image';
import { Outfit } from 'next/font/google';

// --- IMPORTACIONES DE COMPONENTES ---
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import { useLanguage } from '../../../context/LanguageContext';

// --- COLORES ---
const PRIMARY_DARK = '#001540';
const ACCENT_GOLD = '#B2904D';

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '700', '900'] 
});

// --- TIPADO PARA DATA ---
interface ContentDetail { es: string; en: string; }
interface CaseContent {
    intro: ContentDetail;
    description: ContentDetail;
    subTitle?: ContentDetail;
    subPoints?: ContentDetail[];
    solution?: ContentDetail;
    extraInfo?: ContentDetail;
    quotes?: { text: ContentDetail, context: ContentDetail }[];
    offerAlert?: ContentDetail;
    benefitsTitle?: ContentDetail;
    benefits?: ContentDetail[];
    closing?: ContentDetail;
}
interface CaseItem {
    id: string;
    title: ContentDetail;
    subtitle: ContentDetail;
    icon: React.ElementType;
    position: string;
    content: CaseContent;
}

// --- FUNCIÓN AUXILIAR ---
const getText = (obj: any, lang: 'es' | 'en'): string => {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es;
};

// --- DATOS GLOBALES ---
const texts = {
  mainCases: [
    {
      id: 'auto',
      title: { es: "Accidentes Automovilísticos", en: "Car Accidents" },
      subtitle: { es: "Colisiones y Lesiones Graves", en: "Collisions and Serious Injuries" },
      icon: Car,
      position: "col-span-3 lg:col-span-1 h-[450px]",
      content: {
        intro: { es: "¿Herido y buscando compensación por un accidente de vehículo?", en: "Injured and seeking compensation after a vehicle accident?" },
        description: { es: "Las lesiones causadas por una colisión pueden no mostrarse o sentirse durante días, o pueden ser obvias y requerir atención médica inmediata. Las lesiones, como las de la cabeza y, sobretodo, el cerebro, pueden causar sufrimiento de por vida. Incluso después de sanar físicamente, puedes experimentar un trauma emocional y ansiedad que pueden seguirte durante años.", en: "Injuries caused by a collision may not show or be felt for days, or they may be obvious and require immediate medical attention. Injuries, such as those to the head and, especially, the brain, can cause lifelong suffering. Even after physically healing, you may experience emotional trauma and anxiety that can follow you for years." },
        solution: { es: "En las Oficinas del Abogado Manuel Solís, le podemos ayudar a negociar con la compañía de seguros, encargando estudios médicos y pruebas independientes que permitan conocer los daños reales, tanto los actuales como los que puedan hacerse evidentes en el futuro, fruto de las lesiones sufridas durante el accidente.", en: "At the Law Offices of Attorney Manuel Solís, we can help you negotiate with the insurance company, commissioning independent medical studies and tests that allow you to know the real damages, both current and those that may become evident in the future, resulting from the injuries suffered during the accident." }
      }
    },
    {
      id: 'trailer',
      title: { es: "Accidentes de 18 Ruedas", en: "18-Wheeler Accidents" },
      subtitle: { es: "Tráilers y Vehículos Comerciales", en: "Tractor-Trailers and Commercial Vehicles" },
      icon: Truck,
      position: "col-span-3 lg:col-span-1 h-[450px]",
      content: {
        intro: { es: "¿Ha quedado usted o un miembro de su familia herido en un accidente con un camión de 18 ruedas?", en: "Have you or a family member been injured in an 18-wheeler accident?" },
        description: { es: "Es posible que tenga derecho a una indemnización significativa. Usted no debe verse destinado a un futuro de dolor, sufrimiento y deudas a causa de un accidente. Es un hecho que la calidad de su vida de ahora en adelante se verá afectada significativamente por la cantidad de indemnización que reciba.", en: "You may be entitled to significant compensation. You should not be destined to a future of pain, suffering, and debt because of an accident. It is a fact that the quality of your life from now on will be significantly affected by the amount of compensation you receive." },
        extraInfo: { es: "Podemos ayudar a descubrir las razones detrás del accidente para que usted pueda tener algo de resolución y seguir adelante.", en: "We can help uncover the reasons behind the accident so you can have some resolution and move forward." },
        quotes: [
          {
            text: { es: "Su abuelo todavía les compra regalos de Navidad.", en: "Their grandfather still buys them Christmas gifts." },
            context: { es: "Ella perdió a su papá. Ayudamos a su familia a conseguir una indemnización. Todos los años usan parte del dinero para comprar regalos a los nietos.", en: "She lost her father. We helped her family get compensation. Every year they use part of the money to buy gifts for the grandchildren." }
          }
        ],
        offerAlert: { es: "Si ya ha recibido una oferta, llámenos. No es raro recibir ofertas de 10x o 20x más cuando nos contrata.", en: "If you have already received an offer, call us. It is not uncommon to receive offers 10x or 20x more when you hire us." }
      }
    },
    {
      id: 'medica',
      title: { es: "Negligencia Médica", en: "Medical Malpractice" },
      subtitle: { es: "Errores Médicos y Farmacéuticos", en: "Medical and Pharmaceutical Errors" },
      icon: Stethoscope,
      position: "col-span-3 lg:col-span-1 h-[450px]",
      content: {
        intro: { es: "¿Herido por negligencia médica o por un producto farmacéutico?", en: "Injured due to medical malpractice or a pharmaceutical product?" },
        description: { es: "A veces, una mala experiencia debida a una enfermedad o un accidente puede ser aun peor si no recibimos un trato profesional por parte del médico o el hospital que supuestamente debe ayudarnos. Podría ser que incluso usted sospeche que el fallecimiento de un ser querido posiblemente se deba a una mala decisión.", en: "Sometimes, a bad experience due to illness or accident can be even worse if we do not receive professional treatment from the doctor or hospital that is supposed to help us. You might even suspect that the death of a loved one is possibly due to a bad decision." },
        solution: { es: "Si usted cree que usted o un ser querido no ha recibido un trato profesional y ha sufrido daños, podemos estudiar su caso para saber si tiene derecho a reclamar una indemnización por su sufrimiento.", en: "If you believe that you or a loved one has not received professional treatment and has suffered damages, we can study your case to find out if you are entitled to claim compensation for your suffering." }
      }
    },
    {
      id: 'explosion',
      title: { es: "Explosión de Plantas", en: "Plant Explosions" },
      subtitle: { es: "Industriales y Refinerías", en: "Industrial and Refinery" },
      icon: Zap,
      position: "col-span-3 lg:col-span-1 h-[450px]",
      content: {
        intro: { es: "Es posible que tenga derecho a una indemnización significativa.", en: "You may be entitled to significant compensation." },
        description: { es: "Las explosiones de plantas parecen estar ocurriendo con demasiada frecuencia en estos días. Las explosiones pueden ser causadas por muchos factores, por lo que es necesario realizar una investigación exhaustiva para determinar la causa.", en: "Plant explosions seem to be occurring too often these days. Explosions can be caused by many factors, so a thorough investigation is necessary to determine the cause." },
        solution: { es: "Nuestro equipo de abogados con experiencia puede ayudar a investigar y ayudar a los heridos a comprender lo que sucedió y buscar justicia por sus lesiones.", en: "Our team of experienced attorneys can help investigate and assist the injured in understanding what happened and seeking justice for their injuries." }
      }
    },
    {
      id: 'trabajo',
      title: { es: "Lesiones y Accidentes en el Trabajo", en: "Work Injuries and Accidents" },
      subtitle: { es: "Construcción, Fábricas y Más", en: "Construction, Factories, and More" },
      icon: HardHat,
      position: "col-span-3 lg:col-span-2 h-[450px]",
      content: {
        intro: { es: "¿Sufriste una lesión o accidente en tu trabajo?", en: "Did you suffer an injury or accident at work?" },
        description: { es: "Ayudamos a trabajadores que se esfuerzan cada día. Miles de inmigrantes realizan trabajos físicos y lamentablemente sufren accidentes. Creemos que nadie debe enfrentar esto solo.", en: "We help workers who strive every day. Thousands of immigrants perform physical work and unfortunately suffer accidents. We believe no one should face this alone." },
        subTitle: { es: "Atendemos reclamos por:", en: "We handle claims for:" },
        subPoints: [
          { es: "Lesiones en construcción o demolición", en: "Construction or demolition injuries" },
          { es: "Caídas o golpes durante el trabajo", en: "Falls or blows during work" },
          { es: "Uso de maquinaria o herramientas defectuosas", en: "Use of defective machinery or tools" },
          { es: "Lesiones de espalda, hombro o rodillas", en: "Back, shoulder, or knee injuries" },
          { es: "Accidentes en fábricas o bodegas", en: "Accidents in factories or warehouses" },
          { es: "Falta de equipo o medidas de seguridad", en: "Lack of safety equipment or measures" }
        ],
        benefitsTitle: { es: "Beneficios de una Compensación:", en: "Compensation Benefits:" },
        benefits: [
          { es: "Cubrir tratamientos y rehabilitación", en: "Cover treatments and rehabilitation" },
          { es: "Recuperar ingresos perdidos", en: "Recover lost wages" },
          { es: "Recibir apoyo si no puedes trabajar", en: "Receive support if you cannot work" },
          { es: "Mantener estabilidad económica para tu familia", en: "Maintain economic stability for your family" }
        ],
        closing: { es: "No es un favor, es tu derecho. No importa tu estatus migratorio.", en: "It's not a favor, it's your right. Regardless of your immigration status." }
      }
    }
  ] as CaseItem[],
  processSteps: [
    { id: 1, title: { es: "Contacto", en: "Contact" }, icon: PhoneCall, desc: { es: "Llámanos y obtén orientación legal.", en: "Call us and get legal guidance." } },
    { id: 2, title: { es: "Análisis", en: "Analysis" }, icon: FileText, desc: { es: "Analizamos tu caso y revisamos la evidencia.", en: "We analyze your case and review the evidence." } },
    { id: 3, title: { es: "Negociación", en: "Negotiation" }, icon: Scale, desc: { es: "Negociamos duramente con la aseguradora o empleador.", en: "We negotiate hard with the insurer or employer." } },
    { id: 4, title: { es: "Resultados", en: "Results" }, icon: HandCoins, desc: { es: "Te acompañamos hasta que recibas tu compensación.", en: "We accompany you until you receive your compensation." } },
  ],

  interface: {
    badge: { es: "Representación Legal Especializada", en: "Specialized Legal Representation" },
    mainTitle: { es: "ACCIDENTES", en: "ACCIDENTS" }, 
    heroTitle1: { es: "Protegiendo su", en: "Protecting Your" },
    heroTitle2: { es: "Compensación", en: "Compensation" }, 
    heroDescription: { es: "Si sufrió un accidente en el trabajo o carretera, luchamos para que reciba la indemnización máxima sin importar su estatus migratorio.", en: "If you suffered an accident at work or on the road, we fight for you to receive maximum compensation regardless of your immigration status." },
    stats: { es: "Compensación Recuperada", en: "Compensation Recovered" },
    casesTitle: { es: "Áreas de Práctica", en: "Practice Areas" },
    ctaConsultation: { es: "Consulta Ahora", en: "Consult Now" },
    ctaCases: { es: "Ver Tipos de Casos", en: "View Case Types" },
    specialties: { es: "Nuestras Especialidades", en: "Our Specialties" },
    details: { es: "Ver Detalles", en: "View Details" },
    modalClosing: { es: "Especialistas en casos de lesiones y accidentes con décadas de experiencia", en: "Specialists in injury and accident cases with decades of experience" },
    videoSectionBadge: { es: "Conoce a Nuestro Equipo", en: "Meet Our Team" },
    videoSectionTitle: { es: "Abogado", en: "Attorney" },
    videoSectionSubtitle: { es: "Escucha directamente de nuestros socios cómo protegemos tus derechos con experiencia y dedicación.", en: "Hear directly from our partners how we protect your rights with expertise and dedication." },
    callNow: { es: "Llámanos Ahora Mismo", en: "Call Us Right Now" },
    processMethod: { es: "Nuestro Método", en: "Our Method" },
    processTitle: { es: "Cómo Funciona el Proceso", en: "How the Process Works" },
    requestEvaluation: { es: "Solicitar Evaluación", en: "Request Evaluation" },
    videoAlt: { es: "Video explicativo sobre la dedicación del equipo legal.", en: "Explanation video about the legal team's dedication." }
  }
};


export default function AccidentsPageBilingual() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';
  
  const t = (key: string): string => {
    const parts = key.split('.');
    let current: any = texts.interface;
    for (const part of parts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        return ''; 
      }
    }
    return current[lang] || current.es;
  };
  
  const gT = (obj: any): string => getText(obj, lang);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const mainCasesData = texts.mainCases;
  const processStepsData = texts.processSteps;

  const selectedItem = mainCasesData.find(item => item.id === selectedId);

  useEffect(() => {
    if (selectedId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedId]);


  return (
    <div className="min-h-screen flex flex-col bg-[#001540] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      
      <Header />

      {/* --- FONDO OPTIMIZADO (GPU Friendly) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
         
         <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

         {/* Orbes optimizados: Blur reducido, will-change agregado */}
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
         
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
            <span className="text-[120vh] font-black italic text-white tracking-tighter whitespace-nowrap">
                ACCIDENTES
            </span>
         </div>
      </div>
      
      
      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-4 z-10 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center">
        <div className="container mx-auto max-w-7xl">
           <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="lg:col-span-5 relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center"
              >
                 {/* Blur reducido para mejor rendimiento */}
                 <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-2xl rounded-full z-0 opacity-80" />
                 
                 <div className="relative z-10 w-full h-full flex items-center justify-center transform-gpu">
                    <div className="relative w-full h-full">
                       <Image
                         src="/accident-hero.png"
                         alt="Abogado de Accidentes"
                         fill
                         className="object-contain object-center drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                         priority
                         sizes="(max-width: 768px) 100vw, 50vw"
                       />
                    </div>
                 </div>

                 <motion.div
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }} 
                    transition={{ delay: 1, duration: 1 }}
                    // Blur reducido
                    className="absolute bottom-4 md:bottom-10 left-0 md:left-[-20px] z-20 p-4 md:p-6 border border-white/10 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl"
                 >
                    <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50">
                       <span className="text-4xl md:text-5xl font-bold tracking-tighter">10M</span> 
                       <span className="text-3xl md:text-4xl font-thin text-[#B2904D] ml-1">+</span>
                    </div>
                    <p className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-medium">
                       {t('stats')}
                    </p>
                 </motion.div>
              </motion.div>

              <div className="lg:col-span-7 space-y-6 md:space-y-8 pl-0 lg:pl-12 relative z-20">
                 <motion.div 
                   initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
                   className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[#B2904D]/50 to-transparent origin-top hidden lg:block" 
                 />

                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm">
                    <Star size={14} className="text-[#B2904D] fill-[#B2904D]" />
                    <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">{t('badge')}</span>
                 </div>

                 <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-white tracking-tight leading-none">
                    <span className="block text-white/90 font-extralight mb-2">
                      {t('heroTitle1')} 
                    </span>
                    <span className="block font-medium text-[#B2904D] drop-shadow-xl">
                      {t('heroTitle2')} 
                    </span>
                 </h1>

                 <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    className="relative pl-6 border-l-2 border-[#B2904D]/50"
                 >
                    <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                      {t('heroDescription')}
                    </p>
                 </motion.div>

                 <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    className="flex flex-wrap gap-4 pt-4"
                 >
                    <a href="#contacto" className="px-6 md:px-8 py-3 md:py-4 bg-[#B2904D] hover:bg-white text-[#001540] font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(178,144,77,0.3)] flex items-center gap-2 group text-sm md:text-base">
                       <PhoneCall size={18} className="md:w-5 md:h-5" />
                       {t('ctaConsultation')}
                       <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform"/>
                    </a>
                 </motion.div>
              </div>

           </div>
        </div>
      </section>


      <section className="px-4 pb-32 relative z-10 max-w-[1600px] mx-auto" id="casos">

        <div className="max-w-[1600px] mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-8"
            >
              <Scale size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">{t('specialties')}</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              {t('casesTitle')}
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-[#D4AF37] mx-auto rounded-full shadow-[0_0_10px_#B2904D]"
            />
          </motion.div>

          <div className="grid grid-cols-3 gap-6">
            {mainCasesData.map((item, index) => (
              <motion.div
                layoutId={`card-container-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.6,
                  ease: "easeOut" 
                }}
                onClick={() => setSelectedId(item.id)}
                onMouseEnter={() => setHoveredCard(item.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`
                  col-span-3 sm:col-span-2 lg:col-span-1 ${item.position} 
                  group relative rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 cursor-pointer 
                  bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-300 
                  shadow-[0_5px_15px_rgba(0,0,0,0.2)] 
                  hover:scale-[1.01] hover:border-[#B2904D]/50 
                  hover:shadow-[0_0_20px_rgba(178,144,77,0.2)] 
                  overflow-hidden transform-gpu`}
              >
                
                <div 
                    className={`absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#B2904D]/5 to-transparent 80%`}
                />
                
                <div 
                    className="absolute inset-0 flex items-center justify-center p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                >
                    <p className="text-center text-4xl font-black text-white/10 leading-snug">
                        {gT(item.content.intro)}
                    </p>
                </div>


                <div className="relative z-10 h-full flex flex-col">
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.4 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md transition-all 
                               bg-white/10 group-hover:bg-gradient-to-br group-hover:from-[#B2904D] group-hover:to-[#D4AF37]"
                  >
                    <item.icon size={30} strokeWidth={1.5} />
                  </motion.div>

                  <div className="flex-1">
                    <motion.h3 
                      layoutId={`card-title-${item.id}`}
                      className="text-2xl md:text-3xl font-black mb-3 transition-colors leading-tight text-white group-hover:text-[#B2904D]"
                    >
                      {gT(item.title)}
                    </motion.h3>
                    
                    <motion.p 
                      layoutId={`card-subtitle-${item.id}`}
                      className="text-xs text-white/60 font-bold uppercase tracking-widest mb-6"
                    >
                      {gT(item.subtitle)}
                    </motion.p>
                    
                    <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-3">
                        {gT(item.content.description).substring(0, 150)}...
                    </p>

                    <div className="h-px bg-white/20 mb-6 transition-all group-hover:bg-[#B2904D] shadow-[0_0_5px_#B2904D]" />
                  </div>

                  <motion.div 
                    className="flex items-center justify-between mt-auto"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                  >
                    <span 
                        className="font-bold flex items-center gap-2 group-hover:gap-4 transition-all text-white group-hover:text-[#B2904D]"
                    >
                      {t('details')}
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
                    </span>
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm bg-white/10 group-hover:bg-[#B2904D] text-[#002342] group-hover:text-white"
                    >
                      <ArrowRight size={16} className="text-white/80 group-hover:text-white transition-colors"/>
                    </motion.div>
                  </motion.div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // Optimización: Menos blur en el backdrop, más opacidad
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`card-container-${selectedItem.id}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-7xl h-[90vh] md:h-[80vh] rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10 ring-1 ring-white/10 bg-[#001540]"
              onClick={(e) => e.stopPropagation()} 
            >
              
              <motion.button
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 z-50 bg-black/40 hover:bg-[#002342] text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20"
              >
                <X size={24} />
              </motion.button>

              <div className="w-full lg:w-2/5 bg-gradient-to-br from-[#002342] via-[#003366] to-[#002342] p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden">
                
                <motion.div 
                  className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none"
                >
                  <selectedItem.icon size={450} strokeWidth={0.5} />
                </motion.div>

                <div className="relative z-10">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#B2904D] to-[#D4AF37] rounded-xl flex items-center justify-center mb-6 shadow-xl"
                  >
                    <selectedItem.icon size={30} className="text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    layoutId={`card-title-${selectedItem.id}`}
                    className="text-4xl font-black mb-3 leading-tight"
                  >
                    {gT(selectedItem.title)}
                  </motion.h3>
                  
                  <motion.p 
                    layoutId={`card-subtitle-${selectedItem.id}`}
                    className="text-[#B2904D] text-xs font-bold uppercase tracking-widest mb-6"
                  >
                    {gT(selectedItem.subtitle)}
                  </motion.p>

                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: 60 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent rounded-full mb-6"
                  />

                  <p className="text-white/70 text-sm leading-relaxed">
                    {t('modalClosing')}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-3/5 p-8 md:p-12 overflow-y-auto bg-[#001540] text-white scrollbar-custom">
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h4 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">
                    {gT(selectedItem.content.intro)}
                  </h4>
                  <p className="text-lg text-blue-100/70 leading-relaxed">
                    {gT(selectedItem.content.description)}
                  </p>
                  
                  {selectedItem.id === 'trailer' && selectedItem.content.quotes && (
                    <div className="mt-8 space-y-4">
                        {selectedItem.content.quotes.map((quote, i) => (
                          <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10 shadow-md relative">
                            <Quote size={20} className="absolute top-2 right-2 text-white/20"/>
                            <p className="italic text-base text-white mb-1">"{gT(quote.text)}"</p>
                            <p className="text-xs text-white/50">{gT(quote.context)}</p>
                          </div>
                        ))}
                        <div className="p-4 bg-[#B2904D]/20 border border-[#B2904D]/30 rounded-lg text-white font-bold text-sm">
                           {gT(selectedItem.content.offerAlert)}
                        </div>
                    </div>
                  )}
                  
                </motion.div>

                {selectedItem.content.subPoints && selectedItem.content.subTitle && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-6"
                    >
                      <div className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 shadow-sm">
                        <h5 className="font-black text-white mb-5 flex items-center gap-3 text-xl">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md bg-white/10" 
                          >
                            <Scale size={20} className="text-white"/> 
                          </div>
                          {gT(selectedItem.content.subTitle)}
                        </h5>
                        <div className="grid md:grid-cols-2 gap-3">
                          {selectedItem.content.subPoints?.map((point: any, i: number) => ( 
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + i * 0.05 }}
                              className="flex items-start gap-3 text-white/70 bg-black/20 p-3 rounded-lg border border-white/10 shadow-xs"
                            >
                              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[#B2904D]"></div> 
                              <span className="text-sm font-medium">{gT(point)}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                )}

                {selectedItem.id === 'trabajo' && selectedItem.content.benefits && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-6 mt-8"
                    >
                      <div className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 shadow-sm">
                        <h5 className="font-black text-white mb-5 flex items-center gap-3 text-xl">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md bg-[#B2904D]" 
                          >
                            <HandCoins size={20} className="text-white"/> 
                          </div>
                          {gT(selectedItem.content.benefitsTitle)}
                        </h5>
                        <div className="grid md:grid-cols-2 gap-3">
                          {selectedItem.content.benefits?.map((benefit, i) => ( 
                            <motion.div 
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.6 + i * 0.05 }}
                              className="flex items-start gap-3 text-white bg-black/20 p-3 rounded-lg border border-white/10 shadow-xs"
                            >
                              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[#B2904D]"></div> 
                              <span className="text-sm font-medium">{gT(benefit)}</span>
                            </motion.div>
                          ))}
                        </div>
                        <p className="text-white/60 text-sm mt-4 italic">{gT(selectedItem.content.closing)}</p>
                      </div>
                    </motion.div>
                )}


                {selectedItem.content.solution && (selectedItem.id === 'medica' || selectedItem.id === 'explosion' || selectedItem.id === 'auto') && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm"
                  >
                    <p className="text-white/80 leading-relaxed font-medium text-base">
                      {gT(selectedItem.content.solution)}
                    </p>
                  </motion.div>
                )}


                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-10 pt-6 border-t border-white/10"
                >
                  <motion.a 
                    href="#contacto" 
                    onClick={() => setSelectedId(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full py-4 bg-[#B2904D] text-[#002342] rounded-xl font-black flex items-center justify-center gap-3 shadow-lg hover:bg-white transition-all"
                  >
                    <span className="relative flex items-center gap-3 text-lg">
                      <PhoneCall size={20}/>
                      {t('requestEvaluation')}
                    </span>
                  </motion.a>
                </motion.div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-32 relative overflow-hidden bg-[#001540]"> 
        
        <div className="absolute inset-0 bg-[#001540] opacity-90" />

        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-8"
            >
              <div className="w-2 h-2 bg-[#B2904D] rounded-full animate-pulse"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('videoSectionBadge')}</span>
            </motion.div>
            
            <h2 className="text-4xl font-black text-white mb-6 leading-tight">
              {t('videoSectionTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#D4AF37]">Juan Solís</span>
            </h2>
            
            <p className="text-xl text-blue-100/70 mb-8 leading-relaxed">
              {t('videoSectionSubtitle')}
            </p>
            
            <motion.a 
              href="tel:+18664200405"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-4 bg-[#B2904D] text-[#002342] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-white transition-all"
            >
              <div className="relative w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                <PhoneCall size={20} />
              </div>
              <span className="relative">{t('callNow')}</span>
            </motion.a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative group p-6 bg-white/10 backdrop-blur-md rounded-[2.5rem] shadow-xl border border-white/10"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-video"> 
              <motion.div 
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer bg-black/10 hover:bg-black/0 transition-colors"
              >
                {!isPlaying && (
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/60"
                  >
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </motion.div>
                )}
              </motion.div>
              <video 
                ref={videoRef}
                src="https://vz-9f852395-0ee.b-cdn.net/d7979aa5-40db-49f2-8566-b8a580591661/playlist.m3u8" 
                className="w-full h-full object-cover" 
                aria-label={t('videoAlt')}
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 relative overflow-hidden bg-[#001540]">
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
            >
              <FileText size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('processMethod')}</span>
            </motion.div>
            
            <h2 className="text-4xl font-black text-white mb-6">{t('processTitle')}</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full shadow-[0_0_10px_#B2904D]"
            />
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {processStepsData.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.01 }}
                className="group relative"
              >
                <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 hover:bg-white/20 hover:border-[#B2904D]/50 transition-all duration-300 h-full shadow-lg">
                  
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-[#B2904D] to-[#D4AF37] rounded-lg flex items-center justify-center font-black text-white text-lg shadow-md"
                  >
                    {step.id}
                  </motion.div>

                  <motion.div 
                    className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#B2904D] transition-all"
                  >
                    <step.icon size={26} className="text-white"/>
                  </motion.div>

                  <h3 className="font-black text-xl text-white mb-3">{gT(step.title)}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{gT(step.desc)}</p>
                </div>

                {index < processStepsData.length - 1 && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
                    className="hidden md:block absolute top-[25%] -right-4 w-8 h-0.5 bg-gradient-to-r from-[#B2904D] to-transparent origin-left"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="contacto" className="relative py-32 z-10 bg-transparent">
        
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 p-8 md:p-12 bg-white/5 backdrop-blur-md rounded-[2rem] shadow-2xl border border-white/10" 
          >
             <div className="text-white"> 
                <h2 className="text-3xl font-black mb-6">{t('requestEvaluation')}</h2>
                <p className="text-white/70 mb-8">{t('heroDescription')}</p>
                <ContactForm /> 
             </div>
            
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}