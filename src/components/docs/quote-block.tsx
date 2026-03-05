interface QuoteBlockProps {
  quotes: string[];
}

export function QuoteBlock({ quotes }: QuoteBlockProps) {
  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <blockquote
          key={quote}
          className="border-l-4 border-accent bg-accent-light/30 py-3 pl-4 pr-4 text-sm italic text-muted"
        >
          &ldquo;{quote}&rdquo;
        </blockquote>
      ))}
    </div>
  );
}
