'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Play, Star, 
  ArrowRight, MessageSquare
} from 'lucide-react';
import Image from 'next/image';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 
import ContactForm from '../../components/ContactForm';
import { useLanguage } from '../../context/LanguageContext';
import { Outfit } from 'next/font/google';

// --- FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '800', '900'] 
});

// --- DATA CON LOS 6 VIDEOS DE YOUTUBE ---
const testimonials = [
  {
    id: 'video-01',
    name: 'Luis Gutierrez',
    category: { es: 'Testimonio', en: 'Testimonial' },
    image: '/testimonials/YV01.png',
    video: 'https://www.youtube.com/embed/dtKRXVMxcHU',
    youtubeId: 'dtKRXVMxcHU',
    quote: {
      es: "Puedes conseguir una vida mejor, un trabajo mejor y saber que puedes regresar a ver a tu familia",
      en: "You can get a better life, a better job, and know that you can return to see your family"
    },
    story: {
      es: "Descubre cómo ayudamos a nuestros clientes a alcanzar sus objetivos legales.",
      en: "Discover how we help our clients achieve their legal goals."
    }
  },
  {
    id: 'video-02',
    name: 'José Aguilar y Laura Lechuga',
    category: { es: 'Testimonio', en: 'Testimonial' },
    image: '/testimonials/YV02.png',
    video: 'https://www.youtube.com/embed/y5BwL3Owhzg',
    youtubeId: 'y5BwL3Owhzg',
    quote: {
      es: "Estuvieron al pendiente e hicieron todo con tiempo para agilizar el proceso",
      en: "They stayed on top of everything and did everything in a timely manner to speed up the process"
    },
    story: {
      es: "Conoce más sobre los resultados exitosos que hemos logrado.",
      en: "Learn more about the successful results we have achieved."
    }
  },
  {
    id: 'video-03',
    name: 'Alejandra Espinoza',
    category: { es: 'Testimonio', en: 'Testimonial' },
    image: '/testimonials/YV03.png',
    video: 'https://www.youtube.com/embed/wZ7uJ0mHZjk',
    youtubeId: 'wZ7uJ0mHZjk',
    quote: {
      es: "Se siente uno en confianza para preguntar cualquier cosa",
      en: "You feel comfortable and confident asking anything"
    },
    story: {
      es: "Testimonios que reflejan nuestro trabajo y pasión por ayudar.",
      en: "Testimonials that reflect our work and passion to help."
    }
  },
  {
    id: 'video-04',
    name: 'Yesenia Zavala',
    category: { es: 'Testimonio', en: 'Testimonial' },
    image: '/testimonials/YV04.png',
    video: 'https://www.youtube.com/embed/QXOZHRpSjSA',
    youtubeId: 'QXOZHRpSjSA',
    quote: {
      es: "Resultados que hablan por sí mismos.",
      en: "Results that speak for themselves."
    },
    story: {
      es: "En menos de un mes estuve de regreso con mi familia después de 2 años",
      en: "In less than a month, I was back with my family after two years"
    }
  },
  {
    id: 'video-05',
    name: 'Ivonne Hernández',
    category: { es: 'Testimonio', en: 'Testimonial' },
    image: '/testimonials/YV05.png',
    video: 'https://www.youtube.com/embed/kT9ZXCFW5KM',
    youtubeId: 'kT9ZXCFW5KM',
    quote: {
      es: "Confianza y profesionalismo garantizado.",
      en: "Trust and professionalism guaranteed."
    },
    story: {
      es: "Hace 4 años pedimos la solicitud de residencia por petición de mi hija",
      en: "Four years ago, we applied for permanent residence through a petition filed by my daughter"
    }
  },
  {
    id: 'video-06',
    name: 'Octavio Varela',
    category: { es: 'Testimonio', en: 'Testimonial' },
    image: '/testimonials/YV06.png',
    video: 'https://www.youtube.com/embed/cTJ9M5PT-S4',
    youtubeId: 'cTJ9M5PT-S4',
    quote: {
      es: "Venía con inseguridades, pero ya estando aquí te das cuenta que el proceso te va guiando",
      en: "I came in feeling uncertain, but once you’re here, you realize that the process guides you step by step"
    },
    story: {
      es: "Testimonios reales de personas que confiaron en nosotros.",
      en: "Real testimonials from people who trusted us."
    }
  }
];

