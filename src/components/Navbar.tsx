"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import DarkModeToggle from "./DarkModeToggle";

const navItems = [
  { en: "About", fa: "درباره ما", href: "/about" },
  { en: "Services", fa: "خدمات", href: "/services" },
  { en: "Events", fa: "رویدادها", href: "/events" },
  { en: "Prayer Times", fa: "اوقات شرعی", href: "/prayer-times" },
  { en: "Contact", fa: "تماس", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    if (mobileOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, close]);

  return (
    <nav className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-[var(--line-light)] bg-[var(--surface)]">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/iman-logo.jpg"
            alt="IMAN Logo"
            width={120}
            height={120}
            className="rounded"
          />
          <span className="font-[family-name:var(--font-display)] text-xl font-medium tracking-widest text-[var(--text)]">
            IMAN
          </span>
        </Link>
        <span
          className="font-[IranNastaliq] text-base text-[var(--gold)]"
          dir="rtl"
          lang="fa"
        >
          ایمان
        </span>
      </div>

      {/* Desktop nav */}
      <ul className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.en} className="text-center">
            <Link
              href={item.href}
              className="block py-2 px-1 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors tracking-wide"
            >
              {item.en}
              <span
                className="block font-[IranNastaliq] text-xs text-[var(--muted)] -mt-0.5"
                dir="rtl"
                lang="fa"
              >
                {item.fa}
              </span>
            </Link>
          </li>
        ))}
        <li>
          <Link
            href="/donate"
            className="bg-[var(--gold)] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-[var(--gold-light)] transition-colors"
          >
            Donate
          </Link>
        </li>
        <li>
          <DarkModeToggle />
        </li>
      </ul>

      {/* Hamburger button — visible below lg */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden p-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors"
        aria-label="Open navigation menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={close}
            aria-hidden="true"
          />

          {/* Drawer */}
          <div className="absolute top-0 right-0 w-[280px] h-full bg-[var(--surface)] shadow-xl flex flex-col">
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                onClick={close}
                className="p-2 text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                aria-label="Close navigation menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Nav items */}
            <ul className="flex flex-col gap-1 px-6">
              {navItems.map((item) => (
                <li key={item.en}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="flex items-center justify-between py-3 border-b border-[var(--line-light)] text-sm font-medium text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                  >
                    <span>{item.en}</span>
                    <span
                      className="font-[IranNastaliq] text-xs text-[var(--muted)]"
                      dir="rtl"
                      lang="fa"
                    >
                      {item.fa}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Donate + dark mode */}
            <div className="mt-auto px-6 pb-8 flex flex-col gap-4">
              <Link
                href="/donate"
                onClick={close}
                className="block text-center bg-[var(--gold)] text-white px-5 py-3 rounded text-sm font-semibold hover:bg-[var(--gold-light)] transition-colors"
              >
                Donate
              </Link>
              <div className="flex justify-center">
                <DarkModeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
