import {
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Users,
  VideoIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Benefits() {
  const benefits = [
    {
      icon: <VideoIcon />,
      headerText: "Monthly Webinars with Anne",
      content:
        " Live sessions where you can ask questions and learn directly from me",
      contents: "Monthly Webinars with Anne.",
    },
    {
      icon: <TrendingUp />,
      headerText: "Market Analysis Breakdown",
      content:
        "Stocks, bonds, T-bills, real estate all analyzed and explained.",
    },
    {
      icon: <Users />,
      headerText: "Guest Experts",
      content:
        "Learn from industry professionals across various investment sectors",
      contents: "Guest Experts from across industries.",
    },
    {
      icon: <BookOpen />,
      headerText: " Beginners Investment Course",
      content:
        " Start with a solid foundation perfect for those just getting started",
      contents: "Beginners Investment Course (start strong)",
    },
    {
      icon: <CheckCircle2 />,
      headerText: " Vetted Strategies",
      content: " Access insider-level opportunities and proven strategies.",
    },
  ];

  return (
    <section className="py-8 xs:py-12 sm:py-16 md:py-20 lg:py-24 bg-primary">
      <div className="max-w-4xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Heading Section */}
        <div className="w-full flex flex-col items-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1 xs:mt-2 text-center">
            What You Will Get
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className={`hover:shadow-md transition-shadow duration-300 border-secondary ${
                  index === benefits.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <CardHeader className="pb-2 xs:pb-3 sm:pb-4">
                  <div className="w-full flex flex-col items-start">
                    <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 bg-secondary text-black flex items-center justify-center rounded mb-2 xs:mb-3 font-semibold text-sm xs:text-base">
                      {benefit.icon}
                    </div>
                    <div className="font-bold text-lg xs:text-xl sm:text-xl md:text-2xl">
                      {benefit.headerText}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="font-semibold text-start text-sm xs:text-base sm:text-lg md:text-lg text-gray-700 leading-relaxed">
                  {benefit.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
