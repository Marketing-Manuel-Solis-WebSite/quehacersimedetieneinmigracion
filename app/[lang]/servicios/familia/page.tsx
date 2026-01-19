'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  X,
  PhoneCall,
  ArrowRight,
  Scale, 
  FileText, 
  HandCoins, 
  MessageSquare, 
  Star,
} from 'lucide-react';

import Image from 'next/image';
import { Outfit } from 'next/font/google';
import dynamic from 'next/dynamic';

// --- IMPORTACIONES DE COMPONENTES ---
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useLanguage } from '../../../context/LanguageContext';

// --- OPTIMIZACIÓN: LAZY LOAD DEL FORMULARIO ---
const ContactForm = dynamic(() => import('../../../components/ContactForm'), {
  loading: () => <div className="h-[500px] w-full bg-white/5 animate-pulse rounded-2xl border border-white/10" />
});

// --- CONFIGURACIÓN DE FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '700', '900'] 
});

// --- FUNCIÓN AUXILIAR ---
const getText = (obj: any, lang: 'es' | 'en'): string => {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es;
};

// --- TIPADO PARA DATA ---
interface ContentDetail { es: string; en: string; }
interface CaseContent {
    intro: ContentDetail;
    description: ContentDetail;
    subTitle?: ContentDetail;
    subPoints?: ContentDetail[];
    solution?: ContentDetail;
}
interface CaseItem {
    id: string;
    title: ContentDetail;
    subtitle: ContentDetail;
    icon: React.ElementType;
    position: string;
    content: CaseContent;
}

