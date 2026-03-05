import { Section } from "./section";
import { RiskTable } from "./risk-table";
import { RISKS } from "@/lib/prd-data";

export function SectionRisks() {
  return (
    <Section id="risks" title="11. 리스크 및 대응">
      <RiskTable risks={RISKS} />
    </Section>
  );
}
