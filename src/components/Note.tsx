/**
 * A note in the margin, in the annotating hand, with a drawn arrow pointing at
 * whatever it is complaining about. The in-world appendices these pages imitate
 * are full of them — a second voice correcting or doubting the first, which is
 * also the honest way to caveat a design study.
 */
export default function Note({
  children,
  side = "right",
  className = "",
}: {
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}) {
  return (
    <aside
      className={`relative max-w-xs ${side === "right" ? "tilt-r" : "tilt-l"} ${className}`}
    >
      <svg
        viewBox="0 0 60 34"
        className="mb-1 h-5 w-14"
        aria-hidden
        style={{ transform: side === "left" ? "scaleX(-1)" : undefined }}
      >
        <path
          d="M2 30 C14 26 22 16 30 8 C36 3 46 2 56 5"
          fill="none"
          stroke="var(--ink-faint)"
          strokeWidth="1.1"
          strokeLinecap="round"
        />
        <path
          d="M48 2 L57 5 L50 11"
          fill="none"
          stroke="var(--ink-faint)"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="hand text-[16px] leading-snug">{children}</p>
    </aside>
  );
}
