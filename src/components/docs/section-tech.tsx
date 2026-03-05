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
      <div className="mb-8 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="px-4 py-2.5 font-medium">영역</th>
              <th className="px-4 py-2.5 font-medium">기술</th>
              <th className="px-4 py-2.5 font-medium">비고</th>
            </tr>
          </thead>
          <tbody>
            {TECH_STACK.map((t) => (
              <tr key={t.area} className="border-t border-border">
                <td className="px-4 py-2.5 font-medium">{t.area}</td>
                <td className="px-4 py-2.5 font-mono text-xs">{t.tech}</td>
                <td className="px-4 py-2.5 text-muted">{t.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold">AI 문제 생성 파이프라인</h3>
      <div className="space-y-2">
        {PIPELINE_STEPS.map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "오답률 목표", value: "< 1%" },
          { label: "수식 인식 정확도", value: "> 99%" },
          { label: "1라운드 검증 통과율", value: "> 85%" },
          { label: "3라운드 최종 채택률", value: "> 95%" },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-border p-3 text-center">
            <div className="text-xs text-muted">{m.label}</div>
            <div className="mt-1 text-lg font-bold text-accent">{m.value}</div>
          </div>
        ))}
      </div>

      <h3 className="mb-3 mt-8 text-lg font-semibold">4.4 멀티 AI 교차 검증 시스템</h3>
      <div className="mb-4 space-y-2">
        {[
          "Gemini가 변형 문제 + 풀이 + 정답(author_answer) 생성",
          "Gemini(새 세션)가 문제만 보고 독립 풀이 → gemini_answer",
          "Claude가 문제만 보고 독립 풀이 → claude_answer",
          "3개 답 비교: 3자 일치 → 통과 / 2자 일치 → 다수결 / 모두 다름 → 문제 수정",
          "불일치 시 최대 3라운드 수정 후 합의 불가 → 문제 제외",
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/80 text-xs font-bold text-white">
              {i + 1}
            </span>
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>
      <div className="mb-4 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="px-4 py-2 font-medium">역할</th>
              <th className="px-4 py-2 font-medium">모델</th>
              <th className="px-4 py-2 font-medium">컨텍스트</th>
            </tr>
          </thead>
          <tbody>
            {[
              { role: "출제자", model: "Gemini", ctx: "원본 + 변형 지시" },
              { role: "감수자 1", model: "Gemini (새 세션)", ctx: "변형 문제만" },
              { role: "감수자 2", model: "Claude", ctx: "변형 문제만" },
            ].map((r) => (
              <tr key={r.role} className="border-t border-border">
                <td className="px-4 py-2 font-medium">{r.role}</td>
                <td className="px-4 py-2 font-mono text-xs">{r.model}</td>
                <td className="px-4 py-2 text-muted">{r.ctx}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 mt-8 text-lg font-semibold">4.5 HWPX 생성 시스템</h3>
      <p className="mb-3 text-sm text-muted">
        HWPX는 OWPML 국가표준 기반 ZIP(XML) 아카이브. Python zipfile + XML로 Cloud Functions에서 직접 생성.
      </p>
      <div className="mb-4 rounded-lg border border-border bg-surface p-4 font-mono text-xs leading-relaxed">
        <p>hwpx 파일 구조:</p>
        <p>├── mimetype (비압축)</p>
        <p>├── version.xml / settings.xml</p>
        <p>├── Contents/</p>
        <p>│&nbsp;&nbsp; ├── content.hpf (매니페스트)</p>
        <p>│&nbsp;&nbsp; ├── header.xml (폰트, 스타일)</p>
        <p>│&nbsp;&nbsp; └── section0.xml (문제 + 수식 + 해설)</p>
        <p>└── META-INF/ (container.xml, manifest.xml)</p>
      </div>
      <p className="text-sm text-muted">
        수식은 <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs">&lt;hp:equation&gt;</code> +{" "}
        <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs">&lt;hp:script&gt;</code> 태그로 삽입하여
        이미지가 아닌 편집 가능한 네이티브 수식으로 출력.
      </p>
    </Section>
  );
}
