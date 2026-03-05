import { Section } from "./section";
import { RoadmapCard } from "./roadmap-card";
import { ROADMAP } from "@/lib/prd-data";

export function SectionRoadmap() {
  return (
    <Section id="roadmap" title="8. 로드맵">
      <div className="grid gap-4 sm:grid-cols-2">
        {ROADMAP.map((phase, i) => (
          <RoadmapCard key={phase.phase} phase={phase} index={i} />
        ))}
      </div>
    </Section>
  );
}
