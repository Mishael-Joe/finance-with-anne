"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { PriceDetails } from "@/types/calculator";
import { getIpLocation } from "@/lib/ip-detection";
import { getPriceByCountryForCummunity } from "@/lib/pricing";

export default function SubscriptionPage() {
  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Effect to detect user's location and set pricing on component mount
  useEffect(() => {
    const detectLocationAndSetPrice = async () => {
      setLoading(true);
      try {
        const locationData = await getIpLocation();
        const countryCode = locationData?.country_code || "default";
        const detectedPrice = getPriceByCountryForCummunity(countryCode);
        setPriceDetails(detectedPrice);
      } catch (error) {
        console.error("Error detecting location or setting price:", error);
        setPriceDetails(getPriceByCountryForCummunity("default")); // Fallback to default
      } finally {
        setLoading(false);
      }
    };

    detectLocationAndSetPrice();
  }, []);

  const benefits = [
    {
      content: "Monthly Webinars with Anne.",
    },
    {
      content:
        "Market analysis & breakdowns (stocks, bonds, T-bills, real estate).",
    },
    {
      content: "Guest Experts from across industries.",
    },
    {
      content: "Beginners Investment Course (start strong)",
    },
    {
      content: "Private community access",
    },
    {
      content: "Vetted investment opportunities & strategies",
    },
    {
      content: "Direct Q&A support",
    },
  ];

  return (
    <section className="py-8 xs:py-12 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Heading Section */}
        <div className="w-full flex flex-col items-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-center">
            Join the Community
          </h2>
        </div>

        <div className="max-w-xl mx-auto">
          <Card className="border-2 border-secondary shadow-lg hover:shadow-xl transition-shadow duration-300 p-4">
            <CardHeader className="pb-4 xs:pb-5 sm:pb-6 pt-6 xs:pt-7 sm:pt-8">
              <div className="w-full flex flex-col">
                <div className="text-black mb-2 xs:mb-3 font-semibold text-xl xs:text-2xl sm:text-3xl">
                  Annual Membership
                </div>
                {loading ? (
                  <div className="flex items-center justify-center text-black">
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    <span className="text-xl">Loading...</span>
                  </div>
                ) : (
                  <div className="flex gap-1 items-end">
                    <div className="font-bold text-3xl xs:text-4xl sm:text-5xl md:text-6xl">
                      {priceDetails?.symbol}
                      {priceDetails?.amount.toLocaleString()}
                    </div>
                    {/* <div className="text-sm xs:text-base sm:text-lg text-gray-600 mt-2">
                      per year
                    </div> */}
                  </div>
                )}
              </div>
            </CardHeader>

            <CardContent className="font-semibold text-start pb-6 xs:pb-7 sm:pb-8">
              <div className="space-y-3 xs:space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 bg-gray-700 rounded-full mt-2 mr-3 xs:mr-4"></div>
                    <p className="text-sm xs:text-base sm:text-lg md:text-lg text-gray-700 leading-relaxed flex-1">
                      {benefit.content}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="pt-4 xs:pt-5 sm:pt-6">
              <Link href="/payment" className="w-full">
                <Button className="bg-secondary group w-full space-x-2 text-gray-900 px-4 xs:px-6 py-8 xs:py-10 sm:py-6 rounded-lg font-bold text-base xs:text-lg sm:text-xl hover:bg-yellow-300 transition-colors duration-300 shadow-md hover:shadow-lg">
                  <span>Join now </span>
                  <span className="hidden sm:inline-flex">
                    {" "}
                    - {priceDetails?.symbol}
                    {priceDetails?.amount.toLocaleString()}
                  </span>
                  <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1.5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
