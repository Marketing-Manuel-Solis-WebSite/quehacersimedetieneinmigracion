'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Play, Quote, Star, 
  ShieldCheck, ArrowRight, CheckCircle, 
  MessageSquare
} from 'lucide-react';
import Image from 'next/image';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer'; 
import ContactForm from '../../components/ContactForm';
import { useLanguage } from '../../context/LanguageContext';

const testimonials = [
  {
    id: 'alma-alvarado',
    name: 'Alma Alvarado',
    category: { es: 'Accidentes', en: 'Accidents' },
    image: 'https://manuelsolis.com/wp-content/uploads/2023/12/d7695fc0fb2a14bad98487f70444d63c.png',
    video: 'https://SolisPullZone.b-cdn.net/alma-alvarado.mp4',
    quote: {
      es: "Recuperé la tranquilidad después de mi accidente.",
      en: "I recovered my peace of mind after my accident."
    },
    story: {
      es: "Después de un grave accidente, Alma se sentía perdida. Nuestro equipo intervino para asegurar la compensación máxima.",
      en: "After a serious accident, Alma felt lost. Our team stepped in to secure maximum compensation."
    }
  },
  {
    id: 'alma-garcia',
    name: 'Alma García',
    category: { es: 'Inmigración', en: 'Immigration' },
    image: 'https://manuelsolis.com/wp-content/uploads/2023/12/866963ca424e7b42258ff5da5f5f0426.png',
    video: 'https://SolisPullZone.b-cdn.net/alma-garcia-testimonial.mp4',
    quote: {
      es: "Gracias al equipo pude alcanzar el resultado que anhelaba.",
      en: "Thanks to the team, I was able to achieve the result I longed for."
    },
    story: {
      es: "Alma soñaba con regularizar su estatus. Gracias a la experiencia del equipo legal, pudo enfrentar el proceso con éxito.",
      en: "Alma dreamed of regularizing her status. Thanks to the legal team's experience, she was able to face the process successfully."
    }
  },
  {
    id: 'carlos-zuniga',
    name: 'Carlos Zúñiga',
    category: { es: 'Ley Criminal', en: 'Criminal Law' },
    image: 'https://manuelsolis.com/wp-content/uploads/2023/12/ad195c8834bedc323ce1960b0f43a331.png',
    video: 'https://SolisPullZone.b-cdn.net/carlos-zuniga-testimonial.mp4',
    quote: {
      es: "Pelearon por mis derechos cuando nadie más quería escucharme.",
      en: "They fought for my rights when no one else would listen to me."
    },
    story: {
      es: "Carlos enfrentaba cargos que amenazaban su libertad. La defensa estratégica logró desestimar los cargos más graves.",
      en: "Carlos faced charges that threatened his freedom. Strategic defense managed to dismiss the most serious charges."
    }
  },
  {
    id: 'cecilia-limon',
    name: 'Cecilia Limón',
    category: { es: 'Familia', en: 'Family' },
    image: 'https://manuelsolis.com/wp-content/uploads/2024/01/cecilia-limon.jpg',
    video: 'https://SolisPullZone.b-cdn.net/cecilia-limon.mp4',
    quote: {
      es: "Unieron a mi familia de nuevo.",
      en: "They reunited my family."
    },
    story: {
      es: "Cecilia buscaba la reunificación familiar. Logramos aprobar su caso mediante una petición familiar compleja.",
      en: "Cecilia sought family reunification. We managed to approve her case through a complex family petition."
    }
  },
  {
    id: 'dagoberto-limon',
    name: 'Dagoberto Limón',
    category: { es: 'Inmigración', en: 'Immigration' },
    image: 'https://SolisPullZone.b-cdn.net/dagoberto-limon.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/dagoberto-limon.mp4',
    quote: {
      es: "El proceso fue claro y rápido.",
      en: "The process was clear and fast."
    },
    story: {
      es: "Dagoberto pensó que su caso estaba perdido. Nuestros expertos encontraron una vía legal que otros habían pasado por alto.",
      en: "Dagoberto thought his case was lost. Our experts found a legal path that others had overlooked."
    }
  },
  {
    id: 'doris-licona',
    name: 'Doris Licona',
    category: { es: 'Visa U', en: 'U Visa' },
    image: 'https://SolisPullZone.b-cdn.net/images/doris-licona.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/doris-licona-testimonial.mp4',
    quote: {
      es: "Me ayudaron después de ser víctima de un crimen.",
      en: "They helped me after being a crime victim."
    },
    story: {
      es: "Como víctima de un crimen, Doris tenía miedo. La guiamos y tramitamos su Visa U exitosamente.",
      en: "As a crime victim, Doris was afraid. We guided her and successfully processed her U Visa."
    }
  },
  {
    id: 'juana-edith',
    name: 'Juana Edith Pérez',
    category: { es: 'Residencia', en: 'Residency' },
    image: 'https://SolisPullZone.b-cdn.net/images/juana-edith-perez.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/juana-edith-perez-testimonial.mp4',
    quote: {
      es: "Un servicio honesto y transparente.",
      en: "Honest and transparent service."
    },
    story: {
      es: "Juana Edith destaca la honestidad con la que se manejó su caso, permitiéndole planificar su futuro con seguridad.",
      en: "Juana Edith highlights the honesty with which her case was handled, allowing her to plan her future with confidence."
    }
  },
  {
    id: 'leonardo-aguirre',
    name: 'Leonardo Aguirre',
    category: { es: 'Permiso de Trabajo', en: 'Work Permit' },
    image: 'https://SolisPullZone.b-cdn.net/images/leonardo-aguirre.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/leonardo-aguirre-testimonial.mp4',
    quote: {
      es: "Ahora puedo trabajar legalmente.",
      en: "Now I can work legally."
    },
    story: {
      es: "Obtener su permiso de trabajo cambió la vida de Leonardo, abriéndole puertas a mejores oportunidades laborales.",
      en: "Obtaining his work permit changed Leonardo's life, opening doors to better job opportunities."
    }
  },
  {
    id: 'norma-mendoza',
    name: 'Norma Mendoza',
    category: { es: 'Ciudadanía', en: 'Citizenship' },
    image: 'https://SolisPullZone.b-cdn.net/images/norma-mendoza.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/norma-mendoza.mp4',
    quote: {
      es: "El sueño americano hecho realidad.",
      en: "The American dream come true."
    },
    story: {
      es: "Norma completó su proceso de naturalización con nuestra guía, convirtiéndose orgullosamente en ciudadana.",
      en: "Norma completed her naturalization process with our guidance, proudly becoming a citizen."
    }
  },
  {
    id: 'xiomara-zamora',
    name: 'Xiomara Zamora',
    category: { es: 'Inmigración', en: 'Immigration' },
    image: 'https://SolisPullZone.b-cdn.net/images/xiomara-zamora.jpeg',
    video: 'https://SolisPullZone.b-cdn.net/xiomara-zamora-testimonial.mp4',
    quote: {
      es: "No se rindieron con mi caso.",
      en: "They didn't give up on my case."
    },
    story: {
      es: "A pesar de las dificultades iniciales, el equipo legal persistió hasta encontrar la solución adecuada.",
      en: "Despite initial difficulties, the legal team persisted until finding the right solution."
    }
  }
];

