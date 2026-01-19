'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, User, Quote, Sparkles, Scale } from 'lucide-react';
import Image from 'next/image';
import { Outfit } from 'next/font/google';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';

// --- IMPORTACIONES ---
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

// --- OPTIMIZACIÓN: LAZY LOAD DEL FORMULARIO ---
const ContactForm = dynamic(() => import('../../../components/ContactForm'), {
  loading: () => <div className="w-full h-[600px] bg-[#001540]/50 rounded-2xl animate-pulse border border-white/5" />
});

// --- CONFIGURACIÓN DE FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '700', '800', '900'] 
});

// --- DATOS ESPECÍFICOS: HARLINGEN ---
const officeData = {
  id: 'harlingen',
  city: 'Harlingen',
  state: 'TX',
  title: { es: 'Harlingen, TX Oficina', en: 'Harlingen, TX Office' },
  quote: { es: 'Bendecidos con la fuerza y la gracia de Dios, e inspirados por nuestro deseo de ayudar.', en: 'Blessed with the strength and grace of God, and inspired by our desire to help.' },
  description: { 
    es: 'Abogado de Inmigración Manuel Solís, con más de 35 años de experiencia y 50,000 casos ganados, le guía en su trámite de visa humanitaria: visa U, visa VAWA, visa T, visa juvenil, permiso de trabajo en USA y residencia permanente en USA. Contamos con representación legal en todo Estados Unidos y también ofrecemos asesoría en áreas legales como derecho familiar, accidentes, negligencia médica, derecho civil y criminal. Nuestro equipo de más de 200 profesionales analiza cada situación de manera detallada, elaborando estrategias legales personalizadas que buscan proteger sus derechos. Ofrecemos servicios legales en español e inglés, brindando atención cercana, asesoría confiable y compromiso total con cada cliente migratorio o legal.', 
    en: 'Immigration Attorney Manuel Solís, with more than 35 years of experience and 50,000 cases won, guides you through your humanitarian visa process: U visa, VAWA visa, T visa, juvenile visa, work permits in the USA, and permanent residence in the USA. We provide legal representation throughout the United States and also offer legal guidance in areas such as family law, personal injury, medical malpractice, civil law, and criminal law. Our team of more than 200 professionals carefully analyzes each situation, developing personalized legal strategies designed to protect your rights. We offer legal services in Spanish and English, providing personalized attention, trusted guidance, and full commitment to every immigration or legal client.' 
  },
  address: '320 E Jackson St, Harlingen, Texas 78550, United States',
  phone: '(956) 597-7090',
  email: 'harlingen@manuelsolis.com',
  hours: { es: 'Lun - Vie 9:00 AM - 7:00 PM | Sáb (Solo con cita)', en: 'Mon - Fri 9:00 AM - 7:00 PM | Sat (Appointment Only)' },
  mapLink: 'https://share.google/usYVNMsAK6c9gaUWs',
  image: '/offices/Harlingen.png',
  
  // --- GERENCIA (ELIMINADO) ---
  managers: [],
  
  // --- ABOGADOS ---
  attorneys: [
    { 
      name: 'Diana Maria Goicoblechman', 
      role: { es: 'Abogada', en: 'Attorney' }, 
      image: '/LogoInformacion.png', // Placeholder por solicitud
      quote: { es: "Compromiso y excelencia legal.", en: "Commitment and legal excellence." }
    }
  ],

  // --- SERVICIOS ---
  services: [
    { es: 'Inmigración', en: 'Immigration' },
    { es: 'Accidentes', en: 'Accidents' },
    { es: 'Seguros', en: 'Insurance' },
    { es: 'Detenidos', en: 'Detained' }
  ]
};

// --- TEXTOS DE INTERFAZ ---
const uiText = {
  address: { es: 'Dirección', en: 'Address' },
  phone: { es: 'Teléfono', en: 'Phone' },
  hours: { es: 'Horario', en: 'Hours' },
  viewMap: { es: 'Ver en mapa', en: 'View on map' },
  team: { es: 'Nuestro Equipo Legal', en: 'Our Legal Team' },
  managers: { es: 'Gerencia', en: 'Management' },
  services: { es: 'Servicios Disponibles', en: 'Available Services' }
};

