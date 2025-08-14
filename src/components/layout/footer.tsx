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
    <footer className="bg-muted border-t">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand and Tagline */}
          <div>
            <Link
              href="/"
              className="flex items-center space-x-2 mb-4 text-inherit hover:text-primary transition-colors"
            >
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
                href="https://www.instagram.com/financewithanne?igsh=MTUzcWY0MWE2YnhsdQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E4405F] p-2 rounded-full text-white hover:opacity-90 transition-colors"
              >
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/share/18nwuqrJ36/?mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#1877F2] p-2 rounded-full text-white hover:opacity-90 transition-colors"
              >
                <FiFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://x.com/financewithanne?s=21&t=Hzd4iPIbzdXj9WMW-swU_A"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-2 rounded-full text-white hover:opacity-90 transition-colors"
              >
                <FaXTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter Now X</span>
              </a>
              <a
                href="https://youtube.com/@financewithanne?si=5zX3b99rfYKi8RQM"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FF0000] p-2 rounded-full text-white hover:opacity-90 transition-colors"
              >
                <FiYoutube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href="https://www.tiktok.com/@financewithanne?_t=ZM-8vzFmbQoZtt&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-2 rounded-full text-white hover:opacity-90 transition-colors"
              >
                <RiTiktokLine className="h-5 w-5" />
                <span className="sr-only">Tiktok</span>
              </a>
            </div>
            {/* <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/financewithanne?igsh=MTUzcWY0MWE2YnhsdQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/share/18nwuqrJ36/?mibextid=LQQJ4d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FiFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://x.com/financewithanne?s=21&t=Hzd4iPIbzdXj9WMW-swU_A"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaXTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter Now X</span>
              </a>
              <a
                href="https://youtube.com/@financewithanne?si=5zX3b99rfYKi8RQM"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FiYoutube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
              <a
                href="https://www.tiktok.com/@financewithanne?_t=ZM-8vzFmbQoZtt&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <RiTiktokLine className="h-5 w-5" />
                <span className="sr-only">Tiktok</span>
              </a>
            </div> */}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">
              Quick Links
            </h3>
            <ul className="space-y-2">
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
                  Real Money Talk
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Products and Services
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/courses"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Courses
                </Link>
              </li> */}
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
                  Contact Anne
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">
              Resources
            </h3>
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
                  href="/tools/investment-calculator"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Investment Calculator
                </Link>
              </li>
              {/* 
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
              </li> */}
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
            <h3 className="font-semibold text-lg mb-4 text-primary">Contact</h3>
            <address className="not-italic text-muted-foreground space-y-2">
              {/* <p>123 Financial Street</p>
              <p>Suite 456</p>
              <p>Nigeria</p>
              <p>(+234) 123-4567</p> */}
              <a
                href={`mailto:${anneContactEmail}`}
                className="hover:text-primary hover:underline text-inherit"
              >
                {anneContactEmail}
              </a>
            </address>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-center items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} Finance with Anne. All rights reserved.
          </p>
          {/* <div className="flex space-x-6">
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
          </div> */}
        </div>
      </div>
    </footer>
  );
}
