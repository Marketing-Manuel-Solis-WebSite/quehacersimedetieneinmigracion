'use client'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'
import { useLanguage } from '../../../context/LanguageContext'

const questions1to20 = [
  {
    question: { es: "¿Cuál es la ley suprema de la nación?", en: "What is the supreme law of the land?" },
    answers: { es: ["La Constitución"], en: ["The Constitution"] }
  },
  {
    question: { es: "¿Cuántas enmiendas tiene la Constitución?", en: "How many amendments does the Constitution have?" },
    answers: { es: ["Veintisiete (27)"], en: ["Twenty-seven (27)"] }
  },
  {
    question: { es: "¿Cuál es el sistema económico de los Estados Unidos?", en: "What is the economic system of the United States?" },
    answers: { es: ["Economía capitalista", "Economía de mercado"], en: ["Capitalist economy", "Market economy"] }
  },
  {
    question: { es: "Mencione un poder del Congreso de los EE. UU.", en: "Name one power of the U.S. Congress." },
    answers: { es: ["Redactar leyes", "Declarar la guerra", "Hacer el presupuesto federal"], en: ["Write laws", "Declare war", "Make the federal budget"] }
  },
  {
    question: { es: "¿Cuál es el nombre del Presidente de la Cámara de Representantes ahora?", en: "What is the name of the Speaker of the House of Representatives now?" },
    answers: { es: ["(Visite uscis.gov/es/ciudadania/prueba-civica para el nombre del Presidente de la Cámara de Representantes.)"], en: ["(Visit uscis.gov/citizenship/testsforcitizenshipandnaturalization for the name of the Speaker of the House.)"] }
  },
  {
    question: { es: "¿Por cuántos años es elegido el Presidente de los Estados Unidos?", en: "How many years is the President of the United States elected for?" },
    answers: { es: ["Cuatro (4)"], en: ["Four (4)"] }
  },
  {
    question: { es: "¿Cuál es el nombre del Presidente de los Estados Unidos ahora?", en: "What is the name of the President of the United States now?" },
    answers: { es: ["(Visite uscis.gov/es/ciudadania/prueba-civica para el nombre del Presidente de los Estados Unidos.)"], en: ["(Visit uscis.gov/citizenship/testsforcitizenshipandnaturalization for the name of the President of the United States.)"] }
  },
  {
    question: { es: "¿Cuál es el nombre del Vicepresidente de los Estados Unidos ahora?", en: "What is the name of the Vice President of the United States now?" },
    answers: { es: ["(Visite uscis.gov/es/ciudadania/prueba-civica para el nombre del Vicepresidente de los Estados Unidos.)"], en: ["(Visit uscis.gov/citizenship/testsforcitizenshipandnaturalization for the name of the Vice President of the United States.)"] }
  },
  {
    question: { es: "¿Quién puede vetar los proyectos de ley?", en: "Who can veto bills?" },
    answers: { es: ["El Presidente (de los Estados Unidos)"], en: ["The President (of the United States)"] }
  },
  {
    question: { es: "¿Cuál es el tribunal más alto de los Estados Unidos?", en: "What is the highest court in the United States?" },
    answers: { es: ["La Corte Suprema"], en: ["The Supreme Court"] }
  },
  {
    question: { es: "¿Quién es el Gobernador de su estado ahora?", en: "Who is the Governor of your state now?" },
    answers: { es: ["Las respuestas variarán. [Los residentes del Distrito de Columbia deben contestar que D.C. no tiene Gobernador. Los residentes de territorios de EE. UU. deben nombrar al Gobernador del territorio.]"], en: ["Answers will vary. [District of Columbia residents should answer that D.C. does not have a Governor. U.S. territory residents should name the Governor of the territory.]"] }
  },
  {
    question: { es: "¿A qué demostramos lealtad cuando decimos el Juramento a la Bandera?", en: "What do we show loyalty to when we say the Pledge of Allegiance?" },
    answers: { es: ["Los Estados Unidos", "La bandera"], en: ["The United States", "The flag"] }
  },
  {
    question: { es: "¿Qué grupo de personas fue traído a los Estados Unidos y vendido como esclavos?", en: "What group of people was brought to the United States and sold as slaves?" },
    answers: { es: ["Africanos", "Gente de África"], en: ["Africans", "People from Africa"] }
  },
  {
    question: { es: "¿Quién escribió la Declaración de Independencia?", en: "Who wrote the Declaration of Independence?" },
    answers: { es: ["(Thomas) Jefferson"], en: ["(Thomas) Jefferson"] }
  },
  {
    question: { es: "George Washington es famoso por muchas cosas. Mencione una.", en: "George Washington is famous for many things. Name one." },
    answers: { es: ["Padre de nuestra Patria", "Primer Presidente de los Estados Unidos", "General del Ejército Continental", "Presidente de la Convención Constitucional"], en: ["Father of Our Country", "First President of the United States", "General of the Continental Army", "President of the Constitutional Convention"] }
  },
  {
    question: { es: "Abraham Lincoln es famoso por muchas cosas. Mencione una.", en: "Abraham Lincoln is famous for many things. Name one." },
    answers: { es: ["Liberó a los esclavos (Proclamación de Emancipación)", "Salvó (o preservó) la Unión", "Lideró a los Estados Unidos durante la Guerra Civil", "16º Presidente de los Estados Unidos", "Dio el Discurso de Gettysburg"], en: ["Freed the slaves (Emancipation Proclamation)", "Saved (or preserved) the Union", "Led the United States during the Civil War", "16th President of the United States", "Delivered the Gettysburg Address"] }
  },
  {
    question: { es: "Martin Luther King, Jr. es famoso por muchas cosas. Mencione una.", en: "Martin Luther King, Jr. is famous for many things. Name one." },
    answers: { es: ["Luchó por los derechos civiles", "Trabajó por la igualdad para todos los estadounidenses", "Trabajó para asegurar que las personas no fueran juzgadas por el color de su piel, sino por el contenido de su carácter."], en: ["Fought for civil rights", "Worked for equality for all Americans", "Worked to ensure people would not be judged by the color of their skin, but by the content of their character."] }
  },
  {
    question: { es: "¿Qué evento importante ocurrió el 11 de septiembre de 2001 en los Estados Unidos?", en: "What major event happened on September 11, 2001, in the United States?" },
    answers: { es: ["Terroristas atacaron los Estados Unidos", "Terroristas tomaron el control de dos aviones y los estrellaron contra el World Trade Center en Nueva York", "Terroristas tomaron el control de un avión y lo estrellaron contra el Pentágono en Arlington, Virginia", "Terroristas tomaron el control de un avión que estaba dirigido a Washington, D.C., y lo estrellaron en un campo en Pensilvania"], en: ["Terrorists attacked the United States", "Terrorists took control of two planes and crashed them into the World Trade Center in New York", "Terrorists took control of a plane and crashed it into the Pentagon in Arlington, Virginia", "Terrorists took control of a plane headed for Washington, D.C., and crashed it in a field in Pennsylvania"] }
  },
  {
    question: { es: "¿Por qué la bandera tiene 13 franjas?", en: "Why does the flag have 13 stripes?" },
    answers: { es: ["Porque había 13 colonias originales", "Porque las franjas representan a las colonias originales"], en: ["Because there were 13 original colonies", "Because the stripes represent the original colonies"] }
  },
  {
    question: { es: "Mencione tres días festivos nacionales de EE. UU.", en: "Name three U.S. national holidays." },
    answers: { es: ["Día de Año Nuevo", "Día de Martin Luther King, Jr.", "Día de los Presidentes", "Día de la Recordación (Memorial Day)", "Día de la Independencia", "Día del Trabajo (Labor Day)", "Día de la Raza (Columbus Day)", "Día de los Veteranos", "Día de Acción de Gracias (Thanksgiving)", "Navidad"], en: ["New Year's Day", "Martin Luther King, Jr. Day", "Presidents' Day", "Memorial Day", "Independence Day", "Labor Day", "Columbus Day", "Veterans Day", "Thanksgiving", "Christmas"] }
  }
]

