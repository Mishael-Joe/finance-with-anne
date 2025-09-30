import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy | Finance with Anne",
  description:
    "Learn about our returns and refunds policy for digital products. Clear guidelines on eligibility, process, and timelines.",
  keywords: "returns policy, refunds, digital products, Finance with Anne",
};

export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Returns & Refunds Policy
            </h1>
          </div>
          <p className="text-xl text-white/90 max-w-2xl">
            Clear guidelines on our returns and refunds policy for all Finance
            with Anne products and services.
          </p>
          <p className="text-white/80 mt-4">
            <strong>Last Updated:</strong> August 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 md:p-12">
            {/* Introduction */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Our Commitment to You
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Finance with Anne, we stand behind the quality of our digital
                products and services. We want you to be completely satisfied
                with your purchase. This Returns & Refunds Policy outlines the
                terms and conditions for returns and refunds.
              </p>
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                <p className="text-gray-700 font-medium">
                  <strong>Important:</strong> Due to the digital nature of our
                  products, all sales are generally final. However, we offer
                  refunds in specific circumstances outlined below.
                </p>
              </div>
            </section>

            {/* Digital Products Policy */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Digital Products Refund Policy
                </h2>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-800 mb-3 flex items-center">
                    7-Day Money-Back Guarantee
                  </h3>
                  <p className="text-green-700 mb-3">
                    We offer a 7-day money-back guarantee for all our digital
                    products, including:
                  </p>
                  <ul className="list-disc list-inside text-green-700 space-y-1 ml-4">
                    <li>Complete Money Tracker spreadsheets</li>
                    <li>Budget planning templates</li>
                    <li>Investment calculators</li>
                    <li>Financial planning guides</li>
                    <li>Online courses and workshops</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Refund Eligibility Criteria
                  </h3>
                  <p className="text-gray-700 mb-3">
                    To be eligible for a refund, your request must meet the
                    following conditions:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                    <li>Request submitted within 7 days of purchase</li>
                    <li>
                      Product has a technical issue that prevents normal use
                    </li>
                    <li>
                      Product was significantly different from what was
                      described
                    </li>
                    <li>You experienced unauthorized charges</li>
                    <li>You provide a valid reason for the refund request</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Non-Refundable Items */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Non-Refundable Items
                </h2>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-700 mb-3">
                  The following items are not eligible for refunds:
                </p>
                <ul className="list-disc list-inside text-red-700 space-y-2 ml-4">
                  <li>
                    Products downloaded or accessed after 7 days from purchase
                  </li>
                  <li>Customized or personalized financial plans</li>
                  <li>
                    One-on-one consultation sessions (unless cancelled 24 hours
                    in advance)
                  </li>
                  <li>Products purchased with discount codes over 50% off</li>
                  <li>Requests made without valid justification</li>
                  <li>Products that have been shared or redistributed</li>
                </ul>
              </div>
            </section>

            {/* Refund Process */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                How to Request a Refund
              </h2>

              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                    <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 font-bold text-lg">1</span>
                    </div>
                    <h3 className="font-semibold text-blue-800 mb-2">
                      Contact Us
                    </h3>
                    <p className="text-blue-700 text-sm">
                      Email us with your refund request and order details
                    </p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <div className="bg-yellow-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="text-yellow-600 font-bold text-lg">
                        2
                      </span>
                    </div>
                    <h3 className="font-semibold text-yellow-800 mb-2">
                      Review Process
                    </h3>
                    <p className="text-yellow-700 text-sm">
                      We'll review your request within 2-3 business days
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                      <span className="text-green-600 font-bold text-lg">
                        3
                      </span>
                    </div>
                    <h3 className="font-semibold text-green-800 mb-2">
                      Refund Issued
                    </h3>
                    <p className="text-green-700 text-sm">
                      Approved refunds processed within 5-7 business days
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Required Information for Refund Requests
                  </h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                    <li>Order number or transaction ID</li>
                    <li>Email address used for purchase</li>
                    <li>Date of purchase</li>
                    <li>Reason for refund request</li>
                    <li>Any relevant screenshots or documentation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Processing Times */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Refund Processing Times
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 rounded-lg">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Payment Method
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Processing Time
                      </th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">
                        Credit/Debit Card
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        3-5 business days
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        May take longer depending on your bank
                      </td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">
                        Bank Transfer
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        5-7 business days
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Direct to your bank account
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">
                        Mobile Money
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        1-3 business days
                      </td>
                      <td className="border border-gray-300 px-4 py-3">
                        Fastest refund method
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Exchanges */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Exchanges and Replacements
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Since our products are digital, we don't offer traditional
                exchanges. However, if you experience technical issues with your
                download or access, we will:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide technical support to resolve access issues</li>
                <li>Re-send download links if they've expired</li>
                <li>Offer alternative file formats when available</li>
                <li>Provide updated versions of products when applicable</li>
              </ul>
            </section>

            {/* Consultation Services */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Consultation Services Policy
                </h2>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-800 mb-3">
                  Cancellation Policy
                </h3>
                <ul className="list-disc list-inside text-orange-700 space-y-2 ml-4">
                  <li>
                    <strong>24+ hours notice:</strong> Full refund available
                  </li>
                  <li>
                    <strong>Less than 24 hours:</strong> 50% refund
                    (administrative fee applies)
                  </li>
                  <li>
                    <strong>No-show:</strong> No refund available
                  </li>
                  <li>
                    <strong>Rescheduling:</strong> Free rescheduling with 24+
                    hours notice
                  </li>
                </ul>
              </div>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Dispute Resolution
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you're not satisfied with our refund decision, you can:
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                <li>Request a review by our customer service manager</li>
                <li>Provide additional documentation to support your case</li>
                <li>
                  Contact your payment provider if you believe there was an
                  error
                </li>
                <li>
                  Seek mediation through relevant consumer protection agencies
                </li>
              </ol>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Contact Us for Refunds
                </h2>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  To request a refund or if you have questions about this
                  policy, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p>
                    <strong>Email:</strong> contact@financewithanne.com
                  </p>
                  <p>
                    <strong>Subject Line:</strong> "Refund Request - [Your Order
                    Number]"
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
                    <strong>Response Time:</strong> We respond to all refund
                    requests within 24-48 hours.
                  </p>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-blue-700 text-sm">
                    <strong>Tip:</strong> Before requesting a refund, try
                    contacting our support team. Many issues can be resolved
                    quickly without needing a refund.
                  </p>
                </div>
              </div>
            </section>

            {/* Policy Changes */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Changes to This Policy
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify this Returns & Refunds Policy at
                any time. Changes will be effective immediately upon posting on
                our website. We encourage you to review this policy
                periodically. Your continued use of our services after any
                changes constitutes acceptance of the updated policy.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
