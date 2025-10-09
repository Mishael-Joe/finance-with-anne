import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";

export default function Benefits() {
  const benefits = [
    "Monthly Webinars with Anne.",
    "Market Analysis Breakdown (stocks, bonds, T-bills, real estate).",
    "Guest Experts from across industries.",
    "Beginners Investment Course (start strong).",
    "Access to insider-level opportunities & vetted strategies.",
  ];

  return (
    <section className="py-12 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        JOIN THE COMMUNITY
      </h2>

      <div className="flex flex-col pt-12 w-full">
        <div className="py-4 px-20 -mb-1 flex flex-col gap-2 border-2 border-primary font-bold max-w-md mx-auto">
          <p className="text-lg">Annual</p>
          <p className="text-2xl text-primary">₦150,000</p>
          <p className="text-xs">Paid Annually</p>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-0">
          <h2 className="text-3xl w-full font-bold text-center bg-primary p-3 text-white">
            What you will get (Benefits)
          </h2>

          <div className="grid gap-6 -mt-0.5 border-2 p-14">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start justify-center sm:justify-start sm:items-center gap-2"
              >
                <CheckIcon className="text-primary hidden sm:inline-flex" />
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button className="bg-primary text-white text-2xl lg:text-3xl px-10 py-4 lg:py-8 rounded hover:bg-primary-light/90 mt-8">
        Subscribe Now
      </Button>
    </section>
  );
}
