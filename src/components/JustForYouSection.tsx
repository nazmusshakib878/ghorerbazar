"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export function JustForYouSection() {
  const allCurated = PRODUCTS.filter((p) => p.sections.includes("just-for-you"));
  const [visibleCount, setVisibleCount] = useState(12);
  const shown = allCurated.slice(0, visibleCount);
  const hasMore = visibleCount < allCurated.length;

  return (
    <section className="mx-auto max-w-[1320px] px-3 sm:px-6 pb-12">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2.5">
        <div className="relative">
          <h2 className="text-[20px] sm:text-[23px] font-semibold text-[#222831]">
            Just For You
          </h2>
          <span className="absolute left-0 -bottom-[11px] h-[2.5px] w-20 bg-[#f48721]" />
        </div>
        <Link
          href="/collections/all-products"
          className="inline-flex items-center gap-1 text-[13px] font-bold uppercase tracking-wide text-[#f48721] hover:underline"
        >
          <span>VIEW ALL PRODUCTS</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {shown.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="rounded-md bg-[#f48721] hover:bg-[#df7412] px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
}
