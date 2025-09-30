import type { Metadata } from "next";
import Image from "next/image";
import { Download, FileText, Calculator, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
      {/* <section className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          <button className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
            All Resources
          </button>
          <Link
            href={"#budget-template"}
            className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors"
          >
            Budget Templates
          </Link>
          <Link
            href={"#"}
            className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors"
          >
            Worksheets
          </Link>
          <Link
            href={"#"}
            className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors"
          >
            Calculators
          </Link>
          <Link
            href="#guides"
            className="px-4 py-2 bg-white border border-border rounded-full text-sm font-medium hover:bg-muted transition-colors"
          >
            Guides
          </Link>
        </div>
      </section> */}

      {/* Resources Grid */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Budget Template */}
          <div
            className="bg-white rounded-lg shadow-md overflow-hidden border border-border scroll-smooth"
            id="budget-template"
          >
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
              <h3 className="text-xl font-bold mb-2 text-primary">
                Monthly Budget Template
              </h3>
              <p className="text-muted-foreground mb-4">
                A simple monthly budget template to track your income, expenses,
                and savings goals.
              </p>
              <Link
                download={true}
                href="/files/Monthly_Budget_Template.xlsx"
                className="w-full bg-primary text-white hover:bg-primary/90 inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10"
              >
                <Download className="mr-2 h-4 w-4" /> Download Template
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/savings-calculator.jpg?height=300&width=500"
                alt="Savings Calculator"
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
                  Online Tool
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Savings Calculator
              </h3>
              <p className="text-muted-foreground mb-4">
                Use our savings calculator to estimate how much you need to save
                each month to reach your financial goals. Adjust for interest
                rates and time frames.
              </p>
              <Button
                href="/tools/savings-calculator"
                variant="primary"
                className="w-full"
              >
                <Calculator className="mr-2 h-4 w-4" /> Use Calculator
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/net-worth.jpg?height=300&width=500"
                alt="Net Worth Calculator"
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
                  Online Tool
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Net Worth Calculator
              </h3>
              <p className="text-muted-foreground mb-4">
                Calculate your net worth easily with our online tool. Track your
                assets and liabilities to see your financial health at a glance.
              </p>
              <Button
                href="/tools/net-worth-calculator"
                variant="primary"
                className="w-full"
              >
                <Calculator className="mr-2 h-4 w-4" /> Use Calculator
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border">
            <div className="aspect-video relative bg-muted">
              <Image
                src="/investment-calculator.jpg?height=300&width=500"
                alt="Investment Calculator"
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
                  Online Tool
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">
                Investment Calculator
              </h3>
              <p className="text-muted-foreground mb-4">
                Plan your financial future with our powerful investment
                calculator. See how compound interest and regular contributions
                can grow your wealth over time.
              </p>
              <Button
                href="/tools/investment-calculator"
                variant="primary"
                className="w-full"
              >
                <Calculator className="mr-2 h-4 w-4" /> Use Calculator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <div className="mt-8 scroll-smooth scroll-mt-20" id="guides">
        <h2 className="text-2xl font-bold mb-6 text-primary">Guides</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How to Recover Your CSCS Number</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Check Old Documents or Emails</strong> – Look through
                  old emails, contract notes or statements from your former
                  stockbroker.
                </li>
                <li>
                  <strong>Contact CSCS Directly</strong> – Visit{" "}
                  <a
                    href="https://www.cscs.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    https://www.cscs.ng
                  </a>{" "}
                  or use their contact form or customer support. WhatsApp:{" "}
                  <a
                    href="https://wa.me/2348137691289"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    +2348137691289
                  </a>{" "}
                  or email{" "}
                  <a
                    href="mailto:contact@cscs.ng"
                    className="underline text-blue-600"
                  >
                    contact@cscs.ng
                  </a>
                  . Provide:
                  <ul className="list-disc pl-6 mt-1">
                    <li>Full name (as registered with your previous broker)</li>
                    <li>BVN or registered phone number</li>
                    <li>The name of your former stockbroker</li>
                    <li>Any old account statements (if available)</li>
                  </ul>
                </li>
                <li>
                  <strong>Visit a Stockbroker for Assistance</strong> – They can
                  help you recover it using your details mentioned above.
                </li>
                <li>
                  <strong>Check with the Registrar of Your Shares</strong> –
                  Every listed company has a registrar. Search “[Company Name]
                  registrar in Nigeria”, then contact them to update your
                  records.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>
              How to Claim Your Unclaimed Dividends in Nigeria
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2 text-muted-foreground">
                Unclaimed dividends are a growing concern. Here's how to recover
                them and ensure you receive future ones.
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Check If You Have Any Unclaimed Dividends</strong> –
                  Visit{" "}
                  <a
                    href="https://sec.gov.ng/non-mandated/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    https://sec.gov.ng/non-mandated/
                  </a>{" "}
                  and search your name to see a list of companies and registrars
                  holding your dividends.
                </li>
                <li>
                  <strong>Register to Claim Your Dividends</strong> – Use the{" "}
                  <a
                    href="https://docuhub3.nibss-plc.com.ng/edmms/self-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600"
                  >
                    e-Dividend Mandate Management System (e-DMMS)
                  </a>
                  . Download and complete the mandate form, then submit it to
                  your bank or registrar with valid ID and proof of account
                  ownership.
                </li>
              </ol>
              <p className="mt-4 text-muted-foreground">
                Completing this ensures future dividends are paid directly to
                your bank—no more lost warrants or delays!
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>
              Join Our Free Telegram Community
            </AccordionTrigger>
            <AccordionContent>
              <p className="mb-2 text-muted-foreground">
                You're invited to a supportive community designed to help you
                grow financially.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>
                  Ask questions and get answers tailored to your financial
                  situation.
                </li>
                <li>
                  Learn how to increase your income, save smarter, and invest
                  wisely.
                </li>
                <li>
                  Join monthly live Book Clubs focused on finance and
                  self-growth.
                </li>
                <li>
                  Gain access to investment guides, tools, and networking
                  opportunities.
                </li>
                <li>
                  Promote your business or find partners in the collaboration
                  space.
                </li>
              </ul>
              <p className="mt-4">
                <a
                  href="https://t.me/+SNSQzX94_Gk1M2M0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Click here to join the Telegram Community.
                </a>
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
