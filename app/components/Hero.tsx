'use client'

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Outfit } from 'next/font/google';

const font = Outfit({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '800', '900']
})

const associations = [
  { name: 'Chicago Bar Association', logo: '/state-bar/Chicago-bar.png' },
  { name: 'Illinois State Bar Association', logo: '/state-bar/illinois-bar.png' },
  { name: 'State Bar of New Mexico', logo: '/state-bar/nm-state.png' },
  { name: 'American Bar Association', logo: '/state-bar/aba-state.png' },
  { name: 'Rama Judicial de Puerto Rico', logo: '/state-bar/pr-state.png' },
  { name: 'CD State Bar', logo: '/state-bar/cd-state.png' },
];

const DESKTOP_DURATION = 35; 
const MOBILE_DURATION = 20;

export default function HeroProfessional() {
  const { t, language } = useLanguage();
  const containerRef = useRef(null);
  
  const [showPopup, setShowPopup] = useState(true);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize(); 
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  const getLogoSize = (logoName: string) => {
    if (logoName.includes('aba-state')) return { height: 80, width: 180, containerHeight: 'h-20' };
    if (logoName.includes('illinois-bar') || logoName.includes('nm-state')) return { height: 140, width: 280, containerHeight: 'h-32' };
    if (logoName.includes('Chicago-bar')) return { height: 130, width: 250, containerHeight: 'h-30' };
    return { height: 120, width: 240, containerHeight: 'h-28' };
  };

  const getExtraMargin = (logoName: string) => {
    if (logoName.includes('illinois-bar')) return 'ml-16';
    if (logoName.includes('nm-state')) return 'ml-36';
    if (logoName.includes('aba-state')) return 'ml-20';
    if (logoName.includes('pr-state')) return 'ml-20';
    return '';
  };

  const marqueeItems = [...associations, ...associations, ...associations];
  const carouselDuration = isDesktop ? DESKTOP_DURATION : MOBILE_DURATION;

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 150]);

  return (
    <section 
      ref={containerRef}
      className={`relative min-h-screen w-full flex flex-col justify-center bg-[#001540] overflow-hidden ${font.className} pt-36 lg:pt-44 pb-72`}
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden transform-gpu">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        
        <motion.div
            initial={{ x: "60%" }} 
            animate={isDesktop ? { x: "-160%" } : { x: "0%" }}
            style={{ willChange: "transform", transform: "translateZ(0)" }}
            transition={{ 
              duration: 80, 
              repeat: Infinity, 
              ease: "linear",
              repeatType: "loop"
            }}
            className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none"
        >
            <span className={`text-[120vh] lg:text-[160vh] leading-none font-extrabold italic text-white tracking-tighter mix-blend-overlay transform -skew-x-12 ${font.className}`}>
                  N/\И/\
            </span>
        </motion.div>

        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          className={`absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-blue-600/20 rounded-full ${isDesktop ? 'blur-[80px]' : 'blur-[40px]'} translate-z-0`} 
        />
        <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          className={`absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/20 rounded-full ${isDesktop ? 'blur-[90px]' : 'blur-[45px]'} translate-z-0`} 
        />
        
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex-grow flex flex-col justify-center">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <motion.div 
            className="lg:col-span-5 w-full relative h-[500px] lg:h-[750px] flex items-end justify-center perspective-[1000px] mt-0 lg:mt-0"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent blur-2xl rounded-full z-0 opacity-80" />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50, rotateY: 5, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: -80, x: 0, rotateY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transform: "translateZ(0)" }}
              className="relative z-10 w-full h-full origin-bottom flex justify-center"
            >
               <div className="w-full h-full lg:scale-[1.5] lg:-translate-x-24 lg:origin-bottom transition-transform duration-1000 transform-gpu">
                  <div className="relative w-full h-full">
                    <Image
                      src="/manuelsolisl.png"
                      alt="Abogado Manuel Solis"
                      fill
                      className="object-contain object-bottom drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
               </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.8, duration: 1 }}
                className="absolute bottom-10 left-0 right-0 mx-auto w-fit lg:mx-0 lg:left-auto lg:right-0 z-40 p-6 border border-white/10 rounded-xl backdrop-blur-md bg-white/10 shadow-xl text-right min-w-[180px]"
            >
                <div className="group">
                  <div className="flex items-baseline text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-sky-200/50 justify-end">
                    <span className="text-5xl font-extralight tracking-tighter">35</span> 
                    <span className="text-3xl font-thin text-[#B2904D] ml-2 group-hover:rotate-12 transition-transform">+</span>
                  </div>
                  <p className="text-xs text-white/60 uppercase tracking-[0.2em] mt-2 font-medium">
                    {language === 'es' ? 'Años de Experiencia' : 'Years Experience'}
                  </p>
                </div>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-7 w-full space-y-8 lg:space-y-10 pl-0 lg:pl-16 relative z-20 lg:-mt-20">
            
            <motion.div 
              initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.5, delay: 0.5 }}
              className="absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-sky-500/30 to-transparent origin-top hidden lg:block" 
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 30 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              transition={{ delay: 0.3, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
              className="relative overflow-visible"
            >
              <div className="absolute -inset-20 bg-gradient-radial from-[#B2904D]/20 via-sky-500/10 to-transparent blur-[60px] -z-10 opacity-60" />

              {isDesktop && [...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#B2904D]/30 rounded-full"
                  style={{ left: `${20 + i * 12}%`, top: `${30 + (i % 3) * 20}%` }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.5, 0]
                  }}
                  transition={{
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }}
                />
              ))}

              <div className="relative flex flex-col items-center lg:items-start overflow-visible">
                
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="mb-2 lg:mb-3"
                >
                  <span className="text-2xl md:text-3xl lg:text-4xl font-light text-white/60 uppercase tracking-[0.3em] relative">
                    {language === 'es' ? 'Más de' : 'More than'}
                  </span>
                </motion.div>

                <div className="relative w-full overflow-visible pl-4 pr-12 lg:pr-16 py-4">
                  <div className="absolute inset-0 text-[6rem] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-[#B2904D]/15 blur-xl flex items-center justify-center lg:justify-start pl-4 pr-12 lg:pr-16">
                    50,000
                  </div>
                  
                  <motion.div 
                    className="relative text-[6rem] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter leading-none flex items-center justify-center lg:justify-start w-full"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #B2904D 20%, #FFD700 40%, #ffffff 60%, #B2904D 80%, #ffffff 100%)',
                      backgroundSize: '300% 300%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      willChange: "background-position",
                      filter: 'drop-shadow(0 0 25px rgba(178,144,77,0.4))'
                    }}
                    animate={isDesktop ? {
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    } : {
                        backgroundPosition: '0% 50%'
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    50,000
                  </motion.div>

                  {isDesktop && (
                    <motion.div
                        className="absolute inset-0 text-[6rem] md:text-[8rem] lg:text-[10rem] font-black tracking-tighter flex items-center justify-center lg:justify-start pointer-events-none w-full pl-4 pr-12 lg:pr-16 py-4"
                        style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        willChange: 'background-position'
                        }}
                        animate={{
                        backgroundPosition: ['-200% 0', '200% 0']
                        }}
                        transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatDelay: 2
                        }}
                    >
                        50,000
                    </motion.div>
                  )}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9, duration: 1 }}
                  className="mt-4 lg:mt-6 relative"
                >
                  <div className="relative inline-block">
                    <p className="text-xl md:text-2xl lg:text-3xl text-white uppercase tracking-[0.4em] font-light">
                      {language === 'es' ? 'Casos Ganados' : 'Cases Won'}
                    </p>
                    
                    <motion.div
                      className="absolute inset-0 text-xl md:text-2xl lg:text-3xl uppercase tracking-[0.4em] font-light blur-sm"
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      style={{ color: '#38bdf8' }}
                    >
                      {language === 'es' ? 'Casos Ganados' : 'Cases Won'}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeInOut" }}
              className="w-full max-w-md mx-auto lg:mx-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent origin-left"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1 }}
              className="space-y-8"
            >
              {/* --- SEO FIX: H1 HEADER IMPLEMENTED --- */}
              <h1 className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6">
                <span className="relative text-3xl md:text-4xl lg:text-5xl font-light text-white/90">
                  {language === 'es' ? 'Inmigración' : 'Immigration'}
                </span>
                <span className="text-4xl md:text-5xl font-thin text-[#B2904D]"> & </span>
                <span className="relative text-3xl md:text-4xl lg:text-5xl font-light text-white/90">
                  {language === 'es' ? 'Accidentes' : 'Accidents'}
                </span>
              </h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1.5 }}
                className="relative"
              >
                <p className="text-2xl md:text-3xl lg:text-4xl text-white/70 font-light italic text-center lg:text-left tracking-wide relative z-10">
                  {language === 'es' ? 'Inspirados por la gracia de Dios' : 'Inspired by the grace of God'}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-30 w-full border-t border-white/5 bg-transparent pt-12 pb-24">
        <div className="relative w-full overflow-hidden mask-linear-fade">
           <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#001540] to-transparent z-20" />
           <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#001540] to-transparent z-20" />
           
           <motion.div 
             className="flex items-center gap-80 whitespace-nowrap" 
             style={{ willChange: "transform" }}
             animate={{ x: ["0%", "-33.333%"] }}
             transition={{ duration: carouselDuration, repeat: Infinity, ease: "linear" }}
           >
             {marqueeItems.map((assoc, idx) => {
               const size = getLogoSize(assoc.logo);
               const extraMargin = getExtraMargin(assoc.logo);
               
               return (
                 <div key={idx} className={`flex items-center justify-center opacity-50 ${extraMargin}`}>
                   <div className={`relative ${size.containerHeight} w-auto flex-shrink-0 filter grayscale brightness-[1.5] contrast-[1.2]`}>
                       <Image 
                         src={assoc.logo} 
                         alt={assoc.name} 
                         height={size.height} 
                         width={size.width} 
                         className="h-full w-auto object-contain drop-shadow-sm"
                         loading="lazy"
                       />
                   </div>
                 </div>
               );
             })}
           </motion.div>
        </div>
      </div>

      {showPopup && (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
            className="absolute top-24 right-4 md:top-32 md:right-10 z-50 w-[90%] max-w-sm md:w-auto p-6 rounded-2xl bg-red-900/80 backdrop-blur-md border border-red-500/30 shadow-xl group"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent rounded-2xl opacity-50 pointer-events-none" />
            <div className="relative z-10">
                <h3 className="text-xl font-bold mb-1 text-red-50 drop-shadow-md">
                    {language === 'es' ? '¿Familiar Detenido?' : 'Detained Relative?'}
                </h3>
                <p className="text-sm font-medium text-red-100/90 mb-4">
                    {language === 'es' ? 'Indica cómo podemos ayudarte:' : 'Tell us how we can help:'}
                </p>
                <div className="space-y-3">
                    <a href="tel:+18000000000" className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-red-800/40 hover:bg-red-700/60 border border-red-400/20 hover:border-red-400/50 transition-all duration-300 group/btn">
                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-red-500/20 text-red-200 text-xs font-bold group-hover/btn:bg-red-500 group-hover/btn:text-white transition-colors">✓</span>
                        <span className="text-sm text-white font-light">{language === 'es' ? 'Sí, soy cliente' : 'Yes, I am a client'}</span>
                    </a>
                    <a href="tel:+18000000000" className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-red-800/40 hover:bg-red-700/60 border border-red-400/20 hover:border-red-400/50 transition-all duration-300 group/btn">
                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-red-500/20 text-red-200 text-xs font-bold group-hover/btn:bg-red-500 group-hover/btn:text-white transition-colors">✓</span>
                        <span className="text-sm text-white font-light">{language === 'es' ? 'Sí, pero no soy cliente' : 'Yes, but I am not a client'}</span>
                    </a>
                </div>
                <button onClick={() => setShowPopup(false)} className="block w-full text-center mt-4 text-xs text-red-200/50 hover:text-white underline decoration-red-200/30 hover:decoration-white transition-all">
                    {language === 'es' ? 'Continuar al sitio' : 'Continue to site'}
                </button>
            </div>
        </motion.div>
      )}

      <style jsx global>{`
        .mask-linear-fade {   
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </section>
  );
}