// --- DATOS GLOBALES (FAMILY LAW) ---
const texts = {
  mainCases: [
    {
      id: 'divorcio',
      title: { es: "Divorcio", en: "Divorce" },
      subtitle: { es: "Separación Legal y Acuerdos Mutuos", en: "Legal Separation and Mutual Agreements" },
      icon: FileText,
      position: "col-span-3 lg:col-span-1 h-[450px]",
      content: {
        intro: { es: "¿Necesita un buen abogado de divorcio?", en: "Do you need a good divorce attorney?" },
        description: { es: "Un matrimonio es un contrato legalmente establecido entre dos personas que debe resolverse de manera adecuada para proteger sus intereses futuros. Es recomendable acudir a un abogado para que le ayude a tomar las mejores decisiones.", en: "A marriage is a legally established contract between two people that must be properly resolved to protect your future interests. It is advisable to go to an attorney to help you make the best decisions." },
        solution: { es: "Le podemos ayudar a preparar y entregar los documentos necesarios para un acuerdo de divorcio. Si fuera necesario, le representaremos en la corte ante un posible litigio para proteger sus derechos.", en: "We can help you prepare and submit the necessary documents for a divorce settlement. If necessary, we will represent you in court before possible litigation to protect your rights." },
      }
    },
    {
      id: 'custodia',
      title: { es: "Custodia de los Hijos", en: "Child Custody" },
      subtitle: { es: "Disputas, Visitas y Bienestar Infantil", en: "Disputes, Visitation, and Child Welfare" },
      icon: MessageSquare, 
      position: "col-span-3 lg:col-span-1 h-[450px]",
      content: {
        intro: { es: "Permítanos apoyarle en las disputas por la custodia de sus hijos.", en: "Allow us to support you in child custody disputes." },
        description: { es: "Los niños son, indudablemente, los más perjudicados en la separación de sus padres. Es crucial que los abogados negocien en su nombre desde un punto de vista técnico y no emocional para lograr la mejor resolución.", en: "Children are undoubtedly the most affected by the separation of their parents. It is crucial that attorneys negotiate on your behalf from a technical rather than emotional point of view to achieve the best resolution." },
        subTitle: { es: "Nuestra Defensa Incluye:", en: "Our Defense Includes:" },
        subPoints: [
          { es: "Defenderle en un caso de custodia.", en: "Defend you in a custody case." },
          { es: "Negociar la manutención y las visitas.", en: "Negotiate child support and visitation." },
          { es: "Representarle en corte si no es posible llegar a un acuerdo.", en: "Represent you in court if an agreement is not possible." },
        ],
        solution: { es: "Contamos con abogados preparados para defender sus intereses y el de sus hijos, buscando la mejor solución para la estabilidad familiar.", in: "We have attorneys prepared to defend your interests and those of your children, seeking the best solution for family stability." },
      }
    },
    {
      id: 'manutencion',
      title: { es: "Manutención de los Hijos", en: "Child Support" },
      subtitle: { es: "Cálculo y Cumplimiento de Pagos", in: "Calculation and Enforcement of Payments" },
      icon: HandCoins, 
      position: "col-span-3 lg:col-span-1 h-[450px]",
      content: {
        intro: { es: "La manutención infantil es un aspecto clave del derecho de familia.", en: "Child support is a key aspect of family law." },
        description: { es: "Los padres tienen el deber de mantener a sus hijos. La manutención les ayuda económicamente, asegurándose de que los niños tengan ropa en la espalda y comida en la mesa. La cantidad se calcula sobre la base de los recursos netos del padre.", en: "Parents have a duty to support their children. Support helps them financially, ensuring that children have clothes on their backs and food on the table. The amount is calculated based on the father's net resources." },
        subTitle: { es: "Cómo se Calcula la Manutención (Base General):", en: "How Child Support is Calculated (General Basis):" },
        subPoints: [
          { es: "Se calcula a partir de los recursos netos (ingresos menos impuestos esenciales y gastos de seguro médico).", en: "It is calculated based on net resources (income minus essential taxes and health insurance expenses)." },
          { es: "La base es el 20% del ingreso neto mensual.", in: "The base is 20% of the net monthly income." },
          { es: "Se agrega el 5% por cada hijo adicional.", en: "5% is added for each additional child." },
          { es: "Puede embargarse del salario, ofreciendo tranquilidad a ambas partes.", in: "It can be garnished from salary, offering peace of mind to both parties." },
        ],
        solution: { es: "Le asistimos en el cálculo preciso y la ejecución de la orden judicial de manutención, asegurando la estabilidad económica de sus hijos.", in: "We assist you with the accurate calculation and enforcement of the judicial support order, ensuring the economic stability of your children." },
      }
    },
  ] as CaseItem[],
  processSteps: [
    { id: 1, title: { es: "Consulta Privada", en: "Private Consultation" }, icon: PhoneCall, desc: { es: "Evaluamos su situación personal y sus objetivos familiares.", en: "We evaluate your personal situation and family goals." } },
    { id: 2, title: { es: "Estrategia y Documentación", en: "Strategy & Documentation" }, icon: FileText, desc: { es: "Recopilamos pruebas, ingresos y preparamos los documentos legales.", en: "We gather evidence, income statements, and prepare the legal documents." } },
    { id: 3, title: { es: "Negociación / Mediación", en: "Negotiation / Mediation" }, icon: MessageSquare, desc: { es: "Buscamos un acuerdo amistoso fuera de la corte para reducir el impacto emocional.", en: "We seek an amicable out-of-court settlement to reduce emotional impact." } },
    { id: 4, title: { es: "Representación en Corte", in: "Court Representation" }, icon: Scale, desc: { es: "Lo representamos si es necesario litigar para defender sus derechos.", in: "We represent you if litigation is necessary to defend your rights." } },
  ],

  interface: {
    badge: { es: "Protección Familiar y Patrimonial", en: "Family and Patrimonial Protection" },
    mainTitle: { es: "FAMILIA", en: "FAMILY LAW" },
    heroTitle1: { es: "Expertos en", en: "Experts in" },
    heroTitle2: { es: "Derecho Familiar", en: "Family Law" }, 
    heroDescription: { es: "Protegemos sus derechos y el bienestar de sus hijos durante transiciones difíciles.", en: "We protect your rights and the well-being of your children during difficult transitions." },
    stats: { es: "Familias Apoyadas", en: "Families Supported" },
    casesTitle: { es: "Servicios de Derecho Familiar", en: "Family Law Services" },
    ctaConsultation: { es: "Consulta Ahora", en: "Consult Now" },
    ctaCases: { es: "Ver Tipos de Casos", in: "View Case Types" },
    specialties: { es: "Nuestras Especialidades", en: "Our Specialties" },
    details: { es: "Ver Detalles", en: "View Details" },
    modalClosing: { es: "Protegiendo su futuro y el de sus hijos durante transiciones difíciles.", en: "Protecting your future and your children's during difficult transitions." },
    videoSectionBadge: { es: "Conoce a Nuestro Equipo", en: "Meet Our Team" },
    videoSectionTitle: { es: "Abogado", en: "Attorney" },
    videoSectionSubtitle: { es: "Escucha directamente de nuestros socios cómo protegemos su estabilidad familiar.", en: "Hear directly from our partners how we protect your family stability." },
    callNow: { es: "Llámanos Ahora Mismo", en: "Call Us Right Now" },
    processMethod: { es: "Nuestro Método", en: "Our Method" },
    processTitle: { es: "El Proceso para su Resolución Familiar", in: "The Process for Your Family Resolution" },
    requestEvaluation: { es: "Solicitar Consulta", en: "Request Consultation" },
    videoAlt: { es: "Video explicativo sobre la dedicación del equipo legal.", in: "Explanation video about the legal team's dedication." }
  }
};


