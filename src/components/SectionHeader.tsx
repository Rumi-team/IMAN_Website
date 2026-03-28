interface SectionHeaderProps {
  overline: string;
  title: string;
  titleFa: string;
  className?: string;
}

export default function SectionHeader({
  overline,
  title,
  titleFa,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${className}`}>
      <p className="text-xs font-semibold tracking-[0.12em] uppercase text-[var(--accent)] mb-2">
        {overline}
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-normal text-[var(--text)] mb-2">
        {title}
      </h2>
      <p
        className="font-[family-name:var(--font-farsi)] text-lg text-[var(--gold)]"
        dir="rtl"
        lang="fa"
      >
        {titleFa}
      </p>
    </div>
  );
}
