import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "./providers";
import BackgroundTheme from "@/components/BackgroundTheme";
import { LocaleInit } from "@/components/LocaleInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Santana's Portfolio",
  description: "This is the Development's Portfolio of Santana D. Darlin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <LocaleInit />
        <Providers>   
<BackgroundTheme />
        <Navbar />
        <main>
        {children}
        </main>
        <Footer />
        </Providers>
        </body>
    </html>
  );
}
