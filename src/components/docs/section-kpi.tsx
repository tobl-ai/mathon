import { Section } from "./section";

const MVP_KPI = [
  { metric: "문제 생성 정확도 (오답률)", target: "< 1%" },
  { metric: "수식 OCR 인식률", target: "> 99%" },
  { metric: "문제 생성~HWP 출력 시간", target: "< 60초 (10문제)" },
  { metric: "초기 사용자 (베타)", target: "10명 교사" },
  { metric: "사용자 만족도", target: "NPS > 50" },
];

const GROWTH_KPI = [
  { metric: "MAU", target: "1,000명 (6개월)" },
  { metric: "유료 전환율", target: "> 30%" },
  { metric: "월간 문제 생성 수", target: "100,000건" },
  { metric: "교사 재방문율", target: "> 70% (주간)" },
];

export function SectionKpi() {
  return (
    <Section id="kpi" title="10. 성공 지표 (KPI)">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-3 text-lg font-semibold">MVP 단계</h3>
          <div className="space-y-2">
            {MVP_KPI.map((k) => (
              <div key={k.metric} className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5">
                <span className="text-sm">{k.metric}</span>
                <span className="font-mono text-sm font-bold text-accent">{k.target}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 text-lg font-semibold">성장 단계</h3>
          <div className="space-y-2">
            {GROWTH_KPI.map((k) => (
              <div key={k.metric} className="flex items-center justify-between rounded-lg border border-border px-4 py-2.5">
                <span className="text-sm">{k.metric}</span>
                <span className="font-mono text-sm font-bold text-accent">{k.target}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
