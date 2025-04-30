import type { Metadata } from "next";
import Image from "next/image";
import { Download, FileText, Calculator, BookOpen } from "lucide-react";
import Button from "@/components/ui/button";
import Link from "next/link";

// Define metadata for SEO
export const metadata: Metadata = {
  title: "Resources | Finance with Anne",
  description:
    "Free resources to help you manage your finances, including budget templates, worksheets, and financial planning tools.",
};

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      {/* Resources Header */}
      <section className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Financial Resources
        </h1>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            Free tools and templates to help you organize your finances and
            reach your goals faster.
          </p>
        </div>
      </section>

      {/* Resources Categories */}
      <section className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
            All Resources
          </button>
          <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
            Budget Templates
          </button>
          <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
            Worksheets
          </button>
          <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
            Calculators
          </button>
          <button className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors">
            Guides
          </button>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Budget Template */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/budgeting.jpg?height=300&width=500"
                alt="Monthly Budget Template"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Free
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium text-muted-foreground">
                  Excel Template
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Monthly Budget Template
              </h3>
              <p className="text-muted-foreground mb-4">
                A comprehensive monthly budget template to track your income,
                expenses, and savings goals.
              </p>
              <Link
                download={true}
                href="/files/Monthly_Budget_Template.xlsx"
                // variant="primary"
                className="w-full bg-primary text-white hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10"
              >
                <Download className="mr-2 h-4 w-4" /> Download Template
              </Link>
            </div>
          </div>

          {/* Debt Payoff Calculator */}
          {/* <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/budgeting.jpg?height=300&width=500"
                alt="Debt Payoff Calculator"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Free
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <Calculator className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium text-muted-foreground">
                  Excel Calculator
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Debt Payoff Calculator</h3>
              <p className="text-muted-foreground mb-4">
                Calculate how quickly you can pay off your debts using different
                strategies like the snowball or avalanche method.
              </p>
              <Button href="#" variant="primary" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Calculator
              </Button>
            </div>
          </div> */}

          {/* Emergency Fund Worksheet */}
          {/* <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/saving.jpg?height=300&width=500"
                alt="Emergency Fund Worksheet"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Free
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium text-muted-foreground">
                  PDF Worksheet
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Emergency Fund Worksheet
              </h3>
              <p className="text-muted-foreground mb-4">
                A step-by-step worksheet to help you calculate how much you need
                in your emergency fund.
              </p>
              <Button href="#" variant="primary" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Worksheet
              </Button>
            </div>
          </div> */}

          {/* Retirement Planning Guide */}
          {/* <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/saving.jpg?height=300&width=500"
                alt="Retirement Planning Guide"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Free
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <BookOpen className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium text-muted-foreground">
                  PDF Guide
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Retirement Planning Guide
              </h3>
              <p className="text-muted-foreground mb-4">
                A comprehensive guide to planning for retirement at any age,
                with actionable steps.
              </p>
              <Button href="#" variant="primary" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Guide
              </Button>
            </div>
          </div> */}

          {/* Investment Tracker */}
          {/* <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/investing.jpg?height=300&width=500"
                alt="Investment Tracker"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Free
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <FileText className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium text-muted-foreground">
                  Excel Template
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">Investment Tracker</h3>
              <p className="text-muted-foreground mb-4">
                Track your investments, monitor performance, and visualize your
                portfolio allocation.
              </p>
              <Button href="#" variant="primary" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Tracker
              </Button>
            </div>
          </div> */}

          {/* Financial Goal Setting Workbook */}
          {/* <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/investing.jpg?height=300&width=500"
                alt="Financial Goal Setting Workbook"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                Free
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-2">
                <BookOpen className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium text-muted-foreground">
                  PDF Workbook
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">
                Financial Goal Setting Workbook
              </h3>
              <p className="text-muted-foreground mb-4">
                A comprehensive workbook to help you set and achieve your
                financial goals.
              </p>
              <Button href="#" variant="primary" className="w-full">
                <Download className="mr-2 h-4 w-4" /> Download Workbook
              </Button>
            </div>
          </div> */}
        </div>
      </section>

      {/* Premium Resources Teaser */}
      {/* <section className="bg-primary text-white p-8 md:p-12 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Premium Resources</h2>
            <p className="mb-6">
              Get access to my complete library of premium financial resources,
              including advanced budget templates, investment trackers, and
              personalized financial planning tools.
            </p>
            <Button href="/courses" variant="secondary">
              Learn More
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/budgeting.jpg?height=300&width=500"
              alt="Premium Resources"
              width={400}
              height={300}
              className="rounded-lg"
            />
          </div>
        </div>
      </section> */}
    </div>
  );
}
