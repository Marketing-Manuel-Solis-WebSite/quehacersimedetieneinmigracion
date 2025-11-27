'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Helper para crear slugs (url amigables)
const slugify = (text: string) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

interface ServiceCategoryProps {
  title: string;
  icon: React.ElementType;
  items?: string[]; // Opcional para evitar errores de tipado
  delay?: number;
}

export default function ServiceCategory({ title, icon: Icon, items, delay = 0 }: ServiceCategoryProps) {
  
  // --- LÍNEA DE SEGURIDAD (CRÍTICA) ---
  // Si 'items' llega vacío, nulo o indefinido, forzamos que sea un array vacío [].
  // Esto elimina el error "Cannot read properties of undefined (reading 'map')"
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:border-[#B2904D]/30 transition-all duration-300 relative overflow-hidden"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-6 -top-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
        <Icon size={180} />
      </div>

      {/* Header de la Tarjeta */}
      <div className="relative z-10 mb-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#002342] flex items-center justify-center text-[#B2904D] shadow-md group-hover:scale-110 transition-transform duration-300">
          <Icon size={24} />
        </div>
        <h3 className="text-2xl font-serif font-bold text-[#002342]">
          {title}
        </h3>
      </div>

      {/* Lista de Servicios BLINDADA */}
      <ul className="relative z-10 space-y-3">
        {safeItems.length > 0 ? (
          safeItems.map((item, idx) => (
            <li key={idx}>
              <Link 
                href={`/areas-servicio/${slugify(item)}`}
                className="flex items-start gap-2 group/item hover:bg-gray-50 p-2 rounded-lg -mx-2 transition-colors"
              >
                <ChevronRight 
                  size={18} 
                  className="text-[#B2904D] mt-1 flex-shrink-0 group-hover/item:translate-x-1 transition-transform" 
                />
                <span className="text-gray-600 font-medium text-sm md:text-base group-hover/item:text-[#002342] transition-colors">
                  {item}
                </span>
              </Link>
            </li>
          ))
        ) : (
          <li className="text-gray-400 text-xs italic">Consultar servicios...</li>
        )}
      </ul>
      
      {/* Barra decorativa inferior */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#B2904D] group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
  );
}