import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kosibu | Cari Kos Mudah",
  description: "Platform agregator kos multi-wilayah",
};

const tautan = [
  { href: "/", label: "Beranda" },
  { href: "/kos", label: "Katalog" },
  { href: "/tentang", label: "Tentang" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Header dipasang di sini agar muncul di semua halaman */}
        <Header tautan={tautan} namaProduk="Kosibu" />
        
        <div className="grow">
          {children}
        </div>
        
        {/* Footer dipasang di sini agar muncul di semua halaman */}
        <Footer />
      </body>
    </html>
  );
}