import { Section } from "./section";

const MVP_KPI = [
  { metric: "문제 생성 정확도 (오답률)", target: "< 1%" },
  { metric: "수식 OCR 인식률", target: "> 99%" },
  { metric: "1라운드 검증 통과율", target: "> 85%" },
  { metric: "3라운드 내 최종 채택률", target: "> 95%" },
  { metric: "문제 생성~HWPX 출력 시간", target: "< 90초" },
  { metric: "초기 사용자 (베타)", target: "10명" },
  { metric: "사용자 만족도", target: "NPS > 50" },
];

const GROWTH_KPI = [
  { metric: "MAU", target: "1,000명" },
  { metric: "유료 전환율", target: "> 30%" },
  { metric: "월간 문제 생성 수", target: "100,000건" },
  { metric: "교사 재방문율", target: "> 70%" },
];

export function SectionKpi() {
  return (
    <Section id="kpi" title="10. 성공 지표 (KPI)">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-accent-dim text-xs text-accent">
              M
            </span>
            MVP 단계
          </h3>
          <div className="space-y-1.5">
            {MVP_KPI.map((k) => (
              <div key={k.metric} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-accent/20">
                <span className="text-sm">{k.metric}</span>
                <span className="font-mono text-sm font-bold text-accent">{k.target}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-success/10 text-xs text-success">
              G
            </span>
            성장 단계
          </h3>
          <div className="space-y-1.5">
            {GROWTH_KPI.map((k) => (
              <div key={k.metric} className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-success/20">
                <span className="text-sm">{k.metric}</span>
                <span className="font-mono text-sm font-bold text-success">{k.target}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
