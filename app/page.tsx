import BgGradient from "@/components/common/bg-gradient";
import HeroSection from "@/components/Home/Hero";
import DemoSection from "@/components/Home/Demo";
import Works from "@/components/Home/Works";
import { PricingSection } from "@/components/Home/PricingSection";
import { Footer } from "@/components/Home/Footer";
import Cta_section from "@/components/Home/Cta_section";
export default function Home() {
  return (
    <div className="relative w-full  min-h-screen">
      <div className="flex flex-col">
        <HeroSection />
        <Works />
        <PricingSection />
        <Cta_section />
        <Footer />

      </div>
    </div>
  );
}
