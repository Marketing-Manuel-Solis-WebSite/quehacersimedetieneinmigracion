import React from 'react';
import Header from '../../components/Header'; // Ajusta la ruta según tu estructura
import Footer from '../../components/Footer'; // Ajusta la ruta según tu estructura
import Office from '../../components/Office'; // Importamos el componente nuevo

export default function OficinasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <Header />

      <main className="flex-grow pt-32">
        <Office />
      </main>

      <Footer />
    </div>
  );
}