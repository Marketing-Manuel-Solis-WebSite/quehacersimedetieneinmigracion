'use client'

import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactForm from '../../components/ContactForm' 
import { useLanguage } from '../../context/LanguageContext' 
import { motion, Variants } from 'framer-motion' 
import { Outfit } from 'next/font/google'
import Image from 'next/image'
import { 
  MessageSquare, Mail, Phone, MapPin, FileText, UserCheck, Share2, Server, Globe 
} from 'lucide-react' 

// --- FUENTE ---
const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '300', '400', '500', '700'] 
})

// --- TEXTOS UI (PRIVACIDAD ACTUALIZADA) ---
const interfaceTexts = {
  hero: {
    title: { es: 'POLÍTICA DE PRIVACIDAD', en: 'PRIVACY POLICY' },
    subtitle: { es: 'Proteger su información privada es nuestra prioridad.', en: 'Protecting your private information is our priority.' },
    lastUpdated: { es: 'Última actualización: 5 de diciembre de 2025', en: 'Last updated: December 5, 2025' },
  },
  generalStatement: {
    es: 'La Oficina Legal de Manuel Solís ("nosotros", "nuestro" o "nos") se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y salvaguardamos su información cuando visita nuestro sitio web, envía formularios, se comunica con nuestra oficina o participa en nuestro programa de mensajería SMS/texto. Al utilizar nuestro sitio web o optar por recibir mensajes SMS, usted acepta las prácticas descritas en esta Política de Privacidad.',
    en: 'The Law Office of Manuel Solís ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit forms, communicate with our office, or participate in our SMS/text messaging program. By using our website or opting in to receive SMS messages, you consent to the practices described in this Privacy Policy.'
  },
  
  // 1. Información que Recopilamos
  section1: {
    title: { es: '1. Información que Recopilamos', en: '1. Information We Collect' },
    A: {
      title: { es: 'A. Información Personal', en: 'A. Personal Information' },
      intro: { es: 'Proporcionada directamente por usted, como:', en: 'Provided directly by you, such as:' },
      items: [
        { es: 'Nombre', en: 'Name' },
        { es: 'Dirección de correo electrónico', en: 'Email address' },
        { es: 'Número de teléfono', en: 'Phone number' },
        { es: 'Dirección postal', en: 'Mailing address' },
        { es: 'Información relacionada con el caso', en: 'Case-related information' },
        { es: 'Cualquier información enviada a través de formularios de nuestro sitio web o programa SMS', en: 'Any information submitted through our website forms or SMS program' },
      ]
    },
    B: {
      title: { es: 'B. Información Recopilada Automáticamente', en: 'B. Automatically Collected Information' },
      intro: { es: 'Cuando visita nuestro sitio web, podemos recopilar automáticamente:', en: 'When you visit our website, we may automatically collect:' },
      items: [
        { es: 'Dirección IP', en: 'IP address' },
        { es: 'Tipo y versión de navegador', en: 'Browser type and version' },
        { es: 'Información del dispositivo', en: 'Device information' },
        { es: 'Páginas vistas', en: 'Pages viewed' },
        { es: 'Cookies e identificadores de seguimiento', en: 'Cookies and tracking identifiers' },
      ],
      note: { es: 'Esta información nos ayuda a mantener la seguridad, funcionalidad y rendimiento del sitio web.', en: 'This information helps us maintain website security, functionality, and performance.' }
    },
    C: {
      title: { es: 'C. Información de Mensajería SMS/Texto', en: 'C. SMS/Text Messaging Information' },
      intro: { es: 'Si se inscribe en nuestro programa de notificaciones SMS, recopilamos:', en: 'If you enroll in our SMS notifications program, we collect:' },
      items: [
        { es: 'Número de teléfono móvil', en: 'Mobile phone number' },
        { es: 'Actividad de mensajería (altas, bajas, respuestas)', en: 'Messaging activity (opt-ins, opt-outs, responses)' },
        { es: 'Registros de estado de entrega', en: 'Delivery status records' },
      ],
      note: { es: 'No recopilamos información personal sensible a través de SMS.', en: 'We do not collect sensitive personal information through SMS.' }
    }
  },

  // 2. Cómo Usamos Su Información
  section2: {
    title: { es: '2. Cómo Usamos Su Información', en: '2. How We Use Your Information' },
    intro: { es: 'Utilizamos la información que recopilamos para:', en: 'We use the information we collect for:' },
    items: [
      { es: 'Comunicar actualizaciones relacionadas con su caso', en: 'Communicating updates related to your case' },
      { es: 'Enviar recordatorios de citas', en: 'Sending appointment reminders' },
      { es: 'Proporcionar anuncios de la oficina o notificaciones relacionadas con el servicio', en: 'Providing office announcements or service-related notifications' },
      { es: 'Responder a consultas y brindar soporte al cliente', en: 'Responding to inquiries and providing customer support' },
      { es: 'Operar y mejorar nuestro sitio web', en: 'Operating and improving our website' },
      { es: 'Cumplir con obligaciones legales y éticas', en: 'Complying with legal and ethical obligations' },
      { es: 'Mantener una comunicación segura con el cliente', en: 'Maintaining secure client communication' },
    ],
    note: { es: 'Su información nunca se vende a terceros.', en: 'Your information is never sold to third parties.' }
  },

  // 3. Programa SMS/Texto
  section3: {
    title: { es: '3. Programa de Mensajería SMS/Texto', en: '3. SMS/Text Messaging Program' },
    intro: { es: 'Si elige participar en nuestro programa de comunicación por SMS:', en: 'If you choose to opt in to our SMS communication program:' },
    A: {
      title: { es: 'A. Propósito del Mensaje', en: 'A. Message Purpose' },
      items: [
        { es: 'Actualizaciones de casos', en: 'Case updates' },
        { es: 'Recordatorios de citas', en: 'Appointment reminders' },
        { es: 'Alertas importantes de la oficina', en: 'Important office alerts' },
      ]
    },
    B: {
      title: { es: 'B. Instrucciones para Cancelar (Opt-Out)', en: 'B. Opt-Out Instructions' },
      content: { es: 'Puede optar por no participar en cualquier momento enviando un mensaje de texto con la palabra **STOP**. Puede solicitar ayuda en cualquier momento enviando un mensaje de texto con la palabra **HELP**.', en: 'You may opt out at any time by texting **STOP**. You may request help at any time by texting **HELP**.' }
    },
    C: {
      title: { es: 'C. Tarifas de Mensajes y Datos', en: 'C. Message and Data Rates' },
      content: { es: 'Se pueden aplicar tarifas de mensajes y datos según su plan de telefonía móvil.', en: 'Message and data rates may apply depending on your wireless plan.' }
    },
    D: {
      title: { es: 'D. Responsabilidad del Operador', en: 'D. Carrier Liability' },
      content: { es: 'Los operadores de telefonía inalámbrica no son responsables por mensajes retrasados o no entregados.', en: 'Wireless carriers are not liable for delayed or undelivered messages.' }
    }
  },
  
  // 4. Cómo Compartimos Su Información
  section4: {
    title: { es: '4. Cómo Compartimos Su Información', en: '4. How We Share Your Information' },
    intro: { es: 'Podemos compartir su información solo en las siguientes circunstancias limitadas:', en: 'We may share your information only in the following limited circumstances:' },
    A: {
      title: { es: 'A. Con Proveedores de Servicios', en: 'A. With Service Providers' },
      intro: { es: 'Proveedores externos de confianza que nos ayudan a:', en: 'Trusted third-party vendors that help us:' },
      items: [
        { es: 'Enviar mensajes SMS', en: 'Send SMS messages' },
        { es: 'Alojar y asegurar los datos del sitio web', en: 'Host and secure website data' },
        { es: 'Gestionar las comunicaciones con el cliente', en: 'Manage client communications' },
      ],
      note: { es: 'Todos los proveedores están obligados a proteger su información y no pueden usarla para ningún otro propósito que no sea proporcionar servicios a nuestra firma.', en: 'All providers are required to protect your information and may not use it for any purpose other than providing services to our firm.' }
    },
    B: {
      title: { es: 'B. Requisitos Legales o Éticos', en: 'B. Legal or Ethical Requirements' },
      intro: { es: 'Podemos divulgar su información si es requerido:', en: 'We may disclose your information if required:' },
      items: [
        { es: 'Por ley', en: 'By law' },
        { es: 'Para cumplir con órdenes judiciales', en: 'To comply with court orders' },
        { es: 'Para proteger sus derechos o seguridad', en: 'To protect your rights or safety' },
        { es: 'Para cumplir con las obligaciones éticas del abogado', en: 'To meet attorney ethical obligations' },
      ],
      note: { es: '**NO** hacemos: Vender su información. Compartir su información para marketing por terceros. Divulgar detalles del cliente sin su autorización.', en: 'We do **NOT**: Sell your information. Share your information for marketing by third parties. Disclose client details without your authorization.' }
    }
  },

  // 5. Seguridad de Datos
  section5: {
    title: { es: '5. Seguridad de Datos', en: '5. Data Security' },
    content1: { es: 'Implementamos salvaguardas administrativas, técnicas y físicas para proteger su información, incluyendo:', en: 'We implement administrative, technical, and physical safeguards to protect your information, including:' },
    items: [
      { es: 'Canales de comunicación cifrados', en: 'Encrypted communication channels' },
      { es: 'Almacenamiento de datos seguro', en: 'Secure data storage' },
      { es: 'Controles de acceso limitado', en: 'Limited access controls' },
      { es: 'Cumplimiento de los requisitos de confidencialidad abogado-cliente', en: 'Compliance with attorney-client confidentiality requirements' },
    ],
    content2: { es: 'Aunque tomamos medidas razonables para proteger sus datos, ningún método de transmisión es 100% seguro.', en: 'While we take reasonable measures to protect your data, no method of transmission is 100% secure.' }
  },

  // 6. Retención de Datos
  section6: {
    title: { es: '6. Retención de Datos', en: '6. Data Retention' },
    content1: { es: 'Retenemos la información solo el tiempo necesario para:', en: 'We retain information only as long as necessary to:' },
    items: [
      { es: 'Proporcionar servicios', en: 'Provide services' },
      { es: 'Cumplir con obligaciones legales', en: 'Comply with legal obligations' },
      { es: 'Resolver disputas', en: 'Resolve disputes' },
      { es: 'Mantener registros legales precisos', en: 'Maintain accurate legal records' },
    ],
    content2: { es: 'Los datos relacionados con SMS se conservan de acuerdo con nuestros requisitos de comunicación y cumplimiento.', en: 'SMS-related data is retained in accordance with our communication and compliance requirements.' }
  },

  // 7. Sus Derechos y Opciones
  section7: {
    title: { es: '7. Sus Derechos y Opciones', en: '7. Your Rights and Choices' },
    intro: { es: 'Usted puede:', en: 'You may:' },
    items: [
      { es: 'Optar por no recibir mensajes SMS en cualquier momento enviando un mensaje de texto con la palabra **STOP**', en: 'Opt out of SMS messages at any time by texting **STOP**' },
      { es: 'Solicitar acceso a la información que tenemos sobre usted', en: 'Request access to the information we have about you' },
      { es: 'Solicitar correcciones a su información', en: 'Request corrections to your information' },
      { es: 'Solicitar la eliminación de datos que no sean de registro legal', en: 'Request deletion of non-legal record data' },
      { es: 'Negarse a proporcionar cierta información (aunque esto puede limitar nuestros servicios)', en: 'Decline to provide certain information (though this may limit our services)' },
    ],
    contact: { es: 'Para ejercer sus derechos, contáctenos en:', en: 'To exercise your rights, contact us at:' },
    email: 'support@manuelsolis.com',
    phone: '713-844-2700'
  },

  // 8. Enlaces de Terceros
  section8: {
    title: { es: '8. Enlaces de Terceros', en: '8. Third-Party Links' },
    content: { es: 'Nuestro sitio web puede contener enlaces a sitios externos. No somos responsables de las prácticas de privacidad o el contenido de los sitios web de terceros.', en: 'Our website may contain links to external sites. We are not responsible for the privacy practices or content of third-party websites.' }
  },

  // 9. Privacidad de los Niños
  section9: {
    title: { es: '9. Privacidad de los Niños', en: '9. Children\'s Privacy' },
    content: { es: 'Nuestro sitio web y servicios SMS no están dirigidos a niños menores de 13 años. No recopilamos a sabiendas información de niños sin el consentimiento de los padres.', en: 'Our website and SMS services are not directed to children under 13. We do not knowingly collect information from children without parental consent.' }
  },

  // 10. Cambios a Esta Política
  section10: {
    title: { es: '10. Cambios a Esta Política', en: '10. Changes to This Policy' },
    content: { es: 'Podemos actualizar esta Política de Privacidad de vez en cuando. Las versiones revisadas se publicarán en esta página con una fecha de "Última Actualización" actualizada.', en: 'We may update this Privacy Policy from time to time. Revised versions will be posted on this page with an updated "Last Updated" date.' }
  },

  // 11. Contacto
  section11: {
    title: { es: '11. Contáctenos', en: '11. Contact Us' },
    intro: { es: 'Si tiene preguntas sobre esta Política de Privacidad o nuestras prácticas de datos, puede contactarnos en:', en: 'If you have questions about this Privacy Policy or our data practices, you may contact us at:' },
    phone: '713-844-2700',
    email: 'support@manuelsolis.com',
    address: '6657 Navigation Blvd Houston, Texas 77011',
  }
};

