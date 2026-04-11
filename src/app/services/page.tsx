import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import GeoDivider from "@/components/GeoDivider";

export const metadata: Metadata = {
  title: "Services | IMAN",
  description:
    "IMAN offers a wide range of services including weekly classes, marriage ceremonies, memorial services, prayer gatherings, and counseling for the Iranian-American Muslim community.",
  openGraph: {
    title: "Services | IMAN",
    description:
      "IMAN offers a wide range of services including weekly classes, marriage ceremonies, memorial services, prayer gatherings, and counseling.",
    url: "https://iman.org/services",
    siteName: "IMAN",
    type: "website",
  },
};

const services = [
  {
    en: "Weekly Classes",
    fa: "کلاس‌های هفتگی",
    desc: "Quran study, Islamic jurisprudence, and Persian language classes for all ages. Weekly gatherings that strengthen knowledge and community bonds.",
    schedule: "Sundays & Wednesdays, 6:00 PM",
  },
  {
    en: "Marriage Services",
    fa: "خدمات ازدواج",
    desc: "Traditional Islamic marriage ceremonies (Aqd) with full cultural observance. Pre-marriage counseling and family guidance available.",
    schedule: "By appointment",
  },
  {
    en: "Memorial Services",
    fa: "مراسم یادبود",
    desc: "Compassionate funeral and memorial support following Islamic traditions. Community support for families during difficult times.",
    schedule: "As needed — contact office",
  },
  {
    en: "Dua Kumayl",
    fa: "دعای کمیل",
    desc: "Every Thursday evening, join the community for this beloved supplication. A weekly gathering of spiritual reflection and collective prayer.",
    schedule: "Every Thursday, 7:30 PM",
  },
  {
    en: "Jumu'ah Prayer",
    fa: "نماز جمعه",
    desc: "Friday congregational prayer led by our resident scholars. A cornerstone of the weekly community gathering.",
    schedule: "Every Friday, 1:00 PM",
  },
  {
    en: "Quran Study",
    fa: "مطالعه قرآن",
    desc: "Weekly Quran study circles exploring tafsir and recitation. Open to all levels, from beginners to advanced students.",
    schedule: "Sundays, 10:00 AM",
  },
  {
    en: "Youth Programs",
    fa: "برنامه‌های جوانان",
    desc: "Programs designed for young community members including Islamic studies, cultural education, sports, and social activities.",
    schedule: "Saturdays, 2:00 PM",
  },
  {
    en: "Counseling",
    fa: "مشاوره",
    desc: "Family and spiritual counseling services provided with compassion and confidentiality. Supporting members through life's challenges.",
    schedule: "By appointment",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <PageHero
        title="Our Services"
        titleFa="خدمات ما"
        description="IMAN offers a wide range of services to support the spiritual, educational, and cultural needs of our community."
      />

      <GeoDivider />

      {/* ===== SERVICES GRID ===== */}
      <section className="py-16">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((service) => (
              <div
                key={service.en}
                className="group bg-[var(--surface)] border border-[var(--line-light)] rounded-lg p-6 transition-all hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
              >
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-[var(--text)] mb-1">
                  {service.en}
                </h3>
                <p
                  className="font-[IranNastaliq] text-sm text-[var(--gold)] mb-3"
                  dir="rtl"
                  lang="fa"
                >
                  {service.fa}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  {service.desc}
                </p>
                <p className="text-xs font-medium text-[var(--accent)]">
                  {service.schedule}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