const questions21to40 = [
  {
    question: { es: "¿Cuál es la forma de gobierno de los Estados Unidos?", en: "What is the form of government of the United States?" },
    answers: { es: ["República", "República federal basada en la Constitución", "Democracia representativa"], en: ["Republic", "Constitution-based federal republic", "Representative democracy"] }
  },
  {
    question: { es: "Mencione una cosa que hace la Constitución de los EE. UU.", en: "Name one thing the U.S. Constitution does." },
    answers: { es: ["Establece el gobierno", "Define los poderes del gobierno", "Define las partes del gobierno", "Protege los derechos del pueblo"], en: ["Sets up the government", "Defines the powers of government", "Defines the parts of government", "Protects the rights of the people"] }
  },
  {
    // *** ERROR CORREGIDO: SE ESCAPAN LAS COMILLAS INTERNAS ***
    question: { es: "La Constitución de los EE. UU. comienza con las palabras \"Nosotros el Pueblo\". ¿Qué significa \"Nosotros el Pueblo\"?", en: "The U.S. Constitution starts with the words \"We the People\". What does \"We the People\" mean?" },
    answers: { es: ["Autogobierno", "Soberanía popular", "Consentimiento de los gobernados", "El pueblo debe gobernarse a sí mismo", "(Ejemplo de) contrato social"], en: ["Self-government", "Popular sovereignty", "Consent of the governed", "People should govern themselves", "(Example of) social contract"] }
  },
  {
    question: { es: "¿Cómo se hacen cambios a la Constitución de los EE. UU.?", en: "How are changes made to the U.S. Constitution?" },
    answers: { es: ["Enmiendas", "El proceso de enmienda"], en: ["Amendments", "The amendment process"] }
  },
  {
    question: { es: "¿Qué protege la Carta de Derechos (Bill of Rights)?", en: "What does the Bill of Rights protect?" },
    answers: { es: ["(Los derechos básicos) de los estadounidenses", "(Los derechos básicos) de las personas que viven en los Estados Unidos"], en: ["(The basic rights) of Americans", "(The basic rights) of people living in the United States"] }
  },
  {
    question: { es: "¿Por qué es importante la Declaración de Independencia?", en: "Why is the Declaration of Independence important?" },
    answers: { es: ["Dice que Estados Unidos es libre del control británico.", "Dice que todas las personas son creadas iguales.", "Identifica derechos inherentes.", "Identifica libertades individuales."], en: ["It says America is free from British control.", "It says all people are created equal.", "It identifies inherent rights.", "It identifies individual freedoms."] }
  },
  {
    question: { es: "¿Qué documento fundacional dijo que las colonias americanas eran libres de Gran Bretaña?", en: "What founding document said the American colonies were free from Britain?" },
    answers: { es: ["Declaración de Independencia"], en: ["Declaration of Independence"] }
  },
  {
    question: { es: "Mencione dos ideas importantes de la Declaración de Independencia y la Constitución de los EE. UU.", en: "Name two important ideas from the Declaration of Independence and the U.S. Constitution." },
    answers: { es: ["Igualdad", "Libertad", "Contrato social", "Derechos naturales", "Gobierno limitado", "Autogobierno"], en: ["Equality", "Liberty", "Social contract", "Natural rights", "Limited government", "Self-government"] }
  },
  {
    // *** ERROR CORREGIDO: SE ESCAPAN LAS COMILLAS INTERNAS ***
    question: { es: "¿Las palabras \"Vida, Libertad y la búsqueda de la Felicidad\" están en qué documento fundacional?", en: "The words \"Life, Liberty, and the pursuit of Happiness\" are in what founding document?" },
    answers: { es: ["Declaración de Independencia"], en: ["Declaration of Independence"] }
  },
  {
    // *** ERROR CORREGIDO: SE ESCAPAN LAS COMILLAS INTERNAS ***
    question: { es: "¿Qué es el \"estado de derecho\"?", en: "What is the \"rule of law\"?" },
    answers: { es: ["Todos deben seguir la ley.", "Los líderes deben obedecer la ley.", "El gobierno debe obedecer la ley.", "Nadie está por encima de la ley."], en: ["Everyone must follow the law.", "Leaders must obey the law.", "Government must obey the law.", "No one is above the law."] }
  },
  {
    question: { es: "Muchos documentos influyeron en la Constitución de los EE. UU. Mencione uno.", en: "Many documents influenced the U.S. Constitution. Name one." },
    answers: { es: ["Declaración de Independencia", "Artículos de la Confederación", "Los Papeles Federalistas", "Los Papeles Antifederalistas", "Declaración de Derechos de Virginia", "Órdenes Fundamentales de Connecticut", "Pacto de Mayflower", "La Gran Ley de Paz Iroquesa"], en: ["Declaration of Independence", "Articles of Confederation", "Federalist Papers", "Anti-Federalist Papers", "Virginia Declaration of Rights", "Fundamental Orders of Connecticut", "Mayflower Compact", "Iroquois Great Law of Peace"] }
  },
  {
    question: { es: "Hay tres ramas de gobierno. ¿Por qué?", en: "There are three branches of government. Why?" },
    answers: { es: ["Para que una parte no se vuelva demasiado poderosa", "Controles y balances (Checks and balances)", "Separación de poderes"], en: ["So one part does not become too powerful", "Checks and balances", "Separation of powers"] }
  },
  {
    question: { es: "Mencione las tres ramas de gobierno.", en: "Name the three branches of government." },
    answers: { es: ["Legislativa, ejecutiva y judicial", "Congreso, presidente y los tribunales"], en: ["Legislative, executive, and judicial", "Congress, President, and the courts"] }
  },
  {
    question: { es: "¿El Presidente de los Estados Unidos está a cargo de qué rama del gobierno?", en: "The President of the United States is in charge of which branch of government?" },
    answers: { es: ["Rama ejecutiva"], en: ["Executive branch"] }
  },
  {
    question: { es: "¿Qué parte del gobierno federal escribe las leyes?", en: "What part of the federal government writes laws?" },
    answers: { es: ["(El) Congreso (de los EE. UU.)", "(La) legislatura (de EE. UU. o nacional)", "Rama legislativa"], en: ["(U.S.) Congress", "(U.S. or national) legislature", "Legislative branch"] }
  },
  {
    question: { es: "¿Cuáles son las dos partes del Congreso de los EE. UU.?", en: "What are the two parts of the U.S. Congress?" },
    answers: { es: ["Senado y Cámara (de Representantes)"], en: ["Senate and House (of Representatives)"] }
  },
  {
    question: { es: "¿Cuántos senadores de EE. UU. hay?", en: "How many U.S. Senators are there?" },
    answers: { es: ["Cien (100)"], en: ["One hundred (100)"] }
  },
  {
    question: { es: "¿Cuánto dura el término de un senador de EE. UU.?", en: "How long is a term for a U.S. Senator?" },
    answers: { es: ["Seis (6) años"], en: ["Six (6) years"] }
  },
  {
    question: { es: "¿Quién es uno de los senadores de EE. UU. de su estado ahora?", en: "Who is one of your state's U.S. Senators now?" },
    answers: { es: ["Las respuestas variarán. [Los residentes del Distrito de Columbia y los residentes de territorios de EE. UU. deben contestar que D.C. (o el territorio donde vive el solicitante) no tiene senadores de EE. UU.]"], en: ["Answers will vary. [District of Columbia residents and U.S. territory residents should answer that D.C. (or the territory where the applicant lives) has no U.S. Senators.]"] }
  },
  {
    question: { es: "¿Cuántos miembros votantes hay en la Cámara de Representantes?", en: "How many voting members are in the House of Representatives?" },
    answers: { es: ["Cuatrocientos treinta y cinco (435)"], en: ["Four hundred thirty-five (435)"] }
  }
]

