import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "A. Adekunle",
    quote:
      "Very excellent and professional. Attended to all my questions and provided practical steps to improve my finance.",
  },
  {
    name: "C. Mbakigwe",
    quote:
      "Engaging with Anne has been an eye opener. Her advice is relatable and practical.",
  },
  {
    name: "O. Okulaja",
    quote:
      "Coach Anne is a practical financial advisor with vast investment acumen. Her wisdom is a gift.",
  },
  {
    name: " C. Miracle",
    quote:
      "Thank you very much for today's class i feel so strong that my journey to financial freedom just began i feel so excited right now i dont think i can thank you enough, Thank you very much God bless you.",
  },
  {
    name: "O. Toyin",
    quote:
      " Engaging with Anne has been an eye opener. Her guidance and advice are born out of experience of someone who can relate to the everyday challenges of an average person trying to navigate the personal finance journey.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-8 xs:py-10 sm:py-12 md:py-16 px-4 xs:px-5 sm:px-6 md:px-8 bg-white">
      <div className="w-full text-center mb-6 xs:mb-8 sm:mb-10 md:mb-12">
        <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 xs:mb-3 text-black">
          Don't just take my word for it
        </h1>
        <p className="text-xs xs:text-sm sm:text-base text-gray-700">
          Here's what my clients have to say about working with me
        </p>
      </div>
      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className={cn(
              "border p-4 xs:p-5 sm:p-6 rounded shadow-sm",
              idx === testimonials.length - 1 && "sm:col-span-2 lg:col-span-1"
            )}
          >
            <div className="flex mb-3 xs:mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 fill-current text-secondary-light"
                />
              ))}
            </div>
            <p className="italic text-sm xs:text-base sm:text-lg leading-relaxed">
              "{t.quote}"
            </p>
            <p className="mt-3 xs:mt-4 font-bold text-left text-sm xs:text-base">
              {t.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