export default function FamilyLawPage() {
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
  const [isMobile, setIsMobile] = useState(true);

  // --- OPTIMIZACIÓN: DETECCIÓN DE MÓVIL ---
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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


  const textRevealVariant: Variants = {
    hidden: { y: "100%", rotateX: -20, opacity: 0 },
    visible: (custom: number) => ({
      y: 0, rotateX: 0, opacity: 1,
      transition: { duration: 1.2, delay: custom * 0.15, ease: "easeOut" } 
    })
  };


  return (
    <div className="min-h-screen flex flex-col bg-[#001540] text-white relative selection:bg-[#B2904D] selection:text-white font-sans overflow-x-hidden">
      
      <Header />

      {/* --- FONDO OPTIMIZADO PARA GPU --- */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
         
         <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

         {/* Orbes optimizados: Solo se animan en Desktop */}
         {!isMobile && (
           <>
             <motion.div 
               animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
               style={{ willChange: "transform, opacity" }}
               className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[100px]" 
             />
             <motion.div 
               animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
               transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
               style={{ willChange: "transform, opacity" }}
               className="absolute bottom-[-10%] left-[-5%] w-[70vw] h-[70vw] bg-sky-800/10 rounded-full blur-[120px]" 
             />
           </>
         )}

         {/* Texto Gigante: Estático en móvil para ahorrar recursos */}
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden">
            <span className="text-[50vh] md:text-[120vh] font-black italic text-white tracking-tighter transform -skew-x-12">
                FAMILIA
            </span>
         </div>
      </div>


      <section className="relative pt-32 md:pt-40 pb-16 md:pb-24 px-4 z-10 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center">
        <div className="container mx-auto max-w-7xl">
           <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="lg:col-span-5 relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-center"
             >
                {/* Blur estático y ligero */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-2xl rounded-full z-0 opacity-80" />
                
                <div className="relative z-10 w-full h-full flex items-center justify-center transform-gpu">
                   <div className="relative w-full h-full">
                      <Image
                        src="/family-hero.png"
                        alt="Abogado de Derecho Familiar"
                        fill
                        className="object-contain object-center drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                        priority // Prioridad alta para LCP
                        sizes="(max-width: 768px) 100vw, 50vw" // Ayuda al navegador
                      />
                   </div>
                </div>

                <motion.div
                   initial={{ opacity: 0, x: -20 }} 
                   animate={{ opacity: 1, x: 0 }} 
                   transition={{ delay: 0.5, duration: 0.8 }}
                   className="absolute bottom-4 md:bottom-10 left-0 md:left-[-20px] z-20 p-4 md:p-6 border border-white/10 rounded-2xl bg-[#001540]/90 shadow-2xl"
                >
                   <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50">
                      <span className="text-4xl md:text-5xl font-bold tracking-tighter">10K</span> 
                      <span className="text-3xl md:text-4xl font-thin text-[#B2904D] ml-1">+</span>
                   </div>
                   <p className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-medium">
                      {t('stats')}
                   </p>
                </motion.div>
             </motion.div>

             <div className="lg:col-span-7 space-y-6 md:space-y-8 pl-0 lg:pl-12 relative z-20">
                <motion.div 
                   initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 0.2 }}
                   className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[#B2904D]/50 to-transparent origin-top hidden lg:block" 
                />

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-sm">
                   <Star size={14} className="text-[#B2904D] fill-[#B2904D]" />
                   <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">{t('badge')}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-white tracking-tight leading-[0.9]">
                   <span className="block overflow-hidden pb-2">
                      <motion.span custom={0} variants={textRevealVariant} initial="hidden" animate="visible" className="block text-white/90">
                          {t('heroTitle1')}
                      </motion.span>
                   </span>
                   <span className="block overflow-hidden pb-4">
                      <motion.span custom={1} variants={textRevealVariant} initial="hidden" animate="visible" className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D]">
                          {t('heroTitle2')}
                      </motion.span>
                   </span>
                </h1>

                <motion.p 
                   initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                   className="text-lg md:text-xl text-blue-100/70 font-light max-w-xl leading-relaxed border-l border-white/10 pl-4 md:pl-6"
                >
                   {t('heroDescription')}
                </motion.p>

                <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                   className="flex flex-wrap gap-4 pt-4"
                >
                   <a href="#contacto" className="px-6 md:px-8 py-3 md:py-4 bg-[#B2904D] hover:bg-white text-[#001540] font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(178,144,77,0.4)] flex items-center gap-2 group text-sm md:text-base">
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-8">
              <Scale size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">{t('specialties')}</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              {t('casesTitle')}
            </h2>
            <div className="h-1 bg-gradient-to-r from-[#B2904D] to-[#D4AF37] w-20 mx-auto rounded-full shadow-[0_0_10px_#B2904D]" />
          </motion.div>

          <div className="grid grid-cols-3 gap-6">
            {mainCasesData.map((item, index) => (
              <motion.div
                layoutId={`card-container-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ 
                  delay: index * 0.05,
                  duration: 0.5,
                  ease: "easeOut" 
                }}
                onClick={() => setSelectedId(item.id)}
                // --- CORRECCIÓN: Eliminado transform-gpu y ajustado background para legibilidad ---
                className={`
                  col-span-3 sm:col-span-2 lg:col-span-1 ${item.position} 
                  group relative rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 cursor-pointer 
                  border border-white/10 transition-all duration-300 
                  hover:scale-[1.01] hover:border-[#B2904D]/70 
                  hover:shadow-[0_0_20px_rgba(178,144,77,0.2)] 
                  overflow-hidden
                  ${!isMobile ? 'bg-[#001540]/30 backdrop-blur-md' : 'bg-[#001540] border-white/20'} 
                `}
              >
                
                <div className={`absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#B2904D]/10 to-transparent 80%`} />
                
                <div className="relative z-10 h-full flex flex-col">
                  
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md transition-all bg-white/10 group-hover:bg-gradient-to-br group-hover:from-[#B2904D] group-hover:to-[#D4AF37]">
                    <item.icon size={30} strokeWidth={1.5} />
                  </div>

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

                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-bold flex items-center gap-2 group-hover:gap-4 transition-all text-white group-hover:text-[#B2904D]">
                      {t('details')}
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
                    </span>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm bg-white/10 group-hover:bg-[#B2904D] text-[#002342] group-hover:text-white">
                      <ArrowRight size={16} className="text-white/80 group-hover:text-white transition-colors"/>
                    </div>
                  </div>
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
              
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-6 right-6 z-50 bg-black/40 hover:bg-[#002342] text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/20"
              >
                <X size={24} />
              </button>

              <div className="w-full lg:w-2/5 bg-gradient-to-br from-[#002342] via-[#003366] to-[#002342] p-8 md:p-12 flex flex-col justify-center text-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#B2904D] to-[#D4AF37] rounded-xl flex items-center justify-center mb-6 shadow-xl">
                    <selectedItem.icon size={30} className="text-white" />
                  </div>
                  
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

                  <div className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent rounded-full mb-6 w-[60px]" />

                  <p className="text-white/70 text-sm leading-relaxed">
                    {t('modalClosing')}
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-3/5 p-8 md:p-12 overflow-y-auto bg-[#001540] text-white scrollbar-custom">
                
                <div className="mb-8">
                  <h4 className="text-2xl md:text-3xl font-black text-white mb-4 leading-snug">
                    {gT(selectedItem.content.intro)}
                  </h4>
                  <p className="text-lg text-blue-100/70 leading-relaxed">
                    {gT(selectedItem.content.description)}
                  </p>
                </div>

                {selectedItem.content.subPoints && selectedItem.content.subTitle && (
                    <div className="space-y-6">
                      <div className="bg-white/5 p-6 md:p-8 rounded-2xl border border-white/10 shadow-sm">
                        <h5 className="font-black text-white mb-5 flex items-center gap-3 text-xl">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md bg-white/10">
                            <Scale size={20} className="text-white"/> 
                          </div>
                          {gT(selectedItem.content.subTitle)}
                        </h5>
                        <div className="grid md:grid-cols-2 gap-3">
                          {selectedItem.content.subPoints?.map((point: any, i: number) => ( 
                            <div key={i} className="flex items-start gap-3 text-white/70 bg-black/20 p-3 rounded-lg border border-white/10 shadow-xs">
                              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[#B2904D]"></div> 
                              <span className="text-sm font-medium">{gT(point)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                )}

                {selectedItem.content.solution && (
                  <div className="mt-8 bg-white/5 p-6 rounded-2xl border border-white/10 shadow-sm">
                    <p className="text-white/80 leading-relaxed font-medium text-base">
                      {gT(selectedItem.content.solution)}
                    </p>
                  </div>
                )}

                <div className="mt-10 pt-6 border-t border-white/10">
                  <a 
                    href="#contacto" 
                    onClick={() => setSelectedId(null)}
                    className="group w-full py-4 bg-[#B2904D] text-[#002342] rounded-xl font-black flex items-center justify-center gap-3 shadow-lg hover:bg-white transition-all"
                  >
                    <span className="relative flex items-center gap-3 text-lg">
                      <PhoneCall size={20}/>
                      {t('requestEvaluation')}
                    </span>
                  </a>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-32 relative overflow-hidden bg-[#001540]"> 
        
        <div className="absolute inset-0 bg-[#001540] opacity-90" />

        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-sm mb-8">
              <div className="w-2 h-2 bg-[#B2904D] rounded-full animate-pulse"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('videoSectionBadge')}</span>
            </div>
            
            <h2 className="text-4xl font-black text-white mb-6 leading-tight">
              {t('videoSectionTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#D4AF37]">Juan Solís</span>
            </h2>
            
            <p className="text-xl text-blue-100/70 mb-8 leading-relaxed">
              {t('videoSectionSubtitle')}
            </p>
            
            <a 
              href="tel:+18664200405"
              className="group inline-flex items-center gap-4 bg-[#B2904D] text-[#002342] px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-white transition-all"
            >
              <div className="relative w-10 h-10 bg-black/10 rounded-lg flex items-center justify-center">
                <PhoneCall size={20} />
              </div>
              <span className="relative">{t('callNow')}</span>
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative group p-6 bg-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/10"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-video"> 
              <div
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer bg-black/10 hover:bg-black/0 transition-colors"
              >
                {!isPlaying && (
                  <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/60 hover:scale-110 transition-transform">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                )}
              </div>
              {/* VIDEO: Añadido loading="lazy" si fuese iframe, o poster si fuese video tag.
                  Como es un video tag, se deja igual pero el control manual de play ayuda. */}
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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8">
              <FileText size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t('processMethod')}</span>
            </div>
            
            <h2 className="text-4xl font-black text-white mb-6">{t('processTitle')}</h2>
            <div className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full shadow-[0_0_10px_#B2904D] w-20" />
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {processStepsData.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 hover:bg-white/20 hover:border-[#B2904D]/50 transition-all duration-300 h-full shadow-lg">
                  
                  <div className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-[#B2904D] to-[#D4AF37] rounded-lg flex items-center justify-center font-black text-white text-lg shadow-md">
                    {step.id}
                  </div>

                  <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#B2904D] transition-all">
                    <step.icon size={26} className="text-white"/>
                  </div>

                  <h3 className="font-black text-xl text-white mb-3">{gT(step.title)}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{gT(step.desc)}</p>
                </div>

                {index < processStepsData.length - 1 && (
                  <div className="hidden md:block absolute top-[25%] -right-4 w-8 h-0.5 bg-gradient-to-r from-[#B2904D] to-transparent origin-left" />
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