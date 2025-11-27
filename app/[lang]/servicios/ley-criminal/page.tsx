'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  PhoneCall,
  ArrowRight,
  Car, 
  Scale, 
  FileText, 
  MessageSquare,
  Zap, 
  CheckCircle2, 
  Star,
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
  // --- DATOS PRINCIPALES DE CASOS (LEY CRIMINAL) ---
  mainCases: [
    {
      id: 'violencia_domestica',
      title: { es: "Violencia Doméstica", en: "Domestic Violence" },
      subtitle: { es: "Delitos Emotivos y Complejos", en: "Emotional and Complex Offenses" },
      icon: MessageSquare,
      gradient: "from-red-500/10 via-orange-500/10 to-red-600/10",
      position: "col-span-3 lg:col-span-2 h-[450px]", 
      content: {
        intro: { es: "¿Está acusado de violencia doméstica?", en: "Are you accused of domestic violence?" },
        description: { es: "Los casos de violencia doméstica se encuentran entre los delitos penales más emotivos y complejos. Si usted y un familiar tienen una relación hostil, es fácil terminar en problemas legales. A menudo resulta en un arresto basado en versiones diferentes del mismo evento.", en: "Domestic violence cases are among the most emotional and complex criminal offenses. If you and a family member have a hostile relationship, it's easy to end up in legal trouble. It often results in an arrest based on different versions of the same event." },
        subTitle: { es: "Sanciones Potenciales Incluyen:", en: "Potential Penalties Include:" },
        subPoints: [
          { es: "Multas y libertad condicional.", en: "Fines and probation." },
          { es: "Órdenes de protección y restricción.", en: "Protection and restraining orders." },
          { es: "Consejería obligatoria y clases de control de ira.", en: "Mandatory counseling and anger management classes." },
          { es: "Órdenes de custodia de menores y encarcelamiento.", en: "Child custody orders and imprisonment." },
        ],
        solution: { es: "Si ha sido arrestado o acusado, es esencial que busque asesoría legal inmediata. Le proporcionaremos una defensa sólida para proteger su libertad y sus derechos familiares.", en: "If you have been arrested or charged, it is essential that you seek immediate legal advice. We will provide you with a solid defense to protect your freedom and family rights." },
      }
    },
    {
      id: 'asalto',
      title: { es: "Asalto y Agresión", en: "Assault and Battery" },
      subtitle: { es: "Violencia Física o Amenaza de Daño", en: "Physical Violence or Threat of Harm" },
      icon: Zap, 
      gradient: "from-blue-500/10 via-cyan-500/10 to-blue-600/10",
      position: "col-span-3 lg:col-span-1 h-[450px]", 
      content: {
        intro: { es: "¿Ha sido acusado de asalto o agresión?", en: "Have you been charged with assault or battery?" },
        description: { es: "El asalto implica causar intencionalmente que otra persona tenga temor razonable de un contacto dañino inminente. No siempre se requiere una lesión física. Si hay violencia física real, el cargo se combina con un cargo de agresión.", en: "Assault involves intentionally causing another person to have reasonable fear of imminent harmful contact. A physical injury is not always required. If there is actual physical violence, the charge is combined with a battery charge." },
        solution: { es: "Es importante conocer la gravedad de las repercusiones, como el tiempo en la cárcel o multas. Nuestros abogados de defensa criminal están aquí para brindarle el asesoramiento y la representación que necesita.", en: "It is important to know the seriousness of the repercussions, such as jail time or fines. Our criminal defense attorneys are here to provide you with the advice and representation you need." },
      }
    },
    {
      id: 'dwi',
      title: { es: "DWI - Manejo en Estado de Ebriedad", en: "DWI - Driving While Intoxicated" },
      subtitle: { es: "Conducir Bajo la Influencia (DUI)", en: "Driving Under the Influence (DUI)" },
      icon: Car, 
      gradient: "from-purple-500/10 via-pink-500/10 to-purple-600/10",
      position: "col-span-3 lg:col-span-1 h-[450px]", 
      content: {
        intro: { es: "¿Necesita un abogado después de ser sorprendido conduciendo bajo la influencia?", en: "Need an attorney after being caught driving under the influence?" },
        description: { es: "El límite legal de contenido de alcohol en la sangre es típicamente 0.08%, pero puede ser detenido por sospecha de consumo de drogas o alcohol, independientemente de la cantidad exacta.", en: "The legal limit for blood alcohol content is typically 0.08%, but you can be arrested for suspicion of drug or alcohol consumption, regardless of the exact amount." },
        subTitle: { es: "Graves Consecuencias Incluyen:", en: "Serious Consequences Include:" },
        subPoints: [
          { es: "Un registro de antecedentes penales.", en: "A criminal record." },
          { es: "Suspensión o revocación de su licencia de conducir.", en: "Suspension or revocation of your driver's license." },
          { es: "Sentencia de cárcel y multas elevadas.", en: "Jail sentence and high fines." },
          { es: "Programas de tratamiento requeridos y aumento del costo del seguro.", en: "Required treatment programs and increased insurance cost." },
        ],
        solution: { es: "Nuestros abogados de defensa criminal están aquí para brindarle el asesoramiento y la representación que necesita para luchar contra los cargos de DWI.", en: "Our criminal defense attorneys are here to provide you with the advice and representation you need to fight DWI charges." },
      }
    },
    {
      id: 'hurto',
      title: { es: "Hurto, Robo y Delitos Patrimoniales", en: "Theft, Robbery, and Property Crimes" },
      subtitle: { es: "Fraude, Malversación y Robo de Identidad", en: "Fraud, Embezzlement, and Identity Theft" },
      icon: FileText, 
      gradient: "from-yellow-500/10 via-amber-500/10 to-yellow-600/10",
      position: "col-span-3 lg:col-span-1 h-[450px]", 
      content: {
        intro: { es: "¿Ha sido acusado de un delito de robo o hurto?", en: "Have you been charged with a theft or larceny offense?" },
        description: { es: "Este delito penal suele aplicarse de manera amplia; es delito de hurto cuando una persona se apropia intencional o fraudulentamente de los bienes personales de otra persona sin su consentimiento expreso.", en: "This criminal offense is often broadly applied; it is a theft offense when a person intentionally or fraudulently appropriates another person's personal property without their express consent." },
        subTitle: { es: "Delitos de Hurto Incluidos:", en: "Theft Offenses Included:" },
        subPoints: [
          { es: "Robo en tiendas y Hurto menor.", en: "Shoplifting and petty theft." },
          { es: "Hurto y Malversación.", en: "Larceny and Embezzlement." },
          { es: "Robo de identidad y Fraude/Falsificación.", en: "Identity theft and Fraud/Forgery." },
          { es: "Robo con cheque o emisión de cheques sin fondos.", en: "Theft by check or issuing bad checks." },
          { es: "Uso ilegal/no autorizado de un vehículo motorizado.", en: "Illegal/unauthorized use of a motor vehicle." },
        ],
        solution: { es: "Si lo acusan de un delito en esta lista, contáctenos ahora. Lucharemos para proteger su reputación y evitar consecuencias penales severas.", en: "If you are accused of a crime on this list, contact us now. We will fight to protect your reputation and avoid severe criminal consequences." },
      }
    },
    {
      id: 'prostitucion',
      title: { es: "Prostitución y Solicitación", en: "Prostitution and Solicitation" },
      subtitle: { es: "Delito Grave y Sanciones Estrictas", en: "Felony Offense and Strict Penalties" },
      icon: Scale, 
      gradient: "from-green-500/10 via-emerald-500/10 to-green-600/10",
      position: "col-span-3 lg:col-span-3 h-[450px]",
      content: {
        intro: { es: "¿Ha sido acusado de prostitución o solicitación?", en: "Have you been charged with prostitution or solicitation?" },
        description: { es: "Las leyes han endurecido las penas, por ejemplo, en Texas, la solicitud de prostitución puede ser un delito grave. Alguien es culpable si 'la persona a sabiendas ofrece o acepta pagar una tarifa a otra persona con el fin de participar en una conducta sexual'.", en: "Laws have stiffened penalties; for example, in Texas, solicitation of prostitution can be a felony offense. Someone is guilty if 'the person knowingly offers or agrees to pay a fee to another person for the purpose of engaging in sexual conduct'." },
        solution: { es: "Según la definición, no es necesario que el dinero cambie de manos ni que se realice ningún acto sexual. Las sanciones varían ampliamente; es esencial consultar con nuestro abogado defensor penal para determinar las posibles sanciones y las opciones legales que tiene.", en: "According to the definition, no money needs to change hands or sexual act take place. Penalties vary widely; it is essential to consult with our criminal defense attorney to determine the possible penalties and the legal options you have." },
      }
    },
  ],

  // --- PASOS DEL PROCESO ---
  processSteps: [
    { id: 1, title: { es: "Detención y Contacto", en: "Arrest and Contact" }, icon: PhoneCall, desc: { es: "Llámenos inmediatamente tras un arresto para proteger sus derechos.", en: "Call us immediately after an arrest to protect your rights." } },
    { id: 2, title: { es: "Análisis de Pruebas", en: "Evidence Analysis" }, icon: FileText, desc: { es: "Revisamos informes policiales, testimonios y toda la evidencia.", en: "We review police reports, testimonies, and all evidence." } },
    { id: 3, title: { es: "Estrategia Legal", en: "Legal Strategy" }, icon: Scale, desc: { es: "Desarrollamos una defensa sólida y exploramos todas las opciones.", en: "We develop a solid defense and explore all options." } },
    { id: 4, title: { es: "Representación en Corte", en: "Court Representation" }, icon: CheckCircle2, desc: { es: "Lo representamos en la corte para luchar por el mejor resultado posible.", en: "We represent you in court to fight for the best possible outcome." } }, 
  ],

  // --- TEXTOS DE INTERFAZ FIJA ---
  interface: {
    badge: { es: "Defensa Legal Inmediata", en: "Immediate Legal Defense" },
    mainTitle: { es: "LEY CRIMINAL", en: "CRIMINAL LAW" },
    heroSubtitle1: { es: "Desde DWI hasta hurto y asalto. Protegemos su libertad y su futuro.", en: "From DWI to theft and assault. We protect your freedom and future." },
    heroSubtitle2: { es: "Su primera llamada debe ser a nuestro abogado defensor.", en: "Your first call should be to our defense attorney." },
    ctaConsultation: { es: "Consulta Ahora", en: "Consult Now" },
    ctaCases: { es: "Ver Tipos de Casos", en: "View Case Types" },
    specialties: { es: "Nuestra Defensa", en: "Our Defense" },
    casesTitle: { es: "Delitos que Defendemos", en: "Offenses We Defend" },
    details: { es: "Ver Detalles", en: "View Details" },
    modalClosing: { es: "Abogados defensores penales listos para proteger su libertad.", en: "Criminal defense attorneys ready to protect your freedom." },
    videoSectionBadge: { es: "Conoce a Nuestro Equipo", en: "Meet Our Team" },
    videoSectionTitle: { es: "Abogado", en: "Attorney" },
    videoSectionSubtitle: { es: "Escucha directamente de nuestros socios cómo protegemos tu libertad y derechos en casos criminales.", en: "Hear directly from our partners how we protect your freedom and rights in criminal cases." },
    callNow: { es: "Llámanos Ahora Mismo", en: "Call Us Right Now" },
    processMethod: { es: "Nuestro Método", en: "Our Method" },
    processTitle: { es: "Su Ruta Hacia la Defensa", en: "Your Path to Defense" },
    requestEvaluation: { es: "Solicitar Consulta Privada", en: "Request Private Consultation" },
    videoAlt: { es: "Video explicativo sobre la dedicación del equipo legal.", en: "Explanation video about the legal team's dedication." }
  }
};


// --- COMPONENTE PRINCIPAL ---

export default function CriminalLawPage() {
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
    if (index === 4) return { ...item, position: "col-span-3 lg:col-span-3 h-[450px]" };
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
            <Scale size={14} className="text-[#B2904D] fill-[#B2904D]" /> 
            <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">{t('badge')}</span>
          </motion.div>

          {/* Título Principal: LEY CRIMINAL */}
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

          {/* Bento Grid Layout: 3 columnas, 5 elementos */}
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
                  
                  {/* Icono Principal (EL QUE DEBE QUEDARSE) */}
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

      {/* --- MODAL (CONTENIDO DE LEY CRIMINAL) --- */}
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