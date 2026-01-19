'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { Outfit } from 'next/font/google'
import { usePathname } from 'next/navigation'
import { track } from '@vercel/analytics/react' // 👈 Importamos track
import { officesPhoneMap, DEFAULT_PHONE, DEFAULT_PHONE_LINK } from './officesPhoneMap'

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['200', '300', '400', '500', '600', '700', '800'] 
})

const FlagES = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-3 w-3 rounded-[1px] flex-shrink-0 opacity-90">
    <path fill="#AA151B" d="M0 0h512v512H0z"/>
    <path fill="#F1BF00" d="M0 128h512v256H0z"/>
  </svg>
);

const FlagUS = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-3 w-3 rounded-[1px] flex-shrink-0 opacity-90">
    <path fill="#BD3D44" d="M0 0h512v512H0z"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.3h512M0 129h512M0 202.7h512M0 276.3h512M0 350h512M0 423.7h512"/>
    <path fill="#192F5D" d="M0 0h249.1v249.1H0z"/>
  </svg>
);

export default function HeaderProfessional() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Obtener el teléfono dinámico basado en la ruta actual
  const { phoneNumber, phoneLink } = useMemo(() => {
    // Verificación de seguridad para pathname
    const currentPath = pathname || '';
    const officeMatch = currentPath.match(/\/oficinas\/([^/]+)/);
    const officeSlug = officeMatch?.[1];
    
    if (officeSlug && officesPhoneMap[officeSlug]) {
      const phone = officesPhoneMap[officeSlug];
      return {
        phoneNumber: phone,
        phoneLink: `tel:${phone.replace(/\D/g, '')}`
      };
    }
    
    return {
      phoneNumber: DEFAULT_PHONE,
      phoneLink: DEFAULT_PHONE_LINK
    };
  }, [pathname]);

  // --- ⚡️ EVENTO DE RASTREO DE LLAMADA ⚡️ ---
  const handleCallClick = () => {
    // Enviamos el evento a Vercel
    track('Call Header Click', {
      phoneNumber: phoneNumber,
      location: 'header_main',
      page: pathname || 'unknown',
      timestamp: new Date().toISOString()
    });
    console.log(`Event tracked: Call Click on ${phoneNumber}`);
  };

  const callText = language === 'es' ? 'Llámanos para una consulta:' : 'Call for a consultation:';
  const joinInText = language === 'es' ? 'REGÍSTRATE' : 'REGISTER';

  useMotionValueEvent(scrollY, "change", (latest) => {
    const shouldBeScrolled = latest > 20;
    if (isScrolled !== shouldBeScrolled) {
        setIsScrolled(shouldBeScrolled);
    }
  });

  const menuItems = [
    { 
      name: language === 'es' ? 'Servicios' : 'Services',
      href: '', 
      type: 'dropdown',
      key: 'services',
      submenu: language === 'es'
        ? [
            { name: 'Inmigración', href: `/${language}/servicios/inmigracion` },
            { name: 'Accidentes', href: `/${language}/servicios/accidentes` },
            { name: 'Seguros', href: `/${language}/servicios/seguros` },
            { name: 'Ley Criminal', href: `/${language}/servicios/ley-criminal` },
            { name: 'Familia', href: `/${language}/servicios/familia` },
          ]
        : [
            { name: 'Immigration', href: `/${language}/servicios/inmigracion` },
            { name: 'Accidents', href: `/${language}/servicios/accidentes` },
            { name: 'Insurance', href: `/${language}/servicios/seguros` },
            { name: 'Criminal Law', href: `/${language}/servicios/ley-criminal` },
            { name: 'Family', href: `/${language}/servicios/familia` },
          ]
    },
    {
      name: language === 'es' ? 'Detenidos' : 'Detained',
      href: `/${language}/clientes-detenidos`,
      type: 'link'
    },
    { 
      name: language === 'es' ? 'Oficinas' : 'Offices',
      href: `/${language}/oficinas`, 
      type: 'dropdown',
      key: 'offices',
      submenu: [
        { name: 'Houston Principal', href: `/${language}/oficinas/houston-principal` },
        { name: 'Houston Main St', href: `/${language}/oficinas/main-st` },
        { name: 'Houston North Loop', href: `/${language}/oficinas/north-loop` },
        { name: 'Houston Northchase', href: `/${language}/oficinas/northchase` },
        { name: 'Houston Bellaire', href: `/${language}/oficinas/houston-bellaire` },
        { name: 'Houston (Kirby)', href: `/${language}/oficinas/kirby` },
        { name: 'Dallas', href: `/${language}/oficinas/dallas` },
        { name: 'El Paso', href: `/${language}/oficinas/el-paso` },
        { name: 'Harlingen', href: `/${language}/oficinas/harlingen` },
        { name: 'Chicago', href: `/${language}/oficinas/chicago` },
        { name: 'Los Angeles', href: `/${language}/oficinas/losangeles` },
        { name: 'Arvada (Denver)', href: `/${language}/oficinas/arvada` },
        { name: 'Memphis', href: `/${language}/oficinas/memphis` },
        { name: 'Memphis Airways', href: `/${language}/oficinas/airways` },
        { name: 'League City', href: `/${language}/oficinas/league-city` },
        { name: 'Houston Navigation', href: `/${language}/oficinas/houston-navigation` },
      ]
    },
    {
      name: language === 'es' ? 'Testimonios' : 'Testimonials',
      href: `/${language}/Testimonios`,
      type: 'link'
    },
    { 
      name: language === 'es' ? 'Abogados' : 'Attorneys',
      href: '', 
      type: 'dropdown',
      key: 'attorneys',
      submenu: language === 'es'
        ? [
            { name: 'Nuestro Equipo', href: `/${language}/abogados` },
            { name: 'Sobre Nosotros', href: `/${language}/nosotros` },
            { name: 'Preguntas Frecuentes', href: `/${language}/informacion/faq` },
          ]
        : [
            { name: 'Our Team', href: `/${language}/abogados` },
            { name: 'About Us', href: `/${language}/nosotros` },
            { name: 'FAQ', href: `/${language}/informacion/faq` },
          ]
    },
    { 
      name: language === 'es' ? 'Acceso a clientes' : 'Client access',
      href: 'https://solislawfirm.com',
      type: 'external' 
    },
  ];

  const toggleLang = (lang: 'es' | 'en') => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
    setIsMenuOpen(false);
  };

  const renderLink = (item: typeof menuItems[0], isMobile: boolean = false) => {
    if (item.type === 'external') {
      return (
        <a 
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => isMobile && setIsMenuOpen(false)}
          className={`
            ${isMobile ? 
              'block text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em]' : 
              'text-[12px] font-light uppercase tracking-[0.2em] text-white/95 group-hover:text-white transition-all duration-300 drop-shadow-sm'
            }
          `}
        >
          {item.name}
        </a>
      );
    }

    return (
      <Link 
        href={item.href}
        onClick={() => isMobile && setIsMenuOpen(false)}
        className={`
          ${isMobile ? 
            'block text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em]' : 
            'text-[12px] font-light uppercase tracking-[0.2em] text-white/95 group-hover:text-white transition-all duration-300 drop-shadow-sm'
          }
        `}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 w-full flex flex-col ${font.className}`}
        style={{ willChange: "transform, background-color, backdrop-filter" }}
        initial={{ backgroundColor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)' }}
        animate={{
          backgroundColor: isScrolled ? 'rgba(5, 15, 30, 0.85)' : 'rgba(0,0,0,0)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div 
          className="w-full transition-all duration-300 relative z-[60]"
          style={{ 
            paddingTop: isScrolled ? '0.5rem' : '0.75rem', 
            paddingBottom: isScrolled ? '0.5rem' : '0.75rem' 
          }}
        >
          <div className="container mx-auto px-6 lg:px-12 flex items-center">
            
            <Link href={`/${language}`} className="relative z-50 mr-12 lg:mr-16">
              <div className={`relative transition-all duration-500 ease-in-out ${isScrolled ? 'w-[140px]' : 'w-[190px]'}`}>
                <Image
                  src="/logo-manuel-solis.png" 
                  alt="Logo Manuel Solis"
                  width={200} 
                  height={65}
                  className="w-full h-auto object-contain opacity-100" 
                  priority
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center">
              <nav className="flex items-center gap-6 xl:gap-8">
                {menuItems.map((item) => (
                  <div key={item.name} className="relative group">
                    <div className="flex items-center gap-1 cursor-pointer py-3">
                      {item.submenu ? (
                        <span className="text-[12px] font-light uppercase tracking-[0.2em] text-white/95 group-hover:text-white transition-colors duration-200">
                          {item.name}
                        </span>
                      ) : item.type === 'external' ? (
                        renderLink(item)
                      ) : (
                        <Link 
                          href={item.href}
                          className="text-[12px] font-light uppercase tracking-[0.2em] text-white/95 group-hover:text-white transition-colors duration-200"
                        >
                          {item.name}
                        </Link>
                      )}
                      {item.submenu && (
                        <ChevronDown className="w-2.5 h-2.5 text-white/60 group-hover:text-white transition-transform duration-300 group-hover:rotate-180" />
                      )}
                    </div>
                    
                    <span className="absolute bottom-1 left-0 w-0 h-[0.5px] bg-sky-200 transition-all duration-300 ease-out group-hover:w-full" />

                    {item.submenu && (
                      <div className="absolute top-full left-0 pt-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 perspective-[1000px]">
                        <div className="min-w-[260px] bg-[#0b1c33]/90 backdrop-blur-md rounded-xl shadow-xl py-4 px-2 border border-white/10 transform origin-top max-h-[80vh] overflow-y-auto scrollbar-hide">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="group/item flex items-center px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200"
                            >
                              <span className="text-[12px] font-light text-gray-200 group-hover/item:text-white uppercase tracking-[0.15em] transition-colors duration-200">
                                {subItem.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            <div className="hidden lg:flex items-center gap-6 ml-auto">
              <div className="h-6 w-[0.5px] bg-white/20" />

              <div className="relative group">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 text-[10px] font-light text-white/80 hover:text-white uppercase tracking-[0.2em] transition-colors duration-200"
                >
                  {language === 'es' ? <FlagES /> : <FlagUS />}
                  <span>{language === 'es' ? 'ES' : 'EN'}</span>
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-4 w-32 bg-[#0b1c33]/95 backdrop-blur-md rounded-xl shadow-xl border border-white/10 overflow-hidden p-1"
                    >
                      <button onClick={() => toggleLang('es')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                        <FlagES /> <span className="text-[10px] font-light text-white tracking-widest">ESP</span>
                      </button>
                      <button onClick={() => toggleLang('en')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 rounded-lg transition-colors">
                        <FlagUS /> <span className="text-[10px] font-light text-white tracking-widest">ENG</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link 
                  href={`/${language}/join-in`}
                  className="text-[10px] font-medium uppercase tracking-[0.15em] bg-[#B2904D] text-[#001026] px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90 shadow-sm hover:translate-y-[-1px]"
              >
                {joinInText}
              </Link>
            </div>

            {/* --- 3. BOTÓN MÓVIL CON CLICK --- */}
            <div className="lg:hidden flex items-center gap-4 ml-auto">
              {/* ✅ AQUÍ AÑADÍ EL EVENTO DE CLICK PARA MÓVIL */}
              <a 
                href={phoneLink}
                onClick={handleCallClick} 
                className="flex items-center gap-2 text-sky-300 hover:text-white transition-colors"
                aria-label="Call us"
              >
                <Phone size={16} />
                <span className="text-xs font-medium tracking-wider">{phoneNumber}</span>
              </a>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-sky-300 transition-colors"
              >
                {isMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- 4. BARRA SUPERIOR ESCRITORIO CON CLICK --- */}
        <div className="hidden lg:flex justify-center w-full relative z-50">
          <div className="px-16 py-1.5 relative overflow-hidden group border-b-[2px] border-[#009b3a]">
            {/* ✅ AQUÍ AÑADÍ EL EVENTO DE CLICK PARA ESCRITORIO */}
            <a 
              href={phoneLink}
              onClick={handleCallClick}
              className="flex items-center justify-center gap-4 cursor-pointer transition-all duration-300 group/link"
            >
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/90 font-semibold pt-[2px]">
                {callText}
              </span>
              
              <div className="flex items-center gap-2.5">
                  <Phone className="w-5 h-5 text-white transition-transform duration-300 group-hover/link:scale-110" fill="currentColor" />
                  
                  <span 
                    className="text-xl font-extrabold tracking-widest text-white transition-all duration-300"
                  >
                    {phoneNumber}
                  </span>
              </div>
            </a>
          </div>
        </div>

      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 bg-[#051120]/98 backdrop-blur-md lg:hidden ${font.className}`}
          >
            <div className="flex flex-col pt-24 px-8 h-full">
              <nav className="flex flex-col space-y-6 overflow-y-auto max-h-[80vh] pb-10">
                {menuItems.map((item) => (
                  <div key={item.name} className="border-b border-white/5 pb-4 group">
                    <div 
                      className="flex justify-between items-center text-white/90 group-hover:text-white text-lg font-thin uppercase tracking-[0.2em] cursor-pointer"
                      onClick={() => item.submenu && setOpenSubmenu(openSubmenu === item.key ? null : item.key)}
                    >
                      {item.submenu ? (
                        <span>{item.name}</span>
                      ) : (
                        renderLink(item, true)
                      )}
                      {item.submenu && <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openSubmenu === item.key ? 'rotate-180' : 'opacity-50'}`} />}
                    </div>
                    
                    <AnimatePresence>
                      {item.submenu && openSubmenu === item.key && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden mt-3 ml-2 border-l-[0.5px] border-white/10 pl-5 space-y-3 pt-2"
                        >
                          {item.submenu.map(sub => (
                            <Link 
                              key={sub.name} 
                              href={sub.href} 
                              onClick={() => setIsMenuOpen(false)}
                              className="block text-xs text-gray-400 font-light uppercase tracking-[0.15em] hover:text-white transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                
                <div className="pt-4 flex flex-col gap-4">
                    <Link 
                      href={`/${language}/join-in`}
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full text-center text-[14px] font-medium uppercase tracking-[0.2em] bg-[#B2904D] text-[#001026] px-4 py-3 rounded-xl transition-all duration-300 hover:opacity-90 shadow-md"
                    >
                      {language === 'es' ? 'INICIAR CONSULTA' : 'START CONSULTATION'}
                    </Link>

                    <div className="flex gap-4">
                      <button onClick={() => toggleLang('es')} className={`text-xs tracking-widest ${language === 'es' ? 'text-white font-medium' : 'text-gray-500'}`}>ES</button>
                      <div className="w-[1px] h-4 bg-white/20"></div>
                      <button onClick={() => toggleLang('en')} className={`text-xs tracking-widest ${language === 'en' ? 'text-white font-medium' : 'text-gray-500'}`}>EN</button>
                    </div>
                </div>

              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}