import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Syne } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "ENGC ENCY — Herramientas digitales e inteligencia artificial",
    template: "%s · ENGC ENCY",
  },
  description:
    "ENGC ENCY es un espacio para explorar herramientas digitales de escritura, estudio, programación y productividad. La conexión con modelos de IA se activará en una etapa posterior.",
  keywords: [
    "ENGC ENCY",
    "herramientas digitales",
    "inteligencia artificial",
    "productividad",
    "escritura",
  ],
  openGraph: {
    title: "ENGC ENCY",
    description:
      "Plataforma de herramientas digitales e inteligencia artificial. Catálogo funcional; chatbot en demostración.",
    locale: "es",
    type: "website",
    images: [{ url: "/images/og-cover.jpg", width: 1376, height: 768 }],
  },
  icons: {
    icon: "/images/logo-mark.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className={`${manrope.variable} ${syne.variable}`}>
      <body className="antialiased">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
