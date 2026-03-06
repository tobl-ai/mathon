import { Section } from "./section";
import { QuoteBlock } from "./quote-block";
import { QUOTES } from "@/lib/prd-data";

const COMPARISON = [
  { feature: "HWPX 출력", mathon: true, questai: "partial", mathflat: false, mathsecretary: false },
  { feature: "AI 변형", mathon: true, questai: true, mathflat: false, mathsecretary: false },
  { feature: "교차검증", mathon: true, questai: false, mathflat: false, mathsecretary: false },
  { feature: "문제은행", mathon: true, questai: false, mathflat: true, mathsecretary: true },
  { feature: "교재연동", mathon: true, questai: false, mathflat: true, mathsecretary: "partial" },
  { feature: "미주처리", mathon: true, questai: false, mathflat: false, mathsecretary: false },
  { feature: "편집가능수식", mathon: true, questai: false, mathflat: false, mathsecretary: false },
];

function StatusIcon({ value }: { value: boolean | string }) {
  if (value === true)
    return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-xs text-success">O</span>;
  if (value === "partial")
    return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-warning/15 text-xs text-warning">△</span>;
  return <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-danger/15 text-xs text-danger">X</span>;
}

export function SectionAppendix() {
  return (
    <Section id="appendix" title="12. 부록">
      <h3 className="mb-3 text-lg font-semibold">경쟁사 비교 분석</h3>
      <div className="mb-10 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 text-left text-xs font-medium text-muted">기능</th>
              <th className="px-4 py-3 text-xs font-medium text-accent">매스온</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">퀘스티아이</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">매스플랫</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">수학비서</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((c) => (
              <tr key={c.feature} className="border-t border-border-subtle table-row-hover transition-colors">
                <td className="px-4 py-3 text-left font-medium">{c.feature}</td>
                <td className="px-4 py-3"><StatusIcon value={c.mathon} /></td>
                <td className="px-4 py-3"><StatusIcon value={c.questai} /></td>
                <td className="px-4 py-3"><StatusIcon value={c.mathflat} /></td>
                <td className="px-4 py-3"><StatusIcon value={c.mathsecretary} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-4 text-lg font-semibold">핵심 사용자 인사이트</h3>
      <QuoteBlock quotes={QUOTES} />

      <div className="mt-12 border-t border-border pt-6 text-center">
        <p className="text-xs text-muted">
          v2.0 (2026-03-06) · HWPX 출력, 멀티 AI 교차 검증, 문제 수정 루프 추가
        </p>
      </div>
    </Section>
  );
}
