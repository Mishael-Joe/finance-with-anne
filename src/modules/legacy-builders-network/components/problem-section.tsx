export default function ProblemSection() {
  const problems = [
    "You've been saving, but your money isn't really growing.",
    "You want to invest, but you're overwhelmed by too many options.",
    "You're scared of losing money to scammers or bad advice.",
    "You wish you had someone to guide you and a community that 'gets it.'",
  ];

  return (
    <section className="pt-10 md:pt-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 flex flex-col items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
          Does this sound familiar?
        </h1>

        <div className="space-y-4 mb-8">
          {problems.map((problem, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-3 mr-4"></div>
              <p className="text-lg text-gray-700">{problem}</p>
            </div>
          ))}
        </div>

        <p className="font-bold text-black opacity-70 mb-12">
          Truth is: the wealthy don't work better. They make smarter moves with
          their money. And that's exactly what you'll learn here.
        </p>
      </div>
    </section>
  );
}
