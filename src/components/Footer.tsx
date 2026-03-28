export default function Footer() {
  return (
    <footer className="bg-[#151D22] text-[#9BA3A8] py-16 px-6 lg:px-10">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="font-[family-name:var(--font-display)] text-xl font-medium text-[#E8E2D8] tracking-widest">
            IMAN
          </div>
          <div
            className="font-[family-name:var(--font-nastaliq)] text-base text-[var(--gold)] mt-1 mb-4"
            dir="rtl"
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
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[#E8E2D8] mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            {["About Us", "Services", "Events", "Prayer Times", "Donate"].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[var(--gold)] transition-colors">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[#E8E2D8] mb-4">
            Services
          </h4>
          <ul className="space-y-2 text-sm">
            {["Weekly Classes", "Marriage", "Memorial", "Counseling"].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:text-[var(--gold)] transition-colors">
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold tracking-widest uppercase text-[#E8E2D8] mb-4">
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
              <p className="font-semibold text-[#E8E2D8]">Office Hours</p>
              <p>Monday - Sunday</p>
              <p>9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#6B7278]">
        <span>&copy; 2026 IMAN Foundation. All Rights Reserved.</span>
        <span
          className="font-[family-name:var(--font-farsi)] mt-2 sm:mt-0"
          dir="rtl"
        >
          ایمان &middot; لس آنجلس
        </span>
      </div>
    </footer>
  );
}
