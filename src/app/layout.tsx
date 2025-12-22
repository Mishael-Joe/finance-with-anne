import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import Footer from "@/components/layout/footer";
import { Toaster } from "sonner";
import { siteConfig } from "@/config/site";

// Initialize the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Global Metadata for the application
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.siteTitle,
    template: `%s | ${siteConfig.siteTitle}`,
  },

  description: siteConfig.description,
  keywords: [...siteConfig.keywords],

  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
  ],

  creator: siteConfig.author.name,
  publisher: siteConfig.siteTitle,

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.siteTitle,
    title: siteConfig.siteTitle,
    description: siteConfig.description,
    images: [
      {
        url: "/og-finance-with-anne.png",
        width: 1200,
        height: 630,
        alt: siteConfig.siteTitle,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.siteTitle,
    description: siteConfig.description,
    images: ["/og-finance-with-anne.png"],
    // creator: siteConfig.social.twitter,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`scroll-smooth ${inter.className}`}>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
