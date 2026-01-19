'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Outfit } from 'next/font/google'
import { ArrowRight } from 'lucide-react'

// 1. Configuración de Fuente
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '800', '900'] 
})

export default function Team() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  // --- 1. LÓGICA DE SCROLL (Sutil y segura, sin mouse) ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Movimiento vertical suave solo al hacer scroll (no afecta posición horizontal)
  const yContent = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section 
      id="equipo" 
      ref={containerRef}
      className={`relative py-32 lg:py-48 w-full bg-[#001540] overflow-hidden ${font.className}`}
    >
      {/* --- FONDO ATMOSFÉRICO VIVO --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
        <div className="absolute inset-0 bg-[#001540]" />
        
        {/* --- GUIONES GIGANTES DE FONDO --- */}

        {/* 1. Guion EXTRA ARRIBA */}
        <motion.div
            style={{ y: yBg, willChange: "transform" }} 
            animate={{ x: ["100%", "-100%"] }} 
            transition={{ 
                duration: 55,
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop",
                delay: -15
            }}
            className="absolute -top-40 right-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none"
        >
            <span className={`text-[80vh] lg:text-[100vh] leading-none font-extrabold italic text-white tracking-tighter mix-blend-overlay transform -skew-x-12`}>
                -
            </span>
        </motion.div>

        {/* 2. Guion ARRIBA */}
        <motion.div
            style={{ y: yBg, willChange: "transform" }} 
            animate={{ x: ["100%", "-100%"] }} 
            transition={{ 
                duration: 65, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop",
                delay: -25
            }}
            className="absolute top-10 right-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none"
        >
            <span className={`text-[80vh] lg:text-[100vh] leading-none font-extrabold italic text-white tracking-tighter mix-blend-overlay transform -skew-x-12`}>
                -
            </span>
        </motion.div>

        {/* 3. Guion ABAJO */}
        <motion.div
            style={{ y: yBg, willChange: "transform" }}
            animate={{ x: ["-100%", "100%"] }} 
            transition={{ 
                duration: 70, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop",
                delay: -20 
            }}
            className="absolute bottom-10 left-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none"
        >
            <span className={`text-[80vh] lg:text-[100vh] leading-none font-extrabold italic text-white tracking-tighter mix-blend-overlay transform -skew-x-12`}>
                -
            </span>
        </motion.div>


        {/* Orbe Dorado (Derecha Arriba) */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity" }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#B2904D]/10 rounded-full blur-[80px] translate-x-1/3 -translate-y-1/3 translate-z-0" 
        />
        
        {/* Orbe Azul (Izquierda Abajo) */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ willChange: "transform, opacity" }}
          className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[90px] -translate-x-1/3 translate-y-1/3 translate-z-0" 
        />
        
        {/* Ruido de textura */}
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          {/* --- COLUMNA IZQUIERDA: TEXTO --- */}
          <motion.div 
            style={{ y: yContent }}
            className="lg:col-span-6 space-y-10"
          >
            {/* Título */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
            >
                <div className="flex items-center gap-3 mb-6">
                    <span className="h-[2px] w-10 bg-[#B2904D]"></span>
                    <span className="text-[#B2904D] font-bold tracking-[0.2em] text-xs uppercase">
                        {language === 'es' ? 'Nuestra Firma' : 'Our Firm'}
                    </span>
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-[5rem] font-thin text-white leading-[0.95] tracking-tight">
                  {language === 'es' ? 'Nuestro Equipo' : 'Our Legal Team'} <br />
                  <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#ffeebb] to-[#B2904D]">
                    {language === 'es' ? 'Legal' : '& Attorneys'}
                  </span>
                </h2>
            </motion.div>

            {/* Texto Descriptivo */}
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2, duration: 0.8 }}
               className="space-y-6 text-lg lg:text-xl font-light text-blue-100/70 leading-relaxed"
            >
              <p>
                {language === 'es' 
                  ? 'Desde la apertura de su bufete en 1990, Manuel E. Solís y equipo se han comprometido a brindar el nivel de servicio que esperarían recibir si estuvieran en el lugar de nuestros clientes.'
                  : 'Since opening his firm in 1990, Manuel E. Solís and team have committed to providing the level of service they would expect to receive if they were in the place of our clients.'
                }
              </p>

              <div className="pl-6 border-l-2 border-white/10">
                  <p className="italic text-white/90">
                    {language === 'es'
                      ? 'Muchos de nuestros abogados comparten la experiencia personal de emigrar a los EE.UU., lo que les permite entender profundamente las necesidades de nuestros clientes.'
                      : 'Many of our attorneys share the personal experience of immigrating to the U.S., which allows them to deeply understand the needs of our clients.'
                    }
                  </p>
              </div>
            </motion.div>

            {/* Botón Glass/Gold */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="pt-4"
            >
                <Link
                  href={`/${language}/abogados`}
                  className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full overflow-hidden hover:bg-white/10 hover:border-[#B2904D]/50 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="relative z-10 text-white font-medium tracking-wide">
                    {language === 'es' ? 'Conoce al Equipo' : 'Meet the Team'}
                  </span>
                  
                  <div className="relative z-10 w-10 h-10 rounded-full bg-[#B2904D] flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <ArrowRight className="w-5 h-5 text-white transform group-hover:-rotate-45 transition-transform duration-300" />
                  </div>

                  {/* Brillo Hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </Link>
            </motion.div>
          </motion.div>

          {/* --- COLUMNA DERECHA: IMAGEN (ESTÁTICA) --- */}
          <div className="lg:col-span-6 relative mt-12 lg:mt-0">
             
             {/* Glow detrás de la imagen */}
             <motion.div 
               animate={{ opacity: [0.4, 0.6, 0.4] }}
               transition={{ duration: 5, repeat: Infinity }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-blue-500/20 blur-[60px] rounded-full -z-10" 
             />

             {/* Contenedor Principal Imagen (SIN movimiento de mouse) */}
             <div className="relative z-10 w-full h-[500px] lg:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-[#001540]">
                <Image
                  src="/MSTeam.png"
                  alt="Equipo de abogados Manuel Solis"
                  fill
                  className="object-cover scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
                
                {/* Overlay Gradiente Elegante */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-60" />
                
                {/* Efecto de reflejo de cristal */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
             </div>

             {/* BADGE FLOTANTE (ESTÁTICO) */}
             <div className="absolute -bottom-10 -left-6 lg:-left-12 z-20">
                <div className="relative p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] overflow-hidden group">
                    {/* Brillo interno */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#B2904D]/20 to-transparent opacity-50" />
                    
                    <div className="relative z-10 flex flex-col items-start gap-1">
                        <span className="text-xs font-bold text-[#B2904D] uppercase tracking-widest">
                            {language === 'es' ? 'Excelencia' : 'Excellence'}
                        </span>
                        <span className="text-3xl font-light text-white">
                            {language === 'es' ? 'Desde 1990' : 'Since 1990'}
                        </span>
                        <div className="h-1 w-full bg-white/10 mt-2 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-[#B2904D]" />
                        </div>
                    </div>
                </div>
             </div>

          </div>
        </div>
      </div>
    </section>
  )
}