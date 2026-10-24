import { COPY, PAGE_META } from "@/constants/constant";
import { pageMeta } from "@/lib/seo";
import CtaPanel from "@/components/ui/CtaPanel";
import PageHero from "@/components/ui/PageHero";
import AboutIntro from "@/components/sections/about/AboutIntro";
import BeyondSection from "@/components/sections/about/BeyondSection";
import JourneySection from "@/components/sections/about/JourneySection";

export const metadata = pageMeta(PAGE_META.about);

export default function About() {
  const { hero, cta } = COPY.about;

  return (
    <>
      <PageHero {...hero} />
      <AboutIntro />
      <JourneySection />
      <BeyondSection />
      <CtaPanel title={cta} />
    </>
  );
}
