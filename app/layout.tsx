import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "font-awesome/css/font-awesome.css";
import { siteUrl } from "./site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Bright Academy | Tuition Center Tiruvannamalai",
  description: "Bright Academy offers concept-based tuition, Abacus classes, and focused academic support in Tiruvannamalai.",
  icons: {
    icon: "/brightacademylogo.jpg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="gtm-data-layer" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-MSJKTXWQ"
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
