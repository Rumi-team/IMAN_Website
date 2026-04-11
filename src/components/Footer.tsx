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
            className="font-[IranNastaliq] text-base text-[var(--gold)] mt-1 mb-4"
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

            {/* Social Media */}
            <div className="flex gap-3 mt-5">
              <a href="https://www.instagram.com/imancenter" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.youtube.com/@IMANCenter" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
              <a href="https://www.facebook.com/IMANCulturalCenter/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://t.me/IMANCenter" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors" aria-label="Telegram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 4.4L2.4 10.8c-.6.2-.6 1.1 0 1.3l4.5 1.7 1.7 5.4c.1.4.6.6.9.3l2.5-2.1 4.8 3.5c.4.3 1 .1 1.1-.4L21.9 5.3c.2-.6-.3-1.1-.7-.9z"/><line x1="9" y1="14" x2="13.2" y2="10.2"/></svg>
              </a>
              <a href="https://x.com/imaninformation" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors" aria-label="X (Twitter)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.7 16h4.3L8.3 4H4z"/><path d="M4 20l6.8-8"/><path d="M20 4l-6.8 8"/></svg>
              </a>
              <a href="https://linkedin.com/company/imancenter" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://whatsapp.com/channel/0029Va8jQpa29758hnaST632" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold)] transition-colors" aria-label="WhatsApp">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center text-xs text-[var(--muted)]">
        <span>&copy; 2026 IMAN Foundation. All Rights Reserved.</span>
        <span
          className="font-[IranNastaliq] mt-2 sm:mt-0"
          dir="rtl"
          lang="fa"
        >
          ایمان &middot; لس آنجلس
        </span>
      </div>
    </footer>
  );
}
