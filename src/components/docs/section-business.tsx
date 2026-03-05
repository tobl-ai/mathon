import { Section } from "./section";

const MODELS = [
  { model: "무제한 구독", desc: "월 정액제, 무제한 사용", pros: "사용자 진입 장벽 낮음", cons: "수익 예측 어려움, API 비용 리스크" },
  { model: "구간별 사용량", desc: "월 N건 무료, 초과분 과금", pros: "수익 안정, 비용 비례", cons: "사용자 저항 가능" },
  { model: "티어 구독", desc: "Basic/Pro/Premium", pros: "다양한 사용자층 대응", cons: "기능 구분 설계 복잡" },
];

const ADVANTAGES = [
  { label: "HWPX 출력 품질", desc: "편집 가능한 네이티브 수식 (이미지 수식이 아님)" },
  { label: "미주 처리", desc: "교사 워크플로우에 최적화" },
  { label: "멀티 AI 교차 검증", desc: "Gemini + Claude 독립 풀이, 합의될 때까지 문제 수정" },
  { label: "속도", desc: "5분 이내 시험지 완성 (기존 30분~2시간)" },
];

export function SectionBusiness() {
  return (
    <Section id="business" title="9. 비즈니스 모델">
      <h3 className="mb-3 text-lg font-semibold">과금 모델 (검토중)</h3>
      <div className="mb-8 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="px-4 py-2.5 font-medium">모델</th>
              <th className="px-4 py-2.5 font-medium">설명</th>
              <th className="px-4 py-2.5 font-medium">장점</th>
              <th className="px-4 py-2.5 font-medium">단점</th>
            </tr>
          </thead>
          <tbody>
            {MODELS.map((m) => (
              <tr key={m.model} className="border-t border-border">
                <td className="px-4 py-2.5 font-medium">{m.model}</td>
                <td className="px-4 py-2.5 text-muted">{m.desc}</td>
                <td className="px-4 py-2.5 text-green-600 dark:text-green-400">{m.pros}</td>
                <td className="px-4 py-2.5 text-red-500 dark:text-red-400">{m.cons}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold">핵심 경쟁력</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {ADVANTAGES.map((a) => (
          <div key={a.label} className="rounded-lg border border-border p-4">
            <div className="text-sm font-semibold text-accent">{a.label}</div>
            <div className="mt-1 text-sm text-muted">{a.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
