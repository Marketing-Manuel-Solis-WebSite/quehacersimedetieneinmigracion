'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  lang: 'es' | 'en';
}

export default function SearchBar({ value, onChange, lang }: SearchBarProps) {
  const placeholder = lang === 'es' 
    ? 'Buscar en nuestra biblioteca legal...' 
    : 'Search our legal library...';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative max-w-2xl mx-auto w-full"
    >
      <div className="relative group">
        {/* Icono */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <Search className="text-white/40 group-focus-within:text-[#B2904D] transition-colors" size={20} />
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-14 pr-14 py-4 bg-[#000a20]/60 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder:text-white/30 focus:outline-none focus:border-[#B2904D]/50 focus:bg-[#000a20]/80 transition-all duration-300 text-base shadow-lg hover:shadow-[#B2904D]/5 hover:border-white/20"
        />

        {/* Botón Limpiar */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onChange('')}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors"
            >
              <X size={14} />
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}