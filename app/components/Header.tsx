'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

// --- COLORES ORIGINALES ---
const PRIMARY_COLOR_ORIGINAL = '#B2904D'; // Dorado (fondo principal)
const ACCENT_COLOR_DARK = '#002342'; // Azul Oscuro (texto principal y hover)

// --- Banderas SVG ---
const FlagES = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-3.5 w-3.5 rounded-[1px] flex-shrink-0 shadow-sm">
    <path fill="#AA151B" d="M0 0h512v512H0z"/>
    <path fill="#F1BF00" d="M0 128h512v256H0z"/>
    <path fill="#AA151B" d="M64 192h128v128H64z"/>
    <path fill="#F1BF00" d="M80 208h96v96H80z"/>
    <circle cx="128" cy="256" r="24" fill="#AA151B"/>
  </svg>
);

const FlagUS = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-3.5 w-3.5 rounded-[1px] flex-shrink-0 shadow-sm">
    <path fill="#BD3D44" d="M0 0h512v512H0z"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.3h512M0 129h512M0 202.7h512M0 276.3h512M0 350h512M0 423.7h512"/>
    <path fill="#192F5D" d="M0 0h249.1v249.1H0z"/>
    <g fill="#fff">
      <path d="M38.8 17l2.5 7.8h8.2l-6.6 4.8 2.5 7.8-6.6-4.8-6.6 4.8 2.5-7.8-6.6-4.8h8.2zM77.6 17l2.5 7.8h8.2l-6.6 4.8 2.5 7.8-6.6-4.8-6.6 4.8 2.5-7.8-6.6-4.8h8.2zM116.4 17l2.5 7.8h8.2l-6.6 4.8 2.5 7.8-6.6-4.8-6.6 4.8 2.5-7.8-6.6-4.8h8.2zM155.2 17l2.5 7.8h8.2l-6.6 4.8 2.5 7.8-6.6-4.8-6.6 4.8 2.5-7.8-6.6-4.8h8.2zM194 17l2.5 7.8h8.2l-6.6 4.8 2.5 7.8-6.6-4.8-6.6 4.8 2.5-7.8-6.6-4.8h8.2z"/>
    </g>
  </svg>
);

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const menuItems = [
    { 
      name: language === 'es' ? 'OFICINAS' : 'OFFICES',
      href: '', // Vacío porque ahora es dropdown
      type: 'dropdown', // CAMBIADO A DROPDOWN
      key: 'oficinas',
      submenu: language === 'es'
        ? [
            { name: 'Los Ángeles', href: `/${language}/oficinas/abogados-inmigracion-los-angeles` },
            { name: 'Arvada', href: `/${language}/oficinas/arvada` },
            { name: 'Chicago', href: `/${language}/oficinas/chicago` },
            { name: 'Dallas', href: `/${language}/oficinas/dallas` },
            { name: 'El Paso', href: `/${language}/oficinas/el-paso` },
            { name: 'Harlingen', href: `/${language}/oficinas/harlingen` },
            { name: 'Houston Bellaire', href: `/${language}/oficinas/houston-bellaire` },
            { name: 'Houston Oficina Principal', href: `/${language}/oficinas/houston-principal-office` },
            { name: 'Memphis', href: `/${language}/oficinas/memphis` },
        ]
        : [
            { name: 'View All', href: `/${language}/oficinas` },
            { name: 'Los Angeles', href: `/${language}/oficinas/abogados-inmigracion-los-angeles` },
            { name: 'Arvada', href: `/${language}/oficinas/arvada` },
            { name: 'Chicago', href: `/${language}/oficinas/chicago` },
            { name: 'Dallas', href: `/${language}/oficinas/dallas` },
            { name: 'El Paso', href: `/${language}/oficinas/el-paso` },
            { name: 'Harlingen', href: `/${language}/oficinas/harlingen` },
            { name: 'Houston Bellaire', href: `/${language}/oficinas/houston-bellaire` },
            { name: 'Houston Principal Office', href: `/${language}/oficinas/houston-principal-office` },
            { name: 'Memphis', href: `/${language}/oficinas/memphis` },
        ]
    },
    { 
      name: language === 'es' ? 'ÁREAS LEGALES' : 'LEGAL AREAS',
      href: '', 
      type: 'dropdown',
      key: 'areas',
      submenu: language === 'es'
        ? [
          { name: 'Accidentes', href: `/${language}/servicios/accidentes` },
          { name: 'Migración', href: `/${language}/servicios/inmigracion` },
          { name: 'Seguros', href: `/${language}/servicios/seguros` },
          { name: 'Ley Criminal', href: `/${language}/servicios/ley-criminal` },
          { name: 'Familia', href: `/${language}/servicios/familia` },
          { name: 'Planificación Familiar', href: `/${language}/servicios/planificacion` },
        ]
        : [
          { name: 'Accidents', href: `/${language}/servicios/accidentes` },
          { name: 'Immigration', href: `/${language}/servicios/inmigracion` },
          { name: 'Insurance', href: `/${language}/servicios/seguros` },
          { name: 'Criminal Law', href: `/${language}/servicios/ley-criminal` },
          { name: 'Family', href: `/${language}/servicios/familia` },
          { name: 'Estate Planning', href: `/${language}/servicios/planificacion` },
        ]
    },
    {
      name: language === 'es' ? 'CLIENTES DETENIDOS' : 'DETAINED CLIENTS',
      href: `/${language}/clientes-detenidos`,
      type: 'link'
    },
    {
      name: language === 'es' ? 'TESTIMONIOS' : 'TESTIMONIALS',
      href: `/${language}/Testimonios`,
      type: 'link'
    },
    { 
      name: language === 'es' ? 'ABOGADOS' : 'ATTORNEYS',
      href: `/${language}/abogados`,
      type: 'link'
    },
    { 
      name: language === 'es' ? 'INFORMACIÓN' : 'INFORMATION',
      href: '', 
      type: 'dropdown',
      key: 'info',
      submenu: language === 'es'
        ? [
          { name: 'Recursos', href: `/${language}/informacion/recursos` },
          { name: 'Noticias', href: `/${language}/informacion/noticias` },
          { name: 'Preguntas Frecuentes', href: `/${language}/informacion/faq` }
        ]
        : [
          { name: 'Resources', href: `/${language}/informacion/recursos` },
          { name: 'News', href: `/${language}/informacion/noticias` },
          { name: 'FAQ', href: `/${language}/informacion/faq` }
        ]
    },
  ]

  const handleDropdownClick = (key: string, hasSubmenu: boolean) => {
    if (hasSubmenu) {
        setOpenSubmenu(openSubmenu === key ? null : key);
    } else {
        setIsMenuOpen(false);
        setOpenSubmenu(null);
    }
  };

  const toggleLang = (lang: 'es' | 'en') => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <header 
        className="fixed top-0 w-full z-50 shadow-lg transition-all duration-300"
        style={{ backgroundColor: PRIMARY_COLOR_ORIGINAL }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Aumenté el padding vertical a py-4 en móvil y py-5 en desktop.
            Esto le da más "cuerpo" sin ser excesivo.
        */}
        <div className="flex items-center justify-between py-4 lg:py-5 transition-all duration-300"> 
          
          {/* Logo */}
          {/* Tamaño ajustado para que se vea bien en el nuevo alto */}
          <Link href={`/${language}`} className="flex-shrink-0 mr-4 lg:mr-8 group">
            <Image
              src="/logo-manuel-solis.png" 
              alt="Logo Manuel Solis"
              width={240} 
              height={70}
              className="h-10 w-auto lg:h-14 transition-opacity group-hover:opacity-90" 
              priority
            />
          </Link>

          {/* --- MENÚ DE ESCRITORIO --- */}
          {/* Estrategia Responsiva:
             - lg:space-x-5 (espacio apretado en laptops pequeñas para evitar solapamiento)
             - xl:space-x-8 (espacio normal en monitores grandes)
          */}
          <nav className="hidden lg:flex items-center lg:space-x-5 xl:space-x-8 flex-1 justify-end"> 
            {menuItems.map((item) => (
              <div 
                key={item.name} 
                className="relative group h-full flex items-center" 
              >
                {item.type === 'dropdown' ? (
                    <div
                        className={`text-white hover:text-[#002342] font-light transition-colors uppercase cursor-pointer flex items-center tracking-widest group-hover:font-medium whitespace-nowrap
                                    lg:text-xs xl:text-sm`} // Texto más pequeño en LG, normal en XL
                        style={{ color: 'white' }}
                    >
                        {item.name}
                        <ChevronDown size={14} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
                    </div>
                ) : (
                    <Link
                        href={item.href}
                        className={`text-white hover:text-[#002342] font-light transition-colors uppercase tracking-widest group-hover:font-medium whitespace-nowrap
                                    lg:text-xs xl:text-sm`} // Texto más pequeño en LG, normal en XL
                        style={{ color: 'white' }}
                    >
                        {item.name}
                    </Link>
                )}

                {/* Submenú de escritorio */}
                {item.submenu && (
                  <div className="absolute right-0 top-full pt-6 w-60 
                                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                                  transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto">
                    <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100 py-3 overflow-hidden ring-1 ring-black/5">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-6 py-3 text-[#002342] hover:bg-[#002342]/5 hover:text-[#B2904D] transition-colors text-xs font-light uppercase tracking-wide hover:font-medium"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* --- LANGUAGE SWITCHER ESCRITORIO --- */}
            <div className="relative ml-4 pl-4 border-l border-white/20">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 bg-black/10 hover:bg-black/20 text-white rounded-full px-3 py-1.5 transition-all duration-300 border border-transparent hover:border-white/10"
              >
                {language === 'es' ? <FlagES /> : <FlagUS />}
                <span className="text-xs font-light tracking-wider uppercase">{language === 'es' ? 'Español' : 'English'}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-3 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => toggleLang('es')}
                    className={`w-full flex items-center space-x-3 px-5 py-3 text-xs text-left transition-colors ${language === 'es' ? 'bg-[#B2904D]/10 text-[#B2904D] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <FlagES />
                    <span className="uppercase tracking-wide">Español</span>
                  </button>
                  <button
                    onClick={() => toggleLang('en')}
                    className={`w-full flex items-center space-x-3 px-5 py-3 text-xs text-left transition-colors ${language === 'en' ? 'bg-[#B2904D]/10 text-[#B2904D] font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <FlagUS />
                    <span className="uppercase tracking-wide">English</span>
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* --- BOTÓN MENÚ MÓVIL --- */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 border border-white/30 rounded-md hover:bg-white/10 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* --- MENÚ MÓVIL DESPLEGADO --- */}
        <div 
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isMenuOpen ? 'max-h-[85vh] opacity-100 shadow-2xl' : 'max-h-0 opacity-0'}`}
            style={{ backgroundColor: PRIMARY_COLOR_ORIGINAL }}
        >
          <nav className="pb-8 pt-4 px-4 overflow-y-auto max-h-[80vh]">
            {menuItems.map((item) => (
              <div key={item.name} className="border-b border-white/10 last:border-b-0">
                <div
                    className="flex items-center justify-between group"
                    onClick={() => handleDropdownClick(item.key || item.name, !!item.submenu)}
                >
                    <Link
                        href={item.submenu ? '' : item.href} 
                        className={`block py-4 text-white font-light text-lg hover:text-[#002342] transition-colors tracking-wider uppercase ${item.submenu ? 'w-full' : ''}`}
                        onClick={item.submenu ? (e) => e.preventDefault() : () => handleDropdownClick(item.name, false)}
                    >
                        {item.name}
                    </Link>
                    {item.submenu && (
                        <ChevronDown 
                            size={20} 
                            className={`text-white transition-transform duration-300 ${openSubmenu === item.key ? 'rotate-180' : ''}`}
                        />
                    )}
                </div>

                {/* Submenú móvil */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openSubmenu === item.key ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-4 border-l-2 border-white/20 ml-2 space-y-1">
                    {item.submenu?.map((subItem) => (
                        <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block py-3 text-white/80 hover:text-[#002342] text-sm font-light transition-colors uppercase tracking-wide"
                        onClick={() => setIsMenuOpen(false)}
                        >
                        {subItem.name}
                        </Link>
                    ))}
                    </div>
                </div>
              </div>
            ))}
            
            {/* Language Switcher Móvil */}
            <div className="py-8 mt-4 border-t border-white/20">
              <p className="text-white/60 text-xs mb-4 font-light tracking-[0.2em] uppercase text-center">
                {language === 'es' ? 'Seleccionar Idioma' : 'Select Language'}
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => toggleLang('es')}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-full border transition-all ${language === 'es' ? 'bg-white text-[#B2904D] border-white font-medium shadow-lg' : 'text-white border-white/30 hover:bg-white/10 font-light'}`}
                >
                  <FlagES />
                  <span className="text-xs uppercase tracking-wider">Español</span>
                </button>
                <button
                  onClick={() => toggleLang('en')}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-full border transition-all ${language === 'en' ? 'bg-white text-[#B2904D] border-white font-medium shadow-lg' : 'text-white border-white/30 hover:bg-white/10 font-light'}`}
                >
                  <FlagUS />
                  <span className="text-xs uppercase tracking-wider">English</span>
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}