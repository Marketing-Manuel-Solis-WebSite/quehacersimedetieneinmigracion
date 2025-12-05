'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Clock, Star, CheckCircle2, Play, X } from 'lucide-react';
import Image from 'next/image';

// IMPORTACIONES DE COMPONENTES GLOBALES
import Header from '../../../components/Header'; 
import Footer from '../../../components/Footer';
import ContactForm from '../../../components/ContactForm'; 

// --- TIPOS DE DATOS ---
type TeamMember = {
  name: string;
  image: string;
  role: { es: string; en: string };
};

type OfficeData = {
  id: string;
  city: string;
  state: string;
  title: { es: string; en: string };
  quote: { es: string; en: string };
  description: { es: string; en: string };
  address: string;
  phone: string;
  email: string;
  hours: { es: string; en: string };
  mapLink: string;
  videoUrl?: string;
  services: { es: string; en: string }[];
  managers: TeamMember[];
  attorneys: TeamMember[];
};

// --- TEXTOS DE LA INTERFAZ FIJA ---
const interfaceTexts = {
  header: {
    title: { es: 'Nuestra Sede de Dallas', en: 'Our Dallas Location' },
    subtitle: { 
      es: 'Información detallada, servicios y el equipo legal a su disposición en Dallas, TX.', 
      en: 'Detailed information, services, and the legal team at your disposal in Dallas, TX.' 
    },
  },
  contact: {
    address: { es: 'Dirección', en: 'Address' },
    phone: { es: 'Teléfono', en: 'Phone' },
    hours: { es: 'Horario', en: 'Hours' },
    viewOnMap: { es: 'Ver en mapa', en: 'View on map' },
    servicesTitle: { es: 'Servicios en esta sede', en: 'Services at this Location' },
    attorneysTitle: { es: 'Nuestros Abogados', en: 'Our Attorneys' },
    managersTitle: { es: 'Nuestra Gerencia', en: 'Our Management Team' },
    videoError: { es: 'Tu navegador no soporta el video.', en: 'Your browser does not support the video.' }
  },
  form: {
    request: { es: 'SOLICITE SU CONSULTA', en: 'REQUEST YOUR CONSULTATION' },
    callback: { es: 'Llene este formulario y le llamaremos en unos 10 minutos en horas de trabajo.', en: 'Fill out this form, and we will call you back in about 10 minutes during business hours.' }
  }
};

