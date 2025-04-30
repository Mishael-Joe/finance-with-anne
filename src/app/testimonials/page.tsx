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
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-current text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="mb-6 italic">
              "Very excellent and professional. Attended to all my pertubing
              questions and provided practical steps to improve my finance.
              Thanks for the session, Anne."
            </blockquote>
            <div className="flex items-center">
              <div className="mr-4">
                <Image
                  src="/testimonials/adedayo.png?height=60&width=60"
                  alt="Client"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="font-bold">Adedayo Adekunle</h4>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-current text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="mb-6 italic">
              "Amazing session with Anne, when we finished I felt like I should
              pay her more. She is doing an amazing job. You need to book her to
              change your financial story."
            </blockquote>
            <div className="flex items-center">
              <div className="mr-4">
                <FaRegCircleUser className="rounded-full w-12 h-12 text-slate-500" />
              </div>
              <div>
                <h4 className="font-bold">Ayodele Excellent Digitalpreneur</h4>
                <p className="text-sm text-muted-foreground">
                  Financial Coaching Client
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-current text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="mb-6 italic">
              "Thank you very much for today's class I feel so strong that my
              journey to financial freedom just began I feel so excited right
              now I don't think i can thank you enough Thank you very much God
              bless you."
            </blockquote>
            <div className="flex items-center">
              <div className="mr-4">
                <FaRegCircleUser className="rounded-full w-12 h-12 text-slate-500" />
              </div>
              <div>
                <h4 className="font-bold">Chibunna Miracle</h4>
              </div>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-current text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="mb-6 italic">
              "This session was highly informative and educative as well, Anne
              has this simple side of her that makes everything she teaches easy
              to practice and apply, I love how I was able to discuss and plan
              my investment journey with her. This class is recommended to you
              if you are really tired of trial and error, Anne is the best
              partner to have on your journey to steady growth in your
              finances."
            </blockquote>
            <div className="flex items-center">
              <div className="mr-4">
                <FaRegCircleUser className="rounded-full w-12 h-12 text-slate-500" />
              </div>
              <div>
                <h4 className="font-bold">Toyin Osasona Fanisi</h4>
              </div>
            </div>
          </div>

          {/* Testimonial 5 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-current text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="mb-6 italic">
              "Coach Anne is a practical financial advisor with vast investment
              acumen. I wish the life-changing conversation could have gone
              forever. Attentive and Compassionate;your wisdom is a gift. Thank
              you for sharing your investment with me,you are treasure."
            </blockquote>
            <div className="flex items-center">
              <div className="mr-4">
                <FaRegCircleUser className="rounded-full w-12 h-12 text-slate-500" />
              </div>
              <div>
                <h4 className="font-bold">okulaja oludayo</h4>
              </div>
            </div>
          </div>

          {/* Testimonial 6 */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-border">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-current text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="mb-6 italic">
              "Engaging with Anne has been an eye opener. Her guidance and
              advice are born out of experience of someone who can relate to the
              everyday challenges of average person trying to navigate the
              personal finance journey. I came out of with clarity about the
              next things to do and HOW to do them."
            </blockquote>
            <div className="flex items-center">
              <div className="mr-4">
                <FaRegCircleUser className="rounded-full w-12 h-12 text-slate-500" />
              </div>
              <div>
                <h4 className="font-bold">Chidi Mbakigwe</h4>
              </div>
            </div>
          </div>
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
                src="/anne.JPG?height=300&width=500"
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
                src="/anne.JPG?height=300&width=500"
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
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Finances?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-muted-foreground">
          Join thousands of others who have taken control of their financial
          future with Anne's guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* <a
            href="/courses"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
          >
            Explore Courses
          </a> */}
          <Link
            href="/resources"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Browse Resources
          </Link>
        </div>
      </section>
    </div>
  );
}
