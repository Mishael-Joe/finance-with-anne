import { Great_Vibes } from "next/font/google";
import Image from "next/image";

const GreatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });

export default function SubscriptionIntro() {
  const whatTheGroupDoes = [
    "Break down where to put your money right now (and where to pull out fast)",
    "Host monthly webinars with me + guest experts",
    "Share exclusive analysis you won't find on YouTube or Google",
    'Give beginners a solid foundation with our "step-by-step investors course"',
  ];

  return (
    <section className="bg-primary text-white">
      <div className="text-center py-12">
        {/* Heading Section */}
        <h3
          className={`text-2xl md:text-5xl font-bold mb-4 ${GreatVibes.className}`}
        >
          Welcome to the
        </h3>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          LEGACY BUILDERS NETWORK
        </h2>

        {/* Full-screen Image Section */}
        <div className="w-full h-[30vh] sm:h-[45vh] md:h-[60vh] lg:h-[70vh] relative my-12">
          <Image
            src="/wealth-building.jpg"
            alt="LEGACY BUILDERS NETWORK"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Description and Bullet Points */}
        <p className="text-xl pb-6 font-semibold max-w-4xl mx-auto px-4">
          This isn't just another group chat. It's a high-level circle where we:
        </p>

        <div className="space-y-4 mb-12 max-w-2xl mx-auto px-4">
          {whatTheGroupDoes.map((whatWeDo, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-3 mr-4"></div>
              <p className="text-lg text-left">{whatWeDo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
