import Link from "next/link";

const navItems = [
  { en: "About", fa: "\u062F\u0631\u0628\u0627\u0631\u0647 \u0645\u0627", href: "/about" },
  { en: "Services", fa: "\u062E\u062F\u0645\u0627\u062A", href: "/services" },
  { en: "Events", fa: "\u0631\u0648\u06CC\u062F\u0627\u062F\u0647\u0627", href: "/events" },
  { en: "Prayer Times", fa: "\u0627\u0648\u0642\u0627\u062A \u0634\u0631\u0639\u06CC", href: "/prayer-times" },
  { en: "Contact", fa: "\u062A\u0645\u0627\u0633", href: "/contact" },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-[var(--line-light)] bg-[var(--surface)]">
      <div className="flex items-baseline gap-3">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-xl font-medium tracking-widest text-[var(--text)]"
        >
          IMAN
        </Link>
        <span
          className="font-[family-name:var(--font-nastaliq)] text-base text-[var(--gold)]"
          dir="rtl"
        >
          \u0627\u06CC\u0645\u0627\u0646
        </span>
      </div>

      <ul className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.en} className="text-center">
            <Link
              href={item.href}
              className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors tracking-wide"
            >
              {item.en}
            </Link>
            <span
              className="block font-[family-name:var(--font-farsi)] text-[0.65rem] text-[var(--muted)] -mt-0.5"
              dir="rtl"
            >
              {item.fa}
            </span>
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
      </ul>
    </nav>
  );
}
