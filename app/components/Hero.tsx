'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative pt-36 pb-12 md:pt-36 md:pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-6xl font-normal leading-tight">
              {t.hero.title} <br className="hidden md:block" />
              {t.hero.subtitle}{' '}
              <span className="text-[#B2904D] font-bold">{t.hero.name}</span>
            </h1>

            <h2 className="text-xl md:text-3xl text-gray-700 font-normal">
              {t.hero.tagline}
            </h2>

            <div className="py-4">
              <p className="text-xl font-bold mb-1">
                {t.hero.casesWonLabel}
              </p>
              <p className="text-3xl md:text-4xl font-bold text-[#A0522D] mb-1">
                {t.hero.casesWonNumber}
              </p>
              <p className="text-lg font-bold">
                {t.hero.casesWonSubtext}
              </p>
            </div>

            <p className="text-md text-gray-700 leading-relaxed">
              {t.hero.description}
            </p>

            <Link
              href="#contacto"
              className="inline-block bg-[#B2904D] text-white px-8 py-3 rounded-md font-semibold text-base hover:bg-[#9a7a3d] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              {t.hero.contactButton}
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-[350px] h-[430px] md:w-[400px] md:h-[500px] overflow-hidden rounded-xl bg-[#333130]">
              <Image
                src="/abogado-manuel-solis.jpg"
                alt="Abogado Manuel Solis"
                fill
                className="object-cover"
                priority
              />

              {/* Experience Badge */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-center p-3 rounded-md transform hover:scale-105 transition-all duration-300 w-[150px]">
                <p className="text-3xl font-bold text-[#B2904D]">34</p>
                <p className="text-sm font-medium text-gray-800">
                  {t.hero.yearsLabel} <br /> {t.hero.yearsLabel2}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}