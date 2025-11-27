'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  PhoneCall,
  ArrowRight,
  Scale, 
  FileText, 
  HandCoins, 
  MessageSquare,
  Star, 
  Zap,
  HardHat,
  CheckCircle2,
} from 'lucide-react';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm';
import { useLanguage } from '../../../context/LanguageContext';

// --- FUNCIÓN AUXILIAR PARA OBTENER EL TEXTO TRADUCIDO ---
const getText = (obj: any, lang: 'es' | 'en'): string => {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es;
};

// --- ESTRUCTURA DE DATOS BILINGÜES ---
const texts = {
  // --- DATOS PRINCIPALES DE CASOS (IMMIGRATION LAW) ---
  mainCases: [
    {
      id: 'deportacion',
      title: { es: "Defensa Contra la Deportación", en: "Defense Against Deportation" },
      subtitle: { es: "Asilo, Cancelación de Remoción y Fianzas", en: "Asylum, Cancellation of Removal, and Bonds" },
      icon: Scale, 
      gradient: "from-blue-500/10 via-cyan-500/10 to-blue-600/10",
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
      gradient: "from-purple-500/10 via-pink-500/10 to-purple-600/10",
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
      gradient: "from-green-500/10 via-emerald-500/10 to-green-600/10",
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
      gradient: "from-yellow-500/10 via-amber-500/10 to-yellow-600/10",
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
      gradient: "from-red-500/10 via-orange-500/10 to-red-600/10",
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
      gradient: "from-pink-500/10 via-red-500/10 to-pink-600/10",
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
  ],

  // --- PASOS DEL PROCESO ---
  processSteps: [
    { id: 1, title: { es: "Contacto", en: "Contact" }, icon: PhoneCall, desc: { es: "Llámanos para iniciar tu evaluación legal.", en: "Call us to start your legal evaluation." } },
    { id: 2, title: { es: "Análisis", en: "Analysis" }, icon: FileText, desc: { es: "Revisamos tu historial migratorio y evidencia.", en: "We review your immigration history and evidence." } },
    { id: 3, title: { es: "Estrategia", en: "Strategy", }, icon: Scale, desc: { es: "Diseñamos la ruta legal para tu objetivo.", en: "We design the legal route for your goal." } },
    { id: 4, title: { es: "Resultados", en: "Results" }, icon: CheckCircle2, desc: { es: "Te acompañamos hasta alcanzar tu estatus migratorio.", en: "We accompany you until you achieve your immigration status." } },
  ],

  // --- TEXTOS DE INTERFAZ FIJA ---
  interface: {
    badge: { es: "Inmigración y Derecho", en: "Immigration and Law" },
    mainTitle: { es: "INMIGRACIÓN", en: "IMMIGRATION" },
    heroSubtitle1: { es: "Desde la defensa contra la deportación hasta la ciudadanía.", en: "From defense against deportation to citizenship." },
    heroSubtitle2: { es: "Te ayudamos a proteger tus derechos y tu futuro en EE. UU.", en: "We help you protect your rights and your future in the U.S." },
    ctaConsultation: { es: "Consulta Ahora", en: "Consult Now" },
    ctaCases: { es: "Ver Tipos de Casos", en: "View Case Types" },
    specialties: { es: "Nuestras Especialidades", en: "Our Specialties" },
    casesTitle: { es: "Tipos de Casos", en: "Case Types" },
    details: { es: "Ver Detalles", en: "View Details" },
    modalClosing: { es: "Representación legal especializada con décadas de experiencia en temas de inmigración", en: "Specialized legal representation with decades of experience in immigration matters" },
    videoSectionBadge: { es: "Conoce a Nuestro Equipo", en: "Meet Our Team" },
    videoSectionTitle: { es: "Abogado", en: "Attorney" },
    videoSectionSubtitle: { es: "Escucha directamente de nuestros socios cómo protegemos tus derechos con experiencia y dedicación en Inmigración.", en: "Hear directly from our partners how we protect your rights with expertise and dedication in Immigration." },
    callNow: { es: "Llámanos Ahora Mismo", en: "Call Us Right Now" },
    processMethod: { es: "Nuestro Método", en: "Our Method" },
    processTitle: { es: "Tu Ruta Hacia el Estatus Legal", en: "Your Path to Legal Status" },
    requestEvaluation: { es: "Solicitar Evaluación", en: "Request Evaluation" },
    videoAlt: { es: "Video explicativo sobre la dedicación del equipo legal.", en: "Explanation video about the legal team's dedication." }
  }
};


// --- COMPONENTE PRINCIPAL ---

export default function ImmigrationPage() {
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


  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const mainCasesData = texts.mainCases;
  const processStepsData = texts.processSteps;

  const selectedItem = mainCasesData.find(item => item.id === selectedId);

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

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#002342] font-sans selection:bg-[#B2904D] selection:text-white overflow-x-hidden">
      <Header />

      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute top-0 left-0 w-full h-[1000px] overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-[#B2904D]/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[#002342]/5 rounded-full blur-[100px]" />
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-60 pb-32 px-4 z-10">
        
        <div className="max-w-7xl mx-auto text-center relative">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-gray-200/60 backdrop-blur-xl shadow-sm mb-8"
          >
            <Star size={14} className="text-[#B2904D] fill-[#B2904D]" /> 
            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">{t('badge')}</span>
          </motion.div>

          {/* Título Principal: INMIGRACIÓN */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-serif font-black text-[#002342] mb-6 tracking-tight leading-tight drop-shadow-sm" 
          >
            <motion.span 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#D4AF37] tracking-tight"
            >
              {t('mainTitle')}
            </motion.span>
          </motion.h1>
          
          {/* Subtítulo */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-500 font-light max-w-4xl mx-auto leading-relaxed mb-10"
          >
            {t('heroSubtitle1')}<br/>
            <span className="text-[#002342] font-semibold">{t('heroSubtitle2')}</span>
          </motion.p>

          {/* Botones */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <motion.a 
              href="#contacto"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-4 bg-[#002342] text-white rounded-xl font-bold overflow-hidden shadow-lg hover:shadow-xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#B2904D] to-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-3 text-lg">
                <PhoneCall size={20}/>
                {t('ctaConsultation')}
              </span>
            </motion.a>
            
            <motion.a 
              href="#casos"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/80 backdrop-blur-xl text-[#002342] rounded-xl font-bold border border-gray-200 hover:border-[#B2904D] transition-all shadow-md hover:shadow-lg"
            >
              {t('ctaCases')}
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* --- GRID DE CASOS --- */}
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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-gray-200/60 backdrop-blur-xl shadow-sm mb-8"
            >
              <Scale size={14} className="text-[#B2904D]" />
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">{t('specialties')}</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-black text-[#002342] mb-6">
              {t('casesTitle')}
            </h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-[#D4AF37] mx-auto rounded-full"
            />
          </motion.div>

          {/* Bento Grid Layout: 3 columnas, 6 elementos */}
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
                className={`${item.position} group relative rounded-[2.5rem] p-8 cursor-pointer bg-white/70 backdrop-blur-xl border border-gray-100 transition-all duration-300 hover:scale-[1.01] overflow-hidden 
                                 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] 
                                 hover:border-[#B2904D] hover:shadow-[0_30px_60px_-15px_rgba(0,35,66,0.5),_0_0_0_3px_rgba(178,144,77,0.5)]`}
              >
                
                {/* Degradado Sutil de Fondo (Dorado) */}
                <div 
                    className={`absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[#B2904D]/10 to-transparent 80%`}
                />
                
                {/* Contenido/Resumen de Fondo */}
                <div 
                    className="absolute inset-0 flex items-center justify-center p-8 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                >
                    <p className="text-center text-4xl font-serif font-bold text-[#002342]/10 leading-snug">
                        {gT(item.content.intro)}
                    </p>
                </div>


                <div className="relative z-10 h-full flex flex-col">
                  
                  {/* Icono Principal */}
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    transition={{ duration: 0.4 }}
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transition-all 
                                 bg-[#002342] group-hover:bg-gradient-to-br group-hover:from-[#B2904D] group-hover:to-[#D4AF37]"
                  >
                    <item.icon size={30} strokeWidth={1.5} />
                  </motion.div>

                  {/* Contenido */}
                  <div className="flex-1">
                    <motion.h3 
                      layoutId={`card-title-${item.id}`}
                      className="text-3xl font-serif font-black mb-3 transition-colors leading-tight text-[#002342] group-hover:text-[#B2904D]"
                    >
                      {gT(item.title)}
                    </motion.h3>
                    
                    <motion.p 
                      layoutId={`card-subtitle-${item.id}`}
                      className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-6"
                    >
                      {gT(item.subtitle)}
                    </motion.p>
                    
                    {/* Texto Resumen */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {gT(item.content.description).substring(0, 150)}...
                    </p>

                    {/* Separador - Dorado en hover */}
                    <div className="h-px bg-gray-200 mb-6 transition-all group-hover:bg-[#B2904D]"></div>
                  </div>

                  {/* CTA */}
                  <motion.div 
                    className="flex items-center justify-between mt-auto"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                  >
                    <span 
                        className="font-bold flex items-center gap-2 group-hover:gap-4 transition-all text-[#002342] group-hover:text-[#B2904D]"
                    >
                      {t('details')}
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform"/>
                    </span>
                    {/* Botón Circular - Dorado en hover */}
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md bg-[#002342]/10 group-hover:bg-[#B2904D]"
                    >
                      <ArrowRight size={16} className="text-[#002342] group-hover:text-white transition-colors"/>
                    </motion.div>
                  </motion.div>
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MODAL (CONTENIDO DE MIGRACIÓN) --- */}
      <AnimatePresence>
        {selectedId && selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-white/80 backdrop-blur-xl"
            />

            <motion.div
              layoutId={`card-container-${selectedItem.id}`}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-7xl h-[80vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10 ring-1 ring-black/5"
              onClick={(e) => e.stopPropagation()} 
            >
              
              {/* Close Button */}
              <motion.button
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-6 right-6 z-50 bg-white/20 hover:bg-[#002342] text-[#002342] hover:text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/30"
              >
                <X size={24} />
              </motion.button>

              {/* LEFT SIDE - Identity (Oscuro) */}
              <div className="w-full lg:w-2/5 bg-gradient-to-br from-[#002342] via-[#003366] to-[#002342] p-10 md:p-12 flex flex-col justify-center text-white relative overflow-hidden">
                
                {/* Large Icon Background */}
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
                    className="w-16 h-16 bg-gradient-to-br from-[#B2904D] to-[#D4AF37] rounded-xl flex items-center justify-center mb-6 shadow-2xl"
                  >
                    <selectedItem.icon size={30} className="text-white" />
                  </motion.div>
                  
                  <motion.h3 
                    layoutId={`card-title-${selectedItem.id}`}
                    className="text-4xl font-serif font-black mb-3 leading-tight"
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

              {/* RIGHT SIDE - Content (Blanco Limpio) */}
              <div className="w-full lg:w-3/5 p-10 md:p-12 overflow-y-auto bg-white">
                
                {/* Header */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-8"
                >
                  <h4 className="text-3xl font-serif font-black text-[#002342] mb-4 leading-snug">
                    {gT(selectedItem.content.intro)}
                  </h4>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {gT(selectedItem.content.description)}
                  </p>
                </motion.div>

                {/* Contenido Dinámico (Sub-Puntos) */}
                {selectedItem.content.subPoints && selectedItem.content.subTitle && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-6"
                    >
                      <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h5 className="font-black text-[#002342] mb-5 flex items-center gap-3 text-xl">
                          <div 
                            className="w-10 h-10 rounded-lg flex items-center justify-center shadow-md bg-[#002342]" 
                          >
                            <selectedItem.icon size={20} className="text-white"/> 
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
                              className="flex items-start gap-3 text-gray-600 bg-white p-3 rounded-lg border border-gray-100 shadow-xs"
                            >
                              <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-[#B2904D]"></div> 
                              <span className="text-sm font-medium">{gT(point)}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                )}


                {/* Solution */}
                {selectedItem.content.solution && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 bg-gray-100 p-6 rounded-2xl border border-gray-200 shadow-sm"
                  >
                    <p className="text-gray-700 leading-relaxed font-medium text-base">
                      {gT(selectedItem.content.solution)}
                    </p>
                  </motion.div>
                )}

                {/* CTA */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mt-10 pt-6 border-t border-gray-100"
                >
                  <motion.a 
                    href="#contacto" 
                    onClick={() => setSelectedId(null)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group w-full py-4 bg-[#002342] text-white rounded-xl font-black flex items-center justify-center gap-3 shadow-lg hover:bg-[#B2904D] transition-all"
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

      {/* --- VIDEO SECTION --- */}
      <section className="py-32 relative overflow-hidden bg-gray-50"> 
        
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-gray-200/60 backdrop-blur-xl shadow-sm mb-8"
            >
              <div className="w-2 h-2 bg-[#B2904D] rounded-full animate-pulse"></div>
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">{t('videoSectionBadge')}</span>
            </motion.div>
            
            {/* H2 */}
            <h2 className="text-4xl font-serif font-black text-[#002342] mb-6 leading-tight">
              {t('videoSectionTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#D4AF37]">Juan Solís</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {t('videoSectionSubtitle')}
            </p>
            
            <motion.a 
              href="tel:+18664200405"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-4 bg-[#002342] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#B2904D] transition-all"
            >
              <div className="relative w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
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
            className="order-1 lg:order-2 relative group p-6 bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-xl border border-white/80"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl bg-black aspect-video"> 
              <motion.div 
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer bg-black/10 hover:bg-black/0 transition-colors"
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/60"
                >
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </motion.div>
              </motion.div>
              <video 
                src="https://manuelsolis.com/wp-content/uploads/2023/12/pexels-john-hill-7049943-1080p.mp4" 
                className="w-full h-full object-cover" 
                aria-label={t('videoAlt')}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PROCESS SECTION --- */}
      <section className="py-32 relative overflow-hidden bg-[#002342]">
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            {/* Badge */}
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
            
            {/* H2 */}
            <h2 className="text-4xl font-serif font-black text-white mb-6">{t('processTitle')}</h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-[#B2904D] to-transparent mx-auto rounded-full"
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
                  
                  {/* Step Number */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    className="absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-[#B2904D] to-[#D4AF37] rounded-lg flex items-center justify-center font-black text-white text-lg shadow-md"
                  >
                    {step.id}
                  </motion.div>

                  {/* Icono */}
                  <motion.div 
                    className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#B2904D] transition-all"
                  >
                    <step.icon size={26} className="text-white"/>
                  </motion.div>

                  <h3 className="font-serif font-bold text-xl text-white mb-3">{gT(step.title)}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{gT(step.desc)}</p>
                </div>

                {/* Connecting Line */}
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

      {/* --- CONTACT FORM --- */}
      <section id="contacto" className="relative py-32 z-10 bg-gradient-to-r from-[#B2904D] to-[#D4AF37]">
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10" 
          >
            <ContactForm /> 
            
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}