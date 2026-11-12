"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/Icons";

interface ProductCarouselSectionProps {
  title: string;
  viewAllHref: string;
  products: Product[];
}

export function ProductCarouselSection({
  title,
  viewAllHref,
  products,
}: ProductCarouselSectionProps) {
  const [perView, setPerView] = useState(5);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const updatePerView = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(2);
      else if (w < 768) setPerView(3);
      else if (w < 1024) setPerView(4);
      else setPerView(5);
    };
    updatePerView();
    window.addEventListener("resize", updatePerView);
    return () => window.removeEventListener("resize", updatePerView);
  }, []);

  const maxStart = Math.max(0, products.length - perView);
  const safeStart = Math.min(startIndex, maxStart);
  const totalDots = Math.max(1, maxStart + 1);

  const prev = () => setStartIndex((s) => (s <= 0 ? maxStart : s - 1));
  const next = () => setStartIndex((s) => (s >= maxStart ? 0 : s + 1));

  return (
    <section className="mx-auto max-w-[1320px] px-3 sm:px-6 pb-11">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2.5">
        <div className="relative">
          <h2 className="text-[20px] sm:text-[23px] font-semibold text-[#222831]">
            {title}
          </h2>
          <span className="absolute left-0 -bottom-[11px] h-[2.5px] w-20 bg-[#f48721]" />
        </div>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1 text-[13px] font-bold uppercase tracking-wide text-[#f48721] hover:underline"
        >
          <span>VIEW ALL ITEMS</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      {/* Smooth Sliding Track */}
      <div className="relative group/slider">
        {products.length > perView && (
          <button
            type="button"
            onClick={prev}
            aria-label={`Previous ${title}`}
            className="flex absolute -left-2 sm:-left-3.5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white border border-gray-200 text-[#222831] hover:bg-[#f48721] hover:text-white hover:border-[#f48721] items-center justify-center shadow-md lg:opacity-0 lg:group-hover/slider:opacity-100 transition-all cursor-pointer"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        )}

        <div className="overflow-hidden py-1">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(safeStart * 100) / perView}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{ width: `${100 / perView}%` }}
                className="shrink-0 px-1.5 sm:px-2"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {products.length > perView && (
          <button
            type="button"
            onClick={next}
            aria-label={`Next ${title}`}
            className="flex absolute -right-2 sm:-right-3.5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white border border-gray-200 text-[#222831] hover:bg-[#f48721] hover:text-white hover:border-[#f48721] items-center justify-center shadow-md lg:opacity-0 lg:group-hover/slider:opacity-100 transition-all cursor-pointer"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      {totalDots > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: totalDots }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setStartIndex(idx)}
              aria-label={`${title} slide ${idx + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors cursor-pointer ${
                idx === safeStart
                  ? "bg-[#f48721]"
                  : "border border-[#f48721] bg-transparent hover:bg-[#f48721]/30"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
