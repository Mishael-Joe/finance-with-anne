import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutClient } from "./layout-client";

// Initialize the Inter font with Latin subset
const inter = Inter({ subsets: ["latin"] });

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Finance with Anne | Personal Finance Education",
  description:
    "Learn personal finance, budgeting, saving, and investing strategies with Anne, a certified financial educator.",
  keywords:
    "personal finance, budgeting, saving, investing, financial education",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`scroll-smooth ${inter.className}`}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
