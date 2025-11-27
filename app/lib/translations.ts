// app/lib/translations.ts - VERSIÓN CORREGIDA CON TIPOS
export const translations = {
  es: {
    // Header
    nav: {
      offices: 'OFICINAS',
      legalAreas: 'ÁREAS LEGALES',
      detainedClients: 'CLIENTES DETENIDOS',
      testimonials: 'TESTIMONIOS',
      lawyers: 'ABOGADOS',
      information: 'INFORMACIÓN',
      english: 'ENGLISH',
    },
    legalAreasSubmenu: {
      accidents: 'Accidentes',
      immigration: 'Migración',
      insurance: 'Seguros',
      criminalLaw: 'Ley Criminal',
      family: 'Familia',
      estatePlanning: 'Planificación Familiar',
    },
    informationSubmenu: {
      resources: 'Recursos',
      news: 'Noticias',
      faq: 'Preguntas Frecuentes',
    },
    
    // Hero
    hero: {
      title: 'Abogados de Inmigración',
      subtitle: 'Oficinas Legales de',
      name: 'Manuel Solis',
      tagline: 'Soluciones legales confiables para el mundo real',
      casesWonLabel: 'Más de',
      casesWonNumber: '50,000 CASOS GANADOS',
      casesWonSubtext: 'PARA NUESTROS CLIENTES',
      description: 'Nuestros abogados de inmigración están aquí para asistirle con su situación legal. Le invitamos a conocer más sobre nosotros y ver por qué somos la opción más confiable para resolver sus desafíos legales',
      contactButton: 'Contactarnos',
      yearsLabel: 'Años de',
      yearsLabel2: 'Experiencia',
    },
    
    // About
    about: {
      title: 'Acerca de Nosotros',
      heading: 'Experiencia Legal que Marca la Diferencia',
      description: 'En las Oficinas Legales de Manuel Solis, nos especializamos en ofrecer representación legal excepcional en casos de inmigración, accidentes, seguros y derecho de familia. Con más de 34 años de experiencia combinada, nuestro equipo está comprometido con la excelencia y resultados tangibles para nuestros clientes.',
      stats: {
        cases: 'Casos Resueltos',
        years: 'Años de Experiencia',
        offices: 'Oficinas en EE.UU.',
        satisfaction: 'Satisfacción del Cliente',
      },
      values: {
        title: 'Nuestros Valores',
        commitment: {
          title: 'Compromiso',
          description: 'Dedicación absoluta a cada caso',
        },
        experience: {
          title: 'Experiencia',
          description: 'Décadas de práctica legal exitosa',
        },
        results: {
          title: 'Resultados',
          description: 'Más de 50,000 casos ganados',
        },
      },
    },
    
    // Services
    services: {
      title: 'Nuestros Servicios',
      heading: 'Áreas de Práctica Legal',
      description: 'Ofrecemos representación legal integral en diversas áreas del derecho, garantizando la mejor defensa de sus intereses.',
      viewAll: 'Ver Todos los Servicios',
      learnMore: 'Más Información',
      categories: {
        immigration: {
          title: 'Inmigración',
          description: 'Asesoría completa en procesos migratorios, visas, residencia permanente y ciudadanía.',
          services: ['Visas de Trabajo', 'Reunificación Familiar', 'Ciudadanía', 'Asilo Político', 'Defensa en Deportación'],
        },
        accidents: {
          title: 'Accidentes',
          description: 'Representación en casos de lesiones personales y accidentes automovilísticos.',
          services: ['Accidentes de Auto', 'Accidentes Laborales', 'Negligencia Médica', 'Lesiones Catastróficas', 'Muerte Injusta'],
        },
        insurance: {
          title: 'Seguros',
          description: 'Ayuda con reclamos de seguros denegados o disputados.',
          services: ['Reclamos Denegados', 'Seguros de Auto', 'Seguros de Salud', 'Seguros de Vida', 'Mala Fe de Aseguradoras'],
        },
        criminal: {
          title: 'Ley Criminal',
          description: 'Defensa criminal experta para proteger sus derechos.',
          services: ['Delitos Menores', 'Delitos Graves', 'DUI/DWI', 'Defensa en Juicio', 'Apelaciones'],
        },
        family: {
          title: 'Derecho de Familia',
          description: 'Apoyo legal en asuntos familiares sensibles.',
          services: ['Divorcio', 'Custodia de Menores', 'Manutención', 'Adopción', 'Órdenes de Protección'],
        },
        estatePlanning: {
          title: 'Planificación Patrimonial',
          description: 'Protección de su legado y futuro financiero.',
          services: ['Testamentos', 'Fideicomisos', 'Poder Notarial', 'Planificación de Sucesión', 'Protección de Activos'],
        },
      },
    },
    
    // Associations
    associations: {
      title: 'Certificaciones y Asociaciones',
      heading: 'Reconocimiento Profesional',
      description: 'Estamos orgullosos de nuestras afiliaciones con las organizaciones legales más prestigiosas.',
    },
    
    // Testimonials
    testimonials: {
      title: 'Testimonios',
      heading: 'Lo Que Dicen Nuestros Clientes',
      description: 'La satisfacción de nuestros clientes es nuestro mejor respaldo.',
      readMore: 'Leer Más',
    },
    
    // Team
    team: {
      title: 'Nuestro Equipo',
      heading: 'Abogados Experimentados',
      description: 'Conozca a los profesionales dedicados a defender sus derechos.',
      viewProfile: 'Ver Perfil',
    },
    
    // Offices
    offices: {
      title: 'Nuestras Oficinas',
      heading: 'Ubicaciones en Todo EE.UU.',
      description: 'Con múltiples oficinas, estamos cerca de usted cuando nos necesite.',
      getDirections: 'Obtener Direcciones',
      callNow: 'Llamar Ahora',
      visitWebsite: 'Visitar Sitio Web',
      hours: 'Horario',
      phone: 'Teléfono',
      email: 'Correo',
    },
    
    // Contact Form
    contact: {
      title: 'Contáctenos',
      heading: 'Solicite una Consulta Gratuita',
      description: 'Estamos listos para ayudarle. Complete el formulario y nos comunicaremos con usted pronto.',
      form: {
        name: 'Nombre Completo',
        namePlaceholder: 'Juan Pérez',
        email: 'Correo Electrónico',
        emailPlaceholder: 'juan@ejemplo.com',
        phone: 'Teléfono',
        phonePlaceholder: '(555) 123-4567',
        service: 'Servicio de Interés',
        servicePlaceholder: 'Seleccione un servicio',
        message: 'Mensaje',
        messagePlaceholder: 'Cuéntenos sobre su caso...',
        submit: 'Enviar Consulta',
        submitting: 'Enviando...',
        success: '¡Mensaje enviado exitosamente!',
        error: 'Error al enviar. Por favor intente nuevamente.',
      },
      services: {
        immigration: 'Inmigración',
        accidents: 'Accidentes',
        insurance: 'Seguros',
        criminal: 'Ley Criminal',
        family: 'Derecho de Familia',
        estatePlanning: 'Planificación Patrimonial',
      },
      info: {
        phone: 'Teléfono',
        email: 'Correo',
        hours: 'Horario de Atención',
        hoursText: 'Lunes - Viernes: 9:00 AM - 6:00 PM',
        emergency: 'Disponible 24/7 para emergencias',
      },
    },
    
    // Footer
    footer: {
      description: 'Defendiendo sus derechos con integridad y excelencia desde 1990.',
      quickLinks: 'Enlaces Rápidos',
      legalAreas: 'Áreas Legales',
      contact: 'Contacto',
      followUs: 'Síguenos',
      copyright: '© 2025 Oficinas Legales de Manuel Solis. Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      disclaimer: 'Este sitio web es un micrositio de',
      mainSite: 'manuelsolis.com',
    },
    
    // WhatsApp
    whatsapp: {
      tooltip: '¿Necesitas ayuda? Escríbenos',
      defaultMessage: 'Hola, me gustaría obtener más información sobre sus servicios legales.',
    },
    
    // SEO
    seo: {
      home: {
        title: 'Abogados de Inmigración y Accidentes | Oficinas Legales Manuel Solis',
        description: 'Expertos abogados de inmigración, accidentes y derecho de familia. Más de 50,000 casos ganados. Consulta gratuita. Oficinas en todo EE.UU.',
        keywords: 'abogados de inmigración, abogados de accidentes, Manuel Solis, abogados hispanos, ayuda legal, consulta gratis',
      },
    },
  },
  en: {
    // Header
    nav: {
      offices: 'OFFICES',
      legalAreas: 'LEGAL AREAS',
      detainedClients: 'DETAINED CLIENTS',
      testimonials: 'TESTIMONIALS',
      lawyers: 'ATTORNEYS',
      information: 'INFORMATION',
      english: 'ESPAÑOL',
    },
    legalAreasSubmenu: {
      accidents: 'Accidents',
      immigration: 'Immigration',
      insurance: 'Insurance',
      criminalLaw: 'Criminal Law',
      family: 'Family',
      estatePlanning: 'Estate Planning',
    },
    informationSubmenu: {
      resources: 'Resources',
      news: 'News',
      faq: 'FAQ',
    },
    
    // Hero
    hero: {
      title: 'Immigration Attorneys',
      subtitle: 'Law Offices of',
      name: 'Manuel Solis',
      tagline: 'Reliable legal solutions for the real world',
      casesWonLabel: 'More than',
      casesWonNumber: '50,000 CASES WON',
      casesWonSubtext: 'FOR OUR CLIENTS',
      description: 'Our immigration attorneys are here to assist you with your legal situation. We invite you to learn more about us and see why we are the most trusted choice to resolve your legal challenges',
      contactButton: 'Contact Us',
      yearsLabel: 'Years of',
      yearsLabel2: 'Experience',
    },
    
    // About
    about: {
      title: 'About Us',
      heading: 'Legal Experience That Makes a Difference',
      description: 'At the Law Offices of Manuel Solis, we specialize in providing exceptional legal representation in immigration, accident, insurance, and family law cases. With over 34 years of combined experience, our team is committed to excellence and tangible results for our clients.',
      stats: {
        cases: 'Cases Resolved',
        years: 'Years of Experience',
        offices: 'Offices in USA',
        satisfaction: 'Client Satisfaction',
      },
      values: {
        title: 'Our Values',
        commitment: {
          title: 'Commitment',
          description: 'Absolute dedication to every case',
        },
        experience: {
          title: 'Experience',
          description: 'Decades of successful legal practice',
        },
        results: {
          title: 'Results',
          description: 'Over 50,000 cases won',
        },
      },
    },
    
    // Services
    services: {
      title: 'Our Services',
      heading: 'Legal Practice Areas',
      description: 'We offer comprehensive legal representation in various areas of law, ensuring the best defense of your interests.',
      viewAll: 'View All Services',
      learnMore: 'Learn More',
      categories: {
        immigration: {
          title: 'Immigration',
          description: 'Complete advisory on immigration processes, visas, permanent residence, and citizenship.',
          services: ['Work Visas', 'Family Reunification', 'Citizenship', 'Political Asylum', 'Deportation Defense'],
        },
        accidents: {
          title: 'Accidents',
          description: 'Representation in personal injury and automobile accident cases.',
          services: ['Car Accidents', 'Work Accidents', 'Medical Negligence', 'Catastrophic Injuries', 'Wrongful Death'],
        },
        insurance: {
          title: 'Insurance',
          description: 'Help with denied or disputed insurance claims.',
          services: ['Denied Claims', 'Auto Insurance', 'Health Insurance', 'Life Insurance', 'Bad Faith Insurance'],
        },
        criminal: {
          title: 'Criminal Law',
          description: 'Expert criminal defense to protect your rights.',
          services: ['Misdemeanors', 'Felonies', 'DUI/DWI', 'Trial Defense', 'Appeals'],
        },
        family: {
          title: 'Family Law',
          description: 'Legal support in sensitive family matters.',
          services: ['Divorce', 'Child Custody', 'Support', 'Adoption', 'Protection Orders'],
        },
        estatePlanning: {
          title: 'Estate Planning',
          description: 'Protection of your legacy and financial future.',
          services: ['Wills', 'Trusts', 'Power of Attorney', 'Succession Planning', 'Asset Protection'],
        },
      },
    },
    
    // Associations
    associations: {
      title: 'Certifications and Associations',
      heading: 'Professional Recognition',
      description: 'We are proud of our affiliations with the most prestigious legal organizations.',
    },
    
    // Testimonials
    testimonials: {
      title: 'Testimonials',
      heading: 'What Our Clients Say',
      description: 'Our clients\' satisfaction is our best endorsement.',
      readMore: 'Read More',
    },
    
    // Team
    team: {
      title: 'Our Team',
      heading: 'Experienced Attorneys',
      description: 'Meet the professionals dedicated to defending your rights.',
      viewProfile: 'View Profile',
    },
    
    // Offices
    offices: {
      title: 'Our Offices',
      heading: 'Locations Across the USA',
      description: 'With multiple offices, we are close to you when you need us.',
      getDirections: 'Get Directions',
      callNow: 'Call Now',
      visitWebsite: 'Visit Website',
      hours: 'Hours',
      phone: 'Phone',
      email: 'Email',
    },
    
    // Contact Form
    contact: {
      title: 'Contact Us',
      heading: 'Request a Free Consultation',
      description: 'We are ready to help you. Fill out the form and we will contact you soon.',
      form: {
        name: 'Full Name',
        namePlaceholder: 'John Doe',
        email: 'Email',
        emailPlaceholder: 'john@example.com',
        phone: 'Phone',
        phonePlaceholder: '(555) 123-4567',
        service: 'Service of Interest',
        servicePlaceholder: 'Select a service',
        message: 'Message',
        messagePlaceholder: 'Tell us about your case...',
        submit: 'Send Inquiry',
        submitting: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending. Please try again.',
      },
      services: {
        immigration: 'Immigration',
        accidents: 'Accidents',
        insurance: 'Insurance',
        criminal: 'Criminal Law',
        family: 'Family Law',
        estatePlanning: 'Estate Planning',
      },
      info: {
        phone: 'Phone',
        email: 'Email',
        hours: 'Business Hours',
        hoursText: 'Monday - Friday: 9:00 AM - 6:00 PM',
        emergency: 'Available 24/7 for emergencies',
      },
    },
    
    // Footer
    footer: {
      description: 'Defending your rights with integrity and excellence since 1990.',
      quickLinks: 'Quick Links',
      legalAreas: 'Legal Areas',
      contact: 'Contact',
      followUs: 'Follow Us',
      copyright: '© 2025 Law Offices of Manuel Solis. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      disclaimer: 'This website is a microsite of',
      mainSite: 'manuelsolis.com',
    },
    
    // WhatsApp
    whatsapp: {
      tooltip: 'Need help? Write us',
      defaultMessage: 'Hello, I would like to get more information about your legal services.',
    },
    
    // SEO
    seo: {
      home: {
        title: 'Immigration & Accident Attorneys | Manuel Solis Law Offices',
        description: 'Expert immigration, accident and family law attorneys. Over 50,000 cases won. Free consultation. Offices across the USA.',
        keywords: 'immigration lawyers, accident attorneys, Manuel Solis, Hispanic lawyers, legal help, free consultation',
      },
    },
  },
};

export type Language = 'es' | 'en';

// Tipo dinámico que funciona con ambos idiomas
export type TranslationKeys = typeof translations['es'];