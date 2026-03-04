"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { FaRegCircleUser } from "react-icons/fa6";

const testimonials = [
  {
    name: "Adedayo Adekunle",
    text: `Very excellent and professional. Attended to all my perturbing questions and provided practical steps to improve my finance. Thanks for the session, Anne.`,
    avatar: "/testimonials/adedayo.png",
    isImage: true,
  },
  {
    name: "Ayodele Excellent Digitalpreneur",
    text: `Amazing session with Anne, when we finished I felt like I should pay her more. She is doing an amazing job. You need to book her to change your financial story.`,
    description: "Financial Coaching Client",
  },
  {
    name: "Chibunna Miracle",
    text: `Thank you very much for today's class I feel so strong that my journey to financial freedom just began. I feel so excited right now. Thank you very much. God bless you.`,
  },
  {
    name: "Toyin Osasona Fanisi",
    text: `This session was highly informative and educative as well. Anne has this simple side of her that makes everything she teaches easy to practice and apply.`,
  },
  {
    name: "Okulaja Oludayo",
    text: `Coach Anne is a practical financial advisor with vast investment acumen. Attentive and compassionate—your wisdom is a gift.`,
  },
  {
    name: "Chidi Mbakigwe",
    text: `Engaging with Anne has been an eye opener. I came out of the session with clarity about what to do next.`,
  },
];

export default function TestimonialsPage() {
  return (
    <main className="relative bg-background text-foreground overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative py-28 md:py-36">
        {/* Decorative background glow */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6">
            5-Star Client Experiences
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Real Stories.
            <span className="block text-primary">
              Real Financial Transformation.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From clarity to confidence, these are the voices of individuals who
            have taken intentional steps toward financial growth.
          </p>

          <div className="mt-10">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-10 text-sm font-medium text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Start Your Transformation
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL GRID ================= */}
      <section className="container mx-auto px-4 md:px-6 pb-32">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="
                group relative rounded-2xl border border-border
                bg-card p-8 shadow-sm
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
                flex flex-col
              "
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm leading-relaxed text-muted-foreground flex-1 mb-6 italic">
                “{testimonial.text}”
              </blockquote>

              {/* Footer */}
              <div className="flex items-center gap-3 pt-5 border-t border-border/60">
                {testimonial.isImage ? (
                  <Image
                    src={testimonial.avatar!}
                    alt={testimonial.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <FaRegCircleUser className="h-10 w-10 text-muted-foreground" />
                )}
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  {testimonial.description && (
                    <p className="text-xs text-muted-foreground">
                      {testimonial.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Subtle hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ring-1 ring-primary/20" />
            </article>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="container mx-auto px-4 md:px-6 pb-32">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary/80 text-white p-14 text-center space-y-6 shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Rewrite Your Financial Story?
          </h2>

          <p className="max-w-2xl mx-auto text-white/90">
            Learn the same principles that have helped countless individuals
            gain clarity, discipline, and long-term confidence with money.
          </p>

          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center rounded-md bg-white text-primary px-10 text-sm font-medium shadow hover:scale-[1.03] transition-all duration-300"
          >
            Book a Session with Anne
          </Link>
        </div>
      </section>
    </main>
  );
}
