import type { Feature } from "@/lib/prd-data";

interface FeatureTableProps {
  title: string;
  features: Feature[];
}

const priorityColor: Record<string, string> = {
  P0: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  P1: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  P2: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
};

export function FeatureTable({ title, features }: FeatureTableProps) {
  return (
    <div className="mb-8">
      <h3 className="mb-3 text-lg font-semibold">{title}</h3>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="px-4 py-2.5 font-medium">ID</th>
              <th className="px-4 py-2.5 font-medium">기능</th>
              <th className="px-4 py-2.5 font-medium">우선순위</th>
              <th className="px-4 py-2.5 font-medium">설명</th>
            </tr>
          </thead>
          <tbody>
            {features.map((f) => (
              <tr key={f.id} className="border-t border-border">
                <td className="px-4 py-2.5 font-mono text-xs text-muted">{f.id}</td>
                <td className="px-4 py-2.5 font-medium">{f.name}</td>
                <td className="px-4 py-2.5">
                  <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${priorityColor[f.priority]}`}>
                    {f.priority}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-muted">{f.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
