import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import ContactForm from "@/components/contact-form";

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
                    <p className="text-muted-foreground">
                      hello@financewithanne.com
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
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
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="font-semibold mb-4">Connect with Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    <Youtube className="h-5 w-5" />
                    <span className="sr-only">YouTube</span>
                  </a>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">
                    Do you offer one-on-one coaching?
                  </h3>
                  <p className="text-muted-foreground">
                    Yes, I offer personalized financial coaching sessions.
                    Please contact me for availability and rates.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Are you available for speaking engagements?
                  </h3>
                  <p className="text-muted-foreground">
                    I regularly speak at conferences, workshops, and corporate
                    events on personal finance topics. Please reach out with
                    details about your event.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    How quickly can I expect a response?
                  </h3>
                  <p className="text-muted-foreground">
                    I typically respond to all inquiries within 1-2 business
                    days.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map (Optional) */}
      {/* <section>
        <div className="aspect-21/9 w-full bg-muted rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">Map would be embedded here</p>
          </div>
        </div>
      </section> */}
    </div>
  );
}
