"use client";

import type React from "react";
import Header from "@/components/layout/header";
import AdminHeader from "@/components/layout/admin-header";
import Footer from "@/components/layout/footer";
import { AuthProvider } from "@/components/providers";
import { usePathname } from "next/navigation";

import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";

import { Toaster } from "@/components/ui/sonner";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 
          Wrap the entire application with AuthProvider to enable authentication
          throughout the app using the useSession() hook
        */}
      <AuthProvider>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {/* 
          Main layout wrapper with header and footer
          The min-h-screen and flex/flex-col ensure the footer stays at the bottom
        */}
        <div className="min-h-screen flex flex-col">
          <HeaderSelector />
          <main className="grow">{children}</main>
          <Toaster />
          <Footer />
        </div>
      </AuthProvider>
    </>
  );
}

// Client component to select the appropriate header based on the URL path
function HeaderSelector() {
  return (
    <>
      {/* 
        This component is rendered on the server, but the actual header selection
        happens in the client components below based on the URL path
      */}
      <ClientMainHeader />
      <ClientAdminHeader />
    </>
  );
}

// Client component that conditionally renders the main header
function ClientMainHeader() {
  const pathname = usePathname();
  // Only render the main header if we're not on an admin page
  if (pathname?.startsWith("/admin")) return null;
  return <Header />;
}

// Client component that conditionally renders the admin header
function ClientAdminHeader() {
  const pathname = usePathname();
  // Only render the admin header if we're on an admin page
  if (!pathname?.startsWith("/admin")) return null;
  return <AdminHeader />;
}