const questions41to60 = [
  {
    question: { es: "¿Cuánto dura el término de un miembro de la Cámara de Representantes?", en: "How long is a term for a member of the House of Representatives?" },
    answers: { es: ["Dos (2) años"], en: ["Two (2) years"] }
  },
  {
    question: { es: "¿Por qué los representantes de EE. UU. sirven términos más cortos que los senadores de EE. UU.?", en: "Why do U.S. Representatives serve shorter terms than U.S. Senators?" },
    answers: { es: ["Para seguir más de cerca la opinión pública"], en: ["To more closely follow public opinion"] }
  },
  {
    question: { es: "¿Cuántos senadores tiene cada estado?", en: "How many Senators does each state have?" },
    answers: { es: ["Dos (2)"], en: ["Two (2)"] }
  },
  {
    question: { es: "¿Por qué cada estado tiene dos senadores?", en: "Why does each state have two Senators?" },
    answers: { es: ["Representación igualitaria (para los estados pequeños)", "El Gran Compromiso (Compromiso de Connecticut)"], en: ["Equal representation (for small states)", "The Great Compromise (Connecticut Compromise)"] }
  },
  {
    question: { es: "Mencione a su representante de EE. UU.", en: "Name your U.S. Representative." },
    answers: { es: ["Las respuestas variarán. (Visite house.gov para encontrar su Representante de EE. UU.)"], en: ["Answers will vary. (Visit house.gov to find your U.S. Representative.)"] }
  },
  {
    question: { es: "¿A quién representa un senador de EE. UU.?", en: "Who does a U.S. Senator represent?" },
    answers: { es: ["Ciudadanos de su estado"], en: ["Citizens of their state"] }
  },
  {
    question: { es: "¿Quién elige a los senadores de EE. UU.?", en: "Who elects U.S. Senators?" },
    answers: { es: ["Ciudadanos de su estado"], en: ["Citizens of their state"] }
  },
  {
    question: { es: "¿A quién representa un miembro de la Cámara de Representantes?", en: "Who does a member of the House of Representatives represent?" },
    answers: { es: ["Ciudadanos en su distrito (congresional)", "Ciudadanos en su distrito"], en: ["Citizens in their (congressional) district", "Citizens in their district"] }
  },
  {
    question: { es: "¿Quién elige a los miembros de la Cámara de Representantes?", en: "Who elects members of the House of Representatives?" },
    answers: { es: ["Ciudadanos de su distrito (congresional)"], en: ["Citizens of their (congressional) district"] }
  },
  {
    question: { es: "Algunos estados tienen más representantes que otros estados. ¿Por qué?", en: "Some states have more Representatives than other states. Why?" },
    answers: { es: ["(Debido a) la población del estado", "(Porque) tienen más gente", "(Porque) algunos estados tienen más gente"], en: ["(Because of) the state's population", "(Because) they have more people", "(Because) some states have more people"] }
  },
  {
    question: { es: "El Presidente de los Estados Unidos puede servir solo dos términos. ¿Por qué?", en: "The President of the United States can serve only two terms. Why?" },
    answers: { es: ["(Debido a) la 22ª Enmienda", "Para evitar que el presidente se vuelva demasiado poderoso"], en: ["(Because of) the 22nd Amendment", "To keep the President from becoming too powerful"] }
  },
  {
    question: { es: "Si el presidente ya no puede servir, ¿quién se convierte en presidente?", en: "If the President can no longer serve, who becomes President?" },
    answers: { es: ["El Vicepresidente (de los Estados Unidos)"], en: ["The Vice President (of the United States)"] }
  },
  {
    question: { es: "Mencione un poder del presidente.", en: "Name one power of the President." },
    answers: { es: ["Firma proyectos de ley para convertirlos en leyes", "Veta proyectos de ley", "Hace cumplir las leyes", "Comandante en Jefe (del ejército)", "Jefe diplomático"], en: ["Signs bills to become laws", "Vetoes bills", "Enforces laws", "Commander in Chief (of the military)", "Chief diplomat"] }
  },
  {
    question: { es: "¿Quién es el Comandante en Jefe del ejército de los EE. UU.?", en: "Who is the Commander in Chief of the U.S. military?" },
    answers: { es: ["El Presidente (de los Estados Unidos)"], en: ["The President (of the United States)"] }
  },
  {
    question: { es: "¿Quién firma los proyectos de ley para convertirlos en leyes?", en: "Who signs bills to become laws?" },
    answers: { es: ["El Presidente (de los Estados Unidos)"], en: ["The President (of the Estados Unidos)"] }
  },
  {
    question: { es: "¿Quién nombra a los jueces federales?", en: "Who appoints federal judges?" },
    answers: { es: ["El Presidente (de los Estados Unidos)"], en: ["The President (of the United States)"] }
  },
  {
    question: { es: "La rama ejecutiva tiene muchas partes. Mencione una.", en: "The executive branch has many parts. Name one." },
    answers: { es: ["Presidente (de los Estados Unidos)", "Gabinete", "Departamentos y agencias federales"], en: ["President (of the United States)", "Cabinet", "Federal departments and agencies"] }
  },
  {
    question: { es: "¿Qué hace el Gabinete del Presidente?", en: "What does the President's Cabinet do?" },
    answers: { es: ["Aconseja al Presidente (de los Estados Unidos)"], en: ["Advises the President (of the United States)"] }
  },
  {
    question: { es: "¿Cuáles son dos puestos a nivel de Gabinete?", en: "What are two Cabinet-level positions?" },
    answers: { es: ["Fiscal General", "Secretario de Agricultura", "Secretario de Comercio", "Secretario de Defensa", "Secretario de Educación", "Secretario de Energía", "Secretario de Salud y Servicios Humanos", "Secretario de Seguridad Nacional", "Secretario de Vivienda y Desarrollo Urbano", "Secretario del Interior", "Secretario del Trabajo", "Secretario de Estado", "Secretario de Transporte", "Secretario del Tesoro", "Secretario de Asuntos de los Veteranos", "Vicepresidente (de los Estados Unidos)"], en: ["Attorney General", "Secretary of Agriculture", "Secretary of Commerce", "Secretary of Defense", "Secretary of Education", "Secretary of Energy", "Secretary of Health and Human Services", "Secretary of Homeland Security", "Secretary of Housing and Urban Development", "Secretary of the Interior", "Secretary of Labor", "Secretary of State", "Secretary of Transportation", "Secretary of the Treasury", "Secretary of Veterans Affairs", "Vice President (of the United States)"] }
  },
  {
    question: { es: "¿Por qué es importante el Colegio Electoral?", en: "Why is the Electoral College important?" },
    answers: { es: ["Decide quién es elegido presidente.", "Proporciona un compromiso entre la elección popular del presidente y la selección por el congreso."], en: ["It decides who is elected President.", "It provides a compromise between popular election of the President and selection by Congress."] }
  }
]