export default function TestimonialsPage() {
  const { language } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedTestimonial = testimonials.find(t => t.id === selectedId);
  const videoRef = useRef<HTMLVideoElement>(null);

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
    },
    form: {
      title: { es: 'Inicie su Consulta', en: 'Start Your Consultation' }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#002342] font-sans selection:bg-[#B2904D] selection:text-white overflow-x-hidden">
      
      <Header />

      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-[1000px] overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[5%] w-[600px] h-[600px] bg-[#B2904D]/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-[#002342]/5 rounded-full blur-[100px]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative pt-44 pb-16 px-4 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-gray-200/60 backdrop-blur-xl shadow-sm mb-8">
               <Star size={14} className="text-[#B2904D] fill-[#B2904D]" />
               <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">{texts.hero.badge[language]}</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#002342] tracking-tight mb-6 drop-shadow-sm">
              {texts.hero.title1[language]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#D4AF37]">{texts.hero.title2[language]}</span>
            </h1>
            
            <p className="text-gray-500 text-xl font-light max-w-2xl mx-auto leading-relaxed">
              {texts.hero.subtitle[language]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* GRID FLOTANTE */}
      <section className="px-4 pb-32 relative z-10 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {testimonials.map((item, index) => (
            <motion.div
              layoutId={`card-${item.id}`}
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.6, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedId(item.id)}
              className="group cursor-pointer h-[480px]"
            >
              <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-white border border-white/80 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(178,144,77,0.25)] transition-all duration-500 flex flex-col">
                
                {/* Imagen Superior */}
                <div className="relative h-[280px] w-full overflow-hidden bg-gray-50">
                   <Image 
                     src={item.image} 
                     alt={item.name} 
                     fill 
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     unoptimized
                   />
                   {/* Badge Flotante */}
                   <div className="absolute top-5 left-5">
                      <div className="bg-white/90 backdrop-blur-md border border-white/50 text-[#002342] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                         {getText(item.category)}
                      </div>
                   </div>
                   
                   {/* Play Button Overlay */}
                   <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors duration-500">
                      <div className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 shadow-lg">
                         <Play fill="white" size={20} className="ml-1" />
                      </div>
                   </div>
                </div>

                {/* Contenido Inferior */}
                <div className="p-8 flex flex-col justify-between flex-grow bg-white relative">
                   <div className="absolute top-[-20px] left-0 w-full h-20 bg-gradient-to-b from-transparent to-white pointer-events-none z-10" />
                   
                   <div className="relative z-20">
                     <h3 className="text-2xl font-serif font-bold text-[#002342] mb-3 group-hover:text-[#B2904D] transition-colors">
                       {item.name}
                     </h3>
                     <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className="text-[#B2904D] fill-[#B2904D]" />
                        ))}
                     </div>
                     <p className="text-gray-500 text-sm font-light italic line-clamp-2">
                       "{getText(item.quote)}"
                     </p>
                   </div>
                   
                   <div className="relative z-20 pt-4 flex items-center text-[#002342] text-xs font-bold uppercase tracking-wider group/btn">
                      {texts.card.viewFullStory[language]}
                      <ArrowRight size={14} className="ml-2 text-[#B2904D] group-hover/btn:translate-x-1 transition-transform" />
                   </div>
                </div>

              </div>
            </motion.div>
          ))}

        </div>
      </section>

      {/* MODAL EXPANDIDO */}
      <AnimatePresence>
        {selectedId && selectedTestimonial && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-white/80 backdrop-blur-xl"
            />

            <motion.div 
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-7xl h-[80vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row z-10 ring-1 ring-black/5"
            >
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-6 right-6 z-50 bg-white/20 hover:bg-white text-white hover:text-[#002342] p-3 rounded-full backdrop-blur-md transition-all duration-300 border border-white/30"
              >
                <X size={24} />
              </button>

              {/* Video */}
              <div className="w-full lg:w-2/3 h-full bg-black relative flex items-center justify-center">
                 <video 
                    ref={videoRef}
                    src={selectedTestimonial.video} 
                    className="w-full h-full object-contain bg-black"
                    controls
                    autoPlay
                    playsInline
                    poster={selectedTestimonial.image}
                 />
              </div>

              {/* Info */}
              <div className="w-full lg:w-1/3 h-full bg-white p-10 flex flex-col relative overflow-y-auto border-l border-gray-100">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                      <span className="inline-block text-xs font-bold text-[#B2904D] uppercase tracking-widest mb-2">{texts.modal.badge[language]}</span>
                      <h2 className="text-4xl font-serif font-bold text-[#002342] mb-6">
                        {selectedTestimonial.name}
                      </h2>

                      <div className="relative pl-5 border-l-2 border-[#B2904D] mb-8">
                         <p className="text-lg italic text-gray-600 font-medium leading-relaxed">
                           "{getText(selectedTestimonial.quote)}"
                         </p>
                      </div>

                      <div className="mb-10">
                        <p className="text-gray-500 text-sm leading-relaxed">
                           {getText(selectedTestimonial.story)}
                        </p>
                      </div>

                      <div className="mt-auto">
                         <a href="#contacto" onClick={() => setSelectedId(null)} className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#002342] text-white font-bold shadow-lg hover:bg-[#B2904D] transition-colors duration-300">
                            <MessageSquare size={18} />
                            {texts.modal.button[language]}
                         </a>
                      </div>
                  </motion.div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FORMULARIO */}
      <section id="contacto" className="relative py-32 bg-white z-10">
         <div className="max-w-3xl mx-auto px-4">
            
            <div className="text-center mb-12">
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#002342]">
                 {texts.form.title[language]}
               </h2>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-[0_0_50px_-10px_rgba(0,0,0,0.08)] border border-gray-100 p-8 md:p-12">
                <ContactForm />
            </div>

         </div>
      </section>

      <Footer />
    </div>
  );
}