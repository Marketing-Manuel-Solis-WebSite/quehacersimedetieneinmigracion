'use client'

import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactForm from '../../components/ContactForm' 
import { useLanguage } from '../../context/LanguageContext' 
import { motion, Variants } from 'framer-motion' 
import { Outfit } from 'next/font/google'
import Image from 'next/image'
import { MessageSquare, Shield, Mail, Phone, Clock, XOctagon } from 'lucide-react' 

// --- FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '300', '400', '500', '700'] 
})

// --- TEXTOS UI (TÉRMINOS SMS) ---
// Nota: La sección de términos de servicio de SMS generalmente es monolingüe (Inglés) para fines legales en EE. UU.
// Mantenemos la estructura de i18n para coherencia de código, pero usamos el texto proporcionado.
const interfaceTexts = {
  hero: {
    title: { es: 'TÉRMINOS DE SERVICIO SMS', en: 'SMS TERMS OF SERVICE' },
    subtitle: { 
      es: 'Programa de Notificaciones: Solís Law Notifications', 
      en: 'Program Name: Solís Law Notifications' 
    },
  },
  section1: {
    title: { es: '1. Descripción del Programa', en: '1. Program Description' },
    content: {
      es: "La Oficina Legal de Manuel Solís ofrece un programa de mensajería de texto que proporciona actualizaciones relacionadas con su caso, recordatorios de citas, notificaciones importantes y otras comunicaciones relevantes a los servicios proporcionados por nuestra oficina legal. Al optar por participar, usted acepta recibir mensajes SMS recurrentes de la Oficina Legal de Manuel Solís.",
      en: "The Law Office of Manuel Solís offers a text messaging program that provides updates related to your case, appointment reminders, important notifications, and other communications relevant to services provided by our law office. By opting in, you agree to receive recurring SMS messages from the Law Office of Manuel Solís."
    }
  },
  section2: {
    title: { es: '2. Instrucciones para Cancelar (Opt-Out)', en: '2. Opt-Out Instructions' },
    content1: {
      es: "Puede cancelar el servicio de SMS en cualquier momento. Simplemente envíe el mensaje de texto **“STOP”** al número desde el que recibió los mensajes. Después de enviar “STOP”, recibirá un mensaje de confirmación de que se ha dado de baja. Después de esto, ya no recibirá mensajes SMS de nuestra parte.",
      en: "You may cancel the SMS service at any time. Just text **“STOP”** to the number you received messages from. After sending “STOP,” you will receive a confirmation message that you have been unsubscribed. After this, you will no longer receive SMS messages from us."
    },
    content2: {
      es: "Si desea volver a unirse, simplemente regístrese de nuevo a través de nuestro sitio web o envíe un mensaje de texto **“START”** o **“UNSTOP”** al mismo número, y reanudará la recepción de mensajes.",
      en: "If you wish to rejoin, simply sign up again through our website or text **“START”** or **“UNSTOP”** to the same number, and you will resume receiving messages."
    }
  },
  section3: {
    title: { es: '3. Instrucciones de Ayuda', en: '3. Help Instructions' },
    content: {
      es: "Si tiene problemas con el programa de mensajería, responda con la palabra clave **HELP** para obtener más ayuda. También puede contactar a nuestro equipo de soporte directamente en:",
      en: "If you are experiencing issues with the messaging program, reply with the keyword **HELP** for more assistance. You may also contact our support team directly at:"
    },
    phone: { es: '713-844-2700', en: '713-844-2700' },
    email: { es: 'support@manuelsolis.com', en: 'support@manuelsolis.com' }
  },
  section4: {
    title: { es: '4. Descargo de Responsabilidad del Operador', en: '4. Carrier Liability Disclosure' },
    content: {
      es: "Los operadores de telefonía inalámbrica no son responsables por mensajes retrasados, fallidos o no entregados.",
      en: "Wireless carriers are not liable for delayed, failed, or undelivered messages."
    }
  },
  section5: {
    title: { es: '5. Frecuencia y Tarifas de Mensajes', en: '5. Message Frequency & Rates' },
    content1: {
      es: "Se pueden aplicar tarifas de mensajes y datos para cualquier mensaje que le enviemos y para los mensajes que usted nos envíe.",
      en: "Message and data rates may apply for any messages sent to you from us and for messages you send to us."
    },
    content2: {
      es: "La frecuencia de los mensajes varía según el estado de su caso y las comunicaciones de la oficina, pero generalmente incluye:",
      en: "Message frequency varies based on your case status and office communications, but generally includes:"
    },
    items: [
      { es: "Actualizaciones de casos", en: "Case updates" },
      { es: "Recordatorios de citas", en: "Appointment reminders" },
      { es: "Alertas de servicio importantes", en: "Important service alerts" },
    ],
    note: {
      es: "Si tiene preguntas sobre su plan de texto o plan de datos, comuníquese con su proveedor de telefonía móvil.",
      en: "If you have questions about your text plan or data plan, please contact your mobile provider."
    }
  },
  section6: {
    title: { es: '6. Política de Privacidad', en: '6. Privacy Policy' },
    content: {
      es: "Su privacidad es importante para nosotros. Para obtener información sobre cómo recopilamos, usamos y protegemos sus datos personales, revise nuestra Política de Privacidad:",
      en: "Your privacy is important to us. For information about how we collect, use, and protect your personal data, please review our Privacy Policy:"
    },
    linkText: { es: 'Política de Privacidad', en: 'Privacy Policy' }
  },
  section7: {
    title: { es: '7. Elegibilidad del Usuario', en: '7. User Eligibility' },
    content: {
      es: "Al optar por Solís Law Notifications, usted declara que:",
      en: "By opting in to Solís Law Notifications, you represent that:"
    },
    items: [
      { es: "Usted es el propietario o usuario autorizado del número de teléfono utilizado para inscribirse.", en: "You are the owner or authorized user of the phone number used to enroll," },
      { es: "Tiene al menos 18 años o tiene capacidad legal para dar su consentimiento.", en: "You are at least 18 years old or have legal capacity to consent," },
      { es: "Usted comprende que la participación es voluntaria y puede cancelarse en cualquier momento.", en: "You understand that participation is voluntary and can be canceled at any time." },
    ]
  },
  section8: {
    title: { es: '8. Modificaciones a los Términos', en: '8. Modifications to Terms' },
    content: {
      es: "La Oficina Legal de Manuel Solís se reserva el derecho de actualizar o modificar estos Términos de Servicio en cualquier momento. La participación continua en el programa de mensajería constituye la aceptación de los términos actualizados.",
      en: "The Law Office of Manuel Solís reserves the right to update or modify these Terms of Service at any time. Continued participation in the messaging program constitutes acceptance of the updated terms."
    }
  },
  contactInfo: {
    title: { es: '9. Información de Contacto', en: '9. Contact Information' },
    phone: { es: '713-844-2700', en: '713-844-2700' },
    email: { es: 'support@manuelsolis.com', en: 'support@manuelsolis.com' }
  }
};

