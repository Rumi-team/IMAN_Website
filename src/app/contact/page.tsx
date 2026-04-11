import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GeoDivider from "@/components/GeoDivider";

export const metadata: Metadata = {
  title: "Contact | IMAN",
  description:
    "Get in touch with IMAN Foundation. Visit us at 3376 Motor Ave, Los Angeles, CA 90034 or call (310) 202-8181.",
  openGraph: {
    title: "Contact | IMAN",
    description:
      "Get in touch with IMAN Foundation. Visit us at 3376 Motor Ave, Los Angeles, CA 90034 or call (310) 202-8181.",
    url: "https://iman.org/contact",
    siteName: "IMAN",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <PageHero title="Contact Us" titleFa="تماس با ما" />

      {/* ===== CONTACT SECTION ===== */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left — Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-3">
                  Address
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  3376 Motor Ave
                  <br />
                  Los Angeles, CA 90034
                </p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-3">
                  Phone &amp; Fax
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Phone:{" "}
                  <a href="tel:+13102028181" className="text-[var(--accent)] hover:underline">
                    (310) 202-8181
                  </a>
                  <br />
                  Fax: (310) 202-0878
                </p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-3">
                  Email
                </h3>
                <p className="text-[var(--text-secondary)]">
                  <a
                    href="mailto:info@iman.org"
                    className="text-[var(--accent)] hover:underline"
                  >
                    info@iman.org
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-3">
                  Office Hours
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Monday &ndash; Sunday
                  <br />
                  9:00 AM &ndash; 6:00 PM
                </p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-3">
                  Accessibility
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Languages: English, Farsi
                  <br />
                  Parking Available
                  <br />
                  Wheelchair Accessible
                </p>
              </div>
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-3">
                  Follow Us
                </h3>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/imancenter" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" aria-label="Instagram">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </a>
                  <a href="https://youtube.com/@imancenter" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" aria-label="YouTube">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                  </a>
                  <a href="https://www.facebook.com/IMANCulturalCenter/" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" aria-label="Facebook">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  </a>
                  <a href="https://t.me/IMANCenter" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" aria-label="Telegram">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.2 4.4L2.4 10.8c-.6.2-.6 1.1 0 1.3l4.5 1.7 1.7 5.4c.1.4.6.6.9.3l2.5-2.1 4.8 3.5c.4.3 1 .1 1.1-.4L21.9 5.3c.2-.6-.3-1.1-.7-.9z"/><line x1="9" y1="14" x2="13.2" y2="10.2"/></svg>
                  </a>
                  <a href="https://x.com/imaninformation" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" aria-label="X (Twitter)">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.7 16h4.3L8.3 4H4z"/><path d="M4 20l6.8-8"/><path d="M20 4l-6.8 8"/></svg>
                  </a>
                  <a href="https://linkedin.com/company/imancenter" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" aria-label="LinkedIn">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </a>
                  <a href="https://whatsapp.com/channel/0029Va8jQpa29758hnaST632" target="_blank" rel="noopener noreferrer" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors" aria-label="WhatsApp">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-[var(--surface)] border border-[var(--line-light)] rounded-lg p-8">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-1">
                Send a Message
              </h3>
              <p
                className="font-[IranNastaliq] text-sm text-[var(--gold)] mb-6"
                dir="rtl"
                lang="fa"
              >
                ارسال پیام
              </p>
              <form action="#" className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full bg-[var(--bg)] border border-[var(--line)] rounded px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-[var(--bg)] border border-[var(--line)] rounded px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full bg-[var(--bg)] border border-[var(--line)] rounded px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                    placeholder="Subject"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-[var(--bg)] border border-[var(--line)] rounded px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--muted)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-y"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-block bg-[var(--accent)] text-white px-8 py-3 rounded text-sm font-semibold tracking-wide hover:bg-[var(--accent-hover)] transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <GeoDivider />

      {/* ===== MAP ===== */}
      <section className="bg-[var(--surface)] py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3306.2!2d-118.3986!3d34.0237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2ba4c9e8d4a8b%3A0x4e1e3f8c9f0d5a2b!2s3376+Motor+Ave%2C+Los+Angeles%2C+CA+90034!5e0!3m2!1sen!2sus!4v1"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
              title="IMAN Foundation Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
