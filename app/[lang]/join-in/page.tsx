'use client'

import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence, Variants } from 'framer-motion'; 
import { User, Phone, Mail, CheckCircle2, ShieldCheck, Zap, XCircle } from 'lucide-react';
import { Outfit } from 'next/font/google';
import { track } from '@vercel/analytics/react'; // 1. Importación para Analytics

// --- CONFIGURACIÓN DE FUENTE Y COLORES ---
const font = Outfit({ subsets: ['latin'], weight: ['100', '300', '400', '500', '700'] });
const ACCENT_GOLD = '#B2904D';
const API_URL = '/api/signup-proxy'; 

// --- VARIANTS ---
const containerVar: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVar: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

// --- SUBCOMPONENTE: INPUT CON EFECTOS DE FOCO OPTIMIZADO ---
const NeonInput = ({ icon: Icon, name, type = "text", placeholder, value, onChange, required = false, autoFocus = false }: any) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="relative group">
            <motion.div 
                animate={isFocused ? { color: ACCENT_GOLD, scale: 1.1 } : { color: '#64748b', scale: 1 }}
                className="absolute left-4 top-4 z-20 transition-all duration-300 pointer-events-none"
            >
                <Icon size={20} />
            </motion.div>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required={required}
                autoFocus={autoFocus}
                className={`w-full bg-[#000510]/60 border-2 rounded-xl py-4 pl-12 pr-4 text-white font-medium placeholder-slate-500 focus:outline-none transition-colors z-10 relative
                  ${isFocused ? 'border-[#B2904D]/50 bg-[#000510]/80' : 'border-white/10 hover:border-white/20'}
                `}
                placeholder={placeholder}
            />
            
            {/* Línea inferior animada al hacer foco - Optimizada */}
            <div className="absolute bottom-0 left-2 right-2 h-[1px] bg-transparent overflow-hidden pointer-events-none">
               <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: isFocused ? "0%" : "-100%" }}
                 transition={{ duration: 0.3, ease: "easeOut" }}
                 className="w-full h-full bg-[#B2904D] shadow-[0_0_5px_#B2904D]"
               />
            </div>
        </div>
    );
};

