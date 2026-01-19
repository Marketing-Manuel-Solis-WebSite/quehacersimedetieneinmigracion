'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, Scale } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { Outfit } from 'next/font/google';

// --- CONFIGURACIÓN DE FUENTE & ESTILOS ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '700'] 
});

// --- COLORES DE LA PALETA ---
const PRIMARY_COLOR_DARK = '#001540';
const ACCENT_COLOR_GOLD = '#B2904D';
const LIGHT_BLUE_ACCENT = '#38bdf8'; // sky-400

// Función auxiliar para mapas
const generateMapUrl = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};

// --- TIPOS DE DATOS ---
type OfficeData = {
  id: string; 
  city: string; // Nombre corto para el menú
  state: string; 
  title: { es: string; en: string }; // Título completo para la tarjeta
  description: { es: string; en: string }; 
  address: string;
  phone: string;
  hours: { es: string; en: string };
  mapLink: string;
  image: string;
  services: { es: string; en: string }[];
};

// --- TEXTO ORIGINAL DE DESCRIPCIÓN (Restaurado) ---
const ORIGINAL_DESC = {
    es: 'Abogado de Inmigración Manuel Solís, con más de 35 años de experiencia y 50,000 casos ganados, le guía en su trámite de visa humanitaria: visa U, visa VAWA, visa T, visa juvenil, permiso de trabajo en USA y residencia permanente en USA. Contamos con representación legal en todo Estados Unidos y también ofrecemos asesoría en áreas legales como derecho familiar, accidentes, negligencia médica, derecho civil y criminal. Nuestro equipo de más de 200 profesionales analiza cada situación de manera detallada, elaborando estrategias legales personalizadas que buscan proteger sus derechos. Ofrecemos servicios legales en español e inglés, brindando atención cercana, asesoría confiable y compromiso total con cada cliente migratorio o legal.',
    en: 'Immigration Attorney Manuel Solís, with more than 35 years of experience and 50,000 cases won, guides you through your humanitarian visa process: U visa, VAWA visa, T visa, juvenile visa, work permits in the USA, and permanent residence in the USA. We provide legal representation throughout the United States and also offer legal guidance in areas such as family law, personal injury, medical malpractice, civil law, and criminal law. Our team of more than 200 professionals carefully analyzes each situation, developing personalized legal strategies designed to protect your rights. We offer legal services in Spanish and English, providing personalized attention, trusted guidance, and full commitment to every immigration or legal client.'
};

