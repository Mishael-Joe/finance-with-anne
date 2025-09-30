import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Finance with Anne",
  description:
    "Learn how Finance with Anne collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
  keywords:
    "privacy policy, data protection, personal information, Finance with Anne",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your personal information.
          </p>
          <p className="text-white/80 mt-4">
            <strong>Last Updated:</strong> August 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto px-4 md:px-6 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="">
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Introduction
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Finance with Anne ("we," "our," or "us") is committed to
                protecting your privacy. This Privacy Policy explains how we
                collect, use, disclose, and safeguard your information when you
                visit our website, use our services, or purchase our products.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our website and services, you consent to the data
                practices described in this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Information We Collect
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Personal Information
                  </h3>
                  <p className="text-gray-700 mb-3">
                    We may collect personal information that you provide
                    directly to us, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>
                      Name and contact information (email address, phone number)
                    </li>
                    <li>
                      Payment information (processed securely through
                      third-party payment processors)
                    </li>
                    <li>Account credentials (username, password)</li>
                    <li>Communication preferences</li>
                    <li>
                      Any information you provide when contacting us for support
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Automatically Collected Information
                  </h3>
                  <p className="text-gray-700 mb-3">
                    When you visit our website, we may automatically collect:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>IP address and location information</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent on our site</li>
                    <li>Referring website information</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  How We Use Your Information
                </h2>
              </div>

              <p className="text-gray-700 mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>To provide and maintain our services</li>
                <li>To process transactions and send purchase confirmations</li>
                <li>
                  To communicate with you about our services, updates, and
                  promotions
                </li>
                <li>To provide customer support and respond to inquiries</li>
                <li>To improve our website and services</li>
                <li>To personalize your experience</li>
                <li>To comply with legal obligations</li>
                <li>To protect against fraud and unauthorized access</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Information Sharing and Disclosure
                </h2>
              </div>

              <p className="text-gray-700 mb-4">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Service Providers:</strong> With trusted third-party
                  service providers who assist us in operating our website and
                  services (e.g., payment processors, email service providers)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or
                  to protect our rights, property, or safety
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, acquisition, or sale of assets
                </li>
                <li>
                  <strong>Consent:</strong> With your explicit consent for
                  specific purposes
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Data Security
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security
                measures to protect your personal information against
                unauthorized access, alteration, disclosure, or destruction.
                These measures include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>SSL encryption for data transmission</li>
                <li>Secure payment processing through trusted providers</li>
                <li>Regular security assessments and updates</li>
                <li>
                  Limited access to personal information on a need-to-know basis
                </li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your
                browsing experience, analyze website traffic, and personalize
                content. You can control cookie settings through your browser
                preferences.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Types of cookies we use include essential cookies for website
                functionality, analytics cookies to understand user behavior,
                and preference cookies to remember your settings.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Rights and Choices
              </h2>
              <p className="text-gray-700 mb-4">
                You have the following rights regarding your personal
                information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>
                  <strong>Access:</strong> Request access to your personal
                  information
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  information
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  information
                </li>
                <li>
                  <strong>Portability:</strong> Request a copy of your data in a
                  portable format
                </li>
                <li>
                  <strong>Opt-out:</strong> Unsubscribe from marketing
                  communications
                </li>
                <li>
                  <strong>Restriction:</strong> Request restriction of
                  processing in certain circumstances
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, please contact us using the
                information provided below.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Third-Party Links
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                external sites. We encourage you to review the privacy policies
                of any third-party websites you visit.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Children's Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for children under 13 years of
                age. We do not knowingly collect personal information from
                children under 13. If we become aware that we have collected
                personal information from a child under 13, we will take steps
                to delete such information.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. We will
                notify you of any material changes by posting the new Privacy
                Policy on this page and updating the "Last Updated" date. Your
                continued use of our services after any changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Email:</strong> contact@financewithanne.com
                  </p>
                  <p>
                    <strong>Website:</strong>{" "}
                    <Link
                      href="/contact"
                      className="text-primary hover:underline"
                    >
                      Contact Form
                    </Link>
                  </p>
                  <p>
                    <strong>Response Time:</strong> We aim to respond to all
                    privacy-related inquiries within 48 hours.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
