import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import NewsletterSignup from "@/components/newsletter-signup";
import BlogList from "@/components/blog/blog-list";
// import { Button } from "@/components/ui/button";
import { YoutubeVideoGrid } from "@/components/youtube-video-grid";
import { getPublishedPosts } from "@/lib/posts";
import HeroSlider from "@/components/hero";
import { Button } from "@/components/ui/button";

export default async function Home() {
  // Fetch the latest posts for the blog section
  const posts = await getPublishedPosts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSlider />

      {/* Key Topics/Services Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-5xl text-primary font-bold mb-4">
              How I Can Help You
            </h2>
            <p className="text-muted-foreground text-lg">
              Practical, relatable financial guidance designed to help you earn
              more, manage your money wisely, and grow long-term wealth with
              confidence.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Make More Money */}
            <div className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border">
              <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition">
                <Image
                  src="/svg/money-svgrepo-com.svg"
                  alt="Money Icon"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Make More Money</h3>
              <p className="text-muted-foreground">
                Simple and proven ways to increase your income through side
                hustles, skill monetization, and smart opportunities.
              </p>
            </div>

            {/* Smart Budgeting */}
            <div className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border">
              <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition">
                <Image
                  src="/svg/budget-svgrepo-com.svg"
                  alt="Budgeting Icon"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Budgeting</h3>
              <p className="text-muted-foreground">
                Build a realistic budget that fits your lifestyle and helps you
                stay in control of your finances without feeling restricted.
              </p>
            </div>

            {/* Strategic Saving */}
            <div className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border">
              <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition">
                <Image
                  src="/svg/savings-svgrepo-com.svg"
                  alt="Saving Icon"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Strategic Saving</h3>
              <p className="text-muted-foreground">
                Learn how to save intentionally, build an emergency fund, and
                prepare for major life goals with clarity.
              </p>
            </div>

            {/* Smart Investing */}
            <div className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border">
              <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-105 transition">
                <Image
                  src="/svg/investment-svgrepo-com.svg"
                  alt="Investing Icon"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Investing</h3>
              <p className="text-muted-foreground">
                Start investing with confidence, grow your money over time, and
                align your portfolio with your long-term financial goals.
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
          <BlogList posts={posts} limit={3} />
        </div>
      </section>

      {/* YouTube videos */}
      <section className="relative py-20">
        {/* Subtle background */}
        <div className="absolute inset-0 bg-muted/30" />

        <div className="relative container mx-auto px-4 md:px-6">
          {/* Section Header */}
          <div className="grid gap-8 md:grid-cols-[1fr_auto] items-end mb-12">
            {/* Text Content */}
            <div className="max-w-2xl">
              <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
                Learn & Grow
              </span>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                Build Sustainable Wealth
              </h2>

              <p className="text-muted-foreground text-lg leading-relaxed">
                If financial education wasn’t part of your upbringing, you are
                not alone. That’s exactly what inspired me to launch my YouTube
                channel to share the money lessons, strategies, and clarity I
                wish I had learned earlier.
              </p>
            </div>

            {/* CTA */}
            <div className="flex md:justify-end">
              <Button variant="premium">
                <Link
                  href="https://www.youtube.com/@FinancewithAnne"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-medium text-white"
                >
                  Watch on YouTube
                </Link>
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-12 h-px w-full bg-border" />

          {/* Video Grid */}
          <YoutubeVideoGrid />
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="relative overflow-hidden border-y">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#EEF2FF] via-[#E8ECFF] to-[#E0E7FF]" />

        {/* Soft accent glow */}
        <div
          className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px]
       bg-primary/15 blur-3xl rounded-full"
        />

        <div className="relative container mx-auto px-6 py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* LEFT: Content */}
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 mb-6 text-sm font-semibold uppercase tracking-wider text-primary">
                Stay Informed
                <span className="h-px w-8 bg-primary/40" />
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Join My Financial Newsletter
              </h2>

              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
                Get weekly insights, practical money strategies, and curated
                financial resources designed to help you make smarter decisions,
                reduce money stress, and build long-term financial confidence.
              </p>

              <p className="text-sm text-muted-foreground">
                Trusted by readers who value clarity, consistency, and
                actionable financial guidance.
              </p>
            </div>

            {/* RIGHT: Form Emphasis */}
            <div className="relative">
              <div className="rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl p-8 md:p-10">
                <NewsletterSignup />

                <p className="mt-6 text-xs text-muted-foreground">
                  No spam. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
