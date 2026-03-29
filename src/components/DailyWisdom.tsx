"use client";

import { useState, useEffect } from "react";
import { wisdoms } from "@/lib/wisdoms";

/** Get the day number in LA timezone (resets at midnight PT) */
function getLADay(): number {
  const laStr = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  const la = new Date(laStr);
  const start = new Date(la.getFullYear(), 0, 0);
  return Math.floor((la.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}

/** Calculate ms until next midnight PT */
function msUntilMidnightPT(): number {
  const laStr = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
  const la = new Date(laStr);
  const midnight = new Date(la);
  midnight.setHours(24, 0, 0, 0);
  return midnight.getTime() - la.getTime();
}

export default function DailyWisdom() {
  const [wisdom, setWisdom] = useState<typeof wisdoms[0] | null>(null);

  useEffect(() => {
    function update() {
      const dayIndex = getLADay() % wisdoms.length;
      setWisdom(wisdoms[dayIndex]);
    }

    update();

    // Schedule refresh at midnight PT
    const timeoutId = setTimeout(() => {
      update();
      // Then refresh every 24 hours
      const intervalId = setInterval(update, 24 * 60 * 60 * 1000);
      return () => clearInterval(intervalId);
    }, msUntilMidnightPT());

    return () => clearTimeout(timeoutId);
  }, []);

  if (!wisdom) return null;

  return (
    <div className="bg-[var(--text)] text-[var(--bg)] py-2.5 px-4 text-center">
      <p className="text-xs sm:text-sm leading-relaxed max-w-[900px] mx-auto">
        <span className="italic">&ldquo;{wisdom.en}&rdquo;</span>
        <span className="text-[var(--gold)] mx-2">|</span>
        <span
          className="font-[IranNastaliq] text-sm sm:text-base"
          dir="rtl"
          lang="fa"
        >
          &laquo;{wisdom.fa}&raquo;
        </span>
        <span className="text-[var(--muted)] ml-2 text-xs">
          — {wisdom.author}
        </span>
      </p>
    </div>
  );
}
