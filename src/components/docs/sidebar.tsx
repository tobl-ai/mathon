import Link from "next/link";
import { NAV_ITEMS } from "@/lib/prd-data";

const SECTION_NUMS = [
  "01", "02", "03", "04", "05", "06",
  "07", "08", "09", "10", "11", "12",
];

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-60 shrink-0 overflow-y-auto border-r border-border bg-surface/50 px-5 py-8 lg:block">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-background">
          M
        </span>
        <span className="font-display text-lg tracking-tight">매스온</span>
      </Link>
      <div className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted">
        문서 목차
      </div>
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map((item, i) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted transition-all hover:bg-surface-hover hover:text-foreground"
          >
            <span className="font-mono text-[10px] text-accent/50 transition-colors group-hover:text-accent">
              {SECTION_NUMS[i]}
            </span>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="mt-8 border-t border-border pt-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
        >
          <span>←</span>
          랜딩 페이지
        </Link>
      </div>
    </aside>
  );
}
