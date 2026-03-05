export interface NavItem {
  id: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "overview", label: "제품 개요" },
  { id: "mvp", label: "MVP" },
  { id: "features", label: "기능 요구사항" },
  { id: "tech", label: "기술 요구사항" },
  { id: "non-functional", label: "비기능 요구사항" },
  { id: "user-flow", label: "사용자 플로우" },
  { id: "data", label: "데이터 전략" },
  { id: "roadmap", label: "로드맵" },
  { id: "business", label: "비즈니스 모델" },
  { id: "kpi", label: "성공 지표" },
  { id: "risks", label: "리스크" },
  { id: "appendix", label: "부록" },
];

export interface Competitor {
  name: string;
  strength: string;
  weakness: string;
}

export const COMPETITORS: Competitor[] = [
  {
    name: "퀘스티아이",
    strength: "AI 문제 변형",
    weakness: "HWPX 출력 편집 불편, 해설 미주 처리 부재, 문제-해설 분리",
  },
  {
    name: "매스플랫",
    strength: "시중 교재 연동, 문제은행",
    weakness: "PDF만 출력(편집 불가), 유사 문제 질 낮음",
  },
  {
    name: "수학비서",
    strength: "문제은행",
    weakness: "변형 문제 생성 불가, 쌍둥이 문제 부족(1개 수준)",
  },
];

export interface Feature {
  id: string;
  name: string;
  priority: "P0" | "P1" | "P2";
  description: string;
}

export const INPUT_FEATURES: Feature[] = [
  { id: "IN-01", name: "이미지 업로드", priority: "P0", description: "JPG/PNG 형식의 문제 이미지 업로드" },
  { id: "IN-02", name: "PDF 업로드", priority: "P0", description: "PDF 파일 전체 또는 특정 페이지 업로드" },
  { id: "IN-03", name: "스크린 캡처", priority: "P1", description: "웹 앱 내 스크린 캡처 도구" },
  { id: "IN-04", name: "문제 영역 선택", priority: "P1", description: "업로드된 이미지에서 마우스 드래그로 문제 영역 선택" },
  { id: "IN-05", name: "OCR 문제 인식", priority: "P0", description: "업로드된 이미지/PDF에서 수학 문제 자동 인식 및 파싱" },
  { id: "IN-06", name: "복수 문제 일괄 인식", priority: "P1", description: "한 페이지 내 여러 문제 자동 분리 및 인식" },
];

export const GENERATION_FEATURES: Feature[] = [
  { id: "GN-01", name: "숫자 변형", priority: "P0", description: "동일 구조, 숫자만 변경한 유사 문제 생성" },
  { id: "GN-02", name: "구조 변형", priority: "P0", description: "핵심 개념 유지, 구조를 변형한 문제 생성" },
  { id: "GN-03", name: "난이도 조절", priority: "P0", description: "더 쉽게 / 비슷하게 / 더 어렵게 변형" },
  { id: "GN-04", name: "생성 개수 지정", priority: "P0", description: "사용자가 원하는 문제 수 지정 (1~20개)" },
  { id: "GN-05", name: "멀티 AI 교차 검증", priority: "P0", description: "Gemini + Claude 독립 풀이 후 답 일치 시에만 채택" },
  { id: "GN-06", name: "AI 기반 문제 수정", priority: "P0", description: "답 불일치 시 문제 조건을 자동 수정하여 재검증" },
  { id: "GN-07", name: "해설 자동 생성", priority: "P0", description: "검증 통과된 문제에 대한 풀이 해설 자동 생성" },
];

