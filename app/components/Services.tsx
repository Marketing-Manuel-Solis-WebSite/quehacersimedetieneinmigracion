'use client';

import Link from 'next/link'
import { useRef } from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion'; 
import { useLanguage } from '../context/LanguageContext'
import { Outfit } from 'next/font/google';

// 1. Configuración de Fuente
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '600', '800', '900'] 
})

export default function Services() {
  const { language, t } = useLanguage();
  const containerRef = useRef(null);

  // --- LÓGICA DE PARALLAX PARA EL FONDO ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 80]); 

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
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // DATA - Usando los textos del archivo de traducciones actualizado
  const services = [
    {
      title: t.services.categories.accidents.title,
      href: `/${language}/servicios/accidentes`, 
      items: t.services.categories.accidents.services,
    },
    {
      title: t.services.categories.immigration.title,
      href: `/${language}/servicios/inmigracion`, 
      items: t.services.categories.immigration.services,
    },
    {
      title: t.services.categories.insurance.title,
      href: `/${language}/servicios/seguros`, 
      items: t.services.categories.insurance.services,
    },
    {
      title: t.services.categories.criminal.title,
      href: `/${language}/servicios/ley-criminal`, 
      items: t.services.categories.criminal.services,
    },
    {
      title: t.services.categories.family.title,
      href: `/${language}/servicios/familia`, 
      items: t.services.categories.family.services,
    },
    {
      title: t.services.categories.estatePlanning.title,
      href: `/${language}/servicios/planificacion`, 
      items: t.services.categories.estatePlanning.services,
    },
  ]

  return (
    <section 
        id="servicios" 
        ref={containerRef}
        className={`relative pt-24 pb-32 w-full bg-[#001540] overflow-hidden ${font.className}`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        
        <motion.div
            style={{ y: yBg, willChange: "transform" }} 
            animate={{ x: ["100%", "-100%"] }} 
            transition={{ 
                duration: 80, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop"
            }}
            className="absolute top-20 right-0 flex items-center justify-center opacity-[0.04] select-none pointer-events-none"
        >
            <span className={`text-[80vh] lg:text-[100vh] leading-none font-extrabold italic text-white tracking-tighter mix-blend-overlay transform -skew-x-12`}>
                S
            </span>
        </motion.div>

        <motion.div
            style={{ willChange: "transform" }}
            animate={{ y: ["-120vh", "120vh"] }} 
            transition={{ 
                duration: 90, 
                repeat: Infinity, 
                ease: "linear",
                repeatType: "loop",
                delay: -25
            }}
            className="absolute top-0 left-[-10%] flex items-center justify-center opacity-[0.04] select-none pointer-events-none"
        >
            <span className={`text-[80vh] lg:text-[100vh] leading-none font-extrabold italic text-white tracking-tighter mix-blend-overlay transform -skew-x-12`}>
                M
            </span>
        </motion.div>

        <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform, opacity" }}
            className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[90px] translate-x-1/3 -translate-y-1/3 translate-z-0" 
        />
        <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform, opacity" }}
            className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#B2904D]/10 rounded-full blur-[90px] -translate-x-1/3 translate-y-1/3 translate-z-0" 
        />
        
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6 shadow-[0_0_10px_rgba(178,144,77,0.1)]">
              <span className="text-[10px] md:text-xs font-bold tracking-[0.25em] text-blue-200/70 uppercase">
                {language === 'es' ? 'EXPERIENCIA COMPROBADA' : 'PROVEN EXPERIENCE'}
              </span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-thin text-white mb-6 tracking-tight">
              {t.services.title}{' '}
              <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] via-[#ffeebb] to-[#B2904D]">
                {t.services.heading}
              </span>
            </h2>
            <p className="text-xl text-blue-100/60 font-light max-w-2xl mx-auto leading-relaxed">
              {t.services.description}
            </p>
          </motion.div>
        
        <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => {
            return (
              <motion.div key={index} variants={fadeInUp} className="block h-full">
                <Link
                  href={service.href} 
                  className="block h-full group perspective-[1000px]"
                  // SEO FIX: Unique Aria Label
                  aria-label={`${t.services.learnMore} - ${service.title}`}
                >
                  <div className="relative h-full p-8 rounded-[2rem] bg-[#000a20]/60 border border-white/10 backdrop-blur-sm 
                                  transition-all duration-300 hover:bg-white/5 hover:border-[#B2904D]/30 hover:-translate-y-1 transform-gpu
                                  flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-[0_15px_30px_-10px_rgba(178,144,77,0.15)]">
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                        <div className="flex items-center mb-6 pb-4 border-b border-white/10 group-hover:border-[#B2904D]/30 transition-colors duration-300">
                            <div className="w-1 h-8 bg-[#B2904D] rounded-full mr-5 group-hover:h-12 group-hover:shadow-[0_0_10px_rgba(178,144,77,0.6)] transition-all duration-300"></div>
                            
                            <h3 className="text-3xl font-light text-white group-hover:text-white transition-all duration-300">
                                {service.title}
                            </h3>
                        </div>

                        <div>
                            <ul className="space-y-3">
                                {service.items.slice(0, 4).map((item: string, idx: number) => ( 
                                    <li key={idx} className="flex items-start text-blue-100/60 group-hover:text-blue-50 transition-colors duration-200">
                                        <div className="w-1 h-1 bg-[#B2904D]/50 rounded-full mt-2.5 mr-3 flex-shrink-0 group-hover:bg-[#B2904D] transition-colors"></div>
                                        <span className="font-light text-sm leading-relaxed">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="relative z-10 mt-8 pt-4 border-t border-transparent group-hover:border-white/10 transition-colors duration-300">
                        <span className="text-sm font-medium text-[#B2904D] tracking-wide flex items-center gap-2 opacity-80 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                             {t.services.learnMore}
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </span>
                    </div>

                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
        
      </div>
    </section>
  )
}