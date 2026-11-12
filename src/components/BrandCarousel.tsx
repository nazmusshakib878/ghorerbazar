"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BRANDS } from "@/data/catalog";
import { SafeImage } from "@/components/SafeImage";

export function BrandCarousel() {
  const [page, setPage] = useState(0);
  const pageSize = 3;
  const totalPages = Math.max(1, BRANDS.length - pageSize + 1);
  const visibleBrands = BRANDS.slice(page, page + pageSize);

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
          className="text-[13px] font-bold uppercase tracking-wide text-[#f48721] hover:underline"
        >
          SEE ALL
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {visibleBrands.map((brand) => (
          <Link
            key={brand.id}
            href={`/brand/${encodeURIComponent(brand.slug)}`}
            className="group rounded-[10px] bg-white border border-[#ebebeb] p-6 h-[150px] flex flex-col items-center justify-center transition-all hover:border-[#f48721]/50 hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]"
          >
            <SafeImage
              src={brand.image}
              alt={brand.name}
              className="max-h-[76px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span className="mt-2.5 text-xs font-medium text-gray-500 group-hover:text-[#f48721]">
              {brand.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Orange Dot Indicators */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setPage(idx)}
            aria-label={`Brands slide ${idx + 1}`}
            className={`h-2.5 w-2.5 rounded-full transition-colors cursor-pointer ${
              idx === page
                ? "bg-[#f48721]"
                : "border border-[#f48721] bg-transparent hover:bg-[#f48721]/30"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