const questions61to80 = [
  {
    question: { es: "¿Cuál es una parte de la rama judicial?", en: "What is one part of the judicial branch?" },
    answers: { es: ["Corte Suprema", "Tribunales Federales"], en: ["Supreme Court", "Federal courts"] }
  },
  {
    question: { es: "¿Qué hace la rama judicial?", en: "What does the judicial branch do?" },
    answers: { es: ["Revisa las leyes", "Explica las leyes", "Resuelve disputas (desacuerdos) sobre la ley", "Decide si una ley va en contra de la Constitución (de los EE. UU.)"], en: ["Reviews laws", "Explains laws", "Resolves disputes (disagreements) about the law", "Decides if a law goes against the (U.S.) Constitution"] }
  },
  {
    question: { es: "¿Cuántos asientos hay en la Corte Suprema?", en: "How many seats are on the Supreme Court?" },
    answers: { es: ["Nueve (9)"], en: ["Nine (9)"] }
  },
  {
    question: { es: "¿Cuántos jueces de la Corte Suprema se necesitan generalmente para decidir un caso?", en: "How many justices are usually needed to decide a case?" },
    answers: { es: ["Cinco (5)"], en: ["Five (5)"] }
  },
  {
    question: { es: "¿Por cuánto tiempo sirven los jueces de la Corte Suprema?", en: "How long do Supreme Court justices serve?" },
    answers: { es: ["(De por) vida", "Nombramiento de por vida", "(Hasta la) jubilación"], en: ["(For) life", "Life appointment", "(Until) retirement"] }
  },
  {
    question: { es: "Los jueces de la Corte Suprema sirven de por vida. ¿Por qué?", en: "Supreme Court justices serve for life. Why?" },
    answers: { es: ["Para ser independientes (de la política)", "Para limitar la influencia externa (política)"], en: ["To be independent (of politics)", "To limit outside (political) influence"] }
  },
  {
    question: { es: "¿Quién es el Presidente del Tribunal Supremo de los Estados Unidos ahora?", en: "Who is the Chief Justice of the United States now?" },
    answers: { es: ["(Visite uscis.gov/es/ciudadania/prueba-civica para el nombre del Presidente del Tribunal Supremo de los Estados Unidos.)"], en: ["(Visit uscis.gov/citizenship/testsforcitizenshipandnaturalization for the name of the Chief Justice of the United States.)"] }
  },
  {
    question: { es: "Mencione un poder que es solo para el gobierno federal.", en: "Name one power that is only for the federal government." },
    answers: { es: ["Imprimir papel moneda", "Acuñar monedas", "Declarar la guerra", "Crear un ejército", "Hacer tratados", "Establecer política exterior"], en: ["Print paper money", "Coin money", "Declare war", "Create an army", "Make treaties", "Set foreign policy"] }
  },
  {
    question: { es: "Mencione un poder que es solo para los estados.", en: "Name one power that is only for the states." },
    answers: { es: ["Proporcionar escolarización y educación", "Proporcionar protección (policía)", "Proporcionar seguridad (departamentos de bomberos)", "Otorgar una licencia de conducir", "Aprobar la zonificación y el uso de la tierra"], en: ["Provide schooling and education", "Provide protection (police)", "Provide safety (fire departments)", "Give a driver's license", "Approve zoning and land use"] }
  },
  {
    question: { es: "¿Cuál es el propósito de la 10ª Enmienda?", en: "What is the purpose of the 10th Amendment?" },
    answers: { es: ["(Establece que los) poderes no dados al gobierno federal pertenecen a los estados o al pueblo."], en: ["(States that) powers not given to the federal government belong to the states or to the people."] }
  },
  {
    question: { es: "¿Cuál es la capital de su estado?", en: "What is the capital of your state?" },
    answers: { es: ["Las respuestas variarán. (Visite usa.gov/estados-y-territorios para encontrar la capital de su estado.)"], en: ["Answers will vary. (Visit usa.gov/states-and-territories to find your state's capital.)"] }
  },
  {
    question: { es: "Hay cuatro enmiendas a la Constitución de los EE. UU. sobre quién puede votar. Describa una de ellas.", en: "There are four amendments to the U.S. Constitution about who can vote. Describe one of them." },
    answers: { es: ["Los ciudadanos de dieciocho (18) años o más (pueden votar).", "No tienes que pagar (un impuesto de votación) para votar.", "Cualquier ciudadano puede votar. (Las mujeres y los hombres pueden votar.)", "Un ciudadano varón de cualquier raza (puede votar)."], en: ["Citizens eighteen (18) and older (can vote).", "You don't have to pay (a poll tax) to vote.", "Any citizen can vote. (Women and men can vote.)", "A male citizen of any race (can vote)."] }
  },
  {
    question: { es: "¿Quién puede votar en elecciones federales, postularse para un cargo federal y servir en un jurado en los Estados Unidos?", en: "Who can vote in federal elections, run for federal office, and serve on a jury in the United States?" },
    answers: { es: ["Ciudadanos", "Ciudadanos de los Estados Unidos", "Ciudadanos estadounidenses"], en: ["Citizens", "Citizens of the United States", "U.S. citizens"] }
  },
  {
    question: { es: "¿Cuáles son tres derechos de toda persona que vive en los Estados Unidos?", en: "What are three rights of everyone living in the United States?" },
    answers: { es: ["Libertad de expresión", "Libertad de palabra", "Libertad de reunión", "Libertad de petición al gobierno", "Libertad de religión", "El derecho a portar armas"], en: ["Freedom of expression", "Freedom of speech", "Freedom of assembly", "Freedom to petition the government", "Freedom of religion", "The right to bear arms"] }
  },
  {
    question: { es: "Mencione dos promesas que los nuevos ciudadanos hacen en el Juramento de Lealtad.", en: "Name two promises that new citizens make in the Oath of Allegiance." },
    answers: { es: ["Renunciar a la lealtad a otros países", "Defender la Constitución (de los EE. UU.)", "Obedecer las leyes de los Estados Unidos", "Servir en el ejército (si es necesario)", "Servir (ayudar, hacer trabajo importante para) la nación (si es necesario)", "Ser leal a los Estados Unidos"], en: ["Give up loyalty to other countries", "Defend the (U.S.) Constitution", "Obey the laws of the United States", "Serve in the military (if needed)", "Serve (help, do important work for) the nation (if needed)", "Be loyal to the United States"] }
  },
  {
    question: { es: "¿Cómo pueden las personas convertirse en ciudadanos de los Estados Unidos?", en: "How can people become citizens of the United States?" },
    answers: { es: ["Naturalizarse", "Derivar la ciudadanía", "Nacer en los Estados Unidos"], en: ["Naturalize", "Derive citizenship", "Be born in the United States"] }
  },
  {
    question: { es: "¿Cuáles son dos ejemplos de participación cívica en los Estados Unidos?", en: "What are two examples of civic participation in the United States?" },
    answers: { es: ["Votar", "Postularse para un cargo", "Unirse a un partido político", "Ayudar con una campaña", "Unirse a un grupo cívico", "Unirse a un grupo comunitario", "Darle a un funcionario electo su opinión (sobre un tema)", "Contactar a funcionarios electos", "Apoyar u oponerse a un tema o política", "Escribir a un periódico"], en: ["Vote", "Run for office", "Join a political party", "Help with a campaign", "Join a civic group", "Join a community group", "Give an elected official your opinion (on an issue)", "Contact elected officials", "Support or oppose an issue or policy", "Write to a newspaper"] }
  },
  {
    question: { es: "¿Cuál es una forma en que los estadounidenses pueden servir a su país?", en: "What is one way Americans can serve their country?" },
    answers: { es: ["Votar", "Pagar impuestos", "Obedecer la ley", "Servir en el ejército", "Postularse para un cargo", "Trabajar para el gobierno local, estatal o federal"], en: ["Vote", "Pay taxes", "Obey the law", "Serve in the military", "Run for office", "Work for local, state, or federal government"] }
  },
  {
    question: { es: "¿Por qué es importante pagar impuestos federales?", en: "Why is it important to pay federal taxes?" },
    answers: { es: ["Requerido por ley", "Todas las personas pagan para financiar al gobierno federal", "Requerido por la Constitución (de los EE. UU.) (16ª Enmienda)", "Deber cívico"], en: ["Required by law", "All people pay to fund the federal government", "Required by the (U.S.) Constitution (16th Amendment)", "Civic duty"] }
  },
  {
    question: { es: "Es importante para todos los hombres de 18 a 25 años registrarse para el Servicio Selectivo. Mencione una razón.", en: "It is important for all men ages 18 through 25 to register for the Selective Service. Name one reason." },
    answers: { es: ["Requerido por ley", "Deber cívico", "Hace que el reclutamiento sea justo, si es necesario"], en: ["Required by law", "Civic duty", "Makes the draft fair, if needed"] }
  }
]

