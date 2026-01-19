'use client'

import { useState, useRef } from 'react'
import { Star, Play, X, Quote } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import { Outfit } from 'next/font/google'

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600'] 
})

interface VideoModalProps {
  videoId: string;
  onClose: () => void;
}

const FALLBACK_THUMBNAIL = '/testimonials/Residencia_Octavio.png';

// --- COMPONENTE MODAL OPTIMIZADO ---
function VideoModal({ videoId, onClose }: VideoModalProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      // OPTIMIZACIÓN: Reducido de backdrop-blur-xl a md y aumentado opacidad de fondo
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#000a20]/98 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 100 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-6xl aspect-video rounded-3xl shadow-2xl overflow-hidden bg-black border border-white/10" 
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 group"
          aria-label="Cerrar video"
        >
          <div className="p-3 bg-white/10 hover:bg-[#B2904D] backdrop-blur-md rounded-full text-white transition-all duration-300 border border-white/20">
            <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </div>
        </button>

        <iframe
          src={embedUrl}
          title="Testimonio de Cliente"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full"
        ></iframe>
      </motion.div>
    </motion.div>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function Testimonials() {
  const { language } = useLanguage();
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const containerRef = useRef(null);

  // --- DATOS DE TESTIMONIOS (CON TRADUCCIÓN) ---
  const testimonialsData = {
    es: {
      name: 'Octavio Varela',
      case: 'Residencia Permanente',
      comment: 'Feliz, sentí que todo lo que perdí cuando ingresé al país, se me devolvió y con un regalo',
      videoThumbnail: FALLBACK_THUMBNAIL, 
      videoId: 'cTJ9M5PT-S4', 
    },
    en: {
      name: 'Octavio Varela',
      case: 'Permanent Residency',
      comment: 'Happy, I felt that everything I lost when I entered the country was returned to me, and with a gift.',
      videoThumbnail: FALLBACK_THUMBNAIL, 
      videoId: 'cTJ9M5PT-S4', 
    }
  };

  const current = language === 'es' ? testimonialsData.es : testimonialsData.en;

  // --- 1. LÓGICA DE MOVIMIENTO DE MOUSE (Magnetic Effect) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  }

  const xVideo = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 30, damping: 25 }); // Reducido rango
  const yVideo = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), { stiffness: 30, damping: 25 });
  
  const xText = useSpring(useTransform(mouseX, [-0.5, 0.5], [8, -8]), { stiffness: 30, damping: 25 });
  const yText = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 30, damping: 25 });

  // --- 2. LÓGICA DE SCROLL PARALLAX ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -80]); // Reducido
  const yContent = useTransform(scrollYProgress, [0, 1], [40, -40]); // Reducido

  return (
    <section 
        id="testimonios" 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className={`relative min-h-screen flex flex-col justify-center w-full bg-[#001540] overflow-hidden ${font.className} py-32 lg:py-0`}
    >
      {/* --- FONDO VIVO CON PROFUNDIDAD OPTIMIZADO --- */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none transform-gpu">
        {/* Fondo Base */}
        <div className="absolute inset-0 bg-[#001540]" />
        
        {/* Orbe 1: Optimizado (Blur reducido y will-change) */}
        <motion.div 
            animate={{ 
                scale: [1, 1.1, 1], 
                opacity: [0.2, 0.3, 0.2],
                x: [0, 20, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform, opacity" }}
            className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-blue-600/10 rounded-full blur-[90px] translate-z-0" 
        />

        {/* Orbe 2: Optimizado */}
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.1, 0.2, 0.1],
                x: [0, -30, 0],
                y: [0, 30, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ willChange: "transform, opacity" }}
            className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] bg-[#B2904D]/10 rounded-full blur-[100px] translate-z-0" 
        />
        
        {/* Partículas flotantes - Opacidad baja para evitar paint thrashing */}
        <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.png')] mix-blend-overlay"></div>

      </motion.div>

      {/* --- MÁSCARAS ESTÁTICAS --- */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#000a20] to-transparent z-10 opacity-80 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#000a20] to-transparent z-10 opacity-80 pointer-events-none" />


      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        <motion.div 
            style={{ y: yContent }} 
            className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center"
        >
            
            {/* --- COLUMNA VIDEO (IZQUIERDA) --- */}
            <motion.div 
                style={{ x: xVideo, y: yVideo, willChange: "transform" }}
                className="lg:col-span-7 relative"
            >
                {/* Decoración de círculo giratorio detrás - Estático o rotación simple */}
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    style={{ willChange: "transform" }}
                    className="absolute -inset-16 border border-white/5 rounded-full z-0 border-dashed opacity-40 hidden lg:block"
                />

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, rotateY: 5 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 group perspective-[1000px]"
                >
                    {/* Tarjeta de Video con efecto Glassmorphism 3D */}
                    <div 
                        onClick={() => setIsVideoOpen(true)}
                        className="relative w-full aspect-video rounded-[2rem] overflow-hidden 
                                   border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl 
                                   cursor-pointer group-hover:shadow-[#B2904D]/20 group-hover:border-[#B2904D]/40
                                   transition-all duration-500 transform-gpu"
                    >
                        {/* Imagen con Zoom suave */}
                        <Image
                            src={current.videoThumbnail}
                            alt={current.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 60vw"
                            className="object-cover transition-transform duration-[2s] group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        />
                        
                        {/* Overlay cinematográfico */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-[#001540]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                        {/* Botón Play "Wow" */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="relative flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                {/* Ondas expansivas - Optimizadas */}
                                <motion.div 
                                    animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute w-24 h-24 bg-[#B2904D]/30 rounded-full"
                                />
                                <motion.div 
                                    animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                    className="absolute w-24 h-24 bg-[#B2904D]/30 rounded-full"
                                />
                                
                                {/* El botón real */}
                                <div className="relative w-24 h-24 bg-[#B2904D] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(178,144,77,0.4)] z-10 border-2 border-white/20 backdrop-blur-sm">
                                    <Play className="w-10 h-10 text-[#001540] ml-1 fill-[#001540]" />
                                </div>
                            </div>
                        </div>

                        {/* Texto flotante dentro del video */}
                        <div className="absolute bottom-8 left-8 z-20">
                             <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                <p className="text-white/80 text-xs uppercase tracking-widest font-bold">
                                    {language === 'es' ? 'Historia de Éxito' : 'Success Story'}
                                </p>
                             </div>
                             <p className="text-white text-2xl font-medium tracking-tight">{current.name}</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>


            {/* --- COLUMNA TEXTO (DERECHA) --- */}
            <motion.div 
                style={{ x: xText, y: yText, willChange: "transform" }}
                className="lg:col-span-5 relative space-y-10 pl-0 lg:pl-10"
            >
                 {/* Título de Sección */}
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                 >
                      <div className="flex items-center gap-3 mb-4">
                        <span className="h-[2px] w-12 bg-[#B2904D]"></span>
                        <span className="text-[#B2904D] uppercase tracking-[0.25em] text-xs font-bold">
                            {language === 'es' ? 'Testimonios Reales' : 'Real Testimonials'}
                        </span>
                      </div>
                      <h2 className="text-5xl lg:text-7xl font-thin text-white leading-[0.9]">
                        {language === 'es' ? 'Voces de' : 'Voices of'} <br />
                        <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ffeebb] to-[#B2904D]">
                           {language === 'es' ? 'Esperanza' : 'Hope'}
                        </span>
                      </h2>
                 </motion.div>

                 {/* Cita Principal */}
                 <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="relative pl-8 border-l-2 border-white/10"
                 >
                    <Quote className="absolute -top-6 -left-6 text-[#B2904D]/20 w-16 h-16 rotate-180" />
                    
                    <p className="text-2xl lg:text-3xl font-light text-blue-50 leading-relaxed relative z-10 italic">
                        "{current.comment}"
                    </p>
                 </motion.div>

                 {/* Detalles y Estrellas */}
                 <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col gap-6 pt-4"
                 >
                    <div className="flex gap-1.5">
                        {[...Array(5)].map((_, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + (i * 0.1), type: "spring" }}
                           >
                              <Star className="w-6 h-6 fill-[#B2904D] text-[#B2904D]" />
                           </motion.div>
                        ))}
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 inline-block w-fit backdrop-blur-sm">
                        <p className="text-white text-lg font-medium">{current.case}</p>
                        <p className="text-[#B2904D] text-sm uppercase tracking-wide font-bold mt-1">
                            {language === 'es' ? 'Caso Ganado' : 'Case Won'}
                        </p>
                    </div>
                 </motion.div>

            </motion.div>

        </motion.div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && <VideoModal videoId={current.videoId} onClose={() => setIsVideoOpen(false)} />}
      </AnimatePresence>
    </section>
  )
}