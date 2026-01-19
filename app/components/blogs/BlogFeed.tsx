'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Sparkles, Frown } from 'lucide-react';
import { Outfit } from 'next/font/google';

// Imports de tus componentes existentes
import BlogCard from './BlogCard';
import FeaturedPost from './FeaturedPost';
import CategoryFilter from './CategoryFilter';
import SearchBar from './SearchBar';
import BlogBackground from './BlogBackground';

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '700', '800', '900'] 
});

interface BlogFeedProps {
  initialPosts: any[];
  categories: any[];
  uiText: any;
  lang: 'es' | 'en';
}

export default function BlogFeed({ initialPosts, categories, uiText, lang }: BlogFeedProps) {
  const t = (obj: any) => obj ? (obj[lang] || obj.es) : '';

  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Lógica de Filtrado
  const featuredPost = initialPosts.find(post => post.featured);
  const isDefaultView = searchQuery === '' && selectedCategoryId === 'all';

  const filteredPosts = initialPosts.filter(post => {
    const matchesCategory = selectedCategoryId === 'all' || post.categoryId === selectedCategoryId;
    const matchesSearch = searchQuery === '' || 
      t(post.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(post.excerpt).toLowerCase().includes(searchQuery.toLowerCase());

    // Si es la vista por defecto, no mostramos el destacado en la lista (para no duplicarlo)
    if (isDefaultView && post.featured) {
      return false;
    }
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`relative w-full min-h-screen bg-[#001540] overflow-hidden ${font.className}`}>
      
      {/* --- Fondo Animado (Reutilizamos tu componente) --- */}
      <BlogBackground />

      {/* --- Contenido Principal --- */}
      <div className="relative z-10 pt-[160px] pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Section del Blog */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B2904D]/10 border border-[#B2904D]/30 mb-6 backdrop-blur-md">
              <Sparkles className="text-[#B2904D]" size={14} />
              <span className="text-[#B2904D] text-xs font-bold tracking-[0.2em] uppercase">
                {t(uiText.hero.badge)}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-6 leading-tight">
              {t(uiText.hero.title)}
            </h1>
            
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#B2904D] to-transparent mx-auto mb-8 opacity-60" />
            
            <p className="text-blue-100/70 text-base md:text-xl leading-relaxed font-light max-w-3xl mx-auto">
              {t(uiText.hero.subtitle)}
            </p>
          </motion.div>

          {/* Barra de Herramientas (Search + Filter) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 space-y-8"
          >
            <SearchBar value={searchQuery} onChange={setSearchQuery} lang={lang} />
            <CategoryFilter categories={categories} selected={selectedCategoryId} onSelect={setSelectedCategoryId} lang={lang} />
          </motion.div>

          {/* Artículo Destacado (Solo en vista por defecto) */}
          <div className="min-h-[500px]"> {/* Contenedor para evitar saltos de layout */}
            {isDefaultView && featuredPost && (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-24"
              >
                <div className="flex items-center gap-3 mb-8 px-2">
                  <div className="p-2 rounded-lg bg-[#B2904D]/10">
                    <TrendingUp className="text-[#B2904D]" size={24} />
                  </div>
                  <h2 className="text-3xl font-serif text-white">{t(uiText.featured)}</h2>
                </div>
                
                <FeaturedPost post={featuredPost} lang={lang} />
              </motion.div>
            )}

            {/* Grid de Artículos */}
            {filteredPosts.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center gap-4 mb-10 px-2">
                  <div className="w-1.5 h-8 bg-[#B2904D]" />
                  <h2 className="text-3xl font-serif text-white">{t(uiText.latest)}</h2>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredPosts.map((post, idx) => (
                    <BlogCard key={post.id} post={post} lang={lang} delay={idx * 0.1} />
                  ))}
                </div>
              </motion.div>
            ) : (
              // Estado Vacío (si no hay resultados)
              (!isDefaultView || !featuredPost) && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white/5 rounded-3xl border border-white/10"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#001540] border border-white/10 mb-6 shadow-xl">
                    <Frown className="text-white/40" size={32} />
                  </div>
                  <p className="text-white/60 text-lg font-light">{t(uiText.noResults)}</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedCategoryId('all'); }}
                    className="mt-6 text-[#B2904D] hover:text-white transition-colors text-sm font-bold uppercase tracking-widest border-b border-[#B2904D] pb-1"
                  >
                    Limpiar Filtros
                  </button>
                </motion.div>
              )
            )}
          </div>

        </div>
      </div>
    </div>
  );
}