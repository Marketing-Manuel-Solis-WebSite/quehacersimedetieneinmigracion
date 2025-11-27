'use client';

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import ContactForm from '../../components/ContactForm'
import { useLanguage } from '../../context/LanguageContext'

export default function ClientesDetenidos() {
  const { language } = useLanguage()

  const texts = {
    hero: {
      title1: {
        es: '¿USTED O UN SER QUERIDO',
        en: 'YOU OR A LOVED ONE'
      },
      title2: {
        es: 'HA SIDO',
        en: 'HAS BEEN'
      },
      title3: {
        es: 'DETENIDO?',
        en: 'DETAINED?'
      }
    },
    section1: {
      title: {
        es: 'Localizando a seres queridos',
        en: 'Locating loved ones'
      },
      titleHighlight: {
        es: 'detenidos',
        en: 'detained'
      },
      intro: {
        es: 'Si su ser querido ha sido detenido por el Departamento de Inmigración, es esencial actuar rápidamente para encontrar su ubicación e iniciar los procedimientos necesarios.',
        en: 'If your loved one has been detained by the Immigration Department, it is essential to act quickly to find their location and initiate necessary procedures.'
      },
      canHelp: {
        es: 'Nuestro personal puede ayudarlo a:',
        en: 'Our staff can help you:'
      },
      help1: {
        es: 'Localizar a su familiar detenido',
        en: 'Locate your detained family member'
      },
      help2: {
        es: 'Buscar su liberación bajo fianza',
        en: 'Seek their release on bail'
      },
      help3: {
        es: 'Iniciar los procedimientos legales necesarios',
        en: 'Initiate necessary legal procedures'
      },
      experience: {
        es: 'El Despacho Legal de Manuel Solis ha manejado exitosamente más de 50,000 casos en los últimos 30 años. Estamos listos para ayudarlo a obtener el mejor resultado posible.',
        en: 'The Law Office of Manuel Solis has successfully handled over 50,000 cases in the last 30 years. We are ready to help you get the best possible outcome.'
      }
    },
    section2: {
      title: {
        es: 'Por qué el tiempo es',
        en: 'Why time is'
      },
      titleHighlight: {
        es: 'crucial',
        en: 'crucial'
      },
      subtitle: {
        es: 'en casos de inmigración',
        en: 'in immigration cases'
      },
      card1Title: {
        es: 'Actuación Inmediata',
        en: 'Immediate Action'
      },
      card1Text: {
        es: 'Cada minuto cuenta. Contactarnos rápido puede marcar la diferencia en el resultado de su caso.',
        en: 'Every minute counts. Contacting us quickly can make the difference in the outcome of your case.'
      },
      card2Title: {
        es: 'Experiencia Legal',
        en: 'Legal Expertise'
      },
      card2Text: {
        es: 'Nuestros abogados expertos lo guiarán a través del proceso con conocimiento especializado.',
        en: 'Our expert attorneys will guide you through the process with specialized knowledge.'
      },
      card3Title: {
        es: 'Apoyo Completo',
        en: 'Full Support'
      },
      card3Text: {
        es: 'Estamos con usted en cada paso del camino, brindando apoyo legal integral.',
        en: 'We are with you every step of the way, providing comprehensive legal support.'
      },
      importance: {
        es: 'El tiempo es esencial en cualquier caso de inmigración',
        en: 'Time is essential in any immigration case'
      },
      importanceText: {
        es: ', y mientras más espera, más difícil se vuelve lograr un resultado favorable. Por eso es crucial contactarnos lo antes posible. Nuestros abogados expertos lo guiarán a través del proceso y le brindarán el asesoramiento legal que necesita para enfrentar esta delicada situación.',
        en: ', and the longer you wait, the more difficult it becomes to achieve a favorable outcome. That\'s why it\'s crucial to contact us as soon as possible. Our expert attorneys will guide you through the process and provide the legal advice you need to face this delicate situation.'
      },
      needHelp: {
        es: '¿Necesita ayuda inmediata?',
        en: 'Need immediate help?'
      },
      hours: {
        es: '(9AM a 9PM CST)',
        en: '(9AM to 9PM CST)'
      }
    },
    section3: {
      title: {
        es: 'Solicitantes de asilo:',
        en: 'Asylum Seekers:'
      },
      titleHighlight: {
        es: 'Navegando el proceso',
        en: 'Navigating the Process'
      },
      intro: {
        es: 'Los solicitantes de asilo deben participar en entrevistas rigurosas, conocidas como entrevistas de',
        en: 'Asylum seekers must participate in rigorous interviews, known as'
      },
      credibleFear: {
        es: '"miedo creíble"',
        en: '"credible fear"'
      },
      or: {
        es: 'o',
        en: 'or'
      },
      reasonableFear: {
        es: '"miedo razonable"',
        en: '"reasonable fear"'
      },
      guidance: {
        es: 'Nuestros abogados experimentados pueden guiarlo a través del proceso, asegurándose de que esté bien preparado para estas entrevistas críticas.',
        en: 'Our experienced attorneys can guide you through the process, ensuring you are well prepared for these critical interviews.'
      },
      prep: {
        es: 'Preparación completa para entrevistas de asilo',
        en: 'Complete preparation for asylum interviews'
      },
      advice: {
        es: 'Asesoría legal especializada',
        en: 'Specialized legal advice'
      },
      support: {
        es: 'Acompañamiento durante todo el proceso',
        en: 'Support throughout the process'
      }
    },
    section4: {
      title: {
        es: 'Un despacho legal con sus',
        en: 'A law firm with your'
      },
      titleHighlight: {
        es: 'mejores intereses',
        en: 'best interests'
      },
      titleEnd: {
        es: 'en mente',
        en: 'in mind'
      },
      intro: {
        es: 'Es fundamental contar con la ayuda de un despacho legal con un historial exitoso, ya que el enfoque del Departamento de Inmigración no es ayudarlo. Nuestros abogados lo prepararán para cualquier entrevista o audiencia y lo informarán sobre posibles',
        en: 'It is essential to have the help of a law firm with a successful track record, as the Immigration Department\'s focus is not to help you. Our attorneys will prepare you for any interview or hearing and inform you about possible'
      },
      relief: {
        es: 'áreas de alivio para las que pueda ser elegible según las leyes de inmigración de los Estados Unidos.',
        en: 'areas of relief for which you may be eligible under United States immigration laws.'
      },
      stat1Title: {
        es: '50,000+ Casos Exitosos',
        en: '50,000+ Successful Cases'
      },
      stat1Text: {
        es: 'Más de tres décadas de experiencia sirviendo a la comunidad',
        en: 'Over three decades of experience serving the community'
      },
      stat2Title: {
        es: 'Atención Personalizada',
        en: 'Personalized Attention'
      },
      stat2Text: {
        es: 'Cada caso es tratado con la máxima dedicación y profesionalismo',
        en: 'Each case is treated with the utmost dedication and professionalism'
      },
      kindness: {
        es: 'En el Despacho Legal de Manuel Solis, tratamos a nuestros clientes con amabilidad, objetividad y convicción para lograr su éxito.',
        en: 'At the Law Office of Manuel Solis, we treat our clients with kindness, objectivity, and conviction to achieve their success.'
      },
      importance: {
        es: 'Sabemos que su caso de inmigración es de suma importancia y trabajaremos incansablemente para ayudarlo a obtener el mejor resultado posible.',
        en: 'We know your immigration case is of utmost importance and we will work tirelessly to help you get the best possible outcome.'
      }
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-64 pb-10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/apretondemanos.png)',
          }}
        />
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 leading-tight animate-fade-in">
              {texts.hero.title1[language]} <br className="hidden md:block" />
              {texts.hero.title2[language]} <span className="text-black">{texts.hero.title3[language]}</span>
            </h1>
            <div className="h-1 w-32 bg-white mx-auto rounded-full mb-14"></div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="h-10 w-full bg-white"></div>
        </div>
      </section>

      {/* Section 1 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-8 animate-slide-in-left">
              <div className="w-2 h-16 bg-[#B2904D] rounded-full"></div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
                {texts.section1.title[language]} <span className="text-[#B2904D]">{texts.section1.titleHighlight[language]}</span>
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6 animate-fade-in">
              <p className="text-lg md:text-xl">
                {texts.section1.intro[language]}
              </p>

              <div className="bg-gradient-to-r from-[#B2904D]/10 to-transparent border-l-4 border-[#B2904D] p-6 rounded-r-lg my-8 transform hover:scale-[1.02] transition-transform duration-300">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {texts.section1.canHelp[language]}
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-[#B2904D] mr-2">✓</span>
                    <span>{texts.section1.help1[language]}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B2904D] mr-2">✓</span>
                    <span>{texts.section1.help2[language]}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B2904D] mr-2">✓</span>
                    <span>{texts.section1.help3[language]}</span>
                  </li>
                </ul>
              </div>

              <p className="text-lg">
                {texts.section1.experience[language]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-fade-in">
                {texts.section2.title[language]} <span className="text-[#B2904D]">{texts.section2.titleHighlight[language]}</span> {texts.section2.subtitle[language]}
              </h2>
              <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in">
                <div className="w-16 h-16 bg-[#B2904D] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{texts.section2.card1Title[language]}</h3>
                <p className="text-gray-600 text-center">
                  {texts.section2.card1Text[language]}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-delay">
                <div className="w-16 h-16 bg-[#B2904D] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{texts.section2.card2Title[language]}</h3>
                <p className="text-gray-600 text-center">
                  {texts.section2.card2Text[language]}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-delay-2">
                <div className="w-16 h-16 bg-[#B2904D] rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{texts.section2.card3Title[language]}</h3>
                <p className="text-gray-600 text-center">
                  {texts.section2.card3Text[language]}
                </p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6 animate-fade-in">
              <p className="text-lg leading-relaxed">
                <span className="text-[#B2904D] font-semibold">{texts.section2.importance[language]}</span>
                {texts.section2.importanceText[language]}
              </p>

              <div className="bg-[#B2904D] text-white p-8 rounded-2xl shadow-xl text-center transform hover:scale-[1.02] transition-transform duration-300">
                <p className="text-2xl font-bold mb-4">{texts.section2.needHelp[language]}</p>
                <a 
                  href="tel:+18669795146" 
                  className="inline-flex items-center gap-2 text-3xl font-bold hover:text-gray-200 transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +1-866-979-5146
                </a>
                <p className="text-sm mt-2 text-white/90">{texts.section2.hours[language]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="animate-slide-in-right">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {texts.section3.title[language]} <span className="text-[#B2904D]">{texts.section3.titleHighlight[language]}</span>
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  {texts.section3.intro[language]} <strong>{texts.section3.credibleFear[language]}</strong> {texts.section3.or[language]} <strong>{texts.section3.reasonableFear[language]}</strong>.
                </p>
                <p>
                  {texts.section3.guidance[language]}
                </p>
                <ul className="space-y-3 mt-6">
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#B2904D] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{texts.section3.prep[language]}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#B2904D] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{texts.section3.advice[language]}</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-6 h-6 text-[#B2904D] mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{texts.section3.support[language]}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {texts.section4.title[language]} <span className="text-[#B2904D]">{texts.section4.titleHighlight[language]}</span> {texts.section4.titleEnd[language]}
              </h2>
              <div className="h-1 w-24 bg-[#B2904D] mx-auto rounded-full"></div>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl animate-fade-in-delay">
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p className="text-lg leading-relaxed">
                  {texts.section4.intro[language]} <span className="text-[#B2904D] font-semibold">{texts.section4.relief[language]}</span>
                </p>

                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-[#B2904D]/10 p-6 rounded-xl border-l-4 border-[#B2904D]">
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">{texts.section4.stat1Title[language]}</h3>
                    <p className="text-gray-700">
                      {texts.section4.stat1Text[language]}
                    </p>
                  </div>
                  <div className="bg-[#B2904D]/10 p-6 rounded-xl border-l-4 border-[#B2904D]">
                    <h3 className="font-bold text-gray-900 mb-2 text-xl">{texts.section4.stat2Title[language]}</h3>
                    <p className="text-gray-700">
                      {texts.section4.stat2Text[language]}
                    </p>
                  </div>
                </div>

                <p className="text-lg leading-relaxed">
                  {texts.section4.kindness[language]}
                </p>

                <p className="text-lg leading-relaxed">
                  {texts.section4.importance[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario */}
      <div id="contacto">
        <ContactForm />
      </div>

      <Footer />
    </main>
  )
}