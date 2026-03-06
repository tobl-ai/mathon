import type { Risk } from "@/lib/prd-data";

interface RiskTableProps {
  risks: Risk[];
}

const impactBadge: Record<string, string> = {
  "높음": "badge-p0",
  "중간": "badge-p1",
  "낮음": "text-success bg-success/10",
};

export function RiskTable({ risks }: RiskTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-4 py-3 text-xs font-medium text-muted">리스크</th>
            <th className="px-4 py-3 text-xs font-medium text-muted">영향도</th>
            <th className="px-4 py-3 text-xs font-medium text-muted">대응 방안</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((r) => (
            <tr key={r.risk} className="border-t border-border-subtle table-row-hover transition-colors">
              <td className="px-4 py-3 font-medium">{r.risk}</td>
              <td className="px-4 py-3">
                <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${impactBadge[r.impact]}`}>
                  {r.impact}
                </span>
              </td>
              <td className="px-4 py-3 text-muted">{r.mitigation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
