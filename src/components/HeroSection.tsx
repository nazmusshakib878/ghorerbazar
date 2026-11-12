"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { HERO_SLIDES, SITE_ASSETS } from "@/data/catalog";
import { SafeImage } from "@/components/SafeImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";

export function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const prevSlide = () =>
    setActive((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextSlide = () =>
    setActive((prev) => (prev + 1) % HERO_SLIDES.length);

  return (
    <section className="mx-auto max-w-[1320px] px-3 sm:px-6 pt-4 sm:pt-5 pb-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        {/* Main Hero Sliding Track (8 columns) */}
        <div
          className="lg:col-span-8 relative group rounded-[10px] overflow-hidden bg-[#f5efe6] shadow-sm aspect-[5/2]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (delta > 40) prevSlide();
            if (delta < -40) nextSlide();
            touchStartX.current = null;
          }}
        >
          <div
            className="flex h-full w-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {HERO_SLIDES.map((slide) => (
              <Link
                key={slide.id}
                href={slide.href}
                className="w-full h-full shrink-0 block"
              >
                <SafeImage
                  src={slide.image}
                  alt={slide.title}
                  className="h-full w-full object-cover"
                />
              </Link>
            ))}
          </div>

          {/* Left & Right Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/90 hover:bg-[#f48721] text-[#222831] hover:text-white flex items-center justify-center shadow-md opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-all cursor-pointer"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white/90 hover:bg-[#f48721] text-[#222831] hover:text-white flex items-center justify-center shadow-md opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-all cursor-pointer"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          {/* Bottom-left Pagination Dots */}
          <div className="absolute bottom-3 left-4 z-20 flex items-center gap-2">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all cursor-pointer ${
                  idx === active
                    ? "w-2.5 bg-[#f48721] ring-2 ring-white/90"
                    : "w-2.5 bg-white/80 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Side Static Banner (4 columns) */}
        <Link
          href={SITE_ASSETS.rightPromoBanner.href}
          className="lg:col-span-4 rounded-[10px] overflow-hidden bg-[#f5efe6] shadow-sm block group aspect-[500/410] lg:aspect-auto lg:h-full"
        >
          <SafeImage
            src={SITE_ASSETS.rightPromoBanner.image}
            alt={SITE_ASSETS.rightPromoBanner.alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>
      </div>
    </section>
  );
}
