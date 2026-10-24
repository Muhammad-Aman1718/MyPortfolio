import { testimonialStrip } from "@/utils/content";
import AboutSection from "@/components/sections/home/AboutSection";
import FaqSection from "@/components/sections/home/FaqSection";
import FeaturedQuote from "@/components/sections/home/FeaturedQuote";
import HeroSection from "@/components/sections/home/HeroSection";
import ProofStrip from "@/components/sections/home/ProofStrip";
import SelectedWork from "@/components/sections/home/SelectedWork";
import ServicesSection from "@/components/sections/home/ServicesSection";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";

export default function Home() {
  const { featured, loop } = testimonialStrip();

  return (
    <>
      <HeroSection />
      <ProofStrip />
      <SelectedWork />
      <FeaturedQuote testimonial={featured} />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection loop={loop} />
      <FaqSection />
    </>
  );
}
