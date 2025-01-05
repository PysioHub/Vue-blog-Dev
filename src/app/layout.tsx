import { Navbar } from '@/components/Navbar';
import type { Metadata } from 'next';
import './globals.css';

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
    <html lang="zh">
      <body className="font-sans text-base">
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