// --- DATA ESPECÍFICA DE DALLAS ---
const dallasData: OfficeData = {
  id: 'dallas',
  city: 'Dallas',
  state: 'TX',
  title: { es: 'Dallas, TX Oficina', en: 'Dallas, TX Office' },
  quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
  description: { es: 'Dallas es una de las grandes ciudades de Texas en las que se concentra una buena cantidad de personas que han venido a este país a vivir y contribuir a su sociedad. Por eso, la firma del abogado Manuel Solís quiso abrir una oficina para ponernos al servicio de nuestros clientes. Nuestras oficinas de Dallas están abiertas de lunes a sábado en horario de 9 de la mañana a 9 de la noche, de manera ininterrumpida.', en: 'Dallas is one of the great cities in Texas where a large number of people who have come to this country to live and contribute to its society are concentrated. That is why the Law Firm of Manuel Solís wanted to open an office to serve our clients. Our Dallas offices are open Monday through Saturday from 9 AM to 9 PM, uninterrupted.' },
  address: '1120 Empire Central Place, Dallas, Texas 75247',
  phone: '(214) 753-8315',
  email: 'dallas@manuelsolis.com',
  hours: { es: 'Lun - Vie 9:00 AM - 6:00 PM | Sáb 8:00 AM - 3:00 PM', en: 'Mon - Fri 9:00 AM - 6:00 PM | Sat 8:00 AM - 3:00 PM' },
  mapLink: 'https://goo.gl/maps/ze5VqZn4dLzCKKZp6',
  videoUrl: 'https://manuelsolis.com/wp-content/uploads/2023/12/dallas.mov',
  services: [
    { es: 'LEY DE INMIGRACIÓN', en: 'IMMIGRATION LAW' }, 
    { es: 'SEGUROS (ASEGURANZA)', en: 'INSURANCE' }, 
    { es: 'ACCIDENTES', en: 'ACCIDENTS' }
  ],
  managers: [
    { name: 'Maribel Degollado', role: { es: 'Gerente', en: 'Manager' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-managers-houston-gray-12-233x300.png' }
  ],
  attorneys: [
    { name: 'Manuel Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/37490671-CAC5-4039-8A96-2680CC45304D.png' },
    { name: 'Manuel E. Solís III', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-10.png' },
    { name: 'Juan Solís', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-9.png' },
    { name: 'Mark McBroom', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-12.png' },
    { name: 'Gregory Finney', role: { es: 'Abogado', en: 'Attorney' }, image: 'https://manuelsolis.com/wp-content/uploads/2024/03/Backgound-lawyers-gray-15-1.png' },
  ]
};

// --- FUNCIÓN DE AYUDA PARA OBTENER EL TEXTO TRADUCIDO ---
const lang: 'es' | 'en' = 'es';

const getText = (obj: string | { es: string; en: string }, currentLang: 'es' | 'en'): string => {
  if (typeof obj === 'string') return obj;
  return obj[currentLang] || obj.es; 
};

const t = (key: string): string => {
  const parts = key.split('.');
  let current: any = interfaceTexts;
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

// --- COMPONENTE DE PÁGINA ESPECÍFICO DE DALLAS ---
export default function DallasOfficePage() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  const activeOffice = dallasData;

  useEffect(() => {
    if (activeOffice.videoUrl) {
        setIsVideoLoaded(true); 
    }
  }, [activeOffice.videoUrl]);

  return (
    <div className="min-h-screen flex flex-col">
        
        {/* 1. HEADER */}
        <Header />
        
        {/* 2. MAIN CONTENT */}
        <main className="flex-grow">
            {/* Espaciado superior ajustado para evitar solapamiento con el Header */}
            <section className="w-full bg-white pt-24 md:pt-32 pb-20 overflow-x-hidden" id='dallas-office'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* --- Section Header --- */}
                    <div className="text-center mb-8 pt-8 md:pt-12">
                        <motion.h2 
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-serif font-bold text-[#002342] mb-3"
                        >
                            {t('header.title')}
                        </motion.h2>
                        <div className="w-24 h-1 bg-[#B2904D] mx-auto rounded-full mb-6"></div>
                        <p className="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
                            {t('header.subtitle')}
                        </p>
                    </div>

                    {/* --- Main Content --- */}
                    <div className="lg:col-span-12"> 
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="bg-white rounded-2xl md:rounded-3xl shadow-lg md:shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-full"
                        >
                            
                            {/* A. Hero Area (Video/Image) */}
                            <div className="relative h-[250px] md:h-[450px] w-full bg-[#002342] overflow-hidden group">
                                
                                {/* Video Background */}
                                {activeOffice.videoUrl ? (
                                    <video 
                                        autoPlay muted loop playsInline
                                        onLoadedData={() => setIsVideoLoaded(true)}
                                        className={`absolute inset-0 w-full h-full object-cover scale-110 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-70' : 'opacity-0'}`} 
                                    >
                                        <source src={activeOffice.videoUrl} type="video/mp4" />
                                        <source src={activeOffice.videoUrl.replace('.mp4', '.mov')} type="video/quicktime" />
                                    </video>
                                ) : (
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                                )}

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#002342] via-transparent to-transparent opacity-90 md:opacity-80" />
                                
                                {/* Play Button */}
                                {activeOffice.videoUrl && (
                                    <div className="absolute top-3 right-3 md:top-6 md:right-6 z-30">
                                        <button 
                                            onClick={() => setIsVideoOpen(true)}
                                            className="flex items-center justify-center bg-white/20 backdrop-blur-md border border-white/30 h-10 w-10 md:h-12 md:w-12 rounded-full hover:bg-[#B2904D] transition-colors"
                                        >
                                            <Play size={20} fill="white" className="text-white" />
                                        </button>
                                    </div>
                                )}

                                {/* Bottom Hero Text */}
                                <div className="absolute bottom-0 left-0 w-full p-5 md:p-12 text-white z-10">
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }} 
                                        animate={{ opacity: 1, y: 0 }} 
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <span className="bg-[#B2904D] text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-md">
                                                <MapPin size={10} /> {activeOffice.city}, {activeOffice.state}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl md:text-5xl font-serif font-bold mb-1 md:mb-3 leading-tight text-white">
                                            {gT(activeOffice.title)}
                                        </h3>
                                        <p className="text-[#B2904D] font-medium italic text-sm md:text-xl max-w-3xl line-clamp-2 md:line-clamp-none">
                                            "{gT(activeOffice.quote)}"
                                        </p>
                                    </motion.div>
                                </div>
                            </div>

                            {/* B. Content Body */}
                            <div className="p-5 md:p-12 space-y-8 md:space-y-12">
                                
                                {/* 1. Description and Services */}
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 md:gap-12">
                                    <div>
                                        <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 text-justify">
                                            {gT(activeOffice.description)}
                                        </p>
                                        
                                        {/* Contact Grid */}
                                        <div className="space-y-3 md:space-y-4 bg-gray-50 p-4 rounded-xl md:bg-transparent md:p-0">
                                            <div className="flex items-start gap-3 md:gap-4">
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white md:bg-gray-50 border border-gray-100 md:border-0 flex items-center justify-center text-[#002342] shrink-0"><MapPin size={16}/></div>
                                                <div>
                                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase">{t('contact.address')}</p>
                                                    <p className="text-[#002342] font-medium text-sm md:text-base">{activeOffice.address}</p>
                                                    <a href={activeOffice.mapLink} target="_blank" className="text-[#B2904D] text-xs font-bold hover:underline mt-1 inline-block">{t('contact.viewOnMap')}</a>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white md:bg-gray-50 border border-gray-100 md:border-0 flex items-center justify-center text-[#002342] shrink-0"><Phone size={16}/></div>
                                                <div>
                                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase">{t('contact.phone')}</p>
                                                    <a href={`tel:${activeOffice.phone}`} className="text-[#002342] font-bold hover:text-[#B2904D] text-sm md:text-base">{activeOffice.phone}</a>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 md:gap-4">
                                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white md:bg-gray-50 border border-gray-100 md:border-0 flex items-center justify-center text-[#002342] shrink-0"><Clock size={16}/></div>
                                                <div>
                                                    <p className="text-[10px] md:text-xs text-gray-400 font-bold uppercase">{t('contact.hours')}</p>
                                                    <p className="text-[#002342] font-medium text-sm md:text-base">{gT(activeOffice.hours)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Services List */}
                                    <div className="bg-gray-50 rounded-xl p-5 md:p-8 border border-gray-100">
                                        <h4 className="text-lg md:text-xl font-serif font-bold text-[#002342] mb-4 md:mb-6 flex items-center gap-2">
                                            <Star className="text-[#B2904D]" size={18} fill="#B2904D" /> {t('contact.servicesTitle')}
                                        </h4>
                                        <ul className="space-y-2 md:space-y-4">
                                            {activeOffice.services.map((service, idx) => (
                                                <li key={idx} className="flex items-center gap-2 md:gap-3">
                                                    <CheckCircle2 className="text-[#B2904D] shrink-0" size={16} />
                                                    <span className="text-[#002342] font-bold text-xs md:text-sm tracking-wide">{gT(service)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-gray-100" />

                                {/* 2. Team */}
                                <div>
                                    {/* Attorneys */}
                                    {activeOffice.attorneys.length > 0 && (
                                        <div className="mb-8 md:mb-12">
                                            <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                                                <div className="w-1 h-6 md:h-8 bg-[#B2904D] rounded-full"></div>
                                                <h4 className="text-xl md:text-2xl font-serif font-bold text-[#002342]">{t('contact.attorneysTitle')}</h4>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                                {activeOffice.attorneys.map((person, idx) => (
                                                    <div key={idx} className="group block text-center cursor-default">
                                                        <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 md:mb-4">
                                                            <div className="absolute inset-0 rounded-full border-2 border-[#B2904D] opacity-0 scale-110 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>
                                                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-100 bg-gray-100 shadow-sm group-hover:shadow-md transition-all">
                                                                <Image src={person.image} alt={person.name} width={96} height={96} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                            </div>
                                                        </div>
                                                        <div className="text-center px-1">
                                                            <h5 className="font-bold text-[#002342] text-xs md:text-sm leading-tight group-hover:text-[#B2904D] transition-colors">{person.name}</h5>
                                                            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1 block">{gT(person.role)}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Managers */}
                                    {activeOffice.managers.length > 0 && (
                                        <div>
                                            <div className="flex items-center gap-2 md:gap-3 mb-6 md:mb-8">
                                                <div className="w-1 h-6 md:h-8 bg-gray-300 rounded-full"></div>
                                                <h4 className="text-xl md:text-2xl font-serif font-bold text-[#002342]">{t('contact.managersTitle')}</h4>
                                            </div>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                                {activeOffice.managers.map((person, idx) => (
                                                    <div key={idx} className="group block text-center cursor-default">
                                                        <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto mb-3 md:mb-4 rounded-full overflow-hidden border-2 border-gray-100 bg-gray-100">
                                                            <Image src={person.image} alt={person.name} width={80} height={80} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
                                                        </div>
                                                        <h5 className="font-bold text-[#002342] text-xs md:text-sm leading-tight">{person.name}</h5>
                                                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1 block">{gT(person.role)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                
                                {/* 3. FORM */}
                                <div className="mt-4 pt-4 md:mt-6 md:pt-6 border-t border-gray-100">
                                    <div className="text-center mb-6">
                                        <h4 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                            {t('form.request').split(' ').map((word, index) => (
                                                <React.Fragment key={index}>
                                                    {word === 'CONSULTA' ? 
                                                        <span className="text-[#B2904D]">{word}</span> : word}
                                                    {' '}
                                                </React.Fragment>
                                            ))}
                                        </h4>
                                        <p className="text-sm text-gray-600 max-w-xl mx-auto">
                                            {t('form.callback')}
                                        </p>
                                    </div>
                                    <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-xl relative">
                                        <div className="h-2 w-full bg-gradient-to-r from-[#002342] to-[#B2904D]"></div>
                                        <div className="contact-form-container p-4 md:p-8">
                                            {/* ContactForm utilizado */}
                                            <ContactForm />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* VIDEO LIGHTBOX MODAL */}
                <AnimatePresence>
                    {isVideoOpen && activeOffice.videoUrl && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-4"
                        >
                            <button 
                                onClick={() => setIsVideoOpen(false)}
                                className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20"
                            >
                                <X size={32} />
                            </button>
                            
                            <div className="w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative ring-1 ring-white/20">
                                <video 
                                    controls 
                                    autoPlay 
                                    className="w-full h-full"
                                >
                                    <source src={activeOffice.videoUrl} type="video/mp4" />
                                    <source src={activeOffice.videoUrl.replace('.mp4', '.mov')} type="video/quicktime" />
                                    {t('contact.videoError')}
                                </video>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </main>

        {/* 3. FOOTER */}
        <Footer />
    </div>
  );
}