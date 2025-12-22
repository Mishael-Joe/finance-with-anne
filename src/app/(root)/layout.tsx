import type React from "react";
import Header from "@/components/layout/header";
import Script from "next/script";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6624995030020038"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Google Analytics (NEW TAG) */}
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-NDZ72WCQ41"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-NDZ72WCQ41');
    `}
      </Script>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="grow">{children}</main>
      </div>
    </>
  );
}
