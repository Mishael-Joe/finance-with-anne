"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LayoutDashboard, FileText, LogOut, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

/**
 * Admin Header component with responsive navigation
 *
 * Features:
 * - Admin branding
 * - Navigation links to admin sections
 * - Mobile menu with hamburger toggle
 * - Active link highlighting
 * - User info and logout button
 */
export default function AdminHeader({ user }: { user?: string }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/admin/logout");
      if (response.status === 200) {
        router.push("/admin/login");
        router.refresh();
        toast.success("Logged out successfully");
        return;
      }
      toast.error("Logout failed. Please try again.");
    } catch (error) {
      return error;
    }
  };

  // Navigation links configuration
  const navLinks = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    // { href: "/admin/products", label: "Products", icon: ShoppingBag },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    // { href: "/admin/users", label: "Users", icon: Users },
    // { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  // User menu links
  const userLinks = [
    { href: "/admin/change-password", label: "Change Password", icon: Lock },
  ];

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/admin/dashboard" && pathname === "/admin/dashboard")
      return true;
    if (path !== "/admin/dashboard" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary text-white backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo and Brand Name */}
        <Link href="/admin/dashboard" className="flex items-center space-x-2">
          <span className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary font-bold">
            A
          </span>
          <span className="font-semibold text-xl hidden sm:inline-block">
            Admin Panel
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-white/80 flex items-center ${
                  isActive(link.href) ? "text-white" : "text-white/70"
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* User Info and Logout */}
        <div className="hidden md:flex items-center space-x-4">
          {user && (
            <div className="flex items-center">
              <div className="relative group">
                <button className="text-sm flex items-center space-x-1 hover:text-white/80">
                  <span>{user?.split(" ")[0]}</span>
                  {user && <span className="text-white/70">(Admin)</span>}
                </button>

                {/* Dropdown menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                  <div className="py-1">
                    {userLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {link.label}
                        </Link>
                      );
                    })}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <nav className="flex flex-col space-y-4 p-4 bg-primary border-b border-white/10">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white/80 flex items-center ${
                    isActive(link.href) ? "text-white" : "text-white/70"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Link>
              );
            })}

            {/* User links in mobile menu */}
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="text-sm mb-2">
                {user?.split(" ")[0]}{" "}
                {user && <span className="text-white/70">(Admin)</span>}
              </div>

              {userLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium transition-colors hover:text-white/80 flex items-center text-white/70"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {link.label}
                  </Link>
                );
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-white/20 hover:bg-white/10 hover:text-white w-full justify-center"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
