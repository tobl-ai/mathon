import { Section } from "./section";
import { FeatureTable } from "./feature-table";
import { INPUT_FEATURES, GENERATION_FEATURES, OUTPUT_FEATURES } from "@/lib/prd-data";

export function SectionFeatures() {
  return (
    <Section id="features" title="3. 기능 요구사항">
      <FeatureTable title="3.1 문제 입력 (Input)" features={INPUT_FEATURES} />
      <FeatureTable title="3.2 문제 변형/생성 (Generation)" features={GENERATION_FEATURES} />
      <FeatureTable title="3.3 출력 (Output)" features={OUTPUT_FEATURES} />
    </Section>
  );
}
