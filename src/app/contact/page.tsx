import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { FiYoutube, FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiTiktokLine } from "react-icons/ri";
import ContactForm from "@/components/contact-form";
import { anneContactEmail, annePartnershipEmail } from "@/config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Contact | Finance with Anne",
  description:
    "Get in touch with Anne for financial coaching, speaking engagements, or media inquiries.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Contact Header */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Get in Touch
        </h1>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            Have questions or want to work together? I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <ContactForm />
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="bg-muted p-8 rounded-lg">
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">{anneContactEmail}</p>
                  </div>
                </div>
                {/* <div className="flex items-start">
                  <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-muted-foreground">(+234) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-muted-foreground">
                      123 Financial Street
                      <br />
                      Suite 456
                      <br />
                      Nigeria
                    </p>
                  </div>
                </div> */}
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Connect with Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/financewithanne?igsh=MTUzcWY0MWE2YnhsdQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#E4405F] p-3 rounded-full text-white hover:opacity-90 transition"
                  >
                    <FaInstagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>

                  <a
                    href="https://www.facebook.com/share/18nwuqrJ36/?mibextid=LQQJ4d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1877F2] p-3 rounded-full text-white hover:opacity-90 transition"
                  >
                    <FiFacebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>

                  <a
                    href="https://x.com/financewithanne?s=21&t=Hzd4iPIbzdXj9WMW-swU_A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black p-3 rounded-full text-white hover:opacity-90 transition"
                  >
                    <FaXTwitter className="h-5 w-5" />
                    <span className="sr-only">X (Twitter)</span>
                  </a>

                  <a
                    href="https://youtube.com/@financewithanne?si=5zX3b99rfYKi8RQM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#FF0000] p-3 rounded-full text-white hover:opacity-90 transition"
                  >
                    <FiYoutube className="h-5 w-5" />
                    <span className="sr-only">YouTube</span>
                  </a>

                  <a
                    href="https://www.tiktok.com/@financewithanne?_t=ZM-8vzFmbQoZtt&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black p-3 rounded-full text-white hover:opacity-90 transition"
                  >
                    <RiTiktokLine className="h-5 w-5" />
                    <span className="sr-only">TikTok</span>
                  </a>
                </div>

                {/* <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/financewithanne?igsh=MTUzcWY0MWE2YnhsdQ%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <FaInstagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="https://www.facebook.com/share/18nwuqrJ36/?mibextid=LQQJ4d"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <FiFacebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="https://x.com/financewithanne?s=21&t=Hzd4iPIbzdXj9WMW-swU_A"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <FaXTwitter className="h-5 w-5" />
                    <span className="sr-only">Twitter Now X</span>
                  </a>
                  <a
                    href="https://youtube.com/@financewithanne?si=5zX3b99rfYKi8RQM"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <FiYoutube className="h-5 w-5" />
                    <span className="sr-only">YouTube</span>
                  </a>
                  <a
                    href="https://www.tiktok.com/@financewithanne?_t=ZM-8vzFmbQoZtt&_r=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <RiTiktokLine className="h-5 w-5" />
                    <span className="sr-only">Tiktok</span>
                  </a>
                </div> */}
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg">
                    Do you offer one-on-one coaching?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, I offer personalized financial coaching sessions.{" "}
                    <a
                      href="https://selar.com/1b8204"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-primary/80 transition-colors"
                    >
                      Book a Session.
                    </a>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg">
                    Are you available for speaking engagements?
                  </AccordionTrigger>
                  <AccordionContent>
                    I am available to speak at conferences, workshops and
                    corporate events on personal finance topics. Please reach
                    out with details about your event via{" "}
                    <a
                      href={`mailto:${annePartnershipEmail}`}
                      className="text-blue-600 underline"
                    >
                      {annePartnershipEmail}
                    </a>
                    .
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg">
                    How quickly can I expect a response?
                  </AccordionTrigger>
                  <AccordionContent>
                    I typically respond to all inquiries within 1–2 business
                    days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
