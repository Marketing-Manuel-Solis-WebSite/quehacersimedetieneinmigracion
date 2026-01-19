'use client'

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform, useSpring, useMotionValue, Variants } from 'framer-motion';
import { Outfit } from 'next/font/google';

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600'] 
})

export default function About() {
  const { language } = useLanguage();
  const containerRef = useRef(null);

  // --- 1. LÓGICA DE SCROLL (PARALLAX VERTICAL) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -80]); // Reducido
  const yOrb = useTransform(scrollYProgress, [0, 1], [0, 150]); // Reducido

  // --- 2. LÓGICA DE MOUSE (PARALLAX INTERACTIVO) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    mouseX.set((clientX - left) / width - 0.5);
    mouseY.set((clientY - top) / height - 0.5);
  }

  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 40, damping: 25 }); // Reducido
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [-5, 5]), { stiffness: 40, damping: 25 });

  // --- VARIANTS ---
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative py-32 lg:py-44 w-full bg-[#001540] overflow-hidden ${font.className}`}
    >
      {/* --- FONDO OPTIMIZADO --- */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0 pointer-events-none transform-gpu">
        
        <div className="absolute inset-0 bg-[#001540]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#002868]/30 via-transparent to-[#000a20]/80" />

        {/* Orbes optimizados: Menos blur y sin mix-blend-screen si es posible, o con opacidad reducida */}
        <motion.div 
            style={{ y: yOrb, willChange: "transform" }}
            className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3 mix-blend-screen opacity-60" 
        />
        <motion.div 
            style={{ y: yOrb, willChange: "transform" }}
            className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#B2904D]/10 rounded-full blur-[90px] translate-x-1/3 translate-y-1/3 mix-blend-screen opacity-60" 
        />
        
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
        
      </motion.div>

      {/* --- MÁSCARAS ESTÁTICAS --- */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#000a20] to-transparent z-10 opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000a20] to-transparent z-10 opacity-50 pointer-events-none" />


      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* --- COLUMNA IZQUIERDA: TEXTO --- */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-6 space-y-10"
          >
            
            {/* TÍTULO */}
            <motion.div variants={fadeInUp} className="relative">
              <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-thin text-white leading-[0.9] tracking-tight">
                {language === 'es' ? 'Nuestra pasión es' : 'Our passion is'} <br />
                <span className="font-normal relative inline-block">
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#ffeebb] to-[#B2904D]">
                    {language === 'es' ? 'ayudarle.' : 'helping you.'}
                  </span>
                </span>
              </h2>
            </motion.div>

            {/* TEXTO */}
            <motion.div variants={fadeInUp} className="space-y-6 text-lg text-blue-100/80 leading-relaxed font-light">
              <p className="border-l-[3px] border-[#B2904D]/50 pl-6 py-1">
                {language === 'es'
                  ? <>Para nosotros, <strong className="text-white font-medium">"50,000 casos"</strong> no es solo una cifra. Cada número representa a una familia real que enfrentó obstáculos que parecían imposibles.</>
                  : <>For us, <strong className="text-white font-medium">"50,000 cases"</strong> is not just a number. Each number represents a real family that faced obstacles that seemed impossible.</>
                }
              </p>
              <p className="pl-6 text-base text-blue-200/70">
                {language === 'es'
                  ? 'Nuestro equipo de expertos no descansa hasta agotar cada recurso legal disponible para luchar por sus derechos.'
                  : 'Our team of experts does not rest until every legal resource available has been exhausted to fight for your rights.'
                }
              </p>
            </motion.div>

            {/* ESTADÍSTICAS - Optimizado: Menos blur y sombras */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-6 pl-2 pt-4">
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/5 transition-colors duration-300">
                    <h3 className="text-4xl font-light text-white flex items-baseline">
                        200 <span className="text-[#B2904D] text-2xl ml-0.5">+</span>
                    </h3>
                    <p className="text-[0.65rem] md:text-xs text-blue-200/70 uppercase tracking-[0.2em] mt-2 font-medium">
                        {language === 'es' ? 'Profesionales' : 'Professionals'}
                    </p>
                </div>
                <div className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/5 transition-colors duration-300">
                    <h3 className="text-4xl font-light text-white flex items-baseline">
                        35 <span className="text-sky-400 text-2xl ml-0.5">+</span>
                    </h3>
                    <p className="text-[0.65rem] md:text-xs text-blue-200/70 uppercase tracking-[0.2em] mt-2 font-medium">
                        {language === 'es' ? 'Años Experiencia' : 'Years Experience'}
                    </p>
                </div>
            </motion.div>

            {/* BOTÓN MEJORADO */}
            <motion.div variants={fadeInUp} className="pt-6 pl-2">
                <Link
                  href={`/${language}/Testimonios`}
                  className="group relative inline-flex items-center justify-center px-10 py-4 
                             bg-white/5 text-white font-medium tracking-wide overflow-hidden 
                             rounded-full shadow-lg hover:shadow-[#B2904D]/20 transition-all duration-500 
                             backdrop-blur-md border border-[#B2904D]/30 
                             hover:bg-[#B2904D]/10 hover:border-[#B2904D]/60"
                >
                   <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out" />
                   
                  <span className="relative flex items-center gap-3">
                    {language === 'es' ? 'Conozca Más' : 'Learn More'}
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform text-[#B2904D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </span>
                </Link>
            </motion.div>
          </motion.div>

          {/* --- COLUMNA DERECHA: IMAGEN (Cols 6) --- */}
          <motion.div 
            style={{ x, y, willChange: "transform" }}
            className="lg:col-span-6 relative h-[500px] lg:h-[700px] w-full perspective-[2000px] mt-32 mb-24 lg:mt-0 lg:mb-0"
          >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-blue-600/20 blur-[80px] rounded-full -z-10" />
              <div className="absolute top-4 -right-4 w-full h-full border border-[#B2904D]/20 rounded-[2rem] z-0 hidden lg:block" />

              <motion.div 
               initial={{ opacity: 0, scale: 0.95, rotateY: 3 }}
               whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 1.2, ease: "easeOut" }}
               className="relative z-10 w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/5"
              >
                 <Image
                   src="/Familia.png"
                   alt="Equipo Legal Manuel Solis"
                   fill
                   className="object-cover object-[18%_50%] scale-105 hover:scale-110 transition-transform duration-[1.8s]"
                   sizes="(max-width: 768px) 100vw, 50vw"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#001540]/80 via-transparent to-transparent opacity-60" />
              </motion.div>
              
          </motion.div>

        </div>
      </div>
    </section>
  )
}