const questions81to100 = [
  {
    question: { es: "Los colonos vinieron a América por muchas razones. Mencione una.", en: "The colonists came to America for many reasons. Name one." },
    answers: { es: ["Libertad", "Libertad política", "Libertad religiosa", "Oportunidad económica", "Escapar de la persecución"], en: ["Freedom", "Political liberty", "Religious freedom", "Economic opportunity", "Escape persecution"] }
  },
  {
    question: { es: "¿Qué grupo de personas fue traído a los Estados Unidos y vendido como esclavos?", en: "What group of people was brought to the United States and sold as slaves?" },
    answers: { es: ["Africanos", "Gente de África"], en: ["Africans", "People from Africa"] }
  },
  {
    question: { es: "¿Qué guerra libraron los estadounidenses para obtener la independencia de Gran Bretaña?", en: "What war did the Americans fight to win independence from Britain?" },
    answers: { es: ["Revolución Americana", "La Guerra Revolucionaria (Americana)", "Guerra por la Independencia (Americana)"], en: ["American Revolution", "The (American) Revolutionary War", "War for (American) Independence"] }
  },
  {
    question: { es: "Mencione una razón por la que los estadounidenses declararon su independencia de Gran Bretaña.", en: "Name one reason why the Americans declared their independence from Britain." },
    answers: { es: ["Impuestos altos", "Impuestos sin representación", "Soldados británicos se quedaron en las casas de los estadounidenses (alojamiento, acuartelamiento)", "No tenían autogobierno", "Masacre de Boston", "Motín del Té de Boston (Ley del Té)", "Ley del Timbre", "Ley del Azúcar", "Leyes de Townshend", "Leyes Intolerables (Coercitivas)"], en: ["High taxes", "Taxation without representation", "British soldiers stayed in Americans' homes (boarding, quartering)", "They didn't have self-government", "Boston Massacre", "Boston Tea Party (Tea Act)", "Stamp Act", "Sugar Act", "Townshend Acts", "Intolerable (Coercive) Acts"] }
  },
  {
    question: { es: "¿Cuándo se adoptó la Declaración de Independencia?", en: "When was the Declaration of Independence adopted?" },
    answers: { es: ["4 de julio de 1776"], en: ["July 4, 1776"] }
  },
  {
    question: { es: "La Revolución Americana tuvo muchos eventos importantes. Mencione uno.", en: "The American Revolution had many important events. Name one." },
    answers: { es: ["(Batalla de) Bunker Hill", "Declaración de Independencia", "Washington Cruzando el Delaware (Batalla de Trenton)", "(Batalla de) Saratoga", "Campamento de Valley Forge", "(Batalla de) Yorktown (Rendición británica en Yorktown)"], en: ["(Battle of) Bunker Hill", "Declaration of Independence", "Washington Crossing the Delaware (Battle of Trenton)", "(Battle of) Saratoga", "Valley Forge (Encampment)", "(Battle of) Yorktown (British surrender at Yorktown)"] }
  },
  {
    question: { es: "Había 13 estados originales. Mencione cinco.", en: "There were 13 original states. Name five." },
    answers: { es: ["Nueva Hampshire", "Massachusetts", "Rhode Island", "Connecticut", "Nueva York", "Nueva Jersey", "Pensilvania", "Delaware", "Maryland", "Virginia", "Carolina del Norte", "Carolina del Sur", "Georgia"], en: ["New Hampshire", "Massachusetts", "Rhode Island", "Connecticut", "New York", "New Jersey", "Pennsylvania", "Delaware", "Maryland", "Virginia", "North Carolina", "South Carolina", "Georgia"] }
  },
  {
    question: { es: "¿Qué documento fundacional fue escrito en 1787?", en: "What founding document was written in 1787?" },
    answers: { es: ["(La) Constitución (de los EE. UU.)"], en: ["(The) (U.S.) Constitution"] }
  },
  {
    question: { es: "Los Papeles Federalistas apoyaron la aprobación de la Constitución de los EE. UU. Mencione uno de los escritores.", en: "The Federalist Papers supported the passage of the U.S. Constitution. Name one of the writers." },
    answers: { es: ["(James) Madison", "(Alexander) Hamilton", "(John) Jay", "Publius"], en: ["(James) Madison", "(Alexander) Hamilton", "(John) Jay", "Publius"] }
  },
  {
    question: { es: "¿Por qué fueron importantes los Papeles Federalistas?", en: "Why were the Federalist Papers important?" },
    answers: { es: ["Ayudaron a la gente a entender la Constitución (de los EE. UU.).", "Apoyaron la aprobación de la Constitución (de los EE. UU.)."], en: ["They helped people understand the (U.S.) Constitution.", "They supported passage of the (U.S.) Constitution."] }
  },
  {
    question: { es: "Benjamin Franklin es famoso por muchas cosas. Mencione una.", en: "Benjamin Franklin is famous for many things. Name one." },
    answers: { es: ["Fundó las primeras bibliotecas públicas gratuitas", "Primer Director General de Correos de los Estados Unidos", "Ayudó a escribir la Declaración de Independencia", "Inventor", "Diplomático de EE. UU."], en: ["Founded the first free public libraries", "First Postmaster General of the United States", "Helped write the Declaration of Independence", "Inventor", "U.S. diplomat"] }
  },
  {
    question: { es: "Thomas Jefferson es famoso por muchas cosas. Mencione una.", en: "Thomas Jefferson is famous for many things. Name one." },
    answers: { es: ["Escritor de la Declaración de Independencia", "Tercer presidente de los Estados Unidos", "Duplicó el tamaño de los Estados Unidos (Compra de Luisiana)", "Primer Secretario de Estado", "Fundó la Universidad de Virginia", "Escritor del Estatuto de Virginia para la Libertad Religiosa"], en: ["Writer of the Declaration of Independence", "Third President of the United States", "Doubled the size of the United States (Louisiana Purchase)", "First Secretary of State", "Founded the University of Virginia", "Writer of the Virginia Statute on Religious Freedom"] }
  },
  {
    question: { es: "James Madison es famoso por muchas cosas. Mencione una.", en: "James Madison is famous for many things. Name one." },
    answers: { es: ["Padre de la Constitución", "Cuarto presidente de los Estados Unidos", "Presidente durante la Guerra de 1812", "Uno de los escritores de los Papeles Federalistas"], en: ["Father of the Constitution", "Fourth President of the United States", "President during the War of 1812", "One of the writers of the Federalist Papers"] }
  },
  {
    question: { es: "Alexander Hamilton es famoso por muchas cosas. Mencione una.", en: "Alexander Hamilton is famous for many things. Name one." },
    answers: { es: ["Primer Secretario del Tesoro", "Uno de los escritores de los Papeles Federalistas", "Ayudó a establecer el Primer Banco de los Estados Unidos", "Asistente del General George Washington", "Miembro del Congreso Continental"], en: ["First Secretary of the Treasury", "One of the writers of the Federalist Papers", "Helped establish the First Bank of the United States", "Aide to General George Washington", "Member of the Continental Congress"] }
  },
  {
    question: { es: "¿Qué territorio compró Estados Unidos a Francia en 1803?", en: "What territory did the United States buy from France in 1803?" },
    answers: { es: ["Territorio de Luisiana", "Luisiana"], en: ["Louisiana Territory", "Louisiana"] }
  },
  {
    question: { es: "Mencione una guerra librada por los Estados Unidos en el siglo XIX (1800s).", en: "Name one war fought by the United States in the 1800s." },
    answers: { es: ["Guerra de 1812", "Guerra México-Estadounidense", "Guerra Civil", "Guerra Hispano-Estadounidense"], en: ["War of 1812", "Mexican-American War", "Civil War", "Spanish-American War"] }
  },
  {
    question: { es: "Mencione la guerra de EE. UU. entre el Norte y el Sur.", en: "Name the U.S. war between the North and the South." },
    answers: { es: ["La Guerra Civil"], en: ["The Civil War"] }
  },
  {
    question: { es: "La Guerra Civil tuvo muchos eventos importantes. Mencione uno.", en: "The Civil War had many important events. Name one." },
    answers: { es: ["(Batalla de) Fort Sumter", "Proclamación de Emancipación", "(Batalla de) Vicksburg", "(Batalla de) Gettysburg", "La Marcha de Sherman", "(Rendición en) Appomattox", "(Batalla de) Antietam/Sharpsburg", "Lincoln fue asesinado."], en: ["(Battle of) Fort Sumter", "Emancipation Proclamation", "(Battle of) Vicksburg", "(Battle of) Gettysburg", "Sherman's March", "(Surrender at) Appomattox", "(Battle of) Antietam/Sharpsburg", "Lincoln was assassinated."] }
  },
  {
    question: { es: "¿Qué hizo la Proclamación de Emancipación?", en: "What did the Emancipation Proclamation do?" },
    answers: { es: ["Liberó a los esclavos", "Liberó a los esclavos en la Confederación", "Liberó a los esclavos en los estados confederados", "Liberó a los esclavos en la mayoría de los estados del sur"], en: ["Freed the slaves", "Freed slaves in the Confederacy", "Freed slaves in the Confederate states", "Freed slaves in most Southern states"] }
  },
  {
    question: { es: "¿Qué guerra de EE. UU. terminó con la esclavitud?", en: "What U.S. war ended slavery?" },
    answers: { es: ["La Guerra Civil"], en: ["The Civil War"] }
  }
]

