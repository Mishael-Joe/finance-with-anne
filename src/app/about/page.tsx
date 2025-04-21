import Image from "next/image";
import type { Metadata } from "next";
import Button from "@/components/ui/button";

// Define metadata for SEO
export const metadata: Metadata = {
  title: "About Anne | Finance with Anne",
  description:
    "Learn about Anne's background, expertise, and why she started Finance with Anne to help others achieve financial freedom.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Hero Section */}
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          About Anne
        </h1>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground mb-8">
            Certified Financial Educator and Personal Finance Expert
          </p>
        </div>
      </section>

      {/* Bio and Photo Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">My Mission</h2>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
              auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
            </p>
            <p className="mb-4">
              Ut in nulla enim. Phasellus molestie magna non est bibendum non
              venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
              Mauris iaculis porttitor posuere.
            </p>
            <p className="mb-6">
              With over 10 years of experience in personal finance, I'm
              dedicated to helping you build a secure financial future through
              practical, actionable advice.
            </p>
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-3/4 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/anne.jpg?height=600&width=450"
                alt="Anne - Financial Educator"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why I Started Section */}
      <section className="mb-16 bg-muted p-8 md:p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">
          Why I Started Finance with Anne
        </h2>
        <div className="space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
            dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
            auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
          </p>
          <p>
            Ut in nulla enim. Phasellus molestie magna non est bibendum non
            venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
            Mauris iaculis porttitor posuere.
          </p>
          <p>
            My own financial journey taught me that with the right knowledge and
            tools, anyone can take control of their finances. Now, I'm
            passionate about sharing what I've learned to help others achieve
            financial freedom.
          </p>
        </div>
      </section>

      {/* Certifications Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">
          Certifications & Credentials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-2">
              Certified Financial Educator (CFE)
            </h3>
            <p className="text-muted-foreground">
              National Financial Educators Council
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-2">
              Personal Finance Specialist
            </h3>
            <p className="text-muted-foreground">
              Financial Planning Association
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-2">MBA in Finance</h3>
            <p className="text-muted-foreground">
              University of Financial Excellence
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-2">
              Certified Budget Counselor
            </h3>
            <p className="text-muted-foreground">
              American Association of Budget Counselors
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
