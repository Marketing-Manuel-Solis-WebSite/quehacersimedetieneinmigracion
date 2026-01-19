'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User, Star, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedPostProps {
  post: {
    id: string | number;
    title: { es: string; en: string };
    excerpt: { es: string; en: string };
    category: { es: string; en: string };
    author: string;
    date: string;
    readTime: string;
    image: string;
    slug: string;
  };
  lang: 'es' | 'en';
}

export default function FeaturedPost({ post, lang }: FeaturedPostProps) {
  const t = (obj: any) => obj[lang] || obj.es;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', { 
      year: 'numeric', month: 'long', day: 'numeric' 
    });
  };

  if (!post) return null;

  return (
    <Link href={`/${lang}/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.5 }}
        className="group relative w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#001540] shadow-2xl hover:shadow-[0_0_80px_rgba(178,144,77,0.15)] hover:border-[#B2904D]/40 transition-all duration-500"
      >
        <div className="grid lg:grid-cols-2 gap-0">
          
          {/* Imagen */}
          {/* ✅ CORRECCIÓN: 'aspect-video' asegura que la imagen horizontal se vea completa (16:9) y no como un cuadro */}
          <div className="relative aspect-video lg:aspect-auto lg:h-full lg:min-h-[450px] overflow-hidden">
            <Image
              src={post.image || '/placeholder.jpg'}
              alt={t(post.title)}
              fill
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
              priority
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#001540] via-[#001540]/20 to-transparent lg:opacity-100 opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent lg:hidden" />
            
            {/* Badge Destacado */}
            <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-[#B2904D] backdrop-blur-md border border-white/20 shadow-xl z-10">
              <Sparkles size={14} className="text-white" />
              <span className="text-white text-[11px] font-bold uppercase tracking-widest">
                {lang === 'es' ? 'Tendencia Ahora' : 'Trending Now'}
              </span>
            </div>
          </div>

          {/* Contenido */}
          <div className="relative p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#001540] lg:bg-transparent">
             {/* Decoración de fondo en el texto */}
             <div className="absolute inset-0 bg-gradient-to-r from-[#001540] via-[#001540] to-transparent z-[-1] hidden lg:block" />

             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 w-fit mb-6">
               <span className="text-[#B2904D] text-[10px] font-bold uppercase tracking-[0.2em]">
                 {t(post.category)}
               </span>
             </div>

             <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight group-hover:text-[#B2904D] transition-colors duration-300">
               {t(post.title)}
             </h2>

             <p className="text-blue-100/70 text-lg leading-relaxed mb-8 font-light line-clamp-3">
               {t(post.excerpt)}
             </p>

             <div className="flex flex-wrap items-center gap-6 text-sm text-white/50 mb-10 pb-10 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#B2904D] to-[#8a6e36] flex items-center justify-center text-white shadow-lg">
                     <User size={14} />
                  </div>
                  <span className="font-medium text-white/80">{post.author}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
             </div>

             <div className="flex items-center gap-4 text-white font-medium group/btn">
                <span className="text-lg border-b border-[#B2904D] pb-1">
                    {lang === 'es' ? 'Leer Historia Completa' : 'Read Full Story'}
                </span>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-[#B2904D] group-hover/btn:border-[#B2904D] group-hover/btn:text-[#001540] transition-all duration-300">
                    <ArrowRight size={18} className="group-hover/btn:-rotate-45 transition-transform duration-300" />
                </div>
             </div>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}