const questions101to128 = [
  {
    question: { es: "¿Qué enmienda otorga la ciudadanía a todas las personas nacidas en los Estados Unidos?", en: "What amendment gives citizenship to all persons born in the United States?" },
    answers: { es: ["14ª Enmienda"], en: ["14th Amendment"] }
  },
  {
    question: { es: "¿Cuándo obtuvieron todos los hombres el derecho al voto?", en: "When did all men get the right to vote?" },
    answers: { es: ["Después de la Guerra Civil", "Durante la Reconstrucción", "(Con la) 15ª Enmienda", "1870"], en: ["After the Civil War", "During Reconstruction", "(With the) 15th Amendment", "1870"] }
  },
  {
    question: { es: "Mencione una líder del movimiento por los derechos de las mujeres en el siglo XIX (1800s).", en: "Name one leader of the women's rights movement in the 1800s." },
    answers: { es: ["Susan B. Anthony", "Elizabeth Cady Stanton", "Sojourner Truth", "Harriet Tubman", "Lucretia Mott", "Lucy Stone"], en: ["Susan B. Anthony", "Elizabeth Cady Stanton", "Sojourner Truth", "Harriet Tubman", "Lucretia Mott", "Lucy Stone"] }
  },
  {
    question: { es: "Mencione una guerra librada por los Estados Unidos en el siglo XX (1900s).", en: "Name one war fought by the United States in the 1900s." },
    answers: { es: ["Primera Guerra Mundial", "Segunda Guerra Mundial", "Guerra de Corea", "Guerra de Vietnam", "Guerra del Golfo (Pérsico)"], en: ["World War I", "World War II", "Korean War", "Vietnam War", "(Persian) Gulf War"] }
  },
  {
    question: { es: "¿Por qué entró Estados Unidos en la Primera Guerra Mundial?", en: "Why did the United States enter World War I?" },
    answers: { es: ["Porque Alemania atacó barcos (civiles) de EE. UU.", "Para apoyar a las Potencias Aliadas (Inglaterra, Francia, Italia y Rusia)", "Para oponerse a las Potencias Centrales (Alemania, Austria-Hungría, el Imperio Otomano y Bulgaria)"], en: ["Because Germany attacked U.S. (civilian) ships", "To support the Allied Powers (England, France, Italy, and Russia)", "To oppose the Central Powers (Germany, Austria-Hungary, the Ottoman Empire, and Bulgaria)"] }
  },
  {
    question: { es: "¿Cuándo obtuvieron todas las mujeres el derecho al voto?", en: "When did all women get the right to vote?" },
    answers: { es: ["1920", "Después de la Primera Guerra Mundial", "(Con la) 19ª Enmienda"], en: ["1920", "After World War I", "(With the) 19th Amendment"] }
  },
  {
    question: { es: "¿Qué fue la Gran Depresión?", en: "What was the Great Depression?" },
    answers: { es: ["La recesión económica más larga de la historia moderna"], en: ["Longest economic recession in modern history"] }
  },
  {
    question: { es: "¿Cuándo comenzó la Gran Depresión?", en: "When did the Great Depression start?" },
    answers: { es: ["El Gran Crash (1929)", "El colapso del mercado de valores de 1929"], en: ["The Great Crash (1929)", "Stock market crash of 1929"] }
  },
  {
    question: { es: "¿Quién fue presidente durante la Gran Depresión y la Segunda Guerra Mundial?", en: "Who was President during the Great Depression and World War II?" },
    answers: { es: ["(Franklin) Roosevelt"], en: ["(Franklin) Roosevelt"] }
  },
  {
    question: { es: "¿Por qué entró Estados Unidos en la Segunda Guerra Mundial?", en: "Why did the United States enter World War II?" },
    answers: { es: ["(Bombardeo de) Pearl Harbor", "Los japoneses atacaron Pearl Harbor", "Para apoyar a las Potencias Aliadas (Inglaterra, Francia y Rusia)", "Para oponerse a las Potencias del Eje (Alemania, Italia y Japón)"], en: ["(Bombing of) Pearl Harbor", "Japanese attacked Pearl Harbor", "To support the Allied Powers (England, France, and Russia)", "To oppose the Axis Powers (Germany, Italy, and Japan)"] }
  },
  {
    question: { es: "Dwight Eisenhower es famoso por muchas cosas. Mencione una.", en: "Dwight Eisenhower is famous for many things. Name one." },
    answers: { es: ["General durante la Segunda Guerra Mundial", "Presidente al final de (durante) la Guerra de Corea", "34º presidente de los Estados Unidos", "Firmó la Ley Federal de Ayuda en Carreteras de 1956 (Creó el Sistema Interestatal)"], en: ["General during World War II", "President at the end of (during) the Korean War", "34th President of the United States", "Signed the Federal-Aid Highway Act of 1956 (Created the Interstate System)"] }
  },
  {
    question: { es: "¿Cuál fue el principal rival de los Estados Unidos durante la Guerra Fría?", en: "What was the main concern of the United States during the Cold War?" },
    answers: { es: ["Unión Soviética", "URSS", "Rusia"], en: ["Soviet Union", "USSR", "Russia"] }
  },
  {
    question: { es: "Durante la Guerra Fría, ¿cuál fue una de las principales preocupaciones de los Estados Unidos?", en: "During the Cold War, what was one main concern of the United States?" },
    answers: { es: ["Comunismo", "Guerra nuclear"], en: ["Communism", "Nuclear war"] }
  },
  {
    question: { es: "¿Por qué entró Estados Unidos en la Guerra de Corea?", en: "Why did the United States enter the Korean War?" },
    answers: { es: ["Para detener la propagación del comunismo"], en: ["To stop the spread of communism"] }
  },
  {
    question: { es: "¿Por qué entró Estados Unidos en la Guerra de Vietnam?", en: "Why did the United States enter the Vietnam War?" },
    answers: { es: ["Para detener la propagación del comunismo"], en: ["To stop the spread of communism"] }
  },
  {
    question: { es: "¿Qué hizo el movimiento por los derechos civiles?", en: "What did the civil rights movement do?" },
    answers: { es: ["Luchó para poner fin a la discriminación racial"], en: ["Fought to end racial discrimination"] }
  },
  {
    question: { es: "¿Por qué entró Estados Unidos en la Guerra del Golfo Pérsico?", en: "Why did the United States enter the Persian Gulf War?" },
    answers: { es: ["Para obligar al ejército iraquí a retirarse de Kuwait"], en: ["To force the Iraqi military to leave Kuwait"] }
  },
  {
    question: { es: "Mencione un conflicto militar de EE. UU. después de los ataques del 11 de septiembre de 2001.", en: "Name one U.S. military conflict after the September 11, 2001 attacks." },
    answers: { es: ["Guerra (Global) contra el Terrorismo", "Guerra en Afganistán", "Guerra en Irak"], en: ["(Global) War on Terror", "War in Afghanistan", "War in Iraq"] }
  },
  {
    question: { es: "Mencione una tribu india americana en los Estados Unidos.", en: "Name one American Indian tribe in the United States." },
    answers: { es: ["Cherokee", "Navajo", "Sioux", "Chippewa", "Choctaw", "Pueblo", "Apache", "Iroquois", "Creek", "Blackfeet", "Seminole", "Cheyenne", "Arawak", "Shawnee", "Mohegan", "Huron", "Oneida", "Lakota", "Crow", "Teton", "Hopi", "Inupiat", "(Para una lista completa de tribus, visite bia.gov.)"], en: ["Cherokee", "Navajo", "Sioux", "Chippewa", "Choctaw", "Pueblo", "Apache", "Iroquois", "Creek", "Blackfeet", "Seminole", "Cheyenne", "Arawak", "Shawnee", "Mohegan", "Huron", "Oneida", "Lakota", "Crow", "Teton", "Hopi", "Inupiat", "(For a complete list of tribes, visit bia.gov.)"] }
  },
  {
    question: { es: "Mencione un ejemplo de una innovación estadounidense.", en: "Name one example of an American innovation." },
    answers: { es: ["Bombilla", "Automóvil (coches, motor de combustión interna)", "Rascacielos", "Avión", "Línea de ensamblaje", "Aterrizaje en la luna", "Circuito integrado (IC)"], en: ["Light bulb", "Automobile (cars, internal combustion engine)", "Skyscrapers", "Airplane", "Assembly line", "Landing on the moon", "Integrated circuit (IC)"] }
  },
  {
    question: { es: "¿Cuál es la capital de los Estados Unidos?", en: "What is the capital of the United States?" },
    answers: { es: ["Washington, D.C."], en: ["Washington, D.C."] }
  },
  {
    question: { es: "¿Dónde está la Estatua de la Libertad?", en: "Where is the Statue of Liberty?" },
    answers: { es: ["Nueva York (Puerto)", "Isla de la Libertad [También aceptable son Nueva Jersey, cerca de la ciudad de Nueva York y en el (Río) Hudson.]"], en: ["New York (Harbor)", "Liberty Island [Also acceptable are New Jersey, near New York City, and on the (Hudson) River.]"] }
  },
  {
    question: { es: "¿Por qué la bandera tiene 50 estrellas?", en: "Why does the flag have 50 stars?" },
    answers: { es: ["(Porque hay) una estrella por cada estado", "(Porque) cada estrella representa un estado", "(Porque hay) 50 estados"], en: ["(Because there is) one star for each state", "(Because) each star represents a state", "(Because there are) 50 states"] }
  },
  {
    question: { es: "¿Cuál es el nombre del himno nacional?", en: "What is the name of the national anthem?" },
    answers: { es: ["The Star-Spangled Banner"], en: ["The Star-Spangled Banner"] }
  },
  {
    question: { es: "El primer lema de la Nación fue E Pluribus Unum. ¿Qué significa?", en: "The Nation's first motto was E Pluribus Unum. What does it mean?" },
    answers: { es: ["De muchos, uno", "Todos nos convertimos en uno"], en: ["Out of many, one", "We all become one"] }
  },
  {
    question: { es: "¿Qué es el Día de la Independencia?", en: "What is Independence Day?" },
    answers: { es: ["Un día festivo para celebrar la independencia de EE. UU. (de Gran Bretaña)", "El cumpleaños del país"], en: ["A holiday to celebrate U.S. independence (from Britain)", "The country's birthday"] }
  },
  {
    question: { es: "¿Qué es el Día de la Recordación (Memorial Day)?", en: "What is Memorial Day?" },
    answers: { es: ["Un día festivo para honrar a los soldados que murieron en servicio militar"], en: ["A holiday to honor soldiers who died in military service"] }
  },
  {
    question: { es: "¿Qué es el Día de los Veteranos (Veterans Day)?", en: "What is Veterans Day?" },
    answers: { es: ["Un día festivo para honrar a las personas en el ejército (de los EE. UU.)", "Un día festivo para honrar a las personas que han servido (en el ejército de los EE. UU.)"], en: ["A holiday to honor people in the (U.S.) military", "A holiday to honor people who have served (in the U.S. military)"] }
  }
]

