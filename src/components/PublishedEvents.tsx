"use client";

import { useState, useEffect } from "react";
import SectionHeader from "./SectionHeader";

interface PublishedEvent {
  day: number;
  eventEn: string;
  eventFa: string;
  type: string;
}

interface MonthData {
  month: string;
  year: number;
  events: PublishedEvent[];
}

const colorMap: Record<string, string> = {
  holiday: "bg-[var(--gold)]",
  special: "bg-[var(--lapis)]",
  recurring: "bg-[var(--accent)]",
};

export default function PublishedEvents() {
  const [months, setMonths] = useState<MonthData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        if (data.events) setMonths(data.events);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (months.length === 0) return null;

  return (
    <section className="py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <SectionHeader
          overline="From Admin"
          title="Monthly Events Schedule"
          titleFa="برنامه ماهانه"
        />

        {months.map((m) => (
          <div key={`${m.month}-${m.year}`} className="mb-10">
            {/* Month badge */}
            <div className="inline-block bg-[var(--accent)] text-white px-4 py-1.5 rounded-lg mb-4">
              <span className="font-[family-name:var(--font-display)] font-semibold">
                {m.month} {m.year}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {m.events
                .filter((e) => e.type !== "recurring")
                .map((event, i) => (
                  <div
                    key={i}
                    className="bg-[var(--surface)] border border-[var(--line-light)] rounded-lg overflow-hidden transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div
                      className={`${colorMap[event.type] || "bg-[var(--accent)]"} text-white p-3 text-center`}
                    >
                      <div className="font-[family-name:var(--font-display)] text-2xl font-semibold leading-none">
                        {event.day}
                      </div>
                      <div className="text-xs font-medium tracking-widest uppercase opacity-90">
                        {m.month}
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-[family-name:var(--font-display)] text-base font-medium text-[var(--text)] mb-1">
                        {event.eventEn}
                      </h4>
                      <p
                        className="font-[IranNastaliq] text-sm text-[var(--gold)]"
                        dir="rtl"
                        lang="fa"
                      >
                        {event.eventFa}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
