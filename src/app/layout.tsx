import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutClient } from "./layout-client";
import Script from "next/script"; // ✅ Import next/script
import { AuthProvider } from "@/components/providers";

// Initialize the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Finance with Anne | Personal Finance Education",
  description:
    "Learn personal finance, budgeting, saving, and investing strategies with Anne, a certified financial educator.",
  keywords:
    "personal finance, budgeting, saving, investing, financial education",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-288SLP3B4Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-288SLP3B4Y');
          `}
        </Script>
      </head>
      <body className={`scroll-smooth ${inter.className}`}>
        {/* 
          Wrap the entire application with AuthProvider to enable authentication
          throughout the app using the useSession() hook
        */}
        <AuthProvider>
          <LayoutClient>{children}</LayoutClient>
        </AuthProvider>
      </body>
    </html>
  );
}
