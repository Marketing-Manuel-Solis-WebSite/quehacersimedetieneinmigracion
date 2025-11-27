'use client'

import Image from 'next/image'
import { useLanguage } from '../context/LanguageContext'

const associations = [
  { name: 'American Bar Association', logo: '/associations/american-bar.png' },
  { name: 'La Rama Judicial de Puerto Rico', logo: '/associations/puerto-rico.png' },
  { name: 'State Bar of New Mexico', logo: '/associations/new-mexico.png' },
  { name: 'Illinois State Bar Association', logo: '/associations/illinois.png' },
  { name: 'The Chicago Bar Association', logo: '/associations/chicago.png' },
  { name: 'Dallas County', logo: '/associations/dallas.png' },
]

export default function Associations() {
  const { language } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12"> 
          <h2 className="text-3xl md:text-4xl font-bold">
            {language === 'es' 
              ? 'Somos Parte de una Comunidad Legal Confiable'
              : 'We Are Part of a Trusted Legal Community'
            }
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {associations.map((assoc, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-lg flex items-center justify-center hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-20">
                <Image
                  src={assoc.logo}
                  alt={assoc.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}