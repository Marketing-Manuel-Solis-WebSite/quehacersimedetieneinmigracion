'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, Variants } from 'framer-motion';
import {
  X,
  PhoneCall,
  ArrowRight,
  Scale, 
  FileText, 
  MessageSquare,
  Star, 
  Zap,
  HardHat,
  CheckCircle2,
  Globe, 
  Shield,
  Gavel, GraduationCap, Award, Mail
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

// --- DATOS GLOBALES (Optimizados para SEO Semántico) ---
const texts = {
  mainCases: [
    {
      id: 'deportacion',
      title: { es: "Defensa Contra la Deportación", en: "Defense Against Deportation" },
      subtitle: { es: "Asilo, Cancelación de Remoción y Fianzas", en: "Asylum, Cancellation of Removal, and Bonds" },
      icon: Shield, 
      position: "col-span-3 lg:col-span-2 h-[450px]", 
      content: {
        intro: { es: "¿Está usted o un ser querido enfrentando la deportación? ¡Contáctenos inmediatamente!", en: "Are you or a loved one facing deportation? Contact us immediately!" },
        description: { es: "Los casos de deportación casi siempre son urgentes. Nuestro equipo experto en inmigración luchará por usted. Existen varias formas de evitar la deportación.", en: "Deportation cases are almost always urgent. Our expert immigration team will fight for you. There are several ways to avoid deportation." },
        subTitle: { es: "Estrategias de Defensa Incluyen:", en: "Defense Strategies Include:" },
        subPoints: [
          { es: "Asilo (Persecución por raza, religión, etc.)", en: "Asylum (Persecution based on race, religion, etc.)" },
          { es: "Cancelación de Remoción (10 años de presencia, buen carácter, dificultad excepcional)", en: "Cancellation of Removal (10 years presence, good moral character, exceptional hardship)" },
          { es: "Ajuste de estatus", en: "Adjustment of status" },
          { es: "Liberación de detención (Fianzas por ICE o Juez)", en: "Release from detention (Bonds by ICE or Judge)" },
        ],
        solution: { es: "Le ayudaremos a presentar la evidencia y argumentos necesarios para la Cancelación de Remoción o a asegurar una fianza para su liberación de detención.", en: "We will help you present the necessary evidence and arguments for Cancellation of Removal or secure a bond for your release from detention." },
      }
    },
    {
      id: 'residencia_familiar',
      title: { es: "Residencia por un Familiar", en: "Residency Through a Family Member" },
      subtitle: { es: "Peticiones I-130 y Ajuste de Estatus", en: "I-130 Petitions and Adjustment of Status" },
      icon: FileText,
      position: "col-span-3 lg:col-span-1 h-[450px]", 
      content: {
        intro: { es: "¿Espera alcanzar la condición de residente legal de los EE. UU.?", en: "Do you hope to achieve lawful permanent resident status in the U.S.?" },
        description: { es: "Si usted tiene un familiar en los Estados Unidos que goza del estatus de Residente Permanente o es ciudadano americano, usted posiblemente califique para una Residencia Permanente.", en: "If you have a family member in the United States who holds Permanent Resident status or is a U.S. citizen, you may qualify for Permanent Residency." },
        subTitle: { es: "Categorías de Familiares que Califican:", en: "Qualifying Family Member Categories:" },
        subPoints: [
          { es: "Residente Permanente pide a: Cónyuge, Hijos solteros menores de 21 años.", en: "Permanent Resident petitions for: Spouse, Unmarried children under 21." },
          { es: "Ciudadano Americano pide a: Cónyuge, Hijos y familia, Padres, Hermanos y familia.", en: "U.S. Citizen petitions for: Spouse, Children and family, Parents, Siblings and family." },
        ],
        solution: { es: "Guiaremos a su familiar patrocinador en el proceso de Petición Familiar (I-130) y el subsiguiente Ajuste de Estatus para obtener su Green Card.", en: "We will guide your sponsoring family member through the Family Petition process (I-130) and the subsequent Adjustment of Status to obtain your Green Card." },
      }
    },
    {
      id: 'residencia_empleador',
      title: { es: "Residencia por Empleador", en: "Employer-Based Residency" },
      subtitle: { es: "Peticiones Basadas en Empleo (Green Card)", en: "Employment-Based Petitions (Green Card)" },
      icon: HardHat, 
      position: "col-span-3 lg:col-span-1 h-[450px]",
      content: {
        intro: { es: "¿Desea convertirse en residente legal de los EE. UU. a través de su trabajo?", en: "Do you wish to become a lawful permanent resident of the U.S. through your job?" },
        description: { es: "Si usted entró legalmente a los Estados Unidos y su permiso aún está vigente, o usted sometió alguna petición antes de 4/30/2001 y su patrón está dispuesto a ayudarlo, tiene posibilidades de arreglar su residencia.", en: "If you entered the United States legally and your permit is still valid, or you filed a petition before 4/30/2001 and your employer is willing to help you, you have possibilities to arrange your residency." },
        solution: { es: "Nuestro equipo le ayudará a navegar los complejos procesos de certificación laboral y peticiones I-140 para asegurar su futuro en el país. Esto aplica incluso si usted está en su país de origen y una empresa Estadounidense lo patrocina.", en: "Our team will help you navigate the complex labor certification processes and I-140 petitions to secure your future in the country. This applies even if you are in your home country and an American company sponsors you." },
      }
    },
    {
      id: 'asilo_main',
      title: { es: "Asilo", en: "Asylum" },
      subtitle: { es: "Persecución por Opinión Política, Raza o Religión", en: "Persecution based on Political Opinion, Race, or Religion" },
      icon: Zap, 
      position: "col-span-3 lg:col-span-1 h-[450px]",
      content: {
        intro: { es: "¿Está usted perseguido en su país? Le podemos ayudar con el proceso de solicitar asilo.", en: "Are you persecuted in your country? We can help you with the asylum application process." },
        description: { es: "Usted debe haber sido perseguido o estar en peligro de persecución en su país de origen, a causa de su opinión política, religión, raza o nacionalidad. Usted debe tener un temor bien fundamentado de ser perseguido por las mismas razones si regresa a su país de origen.", en: "You must have been persecuted or be in danger of persecution in your home country, due to your political opinion, religion, race, or nationality. You must have a well-founded fear of being persecuted for the same reasons if you return to your home country." },
        subTitle: { es: "Tipos de Procesos de Asilo:", en: "Types of Asylum Processes:" },
        subPoints: [
          { es: "Asilo afirmativo (Para personas que no están en procedimientos judiciales)", en: "Affirmative asylum (For people not in court proceedings)" },
          { es: "Asilo defensivo (Para personas que ya están en algún procedimiento judicial)", en: "Defensive asylum (For people already in court proceedings)" },
          { es: "Requisito: Solicitar dentro de un año de entrar a los Estados Unidos (con excepciones).", en: "Requirement: Apply within one year of entering the United States (with exceptions)." },
        ],
        solution: { es: "Lo guiaremos en la recopilación de pruebas y la presentación de su caso, ya sea Asilo Afirmativo o Defensivo, para protegerlo de la deportación.", en: "We will guide you in gathering evidence and presenting your case, whether Affirmative or Defensive Asylum, to protect you from deportation." },
      }
    },
    {
      id: 'uvawa',
      title: { es: "Visa U / VAWA", en: "U Visa / VAWA" },
      subtitle: { es: "Víctimas de Delitos y Agresión Familiar", en: "Victims of Crimes and Family Aggression" },
      icon: MessageSquare, 
      position: "col-span-3 lg:col-span-2 h-[450px]",
      content: {
        intro: { es: "¿Ha sido agredido o es víctima de un delito violento o crueldad familiar en los Estados Unidos?", en: "Have you been assaulted or are you a victim of a violent crime or family cruelty in the United States?" },
        description: { es: "La Visa U es para víctimas de un delito grave que cooperan con la policía. VAWA (Ley de Violencia contra Mujeres) es para víctimas de agresión o crueldad cometida por familiares (cónyuges, padres, hijos) ciudadanos o residentes permanentes.", en: "The U Visa is for victims of a serious crime who cooperate with the police. VAWA (Violence Against Women Act) is for victims of assault or cruelty committed by family members (spouses, parents, children) who are citizens or permanent residents." },
        subTitle: { es: "Calificación para VAWA:", en: "Qualification for VAWA:" },
        subPoints: [
          { es: "Víctima de agresión o crueldad por: Cónyuge, ex cónyuge, padre o hijo de un ciudadano de los EEUU.", en: "Victim of assault or cruelty by: Spouse, ex-spouse, parent, or child of a U.S. citizen." },
          { es: "Víctima de agresión o crueldad por: Cónyuge, ex cónyuge, o padre quien es residente permanente legal.", en: "Victim of assault or cruelty by: Spouse, ex-spouse, or parent who is a lawful permanent resident." },
        ],
        solution: { es: "Podemos ayudarle a obtener la Residencia Permanente Legal (LPR) protegiéndole de la violencia y la amenaza de deportación, sin depender de su agresor.", en: "We can help you obtain Lawful Permanent Residency (LPR) by protecting you from violence and the threat of deportation, without depending on your abuser." },
      }
    },
    {
      id: 'naturalizacion',
      title: { es: "Naturalización", en: "Naturalization" },
      subtitle: { es: "Conviértete en Ciudadano Estadounidense", en: "Become a U.S. Citizen" },
      icon: CheckCircle2, 
      position: "col-span-3 lg:col-span-1 h-[450px]",
      content: {
        intro: { es: "¿Desea convertirse en ciudadano estadounidense?", en: "Do you want to become a U.S. citizen?" },
        description: { es: "¿Por qué permanecer con la residencia legal si puede llegar a ser un ciudadano estadounidense y disfrutar de todos los derechos que corresponden? La naturalización es el paso final hacia la plena ciudadanía.", en: "Why remain with legal residency if you can become a U.S. citizen and enjoy all the corresponding rights? Naturalization is the final step towards full citizenship." },
        subTitle: { es: "Maneras Comunes de Calificar:", en: "Common Ways to Qualify:" },
        subPoints: [
          { es: "Residencia Permanente por al menos 5 años.", en: "Permanent residency for at least 5 years." },
          { es: "Residencia permanente como cónyuge de un ciudadano de los EEUU.", en: "Permanent residency as the spouse of a U.S. citizen." },
          { es: "Calificar sirviendo en las fuerzas armadas de los EEUU.", en: "Qualify by serving in the U.S. armed forces." },
          { es: "Naturalización para hijos de ciudadanos (Cumpliendo requisitos).", en: "Naturalization for children of citizens (Meeting requirements)." },
          { es: "Requisito: Pasar un examen de ciudadanía en inglés.", en: "Requirement: Pass a citizenship test in English." },
        ],
        solution: { es: "Lo guiaremos en el proceso de solicitud, la preparación para el examen de ciudadanía y la entrevista final para que obtenga su pasaporte americano.", en: "We will guide you through the application process, preparation for the citizenship test, and the final interview so that you obtain your American passport." },
      }
    }
  ] as CaseItem[],
  processSteps: [
    { id: 1, title: { es: "Contacto", en: "Contact" }, icon: PhoneCall, desc: { es: "Llámanos para iniciar tu evaluación legal.", en: "Call us to start your legal evaluation." } },
    { id: 2, title: { es: "Análisis", en: "Analysis" }, icon: FileText, desc: { es: "Revisamos tu historial migratorio y evidencia.", en: "We review your immigration history and evidence." } },
    { id: 3, title: { es: "Estrategia", en: "Strategy", }, icon: Scale, desc: { es: "Diseñamos la ruta legal para tu objetivo.", en: "We design the legal route for your goal." } },
    { id: 4, title: { es: "Resultados", en: "Results" }, icon: CheckCircle2, desc: { es: "Te acompañamos hasta alcanzar tu estatus migratorio.", en: "We accompany you until you achieve your immigration status." } },
  ],

  interface: {
    badge: { es: "Especialistas en Inmigración", en: "Immigration Specialists" },
    // KEYWORD TUNING FOR H1
    title1: { es: "Abogados de Inmigración", en: "Immigration Attorneys" },
    title2: { es: "Expertos en EE.UU.", en: "U.S. Experts" }, 
    heroDescription: { es: "Representación experta en todos los aspectos de ley de inmigración para proteger su futuro en Estados Unidos. Deportación, Visas y Ciudadanía.", en: "Expert representation in all aspects of immigration law to protect your future in the United States. Deportation, Visas, and Citizenship." },
    stats: { es: "Familias Unidas", en: "Families Reunited" },
    casesTitle: { es: "Áreas de Práctica Migratoria", en: "Immigration Practice Areas" },
    ctaConsultation: { es: "Consulta Ahora", en: "Consult Now" },
    ctaCases: { es: "Ver Tipos de Casos", en: "View Case Types" },
    specialties: { es: "Nuestras Especialidades", en: "Our Specialties" },
    details: { es: "Ver Detalles", en: "View Details" },
    modalClosing: { es: "Representación legal especializada con décadas de experiencia en temas de inmigración", en: "Specialized legal representation with decades of experience in immigration matters" },
    videoSectionBadge: { es: "Conoce a Nuestro Equipo", en: "Meet Our Team" },
    videoSectionTitle: { es: "Abogado", en: "Attorney" },
    videoSectionSubtitle: { es: "Escucha directamente de nuestros socios cómo protegemos tus derechos con experiencia y dedicación en Inmigración.", en: "Hear directly from our partners how we protect your rights with expertise and dedication in Immigration." },
    callNow: { es: "Llámanos Ahora Mismo", en: "Call Us Right Now" },
    processMethod: { es: "Nuestro Método Legal", en: "Our Legal Method" },
    processTitle: { es: "Tu Ruta Hacia el Estatus Legal", in: "Your Path to Legal Status" },
    requestEvaluation: { es: "Solicitar Evaluación de Caso", en: "Request Case Evaluation" },
    videoAlt: { es: "Video explicativo sobre la dedicación del equipo legal.", in: "Explanation video about the legal team's dedication." }
  }
};


export default function ImmigrationClient() {
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

  // Optimización: Cálculo simplificado de posiciones
  const responsiveCases = mainCasesData.map((item, index) => {
    if (index === 0) return { ...item, position: "col-span-3 lg:col-span-2 h-[450px]" };
    if (index === 1) return { ...item, position: "col-span-3 lg:col-span-1 h-[450px]" };
    if (index === 2) return { ...item, position: "col-span-3 lg:col-span-1 h-[450px]" };
    if (index === 3) return { ...item, position: "col-span-3 lg:col-span-1 h-[450px]" };
    if (index === 4) return { ...item, position: "col-span-3 lg:col-span-2 h-[450px]" };
    return { ...item, position: "col-span-3 lg:col-span-1 h-[450px]" };
  });

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

      {/* --- FONDO OPTIMIZADO --- */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#001f5f]" />
         
         <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

         {/* Orbes optimizados */}
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
            <span className="text-[120vh] font-black italic text-white tracking-tighter transform -skew-x-12">
               INMIGRACIÓN
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
                 <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-2xl rounded-full z-0 opacity-80" />
                 
                 <div className="relative z-10 w-full h-full flex items-center justify-center transform-gpu">
                    <div className="relative w-full h-full">
                       <Image
                         src="/immigration-hero.png"
                         alt="Abogado de Inmigración en USA Manuel Solís"
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
                    className="absolute bottom-4 md:bottom-10 left-0 md:left-[-20px] z-20 p-4 md:p-6 border border-white/10 rounded-2xl backdrop-blur-md bg-white/10 shadow-2xl"
                 >
                    <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50">
                       <span className="text-4xl md:text-5xl font-bold tracking-tighter">20k</span> 
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

                 {/* H1 SEO OPTIMIZADO */}
                 <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-thin text-white tracking-tight leading-[0.9]">
                    <span className="block overflow-hidden pb-2 perspective-[400px]">
                       <motion.span custom={0} variants={textRevealVariant} initial="hidden" animate="visible" className="block text-white/90">
                          {t('title1')}
                       </motion.span>
                    </span>
                    <span className="block overflow-hidden pb-4 perspective-[400px]">
                       <motion.span custom={1} variants={textRevealVariant} initial="hidden" animate="visible" className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#F3E5AB] to-[#B2904D]">
                          {t('title2')}
                       </motion.span>
                    </span>
                 </h1>

                 <motion.p 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
                    className="text-lg md:text-xl text-blue-100/70 font-light max-w-xl leading-relaxed border-l border-white/10 pl-4 md:pl-6"
                 >
                    {t('heroDescription')}
                 </motion.p>

                 <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
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
            {responsiveCases.map((item, index) => (
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
                  hover:scale-[1.01] hover:border-[#B2904D]/70 
                  hover:shadow-[0_0_20px_rgba(178,144,77,0.2)] 
                  overflow-hidden transform-gpu`}
              >
                
                <div 
                    className={`absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#B2904D]/10 to-transparent 80%`}
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
                  className="absolute -right-20 -bottom-20 opacity-5"
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


                {selectedItem.content.solution && (
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
            className="order-1 lg:order-2 relative group p-6 bg-white/10 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/10"
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
                    className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/60"
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8"
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
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 hover:bg-white/20 hover:border-[#B2904D]/50 transition-all duration-300 h-full shadow-lg">
                  
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