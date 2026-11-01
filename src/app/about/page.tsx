import { COPY, PAGE_META, RESUME } from "@/constants/constant";
import { pageMeta } from "@/lib/seo";
import CtaPanel from "@/components/ui/CtaPanel";
import Icon from "@/components/ui/Icon";
import PageHero from "@/components/ui/PageHero";
import AboutIntro from "@/components/sections/about/AboutIntro";
import BeyondSection from "@/components/sections/about/BeyondSection";
import JourneySection from "@/components/sections/about/JourneySection";

export const metadata = pageMeta(PAGE_META.about);

export default function About() {
  const { hero, cta, resume } = COPY.about;

  return (
    <>
      <PageHero {...hero}>
        <a href={RESUME.href} download={RESUME.fileName} className="btn-primary">
          <Icon name="download" /> {resume}
        </a>
      </PageHero>
      <AboutIntro />
      <JourneySection />
      <BeyondSection />
      <CtaPanel title={cta} />
    </>
  );
}