// --- UTILIDADES ---
const parseContent = (text: string) => {
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(/\n/g, '<br />');
  // Envuelve en <p> para párrafos
  parsed = parsed.split('<br /><br />').map(p => `<p>${p}</p>`).join('');
  return parsed;
};

// --- COMPONENTE TÍTULO DE SECCIÓN ---
// Reutiliza el componente SectionTitle de tu código original
const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-8 flex items-center gap-4">
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
    <h2 className="text-2xl md:text-3xl font-light text-white whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
      {title}
    </h2>
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
  </div>
);

// --- PÁGINA DE TÉRMINOS SMS ---
export default function SmsTermsPage() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';
  
  // Función 't' robusta para evitar errores de undefined
  const t = (key: string): string => {
    const parts = key.split('.');
    let current: any = interfaceTexts;
    for (const part of parts) {
      if (current && current[part]) current = current[part];
      else return ''; 
    }
    if (typeof current === 'object' && (current.es || current.en)) return current[lang] || current.es || '';
    if (typeof current === 'string') return current;
    return ''; 
  };

  const parseText = (key: string) => parseContent(t(key));
  
  // Variants para las secciones de contenido legal
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.4, 0, 0.2, 1] 
      } 
    },
  };

  return (
    <main className={`relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden ${font.className}`}>
      <Header />

      {/* =========================================================================
          FONDO ANIMADO (Mismo que tu Privacy Page)
      ========================================================================= */}
      <div className="fixed inset-0 z-0 w-full h-full bg-[#001540]">
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
        
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

        <motion.div 
          animate={{ 
            opacity: [0.3, 0.5, 0.3], 
            scale: [1, 1.2, 1], 
            x: [0, 50, 0], 
            y: [0, -30, 0] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px]" 
        />
        <motion.div 
            animate={{ 
              opacity: [0.2, 0.4, 0.2], 
              scale: [1, 1.3, 1], 
              x: [0, -40, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-sky-800/10 rounded-full blur-[150px]" 
        />
        
        <motion.div
          initial={{ x: "20%" }} 
          animate={{ x: "-20%" }} 
          transition={{ 
            duration: 60, 
            repeat: Infinity, 
            ease: "linear", 
            repeatType: "mirror"
          }}
          className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none overflow-hidden"
        >
          <span className="text-[80vh] font-black italic text-white tracking-tighter whitespace-nowrap">
              SMS TERMS
          </span>
        </motion.div>
      </div>
      
      {/* =========================================================================
          CONTENIDO
      ========================================================================= */}
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-54 pb-16 z-10 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* IZQUIERDA: IMAGEN LOGO INFORMACION (Reutilizada) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-5 relative flex items-center justify-center h-[300px] lg:h-[400px]"
            >
              <div className="absolute inset-0 bg-[#B2904D]/10 blur-[80px] rounded-full z-0" />
              
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Image
                      src="/LogoInformacion.png"
                      alt="Law Offices of Manuel Solis"
                      width={600}
                      height={600}
                      className="object-contain drop-shadow-[0_0_30px_rgba(178,144,77,0.3)] hover:scale-105 transition-transform duration-700"
                      priority
                  />
              </div>
            </motion.div>

            {/* DERECHA: TÍTULO Y SUBTÍTULO */}
            <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-10 relative z-20">
              
              <div className="relative">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin text-white tracking-tight leading-none">
                  <span className="block text-white/90 font-extralight mb-2">
                    {t('hero.title').split(' ')[0]} 
                  </span>
                  <span className="block font-medium text-[#B2904D] drop-shadow-2xl">
                    {t('hero.title').split(' ').slice(1).join(' ')} 
                  </span>
                </h1>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="relative pl-6 border-l-2 border-[#B2904D]/50"
              >
                <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed">
                  {t('hero.subtitle')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-base md:text-lg text-blue-100/70 font-light leading-relaxed space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl"
              >
                <div className="flex items-center gap-3 text-white text-xl font-semibold mb-3">
                  <MessageSquare size={24} className="text-[#B2904D]"/> Law Office of Manuel Solis – SMS Terms of Service
                </div>
                <p className="text-sm">
                    **Programa:** Solis Law Notifications
                </p>
                <hr className="border-[#B2904D]/30" />
                <div dangerouslySetInnerHTML={{ __html: parseText('section1.content') }} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN PRINCIPAL DE TÉRMINOS SMS --- */}
      <section className="container mx-auto px-4 py-12 relative z-10 max-w-7xl">
        
        {/* SECCIÓN 2: OPT-OUT */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-16">
            <SectionTitle title={t('section2.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-6 shadow-xl">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-base text-blue-100/80 font-light space-y-4 p-4 bg-[#001026] rounded-lg border border-[#B2904D]/20">
                        <h3 className="text-xl font-medium text-white flex items-center gap-2"><XOctagon size={24} className="text-red-500"/> {lang === 'es' ? 'Cancelación' : 'Cancellation'} (**Requerido**)</h3>
                        <div dangerouslySetInnerHTML={{ __html: parseText('section2.content1') }} />
                    </div>
                    <div className="text-base text-blue-100/80 font-light space-y-4 p-4 bg-[#001026] rounded-lg border border-[#B2904D]/20">
                        <h3 className="text-xl font-medium text-white flex items-center gap-2"><MessageSquare size={24} className="text-green-500"/> {lang === 'es' ? 'Reunirse' : 'Rejoining'}</h3>
                        <div dangerouslySetInnerHTML={{ __html: parseText('section2.content2') }} />
                    </div>
                </div>
            </div>
        </motion.div>

        {/* SECCIÓN 3: AYUDA */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-16">
            <SectionTitle title={t('section3.title')} />
            <div className="p-8 bg-[#000814]/60 rounded-2xl border border-white/10 space-y-6 shadow-lg">
                <div className="text-base text-blue-100/80 font-light space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: parseText('section3.content') }} />
                </div>
                <div className="grid md:grid-cols-2 gap-6 text-lg font-medium">
                    <div className="flex items-center gap-3 text-[#B2904D] bg-white/5 p-4 rounded-lg">
                        <Phone size={20} className="text-sky-400" />
                        {t('section3.phone')}
                    </div>
                    <div className="flex items-center gap-3 text-[#B2904D] bg-white/5 p-4 rounded-lg">
                        <Mail size={20} className="text-sky-400" />
                        {t('section3.email')}
                    </div>
                </div>
            </div>
        </motion.div>
        
        {/* SECCIÓN 4: CARRIER LIABILITY */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-16">
            <SectionTitle title={t('section4.title')} />
            <div className="p-6 bg-[#1a0000]/60 rounded-2xl border border-red-500/30 text-base text-red-100/80 font-light shadow-xl">
                <div dangerouslySetInnerHTML={{ __html: parseText('section4.content') }} />
            </div>
        </motion.div>
        
        {/* SECCIÓN 5: FRECUENCIA Y TARIFAS */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-16">
            <SectionTitle title={t('section5.title')} />
            <div className="grid lg:grid-cols-3 gap-8 p-6 bg-[#000814]/60 rounded-2xl border border-white/10 shadow-lg">
                <div className="lg:col-span-2 text-base text-blue-100/80 font-light space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: parseText('section5.content1') }} />
                    <p className="font-semibold text-white mt-4">{t('section5.content2')}</p>
                    <ul className="text-sm list-disc list-inside space-y-2 pl-4">
                        {interfaceTexts.section5.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                </div>
                <div className="lg:col-span-1 p-6 bg-[#001026] rounded-xl border border-[#B2904D]/20 space-y-3">
                    <h3 className="text-lg font-bold text-[#B2904D] mb-3 flex items-center gap-2"><Clock size={20}/> {lang === 'es' ? 'Nota Importante' : 'Important Note'}</h3>
                    <div className="text-sm text-white/80">
                        <div dangerouslySetInnerHTML={{ __html: parseText('section5.note') }} />
                    </div>
                </div>
            </div>
        </motion.div>
        
        {/* SECCIÓN 6: POLÍTICA DE PRIVACIDAD */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-16">
            <SectionTitle title={t('section6.title')} />
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-base text-blue-100/80 font-light shadow-inner flex flex-col md:flex-row justify-between items-center gap-4">
                <div dangerouslySetInnerHTML={{ __html: parseText('section6.content') }} />
                {/* Asumiendo que 'Privacy Policy' es un enlace a otra página */}
                <a href="/privacidad" className="flex items-center gap-2 px-4 py-2 bg-[#B2904D] text-[#001540] font-bold rounded-lg hover:bg-[#a08445] transition-colors whitespace-nowrap">
                    <Shield size={20}/>
                    {t('section6.linkText')}
                </a>
            </div>
        </motion.div>
        
        {/* SECCIÓN 7: ELEGIBILIDAD */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-16">
            <SectionTitle title={t('section7.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-6 shadow-xl">
                <div className="text-base text-blue-100/80 font-light space-y-4">
                    <div dangerouslySetInnerHTML={{ __html: parseText('section7.content') }} />
                </div>
                <ul className="text-base list-disc list-outside space-y-3 pl-8 text-white/90">
                    {interfaceTexts.section7.items.map((item, index) => (
                        <li key={index}>
                            **{index + 1}.** {item[lang] || item.es}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
        
        {/* SECCIÓN 8: MODIFICACIONES Y 9: CONTACTO */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="mb-16">
            <SectionTitle title={t('section8.title')} />
            <div className="p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner">
                 <div className="text-base text-blue-100/80 font-light" dangerouslySetInnerHTML={{ __html: parseText('section8.content') }} />
            </div>

            <SectionTitle title={t('contactInfo.title')} />
            <div className="p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner">
                <p className="text-base text-white font-medium">Law Office of Manuel Solís</p>
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-white/90">
                        <Phone size={18} className="text-sky-400" /> 
                        {t('contactInfo.phone')}
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                        <Mail size={18} className="text-sky-400" /> 
                        {t('contactInfo.email')}
                    </div>
                </div>
            </div>
        </motion.div>

      </section>

      {/* --- FORMULARIO DE CONTACTO --- */}
      <div className="relative z-20 mt-12">
        <ContactForm />
      </div>

      <Footer />
    </main>
  );
}