// Componente principal de la página
export default function RecursosPage() {
  const { language } = useLanguage()

  const texts = {
    hero: {
      title: { es: 'RECURSOS', en: 'RESOURCES' },
      subtitle: {
        es: 'Información valiosa para tu proceso de naturalización',
        en: 'Valuable information for your naturalization process'
      }
    },
    accordion: {
      button: {
        es: 'Mostrar preguntas y respuestas',
        en: 'Show questions and answers'
      }
    },
    sections: {
      1: { es: 'PREGUNTAS 1 - 20', en: 'QUESTIONS 1 - 20' },
      2: { es: 'PREGUNTAS 21 - 40', en: 'QUESTIONS 21 - 40' },
      3: { es: 'PREGUNTAS 41 - 60', en: 'QUESTIONS 41 - 60' },
      4: { es: 'PREGUNTAS 61 - 80', en: 'QUESTIONS 61 - 80' },
      5: { es: 'PREGUNTAS 81 - 100', en: 'QUESTIONS 81 - 100' },
      6: { es: 'PREGUNTAS 101 - 128', en: 'QUESTIONS 101 - 128' } // Corregido el rango
    },
    video: {
      error: {
        es: 'Tu navegador no soporta el elemento de video.',
        en: 'Your browser does not support the video element.'
      }
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-64 pb-64 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/apretondemanos.png)',
          }}
        />
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              {texts.hero.title[language]}
            </h1>
            <p className="text-xl text-white/90 animate-fade-in-delay">
              {texts.hero.subtitle[language]}
            </p>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <div className="container mx-auto px-4 py-16">
        
        <VideoSection
          title={texts.sections[1][language]}
          videoThumbnail="/testimonials/recursos-1.jpg"
          videoUrl="https://manuelsolis.com/wp-content/uploads/2023/12/20-Civics-Test-Questions-PP.-I_1.mp4"
          questions={questions1to20}
          videoError={texts.video.error[language]}
          buttonText={texts.accordion.button[language]}
        />

        <VideoSection
          title={texts.sections[2][language]}
          videoThumbnail="/testimonials/recursos-2.jpg"
          videoUrl="https://manuelsolis.com/wp-content/uploads/2023/12/20-Civics-Test-Questions-PP.-II_1.mp4"
          questions={questions21to40}
          videoError={texts.video.error[language]}
          buttonText={texts.accordion.button[language]}
        />

        <VideoSection
          title={texts.sections[3][language]}
          videoThumbnail="/testimonials/recursos-3.jpg"
          videoUrl="https://manuelsolis.com/wp-content/uploads/2023/12/20-Ciivics-Questions-P-III_1.mp4"
          questions={questions41to60}
          videoError={texts.video.error[language]}
          buttonText={texts.accordion.button[language]}
        />

        <VideoSection
          title={texts.sections[4][language]}
          videoThumbnail="/testimonials/recursos-4.jpg"
          videoUrl="https://manuelsolis.com/wp-content/uploads/2023/12/20-Civicts-Test-Questions-IV_1.mp4"
          questions={questions61to80}
          videoError={texts.video.error[language]}
          buttonText={texts.accordion.button[language]}
        />

        <VideoSection
          title={texts.sections[5][language]}
          videoThumbnail="/testimonials/recursos-5.jpg"
          videoUrl="https://manuelsolis.com/wp-content/uploads/2023/12/20-Civics-Test-Questions-P-V_1.mp4"
          questions={questions81to100}
          videoError={texts.video.error[language]}
          buttonText={texts.accordion.button[language]}
        />

        <VideoSection
          title={texts.sections[6][language]}
          videoThumbnail="/testimonials/recursos-6.jpg"
          videoUrl="https://manuelsolis.com/wp-content/uploads/2023/12/28-Civic-Test-Questions-P-VI_1.mp4"
          questions={questions101to128}
          videoError={texts.video.error[language]}
          buttonText={texts.accordion.button[language]}
        />

      </div>

      <Footer />
    </main>
  )
}

