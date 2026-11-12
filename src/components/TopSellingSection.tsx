"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PRODUCTS, formatTaka } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";
import { SafeImage } from "@/components/SafeImage";
import { CartIcon } from "@/components/Icons";

export function TopSellingSection() {
  const router = useRouter();
  const { addToCart } = useStore();
  const topSelling = PRODUCTS.filter((p) => p.isTopSelling);

  return (
    <section className="mx-auto max-w-[1320px] px-3 sm:px-6 pb-12">
      <h2 className="text-center text-[22px] sm:text-[26px] font-semibold text-[#222831] mb-6">
        Top Selling Products
      </h2>

      <div className="space-y-5">
        {topSelling.map((product) => {
          const saveAmount =
            product.regularPrice && product.regularPrice > product.price
              ? product.regularPrice - product.price
              : 0;

          return (
            <div
              key={product.id}
              className="relative rounded-[14px] bg-white border border-[#ebebeb] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-5 sm:p-7 md:px-10 flex flex-col md:flex-row items-center gap-6 md:gap-12 transition-shadow hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)]"
            >
              {/* Top-Right Card Badges */}
              <div className="absolute top-4 right-4 sm:top-5 sm:right-6 flex items-center gap-2">
                {product.badgeLeft && (
                  <span className="inline-flex items-center gap-1 rounded-[5px] bg-[#f48721] px-2.5 py-1 text-xs font-semibold text-white">
                    <span aria-hidden="true">🔥</span>
                    <span>{product.badgeLeft}</span>
                  </span>
                )}
                {saveAmount > 0 && (
                  <span className="inline-flex items-center rounded-[5px] bg-[#e7f6ec] border border-[#088d2d]/20 px-2.5 py-1 text-xs font-semibold text-[#088d2d]">
                    Save {formatTaka(saveAmount)}
                  </span>
                )}
              </div>

              {/* Left Product Image */}
              <Link
                href={`/products/${product.slug}`}
                className="relative w-full md:w-[320px] lg:w-[360px] h-[220px] sm:h-[250px] shrink-0 flex items-center justify-center rounded-xl bg-white overflow-hidden"
              >
                {product.isFreeGiftPromo && (
                  <span className="absolute top-2 left-2 z-10 h-14 w-14 rounded-full bg-[#e11d48] text-white text-[12px] font-extrabold flex flex-col items-center justify-center leading-tight shadow-md rotate-[-12deg] border-2 border-dashed border-white">
                    <span>FREE</span>
                    <span className="text-[9px] font-semibold">GIFT</span>
                  </span>
                )}
                <SafeImage
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-contain p-2 transition-transform duration-300 hover:scale-105"
                />
              </Link>

              {/* Right Content & Action Buttons */}
              <div className="flex-1 w-full flex flex-col items-center md:items-start text-center md:text-left pt-1 md:pt-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#041f1e]/65 mb-1">
                  {product.brand} • {product.weight}
                </span>

                <Link
                  href={`/products/${product.slug}`}
                  className="text-[20px] sm:text-[23px] font-semibold text-[#222831] hover:text-[#f48721] transition-colors"
                >
                  {product.name}
                </Link>

                <p className="mt-2 text-sm text-[#4b5563] max-w-xl line-clamp-2">
                  {product.shortDescription}
                </p>

                <div className="mt-3.5 flex items-baseline gap-3 flex-wrap justify-center md:justify-start">
                  <span className="text-[22px] font-bold text-[#f48721]">
                    {formatTaka(product.price)}
                  </span>
                  {product.regularPrice && (
                    <span className="text-[16px] text-[#888888] line-through">
                      {formatTaka(product.regularPrice)}
                    </span>
                  )}
                </div>

                {/* Side-by-side Add To Cart + Buy now */}
                <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => addToCart(product, 1, true)}
                    className="inline-flex items-center justify-center gap-2 rounded-[6px] border-[1.5px] border-[#f48721] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#f48721] hover:bg-[#f48721] hover:text-white transition-colors cursor-pointer min-w-[148px]"
                  >
                    <CartIcon className="h-4 w-4" />
                    <span>Add To Cart</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/checkout?buyNow=${encodeURIComponent(product.slug)}`)
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-[6px] bg-[#f48721] hover:bg-[#df7412] px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-colors cursor-pointer min-w-[140px]"
                  >
                    <CartIcon className="h-4 w-4" />
                    <span>Buy now</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