// Componente del Contenido del Formulario (con lógica de estado)
function FormContent({ formData, isSubmitting, submitStatus, handleSubmit, handleChange, t, lang }: any) {
    return (
        <motion.div
            variants={containerVar}
            initial="hidden"
            animate="visible"
            className="relative z-10"
        >
            <AnimatePresence>
                {(submitStatus === 'success' || submitStatus === 'error') && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    // Optimización: Menos blur y más opacidad
                    className="absolute inset-0 z-50 bg-[#001540]/98 flex flex-col items-center justify-center text-center rounded-[2rem] backdrop-blur-sm"
                  >
                      {submitStatus === 'success' ? (
                        <motion.div
                           initial={{ scale: 0 }} animate={{ scale: 1 }}
                           transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <CheckCircle2 size={80} className="text-green-400 mb-6 drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]" />
                          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{t('¡Enviado con Éxito!', 'Successfully Sent!')}</h3>
                          <p className="text-blue-200">{t('Nuestro equipo revisará su caso de inmediato.', 'Our team will review your case immediately.')}</p>
                        </motion.div>
                      ) : (
                        <motion.div
                           initial={{ scale: 0 }} animate={{ scale: 1 }}
                           transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        >
                          <XCircle size={80} className="text-red-400 mb-6 drop-shadow-[0_0_15px_rgba(252,165,165,0.5)]" />
                          <h3 className="text-3xl font-bold text-white mb-2 tracking-tight">{t('Error de Envío', 'Submission Error')}</h3>
                          <p className="text-red-200">{t('Hubo un problema. Intente de nuevo o llame al (713) 701-1731.', 'There was an issue. Please try again or call (713) 701-1731.')}</p>
                        </motion.div>
                      )}
                  </motion.div>
                )}
              </AnimatePresence>
            <form onSubmit={handleSubmit} className="space-y-8">
                
                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div variants={itemVar}>
                        <label className="block text-xs font-bold text-cyan-100/70 uppercase tracking-widest mb-3 ml-1">{t('Identidad', 'Identity')}</label>
                        <div className="space-y-5">
                            <NeonInput icon={User} name="firstName" placeholder={t('Nombre', 'First Name')} value={formData.firstName} onChange={handleChange} required autoFocus />
                            <NeonInput icon={User} name="lastName" placeholder={t('Apellido', 'Last Name')} value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVar}>
                        <label className="block text-xs font-bold text-cyan-100/70 uppercase tracking-widest mb-3 ml-1">{t('Contacto', 'Contact')}</label>
                        <div className="space-y-5">
                            <NeonInput icon={Phone} name="phone" type="tel" placeholder={t('Teléfono', 'Phone Number')} value={formData.phone} onChange={handleChange} required />
                            <NeonInput icon={Mail} name="email" type="email" placeholder={t('Correo', 'Email Address')} value={formData.email} onChange={handleChange} required />
                        </div>
                    </motion.div>
                </div>

                {/* --- ZONA DE CONSENTIMIENTOS --- */}
                <div className="space-y-4">
                    
                    {/* 1. CHECKBOX OBLIGATORIO (Términos y Privacidad) */}
                    <motion.div variants={itemVar} className="flex items-start gap-4 p-5 rounded-xl bg-[#000814]/50 border border-white/10 hover:border-white/20 transition-colors group">
                        <div className="relative flex items-center pt-1">
                            <input
                                type="checkbox"
                                id="acceptedTerms"
                                name="acceptedTerms"
                                checked={formData.acceptedTerms}
                                onChange={handleChange}
                                className="peer h-6 w-6 cursor-pointer appearance-none rounded border-2 border-slate-500 bg-transparent transition-all checked:border-[#B2904D] checked:bg-[#B2904D] hover:border-slate-400"
                            />
                            <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-[#001540] opacity-0 transition-opacity peer-checked:opacity-100">
                                <CheckCircle2 size={16} strokeWidth={3} />
                            </div>
                        </div>
                        <label htmlFor="acceptedTerms" className="text-sm text-blue-100 leading-relaxed cursor-pointer select-none group-hover:text-white transition-colors">
                            {t(
                                'Acepto los',
                                'I accept the'
                            )}{' '}
                            <a href={`/${lang}/sms-terminos`} className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">
                                {t('Términos de Servicio', 'Terms of Service')}
                            </a>{' '}
                            {t('y he leído la', 'and have read the')}{' '}
                            <a href={`/${lang}/privacidad`} className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">
                                {t('Política de Privacidad', 'Privacy Statement')}
                            </a>.
                        </label>
                    </motion.div>

                    {/* 2. CHECKBOX OPCIONAL (SMS/Marketing) */}
                    <motion.div variants={itemVar} className="flex items-start gap-4 p-4 rounded-xl bg-[#000814]/30 border border-white/5 hover:border-white/10 transition-colors group">
                        <div className="relative flex items-center pt-1">
                            <input
                                type="checkbox"
                                id="marketingConsent"
                                name="marketingConsent"
                                checked={formData.marketingConsent}
                                onChange={handleChange}
                                className="peer h-5 w-5 cursor-pointer appearance-none rounded border-2 border-slate-600 bg-transparent transition-all checked:border-[#B2904D] checked:bg-[#B2904D] hover:border-slate-500"
                            />
                            <div className="pointer-events-none absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-[#001540] opacity-0 transition-opacity peer-checked:opacity-100">
                                <CheckCircle2 size={14} strokeWidth={3} />
                            </div>
                        </div>
                        <label htmlFor="marketingConsent" className="text-xs text-blue-200/80 leading-relaxed cursor-pointer select-none group-hover:text-blue-100 transition-colors">
                            {t(
                                'Me gustaría recibir actualizaciones del Law Office of Manuel Solís al número de teléfono proporcionado. Pueden aplicar tarifas de mensajes y datos. Responda STOP para cancelar, HELP para ayuda.',
                                'I would like to receive updates from the Law Office of Manuel Solís at the phone number provided. Message and data rates may apply. Reply STOP to cancel, HELP for help.'
                            )}{' '}
                            <a href={`/${lang}/sms-terminos`} className="text-[#B2904D] hover:text-white transition-colors font-bold underline decoration-dotted">
                                {t('Términos de Servicio SMS', 'Law Office of Manuel Solís SMS Terms of Service')}
                            </a>
                        </label>
                    </motion.div>

                </div>

                <motion.div variants={itemVar} className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting || !formData.acceptedTerms}
                        className={`
                            group relative w-full h-16 overflow-hidden rounded-xl font-bold tracking-widest uppercase text-base transition-all shadow-xl
                            ${!formData.acceptedTerms 
                                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5' 
                                : 'bg-[#B2904D] text-[#001026] hover:bg-[#cbb06d] shadow-[#B2904D]/20 hover:shadow-[#B2904D]/40 cursor-pointer transform hover:-translate-y-1'
                            }
                        `}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">
                                    <Zap className="animate-spin text-[#001026]" size={20} /> {t('Procesando...', 'Processing...')}
                                </span>
                            ) : (
                                <>
                                    <ShieldCheck size={22} className={!formData.acceptedTerms ? "text-slate-500" : "text-[#001026]"} />
                                    {t('Registrarse', 'Register')}
                                </>
                            )}
                        </span>
                        
                        {!isSubmitting && formData.acceptedTerms && (
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                        )}
                    </button>
                </motion.div>
            </form>
        </motion.div>
    );
}

