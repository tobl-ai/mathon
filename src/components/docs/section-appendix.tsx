import { Section } from "./section";
import { QuoteBlock } from "./quote-block";
import { QUOTES } from "@/lib/prd-data";

const COMPARISON = [
  { feature: "HWP 출력", mathon: true, questai: "partial", mathflat: false, mathsecretary: false },
  { feature: "AI 변형", mathon: true, questai: true, mathflat: false, mathsecretary: false },
  { feature: "문제은행", mathon: true, questai: false, mathflat: true, mathsecretary: true },
  { feature: "교재연동", mathon: true, questai: false, mathflat: true, mathsecretary: "partial" },
  { feature: "미주처리", mathon: true, questai: false, mathflat: false, mathsecretary: false },
  { feature: "편집가능", mathon: true, questai: "partial", mathflat: false, mathsecretary: false },
];

function StatusIcon({ value }: { value: boolean | string }) {
  if (value === true) return <span className="text-green-600 dark:text-green-400">O</span>;
  if (value === "partial") return <span className="text-yellow-600 dark:text-yellow-400">△</span>;
  return <span className="text-red-500 dark:text-red-400">X</span>;
}

export function SectionAppendix() {
  return (
    <Section id="appendix" title="12. 부록">
      <h3 className="mb-3 text-lg font-semibold">경쟁사 비교 분석</h3>
      <div className="mb-8 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-center text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="px-4 py-2.5 text-left font-medium">기능</th>
              <th className="px-4 py-2.5 font-medium">매스온</th>
              <th className="px-4 py-2.5 font-medium">퀘스티아이</th>
              <th className="px-4 py-2.5 font-medium">매스플랫</th>
              <th className="px-4 py-2.5 font-medium">수학비서</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((c) => (
              <tr key={c.feature} className="border-t border-border">
                <td className="px-4 py-2.5 text-left font-medium">{c.feature}</td>
                <td className="px-4 py-2.5 font-bold"><StatusIcon value={c.mathon} /></td>
                <td className="px-4 py-2.5"><StatusIcon value={c.questai} /></td>
                <td className="px-4 py-2.5"><StatusIcon value={c.mathflat} /></td>
                <td className="px-4 py-2.5"><StatusIcon value={c.mathsecretary} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold">핵심 사용자 인사이트</h3>
      <QuoteBlock quotes={QUOTES} />

      <p className="mt-8 text-center text-xs text-muted">
        이 문서는 2026-03-05 컨설팅 미팅 내용을 기반으로 작성되었습니다.
      </p>
    </Section>
  );
}
