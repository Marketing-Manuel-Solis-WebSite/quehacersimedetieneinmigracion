'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '../context/LanguageContext'

export default function Team() {
  const { t, language } = useLanguage();

  return (
    <section id="equipo" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold">
              {language === 'es' ? 'Nuestro Equipo Legal' : 'Our Legal Team'} <br />
              <span className="text-[#B2904D]">{language === 'es' ? 'Y Abogados' : 'And Attorneys'}</span>
            </h2>

            <div className="prose prose-lg text-gray-700">
              <p>
                {language === 'es' 
                  ? 'Desde la apertura de su bufete en 1990, Manuel E. Solís y equipo se han comprometido a brindar el nivel de servicio que esperarían recibir si estuvieran en el lugar de nuestros clientes. Esta filosofía nos impulsa a ofrecer una asistencia legal excepcional en todo Estados Unidos.'
                  : 'Since opening his firm in 1990, Manuel E. Solís and team have committed to providing the level of service they would expect to receive if they were in the place of our clients. This philosophy drives us to offer exceptional legal assistance throughout the United States.'
                }
              </p>

              <p>
                {language === 'es'
                  ? 'En la Firma de Abogados de Manuel Solís, algunos de nuestros abogados comparten la experiencia personal de emigrar a los EE.UU., lo que les permite entender profundamente las necesidades y desafíos de nuestros clientes. Adaptamos nuestros horarios de oficina para acomodar la disponibilidad de nuestros clientes, asegurando así una atención conveniente y accesible.'
                  : 'At the Manuel Solís Law Firm, some of our attorneys share the personal experience of immigrating to the U.S., which allows them to deeply understand the needs and challenges of our clients. We adapt our office hours to accommodate our clients\' availability, ensuring convenient and accessible service.'
                }
              </p>
            </div>

            <Link
              href={`/${language}/abogados`}
              className="inline-block bg-[#B2904D] text-white px-8 py-3 rounded-lg font-semibold 
                hover:bg-[#9a7a3d] transition-colors"
            >
              {language === 'es' ? 'Conoce A Nuestros Abogados' : 'Meet Our Attorneys'}
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative">
            <Image
              src="/abogados-equipo.jpg"
              alt="Equipo de abogados Manuel Solis"
              width={600}
              height={600}
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}