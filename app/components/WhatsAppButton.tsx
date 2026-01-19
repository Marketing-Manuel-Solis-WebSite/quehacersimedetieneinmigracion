"use client";

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { track } from '@vercel/analytics/react'; // 1. Importar track de Vercel

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  // Se sigue usando useLanguage para el tooltip y manejo de texto general
  const { t } = useLanguage();
  
  // 📞 NÚMERO DE WHATSAPP (1-713-855-7219)
  const whatsappNumber = '17138557219';
  
  // Mensaje predeterminado con el texto solicitado, codificado para URL
  const rawMessage = 'Website: ¡Hola! Quisiera saber más sobre cómo puedo regularizar mi situación migratoria en EE.UU. ¿Podrían asesorarme?';
  const defaultMessage = encodeURIComponent(rawMessage);
  
  // URL de WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;
  
  const handleClick = () => {
    window.open(whatsappUrl, '_blank');
    
    // 2. Vercel Analytics Tracking (NUEVO)
    track('Whatsapp Click', {
      location: 'floating_button',
      timestamp: new Date().toISOString()
    });

    // 3. Google Analytics Tracking (EXISTENTE)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'whatsapp_click', {
        'event_category': 'contact',
        'event_label': 'whatsapp_button'
      });
    }
  };

  // Mensaje del Tooltip: Usamos el mensaje del cliente si existe, si no, uno por defecto
  const tooltipMessage = t.whatsapp?.tooltip || '¡Chatea con nosotros!';

  return (
    <>
      {/* Botón flotante de WhatsApp */}
      <div className="fixed bottom-6 right-24 z-50">
        
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
            {tooltipMessage}
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
          </div>
        )}
        
        {/* Botón principal */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="group relative flex items-center justify-center w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl"
          aria-label="Contact us on WhatsApp"
        >
          {/* Icono de WhatsApp */}
          <MessageCircle className="w-8 h-8 relative z-10" strokeWidth={2} />
          
          {/* Badge de notificación rojo */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
      
      {/* Estilos personalizados */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .shadow-3xl {
          box-shadow: 0 20px 50px rgba(37, 211, 102, 0.5);
        }
      `}</style>
    </>
  );
}