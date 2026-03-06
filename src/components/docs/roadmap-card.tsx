import type { RoadmapPhase } from "@/lib/prd-data";

interface RoadmapCardProps {
  phase: RoadmapPhase;
  index: number;
}

const accentColors = [
  "border-l-accent",
  "border-l-success",
  "border-l-[#818CF8]",
  "border-l-[#F97316]",
];

export function RoadmapCard({ phase, index }: RoadmapCardProps) {
  return (
    <div className={`rounded-xl border border-border border-l-2 ${accentColors[index]} bg-card p-5 card-hover`}>
      <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">
        {phase.phase}
      </div>
      <h3 className="mb-1 font-display text-xl">{phase.title}</h3>
      <div className="mb-4 text-sm text-accent">{phase.period}</div>
      <ul className="space-y-2">
        {phase.items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted/50" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
