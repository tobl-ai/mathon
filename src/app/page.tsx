import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6">
      <h1 className="text-4xl font-bold tracking-tight">
        매스온 <span className="text-accent">(Mathon)</span>
      </h1>
      <p className="max-w-md text-center text-lg text-muted">
        AI 기반 수학 문제 변형 및 학습자료 생성 플랫폼
      </p>
      <Link
        href="/docs"
        className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        PRD 문서 보기
      </Link>
    </main>
  );
}
