import { COPY, PAGE_META, SKILL_GROUPS } from "@/constants/constant";
import { pageMeta } from "@/lib/seo";
import CtaPanel from "@/components/ui/CtaPanel";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import DailyStack from "@/components/skills/DailyStack";
import SkillsExplorer from "@/components/skills/SkillsExplorer";

export const metadata = pageMeta(PAGE_META.skills);

export default function Skills() {
  const { hero, cta } = COPY.skills;

  return (
    <>
      <PageHero {...hero} />

      <div className="container-site pb-6">
        <Reveal variant="fade-up">
          <SkillsExplorer groups={SKILL_GROUPS} />
        </Reveal>
      </div>

      <DailyStack />

      <CtaPanel title={cta.title} description={cta.description} />
    </>
  );
}
