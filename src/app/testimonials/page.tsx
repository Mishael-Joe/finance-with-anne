import type { Metadata } from "next";
import Image from "next/image";
import { Star } from "lucide-react";
import { FaRegCircleUser } from "react-icons/fa6";
import Link from "next/link";

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Testimonials | Finance with Anne",
  description:
    "Read what clients and students say about working with Anne and how her financial guidance has transformed their lives.",
};

const testimonials = [
  {
    name: "Adedayo Adekunle",
    text: `Very excellent and professional. Attended to all my perturbing questions and provided practical steps to improve my finance. Thanks for the session, Anne.`,
    avatar: "/testimonials/adedayo.png?height=60&width=60",
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
    text: `This session was highly informative and educative as well. Anne has this simple side of her that makes everything she teaches easy to practice and apply. I love how I was able to discuss and plan my investment journey with her. This class is recommended if you're tired of trial and error.`,
  },
  {
    name: "Okulaja Oludayo",
    text: `Coach Anne is a practical financial advisor with vast investment acumen. I wish the life-changing conversation could have gone on forever. Attentive and compassionate—your wisdom is a gift.`,
  },
  {
    name: "Chidi Mbakigwe",
    text: `Engaging with Anne has been an eye opener. Her guidance and advice come from experience. I came out of the session with clarity about what to do next and how to do it.`,
  },
];

export default function TestimonialsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Testimonials Header */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Client Testimonials
        </h1>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            Hear from people who have transformed their financial lives through
            my courses, coaching, and resources.
          </p>
        </div>
      </section>

      {/* Featured Testimonial */}
      <section className="mb-16">
        <div className="bg-primary text-white p-8 md:p-12 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 fill-current text-yellow-400"
                  />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl italic mb-6">
                "Working with Anne completely transformed my relationship with
                money. I feel in control of my finances and confident about my
                future."
              </blockquote>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src="/testimonials/mishael.jpg?height=80&width=80"
                    alt="Featured Client"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-slate-200">
                    Mishael Joseph
                  </h3>
                  {/* <p className="text-white/80">Mishael Joseph</p> */}
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/testimonials/mishael.jpg?height=400&width=600"
                  alt="Client Success Story"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-border"
            >
              {/* Star Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-current text-yellow-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mb-6 italic">
                "{testimonial.text}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center">
                <div className="mr-4">
                  {testimonial.isImage ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                  ) : (
                    <FaRegCircleUser className="rounded-full w-12 h-12 text-slate-500" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-500">
                    {testimonial.name}
                  </h4>
                  {testimonial.description && (
                    <p className="text-sm text-muted-foreground">
                      {testimonial.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Testimonials */}
      {/* <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Video Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/anne.jpg?height=300&width=500"
                alt="Video Testimonial"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">
                Lisa's Debt Freedom Journey
              </h3>
              <p className="text-muted-foreground">
                Lisa shares how she paid off $45,000 in debt using strategies
                from the Debt Freedom Plan.
              </p>
            </div>
          </div>

          
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/anne.jpg?height=300&width=500"
                alt="Video Testimonial"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">
                Mark's Investment Success
              </h3>
              <p className="text-muted-foreground">
                Mark discusses how he built a diversified investment portfolio
                following Anne's guidance.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="bg-secondary/10 p-8 md:p-12 rounded-lg text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary">
          Ready to Transform Your Finances?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-muted-foreground">
          Join thousands of others who have taken control of their financial
          future with Anne's guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <a
            href="/courses"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Explore Courses
          </a> */}
          <Link
            href="/products"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
          >
            Browse Products and Services
          </Link>
        </div>
      </section>
    </div>
  );
}