// Componente principal de la página
export default function JoinInPage() {
    const { language } = useLanguage();
    const lang = language as 'es' | 'en';
    
    // El estado del formulario se maneja aquí con los dos checkboxes
    const [formData, setFormData] = useState({ 
        firstName: '', 
        lastName: '', 
        phone: '', 
        email: '', 
        acceptedTerms: false,  // OBLIGATORIO
        marketingConsent: false // OPCIONAL
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const t = (es: string, en: string) => (lang === 'es' ? es : en);

    // ÚNICA FUNCIÓN DE ENVÍO DE DATOS A LA API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.acceptedTerms || isSubmitting) return;

        setIsSubmitting(true);
        setSubmitStatus('idle'); 

        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phone.replace(/[^0-9]/g, ''), 
            acceptedTerms: formData.acceptedTerms, 
            receiveUpdates: formData.marketingConsent, 
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                
                // 2. TRACKING DEL EVENTO PERSONALIZADO "Join In Clicks"
                track('Join In Clicks', {
                    location: 'join_in_page',
                    language: lang,
                    timestamp: new Date().toISOString()
                });

                setSubmitStatus('success');
                setFormData({ 
                    firstName: '', 
                    lastName: '', 
                    phone: '', 
                    email: '', 
                    acceptedTerms: false, 
                    marketingConsent: false 
                });
            } else {
                console.error('API Proxy Error:', response.status);
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Network or Proxy Fetch Error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus('idle'), 4000); 
        }
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    return (
        <main className={`relative min-h-screen w-full bg-[#001540] text-white overflow-x-hidden ${font.className}`}>
            <Header />

            <div className="fixed inset-0 z-0 pointer-events-none w-full h-full transform-gpu">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#002868] via-[#001540] to-[#000a20]" />
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)', backgroundRepeat: 'repeat' }}></div>
            </div>

            {/* --- SECCIÓN PRINCIPAL: DOS COLUMNAS --- */}
            <section className="relative pt-54 pb-20 z-10 px-6 lg:px-12">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-12 gap-10 items-center">
                        
                        {/* --- COLUMNA IZQUIERDA: INFORMACIÓN --- */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-5 relative space-y-8"
                        >
                            <h1 className="text-4xl md:text-5xl font-thin text-white tracking-tight leading-tight">
                                {t('Únete a la Lucha', 'Join the Fight')}{' '}
                                <span className="font-medium text-[#B2904D] drop-shadow-2xl">
                                    {t('Legal', 'Legal')}
                                </span>
                            </h1>

                            <p className="text-lg text-white/70 font-light leading-relaxed pl-4 border-l-2 border-white/10">
                                {t(
                                    'Manténgase informado sobre actualizaciones e información importantes.',
                                    'Stay informed about important updates and information.'
                                )}
                            </p>

                            <div className="space-y-3 text-blue-200/80">
                                <p>• {t('Actualizaciones del estado de su caso', 'Case status updates')}</p>
                                <p>• {t('Recordatorios de citas', 'Appointment reminders')}</p>
                                <p>• {t('Anuncios de la oficina', 'Office announcements')}</p>
                            </div>
                        </motion.div>

                        {/* --- COLUMNA DERECHA: FORMULARIO --- */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-7"
                        >
                            {/* Optimización: Menos blur, más opacidad */}
                            <div className="p-6 md:p-10 bg-[#001026]/95 backdrop-blur-md rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-white/10">
                                
                                <FormContent 
                                    formData={formData} 
                                    isSubmitting={isSubmitting} 
                                    submitStatus={submitStatus} 
                                    handleSubmit={handleSubmit} 
                                    handleChange={handleChange} 
                                    t={t}
                                    lang={lang}
                                />
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}