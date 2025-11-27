'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Play, Award, BookOpen, Scale, 
  ChevronRight, Mail, ShieldCheck, 
  Gavel, GraduationCap, ArrowRight
} from 'lucide-react';
import Image from 'next/image';
import Header from '../../components/Header'; 
import Footer from '../../components/Footer';
import { useLanguage } from '../../context/LanguageContext';

// Función auxiliar para manejar URLs de imágenes
const getImageURL = (name: string) => {
    const base = 'https://manuelsolis.com/wp-content/uploads/2025/07/';
    const slug = name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s/g, '-');
    const suffixes = ['-922x1024.png', '.png', '-1.png', '-921x1024.png'];
    for (const suffix of suffixes) {
        if (name.includes('Manuel E. Solís III')) return `${base}Manuel-E.Solis-III-922x1024.png`;
        if (name.includes('Eduardo García')) return `${base}Eduardo-Garcia-1-922x1024.png`;
        if (name.includes('Magdalena')) return `${base}Maggie-922x1024.png`;
        if (name.includes('Himani')) return `${base}Himani-Augustina-Vithanage-922x1024.png`;
        return `${base}${slug}${suffix}`;
    }
    return '/placeholder-lawyer.jpg';
};

const attorneys = [
  // --- FUNDADORES Y SOCIOS PRINCIPALES ---
  {
    id: 'manuel-solis',
    name: 'Manuel Solís',
    role: {
      es: 'Abogado Principal y Fundador',
      en: 'Principal Attorney and Founder'
    },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Manuel-Solis-922x1024.png', 
    video: null, 
    bio: {
      es: [
        "Durante las casi tres décadas que han pasado desde que empecé a trabajar como abogado, he llegado a conocer bien a los inmigrantes. Sobretodo he podido ser testigo del impresionante coraje y valentía que muestran muchos de ellos.",
        "Muchos inmigrantes arriesgan sus propias vidas con el objeto de luchar por el bienestar de sus familias. Me siento enormemente bendecido por servir de herramienta para cumplir sus sueños y metas en este gran país de oportunidades."
      ],
      en: [
        "During the nearly three decades since I started working as a lawyer, I have come to know immigrants well. Above all, I have witnessed the impressive courage and bravery that many of them display.",
        "Many immigrants risk their own lives in order to fight for the well-being of their families. I feel enormously blessed to serve as a tool to fulfill their dreams and goals in this great country of opportunity."
      ]
    },
    quote: {
      es: "Me siento enormemente bendecido por servir de herramienta para cumplir sus sueños.",
      en: "I feel enormously blessed to serve as a tool to fulfill their dreams."
    },
    education: ["Juris Doctor", { es: "30+ Años de Experiencia", en: "30+ Years of Experience" }],
    admissions: ["Texas", { es: "Cortes Federales", en: "Federal Courts" }]
  },
  {
    id: 'manuel-solis-iii',
    name: 'Manuel E. Solís III',
    role: { es: 'Abogado', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Manuel-E.Solis-III-922x1024.png',
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/interview-manuel-iii_1.mp4',
    bio: {
      es: [
        "Manuel E. Solís III se ocupa principalmente de la ley de inmigración en las Oficinas Legales de Manuel Solís. Se graduó de la Universidad de Houston Downtown y completó su licenciatura en derecho en South Texas College of Law Houston.",
        "El Sr. Solís es un apasionado de ayudar a la comunidad y a las personas necesitadas."
      ],
      en: [
        "Manuel E. Solís III primarily handles immigration law at the Law Offices of Manuel Solís. He graduated from the University of Houston Downtown and completed his law degree at South Texas College of Law Houston.",
        "Mr. Solís is passionate about helping the community and people in need."
      ]
    },
    education: ["Universidad de Houston Downtown", "South Texas College of Law Houston"],
    admissions: ["Texas"],
    quote: {
      es: "Me apasiona ayudar a la comunidad y a las personas necesitadas.",
      en: "I am passionate about helping the community and people in need."
    }
  },
  {
    id: 'juan-solis',
    name: 'Juan Solís',
    role: { es: 'Abogado', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Juan-Solis-922x1024.png', 
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/pexels-john-hill-7049943-1080p.mp4', 
    bio: {
      es: [
        "Juan representa clientes en casos que van desde Inmigración hasta Litigios Civiles, y está muy involucrado en el departamento de Litigios de Seguros.",
        "Se graduó de Point Loma Nazarene University y de South Texas College of Law. Además, completó su MBA en Bauer College of Business."
      ],
      en: [
        "Juan represents clients in cases ranging from Immigration to Civil Litigation, and is heavily involved in the Insurance Litigation department.",
        "He graduated from Point Loma Nazarene University and South Texas College of Law. He also completed his MBA at Bauer College of Business."
      ]
    },
    education: ["Point Loma Nazarene University", "South Texas College of Law", "MBA - Univ. of Houston"],
    admissions: ["Texas", "Colorado", { es: "Cortes de Distrito de EE. UU.", en: "U.S. District Courts" }],
    quote: {
      es: "Saber no es suficiente; debemos aplicar. Estar dispuesto no es suficiente; debemos hacer.",
      en: "Knowing is not enough; we must apply. Being willing is not enough; we must do."
    }
  },

  // --- SOCIOS Y ABOGADOS PRINCIPALES DE LITIGIO ---
  {
    id: 'andrew-fink',
    name: 'Andrew Fink',
    role: { es: 'Socio de Litigio (Chicago)', en: 'Litigation Partner (Chicago)' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Andrew-Fink-922x1024.png',
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/andrew-fink_1.mp4',
    bio: {
      es: [
        "Socio de litigio a nivel nacional. Centra su práctica en lesiones personales, accidentes y negligencia médica. Ha sido el abogado principal en aproximadamente 50 juicios con jurado.",
        "Cree en la integridad, trabajo duro, pasión, competencia y humildad."
      ],
      en: [
        "National litigation partner. Focuses his practice on personal injury, accidents, and medical malpractice. He has been lead counsel in approximately 50 jury trials.",
        "He believes in integrity, hard work, passion, competence, and humility."
      ]
    },
    education: ["Juris Doctor - Marquette University (1994)", "MBA Lake Superior State Univ"],
    admissions: ["Illinois", "Wisconsin", "American Association of Justice"],
    quote: {
      es: "Integridad, trabajo duro, pasión, competencia y humildad.",
      en: "Integrity, hard work, passion, competence, and humility."
    }
  },
  {
    id: 'gregory-finney',
    name: 'Gregory Finney',
    role: { es: 'Director de Litigio Civil', en: 'Civil Litigation Director' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Gregory-Finney-922x1024.png',
    video: 'https://SolisPullZone.b-cdn.net/gregory-finney.mp4',
    bio: {
      es: [
        "Gregory Finney es el Director de Litigio Civil. Su experiencia incluye litigios comerciales complejos, fraude, energía y accidentes catastróficos.",
        "Antes de ser abogado, fue profesor de ciencias y sirvió en la Marina de los EE. UU."
      ],
      en: [
        "Gregory Finney is the Director of Civil Litigation. His experience includes complex commercial litigation, fraud, energy, and catastrophic accidents.",
        "Before becoming an attorney, he was a science teacher and served in the U.S. Navy."
      ]
    },
    education: ["University of Houston Law Center", "Texas State University"],
    admissions: [
      { es: "Corte Suprema de los Estados Unidos", en: "Supreme Court of the United States" },
      { es: "Tribunales Federales de Distrito", en: "Federal District Courts" }
    ],
    quote: {
      es: "Mantente curioso.",
      en: "Stay curious."
    }
  },
  {
    id: 'ni-yan',
    name: 'Ni Yan',
    role: { es: 'Abogada', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Ni-Yan-922x1024.png',
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/ni-yan_1.mp4',
    bio: {
      es: [
        "Nacida en la República de China, Yan se especializa en ayudar a la comunidad asiática en casos de inmigración. Ha representado a más de 5,000 casos.",
        "Es columnista en dos periódicos y conduce un programa de radio semanal."
      ],
      en: [
        "Born in the Republic of China, Yan specializes in helping the Asian community with immigration cases. She has represented over 5,000 cases.",
        "She is a columnist for two newspapers and hosts a weekly radio show."
      ]
    },
    education: ["Central University for Nationalities (Beijing)", "University of Houston Law Center"],
    admissions: ["Texas"],
    quote: {
      es: "Orgullosa de ayudar a las personas a alcanzar el sueño americano.",
      en: "Proud to help people achieve the American dream."
    }
  },
  {
    id: 'mark-mcbroom',
    name: 'Mark McBroom',
    role: { es: 'Abogado', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Mark-McBroom-922x1024.png',
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/INTERVIEW-MARC_1.mp4',
    bio: {
      es: [
        "El Sr. McBroom obtuvo su Doctorado en Jurisprudencia de la Universidad Metodista del Sur. Se dio cuenta de su pasión por las leyes de inmigración mientras era estudiante.",
        "Su enfoque se centra en la inmigración basada en la familia y la defensa contra la deportación."
      ],
      en: [
        "Mr. McBroom obtained his Juris Doctor from Southern Methodist University. He discovered his passion for immigration law while a student.",
        "His focus is on family-based immigration and defense against deportation."
      ]
    },
    education: ["Southern Methodist University Dedman School of Law", "University of North Texas"],
    admissions: ["Texas"],
    quote: {
      es: "Representación eficiente y precisa con compasión y comprensión.",
      en: "Efficient and accurate representation with compassion and understanding."
    }
  },
  {
    id: 'ana-patricia-rueda',
    name: 'Ana Patricia Rueda',
    role: { es: 'Abogada', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Ana-Patricia-Rueda-922x1024.png',
    video: 'https://manuelsolis.com/wp-content/uploads/2023/12/INTERVIEW-ANA_1.mp4',
    bio: {
      es: [
        "La abogada Rueda nació en Zacatecas, México, e inmigró a los 7 años. Descubrió su pasión por la justicia durante sus estudios universitarios.",
        "Se graduó de Chicago-Kent College of Law en 2016. Trabaja principalmente en defensa de remoción (deportación) y exenciones de inadmisibilidad (waivers)."
      ],
      en: [
        "Attorney Rueda was born in Zacatecas, Mexico, and immigrated at age 7. She discovered her passion for justice during her undergraduate studies.",
        "She graduated from Chicago-Kent College of Law in 2016. She primarily works on removal defense (deportation) and inadmissibility waivers."
      ]
    },
    education: ["Chicago - Kent College of Law", "University of Illinois - Chicago"],
    admissions: ["Illinois"],
    quote: {
      es: "El mejor premio que la vida tiene para ofrecer es trabajar duro en un trabajo que valga la pena.",
      en: "The best prize life has to offer is to work hard at work worth doing."
    }
  },
  {
    id: 'edwin-zavala',
    name: 'Edwin Zavala',
    role: { es: 'Abogado', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Edwin-Zavala-922x1024.png',
    video: 'https://SolisPullZone.b-cdn.net/gregory-finney.mp4',
    bio: {
      es: [
        "Edwin Zavala nació y creció en Metairie, Louisiana. Obtuvo su título de Juris Doctor de la Facultad de Derecho de la Universidad de Loyola en Nueva Orleans, graduándose cum laude.",
        "Practica principalmente en inmigración y deportación en la oficina de Denver. Se toma el tiempo para dar una evaluación honesta de cada situación."
      ],
      en: [
        "Edwin Zavala was born and raised in Metairie, Louisiana. He obtained his Juris Doctor degree from Loyola University New Orleans College of Law, graduating cum laude.",
        "He primarily practices immigration and deportation law in the Denver office. He takes the time to give an honest assessment of each situation."
      ]
    },
    education: ["Loyola University New Orleans College of Law", "Louisiana State University"],
    admissions: ["Colorado Bar Association", { es: "Tribunal de Distrito de EE. UU. (Colorado)", en: "United States District Court (Colorado)" }],
    quote: {
      es: "Soy hijo de un inmigrante... realmente creo que estamos cambiando el mundo.",
      en: "I am the son of an immigrant... I truly believe we are changing the world."
    }
  },
  {
    id: 'alejandro-manzano',
    name: 'Alejandro Manzano',
    role: { es: 'Abogado', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Alejandro-Manzano-922x1024.png',
    video: null,
    bio: {
      es: [
        "Comprometido con la comunidad inmigrante, Alejandro ejerce en la oficina de Houston. Creció en el Valle del Río Grande, fortaleciendo su conexión con las comunidades que defiende.",
        "Obtuvo su título en South Texas College of Law en 2017. Su práctica se enfoca principalmente en Derecho de Inmigración y defensa ante la EOIR."
      ],
      en: [
        "Committed to the immigrant community, Alejandro practices in the Houston office. He grew up in the Rio Grande Valley, strengthening his connection to the communities he defends.",
        "He obtained his degree from South Texas College of Law in 2017. His practice focuses primarily on Immigration Law and defense before the EOIR."
      ]
    },
    education: [
      "South Texas College of Law (2017)", 
      { es: "Licenciatura en Artes (Inglés y Arte)", en: "Bachelor of Arts (English and Art)" }
    ],
    admissions: [
      { es: "Corte Suprema de Texas", en: "Supreme Court of Texas" },
      { es: "Tribunales Federales (Distritos Este, Sur y Oeste)", en: "Federal Courts (Eastern, Southern, and Western Districts)" }
    ],
    quote: {
      es: "Un acompañamiento legal claro y humano.",
      en: "Clear and humane legal representation."
    }
  },
  
  // --- ABOGADOS ASOCIADOS ---
  {
    id: 'victor-rojas',
    name: 'Victor Rojas',
    role: { es: 'Abogado', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Victor-Rojas-922x1024.png',
    video: 'https://SolisPullZone.b-cdn.net/interview-victor.mp4',
    bio: {
      es: [
        "Rojas se graduó de la Facultad de Derecho La Interamericana de Puerto Rico en 2003. Fue Defensor Público por varios años, luchando día tras día para que las ruedas de la Justicia no se descarrilen.",
        "Se incorporó a la firma en 2019, aportando una vasta experiencia en litigio penal y defensa de derechos."
      ],
      en: [
        "Rojas graduated from La Interamericana Law School of Puerto Rico in 2003. He was a Public Defender for several years, fighting day after day to keep the wheels of Justice on track.",
        "He joined the firm in 2019, bringing extensive experience in criminal litigation and rights defense."
      ]
    },
    education: ["La Interamericana Law School of Puerto Rico (2003)"],
    admissions: [
      { es: "Puerto Rico (Litigante)", en: "Puerto Rico (Litigator)" },
      { es: "Práctica Federal de Inmigración", en: "Federal Immigration Practice" }
    ],
    quote: {
      es: "Luchando para que los derechos de los imputados no se descarrilen.",
      en: "Fighting to keep the rights of the accused on track."
    }
  },
  {
    id: 'austen-gunnels',
    name: 'Austen Gunnels',
    role: { es: 'Abogado', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/08/Austen-Gunnels-921x1024.png',
    video: null,
    bio: {
      es: [
        "Su práctica se enfoca en representar heridos en accidentes marítimos y de vehículos de motor. Tiene experiencia previa en defensa de seguros, lo que le da una ventaja estratégica al negociar.",
        "Conocimiento profundo del derecho marítimo y litigio civil."
      ],
      en: [
        "His practice focuses on representing those injured in maritime and motor vehicle accidents. He has prior experience in insurance defense, which gives him a strategic advantage in negotiations.",
        "Deep knowledge of maritime law and civil litigation."
      ]
    },
    education: [
      { es: "Doctor en Jurisprudencia - South Texas College of Law Houston", en: "Juris Doctor - South Texas College of Law Houston" },
      { es: "Licenciatura en Ciencias Políticas - Univ. Lenoir Rhyne", en: "Bachelor of Science in Political Science - Lenoir Rhyne Univ." }
    ],
    admissions: [
      "Texas",
      { es: "Tribunal de Distrito (Sur de Texas)", en: "District Court (Southern District of Texas)" },
      { es: "Tribunal de Apelaciones (Quinto Circuito)", en: "Court of Appeals (Fifth Circuit)" }
    ],
    quote: {
      es: "Abogando incansablemente para garantizar la mejor resolución posible.",
      en: "Advocating tirelessly to ensure the best possible resolution."
    }
  },
  {
    id: 'gabriel-perez',
    name: 'Gabriel Perez',
    role: { es: 'Abogado', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Gabriel-Perez-922x1024.png',
    video: null,
    bio: {
      es: [
        "Nacido en Houston, Texas. Comenzó como asistente legal en la firma y su pasión lo llevó a convertirse en abogado.",
        "Se graduó de South Texas College of Law en 2019. Se especializa en lesiones personales, seguros e inmigración."
      ],
      en: [
        "Born in Houston, Texas. He started as a legal assistant at the firm and his passion led him to become an attorney.",
        "He graduated from South Texas College of Law in 2019. He specializes in personal injury, insurance, and immigration."
      ]
    },
    education: [
      "South Texas College of Law Houston (2019)",
      { es: "Universidad de Houston", en: "University of Houston" }
    ],
    admissions: ["Texas"],
    quote: {
      es: "No hay excusa para que nadie trabaje más duro que tú.",
      en: "There's no excuse for anyone to work harder than you."
    }
  },
  {
    id: 'peyton-barrow',
    name: 'Peyton Barrow',
    role: { es: 'Abogado (Memphis)', en: 'Attorney (Memphis)' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Peyton-Barrow-922x1024.png',
    video: null,
    bio: {
      es: [
        "Abogado en la oficina de Memphis. Su enfoque es empático y orientado a resultados, ayudando a clientes a navegar el sistema de inmigración con claridad.",
        "Autorizado para ejercer en Tennessee y enfocado en representación eficaz y transparente."
      ],
      en: [
        "Attorney in the Memphis office. His approach is empathetic and results-oriented, helping clients navigate the immigration system with clarity.",
        "Licensed to practice in Tennessee and focused on effective and transparent representation."
      ]
    },
    education: ["University of Memphis (JD)"],
    admissions: ["Tennessee Bar Association"],
    quote: {
      es: "Ayudar a navegar el complejo sistema de inmigración con confianza.",
      en: "Helping to navigate the complex immigration system with confidence."
    }
  },
  {
    id: 'sara-james',
    name: 'Sara James',
    role: { es: 'Abogada (Memphis)', en: 'Attorney (Memphis)' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Sara-James-922x1024.png',
    video: null,
    bio: {
      es: [
        "Ejerce en Memphis con pasión por la comunidad hispana. Fue Presidenta de la Hispanic Law Student Association y ganadora del premio Champion of Justice 2021.",
        "Su vocación nace del deseo de brindar representación a quienes no pueden defenderse por sí mismos."
      ],
      en: [
        "She practices in Memphis with a passion for the Hispanic community. She was President of the Hispanic Law Student Association and winner of the 2021 Champion of Justice award.",
        "Her vocation stems from the desire to provide representation to those who cannot defend themselves."
      ]
    },
    education: [
      "University of Memphis Cecil C. Humphreys School of Law (JD)",
      "University of Memphis (BA)"
    ],
    admissions: ["Tennessee", "Missouri", "Hispanic National Bar Association"],
    quote: {
      es: "Apoyarlos a alcanzar su sueño americano es un honor y un privilegio.",
      en: "Supporting them to achieve their American dream is an honor and a privilege."
    }
  },
  {
    id: 'eduardo-garcia',
    name: 'Eduardo García',
    role: { es: 'Abogado', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Eduardo-Garcia-1-922x1024.png',
    video: null,
    bio: {
      es: [
        "Antes de ser abogado, fue profesor de Historia. Tiene una Maestría en Historia con enfoque en Borderlands.",
        "Fue becario de Equal Justice Works, comprometido con servir a comunidades históricamente marginadas."
      ],
      en: [
        "Before becoming a lawyer, he was a History teacher. He has a Master's degree in History with a focus on Borderlands.",
        "He was an Equal Justice Works Fellow, committed to serving historically marginalized communities."
      ]
    },
    education: [
      "University of New Mexico School of Law (JD)",
      "University of Texas at El Paso (UTEP)"
    ],
    admissions: ["Illinois", { es: "Nuevo México", en: "New Mexico" }],
    quote: {
      es: "Utilizar el derecho como herramienta para la equidad y la justicia.",
      en: "Using law as a tool for equity and justice."
    }
  },
  {
    id: 'alexis-alvarez',
    name: 'Alexis Alvarez',
    role: { es: 'Abogada', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Alexis-Alvarez-922x1024.png',
    video: null,
    bio: {
      es: [
        "Originaria del Valle del Río Grande, Texas. Hija de trabajadores agrícolas migrantes. Esta historia familiar le dio una profunda admiración por la comunidad inmigrante.",
        "Obtuvo su JD de la Facultad de Derecho Sturm de la Universidad de Denver."
      ],
      en: [
        "Native of the Rio Grande Valley, Texas. Daughter of migrant farm workers. This family history gave her a deep admiration for the immigrant community.",
        "She obtained her JD from the University of Denver Sturm College of Law."
      ]
    },
    education: [
      { es: "Universidad de Denver (Sturm College of Law)", en: "University of Denver (Sturm College of Law)" },
      { es: "Universidad Texas A&M", en: "Texas A&M University" }
    ],
    admissions: ["Colorado"],
    quote: {
      es: "Cree firmemente en el principio de retribuir a la comunidad.",
      en: "She firmly believes in the principle of giving back to the community."
    }
  },
  {
    id: 'elizabeth-ponce-mcclain',
    name: 'Elizabeth Ponce McClain',
    role: { es: 'Abogada', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Elizabeth-Ponce-McClain-922x1024.png',
    video: null,
    bio: {
      es: [
        "Obtuvo su Licenciatura en Economía en Fordham University y su Juris Doctor en Suffolk University School of Law.",
        "Es Mediadora Certificada y se enfoca en el bienestar integral de sus clientes, con una vocación especial por ayudar a los niños."
      ],
      en: [
        "She obtained her Bachelor's degree in Economics from Fordham University and her Juris Doctor from Suffolk University School of Law.",
        "She is a Certified Mediator and focuses on the comprehensive well-being of her clients, with a special vocation for helping children."
      ]
    },
    education: [
      "Suffolk University School of Law (JD)",
      { es: "Fordham University (Economía)", en: "Fordham University (Economics)" }
    ],
    admissions: ["Texas", "Massachusetts", { es: "Distrito de Columbia", en: "District of Columbia" }],
    quote: {
      es: "Resolución de conflictos de manera efectiva, ética y compasiva.",
      en: "Conflict resolution in an effective, ethical, and compassionate manner."
    }
  },
  {
    id: 'magdalena-aguilar',
    name: 'Magdalena "Maggie" Aguilar',
    role: { es: 'Abogada (Chicago)', en: 'Attorney (Chicago)' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Maggie-922x1024.png',
    video: null,
    bio: {
      es: [
        "Nació en Aguascalientes, México, y emigró a Chicago de niña. Antes de ser abogada, tuvo una exitosa carrera en marketing.",
        "Trabajó en la Oficina de Derechos Civiles del Departamento de Educación de EE.UU. y en la Oficina del Fiscal General de Illinois."
      ],
      en: [
        "She was born in Aguascalientes, Mexico, and emigrated to Chicago as a child. Before becoming a lawyer, she had a successful career in marketing.",
        "She worked at the U.S. Department of Education's Office for Civil Rights and the Illinois Attorney General's Office."
      ]
    },
    education: [
      "Northern Illinois University College of Law (JD)",
      "University of Illinois - Chicago"
    ],
    admissions: ["Illinois"],
    quote: {
      es: "Pone su experiencia al servicio de las familias inmigrantes con empatía, firmeza y compromiso.",
      en: "She puts her experience at the service of immigrant families with empathy, firmness, and commitment."
    }
  },
  {
    id: 'ashley-cruz',
    name: 'Ashley Cruz',
    role: { es: 'Abogada (Houston)', en: 'Attorney (Houston)' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Ashley-Cruz-922x1024.png',
    video: null,
    bio: {
      es: [
        "Se enfoca en casos de asilo e inmigración familiar. Antes de esto, trabajó en derecho civil y familiar.",
        "Obtuvo su título en la Pontificia Universidad Católica de Puerto Rico. Su trato cercano y humano es apreciado por sus clientes."
      ],
      en: [
        "She focuses on asylum and family immigration cases. Prior to this, she worked in civil and family law.",
        "She obtained her degree from the Pontifical Catholic University of Puerto Rico. Her warm and humane approach is appreciated by her clients."
      ]
    },
    education: [{ es: "Pontificia Universidad Católica de Puerto Rico", en: "Pontifical Catholic University of Puerto Rico" }],
    admissions: [
      "Puerto Rico",
      { es: "Práctica Federal de Inmigración", en: "Federal Immigration Practice" }
    ],
    quote: {
      es: "Pasión por ayudar a las personas a permanecer legalmente y con tranquilidad.",
      en: "Passion for helping people stay legally and with peace of mind."
    }
  },
  {
    id: 'edward-s-reisman',
    name: 'Edward S. Reisman',
    role: { es: 'Abogado (Los Ángeles)', en: 'Attorney (Los Angeles)' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Edward-Steven-Reisman-922x1024.png',
    video: null,
    bio: {
      es: [
        "Ejerce en Los Ángeles. Tiene un JD de Georgetown University Law Center. Su experiencia previa en el Servicio de Inmigración y Naturalización (INS) le da una visión única del sistema.",
        "Es licenciado en Historia y Estudios Rusos."
      ],
      en: [
        "He practices in Los Angeles. He has a JD from Georgetown University Law Center. His prior experience at the Immigration and Naturalization Service (INS) gives him unique insight into the system.",
        "He holds a degree in History and Russian Studies."
      ]
    },
    education: [
      "Georgetown University Law Center (JD)",
      "University of Rochester"
    ],
    admissions: ["California", "Maryland"],
    quote: {
      es: "Guiando a sus clientes con conocimiento, responsabilidad y humanidad.",
      en: "Guiding his clients with knowledge, responsibility, and humanity."
    }
  },
  {
    id: 'yineyri-castillo-arias',
    name: 'Yineyri Castillo Arias',
    role: { es: 'Abogada (Houston)', en: 'Attorney (Houston)' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Yineyri-Castillo-922x1024.png',
    video: null,
    bio: {
      es: [
        "Emigró a EE.UU. y comprende los retos de sus clientes. Es Presidenta de la Comisión de Derechos de los Inmigrantes del Colegio de Abogados de Puerto Rico.",
        "Trabajó con la Oficina de Reasentamiento de Refugiados de la ONU y fue defensora legal de víctimas de crimen."
      ],
      en: [
        "She immigrated to the U.S. and understands her clients' challenges. She is President of the Immigrant Rights Commission of the Puerto Rico Bar Association.",
        "She worked with the UN Refugee Resettlement Office and was a legal advocate for crime victims."
      ]
    },
    education: [
      { es: "Pontificia Universidad Católica de Puerto Rico (JD)", en: "Pontifical Catholic University of Puerto Rico (JD)" },
      { es: "Universidad Interamericana de Puerto Rico", en: "Interamerican University of Puerto Rico" }
    ],
    admissions: ["Puerto Rico"],
    quote: {
      es: "Su trabajo se basa en la empatía y el compromiso genuino con el bienestar de cada persona.",
      en: "Her work is based on empathy and genuine commitment to the well-being of each person."
    }
  },
  {
    id: 'danatayri-morales-vidal',
    name: 'Danatayri Morales Vidal, Esq.',
    role: { es: 'Abogada (Houston)', en: 'Attorney (Houston)' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Danatayri-Morales-Vidal-922x1024.png',
    video: null,
    bio: {
      es: [
        "Ejerce con convicción en la oficina de Houston. Su principio es defender el derecho de elegir dónde vivir, brindando representación estratégica y humana.",
        "Su trayectoria refleja un compromiso constante con los derechos fundamentales de las comunidades migrantes."
      ],
      en: [
        "She practices with conviction in the Houston office. Her principle is to defend the right to choose where to live, providing strategic and humane representation.",
        "Her career reflects a constant commitment to the fundamental rights of migrant communities."
      ]
    },
    education: [{ es: "Abogada Titulada", en: "Licensed Attorney" }],
    admissions: [{ es: "Práctica Federal de Inmigración", en: "Federal Immigration Practice" }],
    quote: {
      es: "El derecho de elegir dónde vivir.",
      en: "The right to choose where to live."
    }
  },
  {
    id: 'stephanie-l-garcia-vidal',
    name: 'Stephanie L. García Vidal',
    role: { es: 'Abogada (Dallas)', en: 'Attorney (Dallas)' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Stephanie-Garcia-Vidal-922x1024.png',
    video: null,
    bio: {
      es: [
        "Ejerce en la oficina de Dallas del Bufete de Abogados Manuel Solís, donde brinda representación legal comprometida y empática a personas y familias inmigrantes. Su pasión por la abogacía nace del deseo de apoyar a quienes emprendieron un viaje transformador para construir un futuro más seguro y digno.",
        "Obtuvo su Licenciatura en Ciencias Políticas con una concentración menor en Estudios Legales en la University of Rochester, y su título de Juris Doctor en la Escuela de Derecho de la Universidad Interamericana de Puerto Rico en 2006. Durante sus estudios, se destacó como directora de Relaciones Públicas del capítulo estudiantil de la Federal Bar Association.",
        "Con más de 17 años de experiencia en litigios civiles, administrativos y de derecho de familia, la abogada García Vidal también cuenta con más de dos años de especialización en derecho migratorio. Su enfoque es estratégico y humano, brindando apoyo eficaz a quienes enfrentan procesos legales complejos.",
        "Está admitida en el Colegio de Abogados de Puerto Rico y tiene autorización para ejercer ante el Tribunal Federal de Distrito para el Distrito de Puerto Rico.",
        "Stephanie representa a sus clientes con dedicación, sabiendo que cada caso representa una historia, una familia y un futuro lleno de posibilidades. Su vocación es luchar por quienes necesitan una voz firme a su lado."
      ],
      en: [
        "She practices at the Dallas office of the Law Offices of Manuel Solís, where she provides committed and empathetic legal representation to immigrant individuals and families. Her passion for advocacy stems from the desire to support those who have embarked on a transformative journey to build a safer and more dignified future.",
        "She obtained her Bachelor's degree in Political Science with a minor in Legal Studies from the University of Rochester, and her Juris Doctor degree from the Interamerican University of Puerto Rico School of Law in 2006. During her studies, she served as Public Relations Director for the student chapter of the Federal Bar Association.",
        "With over 17 years of experience in civil, administrative, and family law litigation, Attorney García Vidal also has over two years of specialization in immigration law. Her approach is strategic and humane, providing effective support to those facing complex legal processes.",
        "She is admitted to the Puerto Rico Bar and is authorized to practice before the U.S. District Court for the District of Puerto Rico.",
        "Stephanie represents her clients with dedication, knowing that each case represents a story, a family, and a future full of possibilities. Her vocation is to fight for those who need a firm voice by their side."
      ]
    },
    education: [
      { es: "University of Rochester (Licenciatura en Ciencias Políticas con concentración en Estudios Legales)", en: "University of Rochester (Bachelor's in Political Science with concentration in Legal Studies)" },
      { es: "Universidad Interamericana de Puerto Rico - Escuela de Derecho (JD, 2006)", en: "Interamerican University of Puerto Rico - School of Law (JD, 2006)" }
    ],
    admissions: [
      "Puerto Rico Bar",
      { es: "Tribunal de Distrito de EE. UU. (Puerto Rico)", en: "U.S. District Court (Puerto Rico)" }
    ],
    quote: {
      es: "Un compromiso con la esperanza.",
      en: "A commitment to hope."
    }
  },
  {
    id: 'lupita-valenzuela-martinez',
    name: 'Lupita Valenzuela Martinez',
    role: { es: 'Abogada (Memphis)', en: 'Attorney (Memphis)' },
    image: '/lupita.png',
    video: null,
    bio: {
      es: [
        "Ejerce la abogacía con pasión y entrega desde nuestra oficina de Memphis. Su mayor inspiración proviene de ayudar a quienes no pueden defenderse por sí mismos, y su misión es asegurar que todos reciban la representación comprometida y valiente que merecen. Su trabajo está profundamente guiado por el deseo de servir a la comunidad hispana, motor que alimenta su vocación día a día.",
        "Se graduó de la University of Memphis Cecil C. Humphreys School of Law, donde obtuvo su título de Juris Doctor y un Certificado en Abogacía. Durante su paso por la facultad, fue presidenta de la Hispanic Law Student Association, miembro del Moot Court, Student Justice del Honor Council y recibió el prestigioso premio Champion of Justice otorgado por la Memphis Bar Association en 2021.",
        "También fue reconocida como Líder Nacional Estudiantil de la Región X por la Hispanic National Bar Association y apareció en la edición de verano 2022 de la revista Memphis Law Magazine.",
        "Está autorizada para ejercer la abogacía en Tennessee y Missouri. Es miembro activo de la Tennessee Bar Association, Missouri Bar Association, Hispanic National Bar Association y American Bar Association.",
        "Combina su formación jurídica con una sensibilidad especial hacia las necesidades de sus clientes. Su enfoque cálido y estratégico convierte cada representación en una verdadera alianza en busca de justicia."
      ],
      en: [
        "She practices law with passion and dedication from our Memphis office. Her greatest inspiration comes from helping those who cannot defend themselves, and her mission is to ensure that everyone receives the committed and courageous representation they deserve. Her work is deeply guided by the desire to serve the Hispanic community, a driving force that fuels her vocation every day.",
        "She graduated from the University of Memphis Cecil C. Humphreys School of Law, where she obtained her Juris Doctor degree and a Certificate in Advocacy. During her time at law school, she was president of the Hispanic Law Student Association, a member of Moot Court, Student Justice of the Honor Council, and received the prestigious Champion of Justice award from the Memphis Bar Association in 2021.",
        "She was also recognized as Region X National Student Leader by the Hispanic National Bar Association and was featured in the summer 2022 edition of Memphis Law Magazine.",
        "She is licensed to practice law in Tennessee and Missouri. She is an active member of the Tennessee Bar Association, Missouri Bar Association, Hispanic National Bar Association, and American Bar Association.",
        "She combines her legal training with a special sensitivity to her clients' needs. Her warm and strategic approach turns each representation into a true alliance in pursuit of justice."
      ]
    },
    education: [
      { es: "University of Memphis Cecil C. Humphreys School of Law (JD y Certificado en Abogacía)", en: "University of Memphis Cecil C. Humphreys School of Law (JD and Certificate in Advocacy)" }
    ],
    admissions: [
      "Tennessee Bar Association",
      "Missouri Bar Association",
      "Hispanic National Bar Association",
      "American Bar Association"
    ],
    quote: {
      es: "Una defensora impulsada por un propósito.",
      en: "An advocate driven by purpose."
    }
  },
  {
    id: 'himani-augustina-vithanage',
    name: 'Himani Augustina Vithanage',
    role: { es: 'Abogada', en: 'Attorney' },
    image: 'https://manuelsolis.com/wp-content/uploads/2025/07/Himani-Augustina-Vithanage-922x1024.png',
    video: null,
    bio: {
      es: [
        "Una voz firme para quienes más lo necesitan. Busca empoderar a sus clientes con empatía, conocimiento y pasión.",
        "Cree firmemente que el Derecho debe ser una herramienta para proteger, orientar y transformar vidas, actuando con la máxima dedicación."
      ],
      en: [
        "A firm voice for those who need it most. She seeks to empower her clients with empathy, knowledge, and passion.",
        "She firmly believes that the Law should be a tool to protect, guide, and transform lives, acting with the utmost dedication."
      ]
    },
    education: [{ es: "Abogada Titulada", en: "Licensed Attorney" }],
    admissions: ["Texas"],
    quote: {
      es: "Una voz firme para quienes más lo necesitan.",
      en: "A firm voice for those who need it most."
    }
  },
];

export default function AttorneysPage() {
  const { language } = useLanguage();
  const [selectedAttorney, setSelectedAttorney] = useState<any>(null);

  const handleImageError = (e: any) => {
     e.target.src = 'https://manuelsolis.com/wp-content/uploads/2024/11/logo-manuelsolis.png';
     e.target.style.objectFit = 'contain';
     e.target.style.padding = '20px';
     e.target.style.backgroundColor = '#002342';
  };

  // Función helper para obtener texto traducido
  const getText = (obj: any) => {
    if (typeof obj === 'string') return obj;
    return obj[language] || obj.es || obj;
  };

  // Textos de la interfaz
  const texts = {
    hero: {
      badge: { es: 'Defensa de Clase Mundial', en: 'World-Class Defense' },
      title1: { es: 'Conozca a Sus', en: 'Meet Your' },
      title2: { es: 'Defensores', en: 'Advocates' },
      subtitle: {
        es: 'Más que abogados, somos aliados estratégicos dedicados a proteger su futuro con integridad, experiencia y pasión.',
        en: 'More than lawyers, we are strategic allies dedicated to protecting your future with integrity, experience, and passion.'
      }
    },
    card: {
      viewProfile: { es: 'Ver Perfil Completo', en: 'View Full Profile' }
    },
    modal: {
      badge: { es: 'Perfil Profesional', en: 'Professional Profile' },
      education: { es: 'Educación', en: 'Education' },
      admissions: { es: 'Admisiones', en: 'Admissions' },
      achievements: { es: 'Logros', en: 'Achievements' },
      button: { es: 'Solicitar Consulta Privada', en: 'Request Private Consultation' },
      defaultBio: {
        es: 'es un miembro fundamental de nuestro equipo legal. Con una trayectoria dedicada a la defensa de los derechos de nuestros clientes, aporta experiencia, integridad y un compromiso inquebrantable para lograr los mejores resultados posibles.',
        en: 'is a fundamental member of our legal team. With a career dedicated to defending our clients\' rights, they bring experience, integrity, and an unwavering commitment to achieving the best possible results.'
      },
      educationFallback: { es: 'Información disponible en consulta.', en: 'Information available upon consultation.' },
      admissionsFallback: { es: 'Abogado certificado y reconocido.', en: 'Certified and recognized attorney.' }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#001529] text-white relative selection:bg-[#B2904D] selection:text-white font-sans">
      
      <Header />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
             <div className="absolute inset-0 bg-[#002342] opacity-95"></div>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[#B2904D] opacity-20 rounded-full blur-[120px]"></div>
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B2904D]/30 bg-[#B2904D]/10 backdrop-blur-md mb-6">
                <Scale size={14} className="text-[#B2904D]" />
                <span className="text-[#B2904D] text-xs font-bold tracking-widest uppercase">
                  {texts.hero.badge[language]}
                </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              {texts.hero.title1[language]}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B2904D] to-[#e6c67e]">
                {texts.hero.title2[language]}
              </span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              {texts.hero.subtitle[language]}
            </p>
          </motion.div>
        </div>
      </section>

      {/* GRID DE ABOGADOS */}
      <section className="px-4 pb-32 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            
            {attorneys.map((attorney, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                onClick={() => setSelectedAttorney(attorney)}
                className="group relative h-[450px] rounded-2xl overflow-hidden cursor-pointer border border-white/5 bg-[#002b52]/30 backdrop-blur-sm hover:border-[#B2904D]/50 hover:shadow-[0_0_30px_rgba(178,144,77,0.15)] transition-all duration-500"
              >
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                   <Image 
                      src={attorney.image} 
                      alt={attorney.name}
                      fill
                      className={attorney.id === 'lupita-valenzuela-martinez' 
                        ? "object-cover object-[center_20%]" 
                        : "object-cover object-top"}
                      onError={handleImageError}
                      unoptimized 
                   />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#001529] via-[#001529]/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />

                <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                   <div className="w-12 h-1 bg-[#B2904D] mb-3 rounded-full group-hover:w-24 transition-all duration-500"></div>
                   
                   <h3 className="text-2xl font-serif font-bold text-white leading-none mb-2 drop-shadow-md">
                     {attorney.name}
                   </h3>
                   
                   <p className="text-[#B2904D] text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                     <ShieldCheck size={14} /> {getText(attorney.role)}
                   </p>
                   
                   <div className="flex items-center gap-2 text-white text-sm font-medium opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 delay-75">
                      {texts.card.viewProfile[language]} <ChevronRight size={16} className="text-[#B2904D]" />
                   </div>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* MODAL DE DETALLE */}
      <AnimatePresence>
        {selectedAttorney && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-xl overflow-hidden"
            onClick={() => setSelectedAttorney(null)} 
          >
             <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 50 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 50 }}
               transition={{ type: "spring", duration: 0.6, bounce: 0.3 }}
               onClick={(e) => e.stopPropagation()} 
               className="bg-[#002342] w-full md:max-w-6xl h-full md:h-auto md:max-h-[90vh] md:rounded-3xl border-0 md:border border-white/10 shadow-2xl flex flex-col lg:flex-row relative overflow-hidden"
             >
                <button 
                  onClick={() => setSelectedAttorney(null)}
                  className="absolute top-4 right-4 z-50 bg-black/40 hover:bg-[#B2904D] text-white p-2 rounded-full transition-all border border-white/10 group"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform" />
                </button>

                {/* Media */}
                <div className="w-full lg:w-5/12 bg-black relative h-[35vh] lg:h-auto group">
                    {selectedAttorney.video ? (
                         <video 
                           src={selectedAttorney.video} 
                           controls 
                           autoPlay 
                           playsInline
                           className="w-full h-full object-cover"
                           poster={selectedAttorney.image} 
                         />
                    ) : (
                         <div className="relative w-full h-full">
                            <Image 
                              src={selectedAttorney.image} 
                              alt={selectedAttorney.name}
                              fill
                              className={selectedAttorney.id === 'lupita-valenzuela-martinez' 
                                ? "object-cover object-[center_20%]" 
                                : "object-cover object-top"}
                              onError={handleImageError}
                              unoptimized
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#002342] via-transparent to-transparent opacity-80"></div>
                         </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#002342] to-transparent lg:hidden">
                        <h2 className="text-3xl font-serif font-bold text-white">{selectedAttorney.name}</h2>
                        <p className="text-[#B2904D] text-sm">{getText(selectedAttorney.role)}</p>
                    </div>
                </div>

                {/* Info Content */}
                <div className="w-full lg:w-7/12 p-6 lg:p-10 overflow-y-auto bg-gradient-to-br from-[#002342] to-[#001a33] relative">
                    
                    <div className="hidden lg:block mb-8">
                        <div className="flex items-center gap-3 mb-2">
                             <div className="px-3 py-1 rounded bg-[#B2904D]/20 text-[#B2904D] text-xs font-bold uppercase tracking-wider border border-[#B2904D]/30">
                                 {texts.modal.badge[language]}
                             </div>
                        </div>
                        <h2 className="text-5xl font-serif font-bold text-white mb-1">
                          {selectedAttorney.name}
                        </h2>
                        <p className="text-gray-400 text-xl font-light flex items-center gap-2">
                           <Gavel size={18} /> {getText(selectedAttorney.role)}
                        </p>
                    </div>

                    {selectedAttorney.quote && (
                        <div className="mb-8 relative">
                            <div className="absolute -left-2 -top-2 text-[#B2904D]/20">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" /></svg>
                            </div>
                            <p className="text-[#B2904D] text-lg italic font-medium pl-8 relative z-10 border-l-2 border-[#B2904D]/50">
                                "{getText(selectedAttorney.quote)}"
                            </p>
                        </div>
                    )}

                    <div className="space-y-4 text-gray-300 leading-relaxed font-light mb-8 text-sm md:text-base text-justify">
                        {selectedAttorney.bio ? (
                            Array.isArray(getText(selectedAttorney.bio)) ? (
                                getText(selectedAttorney.bio).map((paragraph: string, idx: number) => (
                                    <p key={idx}>{paragraph}</p>
                                ))
                            ) : (
                                <p>{getText(selectedAttorney.bio)}</p>
                            )
                        ) : (
                            <p>{language === 'es' ? 'El abogado' : 'Attorney'} {selectedAttorney.name} {texts.modal.defaultBio[language]}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-4 bg-black/20 rounded-2xl border border-white/5">
                        <div>
                            <h4 className="text-white font-bold flex items-center gap-2 mb-3 text-sm uppercase tracking-wider">
                                <GraduationCap size={18} className="text-[#B2904D]" /> {texts.modal.education[language]}
                            </h4>
                            {selectedAttorney.education ? (
                                <ul className="text-xs md:text-sm text-gray-400 space-y-2">
                                    {selectedAttorney.education.map((edu: any, i: number) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#B2904D] mt-1.5"></div>
                                            {getText(edu)}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-xs text-gray-500 italic">{texts.modal.educationFallback[language]}</p>
                            )}
                        </div>
                        
                        <div>
                             <h4 className="text-white font-bold flex items-center gap-2 mb-3 text-sm uppercase tracking-wider">
                                {selectedAttorney.admissions ? <><Scale size={18} className="text-[#B2904D]" /> {texts.modal.admissions[language]}</> : <><Award size={18} className="text-[#B2904D]" /> {texts.modal.achievements[language]}</>} 
                            </h4>
                            {selectedAttorney.admissions ? (
                                <ul className="text-xs md:text-sm text-gray-400 space-y-2">
                                    {selectedAttorney.admissions.map((adm: any, i: number) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#B2904D] mt-1.5"></div>
                                            {getText(adm)}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-xs text-gray-500 italic">{texts.modal.admissionsFallback[language]}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-auto">
                        <a href="/#contacto" onClick={() => setSelectedAttorney(null)} className="w-full bg-gradient-to-r from-[#B2904D] to-[#9f7d3d] hover:from-white hover:to-white hover:text-[#002342] text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg shadow-black/40 group">
                            <Mail size={20} />
                            {texts.modal.button[language]}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}