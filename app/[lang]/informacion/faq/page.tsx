'use client'

import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import ContactForm from '../../../components/ContactForm' 
import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'
import { useLanguage } from '../../../context/LanguageContext' // IMPORTACIÓN REQUERIDA

// --- DEFINICIÓN DE TIPOS ADAPTADA ---

interface FaqItemBilingual {
  title: { es: string; en: string };
  content: { es: string; en: string };
}

// --- FUNCIÓN AUXILIAR PARA OBTENER EL TEXTO TRADUCIDO ---

/**
 * Función genérica para obtener el texto correcto de un objeto bilingüe.
 * @param obj El objeto con propiedades 'es' y 'en' (o un string simple).
 * @param lang El idioma actual ('es' o 'en').
 */
const getText = (obj: any, lang: 'es' | 'en'): string => {
  if (typeof obj === 'string') return obj;
  return obj[lang] || obj.es;
};

// --- COMPONENTE REUTILIZABLE PARA EL ACORDEÓN (ADAPTADO) ---

function Accordion({ item, lang }: { item: FaqItemBilingual, lang: 'es' | 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const title = getText(item.title, lang);
  const content = getText(item.content, lang);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-4 text-left flex items-center justify-between text-lg font-semibold text-gray-800 hover:text-[#B2904D] transition-colors duration-200"
      >
        <span>{title}</span>
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-[#B2904D]" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>

      {isOpen && (
        <div 
          className="px-4 py-4 bg-gray-50 text-gray-700 text-base leading-relaxed"
          // Utiliza dangerouslySetInnerHTML para renderizar el HTML dentro del contenido.
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      )}
    </div>
  );
}

// --- TEXTOS DE LA INTERFAZ FIJA ---

const interfaceTexts = {
  hero: {
    title: { es: 'PREGUNTAS FRECUENTES', en: 'FREQUENTLY ASKED QUESTIONS' },
    subtitle: { es: 'Respuestas rápidas a sus dudas legales más comunes', en: 'Quick answers to your most common legal questions' },
  },
  sections: {
    civilLaw: { es: 'Ley Civil', en: 'Civil Law' },
    criminalLaw: { es: 'Ley Criminal', en: 'Criminal Law' },
    familyLaw: { es: 'Ley Familiar', en: 'Family Law' },
    immigrationLaw: { es: 'Ley de Inmigración', en: 'Immigration Law' },
    insuranceLaw: { es: 'Ley de Seguros', en: 'Insurance Law' },
  },
  contact: {
    title1: { es: 'SOLICITE SU', en: 'REQUEST YOUR' },
    title2: { es: 'CONSULTA', en: 'CONSULTATION' },
    subtitle: { es: 'Llene este formulario y le llamaremos en unos 10 minutos en horas de trabajo. También puede llamarnos y estaremos encantados de contestar sus preguntas.', en: 'Fill out this form, and we will call you back in about 10 minutes during business hours. You can also call us, and we will be happy to answer your questions.' },
  }
};


// --- DATOS DE PREGUNTAS FRECUENTES BILINGÜES ---

const faqDataBilingual = {
  civilLaw: [
    {
      title: { es: "¿Tengo derecho a recibir indemnización por la muerte de mi marido en los Estados Unidos si yo vivo en México?", en: "Am I entitled to receive compensation for my husband's death in the United States if I live in Mexico?" },
      content: { es: "La respuesta sencilla es **SÍ**. Usted puede recibir como viuda la indemnización que le corresponde a su marido si ha sufrido una muerte injusta debido a un accidente de carro, laboral o debido a una negligencia médica. No dude en ponerse en contacto con nosotros lo más pronto posible ya que existe un límite de tiempo para reclamar estas cantidades y las compañías de seguros no suelen ser muy cooperativos.", en: "The simple answer is **YES**. As a widow, you can receive the compensation corresponding to your husband if he suffered a wrongful death due to a car accident, workplace accident, or medical negligence. Do not hesitate to contact us as soon as possible, as there is a time limit to claim these amounts, and insurance companies are not usually very cooperative." },
    },
    {
      title: { es: "¿Tuve un accidente hace más de un año y quiero reclamar daños médicos que me han surgido con el tiempo. ¿Puedo todavía hacerlo?", en: "I had an accident over a year ago and want to claim medical damages that have arisen over time. Can I still do it?" },
      content: { es: "Desgraciadamente ha dejado pasar mucho tiempo. Cuando sufrimos un accidente, el tiempo es fundamental y debemos comunicar cuanto antes al seguro los daños que pretendemos reclamar. Es cierto que en algunos casos podemos reclamar daños pasado un tiempo, pero debe estar muy justificado. Recuerde, cuando sufra un accidente, contacte un abogado cuanto antes para que le puedan asesorar. Quizá le recomienden que vaya a un médico especializado que puede prever los daños que en el futuro pueden surgir a causa del accidente.", en: "Unfortunately, you've let too much time pass. When we suffer an accident, **time is crucial**, and we must inform the insurance company of the damages we intend to claim as soon as possible. It is true that in some cases we can claim damages after a time, but it must be very well justified. Remember, when you suffer an accident, contact an attorney as soon as possible so they can advise you. They might recommend you see a specialized doctor who can foresee future damages resulting from the accident." },
    },
  ] as FaqItemBilingual[],
  criminalLaw: [
    {
      title: { es: "¿Cómo sé que he sido arrestado?", en: "How do I know I've been arrested?" },
      content: { es: "Usted está bajo arresto si un oficial de policía lo detiene bajo “custodia”. Esto significa que usted cree razonablemente que no es libre de alejarse de la escena del contacto con el oficial. No todo contacto con un oficial de policía significa que está bajo arresto. Sin duda, si le ponen esposas, está bajo arresto.", en: "You are **under arrest** if a police officer detains you under 'custody'. This means you reasonably believe you are not free to walk away from the scene of the contact with the officer. Not all contact with a police officer means you are under arrest. Without a doubt, if you are handcuffed, you are under arrest." },
    },
    {
      title: { es: "¿Cuáles son las consecuencias de manejar ebrio?", en: "What are the consequences of driving while intoxicated (DWI)?" },
      content: { es: "Conducir ebrio conlleva graves sanciones. Aunque el tribunal puede ser más flexible con los infractores en su primera vez, incluso en los casos de primer delito las posibles sentencias incluyen multas severas y tiempo en la cárcel. Sin embargo, si las circunstancias lo justifican, el tribunal puede elegir opciones menos restrictivas, que incluyen libertad condicional, servicio comunitario o consejería profesional sobre el uso y abuso del alcohol. La pérdida del derecho a manejar, al menos temporalmente, está casi garantizada.", en: "Driving while intoxicated carries severe penalties. Although the court may be more flexible with first-time offenders, even in first-offense cases, possible sentences include severe fines and jail time. However, if the circumstances warrant it, the court may choose less restrictive options, including probation, community service, or professional counseling regarding alcohol use and abuse. Loss of the right to drive, at least temporarily, is almost guaranteed." },
    },
    {
      title: { es: "¿Para qué necesito un abogado si me voy a declarar culpable de manejar ebrio?", en: "Why do I need an attorney if I'm going to plead guilty to driving while intoxicated?" },
      content: { es: "Incluso si se declara culpable de conducir ebrio, es imperativo que busque el consejo de un abogado experimentado para que pueda minimizar su sentencia y maximizar sus oportunidades de avanzar hacia un futuro más brillante. Se necesita un abogado de defensa penal para igualar el equilibrio de poder entre el acusado y la fiscalía y para asegurar que se preservan los derechos constitucionales garantizados a todos los acusados.", en: "Even if you plead guilty to driving while intoxicated, it is imperative that you seek the advice of an **experienced attorney** so that they can minimize your sentence and maximize your opportunities to move toward a brighter future. A criminal defense attorney is needed to equalize the balance of power between the accused and the prosecution and to ensure that the constitutional rights guaranteed to all defendants are preserved." },
    },
    {
      title: { es: "¿Qué pasa durante la acusación?", en: "What happens during the arraignment?" },
      content: { es: "Primero, se le pedirá que se declare culpable o no culpable. Le recomendamos que se declare no culpable para que tenga tiempo suficiente para contratar a un abogado y evaluar todas las opciones disponibles para su caso. El tribunal también abordará las condiciones de su liberación que se impondrán mientras su caso esté pendiente. Estas condiciones pueden incluir: pagar fianza, participar en un programa de tratamiento de drogas o alcohol o asistir a reuniones de autoayuda como AA; una orden de no contacto; o incluso monitoreo electrónico en el hogar.", en: "First, you will be asked to plead guilty or not guilty. We recommend pleading **not guilty** so that you have enough time to hire an attorney and evaluate all available options for your case. The court will also address the conditions of your release that will be imposed while your case is pending. These conditions may include: paying bail, participating in a drug or alcohol treatment program or attending self-help meetings such as AA; a no-contact order; or even electronic home monitoring." },
    },
    {
      title: { es: "Me han detenido conduciendo ebrio, ¿puedo negarme a que me hagan un análisis del aliento?", en: "I have been stopped for DWI, can I refuse a breathalyzer test?" },
      content: { es: "Aunque la respuesta puede variar según el estado, en muchos casos, un rechazo es en sí mismo una infracción penal sujeta a severas sanciones. Además, si se prueba el caso en su contra, puede haber sanciones adicionales por la negativa, más allá de las del delito de conducir ebrio.", en: "Although the answer may vary by state, in many cases, a **refusal** is itself a criminal offense subject to severe penalties. Furthermore, if the case is proven against you, there may be additional penalties for the refusal, beyond those for the crime of driving while intoxicated." },
    },
    {
      title: { es: "Me han revocado mi licencia de manejo por conducir ebrio, ¿qué puede pasar si sigo manejando sin licencia?", en: "My driver's license has been revoked for DWI, what can happen if I continue driving without a license?" },
      content: { es: "Si una persona cuya licencia ha sido revocada o suspendida debido a una conducción en estado de ebriedad elige conducir sin una licencia válida y es detenido, puede sufrir consecuencias más graves, incluidas multas y encarcelamiento. El curso de acción más prudente es contar con amigos y familiares para transportarse o usar el transporte público.", en: "If a person whose license has been revoked or suspended due to a DWI chooses to drive without a valid license and is stopped, they may face more serious consequences, including fines and imprisonment. The most prudent course of action is to rely on friends and family for transportation or use public transport." },
    },
    {
      title: { es: "Me he negado a responder a las preguntas del oficial de policía. ¿Puede esto dañar mi caso?", en: "I have refused to answer the police officer's questions. Can this hurt my case?" },
      content: { es: "**No**, usted tiene el derecho absoluto de negarse a incriminarse haciendo declaraciones. Si su caso fue a juicio, el fiscal y el oficial ni siquiera podrían mencionar el hecho de que le hicieron preguntas pero que no respondió.", en: "**No**, you have the absolute right to refuse to incriminate yourself by making statements. If your case went to trial, the prosecutor and the officer couldn't even mention the fact that they asked you questions but that you didn't answer." },
    },
    {
      title: { es: "No fui a mi cita en la corte. ¿Qué debo hacer?", en: "I missed my court date. What should I do?" },
      content: { es: "Primero, comuníquese con un abogado que pueda ayudarlo a lidiar con la orden que se emitió cuando no se presentó a la hora de su cita en la corte. También tiene la opción de entregarse a la cárcel o pagar la fianza.", en: "First, contact an **attorney** who can help you deal with the warrant that was issued when you failed to appear at your court appointment time. You also have the option of turning yourself in to jail or paying bail." },
    },
    {
      title: { es: "No tengo antecedentes criminales. ¿Puede esto ayudar en mi caso?", en: "I have no criminal record. Can this help my case?" },
      content: { es: "Tener un historial criminal limpio puede ayudarlo a negociar su caso. Sin embargo, su historial criminal, o falta de historial, generalmente no sería relevante si su caso va a juicio.", en: "Having a clean criminal record can help you negotiate your case. However, your criminal history, or lack thereof, would generally **not be relevant** if your case goes to trial." },
    },
    {
      title: { es: "Nunca me leyeron mis derechos. ¿Puede ayudarme en mi caso?", en: "I was never read my rights. Can this help my case?" },
      content: { es: "Posiblemente. Puede que lleve a la supresión de cualquier declaración que haya hecho al oficial después de su arresto.", en: "Possibly. It may lead to the suppression of any statements you made to the officer after your arrest." },
    },
  ] as FaqItemBilingual[],
  familyLaw: [
    {
      title: { es: "¿Cómo se calcula la manutención de los hijos?", en: "How is child support calculated?" },
      content: { es: "Se usa una computadora para hacer los cálculos. Los factores más importantes son la cantidad de hijos, los ingresos de cada padre y la cantidad de tiempo que los niños pasan con cada padre. Un tribunal tiene poca autoridad para desviarse de la fórmula.", en: "A computer is used to make the calculations. The most important factors are the number of children, the income of each parent, and the amount of time the children spend with each parent. A court has little authority to deviate from the formula." },
    },
    {
      title: { es: "El matrimonio de nuestros hijos fracasó y nuestra exnuera tiene la custodia de nuestros nietos. Estábamos muy cerca de nuestros nietos y ahora rara vez los vemos. ¿Pueden los abuelos obtener una orden judicial para tener visitas?", en: "Our children's marriage failed, and our ex-daughter-in-law has custody of our grandchildren. We were very close to our grandchildren and now rarely see them. Can grandparents obtain a court order for visitation?" },
      content: { es: "Probablemente no. Ustedes tendrían que encajar en una categoría muy estrecha para poder siquiera pedirla. Pero aun si lo hace, el tribunal tendrá que determinar que lo mejor para los niños es tener visitas con ustedes. Así que, lamentablemente, su dolor de corazón no es un factor.", en: "Probably not. You would have to fit into a very narrow category to even be able to ask for it. But even if you do, the court will have to determine that it is in the children's best interest to have visits with you. So, unfortunately, your heartache is not a factor." },
    },
    {
      title: { es: "Mi esposo y yo queremos divorciarnos. ¿Debemos tener un abogado cada uno si estamos de acuerdo?", en: "My husband and I want to divorce. Should we each have an attorney if we agree on everything?" },
      content: { es: "Técnicamente, usted y el cónyuge del que se está divorciando son partes opuestas en una demanda. Esto sigue siendo cierto independientemente de si han aceptado amigablemente los términos de su divorcio. Representar a ambos al mismo tiempo se consideraría un conflicto de intereses para un abogado.<p>Sin embargo, en las Oficinas del Abogado Manuel Solís podemos ayudarles como **MEDIADORES**. En este caso, un abogado experto en casos de Familia les ayudará a entender bien la ley vigente, preparar la documentación, identificar posibles conflictos, mediar para llegar a un acuerdo financiero, mantener la comunicación con las partes implicadas y llevar a buen término su divorcio.</p>", en: "Technically, you and the spouse you are divorcing are opposing parties in a lawsuit. This remains true regardless of whether you have amicably agreed to the terms of your divorce. Representing both at the same time would be considered a conflict of interest for an attorney.<p>However, at the Law Offices of Attorney Manuel Solís, we can help you as **MEDIATORS**. In this case, an expert Family Law attorney will help you fully understand the current law, prepare the documentation, identify possible conflicts, mediate to reach a financial agreement, maintain communication with the parties involved, and bring your divorce to a successful conclusion.</p>" },
    },
    {
      title: { es: "Mi ex ha mudado a su novia a su casa. No quiero que nuestros hijos estén cerca de ella. Ella es la razón por la nos separamos. ¿Puedo evitar que él tenga a los niños allí si ella está allí?", en: "My ex has moved his girlfriend into his house. I don't want our children around her. She is the reason we separated. Can I prevent him from having the children there if she is there?" },
      content: { es: "No. No, a menos que pueda mostrar que ella podría causarles a los niños algún daño potencial. El hecho de que ella haya deshecho su matrimonio no es suficiente.", en: "No. Not unless you can show that she could cause the children some potential harm. The fact that she broke up your marriage is not enough." },
    },
    {
      title: { es: "Mi ex lleva retraso en el pago de la manutención de los niños. ¿Puedo prohibirle que vea a los niños hasta que pague?", en: "My ex is late in paying child support. Can I prohibit him from seeing the children until he pays?" },
      content: { es: "**No**. La visita también es para el beneficio de los niños. Tienen derecho a verlo y tener una relación con él, incluso si no está pagando la manutención de los hijos. Impedir las visitas perjudica a los niños.", en: "**No**. Visitation is also for the children's benefit. They have the right to see him and have a relationship with him, even if he is not paying child support. Preventing visitation harms the children." },
    },
    {
      title: { es: "Mi ex siempre paga tarde su manutención. Tengo que llamarlo cada vez para recordarle que me mande el cheque. ¿Qué puedo hacer?", en: "My ex always pays their support late. I have to call him every time to remind him to send the check. What can I do?" },
      content: { es: "Una orden para una **asignación salarial** es fácil de obtener ahora. Es una orden de la corte para que el empleador de su ex deduzca el dinero de su cheque de pago y lo pague directamente a usted. El dinero se enviará según el calendario de nómina de la empresa, no necesariamente según el calendario que ordenó el tribunal, pero al menos usted no tendrá que pasar por el proceso degradante de llamar y pedir el dinero. Si su ex trabaja por cuenta propia o trabaja sin figurar como empleado de la empresa, una orden de asignación de salario no servirá de nada. Sin embargo, si su historial de pagos es muy malo, es posible que pueda obtener un pedido para que deposite dinero por adelantado.", en: "An order for a **wage assignment** is easy to obtain now. It is a court order for your ex's employer to deduct the money from his paycheck and pay it directly to you. The money will be sent according to the company's payroll schedule, not necessarily the schedule the court ordered, but at least you won't have to go through the degrading process of calling and asking for the money. If your ex is self-employed or works without being listed as an employee of the company, a wage assignment order will be useless. However, if his payment history is very bad, you may be able to obtain an order for him to deposit money in advance." },
    },
    {
      title: { es: "Mi ex y yo tenemos diferentes religiones. ¿Puedo obligar a mi ex a criar al niño en mi religión?", en: "My ex and I have different religions. Can I force my ex to raise the child in my religion?" },
      content: { es: "**No**. El tribunal les permitirá a ambos exponer al niño a ambas religiones y luego el niño, cuando sea mayor, podrá elegir con qué religión quiere continuar, si es que quiere hacerlo.", en: "**No**. The court will allow both of you to expose the child to both religions, and then the child, when they are older, will be able to choose which religion they want to continue with, if any." },
    },
    {
      title: { es: "Mi ex-esposa vive con un hombre. ¿Puedo dejar de pagar su manutención conyugal?", en: "My ex-wife lives with a man. Can I stop paying her spousal support?" },
      content: { es: "Tal vez. La cohabitación es diferente a tener un compañero de cuarto, ya que crea la presunción de una menor necesidad de manutención. La corte probablemente reducirá la orden de manutención si no la suspende por completo.", en: "Maybe. Cohabitation is different from having a roommate, as it creates the presumption of a lesser need for support. The court will probably reduce the support order if it doesn't suspend it entirely." },
    },
    {
      title: { es: "Tengo la custodia de mi hija. Se gradúa de High School este año. ¿Puedo obligar a su padre a pagar support para que pueda ir a la universidad?", en: "I have custody of my daughter. She is graduating from High School this year. Can I force her father to pay support so she can go to college?" },
      content: { es: "**No**. Child support orders end when the child turns 18 and has completed High School, or up to age 19, provided the child attends High School full-time. Hopefully, the father will want his child to go to college too and be willing to pay part of the cost.", en: "**No**. Child support orders end when the child turns 18 and has completed High School, or up to age 19, provided the child attends High School full-time. Hopefully, the father will want his child to go to college too and be willing to pay part of the cost." },
    },
    {
      title: { es: "Tuve un hijo pero no estaba casada con su padre. Él se niega a pagar support porque dice que me pidió que abortara y no lo hice. ¿Qué debo hacer?", en: "I had a child but was not married to his father. He refuses to pay support because he says he asked me to abort, and I didn't. What should I do?" },
      content: { es: "Primero, usted debe presentar un caso de **paternidad** para establecer legalmente que él es el padre. Luego, puede obtener una orden de manutención de los hijos igual que si hubiera estado casado. Usted también tendrá que ocuparse de las cuestiones relativas a la custodia y los derechos de visitas. No se demore. La orden no puede hacerse retroactiva más allá de la fecha de presentación de los documentos en el tribunal.", en: "First, you must file a **paternity case** to legally establish that he is the father. Then, you can obtain a child support order just as if you had been married. You will also have to deal with issues regarding custody and visitation rights. Do not delay. The order cannot be made retroactive beyond the date the documents were filed with the court." },
    },
  ] as FaqItemBilingual[],
  immigrationLaw: [
    {
      title: { es: "¿En qué consiste una fianza?", en: "What does a bond consist of?" },
      content: { es: "La fianza es una cantidad de dinero que se deposita en la corte como una especie de seguro de que usted se presentará a todas sus comparecencias ante la corte y seguirá todas las órdenes de la corte. También puede pagar el 10% de este monto de fianza a una compañía de fianzas (con garantía). Si paga una fianza en efectivo en la corte, recibirá todo este dinero al final de su caso. Si utiliza una compañía de fianzas, no se le devolverá la tarifa del 10%.", en: "A bond is an amount of money deposited with the court as a form of insurance that you will appear at all your court hearings and follow all court orders. You can also pay 10% of this bond amount to a bond company (with collateral). If you pay a cash bond to the court, you will receive all this money back at the end of your case. If you use a bond company, the 10% fee will not be returned to you." },
    },
    {
      title: { es: "¿Qué debo hacer para solicitar asilo en los Estados Unidos?", en: "What do I need to do to apply for asylum in the United States?" },
      content: { es: "El requisito más importante para obtener asilo en los Estados Unidos es demostrar que tiene temor de persecución en su país o temor por su vida. Esto no se puede hacer de manera inexacta o ligera y el temor tiene que quedar bien establecido. Documentos ayudan mucho, pero es cierto que se pueden ganar casos de asilo sólo con el testimonio de la persona y testigos de la persecución que sufre en su país de origen.<p>Si es capaz de establecer correctamente que ha sufrido persecución en el pasado, sin embargo, es una buena forma de probar el miedo a la persecución o temor por su vida del que hablábamos antes. Pero es importante que recuerde que, aunque no haya sufrido persecución, si es capaz de demostrar temor fundado de que le van a perseguir o teme por su vida, podría ser beneficiario de una visa de asilo. La gran ventaja de demostrar una persecución pasada, es que es ahora el Gobierno de los Estados Unidos el que debe demostrar que las circunstancias han cambiado si quiere negar el caso, mientras que, si no se puede demostrar una persecución pasada, la carga de la prueba recae en el beneficiario, que debe documentar muy bien las razones por las que piensa que en su país va a sufrir persecución.</p><p>Si se encuentra en situación legal en los Estados Unidos, puede realizar la petición de asilo y quedar en situación legal incluso si le niegan el caso, obviamente, hasta que se le acabe la situación legal con la que se encontraba. Pero si entró ilegalmente en el país o se encuentra ilegalmente en el país, una vez le denegaran el caso, le pondrían en procedimientos de deportación. La cuestión es que, una vez que esté en procedimientos de deportación, delante de un juez, puede no solo volver a aplicar para pedir asilo con el juez sino también pedir la cancelación de la deportación y alivios bajo la Convención Contra la Tortura (Convention Against Torture), por lo que tiene todavía posibilidades de pelear su caso de asilo.</p>", en: "The most important requirement to obtain asylum in the United States is to demonstrate that you have a **fear of persecution** in your country or fear for your life. This cannot be done inaccurately or lightly, and the fear must be well established. Documents help a lot, but it is true that asylum cases can be won only with the person's testimony and witnesses to the persecution they suffer in their country of origin.<p>If you are able to correctly establish that you have suffered **persecution in the past**, it is a good way to prove the fear of persecution or fear for your life we talked about earlier. But it is important to remember that even if you have not suffered persecution, if you are able to demonstrate a well-founded fear that you will be persecuted or fear for your life, you could be the beneficiary of an asylum visa. The great advantage of demonstrating past persecution is that the U.S. Government must now demonstrate that circumstances have changed if it wants to deny the case, whereas if past persecution cannot be demonstrated, the burden of proof rests with the beneficiary, who must carefully document the reasons why they believe they will suffer persecution in their country.</p><p>If you are in legal status in the United States, you can file the asylum petition and remain in legal status even if the case is denied, obviously, until the legal status you had expires. But if you entered the country illegally or are illegally in the country, once the case is denied, they would put you in deportation proceedings. The point is that, once you are in deportation proceedings, in front of a judge, you can not only re-apply to request asylum with the judge but also ask for **cancellation of deportation** and relief under the **Convention Against Torture** (CAT), so you still have possibilities to fight your asylum case.</p>" },
    },
    {
      title: { es: "¿Qué es el Boletín de Visas?", en: "What is the Visa Bulletin?" },
      content: { es: "El Boletín de Visas, emitido cada mes por el Departamento de Estado de EE. UU., muestra cuáles solicitudes de “green card” pueden avanzar, en función de cuándo se presentó originalmente la petición I-130 que inicia el proceso de la “green card”. El Boletín de Visas existe porque el Congreso limita la cantidad de “green cards” que se pueden emitir cada año en ciertas categorías, lo que ha creado varios retrasos.", en: "The **Visa Bulletin**, issued each month by the U.S. Department of State, shows which 'green card' applications can move forward, based on when the I-130 petition that starts the 'green card' process was originally filed. The Visa Bulletin exists because Congress limits the number of 'green cards' that can be issued each year in certain categories, which has created various backlogs." },
    },
    {
      title: { es: "¿Qué es una “Green Card” por matrimonio?", en: "What is a Marriage Green Card?" },
      content: { es: "La mayoría de los ciudadanos estadounidenses y los titulares de la “green card” de los Estados Unidos tienen derecho por ley a patrocinar a sus cónyuges para una “green card”, también conocida como “estado de residente permanente”. El costo total, el tiempo de espera y otros detalles del proceso de la green card de matrimonio varían basado en varios factores.", en: "Most U.S. citizens and U.S. 'green card' holders are entitled by law to sponsor their spouses for a 'green card', also known as 'lawful permanent resident status'. The total cost, waiting time, and other details of the marriage green card process vary based on several factors." },
    },
    {
      title: { es: "¿Qué es una Green Card (Tarjeta Verde)?", en: "What is a Green Card?" },
      content: { es: "Una Green Card “tarjeta verde”, emitida por los Servicios de Ciudadanía e Inmigración de los Estados Unidos (USCIS), proporciona prueba de la condición de residente permanente legal, con autorización para vivir y trabajar en cualquier lugar de los Estados Unidos. La mayoría de las Green Card deben renovarse cada 10 años, pero las Green Card condicionales basadas en matrimonio o inversiones deben reemplazarse después de los primeros 2 años.", en: "A **Green Card** (or 'tarjeta verde'), issued by the U.S. Citizenship and Immigration Services (USCIS), provides proof of lawful permanent resident status, with authorization to live and work anywhere in the United States. Most Green Cards must be renewed every 10 years, but conditional Green Cards based on marriage or investment must be replaced after the first 2 years." },
    },
    {
      title: { es: "Crucé ilegalmente, pero tengo un familiar que me puede pedir. ¿Me pueden detener?", en: "I crossed illegally, but I have a relative who can petition for me. Can I be detained?" },
      content: { es: "Sí, mientras no tengas un estatus migratorio pueden detenerte y ponerte en procedimientos de deportación. Sin embargo, dependiendo de quién sea su familiar, puede que usted no tenga que salir del país para obtener el estatus de residente permanente. Pero esto solo ocurre con los ciudadanos y sus familiares inmediatos. Lo más probable es que usted tenga que salir del país y que, además, le pongan un castigo por haber entrado y permanecido ilegalmente en los Estados Unidos con un castigo de tiempo de tres, cinco o diez años. A veces puede ser un castigo permanente. En las Oficinas del Abogado Manuel Solís, podemos ayudarle a pedir un **perdón** para ese castigo si califica para ello y ayudarle a dar todos los pasos necesarios para evitar que lo detengan antes de que pueda arreglar su situación migratoria. Si todo sale bien, podríamos conseguir que sólo tuviera que salir del país por dos semanas para hacer la entrevista consular y entrar legalmente en los Estados Unidos como Residente Permanente.", en: "Yes, as long as you do not have immigration status, you can be detained and put into deportation proceedings. However, depending on who your relative is, you may not have to leave the country to obtain permanent resident status. But this only happens with citizens and their immediate relatives. Most likely, you will have to leave the country, and additionally, they will impose a penalty for having entered and remained illegally in the United States, with a three, five, or ten-year ban. Sometimes it can be a **permanent ban**. At the Law Offices of Attorney Manuel Solís, we can help you request a **waiver** (pardon) for that penalty if you qualify for it and help you take all the necessary steps to prevent you from being detained before you can fix your immigration situation. If all goes well, we could arrange for you to only have to leave the country for two weeks to do the consular interview and legally enter the United States as a Permanent Resident." },
    },
    {
      title: { es: "Estoy ilegalmente en el país y me han detenido ¿Qué debo hacer?", en: "I am illegally in the country and have been detained. What should I do?" },
      content: { es: "Lo primero que debe hacer es **mantener la calma** y **buscar ayuda legal**. No firme ningún documento ni responda a ninguna pregunta, usted está en su derecho de permanecer en silencio. Si le ofrecen la salida voluntaria **NO LA ACEPTE**. En las Oficinas del Abogado Manuel Solís, tenemos mucha experiencia en casos de deportación y podemos pelear su caso para evitar la deportación y pedir la residencia permanente si califica para ello.", en: "The first thing you should do is **remain calm** and **seek legal help**. Do not sign any documents or answer any questions; you have the right to remain silent. If they offer you voluntary departure, **DO NOT ACCEPT IT**. At the Law Offices of Attorney Manuel Solís, we have a lot of experience in deportation cases and can fight your case to avoid deportation and request permanent residency if you qualify for it." },
    },
    {
      title: { es: "Estoy sufriendo maltrato en mi hogar pero soy ilegal en los Estados Unidos ¿Puedo denunciar?", en: "I am suffering abuse in my home but I am illegal in the United States. Can I report it?" },
      content: { es: "Sí. Pero no sólo eso, usted podría calificar para un tipo de protección llamado **VAWA** que le podría no solo proteger de su agresor, sino ayudarle a obtener la Residencia Permanente en los Estados Unidos si el agresor es su esposo/a, hijo/a o padre/madre y es Residente Permanente o ciudadano americano. En las Oficinas del Abogado Manuel Solís, tenemos mucha experiencia en este tipo de casos y podemos ayudarle a saber si califica para este tipo de protección.", en: "Yes. But not only that, you could qualify for a type of protection called **VAWA** (Violence Against Women Act) which could not only protect you from your abuser but also help you obtain Permanent Residency in the United States if the abuser is your spouse, child, or parent and is a Permanent Resident or American citizen. At the Law Offices of Attorney Manuel Solís, we have a lot of experience in these types of cases and can help you find out if you qualify for this type of protection." },
    },
    {
      title: { es: "He sido denunciado por violencia doméstica y soy Residente Permanente ¿puede esto afectar a mi situación migratoria?", en: "I have been reported for domestic violence and I am a Permanent Resident. Can this affect my immigration status?" },
      content: { es: "Las denuncias de violencia doméstica tienen consecuencias migratorias muy graves. Es **crucial** que su abogado sepa que usted no es ciudadano y que entienda las posibles consecuencias de inmigración o consulte con un abogado de inmigración en su caso.", en: "Domestic violence reports have very serious immigration consequences. It is **crucial** that your attorney knows that you are not a citizen and understands the potential immigration consequences or consults with an immigration attorney in your case." },
    },
    {
      title: { es: "Tengo un hermano que es ciudadano. ¿Puede pedirme a mí y a mi familia para obtener la Residencia Permanente?", en: "I have a brother who is a citizen. Can he petition for me and my family to obtain Permanent Residency?" },
      content: { es: "Sí. Si su hermano es ciudadano americano puede solicitar una Residencia Permanente para usted, su esposa y sus hijos solteros menores.", en: "Yes. If your brother is an American citizen, he can apply for Permanent Residency for you, your wife, and your unmarried minor children." },
    },
  ] as FaqItemBilingual[],
  insuranceLaw: [
    {
      title: { es: "¿Cuánto tarda el proceso de reclamo de seguro?", en: "How long does the insurance claim process take?" },
      content: { es: "Desde unos pocos meses hasta unos pocos años. La cantidad de tiempo que toma resolver su reclamo varía con cada pérdida. Estas variables incluyen las coberturas y límites en su póliza, los procedimientos de su compañía de seguros, la cantidad y el tipo de daño, la personalidad de los ajustadores asignados a su reclamo y la cantidad de tiempo que toma preparar y presentar su reclamo con documentos de apoyo e información. Lo más probable es que su póliza contenga plazos para presentar pruebas, reparar / reemplazar y recolectar el valor total.", en: "From a few months to a few years. The amount of time it takes to resolve your claim varies with each loss. These variables include the coverages and limits on your policy, your insurance company's procedures, the amount and type of damage, the personality of the adjusters assigned to your claim, and the amount of time it takes to prepare and present your claim with supporting documents and information. Most likely, your policy contains deadlines for submitting proof, repairing/replacing, and collecting the full value." },
    },
    {
      title: { es: "¿Debo de hacer algo antes de limpiar los escombros tras un desastre que ha afectado a mi propiedad cubierta?", en: "Should I do anything before clearing debris after a disaster has affected my covered property?" },
      content: { es: "**Fotografíe todos los elementos reconocibles en los escombros** antes de que sean retirados, en particular los elementos que su asegurador retira para su limpieza / recuperación. Su asegurador puede traer una compañía para limpiar y almacenar artículos. Sus tarifas generalmente se deducen de los beneficios de su seguro por los contenidos.<p>A menudo surgen desacuerdos sobre si los artículos dañados son recuperables y si se pueden limpiar o si tiene más sentido reemplazarlos. Examine los artículos que su asegurador o compañía de limpieza considere rescatables. Si cree que realmente no se pueden limpiar, o si los costos de limpieza y almacenamiento excederán el costo de reemplazarlos, calcule con el ajustador. Después de que estos costos se deduzcan de su cobertura de seguro de contenido, le quedará menos dinero para reemplazar los artículos destruidos. Es una buena idea pedirle a la compañía de seguros una confirmación por escrito de que han inspeccionado completamente la ubicación de la pérdida a su entera satisfacción y están de acuerdo en que puede avanzar con la eliminación de escombros y la limpieza del sitio.</p>", en: "**Photograph all recognizable items in the debris** before they are removed, particularly items that your insurer removes for cleaning/restoration. Your insurer may bring in a company to clean and store items. Their fees are generally deducted from your insurance benefits for the contents.<p>Disagreements often arise over whether damaged items are salvageable and whether they can be cleaned, or if it makes more sense to replace them. Examine the items that your insurer or cleaning company considers salvageable. If you believe they truly cannot be cleaned, or if the cleaning and storage costs will exceed the replacement cost, negotiate with the adjuster. After these costs are deducted from your contents insurance coverage, you will have less money left to replace the destroyed items. It is a good idea to ask the insurance company for written confirmation that they have fully inspected the location of the loss to their satisfaction and agree that you can proceed with debris removal and site cleanup.</p>" },
    },
    {
      title: { es: "¿Qué fechas son importantes de recordar cuando se hace un reclamo al seguro?", en: "What dates are important to remember when making an insurance claim?" },
      content: { es: "Las pólizas varían: algunas requieren que se presente una Prueba de pérdida ejecutada dentro de los **60 días** posteriores a la pérdida, otras requieren que se presente una Prueba de pérdida ejecutada dentro de los **60 días** posteriores a la solicitud del seguro.<p>Otro plazo importante para tener en cuenta es la fecha en la que debe presentarse una demanda si usted y el seguro no pueden resolver el reclamo. Algunas pólizas requieren que la acción se presente dentro de **un año** después de la fecha de la pérdida, otras **dos años**. Si no ha cumplido con las condiciones de la póliza antes de demandar, su demanda puede ser 'desestimada'.</p><p>Además, algunas pólizas reflejan que los pagos de costos de reemplazo se realizarán si la reconstrucción o las reparaciones requeridas se completan dentro de los **180 días** después de la emisión de un pago del valor real en efectivo ('ACV'). Es posible que no sea posible completar el trabajo de construcción dentro de los 180 días después de un pago de ACV, y una solicitud por escrito para una exención de la disposición o una extensión debe presentarse al seguro lo antes posible.</p>", en: "Policies vary: some require a Proof of Loss to be executed within **60 days** of the loss, others require a Proof of Loss to be executed within **60 days** of the insurer's request.<p>Another important deadline to keep in mind is the date on which a lawsuit must be filed if you and the insurance company cannot resolve the claim. Some policies require the action to be filed within **one year** after the date of loss, others **two years**. If you have not complied with the policy conditions before suing, your lawsuit may be 'dismissed'.</p><p>In addition, some policies reflect that replacement cost payments will be made if the required reconstruction or repairs are completed within **180 days** after an Actual Cash Value ('ACV') payment is issued. It may not be possible to complete construction work within 180 days after an ACV payment, and a written request for a waiver of the provision or an extension must be submitted to the insurer as soon as possible.</p>" },
    },
    {
      title: { es: "¿Quién tiene que limpiar los escombros de mi lote después de que mi propiedad asegurada haya sufrido daños graves?", en: "Who has to clear the debris from my lot after my insured property has suffered severe damage?" },
      content: { es: "Usted, como titular de la póliza, es responsable de limpiar los escombros de su lote. Las políticas varían: si tiene una cobertura adecuada, el costo de este trabajo está cubierto. Si su propiedad fue dañada o destruida en un desastre natural, consulte con los funcionarios de su gobierno local para ver si están coordinando un programa de eliminación de escombros. Una de las coberturas adicionales más comunes en las pólizas es una cantidad adicional de dinero para la eliminación de escombros. Debe leer la cobertura detenidamente, pero esto podría ser un monto pagadero por encima de los límites de su cobertura de vivienda básica.", en: "You, as the policyholder, are responsible for clearing debris from your lot. Policies vary: if you have adequate coverage, the cost of this work is covered. If your property was damaged or destroyed in a natural disaster, check with your local government officials to see if they are coordinating a debris removal program. One of the most common additional coverages in policies is an extra amount of money for debris removal. You should read the coverage carefully, but this could be an amount payable in excess of your basic housing coverage limits." },
    },
    {
      title: { es: "¿Tengo derecho a recibir vivienda temporalmente después de un desastre que ha destruido mi casa?", en: "Am I entitled to temporary housing after a disaster has destroyed my house?" },
      content: { es: "Su proveedor puede organizar una vivienda temporal inmediatamente después de una pérdida catastrófica que afecte a múltiples asegurados durante una semana más o menos, pero la vivienda temporal a largo plazo, hasta que se resuelva su reclamo y la vivienda permanente esté disponible, es su responsabilidad.", en: "Your provider may arrange temporary housing immediately following a catastrophic loss affecting multiple policyholders for a week or so, but long-term temporary housing, until your claim is resolved and permanent housing is available, is your responsibility." },
    },
    {
      title: { es: "El ajustador del seguro dice que mis cosas se pueden limpiar o reparar y que no es necesario reemplazarlas. ¿Cómo puedo saber si eso es cierto?", en: "The insurance adjuster says my things can be cleaned or repaired and don't need to be replaced. How can I tell if that's true?" },
      content: { es: "Puede que no sea cierto. Busque la opinión de una empresa de restauración de buena reputación o un profesional calificado. Si la pérdida está relacionada con un incendio, el daño por calor, humo y agua puede ser significativo si los artículos no se consumieron totalmente en el incendio. El olor a humo es difícil de eliminar y es una simplificación excesiva y conveniente para el ajustador con el fin de que afirme o espere que se limpien los artículos dañados. En las Oficinas del Abogado Manuel Solís, le ofrecemos una **inspección GRATUITA** de los daños que ha sufrido para poder así negociar en su nombre con el ajustador de su compañía de seguros y que no le engañen.", en: "It may not be true. Seek the opinion of a reputable **restoration company** or a qualified professional. If the loss is fire-related, heat, smoke, and water damage can be significant if items were not totally consumed in the fire. Smoke odor is difficult to eliminate and it is an oversimplification and convenient for the adjuster to claim or expect damaged items to be cleaned. At the Law Offices of Attorney Manuel Solís, we offer a **FREE inspection** of the damages you have suffered so we can negotiate on your behalf with your insurance company's adjuster and ensure you are not misled." },
    },
    {
      title: { es: "Se me ha inundado la casa y mi seguro dice que no me cubre los daños. ¿Qué debo hacer?", en: "My house has been flooded, and my insurance says it doesn't cover the damages. What should I do?" },
      content: { es: "Debe **consultar con un abogado** para determinar si tiene o no derecho a cobrar una indemnización por daños. A veces, los seguros intentarán pagar lo menos posible ante un siniestro, por eso es una buena idea asesorarse profesionalmente. En las Oficinas del Abogado Manuel Solís, le hacemos una valoración **GRATUITA** de los daños que ha sufrido y sólo le cobramos el servicio de representación si usted obtiene una indemnización. La cantidad es un porcentaje sobre lo que ha recibido y el porcentaje dependerá de si vamos a corte o no.", en: "You should **consult with an attorney** to determine whether or not you are entitled to collect compensation for damages. Sometimes, insurance companies will try to pay as little as possible in the event of a claim, so it is a good idea to seek professional advice. At the Law Offices of Attorney Manuel Solís, we provide a **FREE assessment** of the damages you have suffered, and we only charge for our representation service if you obtain compensation. The amount is a percentage of what you receive, and the percentage will depend on whether we go to court or not." },
    },
  ] as FaqItemBilingual[],
};


export default function PreguntasFrecuentesPage() {
  const { language } = useLanguage();
  const lang = language as 'es' | 'en';
  
  // Función t (translate) para textos fijos de interfaz
  const t = (key: string): string => {
    const parts = key.split('.');
    let current: any = interfaceTexts;
    for (const part of parts) {
      if (current && current[part]) {
        current = current[part];
      } else {
        return ''; 
      }
    }
    return current[lang] || current.es;
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
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
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/90 animate-fade-in-delay">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>
      
      {/* --- FAQ Content Sections --- */}
      <div className="container mx-auto px-4 py-16">
        
        {/* Ley Civil / Civil Law */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 border-[#B2904D] pb-2">
            {t('sections.civilLaw')}
          </h2>
          <div className="space-y-4 rounded-xl border border-gray-100 shadow-lg p-4">
            {faqDataBilingual.civilLaw.map((item, index) => (
              <Accordion key={index} item={item} lang={lang} />
            ))}
          </div>
        </div>
        
        <hr className="my-10" />

        {/* Ley Criminal / Criminal Law */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 border-[#B2904D] pb-2">
            {t('sections.criminalLaw')}
          </h2>
          <div className="space-y-4 rounded-xl border border-gray-100 shadow-lg p-4">
            {faqDataBilingual.criminalLaw.map((item, index) => (
              <Accordion key={index} item={item} lang={lang} />
            ))}
          </div>
        </div>

        <hr className="my-10" />

        {/* Ley Familiar / Family Law */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 border-[#B2904D] pb-2">
            {t('sections.familyLaw')}
          </h2>
          <div className="space-y-4 rounded-xl border border-gray-100 shadow-lg p-4">
            {faqDataBilingual.familyLaw.map((item, index) => (
              <Accordion key={index} item={item} lang={lang} />
            ))}
          </div>
        </div>

        <hr className="my-10" />
        
        {/* Ley de Inmigración / Immigration Law */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 border-[#B2904D] pb-2">
            {t('sections.immigrationLaw')}
          </h2>
          <div className="space-y-4 rounded-xl border border-gray-100 shadow-lg p-4">
            {faqDataBilingual.immigrationLaw.map((item, index) => (
              <Accordion key={index} item={item} lang={lang} />
            ))}
          </div>
        </div>

        <hr className="my-10" />
        
        {/* Ley de Seguros / Insurance Law */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 border-b-4 border-[#B2904D] pb-2">
            {t('sections.insuranceLaw')}
          </h2>
          <div className="space-y-4 rounded-xl border border-gray-100 shadow-lg p-4">
            {faqDataBilingual.insuranceLaw.map((item, index) => (
              <Accordion key={index} item={item} lang={lang} />
            ))}
          </div>
        </div>

      </div>
      
      {/* Contact Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    {t('contact.title1').split(' ').map((word, index) => (
                        <React.Fragment key={index}>
                            {word}
                            {' '}
                        </React.Fragment>
                    ))}
                    <span className="text-[#B2904D]">{t('contact.title2')}</span>
                </h2>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                    {t('contact.subtitle')}
                </p>
            </div>
            
            <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-2xl">
                <ContactForm /> 
            </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}