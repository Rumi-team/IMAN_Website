const prayers = [
  { en: "Fajr", fa: "\u0627\u0630\u0627\u0646 \u0635\u0628\u062D", time: "5:27 AM" },
  { en: "Sunrise", fa: "\u0637\u0644\u0648\u0639 \u0622\u0641\u062A\u0627\u0628", time: "6:41 AM" },
  { en: "Dhuhr", fa: "\u0627\u0630\u0627\u0646 \u0638\u0647\u0631", time: "12:57 PM" },
  { en: "Asr", fa: "\u0646\u0645\u0627\u0632 \u0639\u0635\u0631", time: "4:30 PM" },
  { en: "Maghrib", fa: "\u0627\u0630\u0627\u0646 \u0645\u063A\u0631\u0628", time: "7:29 PM", active: true },
  { en: "Isha", fa: "\u0646\u0645\u0627\u0632 \u0639\u0634\u0627", time: "8:18 PM" },
];

export default function PrayerCard() {
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
            Thursday, Mar 27, 2026
          </span>
          <span
            className="block font-[family-name:var(--font-farsi)] text-[var(--gold)] text-xs mt-0.5"
            dir="rtl"
          >
            ۷ فروردین ۱۴۰۵
          </span>
          <span className="block text-[var(--muted)] text-xs mt-0.5">
            8 Shawwal 1447
          </span>
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
            >
              {prayer.fa}
            </span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5 pt-4 border-t border-[var(--line-light)]">
        <span className="text-xs text-[var(--text-secondary)]">
          Next: <strong className="text-[var(--gold)] font-semibold">Isha in 1h 49m</strong>
        </span>
        <a
          href="/prayer-times"
          className="text-xs text-[var(--accent)] font-medium hover:underline"
        >
          Monthly Calendar &rarr;
        </a>
      </div>
    </div>
  );
}
