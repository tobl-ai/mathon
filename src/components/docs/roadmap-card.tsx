import type { RoadmapPhase } from "@/lib/prd-data";

interface RoadmapCardProps {
  phase: RoadmapPhase;
  index: number;
}

const phaseColors = [
  "border-l-blue-500",
  "border-l-green-500",
  "border-l-purple-500",
  "border-l-orange-500",
];

export function RoadmapCard({ phase, index }: RoadmapCardProps) {
  return (
    <div className={`rounded-lg border border-border border-l-4 ${phaseColors[index]} p-5`}>
      <div className="mb-1 text-xs font-medium text-muted">{phase.phase}</div>
      <h3 className="mb-1 text-lg font-bold">{phase.title}</h3>
      <div className="mb-3 text-sm text-accent">{phase.period}</div>
      <ul className="space-y-1.5">
        {phase.items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
