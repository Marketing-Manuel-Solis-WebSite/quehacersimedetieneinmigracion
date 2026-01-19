import dynamic from 'next/dynamic';
import Hero from '../components/Hero';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = dynamic(() => import('../components/About'));
const Services = dynamic(() => import('../components/Services'));
const Testimonials = dynamic(() => import('../components/Testimonials'));
const Team = dynamic(() => import('../components/Team'));

const Offices = dynamic(() => import('../components/Offices'), { 
  loading: () => <div className="w-full h-[800px] bg-[#001540] animate-pulse" />
});

const ContactForm = dynamic(() => import('../components/ContactForm'));

export default function Home() {
  return (
    <main className="min-h-screen bg-[#001540]">
      {/* Carga prioritaria (LCP) - Estos se renderizan de inmediato */}
      <Hero />
      <Header />
      
      {/* Carga diferida - Se hidratan progresivamente */}
      <About />
      <Services />
      <Testimonials />
      <Team />
      <Offices />
      <ContactForm />
      <Footer />
    </main>
  );
}