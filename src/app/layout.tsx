import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BackgroundProvider } from "../components/site/background-context";
import { SiteBackground } from "../components/site/site-background";
import { BackgroundToggle } from "../components/site/background-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Dev System — Le systeme de livraison gouverne",
  description:
    "Gouverne, prouve et automatise n'importe quel executeur IA. Reprise exacte, attestation cryptographique, gouvernance predictive et strictesse imposee — par construction.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <BackgroundProvider>
          <SiteBackground />
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            {children}
          </div>
          <BackgroundToggle />
        </BackgroundProvider>
      </body>
    </html>
  );
}
