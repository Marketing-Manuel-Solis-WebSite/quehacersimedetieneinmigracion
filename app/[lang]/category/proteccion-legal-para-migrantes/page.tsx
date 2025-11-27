'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { useLanguage } from '../../../context/LanguageContext'; // Asegúrate de que esta ruta sea correcta

// --- FUNCIÓN AUXILIAR PARA OBTENER EL TEXTO TRADUCIDO ---
// Necesitas esta función para manejar las traducciones anidadas en el objeto 'texts'
const getTranslatedText = (key: string, lang: 'es' | 'en') => {
  const parts = key.split('.');
  let current: any = texts;
  for (const part of parts) {
    if (current && current[part]) {
      current = current[part];
    } else {
      return ''; 
    }
  }
  // Intenta devolver el idioma solicitado, si no existe, usa español como fallback.
  return current[lang] || current.es;
};

// --- DATOS BILINGÜES COMPLETOS ---
const texts = {
  header: {
    library: { es: 'Biblioteca Legal', en: 'Legal Library' },
    title: { es: 'Protección Legal para Migrantes', en: 'Legal Protection for Migrants' },
    subtitle: {
      es: 'Encuentra información esencial, recursos, derechos y asistencia jurídica confiable para migrantes en diversas situaciones.',
      en: 'Find essential information, resources, rights, and reliable legal assistance for migrants in various situations.',
    },
  },
  article: {
    tag: { es: 'Artículo Legal', en: 'Legal Article' },
    read_full: { es: 'Leer artículo completo', en: 'Read Full Article' },
    // Días y meses deben ser traducidos por Next.js/date-fns, pero aquí centralizamos los datos
  },
  articles: [
    {
      id: 12938,
      title: { es: "Derechos de los Inmigrantes en Estados Unidos – Lo Que Debes Saber", en: "Immigrant Rights in the United States – What You Should Know" },
      url: "/proteccion-legal-para-migrantes/derechos-de-los-inmigrantes-en-estados-unidos",
      author: "Dan Motzer",
      date: { es: "febrero 18, 2025", en: "February 18, 2025" },
      isoDate: "2025-02-18",
      excerpt: {
        es: "El Bufete del Abogado Manuel Solis destaca que todos los inmigrantes, sin importar su estatus migratorio, tienen derechos fundamentales protegidos en EE.UU. Es clave conocer estos derechos para defenderse ante situaciones adversas.",
        en: "The Law Offices of Attorney Manuel Solis emphasize that all immigrants, regardless of their immigration status, have fundamental rights protected in the U.S. It is key to know these rights to defend oneself against adverse situations.",
      }
    },
    {
      id: 12340,
      title: { es: "Solicitar Asilo En EE.UU.: Conoce los Requisitos", en: "Applying for Asylum in the U.S.: Know the Requirements" },
      url: "/proteccion-legal-para-migrantes/solicitar-asilo-en-ee-uu-conoce-los-requisitos",
      author: "Julio César Sánchez",
      date: { es: "diciembre 3, 2024", en: "December 3, 2024" },
      isoDate: "2024-12-03",
      excerpt: {
        es: "Solicitar asilo en Estados Unidos permite a quienes temen persecución en su país de origen obtener protección. Si experimentas persecución por raza, religión, nacionalidad, pertenencia a un grupo social específico o tus opiniones políticas, puedes solicitar asilo.",
        en: "Applying for asylum in the United States allows those who fear persecution in their home country to obtain protection. If you experience persecution based on race, religion, nationality, membership in a particular social group, or political opinion, you may apply for asylum.",
      }
    },
    {
      id: 12084,
      title: { es: "Visa U: Requisitos Básicos para Solicitarla", en: "U Visa: Basic Requirements for Application" },
      url: "/proteccion-legal-para-migrantes/requisitos-basicos-para-solicitar-la-visa-u",
      author: "Julio César Sánchez",
      date: { es: "noviembre 29, 2024", en: "November 29, 2024" },
      isoDate: "2024-11-29",
      excerpt: {
        es: "La migración a Estados Unidos es una experiencia llena de desafíos, especialmente para aquellos que han enfrentado delitos graves en este país. Para estas personas, la Visa U representa no solo una solución legal, sino una segunda oportunidad.",
        en: "Migration to the United States is an experience full of challenges, especially for those who have faced serious crimes in this country. For these individuals, the U Visa represents not only a legal solution but a second chance.",
      }
    },
    {
      id: 11467,
      title: { es: "Protección Legal Urgente para Migrantes en EE.UU.: Qué Hacer si la Necesitas", en: "Urgent Legal Protection for Migrants in the U.S.: What to Do if You Need It" },
      url: "/proteccion-legal-para-migrantes/que-hacer-si-necesitas-proteccion-legal-urgente-en-ee-uu",
      author: "Julio César Sánchez",
      date: { es: "noviembre 26, 2024", en: "November 26, 2024" },
      isoDate: "2024-11-26",
      excerpt: {
        es: "Si enfrentas una situación legal inesperada en EE.UU., la rapidez y precisión en tus acciones son cruciales. Ya sea que te enfrentes a una detención, problemas con tu estatus migratorio o cualquier emergencia, actuar adecuadamente puede marcar la diferencia.",
        en: "If you face an unexpected legal situation in the U.S., speed and accuracy in your actions are crucial. Whether you face detention, problems with your immigration status, or any emergency, acting appropriately can make a difference.",
      }
    },
    {
      id: 11336,
      title: { es: "Opciones Legales para Migrantes en Proceso de Deportación", en: "Legal Options for Migrants in Deportation Proceedings" },
      url: "/proteccion-legal-para-migrantes/opciones-legales-para-migrantes-en-proceso-de-deportacion",
      author: "Julio César Sánchez",
      date: { es: "noviembre 25, 2024", en: "November 25, 2024" },
      isoDate: "2024-11-25",
      excerpt: {
        es: "Un procedimiento de deportación puede ser una experiencia desoladora y abrumadora para las personas sin papeles y sus familias. Sin embargo, existen múltiples opciones legales para migrantes que pueden ayudar a frenar o incluso detener este proceso.",
        en: "A deportation proceeding can be a heartbreaking and overwhelming experience for undocumented individuals and their families. However, there are multiple legal options for migrants that can help slow down or even stop this process.",
      }
    },
    {
      id: 11227,
      title: { es: "Servicios Legales para Migrantes en Situaciones de Riesgo", en: "Legal Services for Migrants in At-Risk Situations" },
      url: "/proteccion-legal-para-migrantes/servicios-legales-para-migrantes",
      author: "Julio César Sánchez",
      date: { es: "noviembre 23, 2024", en: "November 23, 2024" },
      isoDate: "2024-11-23",
      excerpt: {
        es: "En los Estados Unidos, millones de migrantes enfrentan desafíos legales, sociales y económicos que pueden poner en riesgo su bienestar y estabilidad. Desde detenciones por agentes de inmigración hasta discriminación laboral o acceso limitado a servicios esenciales.",
        en: "In the United States, millions of migrants face legal, social, and economic challenges that can risk their well-being and stability. This includes detentions by immigration agents, job discrimination, or limited access to essential services.",
      }
    },
    {
      id: 11130,
      title: { es: "Protección legal para migrantes: Obtenla en Estados Unidos", en: "Legal Protection for Migrants: Obtain It in the United States" },
      url: "/proteccion-legal-para-migrantes/proteccion-legal-para-migrantes-obtenla-en-estados-unidos",
      author: "Julio César Sánchez",
      date: { es: "noviembre 22, 2024", en: "November 22, 2024" },
      isoDate: "2024-11-22",
      excerpt: {
        es: "Miles de personas enfrentan una vida llena de incertidumbre y obstáculos debido a la falta de un estatus legal en Estados Unidos. Vivir sin documentos puede causar preocupaciones constantes y el temor a la separación familiar.",
        en: "Thousands of people face a life full of uncertainty and obstacles due to the lack of legal status in the United States. Living without documents can cause constant worries and the fear of family separation.",
      }
    },
    {
      id: 9858,
      title: { es: "Nombre del Puesto: Analista de sistemas informáticos", en: "Job Title: Computer Systems Analyst" },
      url: "/proteccion-legal-para-migrantes/titulo-profesional-analista-de-sistemas-informaticos",
      author: "Raul Zepeda",
      date: { es: "agosto 16, 2024", en: "August 16, 2024" },
      isoDate: "2024-08-16",
      excerpt: {
        es: "Requisitos: Se requiere Licenciatura en Sistemas de Información Gerencial. 40 horas semanales. Lunes a viernes: 9:00 a. m. a 5:00 p. m.",
        en: "Requirements: Bachelor of Science in Management Information Systems required. 40 hours per week. Monday through Friday: 9:00 a.m. to 5:00 p.m.",
      }
    },
    // Nota: Las siguientes entradas se han dejado en español solo porque su contenido no es de Ley de Inmigración,
    // y para un componente de traducción dinámica se traducirían de la misma manera que las anteriores,
    // usando un objeto { es: "...", en: "..." } en title, date y excerpt.
    // Para simplificar, asumo que las entradas de abajo deben tener su contenido original si no hay traducción definida.
    // En un caso real, necesitarías agregar los objetos de traducción para cada campo.
    {
      id: 6555,
      title: { es: "Negligencia Medica", en: "Medical Malpractice" },
      url: "/proteccion-legal-para-migrantes/malpractica-medica",
      author: "Raul Zepeda",
      date: { es: "noviembre 13, 2021", en: "November 13, 2021" },
      isoDate: "2021-11-13",
      excerpt: {
        es: "La negligencia médica es una atención deficiente proporcionada por un profesional médico a un paciente, que puede causar lesiones directamente o empeorar una condición existente.",
        en: "Medical malpractice is substandard care provided by a medical professional to a patient, which can directly cause injury or worsen an existing condition.",
      }
    },
    {
      id: 5439,
      title: { es: "Accidentes", en: "Accidents" },
      url: "/proteccion-legal-para-migrantes/los-accidentes-son-definidos-como-sucesos-imprevistos-que-alteran-el-orden-normal-o-previsto-de-las-cosas-especialmente-si-causan-danos-a-una-persona-o-cosa",
      author: "Raul Zepeda",
      date: { es: "noviembre 7, 2021", en: "November 7, 2021" },
      isoDate: "2021-11-07",
      excerpt: {
        es: "Los accidentes son definidos como sucesos imprevistos que alteran el orden normal o previsto de las cosas, especialmente si causan daños a una persona o cosa.",
        en: "Accidents are defined as unforeseen events that alter the normal or planned order of things, especially if they cause damage to a person or thing.",
      }
    },
    {
      id: 5483,
      title: { es: "ACCIDENTES DE CAMIONES DE CARGA", en: "COMMERCIAL TRUCK ACCIDENTS" },
      url: "/proteccion-legal-para-migrantes/accidentes-de-camiones-de-carga",
      author: "Raul Zepeda",
      date: { es: "octubre 16, 2021", en: "October 16, 2021" },
      isoDate: "2021-10-16",
      excerpt: {
        es: "Los camiones de carga tipo trailer, son vehículos extremadamente peligrosos y vulnerables. Son normalmente grandes, pesados y difíciles de maniobrar. Pero si a estos factores agregamos el hecho de que muchas veces las compañías no dan el mantenimiento adecuado a sus vehículos.",
        en: "Trailer-type freight trucks are extremely dangerous and vulnerable vehicles. They are typically large, heavy, and difficult to maneuver. But if we add to these factors the fact that companies often do not provide adequate maintenance to their vehicles.",
      }
    },
    {
      id: 5489,
      title: { es: "NUEVAS ESPERANZAS PARA ALGUNOS DEPORTADOS Y SUS FAMILIAS EN LOS ESTADOS UNIDOS", en: "NEW HOPE FOR SOME DEPORTEES AND THEIR FAMILIES IN THE UNITED STATES" },
      url: "/proteccion-legal-para-migrantes/nuevas-esperanzas-para-algunos-deportados-y-sus-familias-en-los-estados-unidos",
      author: "Raul Zepeda",
      date: { es: "septiembre 3, 2021", en: "September 3, 2021" },
      isoDate: "2021-09-03",
      excerpt: {
        es: "Uno de los compromisos de la Administración Biden ha sido el de revisar miles de casos de deportación y reunir a los que reúnen los requisitos con sus familias estadounidenses.",
        en: "One of the Biden Administration's commitments has been to review thousands of deportation cases and reunite those who meet the requirements with their American families.",
      }
    },
    {
      id: 5925,
      title: { es: "LA USICS PRESIDE UN NUEVO GRUPO DE TRABAJO A FAVOR DE LOS MIGRANTES", en: "USICS HEADS UP A NEW WORKING GROUP FOR MIGRANTS" },
      url: "/proteccion-legal-para-migrantes/la-usics-preside-un-nuevo-grupo-de-trabajo-a-favor-de-los-migrantes",
      author: "Raul Zepeda",
      date: { es: "agosto 13, 2021", en: "August 13, 2021" },
      isoDate: "2021-08-13",
      excerpt: {
        es: "En respuesta a la Orden Ejecutiva sobre la Restauración de la Fe en Nuestros Sistemas de Inmigración Legal, la oficina del Servicio de Ciudadanía e Inmigración de Estados Unidos (USCIS) ha encabezado un nuevo Grupo de Trabajo enfocado en la Naturalización.",
        en: "In response to the Executive Order on Restoring Faith in Our Legal Immigration Systems, the U.S. Citizenship and Immigration Services (USCIS) office has spearheaded a new Working Group focused on Naturalization.",
      }
    },
    {
      id: 5931,
      title: { es: "CAMBIOS IMPORTANTES EN LAS POLÍTICAS DE INMIGRACIÓN EN LOS PRIMEROS 100 DÍAS DE BIDEN COMO PRESIDENTE", en: "IMPORTANT CHANGES IN IMMIGRATION POLICIES DURING BIDEN'S FIRST 100 DAYS AS PRESIDENT" },
      url: "/proteccion-legal-para-migrantes/cambios-importantes-en-las-politicas-de-inmigracion-en-los-primeros-100-dias-de-biden-como-presidente",
      author: "Raul Zepeda",
      date: { es: "mayo 25, 2021", en: "May 25, 2021" },
      isoDate: "2021-05-25",
      excerpt: {
        es: "Durante su presidencia, Donald Trump estableció más de 400 acciones ejecutivas concernientes a la inmigración. Desde que Biden tomó la presidencia, ya ha revocado o hecho cambios a un buen número de ellos.",
        en: "During his presidency, Donald Trump established over 400 executive actions concerning immigration. Since Biden took the presidency, he has revoked or made changes to a good number of them.",
      }
    },
    {
      id: 6011,
      title: { es: "¿SUFRIÓ DAÑOS Y PÉRDIDAS DESPUÉS DE LA GRAN TORMENTA INVERNAL?", en: "DID YOU SUFFER DAMAGES AND LOSSES AFTER THE GREAT WINTER STORM?" },
      url: "/proteccion-legal-para-migrantes/sufrio-danos-y-perdidas-despues-de-la-gran-tormenta-invernal",
      author: "Raul Zepeda",
      date: { es: "marzo 2, 2021", en: "March 2, 2021" },
      isoDate: "2021-03-02",
      excerpt: {
        es: "Si su casa o propiedad fue dañada o sufrió otras pérdidas debido al clima y/o cortes de energía, la siguiente es información importante que debe saber.",
        en: "If your house or property was damaged or suffered other losses due to the weather and/or power outages, the following is important information you should know.",
      }
    },
    {
      id: 6122,
      title: { es: "QUE HACER CUANDO SU TUBERIA SE DAÑA DEBIDO AL FRIO", en: "WHAT TO DO WHEN YOUR PIPES ARE DAMAGED DUE TO THE COLD" },
      url: "/proteccion-legal-para-migrantes/que-hacer-cuando-su-tuberia-se-dana-debe-al-frio",
      author: "Raul Zepeda",
      date: { es: "febrero 20, 2021", en: "February 20, 2021" },
      isoDate: "2021-02-20",
      excerpt: {
        es: "Con la tormenta invernal histórica que ha afectado a nuestro estado en los últimos días, los propietarios de viviendas podrían encontrarse con que muchas de sus tuberías se han reventado o roto.",
        en: "With the historic winter storm that has affected our state in recent days, homeowners may find that many of their pipes have burst or broken.",
      }
    },
    {
      id: 6132,
      title: { es: "PLAN DE INMIGRACIÓN DE BIDEN PARA INMIGRANTES INDOCUMENTADOS", en: "BIDEN'S IMMIGRATION PLAN FOR UNDOCUMENTED IMMIGRANTS" },
      url: "/proteccion-legal-para-migrantes/plan-de-inmigracion-de-biden-para-inmigrantes-indocumentados",
      author: "Raul Zepeda",
      date: { es: "enero 22, 2021", en: "January 22, 2021" },
      isoDate: "2021-01-22",
      excerpt: {
        es: "Uno de los primeros actos del presidente Joe Biden ha sido enviar al Congreso su propuesta para un plan de inmigración que incluye ofrecer un camino hacia la ciudadanía que tomaría ocho años para las aproximadamente 11 millones de personas sin estatus legal.",
        en: "One of President Joe Biden's first acts has been to send Congress his proposal for an immigration plan that includes offering an eight-year path to citizenship for the approximately 11 million people without legal status.",
      }
    },
    {
      id: 6158,
      title: { es: "ALGUNAS BUENAS NOTICIAS PARA INMIGRANTES", en: "SOME GOOD NEWS FOR IMMIGRANTS" },
      url: "/proteccion-legal-para-migrantes/algunas-buenas-noticias-para-inmigrantes",
      author: "Raul Zepeda",
      date: { es: "diciembre 24, 2020", en: "December 24, 2020" },
      isoDate: "2020-12-24",
      excerpt: {
        es: "Biden ha prometido revocar rápidamente muchas de las políticas de inmigración que la administración Trump pudo implementar a través de una orden ejecutiva y que dificultó para muchos el proceso de regularizar su situación migratoria.",
        en: "Biden has promised to quickly revoke many of the immigration policies that the Trump administration was able to implement through executive order and which made the process of regularizing their immigration status difficult for many.",
      }
    },
    {
      id: 6166,
      title: { es: "BUENAS NOTICIAS PARA LOS QUE CALIFICAN PARA DACA", en: "GOOD NEWS FOR THOSE WHO QUALIFY FOR DACA" },
      url: "/proteccion-legal-para-migrantes/buenas-noticias-para-los-que-califican-para-daca",
      author: "Raul Zepeda",
      date: { es: "diciembre 12, 2020", en: "December 12, 2020" },
      isoDate: "2020-12-12",
      excerpt: {
        es: "Hay buenas noticias para las más de un millón de personas – de hecho se estima que son alrededor de 1,3 millones – que han llegado a calificar para DACA desde que la Administración Trump terminó el programa en septiembre de 2017.",
        en: "There is good news for the more than a million people – in fact, it is estimated that there are around 1.3 million – who have become eligible for DACA since the Trump Administration ended the program in September 2017.",
      }
    },
    {
      id: 6172,
      title: { es: "POSIBLES CAMBIOS Y NUEVAS POLÍTICAS BAJO LA PRESIDENCIA DE BIDEN", en: "POSSIBLE CHANGES AND NEW POLICIES UNDER THE BIDEN PRESIDENCY" },
      url: "/proteccion-legal-para-migrantes/posibles-cambios-y-nuevas-politicas-bajo-la-presidencia-de-biden",
      author: "Raul Zepeda",
      date: { es: "diciembre 4, 2020", en: "December 4, 2020" },
      isoDate: "2020-12-04",
      excerpt: {
        es: "Una pregunta que muchos hispanos han hecho es… ¿Cómo afectará una presidencia de Biden a su Comunidad? Aunque las siguientes no son políticas o propuestas dirigidas directamente a los hispanos, si les afectarán como a toda la población.",
        en: "A question that many Hispanics have asked is... How will a Biden presidency affect their Community? Although the following are not policies or proposals aimed directly at Hispanics, they will affect them as they will the entire population.",
      }
    },
    {
      id: 6179,
      title: { es: "EL PODER DEL VOTO HISPANO EN LAS ELECCIONES 2020", en: "THE POWER OF THE HISPANIC VOTE IN THE 2020 ELECTIONS" },
      url: "/proteccion-legal-para-migrantes/el-poder-del-voto-hispano-en-las-elecciones-2020",
      author: "Raul Zepeda",
      date: { es: "noviembre 14, 2020", en: "November 14, 2020" },
      isoDate: "2020-11-14",
      excerpt: {
        es: "¿Votó en las elecciones que acabamos de tener? Si su respuesta es sí … ¡felicidades! Su voto tiene poder. De hecho, En 2020, los hispanos ahora son la “minoría” con la mayor cantidad de votantes en los Estados Unidos.",
        en: "Did you vote in the elections we just had? If your answer is yes... congratulations! Your vote has power. In fact, in 2020, Hispanics are now the 'minority' with the highest number of voters in the United States.",
      }
    },
    {
      id: 6185,
      title: { es: "LAS POLÍTICAS DE INMIGRACIÓN DE TRUMP Y BIDEN", en: "THE IMMIGRATION POLICIES OF TRUMP AND BIDEN" },
      url: "/proteccion-legal-para-migrantes/las-politicas-de-inmigracion-de-trump-y-biden",
      author: "Raul Zepeda",
      date: { es: "octubre 30, 2020", en: "October 30, 2020" },
      isoDate: "2020-10-30",
      excerpt: {
        es: "Inmigración – ¿Cómo podría ser bajo cada administración? Esta es una pregunta que muchos hacen – de hecho, es el sexto tema más importante al decidir por quién votar.",
        en: "Immigration – How could it be under each administration? This is a question many ask – in fact, it is the sixth most important issue when deciding who to vote for.",
      }
    },
    {
      id: 6191,
      title: { es: "¡EJERZA SU DERECHO!", en: "EXERCISE YOUR RIGHT!" },
      url: "/proteccion-legal-para-migrantes/ejerza-su-derecho",
      author: "Raul Zepeda",
      date: { es: "octubre 17, 2020", en: "October 17, 2020" },
      isoDate: "2020-10-17",
      excerpt: {
        es: "Votar en las elecciones es un gran privilegio, porque es su oportunidad para ayudar a decidir quién será presidente de los Estados Unidos y quiénes lo representarán a usted en el Congreso de los Estados Unidos.",
        en: "Voting in elections is a great privilege, because it is your opportunity to help decide who will be president of the United States and who will represent you in the United States Congress.",
      }
    },
    {
      id: 6200,
      title: { es: "¡OBTENER LA CIUDADANÍA OFRECE BENEFICIOS IMPORTANTES!", en: "OBTAINING CITIZENSHIP OFFERS IMPORTANT BENEFITS!" },
      url: "/proteccion-legal-para-migrantes/obtener-la-ciudadania-ofrece-beneficios-importantes",
      author: "Raul Zepeda",
      date: { es: "octubre 2, 2020", en: "October 2, 2020" },
      isoDate: "2020-10-02",
      excerpt: {
        es: "Si usted o seres queridos califican para la ciudadanía y la han estado posponiendo por alguna razón, puede que ahora sea el momento de proceder.",
        en: "If you or loved ones qualify for citizenship and have been putting it off for some reason, now may be the time to proceed.",
      }
    },
    {
      id: 6206,
      title: { es: "EL 2 DE OCTUBRE EL GOBIERNO AUMENTA TARIFAS PARA SERVICIOS DE INMIGRACIÓN", en: "ON OCTOBER 2ND, GOVERNMENT INCREASES FEES FOR IMMIGRATION SERVICES" },
      url: "/proteccion-legal-para-migrantes/el-2-de-octubre-el-gobierno-aumenta-tarifas-para-servicios-de-inmigracion",
      author: "Raul Zepeda",
      date: { es: "septiembre 18, 2020", en: "September 18, 2020" },
      isoDate: "2020-09-18",
      excerpt: {
        es: "Si usted tiene planes de meter su petición para la ciudadanía americana – o si está necesitando solicitar o renovar su permiso para trabajar en los Estados Unidos, hágalo inmediatamente.",
        en: "If you plan to file your petition for American citizenship – or if you need to apply for or renew your work permit in the United States, do so immediately.",
      }
    },
    {
      id: 6212,
      title: { es: "AUMENTO EN LAS TARIFAS Y LARGOS RETRASOS EN LOS SERVICIOS DE INMIGRACIÓN", en: "FEE INCREASE AND LONG DELAYS IN IMMIGRATION SERVICES" },
      url: "/proteccion-legal-para-migrantes/aumento-en-las-tarifas-y-largos-retrasos-en-los-servicios-de-inmigracion-2",
      author: "Raul Zepeda",
      date: { es: "agosto 14, 2020", en: "August 14, 2020" },
      isoDate: "2020-08-14",
      excerpt: {
        es: "Durante las últimas semanas, mucho se ha escuchado acerca del un nuevo Paquete de Alivio por el Coronavirus. Desafortunadamente, el Congreso no llegó a ningún acuerdo, y no se volverá a reunir hasta septiembre.",
        en: "During the last few weeks, much has been heard about a new Coronavirus Relief Package. Unfortunately, Congress did not reach an agreement and will not meet again until September.",
      }
    },
    {
      id: 6218,
      title: { es: "EL COSTO PARA SOLICITAR LA CIUDADANÍA AMERICANA AUMENTARÁ DRÁSTICAMENTE", en: "THE COST TO APPLY FOR AMERICAN CITIZENSHIP WILL INCREASE DRAMATICALLY" },
      url: "/proteccion-legal-para-migrantes/el-costo-para-solicitar-la-ciudadania-americana-aumentara-drasticamente",
      author: "Raul Zepeda",
      date: { es: "agosto 7, 2020", en: "August 7, 2020" },
      isoDate: "2020-08-07",
      excerpt: {
        es: "Si usted es un residente legal de los Estados Unidos y ha estado considerando solicitar la ciudadanía, tiene desde ahora hasta el 1 de octubre para solicitarla a la tarifa actual de 640.00.",
        en: "If you are a legal resident of the United States and have been considering applying for citizenship, you have now until October 1st to apply at the current fee of 640.00.",
      }
    },
    {
      id: 6225,
      title: { es: "DACA – ÚLTIMAS NOTICIAS Y RECOMENDACIONES", en: "DACA – LATEST NEWS AND RECOMMENDATIONS" },
      url: "/proteccion-legal-para-migrantes/daca-ultimas-noticias-y-recomendaciones",
      author: "Raul Zepeda",
      date: { es: "julio 31, 2020", en: "July 31, 2020" },
      isoDate: "2020-07-31",
      excerpt: {
        es: "Afortunadamente, el presidente Trump no va a tratar de cancelar el programa DACA inmediatamente, sino que lo están revisando, y es posible que cambie de idea y no lo cancelen.",
        en: "Fortunately, President Trump will not try to cancel the DACA program immediately, but they are reviewing it, and it is possible that he will change his mind and not cancel it.",
      }
    },
    {
      id: 6232,
      title: { es: "EL GOBIERNO DEBE COMENZAR A ACEPTAR NUEVAS PETICIONES PARA DACA", en: "THE GOVERNMENT MUST BEGIN ACCEPTING NEW PETITIONS FOR DACA" },
      url: "/proteccion-legal-para-migrantes/el-gobierno-debe-comenzar-a-aceptar-nuevas-peticiones-para-daca",
      author: "Raul Zepeda",
      date: { es: "julio 24, 2020", en: "July 24, 2020" },
      isoDate: "2020-07-24",
      excerpt: {
        es: "La Suprema Corte de los Estados Unidos determinó que el gobierno de Trump no había terminado correctamente el programa de DACA.",
        en: "The Supreme Court of the United States determined that the Trump administration had not properly terminated the DACA program.",
      }
    },
    {
      id: 6238,
      title: { es: "UN SERIO DÉFICIT DEL USCIS AMENAZA FRENAR LOS SERVICIOS DE INMIGRACIÓN", en: "A SERIOUS USCIS DEFICIT THREATENS TO SLOW DOWN IMMIGRATION SERVICES" },
      url: "/proteccion-legal-para-migrantes/un-serio-deficit-del-uscis-amenaza-frenar-los-servicios-de-inmigracion",
      author: "Raul Zepeda",
      date: { es: "julio 10, 2020", en: "July 10, 2020" },
      isoDate: "2020-07-10",
      excerpt: {
        es: "La Agencia de Servicios de Ciudadanía e Inmigración de los Estados Unidos (USCIS), que procesa todas las solicitudes de visa, otorga ciudadanías y proporciona beneficios de inmigración, está enfrentando un serio déficit presupuestario.",
        en: "The U.S. Citizenship and Immigration Services (USCIS) Agency, which processes all visa applications, grants citizenships, and provides immigration benefits, is facing a serious budget deficit.",
      }
    },
    {
      id: 6244,
      title: { es: "¿USTED CALIFICA PARA DACA?", en: "DO YOU QUALIFY FOR DACA?" },
      url: "/proteccion-legal-para-migrantes/si-usted-califica-para-daca-podria-calificar-para-un-permiso-de-trabajar",
      author: "Raul Zepeda",
      date: { es: "junio 26, 2020", en: "June 26, 2020" },
      isoDate: "2020-06-26",
      excerpt: {
        es: "La semana pasada, la Corte Suprema impidió que la administración del presidente Trump terminara el programa de DACA. Esta es una gran victoria para los recipientes de DACA.",
        en: "Last week, the Supreme Court prevented the administration of President Trump from terminating the DACA program. This is a great victory for DACA recipients.",
      }
    },
    {
      id: 6250,
      title: { es: "¿PROTESTAR O NO? UNA ELECCIÓN DIFÍCIL PARA LOS INMIGRANTES", en: "TO PROTEST OR NOT TO PROTEST? A DIFFICULT CHOICE FOR IMMIGRANTS" },
      url: "/proteccion-legal-para-migrantes/protestar-o-no-una-eleccion-dificil-para-los-inmigrantes",
      author: "Raul Zepeda",
      date: { es: "junio 17, 2020", en: "June 17, 2020" },
      isoDate: "2020-06-17",
      excerpt: {
        es: "Un artículo reciente en CNN.com habla de las decisiones difíciles que deben tomar los inmigrantes que están aquí con visa, si quieren apoyar y participar en las protestas de Black Lives Matter y similares.",
        en: "A recent article on CNN.com discusses the difficult decisions that immigrants who are here on a visa must make if they want to support and participate in the Black Lives Matter and similar protests.",
      }
    },
    {
      id: 6256,
      title: { es: "700,000 PARTICIPANTES DEL PROGRAMA DACA ESPERAN ANSIOSAMENTE LA DECISIÓN DE LA CORTE SUPREMA", en: "700,000 DACA PROGRAM PARTICIPANTS ANXIOUSLY AWAIT SUPREME COURT DECISION" },
      url: "/proteccion-legal-para-migrantes/700-000-participantes-del-programa-daca-esperan-ansiosamente-la-decision-de-la-corte-suprema",
      author: "Raul Zepeda",
      date: { es: "junio 6, 2020", en: "June 6, 2020" },
      isoDate: "2020-06-06",
      excerpt: {
        es: "El entonces presidente Obama estableció DACA por orden ejecutivo en el año 2012, como un alivio temporal para darle tiempo al Congreso a pasar leyes permanentes.",
        en: "Then-President Obama established DACA by executive order in 2012, as temporary relief to give Congress time to pass permanent laws.",
      }
    },
    {
      id: 6262,
      title: { es: "POR QUÉ TEMEN LOS INMIGRANTES LEGALES SOLICITAR LA PRESTACIÓN POR DESEMPLEO", en: "WHY LEGAL IMMIGRANTS FEAR APPLYING FOR UNEMPLOYMENT BENEFITS" },
      url: "/proteccion-legal-para-migrantes/por-que-temen-los-inmigrantes-legales-solicitar-la-prestacion-por-desempleo",
      author: "Raul Zepeda",
      date: { es: "mayo 28, 2020", en: "May 28, 2020" },
      isoDate: "2020-05-28",
      excerpt: {
        es: "Inmigrantes preguntan si solicitar la prestación por desempleo será una señal de humo en cuanto a su situación, causando que los expulsen del país al negarles la renovación de sus visas o green cards.",
        en: "Immigrants ask if applying for unemployment benefits will be a smoke signal regarding their situation, causing them to be expelled from the country by denying the renewal of their visas or green cards.",
      }
    },
    {
      id: 6345,
      title: { es: "“SUEÑO Y PROMESA” PODRÍA SER EL CAMINO A LA LEGALIZACIÓN DEFINITIVA DE LOS DACA", en: "“DREAM AND PROMISE” COULD BE THE PATH TO DEFINITIVE LEGALIZATION FOR DACA RECIPIENTS" },
      url: "/proteccion-legal-para-migrantes/sueno-y-promesa-podria-ser-el-camino-a-la-legalizacion-definitiva-de-los-daca",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "El nuevo programa aprobado y vigente, promete ofrecer una via para la legalización definitiva a los beneficiarios del TPS y del DACA.",
        en: "The new approved and current program promises to offer a path to definitive legalization for TPS and DACA recipients.",
      }
    },
    {
      id: 6339,
      title: { es: "REDADA DE ICE EN ALLEN, TEXAS", en: "ICE RAID IN ALLEN, TEXAS" },
      url: "/proteccion-legal-para-migrantes/redada-de-ice-en-allen-texas",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "El sitio que fue allanado por ICE fue CVE Technology Group Inc. en Allen, Texas. Los primeros informes detallados que aproximadamente 280 personas han sido detenidas.",
        en: "The site raided by ICE was CVE Technology Group Inc. in Allen, Texas. Initial detailed reports state that approximately 280 people have been detained.",
      }
    },
    {
      id: 6319,
      title: { es: "LAS NUEVAS REGLAS PARA OBTENER LA GREEN CARD NO SON LO QUE PARECE", en: "THE NEW RULES FOR OBTAINING THE GREEN CARD ARE NOT WHAT THEY SEEM" },
      url: "/proteccion-legal-para-migrantes/las-nuevas-reglas-para-obtener-la-green-card-no-son-lo-que-parece",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "Si bien es cierto que la noticia es que el gobierno de Donald Trump hará más difícil que los migrantes legales que dependen de la asistencia pública —como vales de comida— consigan finalmente la residencia permanente, no se trata de algo nuevo.",
        en: "While it is true that the news is that the Donald Trump administration will make it more difficult for legal migrants who rely on public assistance—such as food stamps—to finally obtain permanent residency, this is not something new.",
      }
    },
    {
      id: 6312,
      title: { es: "MÁS DE 800 INMIGRANTES CON ÓRDENES DE DEPORTACIÓN OBTIENEN CIUDADANÍA POR FALLA DE SEGURIDAD", en: "MORE THAN 800 IMMIGRANTS WITH DEPORTATION ORDERS OBTAIN CITIZENSHIP DUE TO SECURITY FAILURE" },
      url: "/proteccion-legal-para-migrantes/mas-de-800-inmigrantes-con-ordenes-de-deportacion-obtienen-ciudadania-por-falla-de-seguridad",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "El gobierno federal estadounidense concedió erróneamente la ciudadanía a por lo menos 858 inmigrantes que tenían órdenes de deportación pendientes a países de interés para la seguridad nacional, reveló un informe del auditor del Departamento.",
        en: "The U.S. federal government erroneously granted citizenship to at least 858 immigrants who had pending deportation orders to countries of national security concern, a departmental auditor's report revealed.",
      }
    },
    {
      id: 6305,
      title: { es: "EL HURACÁN FLORENCIA CAUSA LA PEOR INUNDACIÓN EN LA HISTORIA DE LA COSTA ESTE", en: "HURRICANE FLORENCE CAUSES WORST FLOODING IN EAST COAST HISTORY" },
      url: "/proteccion-legal-para-migrantes/el-huracan-florencia-causa-la-peor-inundacion-en-la-historia-de-la-costa-este",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "El huracán Florence causó la peor inundación en la historia de la Costa Este. Florence arribó en las Carolinas el 14 de septiembre y trajo consigo niveles de inundación jamás vistos.",
        en: "Hurricane Florence caused the worst flooding in East Coast history. Florence arrived in the Carolinas on September 14 and brought with it unprecedented flood levels.",
      }
    },
    {
      id: 6298,
      title: { es: "ESTADO ACTUAL INMIGRATORIO EN DENVER", en: "CURRENT IMMIGRATION STATUS IN DENVER" },
      url: "/proteccion-legal-para-migrantes/estado-actual-inmigratorio-en-denver",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "El tema de inmigración, siempre ha sido parte de la fundación de nuestra nación. Como el Presidente George W. Bush dijo. 'Casi todos los americanos tienen ancestros quienes se atrevieron a cruzar los océanos…'",
        en: "The issue of immigration has always been part of the foundation of our nation. As President George W. Bush said. 'Almost all Americans have ancestors who dared to cross the oceans…'",
      }
    },
    {
      id: 6292,
      title: { es: "LA NUEVA PROPUESTA DE TRUMP PODRÍA HACER IMPOSIBLE A LOS SOLICITANTES DE ASILO VIVIR EN LOS EEUU", en: "TRUMP'S NEW PROPOSAL COULD MAKE IT IMPOSSIBLE FOR ASYLUM SEEKERS TO LIVE IN THE U.S." },
      url: "/proteccion-legal-para-migrantes/la-nueva-propuesta-de-trump-podria-hacer-imposible-a-los-solicitantes-de-asilo-vivir-en-los-eeuu",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "Los solicitantes de asilo tendrían que esperar hasta que su caso se resuelva para obtener la autorización de trabajo, lo que puede tardar años en ocurrir.",
        en: "Asylum seekers would have to wait until their case is resolved to obtain work authorization, which can take years to happen.",
      }
    },
    {
      id: 6286,
      title: { es: "VARIOS ESTADOS PERMITEN A LOS INMIGRANTES SIN PAPELES SACARSE LA LICENCIA DE MANEJO", en: "SEVERAL STATES ALLOW UNDOCUMENTED IMMIGRANTS TO GET DRIVER'S LICENSES" },
      url: "/proteccion-legal-para-migrantes/varios-estados-permiten-a-los-inmigrantes-sin-papeles-sacarse-la-licencia-de-manejo",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "Aunque es cierto que existen maneras de obtener una licencia de manejo en algunos estados sin tener un estatus migratorio legal en el país, estados como Texas lo hacen una misión imposible.",
        en: "Although it is true that there are ways to obtain a driver's license in some states without having legal immigration status in the country, states like Texas make it an impossible mission.",
      }
    },
    {
      id: 6277,
      title: { es: "TERMINAL INTERCONTINENTAL DE LA COMPAÑIA (ITC) INCIDENTE DE PLANTA EN DEER PARK", en: "INTERCONTINENTAL TERMINAL COMPANY (ITC) PLANT INCIDENT IN DEER PARK" },
      url: "/proteccion-legal-para-migrantes/terminal-intercontinental-de-la-compania-itc-incidente-de-planta-en-deer-park",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "Las Oficinas Legales de Manuel Solis ahora buscan ayudar a las personas que han sido afectadas o creen que pudieron haber sido afectadas por el reciente Intercontinental Terminal Company (ITC) Incidente de una planta en Deer Park.",
        en: "The Law Offices of Manuel Solis are now looking to help people who have been affected or believe they may have been affected by the recent Intercontinental Terminal Company (ITC) plant incident in Deer Park.",
      }
    },
    {
      id: 6271,
      title: { es: "4 DE ABRIL DE 2019 CVE TECH RAID EN ALLEN, TEXAS", en: "APRIL 4, 2019 CVE TECH RAID IN ALLEN, TEXAS" },
      url: "/proteccion-legal-para-migrantes/4-de-abril-de-2019-cve-tech-raid-en-allen-texas",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "A principios del 4 de abril de 2019, más de 200 agentes de Inmigración y Control de Aduanas (ICE) realizaron una de las redadas más grandes en la última década. El sitio que fue allanado por ICE fue CVE Technology Group Inc. en Allen, Texas.",
        en: "Early on April 4, 2019, more than 200 Immigration and Customs Enforcement (ICE) agents conducted one of the largest raids in the last decade. The site raided by ICE was CVE Technology Group Inc. in Allen, Texas.",
      }
    },
    {
      id: 6148,
      title: { es: "LOS MEXICANOS EN ESTADOS UNIDOS, EL GRUPO QUE MÁS TARDA EN COMENZAR EL PROCESO PARA OBTENER LA CIUDADANÍA", en: "MEXICANS IN THE UNITED STATES, THE GROUP THAT TAKES THE LONGEST TO START THE CITIZENSHIP PROCESS" },
      url: "/proteccion-legal-para-migrantes/los-mexicanos-en-estados-unidos-el-grupo-que-mas-tarda-en-comenzar-el-proceso-para-obtener-la-ciudadania-estadounidense",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "¿Sabías que cerca de 2.6 millones de mexicanos que radican en los Estados Unidos califican para la ciudadanía estadounidense?",
        en: "Did you know that nearly 2.6 million Mexicans residing in the United States qualify for U.S. citizenship?",
      }
    },
    {
      id: 6387,
      title: { es: "LOS PROPIETARIOS DE VIVIENDAS AFECTADOS POR LA EXPLOSIÓN DE LA PLANTA EN EL NOROESTE DE HOUSTON", en: "HOMEOWNERS AFFECTED BY THE PLANT EXPLOSION IN NORTHWEST HOUSTON" },
      url: "/proteccion-legal-para-migrantes/los-propietarios-de-viviendas-afectados-por-la-explosion-de-la-planta-en-el-noroeste-de-houston-podrian-obtener-una-indemnizacion-por-danos",
      author: "Raul Zepeda",
      date: { es: "marzo 14, 2020", en: "March 14, 2020" },
      isoDate: "2020-03-14",
      excerpt: {
        es: "Más de 200 personas fueron afectadas por la explosión ocurrida en la planta Watson Grinding & Manufacturing ubicada fuera del área metropolitana de Houston al noroeste. Se han producido al menos dos muertos y múltiples heridos.",
        en: "More than 200 people were affected by the explosion at the Watson Grinding & Manufacturing plant located outside the metropolitan area of Northwest Houston. There have been at least two deaths and multiple injuries.",
      }
    },
    {
      id: 6380,
      title: { es: "ADHARA, UNA INMIGRANTE MEXICANA CON UN COEFICIENTE INTELECTUAL JAMÁS VISTO", en: "ADHARA, A MEXICAN IMMIGRANT WITH AN UNPRECEDENTED INTELLECTUAL QUOTIENT" },
      url: "/proteccion-legal-para-migrantes/adhara-una-inmigrante-mexicana-con-un-coeficiente-intelectual-jamas-visto",
      author: "Raul Zepeda",
      date: { es: "marzo 14, 2020", en: "March 14, 2020" },
      isoDate: "2020-03-14",
      excerpt: {
        es: "Una niña mexicana está rompiendo todas las marcas en inteligencia con un coeficiente intelectual de 162 IQ por encima de científicos de renombre internacional como Stephen Hawking o Albert Einstein.",
        en: "A Mexican girl is breaking all intelligence records with an IQ of 162, higher than internationally renowned scientists like Stephen Hawking or Albert Einstein.",
      }
    },
    {
      id: 6373,
      title: { es: "CHICAGO VOTADA LA CIUDAD MÁS AMIGABLE PARA LOS INMIGRANTES DE LOS ESTADOS UNIDOS", en: "CHICAGO VOTED MOST IMMIGRANT-FRIENDLY CITY IN THE UNITED STATES" },
      url: "/proteccion-legal-para-migrantes/chicago-votada-la-ciudad-mas-amigable-para-los-inmigrantes-de-los-estados-unidos",
      author: "Raul Zepeda",
      date: { es: "marzo 14, 2020", en: "March 14, 2020" },
      isoDate: "2020-03-14",
      excerpt: {
        es: "La mayoría de las ciudades del medio oeste de los Estados Unidos ha sacado una nota excelente en cuanto a las relaciones con los inmigrantes que viven en ellas según el reporte elaborado por New American Economy.",
        en: "Most cities in the midwestern United States have received an excellent score regarding relationships with the immigrants living in them, according to the report prepared by New American Economy.",
      }
    },
    {
      id: 6366,
      title: { es: "EL BUEN CARÁCTER MORAL SE CONVIERTE EN CLAVE PARA OBTENER LA CIUDADANÍA", en: "GOOD MORAL CHARACTER BECOMES KEY TO OBTAINING CITIZENSHIP" },
      url: "/proteccion-legal-para-migrantes/el-buen-caracter-moral-se-convierte-en-clave-para-obtener-la-ciudadania",
      author: "Raul Zepeda",
      date: { es: "marzo 14, 2020", en: "March 14, 2020" },
      isoDate: "2020-03-14",
      excerpt: {
        es: "Muchos residentes permanentes podrían ver sus sueños frustrados y tener que esperar hasta 5 años para poder concluir su proceso migratorio y naturalizarse.",
        en: "Many permanent residents could see their dreams frustrated and have to wait up to 5 years to conclude their immigration process and naturalize.",
      }
    },
    {
      id: 6359,
      title: { es: "EL PROGRAMA GLOBAL ENTRY DEJARÁ DE SER PARA LOS NEOYORQUINOS COMO CASTIGO POR LA LEY DE LUZ VERDE", en: "GLOBAL ENTRY PROGRAM WILL BE TERMINATED FOR NEW YORKERS AS PUNISHMENT FOR THE GREEN LIGHT LAW" },
      url: "/proteccion-legal-para-migrantes/el-programa-global-entry-dejara-de-ser-para-los-neoyorquinos-como-castigo-por-la-ley-de-luz-verde",
      author: "Raul Zepeda",
      date: { es: "marzo 14, 2020", en: "March 14, 2020" },
      isoDate: "2020-03-14",
      excerpt: {
        es: "La administración Trump reacciona así contra la emisión de licencias de manejo a inmigrantes indocumentados, negándole a los neoyorquinos la capacidad de calificar para el programa Global Entry.",
        en: "The Trump administration reacts this way against the issuance of driver's licenses to undocumented immigrants, denying New Yorkers the ability to qualify for the Global Entry program.",
      }
    },
    {
      id: 6352,
      title: { es: "LA CIUDADANÍA SE PODRÍA VOLVER MÁS CARA EN BREVE", en: "CITIZENSHIP COULD BECOME MORE EXPENSIVE SHORTLY" },
      url: "/proteccion-legal-para-migrantes/la-ciudadania-se-podria-volver-mas-cara-en-breve",
      author: "Raul Zepeda",
      date: { es: "marzo 14, 2020", en: "March 14, 2020" },
      isoDate: "2020-03-14",
      excerpt: {
        es: "La administración de Trump está preparando una propuesta que haría un 83% más caro pagar la solicitud de ciudadanía. Los precios subirán de $ 640 a $ 1,170.",
        en: "The Trump administration is preparing a proposal that would make paying for the citizenship application 83% more expensive. Prices will rise from $640 to $1,170.",
      }
    },
    {
      id: 6332,
      title: { es: "¿QUE ES EL PROCESO CONSULAR?", en: "WHAT IS THE CONSULAR PROCESS?" },
      url: "/proteccion-legal-para-migrantes/que-es-el-proceso-consular",
      author: "Raul Zepeda",
      date: { es: "marzo 17, 2020", en: "March 17, 2020" },
      isoDate: "2020-03-17",
      excerpt: {
        es: "¿Sabes lo que significa que tu proceso será consular? En este pequeño artículo encontrarás las respuestas que necesitas.",
        en: "Do you know what it means that your process will be consular? In this short article you will find the answers you need.",
      }
    }
  ]
};

