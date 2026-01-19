'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogCardProps {
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
  delay?: number;
}

export default function BlogCard({ post, lang, delay = 0 }: BlogCardProps) {
  const t = (obj: any) => obj[lang] || obj.es;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-US', options);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className="group h-full"
    >
      <Link href={`/${lang}/blog/${post.slug}`} className="block h-full">
        <div className="bg-[#000F24] rounded-2xl overflow-hidden border border-white/10 hover:border-[#B2904D]/50 transition-all duration-300 h-full flex flex-col hover:shadow-[0_10px_30px_-10px_rgba(178,144,77,0.15)] group-hover:-translate-y-1">
          
          {/* Imagen */}
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
            <Image
              src={post.image || '/placeholder.jpg'}
              alt={t(post.title)}
              fill
              // Optimización de carga de imagen
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#000F24] to-transparent opacity-60" />
            
            {/* Badge de Categoría */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#001540]/90 backdrop-blur-sm border border-white/10 shadow-lg z-10">
              <span className="text-[#B2904D] text-[10px] font-bold uppercase tracking-widest">
                {t(post.category)}
              </span>
            </div>
          </div>

          {/* Contenido */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Meta Datos */}
            <div className="flex items-center gap-4 text-xs text-white/40 mb-3 font-medium uppercase tracking-wider">
              <div className="flex items-center gap-1.5">
                <Calendar size={12} className="text-[#B2904D]" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Clock size={12} />
                <span>{post.readTime}</span>
              </div>
            </div>

            <h3 className="text-xl font-serif text-white mb-3 leading-snug group-hover:text-[#B2904D] transition-colors line-clamp-2">
              {t(post.title)}
            </h3>

            <p className="text-blue-100/60 text-sm leading-relaxed mb-6 flex-1 line-clamp-3 font-light">
              {t(post.excerpt)}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[#B2904D]">
                   <User size={12} />
                </div>
                <span>{post.author}</span>
              </div>
              
              <div className="flex items-center gap-2 text-[#B2904D] text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                <span>{lang === 'es' ? 'Leer' : 'Read'}</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}