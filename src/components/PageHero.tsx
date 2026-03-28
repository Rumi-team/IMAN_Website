interface PageHeroProps {
  title: string;
  titleFa: string;
  description?: string;
}

export default function PageHero({ title, titleFa, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="girih-pattern" />
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative z-10 text-center">
        <h1 className="font-[family-name:var(--font-display)] text-4xl lg:text-5xl font-normal text-[var(--text)] mb-3">
          {title}
        </h1>
        <p
          className="font-[family-name:var(--font-farsi)] text-xl text-[var(--gold)] mb-4"
          dir="rtl"
          lang="fa"
        >
          {titleFa}
        </p>
        {description && (
          <p className="text-lg text-[var(--text-secondary)] max-w-[600px] mx-auto">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
