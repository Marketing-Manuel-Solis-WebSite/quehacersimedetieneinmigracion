'use client';

import { MapPin, Phone, Mail, ExternalLink, Scale } from 'lucide-react'
import Image from 'next/image'
import { motion, Variants, Transition } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext'

// Función auxiliar para generar URLs de Google Maps válidas
const generateMapUrl = (address: string) => {
    // Reemplaza espacios por '+' y usa la URL base de Google Maps
    const encodedAddress = encodeURIComponent(address);
    return `https://maps.google.com/?q=${encodedAddress}`;
};

// --- COLORES DE LA PALETA ---
const PRIMARY_COLOR_DARK = '#002342';
const ACCENT_COLOR_GOLD = '#B2904D';

const offices = [
  // 1. HOUSTON (OFICINA PRINCIPAL)
  {
    city: 'HOUSTON',
    subtitle: 'OFICINA PRINCIPAL',
    address: '6657 Navigation Blvd, Houston, Texas 77011',
    phone: '(713) 701-1731',
    email: 'houston@manuelsolis.com',
    mapUrl: generateMapUrl('6657 Navigation Blvd, Houston, Texas 77011'),
    image: '/offices/houston.jpg',
  },
  // 2. HARLINGEN
  {
    city: 'HARLINGEN',
    subtitle: 'ABOGADO DE INMIGRACIÓN',
    address: '320 E. Jackson St., Harlingen, Texas 78550',
    phone: '(956) 597-7090',
    email: 'harlingen@manuelsolis.com',
    mapUrl: generateMapUrl('320 E. Jackson St., Harlingen, Texas 78550'),
    image: '/offices/houston.jpg',
  },
  // 3. HOUSTON BELLAIRE
  {
    city: 'HOUSTON BELLAIRE',
    subtitle: 'SERVICIO EN CHINO',
    address: '9600 Bellaire Blvd, Suite 237, Houston, TX 77036',
    phone: '(713) 701-1731',
    email: 'bellaire@manuelsolis.com',
    mapUrl: generateMapUrl('9600 Bellaire Blvd, Suite 237, Houston, TX 77036'),
    image: '/offices/houston.jpg',
  },
  {
    city: 'DALLAS',
    subtitle: 'TEXAS',
    address: '1120 Empire Central place, Dallas, Texas 75247',
    phone: '(214) 753-8315',
    email: 'dallas@manuelsolis.com',
    mapUrl: generateMapUrl('1120 Empire Central place, Dallas, Texas 75247'),
    image: '/offices/dallas.jpg',
  },
  {
    city: 'EL PASO',
    subtitle: 'TEXAS',
    address: '3632 Admiral Street, El Paso, Texas 79925',
    phone: '(915) 233-7127',
    email: 'elpaso@manuelsolis.com',
    mapUrl: generateMapUrl('3632 Admiral Street, El Paso, Texas 79925'),
    image: '/offices/dallas.jpg',
  },
  // LOS ANGELES
  {
    city: 'LOS ANGELES',
    subtitle: 'CALIFORNIA',
    address: '8337 Telegraph Rd, Unit 115, Pico Rivera, California 90660',
    phone: '(213) 784-1554',
    email: 'losangeles@manuelsolis.com',
    mapUrl: generateMapUrl('8337 Telegraph Rd, Unit 115, Pico Rivera, California 90660'),
    image: '/offices/losangeles.jpg',
  },
  // CHICAGO
  {
    city: 'CHICAGO',
    subtitle: 'ILLINOIS',
    address: '6000 West Cermak Road, Cicero, Illinois 60804',
    phone: '(312) 477-0389',
    email: 'chicago@manuelsolis.com',
    mapUrl: generateMapUrl('6000 West Cermak Road, Cicero, Illinois 60804'),
    image: '/offices/chicago.jpg',
  },
  // DENVER
  {
    city: 'DENVER',
    subtitle: 'COLORADO',
    address: '5400 Ward Road, Building IV, Arvada, Colorado 80002',
    phone: '(720) 358-8973',
    email: 'denver@manuelsolis.com',
    mapUrl: generateMapUrl('5400 Ward Road, Building IV, Arvada, Colorado 80002'),
    image: '/offices/losangeles.jpg',
  },
  // MEMPHIS
  {
    city: 'MEMPHIS',
    subtitle: 'TENNESSEE',
    address: '3385 Airways Boulevard, Suite 320, Memphis, Tennessee 38116',
    phone: '(901) 557-8357',
    email: 'memphis@manuelsolis.com',
    mapUrl: generateMapUrl('3385 Airways Boulevard, Suite 320, Memphis, Tennessee 38116'),
    image: '/offices/chicago.jpg',
  },
].sort((a, b) => a.city.localeCompare(b.city)) 

