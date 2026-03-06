import { Section } from "./section";

export function SectionMvp() {
  return (
    <Section id="mvp" title="2. MVP (Minimum Viable Product)">
      <div className="mb-8 rounded-xl border border-accent/20 bg-accent-dim p-5">
        <p className="text-sm font-medium leading-relaxed">
          &ldquo;수학 문제 이미지/PDF를 입력하면, AI가 검증한 변형 문제가 편집 가능한 HWPX 파일로 출력된다&rdquo;
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-success/20 bg-success/5 p-5">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-success">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/20 text-[10px]">
              ✓
            </span>
            In Scope
          </h4>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-success/60">—</span>
              문제 입력 (이미지/PDF 업로드)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-success/60">—</span>
              AI 기반 유사 문제 생성
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-success/60">—</span>
              멀티 AI 교차 검증 (Gemini + Claude)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-success/60">—</span>
              HWPX 파일 출력 (편집 가능 수식, 미주 처리)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-success/60">—</span>
              기본 난이도 조절 (쉽게/비슷하게/어렵게)
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-danger/20 bg-danger/5 p-5">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-danger">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-danger/20 text-[10px]">
              ✕
            </span>
            Out of Scope
          </h4>
          <ul className="space-y-2 text-sm text-muted">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-danger/60">—</span>
              학생 관리 및 개인화 학습
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-danger/60">—</span>
              자동 채점 시스템
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-danger/60">—</span>
              문제은행 DB 구축
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-danger/60">—</span>
              과금 시스템 / 태블릿 시험
            </li>
          </ul>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold">목표 일정</h3>
      <div className="flex gap-3">
        {[
          { week: "1주차", task: "기획서 완성 및 공유" },
          { week: "2-4주차", task: "핵심 기능 개발" },
          { week: "3월 말", task: "MVP 완성" },
        ].map((item) => (
          <div key={item.week} className="flex-1 rounded-xl border border-border bg-card p-4 text-center card-hover">
            <div className="font-mono text-xs font-semibold text-accent">{item.week}</div>
            <div className="mt-1.5 text-sm">{item.task}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
