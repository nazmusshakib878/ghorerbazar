"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BRANDS } from "@/data/catalog";
import { SafeImage } from "@/components/SafeImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";

export function BrandCarousel() {
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, BRANDS.length - perView);
  const safeIndex = Math.min(index, maxIndex);
  const totalDots = Math.max(1, maxIndex + 1);

  return (
    <section className="mx-auto max-w-[1320px] px-3 sm:px-6 pb-11">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2.5">
        <div className="relative">
          <h2 className="text-[20px] sm:text-[23px] font-semibold text-[#222831]">
            Our Brands
          </h2>
          <span className="absolute left-0 -bottom-[11px] h-[2.5px] w-16 bg-[#f48721]" />
        </div>
        <Link
          href="/all-brands"
          className="inline-flex items-center gap-1 text-[13px] font-bold uppercase tracking-wide text-[#f48721] hover:underline"
        >
          <span>SEE ALL</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="relative group/brands">
        <button
          type="button"
          onClick={() => setIndex((i) => (i <= 0 ? maxIndex : i - 1))}
          aria-label="Previous brand"
          className="flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white border border-gray-200 text-[#222831] hover:bg-[#f48721] hover:text-white hover:border-[#f48721] items-center justify-center shadow-md lg:opacity-0 lg:group-hover/brands:opacity-100 transition-all cursor-pointer"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(safeIndex * 100) / perView}%)`,
            }}
          >
            {BRANDS.map((brand) => (
              <div
                key={brand.id}
                style={{ width: `${100 / perView}%` }}
                className="shrink-0 px-2.5"
              >
                <Link
                  href={`/brand/${encodeURIComponent(brand.slug)}`}
                  className="group rounded-[10px] bg-white border border-[#ebebeb] p-6 h-[138px] flex items-center justify-center transition-all hover:border-[#f48721]/50 hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
                >
                  <SafeImage
                    src={brand.image}
                    alt={brand.name}
                    className="max-h-[82px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIndex((i) => (i >= maxIndex ? 0 : i + 1))}
          aria-label="Next brand"
          className="flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white border border-gray-200 text-[#222831] hover:bg-[#f48721] hover:text-white hover:border-[#f48721] items-center justify-center shadow-md lg:opacity-0 lg:group-hover/brands:opacity-100 transition-all cursor-pointer"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Orange Dot Indicators */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {Array.from({ length: totalDots }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setIndex(idx)}
            aria-label={`Brands slide ${idx + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors cursor-pointer ${
              idx === safeIndex
                ? "bg-[#f48721]"
                : "border border-[#f48721] bg-transparent hover:bg-[#f48721]/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
