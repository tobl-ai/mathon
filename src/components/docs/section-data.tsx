import { Section } from "./section";

const DATA_SOURCES = [
  { source: "시중 문제집", method: "PDF 디지털화 + AI 태깅", priority: "P0" },
  { source: "학교 시험지", method: "교사 업로드 (포인트 인센티브)", priority: "P1" },
  { source: "AI 생성", method: "기존 문제 기반 변형 문제 대량 생성", priority: "P0" },
  { source: "교사 기여", method: "직접 제작 문제 공유", priority: "P2" },
];

const priorityBadge: Record<string, string> = {
  P0: "badge-p0",
  P1: "badge-p1",
  P2: "badge-p2",
};

export function SectionData() {
  return (
    <Section id="data" title="7. 데이터 전략">
      <h3 className="mb-3 text-lg font-semibold">문제 데이터 확보</h3>
      <div className="mb-8 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 text-xs font-medium text-muted">소스</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">방법</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">우선순위</th>
            </tr>
          </thead>
          <tbody>
            {DATA_SOURCES.map((d) => (
              <tr key={d.source} className="border-t border-border-subtle table-row-hover transition-colors">
                <td className="px-4 py-3 font-medium">{d.source}</td>
                <td className="px-4 py-3 text-muted">{d.method}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-md px-2 py-0.5 text-xs font-semibold ${priorityBadge[d.priority]}`}>
                    {d.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold">데이터 구조</h3>
      <pre className="overflow-x-auto rounded-xl border border-border bg-surface p-5 font-mono text-xs leading-loose">
        <span className="text-muted">{"// TypeScript Interface"}</span>
{`
`}<span className="text-[#C678DD]">interface</span>{" "}<span className="text-accent">MathProblem</span>{" {"}{`
  `}<span className="text-foreground">id</span>: <span className="text-success">string</span>;
{`  `}<span className="text-foreground">content</span>: <span className="text-success">string</span>;           <span className="text-muted">{"// 문제 텍스트 (LaTeX 포함)"}</span>
{`  `}<span className="text-foreground">images</span>: <span className="text-success">string</span>[];
{`  `}<span className="text-foreground">solution</span>: <span className="text-success">string</span>;
{`  `}<span className="text-foreground">answer</span>: <span className="text-success">string</span>;
{`  `}<span className="text-foreground">difficulty</span>: <span className="text-accent">1 | 2 | 3 | 4 | 5</span>;
{`  `}<span className="text-foreground">category</span>: <span className="text-success">string</span>;          <span className="text-muted">{"// 대단원"}</span>
{`  `}<span className="text-foreground">subcategory</span>: <span className="text-success">string</span>;       <span className="text-muted">{"// 소단원"}</span>
{`  `}<span className="text-foreground">concepts</span>: <span className="text-success">string</span>[];        <span className="text-muted">{"// 관련 개념 태그"}</span>
{`  `}<span className="text-foreground">gradeLevel</span>: <span className="text-success">string</span>;
{`  `}<span className="text-foreground">source</span>: <span className="text-success">string</span>;
{`  `}<span className="text-foreground">verified</span>: <span className="text-accent">boolean</span>;
{"}"}</pre>
    </Section>
  );
}
