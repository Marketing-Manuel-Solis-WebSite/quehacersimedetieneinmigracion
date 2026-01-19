'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Category {
  id: string;
  es: string;
  en: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (categoryId: string) => void;
  lang: 'es' | 'en';
}

export default function CategoryFilter({ categories, selected, onSelect, lang }: CategoryFilterProps) {
  const t = (obj: any) => obj[lang] || obj.es;

  return (
    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
      {categories.map((cat, idx) => {
        const isSelected = selected === cat.id;
        
        return (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onSelect(cat.id)}
            className={`
              relative px-6 py-2.5 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase transition-all duration-300
              border backdrop-blur-sm overflow-hidden group
              ${isSelected 
                ? 'bg-[#B2904D] border-[#B2904D] text-[#001540] shadow-[0_0_20px_rgba(178,144,77,0.4)]' 
                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/30'
              }
            `}
          >
            {/* Fondo animado al hover */}
            {!isSelected && (
                 <span className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            )}
            
            <span className="relative z-10">{t(cat)}</span>
          </motion.button>
        );
      })}
    </div>
  );
}