export const OUTPUT_FEATURES: Feature[] = [
  { id: "OUT-01", name: "HWPX 파일 출력", priority: "P0", description: "편집 가능한 .hwpx 형식으로 다운로드" },
  { id: "OUT-02", name: "수식 편집 가능", priority: "P0", description: "HWPX 내 수학 수식이 한글 네이티브 수식으로 편집 가능" },
  { id: "OUT-03", name: "미주 처리", priority: "P0", description: "문제 번호 클릭 시 해설로 이동하는 미주 링크" },
  { id: "OUT-04", name: "문제-해설 레이아웃", priority: "P0", description: "문제 바로 아래에 해설 배치 옵션" },
  { id: "OUT-05", name: "PDF 출력", priority: "P2", description: "PDF 형식 추가 출력 옵션" },
  { id: "OUT-06", name: "미리보기", priority: "P1", description: "다운로드 전 웹에서 출력물 미리보기" },
];

export interface RoadmapPhase {
  phase: string;
  title: string;
  period: string;
  items: string[];
}

export const ROADMAP: RoadmapPhase[] = [
  {
    phase: "Phase 1",
    title: "MVP",
    period: "2026년 3월",
    items: [
      "이미지/PDF 업로드 → OCR 문제 인식",
      "AI 유사 문제 생성 (숫자/구조 변형)",
      "난이도 조절 (쉽게/비슷하게/어렵게)",
      "멀티 AI 교차 검증 (Gemini + Claude, 최대 3라운드 수정)",
      "HWPX 파일 출력 (편집 가능 네이티브 수식, 미주 처리)",
    ],
  },
  {
    phase: "Phase 2",
    title: "문제은행 구축",
    period: "2026년 Q2",
    items: [
      "시중 문제집 DB화 (AI 태깅)",
      "교재 연동 기능",
      "문제 검색 및 필터링",
      "교사 커뮤니티 (문제 공유)",
      "검증 통과 문제 캐싱 (동일 문제 재생성 방지)",
    ],
  },
  {
    phase: "Phase 3",
    title: "개인화 학습",
    period: "2026년 Q3",
    items: [
      "학생 관리 시스템",
      "오답 노트 기반 맞춤 문제 생성",
      "학습 이력 분석 및 리포트",
      "학생별 취약점 진단",
    ],
  },
  {
    phase: "Phase 4",
    title: "종합 플랫폼",
    period: "2026년 Q4",
    items: [
      "태블릿 기반 온라인 시험",
      "자동 채점 시스템",
      "학부모 리포트",
      "학원 관리 시스템 (LMS) 연동",
    ],
  },
];

export interface Risk {
  risk: string;
  impact: "높음" | "중간" | "낮음";
  mitigation: string;
}

export const RISKS: Risk[] = [
  { risk: "AI 검증 후에도 오답 발생", impact: "높음", mitigation: "3라운드 수정 루프, 불일치 문제 제외, 교사 피드백 수집" },
  { risk: "HWPX 수식 렌더링 오류", impact: "높음", mitigation: "OWPML 표준 준수, 실제 한컴오피스 테스트 자동화" },
  { risk: "검증 루프로 응답 시간 증가", impact: "중간", mitigation: "Gemini/Claude 병렬 호출, 1라운드 통과 문제 우선 출력" },
  { risk: "OCR 수식 인식 오류", impact: "중간", mitigation: "Gemini Vision 외 MathPix 등 전문 OCR 병행 검토" },
  { risk: "저작권 이슈 (문제집 DB화)", impact: "중간", mitigation: "법률 검토, AI 변형으로 2차 저작물화, 출처 표기" },
  { risk: "API 비용 증가 (검증 2배)", impact: "중간", mitigation: "검증 통과 문제 캐싱, 빈출 유형 사전 생성, 비용 모니터링" },
];

export const QUOTES = [
  "편집을 하지 않으면 그대로 쓸 수가 없어요. 편집이 너무 오래 걸리는 거죠.",
  "이 한글 파일만 제대로 나와도 이건 무조건 선생님들이 갈아탑니다.",
  "지금은 어떤 플랫폼도 좋은 시험지를 만들려면 30분~2시간 걸려요. 이게 5분 안에 끝나는 거니까 획기적이죠.",
];
