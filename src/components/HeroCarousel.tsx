"use client";

import { useState, useEffect, useCallback } from "react";

export interface HeroSlide {
  imageUrl: string;
  message: string;
  messageFa?: string;
}

interface HeroCarouselProps {
  slides: HeroSlide[];
}

export default function HeroCarousel({ slides }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const next = useCallback(() => {
    if (slides.length > 1) setCurrent((c) => (c + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1 || reducedMotion) return;
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [slides.length, reducedMotion, next]);

  const hasSlides = slides.length > 0;
  const slide = hasSlides ? slides[current] : null;

  return (
    <section
      className="relative overflow-hidden min-h-[600px]"
      role="region"
      aria-label="Hero"
    >
      {/* Background layer */}
      {hasSlides ? (
        slides.map((s, i) => (
          <div
            key={s.imageUrl}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${s.imageUrl})`,
              opacity: i === current ? 1 : 0,
            }}
            role="img"
            aria-label={s.message || "IMAN community"}
            aria-hidden={i !== current}
          />
        ))
      ) : (
        <div className="girih-pattern" />
      )}

      {/* Overlay gradient for text readability */}
      {hasSlides && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10" />
      )}

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12 lg:py-16 relative z-10">
        <div className={`flex flex-col items-center text-center ${hasSlides ? "backdrop-blur-sm bg-black/20 rounded-2xl py-10 px-6" : ""}`}>
          <p
            className={`font-[IranNastaliq] text-xl opacity-85 mb-4 ${hasSlides ? "text-[#D4AD5A]" : "text-[var(--gold)]"}`}
            dir="rtl"
          >
            بسم الله الرحمن الرحیم
          </p>
          <h1
            className={`font-[family-name:var(--font-display)] text-5xl lg:text-7xl font-normal leading-[1.15] mb-4 ${hasSlides ? "text-white" : "text-[var(--text)]"}`}
          >
            A Home for{" "}
            <em className={`font-medium ${hasSlides ? "text-[#2A9AAF]" : "text-[var(--accent)]"}`}>
              Faith
            </em>
            ,
            <br />
            Culture &amp; Community
          </h1>
          <p
            className={`font-[IranNastaliq] text-lg mb-6 ${hasSlides ? "text-white/80" : "text-[var(--text-secondary)]"}`}
            dir="rtl"
            style={{ lineHeight: 2 }}
          >
            خانه‌ای برای ایمان، فرهنگ و اجتماع
          </p>
          <p
            className={`text-lg max-w-[520px] mb-8 ${hasSlides ? "text-white/90" : "text-[var(--text-secondary)]"}`}
          >
            Serving the Iranian-American Muslim community in Los Angeles since
            1990. Join us for prayer, learning, and celebration.
          </p>
          <div className="flex gap-4">
            <a
              href="#community"
              className="inline-block bg-[var(--accent)] text-white px-6 py-3 rounded text-sm font-semibold tracking-wide hover:bg-[var(--accent-hover)] transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              Join Our Community
            </a>
            <a
              href="/about"
              className={`inline-block border-[1.5px] px-6 py-3 rounded text-sm font-semibold tracking-wide transition-colors ${
                hasSlides
                  ? "border-white/40 text-white hover:border-white hover:text-white"
                  : "border-[var(--line)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
              }`}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Slide message overlay */}
      {slide?.message && (
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent px-6 py-6">
          <div
            className="max-w-[1200px] mx-auto text-center"
            aria-live="polite"
          >
            <p className="text-white text-lg font-medium line-clamp-2">
              {slide.message}
            </p>
            {slide.messageFa && (
              <p
                className="font-[IranNastaliq] text-[#D4AD5A] text-base mt-1"
                dir="rtl"
                lang="fa"
              >
                {slide.messageFa}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 left-0 right-0 z-10 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current
                  ? "bg-white w-6"
                  : "bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
