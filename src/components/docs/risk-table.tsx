import type { Risk } from "@/lib/prd-data";

interface RiskTableProps {
  risks: Risk[];
}

const impactColor: Record<string, string> = {
  "높음": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  "중간": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  "낮음": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
};

export function RiskTable({ risks }: RiskTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-surface text-left">
          <tr>
            <th className="px-4 py-2.5 font-medium">리스크</th>
            <th className="px-4 py-2.5 font-medium">영향도</th>
            <th className="px-4 py-2.5 font-medium">대응 방안</th>
          </tr>
        </thead>
        <tbody>
          {risks.map((r) => (
            <tr key={r.risk} className="border-t border-border">
              <td className="px-4 py-2.5 font-medium">{r.risk}</td>
              <td className="px-4 py-2.5">
                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${impactColor[r.impact]}`}>
                  {r.impact}
                </span>
              </td>
              <td className="px-4 py-2.5 text-muted">{r.mitigation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