export default function OfficeClient() {
  const params = useParams();
  const lang = (params?.lang as 'es' | 'en') || 'es';
  const t = (obj: any) => obj[lang] || obj.es;
  
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Header />
      
      <main className={`relative w-full min-h-screen bg-[#001540] overflow-hidden ${font.className}`}>
        
        {/* --- BACKGROUND FX --- */}
        <div className="fixed inset-0 z-0 pointer-events-none transform-gpu">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
          
          {!isMobile && (
            <>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{ willChange: "transform, opacity" }}
                className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full blur-[100px]" 
              />
              <motion.div 
                animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                style={{ willChange: "transform, opacity" }}
                className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/20 rounded-full blur-[120px]" 
              />
            </>
          )}
          
          <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
        </div>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <div className="relative z-10 pt-[160px] pb-20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

            {/* --- HERO SECTION --- */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
              
              {/* Texto Hero */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 mb-6">
                  <Sparkles className="text-[#B2904D]" size={14} />
                  <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">Harlingen, Texas</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-thin text-white mb-6 leading-tight">
                  {t(officeData.title)}
                </h1>

                <div className="w-24 h-1 bg-gradient-to-r from-[#B2904D] to-transparent mb-8" />

                <p className="text-[#B2904D] font-light italic text-lg md:text-xl border-l-2 border-[#B2904D] pl-6 mb-8">
                  "{t(officeData.quote)}"
                </p>

                <p className="text-white/70 text-base md:text-lg leading-relaxed font-light max-w-xl">
                  {t(officeData.description)}
                </p>
              </motion.div>

              {/* IMAGEN DE OFICINA */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(56,189,248,0.15)] group bg-black"
              >
                <Image 
                  src={officeData.image} 
                  alt={t(officeData.title)} 
                  fill 
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-40" />
              </motion.div>
            </div>

            {/* --- INFO GRID --- */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-24">
              
              {/* Detalles de Contacto */}
              <div className="lg:col-span-5 space-y-8">
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10"
                 >
                   <h3 className="text-2xl font-light text-white mb-8 flex items-center gap-3">
                     <MapPin className="text-[#B2904D]" /> {t(uiText.address)}
                   </h3>
                   
                   <div className="space-y-6">
                      <div className="group">
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(uiText.address)}</p>
                        <p className="text-white text-lg leading-snug">{officeData.address}</p>
                        <a href={officeData.mapLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#B2904D] mt-3 text-sm font-bold hover:text-[#fff] transition-colors">
                          {t(uiText.viewMap)} →
                        </a>
                      </div>
                      <div className="h-px bg-white/10" />

                      <div>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(uiText.phone)}</p>
                        <a href={`tel:${officeData.phone.replace(/\D/g,'')}`} className="text-2xl text-white font-thin hover:text-[#B2904D] transition-colors">
                          {officeData.phone}
                        </a>
                      </div>
                      <div className="h-px bg-white/10" />

                      <div>
                        <p className="text-xs text-white/40 font-bold uppercase tracking-wider mb-2">{t(uiText.hours)}</p>
                        <div className="flex items-start gap-3">
                          <Clock className="text-[#B2904D] mt-1 shrink-0" size={18} />
                          <p className="text-white text-base">{t(officeData.hours)}</p>
                        </div>
                      </div>
                   </div>
                 </motion.div>
              </div>

              {/* Grid de Equipo */}
              <div className="lg:col-span-7 space-y-16">
                
                {/* --- SECCIÓN ABOGADOS --- */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-4 mb-10">
                    <div className="w-1 h-10 bg-[#B2904D] rounded-full" />
                    <h3 className="text-3xl font-thin text-white">{t(uiText.team)}</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {officeData.attorneys.map((person, idx) => (
                      <div key={idx} className="group relative bg-white/5 rounded-xl border border-white/5 hover:border-[#B2904D]/50 transition-all duration-300 hover:bg-white/10 overflow-hidden">
                        
                        <div className="relative w-full aspect-square overflow-hidden">
                          <Image 
                            src={person.image} 
                            alt={person.name} 
                            fill 
                            sizes="(max-width: 768px) 100px, 150px"
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-110" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                          
                          {/* Quote en Hover */}
                          <div className="absolute inset-0 p-4 flex flex-col justify-end items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#001540]/60 backdrop-blur-sm">
                             <Quote size={20} className="text-[#B2904D] mb-2 fill-[#B2904D]" />
                             <p className="text-xs text-white/90 italic leading-snug">
                               "{t(person.quote)}"
                             </p>
                          </div>
                        </div>

                        <div className="p-4 text-center relative z-10">
                          <h5 className="font-bold text-white text-sm md:text-base leading-tight mb-1 group-hover:text-[#B2904D] transition-colors">
                            {person.name}
                          </h5>
                          <span className="text-[10px] font-medium uppercase tracking-wider text-white/40 block">
                            {t(person.role)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* --- SECCIÓN SERVICIOS --- */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-1 h-8 bg-blue-400 rounded-full" />
                    <h3 className="text-2xl font-thin text-white">{t(uiText.services)}</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {officeData.services.map((service, idx) => (
                      <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-blue-100/90 hover:bg-[#B2904D]/20 transition-colors cursor-default flex items-center gap-2">
                        <Scale size={14} className="text-[#B2904D]" />
                        {t(service)}
                      </span>
                    ))}
                  </div>
                </motion.div>

              </div>
            </div>

            {/* --- FORMULARIO DE CONTACTO --- */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "100px" }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="bg-[#001540]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                <div className="h-1.5 w-full bg-gradient-to-r from-[#B2904D] via-[#D4AF37] to-[#B2904D]" />
                
                <div className="p-6 md:p-12">
                   <ContactForm />
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}