// Component for each video section
function VideoSection({ 
  title, 
  videoThumbnail, 
  videoUrl, 
  questions,
  videoError,
  buttonText
}: { 
  title: string
  videoThumbnail: string
  videoUrl: string
  questions: any[]
  videoError: string
  buttonText: string
}) {
  return (
    <div className="mb-20 animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        
        <div className="bg-gradient-to-r from-[#B2904D] to-[#8B6F3E] p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
            {title}
          </h2>
        </div>

        <div className="relative aspect-video bg-gray-900 group">
          <video 
            controls 
            poster={videoThumbnail}
            className="w-full h-full"
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            {videoError}
          </video>
        </div>

        <AccordionSection questions={questions} buttonText={buttonText} />
      </div>
    </div>
  )
}

// Accordion Component
function AccordionSection({ questions, buttonText }: { questions: any[]; buttonText: string }) {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const getText = (obj: any) => {
    if (typeof obj === 'string') return obj
    // Se asegura de que si no encuentra el idioma, use 'es' o devuelva el objeto (si es el array de respuestas)
    return obj[language] || obj.es || obj 
  }

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
      >
        <span className="text-lg font-semibold text-gray-800">
          {buttonText}
        </span>
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronUp className="w-6 h-6 text-[#B2904D]" />
          ) : (
            <ChevronDown className="w-6 h-6 text-[#B2904D]" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 bg-white animate-slide-down">
          <div className="space-y-6">
            {questions.map((item, index) => (
              <div key={index} className="border-l-4 border-[#B2904D] pl-4 hover:bg-gray-50 transition-colors duration-200 rounded-r-lg p-3">
                <p className="font-bold text-gray-900 mb-3 text-lg">
                  {getText(item.question)}
                </p>
                <ul className="space-y-2">
                  {/* Se asegura de que 'item.answers' se trate como el array de respuestas */}
                  {Array.isArray(getText(item.answers)) && getText(item.answers).map((answer: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#B2904D] mt-1">•</span>
                      <span>{answer}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}