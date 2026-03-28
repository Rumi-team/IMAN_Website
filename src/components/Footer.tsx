export default function Footer() {
  return (
    <footer className="bg-[var(--text)] text-[var(--muted)] py-16 px-6 lg:px-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--bg)] tracking-widest">
            IMAN
          </div>
          <div
            className="font-[family-name:var(--font-nastaliq)] text-base text-[var(--gold)] mt-1 mb-4"
            dir="rtl"
            lang="fa"
          >
            بنیاد فرهنگی ایرانیان مسلمان آمریکای شمالی
          </div>
          <p className="text-sm leading-relaxed">
            Iranian-American Muslim Association of North America. Serving the
            community with faith, culture, and compassion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[var(--bg)] mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "About Us", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Events", href: "/events" },
              { label: "Prayer Times", href: "/prayer-times" },
              { label: "Donate", href: "/donate" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[var(--bg)] mb-4">
            Services
          </h4>
          <ul className="space-y-2 text-sm">
            {[
              { label: "Weekly Classes", href: "/services" },
              { label: "Marriage", href: "/services" },
              { label: "Memorial", href: "/services" },
              { label: "Counseling", href: "/services" },
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[var(--bg)] mb-4">
            Contact
          </h4>
          <div className="space-y-2 text-sm leading-relaxed">
            <p>
              3376 Motor Ave
              <br />
              Los Angeles, CA 90034
            </p>
            <p>(310) 202-8181</p>
            <p>
              <a
                href="mailto:info@iman.org"
                className="hover:text-[var(--gold)] transition-colors"
              >
                info@iman.org
              </a>
            </p>
            <div className="mt-4">
              <p className="font-semibold text-[var(--bg)]">Office Hours</p>
              <p>Monday - Sunday</p>
              <p>9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center text-xs text-[var(--muted)]">
        <span>&copy; 2026 IMAN Foundation. All Rights Reserved.</span>
        <span
          className="font-[family-name:var(--font-farsi)] mt-2 sm:mt-0"
          dir="rtl"
          lang="fa"
        >
          ایمان &middot; لس آنجلس
        </span>
      </div>
    </footer>
  );
}
