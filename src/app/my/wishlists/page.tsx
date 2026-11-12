"use client";

import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";
import { ProductCard } from "@/components/ProductCard";

export default function WishlistsPage() {
  const { wishlist } = useStore();
  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-[1320px] px-3 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#222831]">
          My Wishlist ({savedProducts.length})
        </h1>
        <nav className="text-xs text-gray-500">
          <Link href="/" className="hover:text-[#f48721]">
            Home
          </Link>{" "}
          &gt; <span className="text-[#222831] font-medium">Wishlist</span>
        </nav>
      </div>

      {savedProducts.length === 0 ? (
        <div className="rounded-xl bg-white border border-gray-200 p-12 text-center shadow-xs">
          <p className="text-lg font-semibold text-[#222831]">
            Your wishlist is currently empty
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Click the heart icon on any product to save it here for quick reordering.
          </p>
          <Link
            href="/collections/all-products"
            className="mt-5 inline-block rounded-md bg-[#f48721] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#df7412]"
          >
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