// --- DATOS COMPLETOS ---
const officesData: OfficeData[] = [
  {
    id: 'houston-principal',
    city: 'Navigation',
    state: 'TX',
    title: { es: 'Houston (Navigation)', en: 'Houston (Navigation)' },
    description: ORIGINAL_DESC,
    address: '6705 Navigation Blvd, Houston, TX 77011, United States',
    phone: '(713) 701-1731',
    hours: { es: 'Lun - Vie 8am - 5:30pm | Sáb 8am - 1pm', en: 'Mon - Fri 8am - 5:30pm | Sat 8am - 1pm' },
    mapLink: generateMapUrl('6705 Navigation Blvd, Houston, TX 77011, United States'),
    image: '/offices/Houston.png',
    services: [ 
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'houston-north-loop',
    city: 'North Loop',
    state: 'TX',
    title: { es: 'Houston (North Loop)', en: 'Houston (North Loop)' },
    description: ORIGINAL_DESC,
    address: '2950 N Loop W, Houston, TX 77092, United States',
    phone: '(713) 701-1731',
    hours: { es: 'Lun - Vie 9am - 6pm', en: 'Mon - Fri 9am - 6pm' },
    mapLink: generateMapUrl('2950 N Loop W, Houston, TX 77092, United States'),
    image: '/offices/ofLoop.png',
    services: [ 
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'houston-northchase',
    city: 'Northchase',
    state: 'TX',
    title: { es: 'Houston (Northchase)', en: 'Houston (Northchase)' },
    description: ORIGINAL_DESC,
    address: '16510 Northchase Dr, Houston, TX 77060, United States',
    phone: '(713) 701-1731',
    hours: { es: 'Lun - Vie 9am - 6pm', en: 'Mon - Fri 9am - 6pm' },
    mapLink: generateMapUrl('16510 Northchase Dr, Houston, TX 77060, United States'),
    image: '/offices/ofNorth.png',
    services: [ 
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'houston-main',
    city: 'Main St',
    state: 'TX',
    title: { es: 'Houston (Main St)', en: 'Houston (Main St)' },
    description: ORIGINAL_DESC,
    address: '708 Main St, Houston, TX 77002, United States', 
    phone: '(713) 701-1731',
    hours: { es: 'Lun - Vie 8am - 5pm', en: 'Mon - Fri 8am - 5pm' },
    mapLink: generateMapUrl('708 Main St, Houston, TX 77002, United States'),
    image: '/offices/main.png',
    services: [ 
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'houston-kirby',
    city: 'Kirby',
    state: 'TX',
    title: { es: 'Houston (Kirby)', en: 'Houston (Kirby)' },
    description: ORIGINAL_DESC,
    address: '3730 Kirby Dr, Houston, TX 77098, United States',
    phone: '(713) 701-1731',
    hours: { es: 'Lun - Vie 9am - 6pm', en: 'Mon - Fri 9am - 6pm' },
    mapLink: generateMapUrl('3730 Kirby Dr, Houston, TX 77098, United States'),
    image: '/offices/Houston.png',
    services: [ 
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'houston-bellaire',
    city: 'Bellaire',
    state: 'TX',
    title: { es: 'Houston (Bellaire)', en: 'Houston (Bellaire)' },
    description: ORIGINAL_DESC,
    address: '9188 Bellaire Blvd E, Houston, TX 77036, United States',
    phone: '(713) 701-1731',
    hours: { es: 'Lun - Vie 9am - 6pm', en: 'Mon - Fri 9am - 6pm' },
    mapLink: generateMapUrl('9188 Bellaire Blvd E, Houston, TX 77036, United States'),
    image: '/offices/Houston.png',
    services: [ 
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'chicago',
    city: 'Chicago',
    state: 'IL',
    title: { es: 'Chicago', en: 'Chicago' }, 
    description: ORIGINAL_DESC,
    address: '6000 Cermak Rd, Cicero, IL 60804, United States',
    phone: '(312) 477-0389',
    hours: { es: 'Lun - Vie 9am - 6pm | Sáb 8am - 4pm', en: 'Mon - Fri 9am - 6pm | Sat 8am - 4pm' },
    mapLink: generateMapUrl('6000 Cermak Rd, Cicero, IL 60804, United States'),
    image: '/offices/Chicago.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Familiar', en: 'Family Law' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'memphis',
    city: 'Memphis',
    state: 'TN',
    title: { es: 'Memphis', en: 'Memphis' },
    description: ORIGINAL_DESC,
    address: '3385 Airways Blvd Suite 320, Memphis, TN 38116, United States',
    phone: '(901) 557-8357',
    hours: { es: 'Lun - Vie 9am - 5pm', en: 'Mon - Fri 9am - 5pm' },
    mapLink: generateMapUrl('3385 Airways Blvd Suite 320, Memphis, TN 38116, United States'),
    image: '/offices/Memphis.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Familiar', en: 'Family Law' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'denver',
    city: 'Arvada',
    state: 'CO',
    title: { es: 'Arvada (Denver)', en: 'Arvada (Denver)' },
    description: ORIGINAL_DESC,
    address: '5400 Ward Rd BLDG IV, Arvada, CO 80002, United States',
    phone: '(720) 358-8973',
    hours: { es: 'Lun - Vie 9am - 6pm', en: 'Mon - Fri 9am - 6pm' },
    mapLink: generateMapUrl('5400 Ward Rd BLDG IV, Arvada, CO 80002, United States'),
    image: '/offices/Denver.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'dallas',
    city: 'Dallas',
    state: 'TX',
    title: { es: 'Dallas', en: 'Dallas' },
    description: ORIGINAL_DESC,
    address: '1120 Empire Central Pl, Dallas, TX 75247, United States',
    phone: '(214) 753-8315',
    hours: { es: 'Lun - Vie 9am - 6pm | Sáb 8am - 3pm', en: 'Mon - Fri 9am - 6pm | Sat 8am - 3pm' },
    mapLink: generateMapUrl('1120 Empire Central Pl, Dallas, TX 75247, United States'),
    image: '/offices/Dallas.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'el-paso',
    city: 'El Paso',
    state: 'TX',
    title: { es: 'El Paso', en: 'El Paso' },
    description: ORIGINAL_DESC,
    address: '3632 Admiral St, El Paso, TX 79925, United States',
    phone: '(915) 233-7127',
    hours: { es: 'Lun - Vie 9am - 5pm', en: 'Mon - Fri 9am - 5pm' },
    mapLink: generateMapUrl('3632 Admiral St, El Paso, TX 79925, United States'),
    image: '/offices/El paso.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'harlingen',
    city: 'Harlingen',
    state: 'TX',
    title: { es: 'Harlingen', en: 'Harlingen' },
    description: ORIGINAL_DESC,
    address: '320 E Jackson Ave, Harlingen, TX 78550, United States',
    phone: '(956) 597-7090',
    hours: { es: 'Lun - Vie 9am - 6pm', en: 'Mon - Fri 9am - 6pm' },
    mapLink: generateMapUrl('320 E Jackson Ave, Harlingen, TX 78550, United States'),
    image: '/offices/Harlingen.png',
    services: [ 
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'los-angeles',
    city: 'Los Angeles',
    state: 'CA',
    title: { es: 'Los Angeles', en: 'Los Angeles' },
    description: ORIGINAL_DESC,
    address: '8337 Telegraph Rd Ste 115, Pico Rivera, CA 90660, United States',
    phone: '(213) 784-1554',
    hours: { es: 'Lun - Vie 9am - 6pm | Sáb 8am - 2pm', en: 'Mon - Fri 9am - 6pm | Sat 8am - 2pm' },
    mapLink: generateMapUrl('8337 Telegraph Rd Ste 115, Pico Rivera, CA 90660, United States'),
    image: '/offices/Los Angeles.png',
    services: [ 
        { es: 'Inmigración', en: 'Immigration' },
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
  {
    id: 'league-city',
    city: 'League City',
    state: 'TX',
    title: { es: 'League City', en: 'League City' },
    description: ORIGINAL_DESC,
    address: '2600 South Shore Blvd, League City, TX 77573, United States',
    phone: '(832) 598-3782',
    hours: { es: 'Abierto 24 horas', en: 'Open 24 hours' },
    mapLink: generateMapUrl('2600 South Shore Blvd, League City, TX 77573, United States'),
    image: '/offices/League.png',
    services: [
        { es: 'Inmigración', en: 'Immigration' }, 
        { es: 'Planificación Patrimonial', en: 'Estate Planning' },
        { es: 'Seguros', en: 'Insurance' },
        { es: 'Accidentes', en: 'Accidents' },
        { es: 'Ticket', en: 'Traffic Tickets' },
        { es: 'Detenidos', en: 'Detained' }
    ],
  },
].sort((a, b) => a.city.localeCompare(b.city)).map(office => ({
    ...office,
    id: office.id || office.city.toLowerCase().replace(/\s/g, '-')
}));

// --- MINI COMPONENTE: ACCIÓN HUD ---
const ActionHUD = ({ label, value, icon: Icon, href }: { label: string, value: string, icon: React.ElementType, href: string }) => {
    const isExternal = href.startsWith('http') || href.startsWith('tel');
    
    return (
      <a 
        href={href}
        target={isExternal && !href.startsWith('tel') ? "_blank" : undefined}
        rel={isExternal && !href.startsWith('tel') ? "noopener noreferrer" : undefined}
        className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#B2904D]/10 transition-all duration-300 group relative overflow-hidden"
        style={{ transitionProperty: 'background-color, transform' }}
      >
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-[10px] text-blue-300/60 font-bold uppercase tracking-widest mb-1 group-hover:text-[#B2904D] transition-colors">
              {label}
            </p>
            {['tel'].some(prefix => href.startsWith(prefix)) ? (
                <p className="text-white font-bold text-sm group-hover:text-white transition-colors">{value}</p>
            ) : (
                <p className="text-white font-medium text-sm group-hover:text-white transition-colors">{value}</p>
            )}
          </div>
          <Icon size={18} className="text-[#B2904D] group-hover:text-white transition-colors" />
        </div>
      </a>
    );
};

// --- COMPONENTE PRINCIPAL ---
export default function FuturisticOffices() {
  const { language } = useLanguage(); 
  const lang = language as 'es' | 'en';
  
  const [activeId, setActiveId] = useState(officesData[0].id);
  const activeOffice = officesData.find(o => o.id === activeId) || officesData[0];
  const [isOfficeOpen, setIsOfficeOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // --- LÓGICA DE STATUS ---
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleResize, 200);
    };
    window.addEventListener('resize', debouncedResize);

    const checkTime = () => {
        const now = new Date();
        const hour = now.getHours();
        // Abierto de 9 AM (9) a 7 PM (19)
        if (hour >= 9 && hour < 19) {
            setIsOfficeOpen(true);
        } else {
            setIsOfficeOpen(false);
        }
    };
    checkTime();
    const interval = setInterval(checkTime, 60000); // Revisar cada minuto
    return () => {
        clearInterval(interval);
        window.removeEventListener('resize', debouncedResize);
    };
  }, []);

  const gT = (obj: any) => obj[lang] || obj.es;

  return (
    <section 
      id="oficinas"
      className={`relative py-32 lg:py-40 w-full min-h-screen bg-[${PRIMARY_COLOR_DARK}] overflow-hidden ${font.className} selection:bg-[${ACCENT_COLOR_GOLD}] selection:text-[${PRIMARY_COLOR_DARK}]`}
    >
      {/* 1. FONDO ATMOSFÉRICO ACTIVO */}
      <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
        {/* Gradiente de profundidad */}
        <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/50 via-[${PRIMARY_COLOR_DARK}] to-[#000a20]`} />
        
        {/* Orbes flotantes */}
        <motion.div 
          animate={isDesktop ? { x: [0, 50, 0], y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] } : { opacity: 0.3 }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          className={`absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full ${isDesktop ? 'blur-[120px]' : 'blur-[60px]'} mix-blend-screen`}
        />
        <motion.div 
          animate={isDesktop ? { x: [0, -30, 0], y: [0, 30, 0], opacity: [0.2, 0.4, 0.2] } : { opacity: 0.2 }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          className={`absolute bottom-0 left-0 w-[600px] h-[600px] bg-[${ACCENT_COLOR_GOLD}]/5 rounded-full ${isDesktop ? 'blur-[150px]' : 'blur-[70px]'} mix-blend-screen`}
        />
        {/* Textura de ruido */}
        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
      </div>

      {/* --- MÁSCARAS ESTILO ESCALÓN --- */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#000a20] to-transparent z-10 opacity-80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#000a20] to-transparent z-10 opacity-80 pointer-events-none" />


      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* HEADER: TÍTULO */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-thin text-white tracking-tight leading-none">
            {language === 'es' ? 'Oficinas ubicadas' : 'Offices'} <span className={`font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-[${ACCENT_COLOR_GOLD}] to-white`}>{language === 'es' ? 'En Estados Unidos' : 'In United States'}</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 min-h-[700px]">
          
          {/* --- LATERAL: MENÚ HOLOGRÁFICO (COL 3) --- */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="text-xs font-bold text-blue-300/50 uppercase tracking-widest pl-2 mb-2 flex items-center gap-2">
              <Navigation size={12} /> {language === 'es' ? 'Acceso Rápido' : 'Quick Access'}
            </div>
            
            <div className="flex flex-col gap-2 relative">
               {/* Línea decorativa vertical */}
               <div className="absolute left-[18px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent hidden lg:block" />

               {officesData.map((office) => {
                 const isActive = activeId === office.id;
                 const stateCode = office.state;

                 return (
                   <motion.button
                     key={office.id}
                     onClick={() => setActiveId(office.id)}
                     className={`group relative pl-10 pr-6 py-4 rounded-r-xl rounded-l-sm text-left transition-all duration-500 overflow-hidden flex justify-between items-center
                       ${isActive ? 'bg-gradient-to-r from-white/10 to-transparent' : 'hover:bg-white/5'}
                     `}
                     whileHover={{ x: isActive ? 0 : 5 }}
                   >
                     {/* Marcador activo animado */}
                     {isActive && (
                       <motion.div 
                         layoutId="activeGlow"
                         className={`absolute left-0 top-0 bottom-0 w-1 bg-[${ACCENT_COLOR_GOLD}] shadow-[0_0_15px_rgba(178,144,77,0.5)] rounded-full`}
                       />
                     )}

                     {/* Dot inactivo */}
                     {!isActive && (
                        <div className="absolute left-[17px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white/50 transition-colors" />
                     )}
                     
                     <div className="relative z-10">
                       <span className={`block text-xl font-serif leading-none transition-colors ${isActive ? 'text-white font-medium' : 'text-blue-200/50 group-hover:text-blue-100'}`}>
                         {office.city}
                       </span>
                     </div>
                     
                     <span className={`text-[9px] tracking-widest uppercase font-bold px-2 py-0.5 rounded-full ${isActive ? `bg-[${ACCENT_COLOR_GOLD}] text-[${PRIMARY_COLOR_DARK}]` : 'bg-blue-900/40 text-blue-300/60'}`}>
                        {stateCode}
                     </span>
                   </motion.button>
                 );
               })}
            </div>
          </div>

          {/* --- CENTRAL: DATA VISUALIZER (3D CARD - COL 9) --- */}
          <div className="lg:col-span-9 perspective-[2000px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeOffice.id}
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className={`relative h-full bg-[#000a20]/90 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl flex flex-col will-change-transform`}
              >
                
                {/* 1. TOP SECTION (Media + Title) */}
                <div className="relative h-[300px] lg:h-[350px] w-full bg-black group overflow-hidden">
                   
                   {/* Imagen de fondo con efecto de foco */}
                   <Image 
                     src={activeOffice.image} 
                     alt={activeOffice.city} 
                     fill 
                     className="object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                     sizes="(max-width: 768px) 100vw, 70vw"
                     priority={false}
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] via-transparent to-transparent opacity-90" />
                   
                   {/* HUD TOP CORNER: STATUS */}
                   <div className="absolute top-6 right-6 z-20 p-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                        <p className={`text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 ${isOfficeOpen ? 'text-green-400' : 'text-red-400'}`}>
                            STATUS 
                            <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isOfficeOpen ? 'bg-green-500' : 'bg-red-500'}`} />
                        </p>
                        <motion.p 
                            className="text-white text-lg font-mono mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <motion.span 
                                animate={{ opacity: [0.5, 1, 0.5] }} 
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className={`text-[${LIGHT_BLUE_ACCENT}]`}
                            >
                                [ {activeOffice.state} ]
                            </motion.span>
                             {' '} {isOfficeOpen ? 'ACTIVE' : 'OFFLINE'}
                        </motion.p>
                   </div>
                   
                   {/* MAIN TITLE (SIN QUOTE) */}
                   <div className="absolute bottom-0 left-0 w-full p-8 lg:p-12 z-20">
                     <h3 className="text-4xl md:text-5xl font-serif font-medium text-white mb-2 leading-tight">
                       {gT(activeOffice.title)}
                     </h3>
                   </div>
                </div>

                {/* 2. INFO DASHBOARD (Main Content) */}
                <div className="p-8 lg:p-12 flex flex-col gap-10">
                   
                   {/* DESCRIPTION */}
                   <div className="w-full">
                       <h4 className="text-xl font-thin text-white mb-3">{language === 'es' ? 'Contexto de Operación' : 'Operation Context'}</h4>
                       <p className="text-blue-100/70 text-base leading-relaxed text-justify border-l-2 border-white/10 pl-4">
                         {gT(activeOffice.description)}
                       </p>
                   </div>

                   {/* SOLO SERVICIOS (Abogados removidos) */}
                   <div className="border-y border-white/10 py-8">
                      <div>
                          <h5 className="text-sm font-bold text-blue-300/50 uppercase tracking-widest mb-4 flex items-center gap-2">
                             <Scale size={14} className="text-[#B2904D]" />
                             {language === 'es' ? 'Servicios Disponibles' : 'Available Services'}
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {activeOffice.services.map((service, idx) => (
                              <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 hover:bg-[#B2904D]/10 hover:border-[#B2904D]/30 transition-all duration-300 rounded-full text-xs text-blue-100 font-medium tracking-wide">
                                {gT(service)}
                              </span>
                            ))}
                          </div>
                      </div>
                   </div>
                   
                   {/* CONTACT ACTIONS GRID (The HUD) */}
                   <div className="space-y-6">
                     <h4 className="text-xl font-thin text-white mb-4 flex items-center gap-3">
                         <motion.div 
                           animate={{ rotate: [0, 360] }}
                           transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                           className={`w-4 h-4 rounded-full border border-dashed border-[${ACCENT_COLOR_GOLD}]`}
                         />
                         <span className={`text-[${ACCENT_COLOR_GOLD}] font-medium`}>{language === 'es' ? 'Protocolo' : 'Protocol'}</span> {language === 'es' ? 'de Acceso' : 'Access'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                         <ActionHUD label={language === 'es' ? 'Ubicación' : 'Location Grid'} value={activeOffice.address} icon={MapPin} href={activeOffice.mapLink} />
                         <ActionHUD label={language === 'es' ? 'Línea Directa' : 'Direct Line'} value={activeOffice.phone} icon={Phone} href={`tel:${activeOffice.phone.replace(/[^0-9]/g, '')}`} />
                         <ActionHUD label={language === 'es' ? 'Horario Operativo' : 'Operating Hours'} value={gT(activeOffice.hours)} icon={Clock} href="#" />
                      </div>
                   </div>
                   
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}