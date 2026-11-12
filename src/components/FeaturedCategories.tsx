"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/catalog";
import { SafeImage } from "@/components/SafeImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";

export function FeaturedCategories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const slideBy = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const distance = Math.max(320, el.clientWidth * 0.72);
    el.scrollBy({
      left: dir === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-[1320px] px-3 sm:px-6 pt-3 pb-10">
      <h2 className="text-center text-[22px] sm:text-[26px] font-semibold text-[#222831] mb-6">
        Featured Categories
      </h2>

      <div className="relative">
        {/* Left Orange Arrow */}
        <button
          type="button"
          onClick={() => slideBy("left")}
          aria-label="Scroll categories left"
          className="hidden sm:flex absolute -left-3.5 top-[42%] -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-[#f48721] hover:bg-[#df7412] text-white items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {/* Categories Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="group shrink-0 w-[132px] sm:w-[162px] md:w-[186px] flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[1.08/1] rounded-[12px] bg-white border border-[#f0f0f0] shadow-[0_3px_14px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_22px_rgba(244,135,33,0.16)] group-hover:border-[#f48721]/50 flex items-center justify-center p-4 transition-all duration-200">
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  className="h-24 w-24 sm:h-28 sm:w-28 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="mt-2.5 text-[14px] sm:text-[15px] font-medium text-[#222831] group-hover:text-[#f48721] transition-colors">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Orange Arrow */}
        <button
          type="button"
          onClick={() => slideBy("right")}
          aria-label="Scroll categories right"
          className="hidden sm:flex absolute -right-3.5 top-[42%] -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-[#f48721] hover:bg-[#df7412] text-white items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
