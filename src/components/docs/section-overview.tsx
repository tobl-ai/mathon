import { Section } from "./section";
import { COMPETITORS } from "@/lib/prd-data";

export function SectionOverview() {
  return (
    <Section id="overview" title="1. 제품 개요">
      <h3 className="mb-2 text-lg font-semibold">매스온 (Mathon)</h3>
      <p className="mb-4 text-muted">
        AI 기반 수학 문제 변형 및 학습자료 생성 플랫폼
      </p>

      <div className="mb-6 rounded-lg border border-accent/30 bg-accent-light/20 p-4">
        <p className="text-sm font-medium">
          수학 교사가 5분 이내에 고품질 맞춤형 시험지/학습지를 제작할 수 있는 AI 플랫폼
        </p>
      </div>

      <h3 className="mb-3 text-lg font-semibold">문제 정의</h3>
      <p className="mb-4 text-sm text-muted">
        현재 수학 교사들은 시험지/학습지 제작에 30분~2시간을 소요하고 있으며,
        기존 시스템들은 다음과 같은 한계를 보유합니다.
      </p>

      <div className="mb-6 overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="px-4 py-2.5 font-medium">시스템</th>
              <th className="px-4 py-2.5 font-medium">강점</th>
              <th className="px-4 py-2.5 font-medium">한계</th>
            </tr>
          </thead>
          <tbody>
            {COMPETITORS.map((c) => (
              <tr key={c.name} className="border-t border-border">
                <td className="px-4 py-2.5 font-medium">{c.name}</td>
                <td className="px-4 py-2.5 text-green-600 dark:text-green-400">{c.strength}</td>
                <td className="px-4 py-2.5 text-muted">{c.weakness}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="mb-3 text-lg font-semibold">타겟 사용자</h3>
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: "Primary", desc: "수학 학원 교사 및 원장" },
          { label: "Secondary", desc: "중/고등학교 수학 교사" },
          { label: "Tertiary", desc: "과외 교사, 자기주도 학습 학생" },
        ].map((t) => (
          <div key={t.label} className="rounded-lg border border-border p-3">
            <div className="text-xs font-medium text-accent">{t.label}</div>
            <div className="mt-1 text-sm">{t.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
