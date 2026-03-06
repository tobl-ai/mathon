interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-8 border-b border-border py-12 last:border-b-0">
      <h2 className="mb-8 font-display text-2xl tracking-tight sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  );
}
