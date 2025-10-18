import type { Metadata } from 'next';
import { Inter, Prata } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Variable CSS para usar en Tailwind/CSS
  display: 'swap', // Mejora el rendimiento de carga de fuentes
});

const prata = Prata({
  subsets: ['latin'],
  weight: '400', // Prata generalmente solo tiene peso 400
  variable: '--font-prata', // Variable CSS
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Million test - Properties',
  description: 'Find your next property',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${prata.variable}`}>
      <body>
        \
        <ThemeProvider>
          <div className="bg-background text-secondary flex min-h-screen flex-col antialiased">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
