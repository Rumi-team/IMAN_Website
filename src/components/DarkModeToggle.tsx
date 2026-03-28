"use client";

import { useEffect } from "react";

/**
 * Auto dark mode based on Los Angeles time.
 * Dark mode activates between 7:30 PM and 5:30 AM LA time.
 * No visible UI — the theme switches automatically.
 */
export default function DarkModeToggle() {
  useEffect(() => {
    function updateTheme() {
      const laTime = new Date(
        new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
      );
      const hour = laTime.getHours();
      const minute = laTime.getMinutes();
      const totalMinutes = hour * 60 + minute;

      // Dark between 19:30 (7:30 PM) and 05:30 (5:30 AM)
      const isDark = totalMinutes >= 19 * 60 + 30 || totalMinutes < 5 * 60 + 30;
      document.documentElement.classList.toggle("dark", isDark);
    }

    updateTheme();
    // Re-check every 5 minutes
    const interval = setInterval(updateTheme, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // No visible UI — auto dark mode only
  return null;
}
