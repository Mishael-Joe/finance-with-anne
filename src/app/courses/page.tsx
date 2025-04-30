import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, Clock, Users } from "lucide-react";
import Button from "@/components/ui/button";

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Courses & Workshops | Finance with Anne",
  description:
    "Learn personal finance through structured courses and interactive workshops designed to help you master your money.",
};

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Courses Header */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Financial Courses & Workshops
        </h1>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            Structured learning experiences designed to transform your financial
            knowledge and habits.
          </p>
        </div>
      </section>

      {/* Featured Course */}
      <section className="mb-16">
        <div className="bg-linear-to-r from-primary to-primary-light text-white p-8 md:p-12 rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Featured Course
              </span>
              <h2 className="text-3xl font-bold mb-4 text-white">
                Financial Freedom Fundamentals
              </h2>
              <p className="mb-6">
                A comprehensive 8-week course that covers everything you need to
                know to take control of your finances and build a secure future.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>8 Weeks</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Beginner Friendly</span>
                </div>
              </div>
              <Button href="#" variant="secondary">
                Learn More
              </Button>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden">
                <Image
                  src="/investing.jpg?height=300&width=500"
                  alt="Financial Freedom Fundamentals Course"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Courses */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">All Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Course 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/budgeting.jpg?height=300&width=500"
                alt="Budgeting Bootcamp"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Budgeting Bootcamp</h3>
              <p className="text-muted-foreground mb-4">
                Master the art of budgeting in this 4-week intensive course
                designed to help you create and stick to a budget that works.
              </p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>4 Weeks</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>All Levels</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Weekly Live Sessions</span>
                </div>
                <div className="flex items-center mb-1">
                  <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Customizable Templates</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Community Support</span>
                </div>
              </div>
              <Button href="#" variant="primary" className="w-full">
                View Course
              </Button>
            </div>
          </div>

          {/* Course 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/investing.jpg?height=300&width=500"
                alt="Investing for Beginners"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">
                Investing for Beginners
              </h3>
              <p className="text-muted-foreground mb-4">
                Learn the fundamentals of investing and build a portfolio that
                aligns with your financial goals.
              </p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>6 Weeks</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>Beginner</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Investment Strategies</span>
                </div>
                <div className="flex items-center mb-1">
                  <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Risk Management</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Portfolio Building</span>
                </div>
              </div>
              <Button href="#" variant="primary" className="w-full">
                View Course
              </Button>
            </div>
          </div>

          {/* Course 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/budgeting.jpg?height=300&width=500"
                alt="Debt Freedom Plan"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Debt Freedom Plan</h3>
              <p className="text-muted-foreground mb-4">
                A strategic approach to eliminating debt and building a solid
                financial foundation.
              </p>
              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>5 Weeks</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  <span>All Levels</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Debt Payoff Strategies</span>
                </div>
                <div className="flex items-center mb-1">
                  <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Credit Score Improvement</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Financial Recovery Plan</span>
                </div>
              </div>
              <Button href="#" variant="primary" className="w-full">
                View Course
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Workshops */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Upcoming Workshops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Workshop 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Retirement Planning Masterclass
                  </h3>
                  <p className="text-muted-foreground">
                    Learn how to create a retirement plan that ensures financial
                    security in your golden years.
                  </p>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  May 15, 2023
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>2 Hours (Virtual)</span>
              </div>
              <Button href="#" variant="outline" className="w-full">
                Register Now
              </Button>
            </div>
          </div>

          {/* Workshop 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    Real Estate Investing 101
                  </h3>
                  <p className="text-muted-foreground">
                    Discover the fundamentals of real estate investing and how
                    to get started with minimal capital.
                  </p>
                </div>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  June 5, 2023
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Clock className="h-4 w-4 mr-1" />
                <span>3 Hours (Virtual)</span>
              </div>
              <Button href="#" variant="outline" className="w-full">
                Register Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted p-8 md:p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center">
          What Students Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <Image
                  src="/anne.JPG?height=60&width=60"
                  alt="Student"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="font-bold">Sarah Johnson</h4>
                <p className="text-sm text-muted-foreground">
                  Budgeting Bootcamp Graduate
                </p>
              </div>
            </div>
            <p className="italic">
              "Anne's Budgeting Bootcamp completely transformed my relationship
              with money. For the first time, I feel in control of my finances."
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <Image
                  src="/anne.JPG?height=60&width=60"
                  alt="Student"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="font-bold">Michael Rodriguez</h4>
                <p className="text-sm text-muted-foreground">
                  Investing for Beginners Student
                </p>
              </div>
            </div>
            <p className="italic">
              "I was intimidated by investing before taking Anne's course. Now I
              have a diversified portfolio and the confidence to make informed
              investment decisions."
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="mr-4">
                <Image
                  src="/anne.JPG?height=60&width=60"
                  alt="Student"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </div>
              <div>
                <h4 className="font-bold">Emily Chen</h4>
                <p className="text-sm text-muted-foreground">
                  Debt Freedom Plan Graduate
                </p>
              </div>
            </div>
            <p className="italic">
              "Thanks to Anne's Debt Freedom Plan, I paid off $30,000 in debt in
              just 18 months. Her strategies really work!"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
