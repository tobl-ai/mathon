import Link from "next/link";

const MATH_SYMBOLS = [
  { char: "∫", x: "8%", y: "15%", size: "text-6xl", delay: "delay-1", opacity: "opacity-[0.06]" },
  { char: "Σ", x: "85%", y: "10%", size: "text-7xl", delay: "delay-3", opacity: "opacity-[0.05]" },
  { char: "√", x: "75%", y: "65%", size: "text-5xl", delay: "delay-5", opacity: "opacity-[0.07]" },
  { char: "π", x: "12%", y: "70%", size: "text-8xl", delay: "delay-2", opacity: "opacity-[0.04]" },
  { char: "∞", x: "90%", y: "45%", size: "text-6xl", delay: "delay-4", opacity: "opacity-[0.05]" },
  { char: "Δ", x: "50%", y: "8%", size: "text-5xl", delay: "delay-6", opacity: "opacity-[0.06]" },
  { char: "θ", x: "30%", y: "80%", size: "text-6xl", delay: "delay-7", opacity: "opacity-[0.04]" },
];

const FEATURES = [
  {
    icon: "01",
    title: "수식 인식",
    desc: "이미지/PDF를 업로드하면 Gemini Vision이 수학 수식을 99%+ 정확도로 인식합니다.",
  },
  {
    icon: "02",
    title: "AI 교차 검증",
    desc: "Gemini + Claude가 독립적으로 풀이하여 정답이 일치할 때만 문제를 채택합니다.",
  },
  {
    icon: "03",
    title: "HWPX 출력",
    desc: "편집 가능한 네이티브 수식과 미주 처리가 포함된 HWPX 파일을 즉시 다운로드합니다.",
  },
];

const STATS = [
  { value: "< 1%", label: "오답률" },
  { value: "99%+", label: "수식 인식률" },
  { value: "90초", label: "10문제 생성" },
  { value: "5분", label: "시험지 완성" },
];

const PIPELINE = [
  { step: "업로드", desc: "이미지 · PDF" },
  { step: "인식", desc: "OCR + 수식" },
  { step: "생성", desc: "AI 변형" },
  { step: "검증", desc: "교차 풀이" },
  { step: "출력", desc: "HWPX 다운로드" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Floating math symbols */}
      {MATH_SYMBOLS.map((s) => (
        <span
          key={s.char}
          className={`pointer-events-none absolute select-none font-display ${s.size} ${s.delay} ${s.opacity} animate-float text-accent`}
          style={{ left: s.x, top: s.y }}
        >
          {s.char}
        </span>
      ))}

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <span className="font-display text-xl tracking-tight">매스온</span>
        <div className="flex items-center gap-6">
          <Link
            href="/docs"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            PRD 문서
          </Link>
          <Link
            href="/docs"
            className="rounded-full border border-accent/30 bg-accent-dim px-4 py-1.5 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-background"
          >
            시작하기
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center px-6 pb-24 pt-20 text-center sm:pt-28">
        <div className="animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="text-xs text-muted">MVP 개발 진행중</span>
        </div>

        <h1 className="animate-fade-up delay-1 mb-6 max-w-3xl font-display text-5xl leading-tight tracking-tight sm:text-6xl md:text-7xl">
          수학 문제,{" "}
          <span className="text-gradient">5분이면</span>{" "}
          충분합니다
        </h1>

        <p className="animate-fade-up delay-2 mb-10 max-w-xl text-lg leading-relaxed text-muted">
          AI가 생성하고 교차 검증한 편집 가능한 HWPX 시험지.
          <br />
          수학 교사의 워크플로우를 혁신합니다.
        </p>

        <div className="animate-fade-up delay-3 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/docs#mvp"
            className="glow-accent rounded-full bg-accent px-8 py-3 text-sm font-semibold text-background transition-all hover:bg-accent-hover"
          >
            무료로 시작하기
          </Link>
          <Link
            href="/docs"
            className="rounded-full border border-border px-8 py-3 text-sm font-medium text-muted transition-all hover:border-foreground hover:text-foreground"
          >
            PRD 문서 보기
          </Link>
        </div>

        {/* Ruled line */}
        <div className="mt-20 h-px w-full max-w-2xl rule-gold border-t" />
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 pb-20">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`animate-fade-up delay-${i + 3} rounded-xl border border-border bg-card p-5 text-center card-hover`}
            >
              <div className="font-display text-2xl text-accent sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="animate-fade-up mb-3 text-center font-display text-3xl tracking-tight sm:text-4xl">
            작동 방식
          </h2>
          <p className="animate-fade-up delay-1 mb-14 text-center text-muted">
            업로드부터 HWPX 출력까지, 완전히 자동화된 파이프라인
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className={`animate-fade-up delay-${i + 2} group rounded-xl border border-border bg-card p-6 card-hover`}
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent-dim font-display text-lg text-accent">
                  {f.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section className="relative z-10 px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between">
            {PIPELINE.map((p, i) => (
              <div key={p.step} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/30 bg-accent-dim text-sm font-semibold text-accent">
                    {i + 1}
                  </div>
                  <div className="mt-2 text-xs font-medium">{p.step}</div>
                  <div className="text-[10px] text-muted">{p.desc}</div>
                </div>
                {i < PIPELINE.length - 1 && (
                  <div className="mx-2 h-px w-6 bg-border sm:mx-4 sm:w-12" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-32">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-12 h-px w-full rule-gold border-t" />
          <h2 className="animate-fade-up font-display text-3xl tracking-tight sm:text-4xl">
            시험지 제작 시간을{" "}
            <span className="text-accent">90%</span> 줄이세요
          </h2>
          <p className="animate-fade-up delay-1 mb-8 mt-4 text-muted">
            매스온은 수학 교사를 위해 설계된 AI 문제 생성 플랫폼입니다.
          </p>
          <Link
            href="/docs"
            className="animate-fade-up delay-2 glow-accent inline-block rounded-full bg-accent px-10 py-3.5 text-sm font-semibold text-background transition-all hover:bg-accent-hover"
          >
            지금 시작하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <span className="font-display text-sm text-muted">매스온 v2.0</span>
          <span className="text-xs text-muted">
            2026 Mathon. AI-powered math worksheet generation.
          </span>
        </div>
      </footer>

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />
    </main>
  );
}
