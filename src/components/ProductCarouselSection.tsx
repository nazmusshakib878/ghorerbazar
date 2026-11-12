"use client";

import React, { useMemo, useState } from "react";
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
  const [startIndex, setStartIndex] = useState(0);
  const perView = 5;
  const maxStart = Math.max(0, products.length - perView);

  const visibleProducts = useMemo(() => {
    if (products.length <= perView) return products;
    return products.slice(startIndex, startIndex + perView);
  }, [products, startIndex]);

  const totalDots = Math.max(1, maxStart + 1);

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

      {/* 5-Column Responsive Carousel */}
      <div className="relative group/slider">
        {products.length > perView && startIndex > 0 && (
          <button
            type="button"
            onClick={() => setStartIndex((prev) => Math.max(0, prev - 1))}
            aria-label={`Previous ${title}`}
            className="hidden md:flex absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white border border-gray-200 text-[#222831] hover:bg-[#f48721] hover:text-white hover:border-[#f48721] items-center justify-center shadow-md transition-all cursor-pointer"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {products.length > perView && startIndex < maxStart && (
          <button
            type="button"
            onClick={() => setStartIndex((prev) => Math.min(maxStart, prev + 1))}
            aria-label={`Next ${title}`}
            className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 h-9 w-9 rounded-full bg-white border border-gray-200 text-[#222831] hover:bg-[#f48721] hover:text-white hover:border-[#f48721] items-center justify-center shadow-md transition-all cursor-pointer"
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
                idx === startIndex
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