export default function TestimonialsPage() {
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedTestimonial = testimonials.find(t => t.id === selectedId);

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedId]);

  const getText = (obj: any) => {
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.es || obj;
  };

  const texts = {
    hero: {
      badge: { es: 'Casos Reales', en: 'Real Cases' },
      title1: { es: 'Historias de', en: 'Success' },
      title2: { es: 'Éxito', en: 'Stories' },
      subtitle: {
        es: 'Resultados que cambian vidas. Personas reales que confiaron su futuro en nosotros.',
        en: 'Results that change lives. Real people who trusted their future to us.'
      }
    },
    card: {
      viewFullStory: { es: 'Ver Historia Completa', en: 'View Full Story' }
    },
    modal: {
      badge: { es: 'Testimonio', en: 'Testimonial' },
      button: { es: 'Solicitar Consulta', en: 'Request Consultation' }
    }
  };

  return (
    <div className={`relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden ${font.className}`}>
      
      <Header />

      {/* =========================================================================
          1. FONDO ATMOSFÉRICO FIJO - OPTIMIZADO
      ========================================================================= */}
      <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
         
         <motion.div
            initial={{ x: "60%" }} 
            animate={{ x: "-160%" }} 
            transition={{ 
              duration: 80, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
            style={{ willChange: "transform" }}
            className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center opacity-[0.04] select-none pointer-events-none"
         >
            <span className={`text-[160vh] leading-none font-extrabold italic text-white tracking-tighter mix-blend-overlay transform -skew-x-12 ${font.className}`}>
                 N/\И/\
            </span>
         </motion.div>

         {/* Orbes optimizados: Blur reducido y will-change */}
         <motion.div 
           animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
           style={{ willChange: "transform, opacity" }}
           className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/10 rounded-full blur-[80px]" 
         />
         <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ willChange: "transform, opacity" }}
            className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/10 rounded-full blur-[90px]" 
         />
         
         <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
      </div>


      {/* =========================================================================
          2. HERO SECTION
      ========================================================================= */}
      <section className="relative pt-44 pb-20 px-4 z-10 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl mx-auto"
        >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg mb-8">
               <Star size={14} className="text-[#B2904D] fill-[#B2904D]" />
               <span className="text-xs font-bold tracking-[0.2em] text-white/80 uppercase">{texts.hero.badge[language]}</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin text-white tracking-tight mb-8 drop-shadow-xl">
              {texts.hero.title1[language]} <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#F3E5AB]">{texts.hero.title2[language]}</span>
            </h1>
            
            <p className="text-blue-100/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-8">
              {texts.hero.subtitle[language]}
            </p>
        </motion.div>
      </section>

      {/* =========================================================================
          3. GRID DE TESTIMONIOS CON BOTÓN DE PLAY ELEGANTE
      ========================================================================= */}
      <section className="px-4 pb-32 relative z-10 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          
          {testimonials.map((item, index) => (
            <motion.div
              layoutId={`card-${item.id}`}
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedId(item.id)}
              className="group cursor-pointer h-[550px]"
            >
              <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#000a20]/60 backdrop-blur-md border border-[#B2904D]/30 shadow-[0_0_20px_-5px_rgba(178,144,77,0.2)] hover:shadow-[0_0_40px_-5px_rgba(178,144,77,0.4)] hover:border-[#B2904D]/60 transition-all duration-500 flex flex-col transform-gpu">
                
                {/* Fondo animado interno de la tarjeta - Optimizado */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[32px]">
                    <motion.div 
                        animate={{ x: [0, 80, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        style={{ willChange: "transform" }}
                        className="absolute -top-20 -left-20 w-64 h-64 bg-[#B2904D]/10 rounded-full blur-[60px]" // Opacidad y blur reducidos
                    />
                     <motion.div 
                        animate={{ x: [0, -80, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
                        style={{ willChange: "transform" }}
                        className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[60px]" // Opacidad y blur reducidos
                    />
                </div>

                {/* Imagen de Portada */}
                <div className="relative h-[320px] w-full overflow-hidden z-10 rounded-t-[32px]">
                   <Image 
                     src={item.image} 
                     alt={item.name} 
                     fill 
                     className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#000a20] via-transparent to-transparent opacity-80" />
                   
                   {/* Badge de categoría */}
                   <div className="absolute top-6 left-6">
                      <div className="bg-[#001540]/80 backdrop-blur-md border border-[#B2904D]/30 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                          {getText(item.category)}
                      </div>
                   </div>
                   
                   {/* BOTÓN DE PLAY MEJORADO CON GLASSMORPHISM */}
                   <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-500">
                      <motion.div 
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.1 }}
                        className="relative"
                      >
                        {/* Anillo exterior con efecto glow - Optimizado */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#B2904D] to-[#D4AF37] blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                        
                        {/* Botón principal con glassmorphism */}
                        <div className="relative w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 opacity-80 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-lg">
                          {/* Gradiente interno sutil */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
                          
                          {/* Icono de Play */}
                          <Play fill="white" size={28} className="ml-1 relative z-10 drop-shadow-md" />
                          
                          {/* Brillo superior */}
                          <div className="absolute top-2 left-2 right-2 h-6 bg-white/10 rounded-full blur-sm" />
                        </div>
                      </motion.div>
                   </div>
                </div>

                {/* Info Card */}
                <div className="p-10 flex flex-col justify-between flex-grow relative z-10">
                   <div>
                     <h3 className="text-3xl font-thin text-white mb-3 group-hover:text-[#B2904D] transition-colors">
                       {item.name}
                     </h3>
                     <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="text-[#B2904D] fill-[#B2904D]" />
                        ))}
                     </div>
                     <p className="text-blue-100/80 text-base font-light italic line-clamp-2 leading-relaxed">
                       "{getText(item.quote)}"
                     </p>
                   </div>
                   
                   <div className="pt-6 flex items-center text-white/90 text-sm font-bold uppercase tracking-wider group/btn">
                      {texts.card.viewFullStory[language]}
                      <ArrowRight size={16} className="ml-2 text-[#B2904D] group-hover/btn:translate-x-2 transition-transform" />
                   </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          4. MODAL CON YOUTUBE EMBED
      ========================================================================= */}
      <AnimatePresence>
        {selectedId && selectedTestimonial && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              // Optimización: Menos blur y más opacidad
              className="absolute inset-0 bg-[#000a20]/95 backdrop-blur-md"
            />
            <motion.div 
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-7xl h-[85vh] bg-[#001540] rounded-[32px] border border-[#B2904D]/30 shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-6 right-6 z-50 bg-black/40 hover:bg-[#B2904D] text-white p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10"
              >
                <X size={24} />
              </button>
              
              {/* Video de YouTube Embed */}
              <div className="w-full lg:w-2/3 h-full bg-black relative flex items-center justify-center">
                 <iframe 
                   src={`${selectedTestimonial.video}?autoplay=1`}
                   className="w-full h-full"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowFullScreen
                 />
              </div>
              
              {/* Panel lateral con información */}
              <div className="w-full lg:w-1/3 h-full bg-[#001540] p-12 flex flex-col relative overflow-y-auto border-l border-white/5 scrollbar-custom">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                      <span className="inline-block text-sm font-bold text-[#B2904D] uppercase tracking-widest mb-4">{texts.modal.badge[language]}</span>
                      <h2 className="text-4xl md:text-5xl font-thin text-white mb-8 leading-tight">
                        {selectedTestimonial.name}
                      </h2>
                      <div className="relative pl-6 border-l-4 border-[#B2904D] mb-10 bg-white/5 p-6 rounded-r-2xl">
                          <p className="text-xl italic text-blue-50 font-light leading-relaxed">
                            "{getText(selectedTestimonial.quote)}"
                          </p>
                      </div>
                      <div className="mb-12">
                        <p className="text-blue-100/80 text-lg leading-relaxed font-light">
                           {getText(selectedTestimonial.story)}
                        </p>
                      </div>
                      <div className="mt-auto">
                         <a href="#contacto" onClick={() => setSelectedId(null)} className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl bg-[#B2904D] text-[#001540] font-bold text-lg shadow-lg hover:bg-white hover:text-[#001540] transition-colors duration-300">
                            <MessageSquare size={20} />
                            {texts.modal.button[language]}
                         </a>
                      </div>
                  </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          5. FORMULARIO DE CONTACTO
      ========================================================================= */}
      <section id="contacto" className="relative py-20 z-10 w-full">
         <div className="container mx-auto px-4 lg:px-12">
            <div className="text-white w-full">
               <ContactForm />
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}