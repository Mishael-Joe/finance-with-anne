import { Card, CardContent } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";

export default function ProblemSection() {
  const problems = [
    "You've been saving, but your money isn't really growing.",
    "You want to invest, but you're overwhelmed by too many options.",
    "You're scared of losing money to scammers or bad advice.",
    "You wish you had someone to guide you and a community that 'gets it.'",
  ];

  return (
    <section className="py-8 xs:py-12 sm:py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-8 flex flex-col items-center">
        {/* Heading */}
        <h1 className="text-2xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-black mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          Does this sound familiar?
        </h1>

        {/* Cards Grid */}
        <div className="w-full mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
            {problems.map((problem, index) => (
              <Card
                key={index}
                className="hover:shadow-md transition-shadow duration-300"
              >
                <CardContent className="p-3 xs:p-4 sm:p-5 md:p-6">
                  <div className="flex items-start gap-3 xs:gap-4">
                    <div className="flex-shrink-0 mt-0.5 xs:mt-1">
                      <InfoIcon className="w-5 h-5 xs:w-6 xs:h-6 sm:w-6 sm:h-6 md:w-7 md:h-7 text-secondary flex-shrink-0 rotate-180" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-base xs:text-lg sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                        {problem}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="w-full text-center mt-4 xs:mt-6 sm:mt-8">
          <h2 className="text-xl xs:text-2xl sm:text-2xl md:text-3xl font-bold text-black mb-2 xs:mb-3 sm:mb-4">
            Truth is: the wealthy don't work harder.
          </h2>
          <p className="text-base xs:text-lg sm:text-lg md:text-xl text-black opacity-70 max-w-2xl mx-auto leading-relaxed">
            They make smarter moves with their money. And that's exactly what
            you'll learn here.
          </p>
        </div>
      </div>
    </section>
  );
}
