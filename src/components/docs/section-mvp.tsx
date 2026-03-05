import { Section } from "./section";

export function SectionMvp() {
  return (
    <Section id="mvp" title="2. MVP (Minimum Viable Product)">
      <div className="mb-6 rounded-lg border border-accent/30 bg-accent-light/20 p-4">
        <p className="text-sm font-medium">
          &ldquo;수학 문제 이미지/PDF를 입력하면, 변형된 문제가 편집 가능한 HWP 파일로 출력된다&rdquo;
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/30">
          <h4 className="mb-2 text-sm font-semibold text-green-700 dark:text-green-400">In Scope</h4>
          <ul className="space-y-1 text-sm text-muted">
            <li>- 문제 입력 (이미지/PDF 업로드)</li>
            <li>- AI 기반 유사 문제 생성</li>
            <li>- HWP 파일 출력 (수식 유지, 미주 처리)</li>
            <li>- 기본 난이도 조절</li>
          </ul>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950/30">
          <h4 className="mb-2 text-sm font-semibold text-red-700 dark:text-red-400">Out of Scope</h4>
          <ul className="space-y-1 text-sm text-muted">
            <li>- 학생 관리 및 개인화 학습</li>
            <li>- 자동 채점 시스템</li>
            <li>- 문제은행 DB 구축</li>
            <li>- 과금 시스템 / 태블릿 시험</li>
          </ul>
        </div>
      </div>

      <h3 className="mb-3 text-lg font-semibold">목표 일정</h3>
      <div className="flex gap-2">
        {[
          { week: "1주차", task: "기획서 완성 및 공유" },
          { week: "2-4주차", task: "핵심 기능 개발" },
          { week: "3월 말", task: "MVP 완성" },
        ].map((item) => (
          <div key={item.week} className="flex-1 rounded-lg border border-border p-3 text-center">
            <div className="text-xs font-medium text-accent">{item.week}</div>
            <div className="mt-1 text-sm">{item.task}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
