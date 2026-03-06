import { Section } from "./section";
import { COMPETITORS } from "@/lib/prd-data";

export function SectionOverview() {
  return (
    <Section id="overview" title="1. 제품 개요">
      <h3 className="mb-2 font-display text-xl">매스온 (Mathon)</h3>
      <p className="mb-5 text-sm text-muted">
        AI 기반 수학 문제 변형 및 학습자료 생성 플랫폼
      </p>

      <div className="mb-8 rounded-xl border border-accent/20 bg-accent-dim p-5">
        <p className="text-sm font-medium leading-relaxed">
          수학 교사가 5분 이내에 고품질 맞춤형 시험지/학습지를 제작할 수 있는 AI 플랫폼
        </p>
      </div>

      <h3 className="mb-3 text-lg font-semibold">문제 정의</h3>
      <p className="mb-5 text-sm leading-relaxed text-muted">
        현재 수학 교사들은 시험지/학습지 제작에 30분~2시간을 소요하고 있으며,
        기존 시스템들은 다음과 같은 한계를 보유합니다.
      </p>

      <div className="mb-8 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="px-4 py-3 text-xs font-medium text-muted">시스템</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">강점</th>
              <th className="px-4 py-3 text-xs font-medium text-muted">한계</th>
            </tr>
          </thead>
          <tbody>
            {COMPETITORS.map((c) => (
              <tr key={c.name} className="border-t border-border-subtle table-row-hover transition-colors">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-success">{c.strength}</td>
                <td className="px-4 py-3 text-muted">{c.weakness}</td>
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
          <div key={t.label} className="rounded-xl border border-border bg-card p-4 card-hover">
            <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-accent">
              {t.label}
            </div>
            <div className="text-sm">{t.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