export default function ProteccionLegalPage() {
  const { language } = useLanguage(); 

  const t = (key: string) => getTranslatedText(key, language as 'es' | 'en');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header />

      <main className="flex-grow pt-42 pb-20 px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-7xl mx-auto mb-16 text-center">
          <span className="block text-sm font-bold tracking-widest text-yellow-600 uppercase mb-2">
            {t('header.library')}
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4 tracking-tight">
            {t('header.title')}
          </h1>
          <div className="w-24 h-1 bg-yellow-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            {t('header.subtitle')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {texts.articles.map((article) => (
            <Link href={article.url} key={article.id} className="group">
              <article className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-yellow-500/30 relative">
                
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 to-blue-700 transform origin-left transition-transform duration-300 group-hover:scale-x-100 scale-x-0"></div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-4 text-xs font-semibold text-yellow-600 uppercase tracking-wider">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
                    {t('article.tag')}
                  </div>

                  <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-800 transition-colors">
                    {article.title[language]}
                  </h2>

                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {article.excerpt[language]}
                  </p>

                  <div className="pt-6 mt-auto border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                      </div>
                      <span className="font-medium text-gray-700">{article.author}</span>
                    </div>
                    <time dateTime={article.isoDate} className="text-gray-400 font-medium text-xs">
                      {article.date[language]}
                    </time>
                  </div>
                </div>

                <div className="bg-gray-50 px-8 py-3 flex items-center justify-between group-hover:bg-blue-50 transition-colors duration-300">
                  <span className="text-sm font-bold text-blue-900 group-hover:text-blue-700">
                    {t('article.read_full')}
                  </span>
                  <svg className="w-5 h-5 text-blue-900 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}