// --- UTILIDADES ---
// Función para procesar el texto con Markdown y saltos de línea
const parseContent = (text: string) => {
  // Bolding
  let parsed = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Newlines to breaks
  parsed = parsed.replace(/\n/g, '<br />');
  // Simple wrapping in <p> for paragraphs (handles double breaks as paragraph separation)
  parsed = parsed.split('<br /><br />').map(p => `<p>${p}</p>`).join('');
  return parsed;
};

// --- COMPONENTE TÍTULO DE SECCIÓN ---
const SectionTitle = ({ title }: { title: string }) => (
  <div className="mb-8 flex items-center gap-4">
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
    <h2 className="text-2xl md:text-3xl font-light text-white whitespace-nowrap drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
      {title}
    </h2>
    <div className="h-px bg-gradient-to-r from-transparent via-[#B2904D] to-transparent w-full opacity-50 hidden md:block"></div>
  </div>
);

// --- PÁGINA DE PRIVACIDAD ---
export default function PrivacidadPage() {
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
          FONDO ANIMADO (Fixed - Cubre toda la página)
      ========================================================================= */}
      <div className="fixed inset-0 z-0 w-full h-full bg-[#001540]">
          {/* Gradiente Azul Profundo */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
          
          {/* Ruido de textura */}
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>

          {/* Orbes de luz con movimiento suave */}
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
          
          {/* Texto de Fondo Sutil */}
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
                PRIVACIDAD
            </span>
          </motion.div>
      </div>
      
      {/* =========================================================================
          CONTENIDO
      ========================================================================= */}
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-64 pb-16 z-10 px-6 lg:px-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* IZQUIERDA: IMAGEN LOGO INFORMACION */}
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
                <p className="text-sm mt-2 text-white/50">{t('hero.lastUpdated')}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-base md:text-lg text-blue-100/70 font-light leading-relaxed space-y-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl"
              >
                 <div dangerouslySetInnerHTML={{ __html: parseContent(t('generalStatement')) }} />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN PRINCIPAL DE POLÍTICA DE PRIVACIDAD --- */}
      <section className="container mx-auto px-4 py-20 relative z-10 max-w-7xl space-y-24">
        
        {/* SECCIÓN 1: INFORMACIÓN QUE RECOPILAMOS */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <SectionTitle title={t('section1.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-8 shadow-xl">
                
                {/* A. Personal Information */}
                <div className="p-6 bg-[#001026] rounded-xl border border-[#B2904D]/20">
                    <h3 className="text-xl font-bold text-[#B2904D] mb-4 flex items-center gap-2"><UserCheck size={20}/> {t('section1.A.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section1.A.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section1.A.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                </div>

                {/* B. Automatically Collected Information */}
                <div className="p-6 bg-[#001026] rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><Globe size={20}/> {t('section1.B.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section1.B.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section1.B.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-white/50">{t('section1.B.note')}</p>
                </div>

                {/* C. SMS/Text Messaging Information */}
                <div className="p-6 bg-[#001026] rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><MessageSquare size={20}/> {t('section1.C.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section1.C.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section1.C.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-orange-300/80">{t('section1.C.note')}</p>
                </div>
            </div>
        </motion.div>

        {/* SECCIÓN 2: USO DE INFORMACIÓN */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <SectionTitle title={t('section2.title')} />
            <div className="p-8 bg-[#000814]/60 rounded-2xl border border-white/10 space-y-6 shadow-lg">
                <p className="text-base text-blue-100/80 mb-6">{t('section2.intro')}</p>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                    {interfaceTexts.section2.items.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 text-white/90">
                            <FileText size={18} className="text-[#B2904D] flex-shrink-0 mt-1"/>
                            <p className="text-base font-light">{item[lang] || item.es}</p>
                        </div>
                    ))}
                </div>
                <p className="text-sm pt-6 border-t border-white/10 text-orange-300/80 font-medium">{t('section2.note')}</p>
            </div>
        </motion.div>

        {/* SECCIÓN 3: PROGRAMA SMS/TEXTO */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <SectionTitle title={t('section3.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-6 shadow-xl">
                <p className="text-base text-blue-100/80 mb-4">{t('section3.intro')}</p>
                
                {/* A. Purpose */}
                <div className="p-6 bg-[#001026] rounded-lg border border-white/10">
                    <h4 className="text-lg font-semibold text-white mb-4">{t('section3.A.title')}</h4>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section3.A.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                </div>

                {/* B. Opt-Out */}
                <div className="p-6 bg-[#001026] rounded-lg border border-red-500/30">
                    <h4 className="text-lg font-semibold text-white mb-3">{t('section3.B.title')}</h4>
                    <div className="text-base text-blue-100/80" dangerouslySetInnerHTML={{ __html: parseText('section3.B.content') }} />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                    {/* C. Rates */}
                    <div className="p-6 bg-[#001026] rounded-lg border border-white/10">
                        <h4 className="text-lg font-semibold text-white mb-3">{t('section3.C.title')}</h4>
                        <div className="text-sm text-blue-100/80" dangerouslySetInnerHTML={{ __html: parseText('section3.C.content') }} />
                    </div>
                    {/* D. Carrier */}
                    <div className="p-6 bg-[#001026] rounded-lg border border-white/10">
                        <h4 className="text-lg font-semibold text-white mb-3">{t('section3.D.title')}</h4>
                        <div className="text-sm text-blue-100/80" dangerouslySetInnerHTML={{ __html: parseText('section3.D.content') }} />
                    </div>
                </div>
            </div>
        </motion.div>
        
        {/* SECCIÓN 4: CÓMO COMPARTIMOS SU INFORMACIÓN */}
        <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
            <SectionTitle title={t('section4.title')} />
            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 space-y-6 shadow-xl">
                <p className="text-base text-blue-100/80 mb-4">{t('section4.intro')}</p>
                
                {/* A. Service Providers */}
                <div className="p-6 bg-[#001026] rounded-xl border border-[#B2904D]/20">
                    <h3 className="text-xl font-bold text-[#B2904D] mb-4 flex items-center gap-2"><Server size={20}/> {t('section4.A.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section4.A.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section4.A.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-orange-300/80">{t('section4.A.note')}</p>
                </div>

                {/* B. Legal Requirements */}
                <div className="p-6 bg-[#001026] rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><FileText size={20}/> {t('section4.B.title')}</h3>
                    <p className="text-base text-blue-100/80 mb-4">{t('section4.B.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section4.B.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-sm pt-4 font-semibold text-red-400/90" dangerouslySetInnerHTML={{ __html: parseText('section4.B.note') }} />
                </div>
            </div>
        </motion.div>

        {/* SECCIONES 5, 6, 7 */}
        <div className="grid lg:grid-cols-3 gap-8">
            {/* SECCIÓN 5: SEGURIDAD DE DATOS */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="lg:col-span-1">
                <SectionTitle title={t('section5.title')} />
                <div className="h-full p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner">
                    <p className="text-base text-blue-100/80">{t('section5.content1')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section5.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-red-300/80">{t('section5.content2')}</p>
                </div>
            </motion.div>
            
            {/* SECCIÓN 6: RETENCIÓN DE DATOS */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="lg:col-span-1">
                <SectionTitle title={t('section6.title')} />
                <div className="h-full p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner">
                    <p className="text-base text-blue-100/80">{t('section6.content1')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4">
                        {interfaceTexts.section6.items.map((item, index) => (
                            <li key={index} className="text-white/80">{item[lang] || item.es}</li>
                        ))}
                    </ul>
                    <p className="text-xs pt-4 text-orange-300/80">{t('section6.content2')}</p>
                </div>
            </motion.div>
            
            {/* SECCIÓN 7: DERECHOS Y OPCIONES */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="lg:col-span-1">
                <SectionTitle title={t('section7.title')} />
                <div className="h-full p-6 bg-[#001026] rounded-xl border border-white/10 space-y-4 shadow-inner flex flex-col">
                    <p className="text-base text-blue-100/80">{t('section7.intro')}</p>
                    <ul className="text-sm list-disc list-inside space-y-3 pl-4 flex-grow">
                        {interfaceTexts.section7.items.map((item, index) => (
                            <li key={index} className="text-white/80" dangerouslySetInnerHTML={{ __html: item[lang] || item.es }} />
                        ))}
                    </ul>
                    <div className="pt-6 border-t border-white/10 space-y-2 text-sm">
                        <p className="text-white font-medium">{t('section7.contact')}</p>
                        <div className="flex items-center gap-2 text-[#B2904D]">
                            <Mail size={16} />
                            <a href={`mailto:${interfaceTexts.section7.email}`} className="hover:text-sky-300 transition">
                              {interfaceTexts.section7.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-2 text-[#B2904D]">
                            <Phone size={16} />
                            <a href={`tel:${interfaceTexts.section7.phone}`} className="hover:text-sky-300 transition">
                              {interfaceTexts.section7.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
        
        {/* SECCIONES 8, 9, 10, 11 */}
        <div className="grid md:grid-cols-2 gap-8">
            {/* SECCIÓN 8: Enlaces de Terceros */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                <SectionTitle title={t('section8.title')} />
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-base text-blue-100/80 font-light shadow-inner">
                    <div dangerouslySetInnerHTML={{ __html: parseText('section8.content') }} />
                </div>
            </motion.div>

            {/* SECCIÓN 9: Privacidad de los Niños */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                <SectionTitle title={t('section9.title')} />
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-base text-blue-100/80 font-light shadow-inner">
                    <div dangerouslySetInnerHTML={{ __html: parseText('section9.content') }} />
                </div>
            </motion.div>

            {/* SECCIÓN 10: Cambios a Esta Política */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                <SectionTitle title={t('section10.title')} />
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-base text-blue-100/80 font-light shadow-inner">
                    <div dangerouslySetInnerHTML={{ __html: parseText('section10.content') }} />
                </div>
            </motion.div>

            {/* SECCIÓN 11: Contáctenos */}
            <motion.div variants={contentVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                <SectionTitle title={t('section11.title')} />
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4 shadow-inner">
                    <p className="text-base text-white font-medium">{t('section11.intro')}</p>
                    <div className="flex flex-col gap-4 text-sm">
                        <div className="flex items-center gap-3 text-white/90">
                            <Mail size={18} className="text-sky-400" /> 
                            <a href={`mailto:${interfaceTexts.section11.email}`} className="hover:text-[#B2904D] transition">
                              {interfaceTexts.section11.email}
                            </a>
                        </div>
                        <div className="flex items-center gap-3 text-white/90">
                            <Phone size={18} className="text-sky-400" /> 
                            <a href={`tel:${interfaceTexts.section11.phone}`} className="hover:text-[#B2904D] transition">
                              {interfaceTexts.section11.phone}
                            </a>
                        </div>
                        <div className="flex items-start gap-3 text-white/90">
                            <MapPin size={18} className="text-sky-400 flex-shrink-0 mt-1" /> 
                            <span>{interfaceTexts.section11.address}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>

      </section>

      {/* --- FORMULARIO DE CONTACTO --- */}
      <div className="relative z-20 mt-24 py-12">
        <ContactForm />
      </div>

      <Footer />
    </main>
  );
}