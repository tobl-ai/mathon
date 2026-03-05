import { Section } from "./section";

const FLOW_STEPS = [
  { step: "1", title: "문제 업로드", desc: "이미지/PDF 드래그 앤 드롭 또는 파일 선택" },
  { step: "2", title: "문제 인식 확인", desc: "OCR 결과 확인, 변형할 문제 선택/해제" },
  { step: "3", title: "변형 옵션 설정", desc: "변형 유형, 난이도, 생성 개수 설정" },
  { step: "4", title: "문제 생성 + 검증", desc: "생성 중... → 검증 중... → 완료 (검증 실패 시 자동 수정)" },
  { step: "5", title: "결과 미리보기", desc: "생성된 문제 + 해설 확인, 검증 상태 표시, 개별 재생성" },
  { step: "6", title: "HWPX 다운로드", desc: "편집 가능한 네이티브 수식 포함 HWPX 파일 다운로드" },
];

const SCENARIOS = [
  {
    title: "시험지 제작",
    desc: "수업에서 다룬 10개 문제 업로드 → 각 2개 유사 문제 (총 20문제) → 멀티 AI 검증 통과 → 난이도 \"비슷하게\" → HWPX 다운로드",
  },
  {
    title: "심화 학습지",
    desc: "상위권 학생용 5개 문제 → \"더 어렵게\" 옵션으로 각 3개 생성 → HWPX 다운로드",
  },
  {
    title: "오답 복습지",
    desc: "학생 오답 3개 업로드 → \"숫자 변형\"으로 각 5개 생성 → 반복 연습용 학습지",
  },
];

export function SectionUserFlow() {
  return (
    <Section id="user-flow" title="6. 사용자 플로우">
      <h3 className="mb-4 text-lg font-semibold">메인 플로우</h3>
      <div className="mb-8 flex flex-col gap-2">
        {FLOW_STEPS.map((s, i) => (
          <div key={s.step} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
              {s.step}
            </span>
            <div className="flex-1 rounded-lg border border-border p-3">
              <span className="font-medium">{s.title}</span>
              <span className="ml-2 text-sm text-muted">{s.desc}</span>
            </div>
            {i < FLOW_STEPS.length - 1 && (
              <span className="hidden text-muted sm:block" />
            )}
          </div>
        ))}
      </div>

      <h3 className="mb-3 text-lg font-semibold">사용 시나리오</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {SCENARIOS.map((s) => (
          <div key={s.title} className="rounded-lg border border-border p-4">
            <h4 className="mb-2 font-semibold">{s.title}</h4>
            <p className="text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
