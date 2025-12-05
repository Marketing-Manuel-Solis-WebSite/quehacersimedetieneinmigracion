import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer'; 
import Office from '../../components/Office'; 

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