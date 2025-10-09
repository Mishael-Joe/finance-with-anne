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
];

export default function Testimonials() {
  return (
    <section className="py-12 px-4 bg-white">
      <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-primary">
        Don’t just take my word for it…
      </h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((t, idx) => (
          <div key={idx} className="border p-4 rounded shadow-sm">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-current text-secondary-light"
                />
              ))}
            </div>
            <p className="italic">“{t.quote}”</p>
            <p className="mt-2 font-bold text-right">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
