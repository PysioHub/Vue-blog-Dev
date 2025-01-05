import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Pysio's Blog",
  description: '一个温暖的家',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={inter.className}>
      <body>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-grow animate-fade-in">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
