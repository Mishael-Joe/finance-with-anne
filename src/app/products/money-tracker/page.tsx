import type { Metadata } from "next";
import {
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  Shield,
  Globe,
  Zap,
} from "lucide-react";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title:
    "Complete Money Tracker - Stop Wondering Where Your Money Goes | Finance with Anne",
  description:
    'The only budget tracker that finds your "lost money" in just 10 minutes a day. Track income, expenses, and investments with our customizable money management system.',
  keywords:
    "budget tracker, money management, expense tracking, financial planning, budgeting tool",
};

/**
 * Sales page for the Complete Money Tracker product
 * Features persuasive copy, social proof, and clear call-to-actions
 */
export default function MoneyTrackerSalesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-secondary/20 text-secondary-light px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Limited Time Offer - First 100 Customers Only
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Stop Wondering Where Your Money Goes
              <span className="text-secondary"> Every Month</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              The Complete Money Tracker That Finds Your "Lost Money" in Just
              <span className="font-bold text-secondary">
                {" "}
                10 Minutes a Day!
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-white hover:bg-white text-primary font-bold px-8 py-4 text-lg transition flex gap-2 group"
              >
                Get Your Tracker Now
                <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>

              <div className="flex items-center text-secondary-light">
                <Shield className="w-5 h-5 mr-2" />
                <span>Secure Checkout • Instant Access</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-secondary">78%</div>
                <div className="text-sm opacity-90">
                  Live paycheck to paycheck
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-secondary">10 min</div>
                <div className="text-sm opacity-90">Daily time investment</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-secondary">100%</div>
                <div className="text-sm opacity-90">
                  Customizable to your life
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              THE PROBLEM
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                'You check your bank account thinking "Where did all my money go?"',
                "You want to save but there's never anything left over",
                "You've tried budgeting apps but they're too complicated or don't work",
                "You feel stressed about money but don't know where to start",
              ].map((problem, index) => (
                <Card key={index} className="border-red-200 bg-red-50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-800 font-medium">{problem}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                You're not alone.{" "}
                <span className="font-bold text-primary">
                  78% of people live paycheck to paycheck
                </span>{" "}
                not because they don't earn enough, but because they don't know
                where their money is going.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              THE SOLUTION
            </h2>

            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
              The Complete Budget and Money Tracker
            </h3>

            <p className="text-xl mb-12 text-gray-700">
              The Only Budget Tracker That Actually Adapts to{" "}
              <span className="font-bold text-secondary">YOUR Life</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: DollarSign,
                  text: "Track ALL Income Sources - Salary, freelance, business, investments, rental income",
                },
                {
                  icon: TrendingUp,
                  text: "Comprehensive Expenses - Every category you actually spend money on",
                },
                {
                  icon: TrendingUp,
                  text: "Investment Tracking - See how much you're building for your future",
                },
                {
                  icon: Users,
                  text: "100% Customizable - Adapts to YOUR unique situation",
                },
                {
                  icon: Globe,
                  text: "Works Any Currency - Perfect for anyone, anywhere",
                },
                {
                  icon: Clock,
                  text: "Simple & Clean - Takes 10 minutes a day, not hours",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-green-200 bg-green-50">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <p className="text-gray-800 font-medium">
                        {feature.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              size="lg"
              className="bg-primary hover:bg-primary text-white font-bold px-8 py-4 text-lg transition group hidden sm:inline-flex"
            >
              Start Tracking Your Money Today
              <ArrowRight className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Results Timeline */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              WHAT HAPPENS WHEN YOU USE THIS
            </h2>

            <div className="space-y-8">
              {[
                {
                  week: "Week 1",
                  result:
                    'Find your "money leaks" - small expenses that add up to thousands monthly',
                  color: "bg-blue-500",
                },
                {
                  week: "Week 2",
                  result: "Discover money you didn't know you had",
                  color: "bg-green-500",
                },
                {
                  week: "Week 3",
                  result:
                    "Start making smarter spending decisions automatically",
                  color: "bg-purple-500",
                },
                {
                  week: "Week 4",
                  result:
                    "See exactly how much you can save and invest each month",
                  color: "bg-orange-500",
                },
              ].map((timeline, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div
                    className={`w-16 h-16 ${timeline.color} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {timeline.week}
                    </h3>
                    <p className="text-gray-700 text-lg">{timeline.result}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              REAL RESULTS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "I found ₦80,000 in forgotten subscriptions in my first week!",
                  author: "Sarah M.",
                  rating: 5,
                },
                {
                  quote:
                    "Finally, a tracker that doesn't feel like math homework.",
                  author: "Michael T.",
                  rating: 5,
                },
                {
                  quote:
                    "I've saved more in 3 months than I did all last year.",
                  author: "David R.",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <p className="font-semibold text-primary">
                      - {testimonial.author}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              WHAT YOU GET
            </h2>

            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    🎯 The Complete Tracker
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    "Income tracking (all sources)",
                    "Expense management (comprehensive categories)",
                    "Investment & wealth building tracker",
                    "Fully customizable for your life",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-800 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Urgency Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-red-500 to-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">⏰ URGENCY</h2>

            <p className="text-xl mb-4">
              This price is only for the{" "}
              <span className="font-bold">first 100 customers</span>
            </p>
            <p className="text-lg mb-8 opacity-90">
              After that, price returns to the original price.
            </p>

            <p className="text-2xl font-bold mb-8">
              Every day you wait is another day money slips away.
            </p>

            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg group hidden sm:inline-flex"
            >
              Get Your Complete Budget and Money Tracker Today!
              <ArrowRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
              FAQ
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "Do I need spreadsheet skills?",
                  a: "No! If you can type numbers, you can use this.",
                },
                {
                  q: "Works with my currency?",
                  a: "Yes! Any currency worldwide.",
                },
                {
                  q: "How much time does this take?",
                  a: "Just 10 minutes per day.",
                },
                {
                  q: "Can it work with my phone?",
                  a: "Yes, you can use it on your phone and it updates online for you.",
                },
                {
                  q: "Do I need Excel to use this?",
                  a: "No, this works with Google sheets, you don't need excel.",
                },
              ].map((faq, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-primary mb-2">Q: {faq.q}</h3>
                    <p className="text-gray-700">A: {faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-primary-light text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              You have two choices:
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-6 text-center">
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-gray-800 font-medium">
                    Keep wondering where your money goes...
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-800 font-medium">
                    Take control today with the Complete Money Mastery Tracker.
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-xl mb-8 opacity-90">
              Don't let another day of financial uncertainty slip by.
            </p>

            <Button
              size="lg"
              className="bg-white hover:bg-white text-primary font-bold px-8 py-4 text-lg mb-6 group"
            >
              Get Your Tracker Now
              <ArrowRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1.5" />
            </Button>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-secondary-light">
              <div className="flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span>Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
