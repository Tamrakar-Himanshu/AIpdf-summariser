import HeroSection from "@/components/Home/Hero";
import Works from "@/components/Home/Works";
import { PricingSection } from "@/components/Home/PricingSection";
import Cta_section from "@/components/Home/Cta_section";
export default function Home() {
  return (
    <div className="relative w-full ">
      <div className="flex flex-col">
        <HeroSection />
        <Works />
        <PricingSection />
        <Cta_section />
      </div>
    </div>
  );
}
