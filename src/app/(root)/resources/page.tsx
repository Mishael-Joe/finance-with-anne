import type { Metadata } from "next";
import Image from "next/image";
import { Download, FileText, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Resources | Finance with Anne",
  description:
    "Free resources to help you manage your finances, including budget templates, worksheets, and financial planning tools.",
};

export default function ResourcesPage() {
  return (
    <main className="bg-background text-foreground overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative py-24 md:py-32 text-center">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 -translate-x-1/2 top-[-120px] w-[700px] h-[700px] bg-primary/20 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Free Tools to
            <span className="block text-primary">Strengthen Your Finances</span>
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical templates, calculators, and step-by-step guides to help
            you make smarter financial decisions.
          </p>
        </div>
      </section>

      {/* ================= FEATURED RESOURCE ================= */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center bg-card border border-border rounded-3xl p-10 shadow-sm">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium">
              Most Downloaded
            </div>

            <h2 className="text-3xl font-bold">Monthly Budget Template</h2>

            <p className="text-muted-foreground">
              A clean and structured Excel template designed to help you track
              income, expenses, and savings goals with clarity.
            </p>

            <Link download href="/files/Monthly_Budget_Template.xlsx">
              <Button variant="premium" size="lg">
                <Download className="mr-2 h-4 w-4" />
                Download Free Template
              </Button>
            </Link>
          </div>

          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image
              src="/budgeting.jpg"
              alt="Monthly Budget Template"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= TOOLS GRID ================= */}
      <section className="container mx-auto px-4 md:px-6 mb-28">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Financial Calculators
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Savings Calculator",
              description:
                "Estimate how much to save monthly to reach your financial goals.",
              href: "/tools/savings-calculator",
              image: "/savings-calculator.jpg",
            },
            {
              title: "Net Worth Calculator",
              description:
                "Track assets and liabilities to measure your financial health.",
              href: "/tools/net-worth-calculator",
              image: "/net-worth.jpg",
            },
            {
              title: "Investment Calculator",
              description:
                "Visualize compound growth and long-term wealth potential.",
              href: "/tools/investment-calculator",
              image: "/investment-calculator.jpg",
            },
          ].map((tool, index) => (
            <div
              key={index}
              className="
                group relative bg-card border border-border
                rounded-2xl overflow-hidden shadow-sm
                hover:shadow-xl hover:-translate-y-1
                transition-all duration-300
              "
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={tool.image}
                  alt={tool.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center mb-3">
                  <Calculator className="h-5 w-5 text-primary mr-2" />
                  <span className="text-sm text-muted-foreground">
                    Online Tool
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-3">{tool.title}</h3>

                <p className="text-muted-foreground mb-6">{tool.description}</p>

                <Button href={tool.href} variant="outline" className="w-full">
                  Use Calculator
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= GUIDES ================= */}
      <section className="container mx-auto px-4 md:px-6 pb-32">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Financial Guides
          </h2>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-1"
              className="bg-card border border-border hover:border-primary rounded-xl px-6"
            >
              <AccordionTrigger className="text-primary">
                How to Recover Your CSCS Number
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                  <li>
                    <strong>Check Old Documents or Emails</strong> – Look
                    through old emails, contract notes or statements from your
                    former stockbroker.
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
                      <li>
                        Full name (as registered with your previous broker)
                      </li>
                      <li>BVN or registered phone number</li>
                      <li>The name of your former stockbroker</li>
                      <li>Any old account statements (if available)</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Visit a Stockbroker for Assistance</strong> – They
                    can help you recover it using your details mentioned above.
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

            <AccordionItem
              value="item-2"
              className="bg-card border border-border hover:border-primary rounded-xl px-6"
            >
              <AccordionTrigger className="text-primary">
                How to Claim Your Unclaimed Dividends in Nigeria
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                <p className="mb-2 text-muted-foreground">
                  Unclaimed dividends are a growing concern. Here's how to
                  recover them and ensure you receive future ones.
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
                    and search your name to see a list of companies and
                    registrars holding your dividends.
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

            <AccordionItem
              value="item-3"
              className="bg-card border border-border hover:border-primary rounded-xl px-6"
            >
              <AccordionTrigger className="text-primary">
                Join Our Free Telegram Community
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                Connect with others, attend book clubs, ask financial questions,
                and access curated investment resources.
                <div className="mt-4">
                  <a
                    href="https://t.me/+SNSQzX94_Gk1M2M0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Join the Community →
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </main>
  );
}
