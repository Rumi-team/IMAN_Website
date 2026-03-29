import Link from "next/link";
import Navbar from "@/components/Navbar";
import GeoDivider from "@/components/GeoDivider";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="girih-pattern" />
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative z-10 text-center">
          <p className="text-8xl font-[family-name:var(--font-display)] font-light text-[var(--accent)] mb-6">
            404
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl lg:text-4xl font-normal text-[var(--text)] mb-3">
            Page Not Found
          </h1>
          <p
            className="font-[IranNastaliq] text-xl text-[var(--gold)] mb-8"
            dir="rtl"
            lang="fa"
          >
            صفحه یافت نشد
          </p>
          <p className="text-[var(--text-secondary)] mb-10 max-w-[480px] mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-block bg-[var(--accent)] text-white px-8 py-3 rounded text-sm font-semibold tracking-wide hover:bg-[var(--accent-hover)] transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            Return to Home
          </Link>
        </div>
      </section>
      <GeoDivider />
      <Footer />
    </>
  );
}
