import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsletterSignup from "@/components/newsletter-signup";
import BlogList from "@/components/blog/blog-list";
import Button from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-primary to-primary-light text-white py-0 pt-10 md:py-8 lg:py-0 lg:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-white mb-6">
                TAKE CONTROL OF YOUR FINANCIAL FUTURE
              </h1>
              <p className="md:text-xl mb-8 text-white/90">
                Here, you'll find simple, practical strategies to help you earn
                more, budget better, save consistenly and start investing with
                confidence. No complicated terms - just simple, practical advice
                with steps to help you move closer to financial freedom, one
                step at a time. I'm here to help you gain the confidence to
                build the life you've always dreamed of.
              </p>
              <Button
                href="/blog"
                className="border bg-background text-primary font-semibold hover:text-white"
                size="lg"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative w-full max-w-md aspect-3/4 rounded-lg overflow-hidden shadow-none">
              <Image
                src="/anne-home-img-Photoroom.png"
                alt="Anne - Financial Educator"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Topics/Services Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How I Can Help You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 py-4 justify-center">
            {/* Budgeting Card */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center md:col-span-2 md:col-start-3">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/money-svgrepo-com.svg"
                  alt="Money Icon"
                  width={40}
                  height={40}
                  className="text-primary"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Make More Money</h3>
              <p className="text-muted-foreground">
                Find simple and proven ways to actively increase your income.
                Whether it's through side hustles or turning your skills into
                cash.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Budgeting Card */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/budget-svgrepo-com.svg"
                  alt="Budgeting Icon"
                  width={40}
                  height={40}
                  className="text-primary"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Budgeting</h3>
              <p className="text-muted-foreground">
                Learn how to create and stick to a budget that works for your
                lifestyle and financial goals.
              </p>
            </div>

            {/* Saving Card */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/savings-svgrepo-com.svg"
                  alt="Saving Icon"
                  width={40}
                  height={40}
                  className="text-primary"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Strategic Saving</h3>
              <p className="text-muted-foreground">
                Discover effective strategies to build your emergency fund and
                save for major life goals.
              </p>
            </div>

            {/* Investing Card */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Image
                  src="/investment-svgrepo-com.svg"
                  alt="Investing Icon"
                  width={40}
                  height={40}
                  className="text-primary"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Investing</h3>
              <p className="text-muted-foreground">
                Learn how to start investing confidently, grow your money over
                time and build a portfolio aligned with your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold">Latest Articles</h2>
            <Link
              href="/blog"
              className="text-primary hover:text-primary-light hover:underline font-medium flex items-center text-sm md:text-base"
            >
              View all articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Blog list component displays the latest 3 blog posts */}
          <BlogList limit={3} />
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-16 md:py-24 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              Join My Financial Newsletter
            </h2>
            <p className="text-center text-lg mb-8 text-muted-foreground">
              Get weekly tips, resources and insights to help you on your
              financial journey.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </section>
    </div>
  );
}
