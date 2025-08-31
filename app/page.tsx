import BgGradient from "@/components/common/bg-gradient";
import HeroSection from "@/components/Home/Hero";
import DemoSection from "@/components/Home/Demo";
import Works from "@/components/Home/Works";
import { PricingSection } from "@/components/Home/PricingSection";
import { Footer } from "@/components/Home/Footer";
import Cta_section from "@/components/Home/Cta_section";
export default function Home() {
  return (
    <div className="relative w-full bg-linear-to-r from-amber-100 via-rose-50 to-amber-100">
      {/* <BgGradient /> */}
      <div className="flex flex-col">
        <HeroSection />
        <Works />
        <PricingSection />
        <Footer />
        <Cta_section />
      </div>
    </div>
  );
}
