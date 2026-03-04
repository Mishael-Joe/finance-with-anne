"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Money Talk" },
    { href: "/resources", label: "Resources" },
    { href: "/products", label: "Products & Services" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) =>
    path !== "/" ? pathname.startsWith(path) : pathname === "/";

  return (
    <header className="sticky top-0 z-50 bg-white lg:bg-background/10 lg:backdrop-blur-xl border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 font-semibold text-lg"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white text-sm font-bold">
              FA
            </span>
            <span className="text-primary">Finance With Anne</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-primary hover:text-primary/80"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute -bottom-2 left-0 h-[2px] w-full bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button href="/blog" size="sm" variant="premium">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden rounded-lg p-2 hover:bg-muted transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <aside
        style={{ backgroundColor: "#ffffff", opacity: 1 }}
        className={`lg:hidden fixed top-0 right-0 z-[9999] h-full w-[85%] max-w-sm
  shadow-2xl transition-transform duration-300
  ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <span className="font-semibold text-lg text-primary">
                Finance With Anne{" "}
              </span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 hover:bg-muted transition"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-primary"
                    : "text-primary hover:text-primary/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8">
            <Button
              href="/blog"
              className="w-full bg-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      </aside>
    </header>
  );
}
