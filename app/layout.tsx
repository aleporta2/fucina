import type { Metadata, Viewport } from "next";
//import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Fucina — Generatori offline",
  description:
    "Password, QR code, UUID e hash generati sul tuo dispositivo. Nessun dato lascia il browser, funziona anche offline.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#6C5CE7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={``}>
      <body>
        <ServiceWorkerRegister />
        <div className="mx-auto flex min-h-screen max-w-4xl flex-col px-5 py-8 sm:px-8">
          <header className="mb-10 flex items-center justify-between">
            <a href="/" className="font-display text-xl font-bold tracking-tight">
              Fucina
            </a>
            <ThemeToggle />
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-16 border-t border-muted/20 pt-6 text-sm text-muted">
            Tutto gira nel tuo browser. Nessun dato inviato a nessun server.
          </footer>
        </div>
      </body>
    </html>
  );
}
