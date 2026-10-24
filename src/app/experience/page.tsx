import Link from "next/link";
import { COPY, PAGE_META } from "@/constants/constant";
import { pageMeta } from "@/lib/seo";
import { experienceProfile } from "@/lib/structuredData";
import { experienceByCompany } from "@/utils/content";
import CtaPanel from "@/components/ui/CtaPanel";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/ui/JsonLd";
import PageHero from "@/components/ui/PageHero";
import CompanyCard from "@/components/sections/experience/CompanyCard";

export const metadata = pageMeta(PAGE_META.experience);

export default function Experience() {
  const { hero, hire, cta } = COPY.experience;

  return (
    <>
      <JsonLd data={experienceProfile()} />

      <PageHero {...hero}>
        <Link href="/contact" className="btn-primary">
          {hire} <Icon name="arrowRight" />
        </Link>
      </PageHero>

      <div className="container-site pb-6">
        <ol className="flex flex-col gap-4">
          {experienceByCompany.map((company) => (
            <CompanyCard key={company.company} company={company} />
          ))}
        </ol>
      </div>

      <CtaPanel title={cta} />
    </>
  );
}
