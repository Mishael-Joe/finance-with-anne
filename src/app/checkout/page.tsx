import type { Metadata } from "next";
import { geolocation } from "@vercel/functions";
import { getPriceByCountry } from "@/lib/pricing";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { headers } from "next/headers";
import { getYoutubeThumbnail } from "@/lib/utils";

/**
 * Metadata for the Checkout page.
 * Provides SEO information for search engines.
 */
export const metadata: Metadata = {
  title: "Checkout - Complete Money Tracker",
  description:
    "Securely purchase the Complete Money Tracker and start your financial journey.",
  keywords: [
    "money tracker",
    "budgeting tool",
    "financial planning",
    "checkout",
    "secure payment",
  ],
  openGraph: {
    title: "Checkout - Complete Money Tracker",
    description:
      "Securely purchase the Complete Money Tracker and start your financial journey.",
    url: "https://financewithanne.com/checkout",
    type: "website",
  },
};

/**
 * Renders the main Checkout page.
 * This is a Server Component that detects user location for pricing
 * and displays the checkout form.
 */
export default async function CheckoutPage() {
  // Server-side IP detection using Vercel's geolocation
  // Create a Request object from current headers
  const rawHeaders = await headers();
  const headersObj: Record<string, string> = {};
  rawHeaders.forEach((value, key) => {
    headersObj[key] = value;
  });
  const request = new Request("https://financewithanne.com", {
    headers: headersObj,
  });

  const geo = geolocation(request);
  const countryCode = geo?.country || "default";

  const priceDetails = getPriceByCountry(countryCode);
  const youTubeVideoUrl = "https://youtu.be/e2avV3gkcVA?si=9DoerNXv9NZcQEvn";

  return (
    <main className="min-h-[calc(100vh-var(--header-height)-var(--footer-height))] flex items-center justify-center bg-gradient-to-br from-background to-muted py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Left Column: What You Will Get */}
        <div className="flex flex-col justify-center items-center lg:justify-start p-6 bg-white rounded-lg shadow-lg border border-border">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
            What You Will Get
          </h2>

          <div className="w-full max-w-m gap-6 space-y-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
            <div className="flex flex-col gap-4">
              {/* Money Tracker Image */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md border border-border">
                <Image
                  src="/products/money_tracker.png"
                  alt="Money Tracker Image"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Key Benefits List */}
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Instant access to the Complete Money Tracker</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Fully customizable for your unique financial life</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Works with any currency, anywhere in the world</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              {/* YouTube Thumbnail */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md border border-border">
                <Image
                  src={getYoutubeThumbnail(youTubeVideoUrl)}
                  alt="YouTube Tutorial Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Key Benefits List */}
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Instant access to the YouTube tutorial</span>
                </li>
                {/* <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Fully customizable for your unique financial life</span>
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span>Works with any currency, anywhere in the world</span>
              </li> */}
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                  <span>Simple to use, takes just 10 minutes a day</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Checkout Form */}
        <div className="flex flex-col justify-center">
          <CheckoutForm priceDetails={priceDetails} />
        </div>
      </div>
    </main>
  );
}