// --- VARIANTS CORREGIDAS CON TIPADO EXPLÍCITO ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100
    } as Transition, 
  },
};

// --- COMPONENTE PRINCIPAL ---
export default function Offices() {
  const { language } = useLanguage();

  return (
    <section id="oficinas" className={`py-32 bg-white text-[${PRIMARY_COLOR_DARK}] font-sans`}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* --- ENCABEZADO ESTILO PREMIUM --- */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-gray-200/60 backdrop-blur-xl shadow-sm mb-8">
              <Scale size={14} className={`text-[${ACCENT_COLOR_GOLD}] fill-[${ACCENT_COLOR_GOLD}]`} />
              <span className="text-xs font-bold tracking-[0.2em] text-gray-500 uppercase">
                {language === 'es' ? 'CONTACTO GLOBAL' : 'GLOBAL CONTACT'}
              </span>
            </div>
            
            {/* Título: Font Serif Black, Dorado en acento */}
            <h2 className={`text-4xl md:text-5xl font-serif font-black mb-4 text-[${PRIMARY_COLOR_DARK}]`}>
              {language === 'es' ? 'Nuestras' : 'Our'}{' '}
              <span className={`text-transparent bg-clip-text bg-gradient-to-r from-[${ACCENT_COLOR_GOLD}] to-[#D4AF37]`}>
                {language === 'es' ? 'Oficinas' : 'Offices'}
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'es' 
                ? 'Haga clic en una de las ciudades siguientes para leer más'
                : 'Click on one of the following cities to read more'
              }
            </p>
          </motion.div>
        
        {/* --- GRID DE OFICINAS --- */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {offices.map((office, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-[2rem] shadow-xl overflow-hidden group 
                         shadow-[0_15px_30px_-10px_rgba(0,0,0,0.15)] 
                         hover:shadow-[0_20px_40px_-10px_rgba(0,35,66,0.3)] 
                         hover:translate-y-[-5px] transition-all duration-300 border border-gray-100" 
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={office.image}
                  alt={`Oficina ${office.city}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 3}
                />
                {/* Overlay sutil para el título */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[${PRIMARY_COLOR_DARK}]/30 to-transparent`}></div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-5">
                <h3 className={`text-3xl font-serif font-black text-[${PRIMARY_COLOR_DARK}] group-hover:text-[${ACCENT_COLOR_GOLD}] transition-colors leading-tight`}>
                  {office.city}
                  <span className={`block text-sm text-gray-500 font-bold uppercase tracking-widest mt-1`}>
                    {office.subtitle}
                  </span>
                </h3>

                <div className="space-y-4 pt-4 border-t border-gray-200">
                  
                  {/* Dirección */}
                  <div className="flex items-start gap-3">
                    <MapPin className={`w-5 h-5 text-[${ACCENT_COLOR_GOLD}] flex-shrink-0 mt-1`} />
                    <p className="text-gray-700 font-medium text-base">{office.address}</p>
                  </div>

                  {/* Obtener Dirección (Mapa) */}
                  <a
                    href={office.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-[${PRIMARY_COLOR_DARK}] hover:text-[${ACCENT_COLOR_GOLD}] transition-colors font-bold text-sm`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="underline">
                      {language === 'es' ? 'Obtener dirección' : 'Get directions'}
                    </span>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${office.email}`}
                    className={`flex items-center gap-3 text-gray-700 hover:text-[${ACCENT_COLOR_GOLD}] transition-colors`}
                  >
                    <Mail className={`w-5 h-5 text-[${ACCENT_COLOR_GOLD}]`} />
                    <span className="text-sm">{office.email}</span>
                  </a>

                  {/* Teléfono */}
                  <a
                    href={`tel:${office.phone.replace(/[^0-9]/g, '')}`}
                    className={`flex items-center gap-3 text-gray-700 hover:text-[${ACCENT_COLOR_GOLD}] transition-colors`}
                  >
                    <Phone className={`w-5 h-5 text-[${ACCENT_COLOR_GOLD}]`} />
                    <span className="text-base font-bold">{office.phone}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}