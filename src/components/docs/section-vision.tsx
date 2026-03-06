import { Section } from "./section";

const REVENUE_STREAMS = [
  {
    phase: "Phase 1-2",
    stream: "SaaS 구독",
    desc: "교사/학원 월 정액 구독 (문제 생성 + HWPX 출력)",
    target: "ARR 30억",
  },
  {
    phase: "Phase 3",
    stream: "B2B 라이선스",
    desc: "학원 체인, 교육청, 출판사에 API/화이트라벨 제공",
    target: "ARR 200억",
  },
  {
    phase: "Phase 4",
    stream: "시험 플랫폼",
    desc: "온라인 시험 + 자동 채점 + 학습 분석 구독",
    target: "ARR 400억",
  },
  {
    phase: "Phase 5",
    stream: "글로벌 확장",
    desc: "일본, 동남아 현지화 + 다과목 확장",
    target: "ARR 1,000억+",
  },
];

const MOATS = [
  {
    title: "검증된 문제 데이터",
    desc: "교차 검증을 통과한 수백만 문제 DB — 시간이 갈수록 품질과 양이 누적되는 자산",
  },
  {
    title: "교사 네트워크 효과",
    desc: "교사가 많을수록 문제 피드백이 쌓이고, 문제 품질이 올라가고, 더 많은 교사가 유입",
  },
  {
    title: "HWPX 기술 장벽",
    desc: "한국 교육 현장의 실질적 표준인 한글 문서 네이티브 수식 출력 — 경쟁사 진입 장벽",
  },
  {
    title: "학습 데이터 플라이휠",
    desc: "학생 풀이 데이터 → 취약점 분석 → 맞춤 문제 생성 → 학습 효과 향상 → 더 많은 데이터",
  },
];

export function SectionVision() {
  return (
    <Section id="vision" title="미션 & 비전">
      {/* Mission */}
      <div className="mb-10 rounded-xl border border-accent/20 bg-accent-dim p-6">
        <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
          Mission
        </div>
        <p className="font-display text-xl leading-relaxed sm:text-2xl">
          모든 수학 교사에게 AI 조교를 제공한다
        </p>
      </div>

      {/* Vision */}
      <div className="mb-10 rounded-xl border border-border bg-card p-6">
        <div className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">
          Vision
        </div>
        <p className="font-display text-xl leading-relaxed sm:text-2xl">
          대한민국 수학 교육 인프라의 표준 플랫폼,
          <br />
          <span className="text-accent">ARR 1,000억</span>의 EdTech 기업
        </p>
      </div>

      {/* Why now */}
      <h3 className="mb-4 text-lg font-semibold">왜 지금인가</h3>
      <div className="mb-10 grid gap-3 sm:grid-cols-3">
        {[
          {
            label: "AI 성능 도달",
            desc: "Gemini/Claude급 LLM이 수학 문제를 풀이·검증할 수 있는 수준에 도달",
          },
          {
            label: "시장 공백",
            desc: "편집 가능한 HWPX + 네이티브 수식 출력을 제공하는 서비스가 전무",
          },
          {
            label: "교사 Pain Point",
            desc: "시험지 제작에 30분~2시간 소요 — 5분으로 단축하면 즉각적 가치 전달",
          },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-border bg-card p-5 card-hover">
            <div className="mb-2 text-sm font-semibold text-accent">{item.label}</div>
            <p className="text-sm leading-relaxed text-muted">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* TAM/SAM/SOM */}
      <h3 className="mb-4 text-lg font-semibold">시장 규모</h3>
      <div className="mb-10 grid gap-3 sm:grid-cols-3">
        {[
          { label: "TAM", value: "5조원", desc: "국내 사교육 시장 (수학)" },
          { label: "SAM", value: "8,000억", desc: "수학 문제 제작·학습지 시장" },
          { label: "SOM", value: "1,200억", desc: "AI 문제 생성 도구 전환 가능 시장 (5년)" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-card p-5 text-center card-hover">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">
              {m.label}
            </div>
            <div className="mt-2 font-display text-3xl text-accent">{m.value}</div>
            <div className="mt-1 text-xs text-muted">{m.desc}</div>
          </div>
        ))}
      </div>

      {/* Revenue streams */}
      <h3 className="mb-4 text-lg font-semibold">수익 모델 진화</h3>
      <div className="mb-10 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 text-xs font-medium text-muted">단계</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">수익원</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">내용</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">목표</th>
            </tr>
          </thead>
          <tbody>
            {REVENUE_STREAMS.map((r) => (
              <tr key={r.stream} className="border-t border-border-subtle table-row-hover transition-colors">
                <td className="px-4 py-3">
                  <span className="rounded-md bg-accent-dim px-2 py-0.5 text-xs font-semibold text-accent">
                    {r.phase}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium">{r.stream}</td>
                <td className="px-4 py-3 text-muted">{r.desc}</td>
                <td className="px-4 py-3 font-mono text-sm font-bold text-accent">{r.target}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Moats */}
      <h3 className="mb-4 text-lg font-semibold">경쟁 해자 (Moat)</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {MOATS.map((m) => (
          <div key={m.title} className="rounded-xl border border-border bg-card p-5 card-hover">
            <div className="mb-2 text-sm font-semibold">{m.title}</div>
            <p className="text-sm leading-relaxed text-muted">{m.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
