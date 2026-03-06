import type { Feature } from "@/lib/prd-data";

interface FeatureTableProps {
  title: string;
  features: Feature[];
}

const priorityBadge: Record<string, string> = {
  P0: "badge-p0",
  P1: "badge-p1",
  P2: "badge-p2",
};

export function FeatureTable({ title, features }: FeatureTableProps) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 font-mono text-xs font-medium text-muted">ID</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">기능</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">우선순위</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">설명</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f) => (
              <tr key={f.id} className="border-t border-border-subtle table-row-hover transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted">{f.id}</td>
                <td className="px-4 py-3 font-medium">{f.name}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${priorityBadge[f.priority]}`}>
                    {f.priority}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{f.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
