'use client'

import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

export default function ContactForm() {
  const { language } = useLanguage();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    message: '',
    consent: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Aquí implementarías el envío real del formulario
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        message: '',
        consent: false,
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  return (
    <section id="contacto" className="py-20 bg-[#B2904D]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {language === 'es' ? 'SOLICITE SU' : 'REQUEST YOUR'}{' '}
              <span className="text-black">{language === 'es' ? 'CONSULTA' : 'CONSULTATION'}</span>
            </h2>
            <p className="text-lg text-white">
              {language === 'es'
                ? 'Llene este formulario y le llamaremos en unos 10 minutos en horas de trabajo. También puede llamarnos y estaremos encantados de contestar sus preguntas.'
                : 'Fill out this form and we will call you within 10 minutes during business hours. You can also call us and we will be happy to answer your questions.'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-2xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-lg font-medium mb-2">
                  {language === 'es' ? 'Nombre' : 'First Name'} *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B2904D] 
                    focus:outline-none transition-colors"
                  placeholder={language === 'es' ? 'Nombre' : 'First Name'}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-lg font-medium mb-2">
                  {language === 'es' ? 'Apellido' : 'Last Name'} *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B2904D] 
                    focus:outline-none transition-colors"
                  placeholder={language === 'es' ? 'Apellido' : 'Last Name'}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-lg font-medium mb-2">
                  {language === 'es' ? 'Número de Teléfono' : 'Phone Number'} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B2904D] 
                    focus:outline-none transition-colors"
                  placeholder={language === 'es' ? 'Número de Teléfono' : 'Phone Number'}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium mb-2">
                  {language === 'es' ? 'Correo Electrónico' : 'Email'} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B2904D] 
                    focus:outline-none transition-colors"
                  placeholder={language === 'es' ? 'Correo Electrónico' : 'Email'}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-medium mb-2">
                {language === 'es' 
                  ? '¿Cómo te podemos Ayudar? Danos detalles de tu caso.' 
                  : 'How can we help you? Give us details of your case.'
                } *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#B2904D] 
                  focus:outline-none transition-colors resize-none"
                placeholder={language === 'es' ? 'Danos Detalles de Tu Caso' : 'Give Us Details of Your Case'}
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                className="mt-1 w-5 h-5 text-[#B2904D] focus:ring-[#B2904D] border-gray-300 rounded"
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                {language === 'es'
                  ? 'Acepto recibir mensajes de texto de marketing y otros mensajes del Law Office of Manuel Solis al número proporcionado. Pueden aplicarse tarifas de mensajes y datos. El consentimiento no es una condición para recibir servicios. Para más información, por favor revise nuestra'
                  : 'I agree to receive marketing text messages and other messages from the Law Office of Manuel Solis at the number provided. Message and data rates may apply. Consent is not a condition for receiving services. For more information, please review our'
                }{' '}
                <a href={`/${language}/politica-de-privacidad`} className="text-[#B2904D] hover:underline">
                  {language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
                </a>
                .
              </label>
            </div>

            {submitStatus === 'success' && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {language === 'es'
                  ? '¡Gracias! Hemos recibido su mensaje y nos pondremos en contacto pronto.'
                  : 'Thank you! We have received your message and will contact you soon.'
                }
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {language === 'es'
                  ? 'Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.'
                  : 'There was an error submitting the form. Please try again.'
                }
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#B2904D] text-white py-4 px-8 rounded-lg font-semibold text-lg 
                hover:bg-[#9a7a3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting 
                ? (language === 'es' ? 'Enviando...' : 'Sending...') 
                : (language === 'es' ? 'Enviar' : 'Send')
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}