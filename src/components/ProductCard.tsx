"use client";

import React from "react";
import Link from "next/link";
import { Product, formatTaka } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";
import { SafeImage } from "@/components/SafeImage";
import { CartIcon, HeartIcon } from "@/components/Icons";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className="group relative flex flex-col justify-between rounded-[8px] border border-[#e5e7eb] bg-white p-3 transition-all duration-200 hover:shadow-[0_6px_22px_rgba(0,0,0,0.08)] hover:border-[#f48721]/40">
      {/* Top Left Status Badge + Top Right Save Badge */}
      <div className="relative">
        {product.badgeLeft && (
          <span className="absolute top-1 left-1 z-10 inline-flex items-center gap-1 rounded-[4px] bg-[#f48721] px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm">
            {product.badgeLeft === "Best Selling" && (
              <span aria-hidden="true">🔥</span>
            )}
            <span>{product.badgeLeft}</span>
          </span>
        )}

        {product.saveText && (
          <span className="absolute top-1 right-1 z-10 inline-flex items-center rounded-[4px] bg-[#088d2d] px-2 py-0.5 text-[11px] font-semibold text-white shadow-sm">
            {product.saveText}
          </span>
        )}

        {/* Wishlist toggle button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={
            wishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          className={`absolute ${
            product.saveText ? "top-8" : "top-1"
          } right-1 z-10 h-7 w-7 rounded-full flex items-center justify-center bg-white/90 border border-gray-200 transition-all cursor-pointer ${
            wishlisted
              ? "text-[#f48721] opacity-100"
              : "text-gray-400 opacity-0 group-hover:opacity-100 hover:text-[#f48721]"
          }`}
        >
          <HeartIcon className="h-4 w-4" filled={wishlisted} />
        </button>

        <Link
          href={`/products/${product.slug}`}
          className="block aspect-square w-full overflow-hidden rounded-md bg-white mb-3"
        >
          <SafeImage
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Info + Add To Cart */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <Link
            href={`/products/${product.slug}`}
            className="block text-[14px] font-medium leading-[1.38] text-[#222831] hover:text-[#f48721] line-clamp-2 min-h-[39px] transition-colors"
          >
            {product.name}
          </Link>

          <div className="mt-2 flex items-baseline gap-2 flex-wrap">
            <span className="text-[15.5px] font-bold text-[#f48721]">
              {formatTaka(product.price)}
            </span>
            {product.regularPrice && (
              <span className="text-[13px] text-[#9ca3af] line-through">
                {formatTaka(product.regularPrice)}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product, 1, true)}
          className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-[5px] border border-[#f48721] bg-white py-2 px-3 text-[13px] font-semibold text-[#f48721] hover:bg-[#f48721] hover:text-white transition-colors cursor-pointer"
        >
          <CartIcon className="h-4 w-4 shrink-0" />
          <span>Add To Cart</span>
        </button>
      </div>
    </div>
  );
}
