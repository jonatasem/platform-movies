import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Updated import for GeistSans
import { GeistMono } from 'geist/font/mono'; // Updated import for GeistMono
import '../styles/globals.css';

// Configuração das fontes Geist.
const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: 'CineFlix - Seu Catálogo de Filmes',
  description: 'Descubra e gerencie seus filmes favoritos com CineFlix.',
};

/**
 * @component RootLayout
 * Layout raiz da aplicação Next.js, aplicando fontes e estilos globais.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}