"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/data/catalog";
import { SafeImage } from "@/components/SafeImage";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";

export function FeaturedCategories() {
  const [perView, setPerView] = useState(6);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const updatePerView = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(2);
      else if (w < 768) setPerView(3);
      else if (w < 1024) setPerView(4);
      else setPerView(6);
    };
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  const maxIndex = Math.max(0, CATEGORIES.length - perView);
  const safeIndex = Math.min(index, maxIndex);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  return (
    <section className="mx-auto max-w-[1320px] px-3 sm:px-6 pt-3 pb-10">
      <h2 className="text-center text-[22px] sm:text-[26px] font-semibold text-[#222831] mb-6">
        Featured Categories
      </h2>

      <div className="relative px-2 sm:px-3">
        {/* Left Orange Arrow */}
        <button
          type="button"
          onClick={prev}
          aria-label="Scroll categories left"
          className="flex absolute -left-1 sm:-left-2.5 top-[42%] -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-[#f48721] hover:bg-[#df7412] text-white items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>

        {/* Smooth Horizontal Sliding Track */}
        <div className="overflow-hidden py-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(safeIndex * 100) / perView}%)`,
            }}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                style={{ width: `${100 / perView}%` }}
                className="shrink-0 px-2"
              >
                <Link
                  href={`/collections/${cat.slug}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="w-full aspect-[1.08/1] rounded-[12px] bg-white border border-[#f0f0f0] shadow-[0_3px_14px_rgba(0,0,0,0.05)] group-hover:shadow-[0_8px_22px_rgba(244,135,33,0.16)] group-hover:border-[#f48721]/50 flex items-center justify-center p-4 transition-all duration-200">
                    <SafeImage
                      src={cat.image}
                      alt={cat.name}
                      className="h-20 w-20 sm:h-24 sm:w-24 object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="mt-2.5 text-[14px] sm:text-[15px] font-medium text-[#222831] group-hover:text-[#f48721] transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right Orange Arrow */}
        <button
          type="button"
          onClick={next}
          aria-label="Scroll categories right"
          className="flex absolute -right-1 sm:-right-2.5 top-[42%] -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-[#f48721] hover:bg-[#df7412] text-white items-center justify-center shadow-md transition-colors cursor-pointer"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
