import { Section } from "./section";

const PHASES = [
  {
    phase: "Phase 1",
    title: "AI 문제 생성기",
    period: "2026 Q1",
    revenue: "0 → 첫 유료 고객",
    valuation: "시드",
    color: "border-l-accent",
    metrics: ["교사 100명 베타 테스트", "문제 정확도 99%+", "HWPX 출력 안정화"],
    items: [
      "이미지/PDF → OCR → AI 문제 변형",
      "멀티 AI 교차 검증 (Gemini + Claude)",
      "편집 가능 HWPX 출력 (네이티브 수식 + 미주)",
      "난이도 조절 (쉽게/비슷하게/어렵게)",
    ],
    isMvp: true,
  },
  {
    phase: "Phase 2",
    title: "문제은행 플랫폼",
    period: "2026 Q2-Q3",
    revenue: "ARR 5억",
    valuation: "Pre-A",
    color: "border-l-success",
    metrics: ["MAU 1,000명", "유료 전환율 30%+", "문제 DB 50만+"],
    items: [
      "시중 교재 연동 문제은행 DB 구축",
      "AI 태깅 (단원, 개념, 난이도 자동 분류)",
      "문제 검색·필터링·조합 시험지 제작",
      "교사 커뮤니티 (문제 공유, 피드백)",
      "월 구독 과금 시스템 론칭",
    ],
    isMvp: false,
  },
  {
    phase: "Phase 3",
    title: "학생 관리 + B2B",
    period: "2026 Q4 - 2027 Q1",
    revenue: "ARR 30억",
    valuation: "Series A",
    color: "border-l-[#818CF8]",
    metrics: ["B2B 학원 체인 10개+", "학생 10만명+", "재방문율 70%+"],
    items: [
      "학생별 오답 노트 + 취약점 진단",
      "맞춤형 문제 자동 생성 (개인화 학습)",
      "학원 체인 B2B 라이선스 모델",
      "학부모 리포트 (학습 현황, 성적 추이)",
      "출판사 API 연동 (교재 디지털화 파트너십)",
    ],
    isMvp: false,
  },
  {
    phase: "Phase 4",
    title: "시험 + 채점 플랫폼",
    period: "2027 Q2-Q4",
    revenue: "ARR 200억",
    valuation: "Series B",
    color: "border-l-[#F97316]",
    metrics: ["교육청 파일럿 도입", "월간 시험 10만회+", "학원 체인 100개+"],
    items: [
      "태블릿/웹 기반 온라인 시험 시스템",
      "AI 자동 채점 (풀이 과정 분석)",
      "실시간 성적 분석 대시보드",
      "교육청/학교 대상 B2G 영업",
      "학원 관리 시스템 (LMS) 통합",
    ],
    isMvp: false,
  },
  {
    phase: "Phase 5",
    title: "종합 교육 AI · 글로벌",
    period: "2028+",
    revenue: "ARR 1,000억+",
    valuation: "Series C / IPO",
    color: "border-l-[#EC4899]",
    metrics: ["일본·동남아 진출", "다과목 확장", "IPO 준비"],
    items: [
      "과학·영어 등 타 과목 확장",
      "일본 시장 진출 (수학 사교육 대국)",
      "동남아 현지화 (베트남, 인도네시아)",
      "AI 튜터 (1:1 학습 코칭 에이전트)",
      "교육 데이터 분석 플랫폼 (B2B SaaS)",
    ],
    isMvp: false,
  },
];

export function SectionMasterRoadmap() {
  return (
    <Section id="master-roadmap" title="1,000억 로드맵">
      <p className="mb-8 text-sm leading-relaxed text-muted">
        MVP(Phase 1)에서 시작하여 5단계에 걸쳐 ARR 1,000억 규모의
        교육 AI 플랫폼으로 성장하는 로드맵입니다.
      </p>

      <div className="relative space-y-4">
        {/* Vertical timeline line */}
        <div className="absolute left-[15px] top-6 bottom-6 hidden w-px bg-gradient-to-b from-accent via-accent/30 to-transparent sm:block" />

        {PHASES.map((p) => (
          <div key={p.phase} className="flex gap-5">
            {/* Timeline dot */}
            <div className="relative hidden shrink-0 sm:block">
              <div className={`mt-6 h-[11px] w-[11px] rounded-full border-2 ${
                p.isMvp ? "border-accent bg-accent" : "border-border bg-card"
              }`} />
            </div>

            {/* Card */}
            <div className={`flex-1 rounded-xl border border-border border-l-2 ${p.color} bg-card p-6 card-hover`}>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">
                  {p.phase}
                </span>
                {p.isMvp && (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-background">
                    현재 MVP
                  </span>
                )}
                <span className="rounded-md bg-surface px-2 py-0.5 text-[10px] text-muted">
                  {p.period}
                </span>
              </div>

              <h3 className="mb-1 font-display text-xl">{p.title}</h3>

              <div className="mb-4 flex flex-wrap gap-3">
                <span className="text-sm text-accent">{p.revenue}</span>
                <span className="text-sm text-muted">· {p.valuation}</span>
              </div>

              {/* Key metrics */}
              <div className="mb-4 flex flex-wrap gap-2">
                {p.metrics.map((m) => (
                  <span
                    key={m}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted"
                  >
                    {m}
                  </span>
                ))}
              </div>

              {/* Items */}
              <ul className="space-y-1.5">
                {p.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted/50" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
