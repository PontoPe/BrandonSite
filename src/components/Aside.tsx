/**
 * An aside on a surface page. Where the deep layer scrawls in the margin, the
 * jacket sets the same thought as a considered note against a rule.
 */
export default function Aside({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside className={`aside-formal ${className}`}>
      <p className="text-[16px] italic leading-relaxed text-ink-soft">{children}</p>
    </aside>
  );
}
