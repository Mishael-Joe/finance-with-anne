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
    <div className="min-h-screen bg-muted/40">
      {/* Header */}

      <header className="bg-[#0A001C] text-white py-20">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Returns & Refunds Policy
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl">
            Transparent guidelines explaining how refunds and returns work for
            Finance with Anne digital products and services.
          </p>
          <p className="mt-6 text-white/70 text-sm">
            <strong>Last Updated:</strong> August 2025
          </p>
        </div>
      </header>

      {/* Policy Content */}
      <main className="container mx-auto px-4 md:px-6 max-w-5xl -mt-16 pb-24">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-14 space-y-16">
          {/* Intro */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Commitment to You</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Finance with Anne, we stand behind the quality of our digital
              products and services. Our goal is to ensure you feel confident
              and satisfied with every purchase you make.
            </p>

            <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-5">
              <p className="text-sm text-gray-800">
                <strong>Important:</strong> Due to the digital nature of our
                products, most sales are final. However, refunds are available
                in specific situations outlined below.
              </p>
            </div>
          </section>

          {/* Digital Products */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              Digital Products Refund Policy
            </h2>

            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-green-800 mb-3">
                7-Day Money-Back Guarantee
              </h3>
              <ul className="list-disc list-inside text-green-700 space-y-1">
                <li>Money tracker spreadsheets</li>
                <li>Budget templates</li>
                <li>Investment calculators</li>
                <li>Financial guides & courses</li>
              </ul>
            </div>

            <h3 className="text-lg font-semibold mb-3">Refund Eligibility</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Request made within 7 days of purchase</li>
              <li>Product has a technical issue preventing use</li>
              <li>Product significantly differs from description</li>
              <li>Unauthorized or duplicate charges</li>
            </ul>
          </section>

          {/* Non Refundable */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Non-Refundable Items</h2>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <ul className="list-disc list-inside text-red-700 space-y-2">
                <li>Products accessed after 7 days</li>
                <li>Customized financial plans</li>
                <li>Consultations cancelled under 24 hours</li>
                <li>Products purchased with heavy discounts</li>
                <li>Shared or redistributed products</li>
              </ul>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="text-2xl font-bold mb-8">How to Request a Refund</h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Submit Request",
                  text: "Email us with your order details",
                },
                {
                  step: "2",
                  title: "Review",
                  text: "We review within 2–3 business days",
                },
                {
                  step: "3",
                  title: "Refund",
                  text: "Approved refunds processed in 5–7 days",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="border rounded-xl p-6 text-center bg-muted/40"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Processing Table */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Refund Processing Times</h2>

            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left">Payment Method</th>
                    <th className="px-4 py-3 text-left">Timeline</th>
                    <th className="px-4 py-3 text-left">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3">Card</td>
                    <td className="px-4 py-3">3–5 days</td>
                    <td className="px-4 py-3">Depends on bank</td>
                  </tr>
                  <tr className="border-t bg-muted/30">
                    <td className="px-4 py-3">Bank Transfer</td>
                    <td className="px-4 py-3">5–7 days</td>
                    <td className="px-4 py-3">Direct to bank</td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3">Mobile Money</td>
                    <td className="px-4 py-3">1–3 days</td>
                    <td className="px-4 py-3">Fastest</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

            <div className="bg-muted/40 rounded-xl p-6 space-y-2 text-sm">
              <p>
                <strong>Email:</strong> contact@financewithanne.com
              </p>
              <p>
                <strong>Subject:</strong> Refund Request – Order #
              </p>
              <p>
                <strong>Form:</strong>{" "}
                <Link href="/contact" className="text-primary underline">
                  Contact Page
                </Link>
              </p>
              <p className="text-muted-foreground pt-4">
                We respond within 24–48 hours.
              </p>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-6">
              Returns & Refunds Policy Changes
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We reserve the right to modify this Returns & Refunds Policy at
              any time. Changes will be effective immediately upon posting on
              our website. We encourage you to review this policy periodically.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
