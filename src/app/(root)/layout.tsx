import type React from "react";
import Header from "@/components/layout/header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="grow">{children}</main>
      </div>
    </>
  );
}
