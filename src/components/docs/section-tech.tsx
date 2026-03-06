import { Section } from "./section";

const TECH_STACK = [
  { area: "Frontend", tech: "Next.js + TypeScript", note: "SSR 기반" },
  { area: "UI Library", tech: "MUI v7", note: "디자인 시스템" },
  { area: "Backend", tech: "Firebase Functions (Python)", note: "HWPX 생성 + AI 호출" },
  { area: "AI 생성", tech: "Gemini 2.5 Flash / Pro", note: "문제 생성" },
  { area: "AI 검증", tech: "Gemini (새 세션) + Claude API", note: "독립 풀이로 교차 검증" },
  { area: "OCR", tech: "Gemini Vision API", note: "수학 수식 인식" },
  { area: "HWPX 생성", tech: "Python (zipfile + XML)", note: "OWPML 표준 기반 직접 생성" },
  { area: "Storage", tech: "Firebase Storage", note: "템플릿 + 생성 파일 저장" },
  { area: "Database", tech: "Firestore", note: "문제 데이터, 사용자 데이터" },
  { area: "Auth", tech: "Firebase Auth", note: "사용자 인증" },
];

const PIPELINE_STEPS = [
  "입력 이미지/PDF",
  "OCR + 수식 인식 (Gemini Vision)",
  "문제 구조 분석 (개념, 유형, 난이도 태깅)",
  "변형 문제 생성 (Gemini) → 문제 + 풀이 + 정답 + 한글 수식",
  "멀티 AI 교차 검증 (Gemini 새 세션 + Claude 독립 풀이)",
  "검증 통과된 문제만 해설 확정",
  "HWPX 조립 (Python zipfile + XML)",
  "Firebase Storage 업로드 → 다운로드 URL 반환",
];

export function SectionTech() {
  return (
    <Section id="tech" title="4. 기술 요구사항">
      <h3 className="mb-3 text-lg font-semibold">기술 스택</h3>
      <div className="mb-8 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 text-xs font-medium text-muted">영역</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">기술</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">비고</th>
            </tr>
          </thead>
          <tbody>
            {TECH_STACK.map((t) => (
              <tr key={t.area} className="border-t border-border-subtle table-row-hover transition-colors">
                <td className="px-4 py-3 font-medium">{t.area}</td>
                <td className="px-4 py-3">
                  <code className="rounded-md bg-surface px-2 py-0.5 font-mono text-xs text-accent">
                    {t.tech}
                  </code>
                </td>
                <td className="px-4 py-3 text-muted">{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-4 text-lg font-semibold">AI 문제 생성 파이프라인</h3>
      <div className="mb-8 space-y-1">
        {PIPELINE_STEPS.map((step, i) => (
          <div key={step} className="flex items-start gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-surface">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent-dim font-mono text-xs font-semibold text-accent">
              {i + 1}
            </span>
            <span className="pt-0.5 text-sm">{step}</span>
          </div>
        ))}
      </div>

      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "오답률 목표", value: "< 1%" },
          { label: "수식 인식 정확도", value: "> 99%" },
          { label: "1라운드 검증 통과율", value: "> 85%" },
          { label: "3라운드 최종 채택률", value: "> 95%" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-card p-4 text-center card-hover">
            <div className="text-[10px] uppercase tracking-widest text-muted">{m.label}</div>
            <div className="mt-2 font-display text-2xl text-accent">{m.value}</div>
          </div>
        ))}
      </div>

      <h3 className="mb-3 text-lg font-semibold">4.4 멀티 AI 교차 검증 시스템</h3>
      <div className="mb-5 space-y-1">
        {[
          "Gemini가 변형 문제 + 풀이 + 정답(author_answer) 생성",
          "Gemini(새 세션)가 문제만 보고 독립 풀이 → gemini_answer",
          "Claude가 문제만 보고 독립 풀이 → claude_answer",
          "3개 답 비교: 3자 일치 → 통과 / 2자 일치 → 다수결 / 모두 다름 → 문제 수정",
          "불일치 시 최대 3라운드 수정 후 합의 불가 → 문제 제외",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-4 rounded-lg px-3 py-2 transition-colors hover:bg-surface">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] font-bold text-accent">
              {i + 1}
            </span>
            <span className="pt-0.5 text-sm">{step}</span>
          </div>
        ))}
      </div>
      <div className="mb-6 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 text-xs font-medium text-muted">역할</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">모델</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">컨텍스트</th>
            </tr>
          </thead>
          <tbody>
            {[
              { role: "출제자", model: "Gemini", ctx: "원본 + 변형 지시" },
              { role: "감수자 1", model: "Gemini (새 세션)", ctx: "변형 문제만" },
              { role: "감수자 2", model: "Claude", ctx: "변형 문제만" },
            ].map((r) => (
              <tr key={r.role} className="border-t border-border-subtle table-row-hover transition-colors">
                <td className="px-4 py-3 font-medium">{r.role}</td>
                <td className="px-4 py-3">
                  <code className="rounded-md bg-surface px-2 py-0.5 font-mono text-xs text-accent">
                    {r.model}
                  </code>
                </td>
                <td className="px-4 py-3 text-muted">{r.ctx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold">4.5 HWPX 생성 시스템</h3>
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-sm text-muted">
          자체 개발 HWPX 생성 엔진으로 편집 가능한 네이티브 수식이 포함된 한글 문서를 출력합니다.
        </p>
      </div>
    </Section>
  );
}
