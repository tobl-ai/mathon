interface QuoteBlockProps {
  quotes: string[];
}

export function QuoteBlock({ quotes }: QuoteBlockProps) {
  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <blockquote
          key={quote}
          className="rounded-lg border-l-2 border-accent bg-accent-dim py-4 pl-5 pr-5 text-sm italic leading-relaxed text-muted"
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
      ))}
    </div>
  );
}
