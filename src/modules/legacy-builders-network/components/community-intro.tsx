import { Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CommunityIntro() {
  const whatTheGroupDoes = [
    {
      id: 1,
      headerText: "Stock Signals",
      content:
        "Stay ahead of the market with monthly and timely stock recommendations. Know what to buy, when to buy and when to take profit.",
    },
    {
      id: 2,
      headerText: "Smart Money Moves",
      content:
        "Break down where to put your money right now (and where to pull out fast).",
    },
    {
      id: 3,
      headerText: "Expert Sessions",
      content: "Host monthly webinars with me + guest experts",
    },
    {
      id: 4,
      headerText: "Exclusive Analysis",
      content: "Share exclusive analysis you won't find on YouTube or Google",
    },
    {
      id: 5,
      headerText: "Foundation Building",
      content:
        "Give beginners a solid foundation with our step-by-step investor's course.",
    },
  ];

  return (
    <section className="py-8 xs:py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-8">
        {/* Heading Section */}
        <div className="w-full flex flex-col items-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          <div className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 rounded-full bg-secondary/20 flex items-center justify-center">
            <Users className="text-secondary h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 font-bold" />
          </div>
          <h3 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mt-3 xs:mt-4 text-center">
            Welcome to
          </h3>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mt-1 xs:mt-2 text-center">
            LEGACY BUILDERS NETWORK
          </h2>
        </div>

        {/* Description */}
        <p className="text-base xs:text-lg sm:text-xl md:text-xl font-semibold text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12 max-w-3xl mx-auto px-2 xs:px-4">
          This isn't just another group chat. It's a high-level circle where we:
        </p>

        {/* Cards Grid */}
        <div className="mb-6 xs:mb-8 sm:mb-10 md:mb-12">
          <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5 md:gap-6">
            {whatTheGroupDoes.map((whatWeDo, index) => (
              <Card
                key={index}
                className={`hover:shadow-md transition-shadow duration-300 ${
                  index === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <CardHeader className="pb-2 xs:pb-3 sm:pb-4">
                  <div className="w-full flex flex-col items-start">
                    <div className="w-7 h-7 xs:w-8 xs:h-8 sm:w-9 sm:h-9 bg-secondary text-black flex items-center justify-center rounded mb-2 xs:mb-3 font-semibold text-sm xs:text-base">
                      {whatWeDo.id}
                    </div>
                    <div className="font-bold text-lg xs:text-xl sm:text-xl md:text-2xl">
                      {whatWeDo.headerText}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="font-semibold text-start text-sm xs:text-base sm:text-lg md:text-lg text-gray-700 leading-relaxed">
                  {whatWeDo.content}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
