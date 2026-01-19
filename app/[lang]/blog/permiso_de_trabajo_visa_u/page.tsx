import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Outfit } from 'next/font/google';
import Script from 'next/script';
import { 
  Calendar, Clock, ArrowLeft, Sparkles, CheckCircle2, AlertCircle, 
  Lightbulb, Quote, TrendingUp, Award, Heart, Star, MessageCircle, 
  Send, ArrowUpRight, ShieldCheck, FileText, User
} from 'lucide-react';

// IMPORTACIONES
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import BlogBackground from '../../../components/blogs/BlogBackground';
import ShareButtons from '../../../components/blogs/ShareButtons';
import ContactForm from '../../../components/ContactForm';
import BlogTracker from '../../../components/blogs/BlogTracker'; // 👈 Importamos el tracker

const font = Outfit({ 
  subsets: ['latin'], 
  weight: ['100', '200', '300', '400', '500', '700', '800', '900'] 
});

const SITE_URL = 'https://www.manuelsolis.com'; 

const IMAGES = {
  article: '/blog/visa-u.png', 
  author: '/abogado-manuel-solis.jpg'
};

const blogContent = {
  es: {
    metaTitle: 'Permiso de trabajo Visa U 2026: ¿Qué es la Bona Fide? | Manuel Solís',
    metaDesc: 'Obtén tu permiso de trabajo por Visa U antes de la aprobación final. Descubre cómo funciona la determinación Bona Fide y empieza a trabajar legalmente.',
    ui: {
      back: 'Volver al blog',
      share: 'Compartir artículo',
      writtenBy: 'Escrito por',
      published: 'Publicado',
      readTime: '8 min de lectura',
      tags: 'Visa U',
      date: '16 Ene, 2025',
      time: '8 min',
      authorRole: 'Fundador & Abogado Principal',
      ctaButton: 'Consultar con un Abogado Ahora'
    },
    title: 'Permiso de trabajo Visa U (Bona Fide) antes de la aprobación final',
    summary: {
      title: 'Lo que debes saber',
      text: '¿Solicitaste la Visa U y estás esperando desde hace años sin poder trabajar legalmente? En la Firma del Abogado Manuel Solís te explicamos cómo obtener un permiso de trabajo bajo la determinación <strong>Bona Fide</strong>, una alternativa legal que te permite salir de la espera y empezar a generar ingresos mientras llega tu aprobación final.'
    },
    intro: [
      'La espera por la Visa U suele durar más de cinco años. Mientras tanto, muchas personas viven con ansiedad, sin poder trabajar legalmente, sostener a sus familias o acceder a servicios básicos. Es frustrante: colaboraste con las autoridades, fuiste víctima de un crimen, y aún así estás atrapado en una pausa indefinida.',
      'Pero desde 2021, hay una salida: el permiso de trabajo por <strong class="text-white font-medium">“Determinación Bona Fide”</strong>. Este beneficio temporal ha cambiado la vida de miles de solicitantes, permitiéndoles obtener una autorización laboral mucho antes de que su caso sea aprobado formalmente. En este artículo te explicamos qué es, cómo se obtiene y por qué es clave para quienes están en espera de Visa U este 2026.'
    ],
    sections: {
      whatIs: {
        title: '¿Qué es la determinación Bona Fide?',
        quote: 'El alivio anticipado para quienes ya hicieron su parte.',
        text: 'La determinación Bona Fide (o BFD por sus siglas en inglés) es una evaluación inicial que hace USCIS para decidir si una solicitud de Visa U es legítima y completa. Si tu petición pasa esta revisión, podrías recibir:',
        list: [
          'Un permiso de trabajo válido por 4 años.',
          'La posibilidad de permanecer en EE. UU. de manera temporal mientras USCIS toma una decisión sobre tu caso.'
        ],
        note: '* Este beneficio no significa que tu caso fue aprobado, pero te permite vivir y trabajar legalmente en lo que llega la decisión final.'
      },
      whyExists: {
        title: '¿Por qué existe la determinación Bona Fide?',
        text: 'USCIS implementó esta política en 2021 debido al creciente retraso en la aprobación de Visas U, que supera los 5 años en muchos casos. Ante esta situación, la agencia decidió otorgar un alivio temporal a quienes:',
        cards: {
          complete: { title: 'Solicitudes Completas', desc: 'Presentaron solicitudes genuinas.' },
          victim: { title: 'Víctimas de Crimen', desc: 'Fueron víctimas de un crimen calificado.' },
          coop: { title: 'Cooperación', desc: 'Cooperaron con la policía.' },
          record: { title: 'Sin Antecedentes', desc: 'No tienen antecedentes graves.' }
        },
        footer: 'Es una forma de reconocer que los solicitantes no deben quedar “congelados” durante años sin ninguna protección.'
      },
      requirements: {
        title: '¿Cómo saber si calificas para este permiso?',
        subtitle: 'Requisitos Clave',
        list: [
          'Haber presentado el formulario I-918 correctamente.',
          'Incluir el formulario I-918B firmado por una autoridad (policía, fiscal, etc.).',
          'Haber enviado todos los formularios requeridos de manera completa y coherente.',
          'No tener antecedentes penales graves.',
          'Incluir el formulario I-765 (permiso de trabajo) al momento de presentar tu solicitud, o enviarlo después.'
        ],
        note: 'Nota importante: No necesitas hacer una solicitud adicional para la Bona Fide: USCIS la evalúa como parte de tu caso.'
      },
      timeline: {
        title: '¿Cuánto tarda en llegar el permiso?',
        time: '12 a 18 Meses',
        text: 'En promedio, USCIS está tardando entre 12 y 18 meses en emitir la determinación Bona Fide desde que se recibe la solicitud inicial. Esto podría variar según la carga de trabajo, la claridad de tu caso y la documentación. Aunque sigue siendo una espera considerable, es mucho más corta que los más de 5 años que tarda la aprobación total.'
      },
      realCase: {
        title: 'Casos reales: cuando el permiso de trabajo lo cambia todo',
        caseTitle: 'Myriam, víctima de invasión violenta',
        date: '16 de Enero de 2025',
        quote: '"Myriam y su hijo vivieron un momento traumático: un hombre entró sin permiso a su casa, alterando para siempre su tranquilidad... Durante mucho tiempo, Myriam vivió con miedo, sin estabilidad económica."',
        result: 'Gracias a una demanda estratégica presentada por la firma del Abogado Manuel Solis, Myriam recibió su permiso de trabajo a principios de 2025. Desde entonces:',
        benefits: [
          'Tiene un empleo formal',
          'Estabilidad emocional',
          'Contribuye legalmente',
          'Cerró plan de pagos'
        ]
      },
      faq: {
        q1: '¿Qué pasa si no incluí el formulario I-765?',
        a1: '<strong>Aún podrías enviarlo.</strong> Si no enviaste el permiso de trabajo junto con tu solicitud de Visa U, podrías enviarlo después, siempre que tu caso aún esté pendiente. USCIS aceptará el formulario y lo considerará si ya te dieron la determinación Bona Fide o están por hacerlo.',
        q2: '¿Podría negarse el permiso?',
        a2: 'Sí, hay situaciones en las que USCIS podría negar el beneficio temporal, por ejemplo:',
        list2: [
          'Si encuentran errores graves o fraude en tu solicitud.',
          'Si tienes antecedentes criminales que no informaste.',
          'Si no cumples con los requisitos mínimos.'
        ],
        footer: 'Por eso es crucial preparar bien tu caso desde el inicio y mantener tus datos actualizados.'
      },
      conclusion: {
        title: 'Conclusión',
        text: 'La espera de la Visa U podría parecer interminable, pero gracias a la determinación Bona Fide, no tienes que quedarte inmóvil durante años. Este permiso de trabajo temporal es una puerta que se abre para miles de personas.',
        advice: 'Mi consejo es claro: no te quedes con la duda ni esperes pasivamente.'
      },
      sources: {
        title: 'Fuentes Citadas',
        list: [
          'USCIS – Política de Determinación Bona Fide',
          'American Immigration Council – Visa U y permisos de trabajo',
          'ILRC – Guía práctica para Visa U y trabajo anticipado'
        ]
      }
    }
  },
  en: {
    metaTitle: 'U Visa Work Permit 2026: What is Bona Fide? | Manuel Solis',
    metaDesc: 'Get your U Visa work permit before final approval. Discover how Bona Fide Determination works and start working legally in 2026.',
    ui: {
      back: 'Back to blog',
      share: 'Share Article',
      writtenBy: 'Written by',
      published: 'Published',
      readTime: '8 min read',
      tags: 'U Visa',
      date: 'Jan 16, 2025',
      time: '8 min',
      authorRole: 'Founder & Principal Attorney',
      ctaButton: 'Consult with an Attorney Now'
    },
    title: 'U Visa Work Permit (Bona Fide) Before Final Approval',
    summary: {
      title: 'What you need to know',
      text: 'Did you apply for the U Visa and have been waiting for years without being able to work legally? At the Manuel Solís Law Firm, we explain how to obtain a work permit under the <strong>Bona Fide</strong> determination, a legal alternative that allows you to stop waiting and start generating income while your final approval arrives.'
    },
    intro: [
      'The wait for a U Visa usually lasts more than five years. Meanwhile, many people live with anxiety, unable to work legally, support their families, or access basic services. It is frustrating: you cooperated with the authorities, you were a victim of a crime, and yet you are trapped in an indefinite pause.',
      'But since 2021, there is a way out: the work permit by <strong class="text-white font-medium">“Bona Fide Determination”</strong>. This temporary benefit has changed the lives of thousands of applicants, allowing them to obtain work authorization long before their case is formally approved. In this article, we explain what it is, how to get it, and why it is key for those waiting for a U Visa in 2026.'
    ],
    sections: {
      whatIs: {
        title: 'What is the Bona Fide Determination?',
        quote: 'Early relief for those who have already done their part.',
        text: 'The Bona Fide Determination (BFD) is an initial assessment USCIS makes to decide if a U Visa application is legitimate and complete. If your petition passes this review, you could receive:',
        list: [
          'A work permit valid for 4 years.',
          'The possibility of remaining in the U.S. temporarily while USCIS makes a decision on your case.'
        ],
        note: '* This benefit does not mean your case has been approved, but it allows you to live and work legally until the final decision arrives.'
      },
      whyExists: {
        title: 'Why does the Bona Fide Determination exist?',
        text: 'USCIS implemented this policy in 2021 due to the growing backlog in U Visa approvals, which exceeds 5 years in many cases. Given this situation, the agency decided to grant temporary relief to those who:',
        cards: {
          complete: { title: 'Complete Applications', desc: 'Submitted genuine applications.' },
          victim: { title: 'Crime Victims', desc: 'Were victims of a qualifying crime.' },
          coop: { title: 'Cooperation', desc: 'Cooperated with the police.' },
          record: { title: 'No Record', desc: 'Have no serious criminal record.' }
        },
        footer: 'It is a way of recognizing that applicants should not remain “frozen” for years without any protection.'
      },
      requirements: {
        title: 'How do you know if you qualify for this permit?',
        subtitle: 'Key Requirements',
        list: [
          'Have properly filed Form I-918.',
          'Include Form I-918B signed by an authority (police, prosecutor, etc.).',
          'Have sent all required forms completely and consistently.',
          'Have no serious criminal record.',
          'Include Form I-765 (work permit) at the time of submitting your application, or send it later.'
        ],
        note: 'Important note: You do not need to make an additional application for Bona Fide: USCIS evaluates it as part of your case.'
      },
      timeline: {
        title: 'How long does it take for the permit to arrive?',
        time: '12 to 18 Months',
        text: 'On average, USCIS is taking between 12 and 18 months to issue the Bona Fide determination from the time the initial application is received. This could vary depending on the workload, the clarity of your case, and the documentation. Although it is still a considerable wait, it is much shorter than the 5+ years for full approval.'
      },
      realCase: {
        title: 'Real cases: when the work permit changes everything',
        caseTitle: 'Myriam, victim of violent invasion',
        date: 'January 16, 2025',
        quote: '"Myriam and her son lived a traumatic moment: a man entered her house without permission, forever altering her peace of mind... For a long time, Myriam lived in fear, without economic stability."',
        result: 'Gracias a una demanda estratégica presentada por la firma del Abogado Manuel Solis, Myriam received her work permit in early 2025. Since then:',
        benefits: [
          'Has formal employment',
          'Emotional stability',
          'Contributes legally',
          'Closed payment plan'
        ]
      },
      faq: {
        q1: 'What happens if I didn\'t include Form I-765?',
        a1: '<strong>You could still send it.</strong> If you did not send the work permit application with your U Visa application, you could send it later, as long as your case is still pending. USCIS will accept the form and consider it if they have already given you the Bona Fide determination or are about to do so.',
        q2: 'Could the permit be denied?',
        a2: 'Yes, there are situations where USCIS could deny the temporary benefit, for example:',
        list2: [
          'If they find serious errors or fraud in your application.',
          'If you have criminal records you did not report.',
          'If you do not meet the minimum requirements.'
        ],
        footer: 'That is why it is crucial to prepare your case well from the beginning and keep your data updated.'
      },
      conclusion: {
        title: 'Conclusion',
        text: 'The wait for the U Visa might seem endless, but thanks to the Bona Fide determination, you don\'t have to stay immobile for years. This temporary work permit is a door that opens for thousands of people.',
        advice: 'My advice is clear: do not stay with the doubt or wait passively.'
      },
      sources: {
        title: 'Cited Sources',
        list: [
          'USCIS – Bona Fide Determination Policy',
          'American Immigration Council – U Visa and work permits',
          'ILRC – Practice guide for U Visa and early work'
        ]
      }
    }
  }
};

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;
  
  const imageUrl = `${SITE_URL}${IMAGES.article}`;

  return {
    title: t.metaTitle,
    description: t.metaDesc,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      title: t.title,
      description: t.metaDesc,
      url: `${SITE_URL}/${lang}/blog/permiso_de_trabajo_visa_u`,
      images: [
        {
          url: imageUrl, 
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
      type: 'article',
      publishedTime: '2025-01-16T08:00:00.000Z',
      authors: ['Manuel Solís'],
      section: 'Inmigración',
      tags: ['Visa U', 'Permiso de Trabajo', 'Bona Fide', 'Inmigración USA'],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.metaDesc,
      images: [imageUrl],
      creator: '@AbogadoMSolis',
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = blogContent[lang as 'es' | 'en'] || blogContent.es;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": t.title,
    "image": `${SITE_URL}${IMAGES.article}`,
    "author": {
      "@type": "Person",
      "name": "Manuel Solís",
      "url": `${SITE_URL}/abogados`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Manuel Solis Law Firm",
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo-manuel-solis.png`
      }
    },
    "datePublished": "2025-01-16",
    "dateModified": "2025-01-16",
    "description": t.metaDesc,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${lang}/blog/permiso_de_trabajo_visa_u`
    }
  };

  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      {/* AQUÍ INYECTAMOS EL TRACKER QUE CUENTA VISTAS, SCROLL Y NOMBRE */}
      <BlogTracker 
        title={t.title} 
        author="Manuel Solís" 
        category="Inmigración" 
      />

      <div className={`min-h-screen bg-[#001540] text-white selection:bg-[#B2904D] selection:text-[#001540] ${font.className}`}>
        
        <Header />

        <BlogBackground />

        <main className="relative z-10 pt-32 pb-20">
          
          {/* HERO */}
          <section className="container mx-auto px-4 md:px-6 lg:px-8 mb-16">
            
            <div className="mb-10">
              <Link href={`/${lang}/blog`} className="inline-flex items-center gap-2 text-white/60 hover:text-[#B2904D] transition-colors group text-sm font-medium uppercase tracking-wider">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {t.ui.back}
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-6 animate-fade-in-up">
              <span className="px-3 py-1 bg-[#B2904D] text-[#001540] text-xs font-bold uppercase tracking-widest rounded-full">
                {t.ui.tags}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Calendar size={14} /> {t.ui.date}
              </span>
              <span className="flex items-center gap-2 text-white/60 text-sm">
                <Clock size={14} /> {t.ui.time}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium text-white leading-[1.1] mb-8 max-w-5xl animate-fade-in-up delay-100">
              {t.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10 pt-8 animate-fade-in-up delay-200">
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#B2904D] shadow-lg shadow-[#B2904D]/20">
                  <Image 
                    src={IMAGES.author}
                    alt="Abogado Manuel Solis"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Abogado Manuel Solís</p>
                  <p className="text-white/50 text-sm">{t.ui.authorRole}</p>
                </div>
              </div>
              
              <ShareButtons title={t.title} uiShareText={t.ui.share} />
            </div>
          </section>

          {/* CONTENIDO */}
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12">
              
              <article className="lg:col-span-8 prose prose-lg prose-invert max-w-none">
                
                <div className="mb-12 relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                   <Image 
                     src={IMAGES.article} 
                     alt="Visa U Permiso de Trabajo"
                     fill
                     className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     priority
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[#001540] via-transparent to-transparent opacity-30" />
                </div>

                <div className="p-8 rounded-3xl bg-gradient-to-br from-[#B2904D]/20 to-transparent border border-[#B2904D]/30 mb-10 shadow-2xl">
                   <h3 className="text-[#B2904D] font-bold text-xl mb-4 flex items-center gap-2">
                     <Sparkles size={20} /> {t.summary.title}
                   </h3>
                   <p 
                     className="text-lg text-white leading-relaxed font-light m-0"
                     dangerouslySetInnerHTML={{ __html: t.summary.text }}
                   />
                </div>

                <div className="space-y-12 text-blue-50/80 font-light text-lg leading-8">
                  
                  <section>
                    {t.intro.map((paragraph, idx) => (
                      <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} className="mb-6" />
                    ))}
                  </section>

                  <section>
                    <h2 className="text-3xl font-serif text-white mt-0 mb-6 flex items-center gap-3">
                      <div className="p-2 bg-white/10 rounded-lg"><Lightbulb size={24} className="text-[#B2904D]" /></div>
                      {t.sections.whatIs.title}
                    </h2>
                    <p className="text-xl text-white italic mb-6 border-l-4 border-[#B2904D] pl-6 py-2">
                      {t.sections.whatIs.quote}
                    </p>
                    <p className="mb-4">{t.sections.whatIs.text}</p>
                    <ul className="grid gap-4 mt-6 list-none pl-0">
                      {t.sections.whatIs.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                          <CheckCircle2 size={24} className="text-green-400 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm text-white/60">
                      {t.sections.whatIs.note}
                    </p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6">{t.sections.whyExists.title}</h2>
                    <p className="mb-8">{t.sections.whyExists.text}</p>
                    <div className="grid md:grid-cols-2 gap-4 my-8">
                        <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                          <FileText className="text-[#B2904D]" />
                          <span className="font-bold text-white">{t.sections.whyExists.cards.complete.title}</span>
                          <span className="text-sm">{t.sections.whyExists.cards.complete.desc}</span>
                        </div>
                        <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                          <ShieldCheck className="text-[#B2904D]" />
                          <span className="font-bold text-white">{t.sections.whyExists.cards.victim.title}</span>
                          <span className="text-sm">{t.sections.whyExists.cards.victim.desc}</span>
                        </div>
                        <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                          <User className="text-[#B2904D]" />
                          <span className="font-bold text-white">{t.sections.whyExists.cards.coop.title}</span>
                          <span className="text-sm">{t.sections.whyExists.cards.coop.desc}</span>
                        </div>
                        <div className="p-5 bg-[#000a20] rounded-xl border border-white/10 flex flex-col gap-2 hover:border-[#B2904D]/50 transition-colors">
                          <AlertCircle className="text-[#B2904D]" />
                          <span className="font-bold text-white">{t.sections.whyExists.cards.record.title}</span>
                          <span className="text-sm">{t.sections.whyExists.cards.record.desc}</span>
                        </div>
                    </div>
                    <p>{t.sections.whyExists.footer}</p>
                  </section>

                  <section>
                    <h2 className="text-3xl font-serif text-white mb-6">{t.sections.requirements.title}</h2>
                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                      <h4 className="text-[#B2904D] font-bold uppercase tracking-widest mb-6 text-sm">{t.sections.requirements.subtitle}</h4>
                      <ul className="space-y-4 list-none pl-0 m-0">
                        {t.sections.requirements.list.map((req, idx) => (
                           <li key={idx} className="flex gap-3 items-start">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#B2904D] mt-2.5 shrink-0" />
                             <span>{req}</span>
                           </li>
                        ))}
                      </ul>
                      <div className="mt-6 p-4 bg-[#B2904D]/10 rounded-xl border border-[#B2904D]/20 text-sm text-[#B2904D]">
                          {t.sections.requirements.note}
                      </div>
                    </div>
                  </section>

                  <section>
                     <h2 className="text-3xl font-serif text-white mb-6">{t.sections.timeline.title}</h2>
                     <div className="flex items-center gap-4 mb-6 p-4 bg-white/5 rounded-xl inline-flex w-full md:w-auto">
                        <TrendingUp size={32} className="text-[#B2904D]" />
                        <span className="text-2xl font-bold text-white">{t.sections.timeline.time}</span>
                     </div>
                     <p>{t.sections.timeline.text}</p>
                  </section>

                  <section className="relative my-12">
                    <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B2904D] to-transparent hidden md:block" />
                    <h2 className="text-3xl font-serif text-white mb-8">{t.sections.realCase.title}</h2>
                    
                    <div className="bg-[#000a20] p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden group hover:border-[#B2904D]/30 transition-all">
                       <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Quote size={120} />
                       </div>
                       
                       <h3 className="text-xl font-bold text-white mb-2">{t.sections.realCase.caseTitle}</h3>
                       <p className="text-sm text-[#B2904D] mb-6 font-bold uppercase tracking-wider">{t.sections.realCase.date}</p>

                       <p className="italic text-white/90 mb-6 text-lg">
                         {t.sections.realCase.quote}
                       </p>

                       <p className="mb-6">{t.sections.realCase.result}</p>

                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                          <div className="flex items-center gap-2 text-sm text-white font-medium bg-white/5 p-3 rounded-lg">
                             <Award size={16} className="text-[#B2904D]" /> {t.sections.realCase.benefits[0]}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white font-medium bg-white/5 p-3 rounded-lg">
                             <Heart size={16} className="text-[#B2904D]" /> {t.sections.realCase.benefits[1]}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white font-medium bg-white/5 p-3 rounded-lg">
                             <Star size={16} className="text-[#B2904D]" /> {t.sections.realCase.benefits[2]}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white font-medium bg-white/5 p-3 rounded-lg">
                             <CheckCircle2 size={16} className="text-[#B2904D]" /> {t.sections.realCase.benefits[3]}
                          </div>
                       </div>
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="text-2xl text-white font-bold mb-4">{t.sections.faq.q1}</h3>
                    <p dangerouslySetInnerHTML={{ __html: t.sections.faq.a1 }} />

                    <h3 className="text-2xl text-white font-bold mb-4 mt-10">{t.sections.faq.q2}</h3>
                    <p>{t.sections.faq.a2}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-4 text-white/80">
                        {t.sections.faq.list2.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                    </ul>
                    <p className="mt-4 font-medium text-white">{t.sections.faq.footer}</p>
                  </section>

                  <div className="p-8 bg-gradient-to-r from-[#B2904D] to-[#8a6e36] rounded-3xl text-[#001540] shadow-lg mt-12">
                      <h2 className="text-2xl font-bold font-serif mb-4 flex items-center gap-2">
                         <MessageCircle size={28} /> {t.sections.conclusion.title}
                      </h2>
                      <p className="font-medium text-lg mb-6 leading-relaxed">
                        {t.sections.conclusion.text}
                      </p>
                      <p className="font-bold text-xl mb-8">
                        {t.sections.conclusion.advice}
                      </p>
                      
                      <Link href="#contacto" className="inline-flex items-center justify-center w-full md:w-auto px-8 py-4 bg-[#001540] text-white font-bold rounded-xl hover:bg-white hover:text-[#001540] transition-all shadow-xl gap-2">
                         <Send size={18} />
                         {t.ui.ctaButton}
                      </Link>
                  </div>

                  <div className="border-t border-white/10 pt-8 mt-12">
                      <h4 className="text-xs font-bold text-white/40 uppercase mb-4 tracking-widest">{t.sections.sources.title}</h4>
                      <ul className="space-y-2 text-sm text-white/40 list-none pl-0">
                         {t.sections.sources.list.map((source, idx) => (
                           <li key={idx} className="flex items-center gap-2 hover:text-[#B2904D] transition-colors"><ArrowUpRight size={12} /> {source}</li>
                         ))}
                      </ul>
                  </div>

                </div>
              </article>

              <aside className="lg:col-span-4 space-y-8">
                 
                 <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md sticky top-32">
                    <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">Sobre el Autor</h3>
                    <div className="flex flex-col items-center text-center">
                       <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-[#001540] shadow-[0_0_0_2px_#B2904D] mb-4">
                          <Image src={IMAGES.author} alt="Manuel Solis" fill className="object-cover" />
                       </div>
                       <h4 className="text-xl font-bold text-white">Manuel Solís</h4>
                       <p className="text-sm text-[#B2904D] mb-4">{t.ui.authorRole}</p>
                       <Link href={`/${lang}/abogados`} className="text-sm font-bold text-white border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-[#001540] transition-colors w-full">
                         Ver Perfil
                       </Link>
                    </div>
                 </div>

              </aside>

            </div>
          </div>

        </main>
        
        <div id="contacto">
           <ContactForm />
        </div>

        <Footer />
      </div>
    </>
  );
}