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
      <section className="py-24">
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
      <section className="bg-[var(--surface)] py-24">
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
