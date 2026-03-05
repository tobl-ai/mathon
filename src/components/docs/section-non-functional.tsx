import { Section } from "./section";

const REQUIREMENTS = [
  { item: "응답 시간", req: "10문제 변형 + 검증 + HWPX 출력: 90초 이내" },
  { item: "동시 사용자", req: "MVP 기준 50명 동시 처리" },
  { item: "파일 크기", req: "업로드 최대 50MB (PDF)" },
  { item: "브라우저", req: "Chrome, Safari, Edge (최신 2개 버전)" },
  { item: "모바일", req: "반응형 웹 (모바일 업로드 지원)" },
  { item: "보안", req: "사용자 데이터 암호화, 업로드 파일 30일 후 자동 삭제" },
];

export function SectionNonFunctional() {
  return (
    <Section id="non-functional" title="5. 비기능 요구사항">
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="px-4 py-2.5 font-medium">항목</th>
              <th className="px-4 py-2.5 font-medium">요구사항</th>
            </tr>
          </thead>
          <tbody>
            {REQUIREMENTS.map((r) => (
              <tr key={r.item} className="border-t border-border">
                <td className="px-4 py-2.5 font-medium">{r.item}</td>
                <td className="px-4 py-2.5 text-muted">{r.req}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
