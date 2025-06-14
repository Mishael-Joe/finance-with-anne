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
          {/* <p className="text-lg text-muted-foreground mb-8">
            Certified Financial Educator and Personal Finance Expert
          </p> */}
        </div>
      </section>

      {/* Why I Started Section */}
      <section className="mb-16 bg-muted p-8 md:p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-primary">
          Why I Started Finance with Anne
        </h2>
        <div className="space-y-4">
          <p>
            Growing up, I watched many of my dad’s colleagues, men who were once
            top government officials with drivers, beautiful homes and a good
            life — struggle financially after retirement. They had spent their
            prime earning years in comfort, yet when the paychecks stopped, so
            did the lifestyle. Many had to go back to work just to get by. That
            reality left a lasting impression on me.
          </p>
          <p>
            It made me realize something important: it's not just about how much
            money you make — it's about how well you manage it. Money should
            serve you not only in your active years but also in retirement.
          </p>
          <p>
            Over the years, I’ve seen how financial stress can weigh heavily on
            individuals, families and relationships. But I’ve also seen the
            power of financial knowledge to transform lives — to bring clarity,
            peace of mind and freedom.
          </p>
          <p>
            Finance With Anne was born out of a deep desire to bridge the gap
            between everyday people and practical financial wisdom. This
            platform is my way of paying it forward.
          </p>
          <p>
            Finance With Anne is more than just a blog or a business — it’s a
            movement toward helping people make confident, intentional financial
            decisions, no matter where they’re starting from.
          </p>
          <p>
            I’m also a wife to one amazing man and a proud mom of three
            beautiful children. Every day, they remind me of the importance of
            building a legacy that lasts and I’m here to help you do the same.
          </p>
        </div>
      </section>

      {/* Bio and Photo Section */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-primary">My Mission</h2>
            <p className="mb-4">
              At{" "}
              <span className=" italic text-primary-light">
                Finance With Anne
              </span>
              , my mission is to make personal finance simple, practical and
              empowering. Providing you with the right knowledge, tools and
              confindence to take control of your financial future.
            </p>
            <p className="mb-4">
              I believe financial literacy should be relatable and within
              everyone's reach. Whether it’s earning extra income, budgeting,
              saving, investing or shifting your money mindsets, I break down
              complex knowledge into clear, actionable steps.
            </p>
            <p className="mb-6">
              With years of experience living and teaching smart money habits,
              I'm here to guide you toward building purposeful wealth - starting
              from were you are, one smart decision at a time.
            </p>
            <Button href="/contact" variant="primary">
              Get in Touch
            </Button>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-3/4 rounded-sm overflow-hidden shadow-none">
              <Image
                src="/anne-Photoroom.png"
                alt="Anne - Financial Educator"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      {/* <section>
        <h2 className="text-3xl font-bold mb-6">
          Certifications & Credentials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-2">
              Certified Financial Education Instructor (CFEI) (In View)
            </h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-2">
              Chartered Accountant (ACA)
            </h3>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-semibold mb-2">
              MBA in Finance and Investments (In View)
            </h3>
          </div>
        </div>
      </section> */}
    </div>
  );
}
