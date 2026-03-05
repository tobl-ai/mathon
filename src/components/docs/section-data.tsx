import { Section } from "./section";

const DATA_SOURCES = [
  { source: "시중 문제집", method: "PDF 디지털화 + AI 태깅", priority: "P0" },
  { source: "학교 시험지", method: "교사 업로드 (포인트 인센티브)", priority: "P1" },
  { source: "AI 생성", method: "기존 문제 기반 변형 문제 대량 생성", priority: "P0" },
  { source: "교사 기여", method: "직접 제작 문제 공유", priority: "P2" },
];

export function SectionData() {
  return (
    <Section id="data" title="7. 데이터 전략">
      <h3 className="mb-3 text-lg font-semibold">문제 데이터 확보</h3>
      <div className="mb-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="px-4 py-2.5 font-medium">소스</th>
              <th className="px-4 py-2.5 font-medium">방법</th>
              <th className="px-4 py-2.5 font-medium">우선순위</th>
            </tr>
          </thead>
          <tbody>
            {DATA_SOURCES.map((d) => (
              <tr key={d.source} className="border-t border-border">
                <td className="px-4 py-2.5 font-medium">{d.source}</td>
                <td className="px-4 py-2.5 text-muted">{d.method}</td>
                <td className="px-4 py-2.5">
                  <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                    {d.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold">데이터 구조</h3>
      <pre className="overflow-x-auto rounded-lg bg-surface p-4 font-mono text-xs leading-relaxed">
{`interface MathProblem {
  id: string;
  content: string;           // 문제 텍스트 (LaTeX 포함)
  images: string[];          // 수식/도형 이미지
  solution: string;          // 해설
  answer: string;            // 정답
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: string;          // 대단원
  subcategory: string;       // 소단원
  concepts: string[];        // 관련 개념 태그
  gradeLevel: string;        // 학년
  source: string;            // 출처
  verified: boolean;         // 검증 여부
}`}
      </pre>
    </Section>
  );
}
