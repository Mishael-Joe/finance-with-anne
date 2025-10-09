import Benefits from "@/modules/legacy-builders-network/components/benefits";
import Hero from "@/modules/legacy-builders-network/components/hero";
import ProblemSection from "@/modules/legacy-builders-network/components/problem-section";
import SubscriptionIntro from "@/modules/legacy-builders-network/components/subscription-intro";
import Testimonials from "@/modules/legacy-builders-network/components/testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legacy Builders Network - Premium Investment Community",
  description: "The support you need. The investment guidance you deserve.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemSection />
      <SubscriptionIntro />
      <Benefits />
      <Testimonials />
    </main>
  );
}
