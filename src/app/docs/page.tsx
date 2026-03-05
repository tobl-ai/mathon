import { Sidebar } from "@/components/docs/sidebar";
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
      <main className="min-h-screen flex-1 px-6 py-8 sm:px-12 lg:px-16">
        <header className="mb-8 border-b border-border pb-6">
          <h1 className="text-3xl font-bold tracking-tight">
            매스온 (Mathon) - PRD
          </h1>
          <p className="mt-2 text-sm text-muted">
            Version 1.0 | 2026-03-05 | Status: Draft
          </p>
        </header>
        <div className="max-w-4xl">
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
