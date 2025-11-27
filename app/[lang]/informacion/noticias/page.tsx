'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Hammer, ArrowRight, Construction, HardHat, Compass } from 'lucide-react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function NewsComingSoon() {
  return (
    // Se mantiene el fondo base Navy
    <div className="min-h-screen flex flex-col bg-[#002342] text-white overflow-hidden relative">
      
      <Header />

      {/* --- CONTENIDO PRINCIPAL --- */}
      {/* CAMBIO AQUI: Aumenté pt-36 a md:pt-44 para bajar el contenido y que no choque con el header */}
      <main className="flex-grow flex items-center justify-center relative pt-36 md:pt-44 pb-20 px-4">
        
        {/* 1. FONDO ANIMADO MEJORADO (Más "Wow") */}
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none">
            {/* Luz central profunda */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[#003366] rounded-full mix-blend-screen filter blur-[150px] opacity-40 animate-pulse-slow"></div>
            
            {/* NUEVO: Patrón de Red Geométrica y Líneas de Construcción */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.15]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#B2904D" strokeWidth="0.5"/>
                    </pattern>
                </defs>
                {/* Red de fondo */}
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Líneas diagonales grandes cruzando la pantalla */}
                <motion.line 
                  x1="0" y1="100%" x2="100%" y2="0" 
                  stroke="#B2904D" strokeWidth="1" opacity="0.2"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5, ease: "easeInOut" }}
                />
                <motion.line 
                  x1="-20%" y1="50%" x2="120%" y2="50%" 
                  stroke="#B2904D" strokeWidth="1" opacity="0.1"
                  strokeDasharray="10,10"
                />
            </svg>

            {/* Partículas Doradas Flotantes (Se mantienen) */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-[#B2904D] rounded-full"
                    initial={{
                        x: Math.random() * 100 - 50 + "%",
                        y: Math.random() * 100 + "%",
                        scale: Math.random() * 0.6 + 0.4,
                        opacity: 0
                    }}
                    animate={{
                        y: [null, "-120%"],
                        opacity: [0, 0.4, 0],
                    }}
                    transition={{
                        duration: Math.random() * 15 + 15,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                    style={{
                        width: Math.random() * 5 + 3 + 'px',
                        height: Math.random() * 5 + 3 + 'px',
                    }}
                />
            ))}
        </div>

        {/* 2. TARJETA CENTRAL (Glassmorphism) */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
            className="relative z-10 w-full max-w-3xl bg-[#001a33]/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-14 text-center shadow-2xl ring-1 ring-[#B2904D]/20"
        >
            {/* Decoración superior de la tarjeta */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-[#B2904D] to-transparent opacity-70"></div>

            {/* Icono Animado Central */}
            <div className="flex justify-center mb-8 relative">
                <motion.div
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 10 }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="relative z-10 bg-gradient-to-br from-[#002342] to-[#00152b] p-6 rounded-full border-[3px] border-[#B2904D] shadow-[0_0_35px_rgba(178,144,77,0.4)]"
                >
                    <Newspaper size={64} className="text-white/90" />
                    
                    {/* Martillo y Brújula animados (Nuevo icono añadido) */}
                    <motion.div 
                        className="absolute -right-5 -top-2 bg-[#B2904D] p-2 rounded-full text-[#002342] shadow-lg"
                        animate={{ rotate: [0, 30, 0], scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Hammer size={22} />
                    </motion.div>
                    <div className="absolute -left-4 bottom-0 text-[#B2904D] opacity-70">
                       <Compass size={28} />
                    </div>
                </motion.div>
            </div>

            {/* Texto Principal */}
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight"
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    Estamos Cimentando
                </span> <br />
                <span className="text-[#B2904D] drop-shadow-md">La Verdad</span>
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-base md:text-lg text-gray-300 mb-10 max-w-xl mx-auto leading-relaxed font-light"
            >
                Nuestra sección de <strong>Noticias</strong> está bajo una reconstrucción estratégica. 
                Pronto encontrará aquí análisis jurídicos profundos y actualizaciones migratorias esenciales.
            </motion.p>

            {/* --- Barra de Progreso 26% --- */}
            <div className="max-w-md mx-auto mb-12 relative">
                <div className="flex justify-between text-xs text-[#B2904D]/80 font-bold uppercase tracking-[0.2em] mb-3">
                    <span>Fase Inicial de Arquitectura</span>
                    <span className="text-[#B2904D]">26%</span>
                </div>
                
                {/* Contenedor de la barra */}
                <div className="h-3 w-full bg-[#001021] rounded-full overflow-hidden relative border border-white/10 box-shadow-inner">
                    {/* Barra de relleno animada */}
                    <motion.div 
                        className="h-full bg-gradient-to-r from-[#B2904D] to-[#d4af67] absolute top-0 left-0 rounded-full relative overflow-hidden"
                        initial={{ width: "0%" }}
                        animate={{ width: "26%" }} /* CAMBIO: Ajustado al 26% */
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
                    >
                         {/* Brillo intenso en la punta de la barra */}
                         <div className="absolute right-0 top-0 h-full w-[5px] bg-white blur-[3px]"></div>
                    </motion.div>

                    {/* Efecto de escaneo sobre la barra */}
                    <motion.div 
                        className="absolute top-0 bottom-0 w-10 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                        animate={{ x: [-50, 450] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                </div>
            </div>

            {/* Botones de Acción */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <Link href="/" className="group relative px-8 py-4 bg-white text-[#002342] font-bold rounded-full overflow-hidden shadow-[0_5px_15px_rgba(255,255,255,0.1)] hover:shadow-[0_5px_20px_rgba(255,255,255,0.2)] transition-all">
                    <span className="relative z-10 flex items-center gap-2">
                        Volver al Inicio
                    </span>
                </Link>

                <Link href="/#oficinas" className="group relative px-8 py-4 text-[#B2904D] font-bold rounded-full overflow-hidden transition-all flex items-center justify-center gap-2 border-2 border-[#B2904D]/50 hover:border-[#B2904D]">
                     <span className="relative z-10 flex items-center gap-2">
                        Contactar <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                     {/* Fondo sutil al hacer hover */}
                    <div className="absolute inset-0 bg-[#B2904D] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                </Link>
            </motion.div>

        </motion.div>

        {/* Elementos decorativos flotantes del fondo */}
        <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 left-10 opacity-20 hidden lg:block pointer-events-none"
        >
            <Construction size={120} className="text-[#B2904D] blur-[2px]" />
        </motion.div>
        <motion.div 
            animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-40 right-10 opacity-10 hidden lg:block pointer-events-none"
        >
            <HardHat size={100} className="text-white blur-[2px]" />
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}