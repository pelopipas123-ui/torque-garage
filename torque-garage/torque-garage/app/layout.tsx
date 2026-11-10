import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Torque Garage — Agende sua revisão online",
  description:
    "Oficina mecânica premium em Barueri/SP. Agende sua revisão em 2 minutos, acompanhe pelo WhatsApp e receba laudo digital com fotos.",
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
