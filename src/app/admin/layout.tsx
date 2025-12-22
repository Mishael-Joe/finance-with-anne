export const dynamic = "force-dynamic";

import type React from "react";
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
