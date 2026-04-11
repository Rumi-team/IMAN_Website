"use client";

import { useState, useEffect } from "react";
import { wisdoms } from "@/lib/wisdoms";

function getLADay(): number {
  const laStr = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  });
  const la = new Date(laStr);
  const start = new Date(la.getFullYear(), 0, 0);
  return Math.floor((la.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

export default function WisdomCard() {
  const [wisdom, setWisdom] = useState<(typeof wisdoms)[0] | null>(null);

  useEffect(() => {
    const dayIndex = getLADay() % wisdoms.length;
    setWisdom(wisdoms[dayIndex]);
  }, []);

  const w = wisdom ?? wisdoms[0];

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-xl p-6 shadow-lg relative overflow-hidden flex flex-col justify-center min-h-[280px]">
      {/* Top gradient border — matches PrayerCard */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--accent)] via-[var(--lapis)] to-[var(--gold)]" />

      <div className="mb-4 pb-4 border-b border-[var(--line-light)]">
        <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)]">
          Daily Wisdom
        </h3>
        <p
          className="font-[IranNastaliq] text-sm text-[var(--gold)] mt-0.5"
          dir="rtl"
          lang="fa"
        >
          حکمت روز
        </p>
      </div>

      <blockquote className="flex-1 flex flex-col justify-center">
        <p className="font-[family-name:var(--font-display)] text-lg leading-relaxed text-[var(--text)] italic mb-3">
          &ldquo;{w.en}&rdquo;
        </p>
        <p
          className="font-[IranNastaliq] text-base text-[var(--text-secondary)] leading-loose mb-4"
          dir="rtl"
          lang="fa"
        >
          &laquo;{w.fa}&raquo;
        </p>
        <footer className="text-sm font-medium text-[var(--gold)]">
          &mdash; {w.author}
        </footer>
      </blockquote>
    </div>
  );
}
