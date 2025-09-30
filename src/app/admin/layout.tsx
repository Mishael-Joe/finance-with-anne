import type React from "react";
import Footer from "@/components/layout/footer";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "../api/uploadthing/core";
import { Toaster } from "@/components/ui/sonner";
import AdminHeader from "@/components/layout/admin-header";
import { getAdminFromCookie } from "@/lib/helpers/get-admin-from-cookies";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminFromCookie();
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <AdminHeader user={user?.name} />
        <main className="grow">{children}</main>
      </div>
    </>
  );
}
