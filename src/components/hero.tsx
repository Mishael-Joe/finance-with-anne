"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import anne from "../../public/anne-Photoroom.png";

type Slide = {
  image: string;
  eyebrow: string;
  heading: string;
  highlight: string;
  description: string;
};

export default function HeroSlider() {
  const slides: Slide[] = [
    {
      image: "/bg1.webp",
      eyebrow: "Financial Confidence",
      heading: "Secure Your",
      highlight: "Financial Future",
      description:
        "Simple, practical strategies to help you earn more, budget better, save consistently, and invest with confidence.",
    },
    {
      image: "/bg2.webp",
      eyebrow: "Money Without Stress",
      heading: "Build Wealth With",
      highlight: "Clarity & Intention",
      description:
        "Clear guidance, real strategies, and practical steps to help you grow financially without confusion.",
    },
    {
      image: "/bg3.webp",
      eyebrow: "Empowered Finances",
      heading: "Master Money",
      highlight: "With Confidence",
      description:
        "Actionable advice and easy-to-follow frameworks to help you manage your money effectively and confidently.",
    },
  ];

  const [activeSlide, setActiveSlide] = useState(0);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  /* Auto slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(interval);
  }, [slides.length]);

  /* Subtle parallax */
  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.15); // VERY subtle
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-[95vh] overflow-hidden bg-[#0A001C] text-white">
      {/* Background slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1600ms] ease-in-out ${
              activeSlide === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: `translateY(${parallaxOffset}px)`,
            }}
          />
        ))}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A001C]/65 via-[#0A001C]/70 to-[#0A001C]/65" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid min-h-[95vh] grid-cols-1 lg:grid-cols-2 items-center gap-16">
          {/* LEFT: Text */}
          <div className="max-w-xl mt-10 lg:mt-0">
            <span className="inline-block mb-5 text-xs md:text-sm font-semibold uppercase tracking-widest text-primary">
              {slides[activeSlide].eyebrow}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              {slides[activeSlide].heading} <br />
              <span className="text-primary">
                {slides[activeSlide].highlight}
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-10">
              {slides[activeSlide].description}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Button
                href="/blog"
                size="lg"
                className="px-8 py-6"
                variant="premium"
              >
                Get Started
              </Button>

              <Link
                href="/about"
                className="text-sm font-medium text-white/80 hover:text-white underline underline-offset-4"
              >
                Learn more about Anne
              </Link>
            </div>

            {/* Slider indicators */}
            <div className="mt-12 flex gap-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2 w-10 rounded-full transition-colors ${
                    activeSlide === index
                      ? "bg-primary"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Static CEO image */}
          <div className="relative lg:flex justify-center">
            <div className="relative w-full max-w-[600px] aspect-[5/6] rounded-2xl overflow-hidden">
              <Image
                src={anne}
                alt="Anne – Financial Educator"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
