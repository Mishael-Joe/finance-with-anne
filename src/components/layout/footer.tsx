import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";

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
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Tagline */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                A
              </span>
              <span className="font-semibold text-xl">Finance with Anne</span>
            </Link>
            <p className="text-muted-foreground mb-4">
              Empowering you to take control of your financial future through
              education and practical strategies.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Anne
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Budget Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Financial Calculators
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Debt Payoff Worksheets
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Investment Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Latest Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              <p>123 Financial Street</p>
              <p>Suite 456</p>
              <p>Nigeria</p>
              <p className="mt-4">hello@financewithanne.com</p>
              <p>(+234) 123-4567</p>
            </address>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} Finance with Anne. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
