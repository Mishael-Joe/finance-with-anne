import Benefits from "@/modules/legacy-builders-network/components/benefits";
import Hero from "@/modules/legacy-builders-network/components/hero";
import ProblemSection from "@/modules/legacy-builders-network/components/problem-section";
import Testimonials from "@/modules/legacy-builders-network/components/testimonials";
import { Metadata } from "next";
import CommunityIntro from "@/modules/legacy-builders-network/components/community-intro";
import SubscriptionPage from "@/modules/legacy-builders-network/components/subscrition-intro";

export const metadata: Metadata = {
  title: "Legacy Builders Network - Premium Investment Community",
  description: "The support you need. The investment guidance you deserve.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemSection />
      <CommunityIntro />
      <Benefits />
      <SubscriptionPage />
      <Testimonials />
    </main>
  );
}
