import Link from "next/link";
import { NAV_ITEMS } from "@/lib/prd-data";

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-56 shrink-0 overflow-y-auto border-r border-border px-4 py-8 lg:block">
      <Link href="/" className="mb-6 block text-lg font-bold tracking-tight">
        매스온
      </Link>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-foreground"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
