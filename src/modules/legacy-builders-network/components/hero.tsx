import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[500px] text-white overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          src="/investment.webp"
          alt="Legacy Builders Network Hero"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark Overlay for better text readability */}
        <div className="absolute inset-0 bg-primary/80"></div>
      </div>

      {/* Text Content - Centered using absolute positioning */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">
            The Support You Need.
            <br />
            The Investments Guidance{" "}
            <span className="text-secondary">You Deserve</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            Stocks, Bonds, Treasury Bills, Real Estate, Mutual Funds, Insurance.
            <br />
            The opportunity you've been waiting for all in one premium
            community.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/payment">
              <Button className="bg-secondary hidden sm:inline-flex group text-gray-900 px-8 py-6 rounded-lg font-bold text-lg hover:bg-secondary-light transition-colors">
                Join the Premium Community Today
                <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>
              <Button className="bg-secondary sm:hidden group text-gray-900 px-8 py-6 rounded-lg font-bold text-lg hover:bg-secondary-light transition-colors">
                Join Now
                <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
