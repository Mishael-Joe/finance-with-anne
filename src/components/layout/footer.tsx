import Link from "next/link";
import { anneContactEmail } from "@/config";
import { RiTiktokLine } from "react-icons/ri";
import { FiFacebook, FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

/**
 * Footer component with navigation links, social media, and copyright
 *
 * Features:
 * - Brand name and tagline
 * - Navigation links organized by category
 * - Social media links
 * - Newsletter signup prompt
 * - Copyright and legal links
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A001C] border-t overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-14 animate-fade-in-up">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-4 mb-6 group">
              <span className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl">
                FA
              </span>
              <span className="font-semibold text-2xl tracking-tight text-primary">
                Finance With Anne
              </span>
            </Link>

            <p className="text-white max-w-md leading-relaxed mb-8">
              We provide structured guidance, real-world insights, and
              easy-to-apply frameworks designed to help you manage money better,
              reduce financial stress, and plan for the future.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              {[
                {
                  href: "https://www.instagram.com/financewithanne",
                  icon: <FaInstagram />,
                },
                {
                  href: "https://www.facebook.com/share/18nwuqrJ36",
                  icon: <FiFacebook />,
                },
                { href: "https://x.com/financewithanne", icon: <FaXTwitter /> },
                {
                  href: "https://youtube.com/@financewithanne",
                  icon: <FiYoutube />,
                },
                {
                  href: "https://www.tiktok.com/@financewithanne",
                  icon: <RiTiktokLine />,
                },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 w-11 rounded-md border border-slate-200 flex items-center justify-center text-white
              hover:bg-primary hover:border-primary
              transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Quick Links",
              links: [
                { label: "About Anne", href: "/about" },
                { label: "Real Money Talk", href: "/blog" },
                { label: "Products & Services", href: "/products" },
                { label: "Contact Anne", href: "/contact" },
              ],
            },
            {
              title: "Resources",
              links: [
                { label: "Budget Templates", href: "/resources" },
                {
                  label: "Investment Calculator",
                  href: "/tools/investment-calculator",
                },
                { label: "Latest Articles", href: "/blog" },
                { label: "Testimonials", href: "/testimonials" },
              ],
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-md uppercase tracking-wider text-white mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-white transition-all"
                    >
                      <span className="group-hover:text-primary transition-colors">
                        {link.label}
                      </span>
                      <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-white mb-6">
              Contact
            </h3>
            <address className="not-italic text-white space-y-3">
              <p>
                Federal Capital <br />
                Territory (FCT), <br />
                Abuja,
                <br /> Nigeria.
              </p>
              {/* <p>Plot 698 Broadview Estate</p>
              <p>Idu, Abuja</p>
              <p>Nigeria</p> */}
              <a
                href={`mailto:${anneContactEmail}`}
                className="inline-block text-primary transition-colors"
              >
                {anneContactEmail}
              </a>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Finance with Anne. All rights reserved.
          </p>

          <div className="flex gap-8 text-sm">
            <Link href="/privacy-policy" className="text-primary">
              Privacy Policy
            </Link>
            <Link href="/returns-policy" className="text-primary">
              Return Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
