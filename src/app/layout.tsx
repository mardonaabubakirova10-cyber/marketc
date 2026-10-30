import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Playfair_Display } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ÉLIXIR BEAUTÉ — Haute Parfumerie & Cosmétiques",
  description: "Коллекция современной селективной косметики и уходовых формул.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${playfair.variable} h-full scroll-smooth`}
    >
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans selection:bg-[#E8C7C7] selection:text-neutral-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
