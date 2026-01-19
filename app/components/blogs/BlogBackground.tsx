'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function BlogBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Gradiente Base Profundo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
      
      {/* Orbe Dorado (Derecha Superior) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.15, 0.3, 0.15],
          rotate: [0, 45, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-[#B2904D]/10 rounded-full blur-[120px]" 
      />

      {/* Orbe Azul (Izquierda Inferior) */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.1, 0.25, 0.1],
          x: [-20, 20, -20]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[100px]" 
      />

      {/* Ruido de Textura (Film Grain) */}
      <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
    </div>
  );
}