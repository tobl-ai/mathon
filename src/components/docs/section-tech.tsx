import { Section } from "./section";

const TECH_STACK = [
  { area: "Frontend", tech: "Next.js + TypeScript", note: "SSR 기반" },
  { area: "UI Library", tech: "MUI v7", note: "디자인 시스템" },
  { area: "Backend", tech: "Next.js API Routes / Firebase Functions", note: "서버리스" },
  { area: "AI Engine", tech: "Gemini 2.5 Flash / Pro", note: "문제 생성 및 검증" },
  { area: "OCR", tech: "Gemini Vision API", note: "수학 수식 인식" },
  { area: "HWP 생성", tech: "hwp.js / python-hwp", note: "HWP 파일 생성" },
  { area: "Storage", tech: "Firebase Storage", note: "파일 저장" },
  { area: "Database", tech: "Firestore", note: "문제/사용자 데이터" },
];

const PIPELINE_STEPS = [
  "입력 이미지/PDF",
  "OCR + 수식 인식 (Gemini Vision)",
  "문제 구조 분석 (개념, 유형, 난이도 태깅)",
  "변형 문제 생성 (숫자/구조/난이도 조절)",
  "AI 자체 검증 (생성 문제를 다시 풀어 정답 확인)",
  "해설 생성",
  "HWP 포맷팅 + 미주 처리",
  "파일 출력",
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

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "오답률 목표", value: "< 1%" },
          { label: "수식 인식 정확도", value: "> 99%" },
          { label: "검증 방식", value: "교차 검증 (생성 AI + 검증 AI)" },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-border p-3 text-center">
            <div className="text-xs text-muted">{m.label}</div>
            <div className="mt-1 text-lg font-bold text-accent">{m.value}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
