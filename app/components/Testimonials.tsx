'use client'

import { useState } from 'react'
import { Star, Play, X } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '../context/LanguageContext'

interface VideoModalProps {
  videoId: string;
  onClose: () => void;
}

const FALLBACK_THUMBNAIL = '/testimonials/Residencia_Octavio.png';

const testimonials = [
  {
    id: 1,
    name: 'Octavio Varela',
    case: 'Residencia Permanente',
    rating: 5,
    comment: 'Feliz, sentí que todo lo que perdí cuando ingresé al país, se me devolvió y con un regalo',
    videoThumbnail: FALLBACK_THUMBNAIL, 
    videoId: 'cTJ9M5PT-S4', 
  },
]

function VideoModal({ videoId, onClose }: VideoModalProps) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-11/12 max-w-4xl rounded-xl shadow-2xl overflow-hidden bg-black" 
        onClick={(e) => e.stopPropagation()} 
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full text-gray-800 hover:text-white hover:bg-[#B2904D] transition-colors duration-300 shadow-lg"
          aria-label="Cerrar video"
        >
          <X className="w-6 h-6" />
        </button>

        <iframe
          src={embedUrl}
          title="Testimonio de Cliente"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full aspect-video min-h-[300px]"
        ></iframe>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const { language } = useLanguage();
  const current = testimonials[0]; 
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  return (
    <section id="testimonios" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* TÍTULO */}
        <div className="flex items-center justify-center mb-16">
          {/* Elemento Decorativo Izquierdo */}
          <div className="hidden md:block w-16 h-1 bg-[#B2904D] mx-8 transform rotate-6 opacity-70"></div>
          
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-800">
              {language === 'es' ? 'Lo que dicen' : 'What our clients say'} <br />
              <span className="text-[#B2904D]">
                {language === 'es' ? 'nuestros clientes' : ''}
              </span>
            </h2>
          </div>

          {/* Elemento Decorativo Derecho */}
          <div className="hidden md:block w-16 h-1 bg-[#B2904D] mx-8 transform rotate-[-6deg] opacity-70"></div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            
            {/* SECCIÓN VIDEO/IMAGEN */}
            <div className="flex justify-center md:justify-end">
                <div 
                  className="relative w-full max-w-md aspect-video bg-transparent cursor-pointer group rounded-2xl overflow-hidden"
                  onClick={openVideo}
                >
                  {/* Imagen de Carátula */}
                  <Image
                    src={current.videoThumbnail}
                    alt={current.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Botón de Play */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label="Reproducir video"
                  >
                    <div 
                      className="bg-[#B2904D]/90 rounded-full p-5 transition-all duration-300 transform group-hover:scale-110 shadow-xl backdrop-blur-sm"
                    >
                      <Play className="w-10 h-10 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div>
            </div>

            {/* SECCIÓN TEXTO */}
            <div className="flex flex-col justify-center text-center md:text-left">
                <div>
                    <h3 className="text-3xl font-bold mb-1 text-[#B2904D]">{current.name}</h3>
                    <h4 className="text-xl text-gray-600 font-medium mb-4">{current.case}</h4>

                    {/* Rating */}
                    <div className="flex gap-1 mb-6 justify-center md:justify-start">
                    {[...Array(current.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 fill-[#B2904D] text-[#B2904D]" />
                    ))}
                    </div>

                    {/* Comentario */}
                    <p className="text-2xl text-gray-800 italic leading-relaxed font-light">
                    &quot;{current.comment}&quot;
                    </p>
                </div>
                
                {/* Indicador simple */}
                <div className="mt-8 flex justify-center md:justify-start">
                    <div className="w-12 h-1.5 rounded-full bg-[#B2904D] opacity-50"></div>
                </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal del Video */}
      {isVideoOpen && <VideoModal videoId={current.videoId} onClose={closeVideo} />}
    </section>
  )
}