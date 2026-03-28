import type { Prayer, PrayerDate } from "@/lib/types";

interface PrayerCardProps {
  prayers: Prayer[];
  date: PrayerDate;
  nextPrayer?: string;
  calendarHref?: string;
}

export default function PrayerCard({ prayers, date, nextPrayer, calendarHref = "/prayer-times" }: PrayerCardProps) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-6 shadow-lg relative overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--accent)] via-[var(--lapis)] to-[var(--gold)]" />

      {/* Header */}
      <div className="flex justify-between items-baseline mb-5 pb-4 border-b border-[var(--line-light)]">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)]">
          Prayer Times
        </h3>
        <div className="text-right text-sm">
          <span className="text-[var(--text-secondary)]">
            {date.gregorian}
          </span>
          {date.shamsi && (
            <span
              className="block font-[family-name:var(--font-farsi)] text-[var(--gold)] text-xs mt-0.5"
              dir="rtl"
              lang="fa"
            >
              {date.shamsi}
            </span>
          )}
          {date.hijri && (
            <span className="block text-[var(--muted)] text-xs mt-0.5">
              {date.hijri}
            </span>
          )}
        </div>
      </div>

      {/* Prayer rows */}
      <div className="space-y-0.5">
        {prayers.map((prayer) => (
          <div
            key={prayer.en}
            className={`grid grid-cols-3 items-center px-3 py-2 rounded transition-colors ${
              prayer.active
                ? "bg-gradient-to-r from-[var(--accent)]/8 to-[var(--lapis)]/5 relative"
                : ""
            }`}
          >
            {prayer.active && (
              <div className="absolute left-0 top-1 bottom-1 w-[3px] bg-[var(--gold)] rounded" />
            )}
            <span
              className={`text-sm font-medium ${
                prayer.active
                  ? "text-[var(--accent)]"
                  : "text-[var(--text)]"
              }`}
            >
              {prayer.en}
            </span>
            <span
              className={`text-sm font-semibold text-center tabular-nums ${
                prayer.active
                  ? "text-[var(--accent)]"
                  : "text-[var(--text)]"
              }`}
            >
              {prayer.time}
            </span>
            <span
              className="font-[family-name:var(--font-farsi)] text-sm text-[var(--text-secondary)] text-right"
              dir="rtl"
              lang="fa"
            >
              {prayer.fa}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-[var(--line-light)]">
        {nextPrayer && (
          <span className="text-xs text-[var(--text-secondary)]">
            Next: <strong className="text-[var(--gold)] font-semibold">{nextPrayer}</strong>
          </span>
        )}
        <a
          href={calendarHref}
          className="text-xs text-[var(--accent)] font-medium hover:underline ml-auto"
        >
          Monthly Calendar &rarr;
        </a>
      </div>
    </div>
  );
}
