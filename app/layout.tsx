import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Como Puedo Arreglar',
  description: 'Oficinas Legales de Manuel Solis',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children; // Solo pasa los children, el html/body viene del [lang]/layout
}