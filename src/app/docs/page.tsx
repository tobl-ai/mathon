import { Sidebar } from "@/components/docs/sidebar";
import { SectionVision } from "@/components/docs/section-vision";
import { SectionMasterRoadmap } from "@/components/docs/section-master-roadmap";
import { SectionOverview } from "@/components/docs/section-overview";
import { SectionMvp } from "@/components/docs/section-mvp";
import { SectionFeatures } from "@/components/docs/section-features";
import { SectionTech } from "@/components/docs/section-tech";
import { SectionNonFunctional } from "@/components/docs/section-non-functional";
import { SectionUserFlow } from "@/components/docs/section-user-flow";
import { SectionData } from "@/components/docs/section-data";
import { SectionRoadmap } from "@/components/docs/section-roadmap";
import { SectionBusiness } from "@/components/docs/section-business";
import { SectionKpi } from "@/components/docs/section-kpi";
import { SectionRisks } from "@/components/docs/section-risks";
import { SectionAppendix } from "@/components/docs/section-appendix";

export default function DocsPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="min-h-screen flex-1 px-6 py-10 sm:px-12 lg:px-20">
        <header className="mb-10 border-b border-border pb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs text-muted">v2.0 · 2026-03-06</span>
          </div>
          <h1 className="font-display text-4xl tracking-tight sm:text-5xl">
            매스온 <span className="text-accent">PRD</span>
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
            AI 기반 수학 문제 변형 및 학습자료 생성 플랫폼 —
            제품 요구사항 정의서
          </p>
        </header>
        <div className="max-w-4xl">
          <SectionVision />
          <SectionMasterRoadmap />
          <SectionOverview />
          <SectionMvp />
          <SectionFeatures />
          <SectionTech />
          <SectionNonFunctional />
          <SectionUserFlow />
          <SectionData />
          <SectionRoadmap />
          <SectionBusiness />
          <SectionKpi />
          <SectionRisks />
          <SectionAppendix />
        </div>
      </main>
    </div>
  );
}
