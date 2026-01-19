import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Asegúrate de que la ruta de importación sea correcta según tu estructura
import { LanguageProvider } from "./context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Manuel Solis",
  description: "Aplicación Manuel Solis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Al estar en la raíz (app/layout.tsx), no recibimos 'params.lang' automáticamente.
  // Definimos un idioma por defecto para satisfacer el tipo requerido por LanguageProvider.
  const defaultLanguage = "es"; // Puedes cambiar esto a "en" si prefieres inglés por defecto

  return (
    <html lang={defaultLanguage}>
      <body className={inter.className}>
        {/* CORRECCIÓN: Agregamos la propiedad 'initialLanguage' que faltaba.
          Esto soluciona el error: Property 'initialLanguage' is missing...
        */}
        <LanguageProvider initialLanguage={defaultLanguage}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}