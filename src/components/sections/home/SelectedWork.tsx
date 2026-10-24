import Link from "next/link";
import { COPY, PROJECTS, UI } from "@/constants/constant";
import { fillTemplate } from "@/utils/format";
import Carousel from "@/components/ui/Carousel";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import ProjectTile from "./ProjectTile";

/** Latest projects: a swipe carousel on phones and tablets, a row of three on desktop. */
export default function SelectedWork() {
  const { work } = COPY.home;

  return (
    <section id="work" className="container-site section scroll-mt-24">
      <SectionHeader
        eyebrow={work.eyebrow}
        title={work.title}
        highlight={work.highlight}
        action={
          <Link href="/projects" className="arrow-link text-sm">
            {fillTemplate(work.all, { count: String(PROJECTS.length) })} <Icon name="arrowUpRight" />
          </Link>
        }
      />
      <Reveal variant="fade-up" className="mt-8 md:mt-10">
        <Carousel label={work.carouselLabel} desktopCols="lg:grid-cols-3">
          {PROJECTS.slice(0, UI.homeProjects).map((project) => (
            <ProjectTile key={project.slug} project={project} />
          ))}
        </Carousel>
      </Reveal>
    </section>
  );
}
