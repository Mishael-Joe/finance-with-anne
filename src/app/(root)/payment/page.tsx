import type { Metadata } from "next";
import { SubscriptionForm } from "@/components/payment/subscription-form";

/**
 * Metadata for the Checkout page.
 * Provides SEO information for search engines.
 */
export const metadata: Metadata = {
  title: "Payment - Subscription",
  description: "Securely subscribe to the Premium Community",
  keywords: ["checkout", "secure payment"],
  openGraph: {
    title: "Payment - Subscription",
    description: "Securely subscribe to the Premium Community",
    url: "https://financewithanne.com/payment",
    type: "website",
  },
};

/**
 * Renders the main Checkout page.
 * This is a Server Component that detects user location for pricing
 * and displays the checkout form.
 */
export default async function SubscriptionPage() {
  return (
    <main className="max-w-3xl mx-auto py-6 px-4">
      <div className="flex flex-col justify-center">
        <SubscriptionForm />
      </div>
    </main>
  );
}
