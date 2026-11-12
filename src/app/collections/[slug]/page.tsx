"use client";

import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { BRANDS, CATEGORIES, PRODUCTS, formatTaka } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { CloseIcon } from "@/components/Icons";

const COLLECTION_TITLES: Record<string, string> = {
  "all-products": "All Products",
  "offer-zone": "Offer Zone",
  "honey-2": "Honey",
  "oil-ghee": "Oil & Ghee",
  dates: "Dates",
  spices: "Spices",
  "nuts-seeds": "Nuts & Seeds",
  beverage: "Beverage",
  rice: "Rice",
  "flours-lentils": "Flours & Lentils",
  "organic-5": "Organic",
  "organic-certified": "Certified Organic",
  "functional-food": "Functional Food",
  "cooking-essentials": "Cooking Essentials",
  "organic-food": "Organic Food",
  pickle: "Pickle",
};

function CollectionViewInner() {
  const params = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const slug = params?.slug || "all-products";
  const searchQuery = searchParams.get("q") || "";
  const initialSub = searchParams.get("sub") || "";

  const [selectedSubs, setSelectedSubs] = useState<string[]>(
    initialSub ? [initialSub] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFlags, setSelectedFlags] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("default");
  const [perPage, setPerPage] = useState(16);
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const activeCategory = CATEGORIES.find((c) => c.slug === slug);
  const title = searchQuery
    ? `Search: "${searchQuery}"`
    : COLLECTION_TITLES[slug] || activeCategory?.name || "All Products";

  const subcategoryOptions = useMemo(() => {
    if (activeCategory) return activeCategory.subcategories;
    const set = new Set<string>();
    PRODUCTS.forEach((p) => {
      if (p.subcategory) set.add(p.subcategory);
    });
    return Array.from(set);
  }, [activeCategory]);

  const toggleItem = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    val: string
  ) => {
    setPage(1);
    setList((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    );
  };

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    // Collection filter
    if (slug === "offer-zone") {
      list = list.filter(
        (p) =>
          Boolean(p.regularPrice && p.regularPrice > p.price) ||
          p.badgeLeft === "Offered Items" ||
          Boolean(p.isFreeGiftPromo)
      );
    } else if (slug === "cooking-essentials") {
      list = list.filter((p) => p.sections.includes("cooking-essentials"));
    } else if (slug === "organic-food" || slug === "organic-certified") {
      list = list.filter(
        (p) =>
          p.sections.includes("organic-food") ||
          p.categorySlug === "organic-5" ||
          p.categorySlug === "functional-food"
      );
    } else if (slug !== "all-products") {
      const matched = list.filter(
        (p) =>
          p.categorySlug === slug ||
          p.category.toLowerCase().replace(/\s+/g, "-") === slug
      );
      if (matched.length > 0) {
        list = matched;
      }
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          (p.subcategory && p.subcategory.toLowerCase().includes(q))
      );
    }

    // Subcategory checklist
    if (selectedSubs.length > 0) {
      list = list.filter(
        (p) => p.subcategory && selectedSubs.includes(p.subcategory)
      );
    }

    // Brand checklist
    if (selectedBrands.length > 0) {
      list = list.filter((p) => selectedBrands.includes(p.brand));
    }

    // Product flag checklist
    if (selectedFlags.length > 0) {
      list = list.filter((p) => {
        if (selectedFlags.includes("Best Selling") && p.badgeLeft === "Best Selling")
          return true;
        if (selectedFlags.includes("New Arrival") && p.badgeLeft === "New Arrival")
          return true;
        if (
          selectedFlags.includes("Offered Items") &&
          (p.badgeLeft === "Offered Items" || Boolean(p.regularPrice))
        )
          return true;
        return false;
      });
    }

    // Price range
    list = list.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // Sort
    if (sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "latest") {
      list.sort((a, b) => b.id - a.id);
    } else if (sortBy === "oldest") {
      list.sort((a, b) => a.id - b.id);
    } else if (sortBy === "offered") {
      list.sort(
        (a, b) =>
          Number(Boolean(b.regularPrice)) - Number(Boolean(a.regularPrice))
      );
    }

    return list;
  }, [
    slug,
    searchQuery,
    selectedSubs,
    selectedBrands,
    selectedFlags,
    minPrice,
    maxPrice,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / perPage));
  const safePage = Math.min(page, totalPages);
  const pagedProducts = filteredProducts.slice(
    (safePage - 1) * perPage,
    safePage * perPage
  );

  const resetFilters = () => {
    setSelectedSubs([]);
    setSelectedBrands([]);
    setSelectedFlags([]);
    setMinPrice(0);
    setMaxPrice(5000);
    setSortBy("default");
    setPage(1);
  };

  const sidebarContent = (
    <div className="space-y-4">
      {/* Filter by Category */}
      <div className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 shadow-xs">
        <div className="border-b border-gray-100 pb-2 mb-3">
          <h3 className="text-[13px] font-bold uppercase tracking-wide text-[#222831] inline-block border-b-2 border-[#f48721] pb-1 -mb-[9px]">
            FILTER BY CATEGORY
          </h3>
        </div>
        <div className="space-y-2 max-h-[240px] overflow-y-auto pr-1">
          {subcategoryOptions.map((sub) => (
            <label
              key={sub}
              className="flex items-center gap-2.5 text-[13.5px] text-[#374151] hover:text-[#f48721] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedSubs.includes(sub)}
                onChange={() => toggleItem(selectedSubs, setSelectedSubs, sub)}
                className="h-4 w-4 rounded border-gray-300 accent-[#f48721]"
              />
              <span>{sub}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 shadow-xs">
        <div className="border-b border-gray-100 pb-2 mb-4">
          <h3 className="text-[13px] font-bold uppercase tracking-wide text-[#222831] inline-block border-b-2 border-[#f48721] pb-1 -mb-[9px]">
            PRICE RANGE
          </h3>
        </div>

        <div className="flex items-center justify-between text-[13.5px] font-semibold text-[#222831] mb-3">
          <span>{formatTaka(minPrice)}</span>
          <span>{formatTaka(maxPrice)}</span>
        </div>

        <div className="relative h-5 flex items-center">
          <div className="w-full h-1.5 rounded-full bg-gray-200 relative">
            <div
              className="absolute h-1.5 rounded-full bg-[#f48721]"
              style={{
                left: `${(minPrice / 5000) * 100}%`,
                right: `${100 - (maxPrice / 5000) * 100}%`,
              }}
            />
          </div>
          <input
            type="range"
            min={0}
            max={5000}
            step={50}
            value={minPrice}
            onChange={(e) => {
              const v = Math.min(Number(e.target.value), maxPrice - 100);
              setMinPrice(v);
              setPage(1);
            }}
            aria-label="Minimum price"
            className="gb-range absolute inset-0 w-full"
          />
          <input
            type="range"
            min={0}
            max={5000}
            step={50}
            value={maxPrice}
            onChange={(e) => {
              const v = Math.max(Number(e.target.value), minPrice + 100);
              setMaxPrice(v);
              setPage(1);
            }}
            aria-label="Maximum price"
            className="gb-range absolute inset-0 w-full"
          />
        </div>
      </div>

      {/* Brands */}
      <div className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 shadow-xs">
        <div className="border-b border-gray-100 pb-2 mb-3">
          <h3 className="text-[13px] font-bold uppercase tracking-wide text-[#222831] inline-block border-b-2 border-[#f48721] pb-1 -mb-[9px]">
            BRANDS
          </h3>
        </div>
        <div className="space-y-2">
          {BRANDS.map((brand) => (
            <label
              key={brand.id}
              className="flex items-center gap-2.5 text-[13.5px] text-[#374151] hover:text-[#f48721] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.name)}
                onChange={() =>
                  toggleItem(selectedBrands, setSelectedBrands, brand.name)
                }
                className="h-4 w-4 rounded border-gray-300 accent-[#f48721]"
              />
              <span>{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Product Flag */}
      <div className="rounded-[8px] border border-[#e5e7eb] bg-white p-4 shadow-xs">
        <div className="border-b border-gray-100 pb-2 mb-3">
          <h3 className="text-[13px] font-bold uppercase tracking-wide text-[#222831] inline-block border-b-2 border-[#f48721] pb-1 -mb-[9px]">
            PRODUCT FLAG
          </h3>
        </div>
        <div className="space-y-2">
          {["Best Selling", "New Arrival", "Offered Items"].map((flag) => (
            <label
              key={flag}
              className="flex items-center gap-2.5 text-[13.5px] text-[#374151] hover:text-[#f48721] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedFlags.includes(flag)}
                onChange={() => toggleItem(selectedFlags, setSelectedFlags, flag)}
                className="h-4 w-4 rounded border-gray-300 accent-[#f48721]"
              />
              <span>{flag}</span>
            </label>
          ))}
        </div>
      </div>

      {(selectedSubs.length > 0 ||
        selectedBrands.length > 0 ||
        selectedFlags.length > 0 ||
        minPrice > 0 ||
        maxPrice < 5000) && (
        <button
          type="button"
          onClick={resetFilters}
          className="w-full rounded-md border border-[#f48721] bg-white py-2 text-xs font-semibold text-[#f48721] hover:bg-[#f48721] hover:text-white transition-colors cursor-pointer"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1320px] px-3 sm:px-6 py-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h1 className="text-[22px] sm:text-[26px] font-semibold text-[#222831]">
          {title}
        </h1>
        <nav className="text-[13px] text-gray-500 flex items-center gap-1.5">
          <Link href="/" className="hover:text-[#f48721]">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-[#222831] font-medium">{title}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Filter Sidebar (Desktop) */}
        <aside className="hidden lg:block lg:col-span-3">{sidebarContent}</aside>

        {/* Right Toolbar + Product Grid */}
        <div className="lg:col-span-9 space-y-5">
          {/* Toolbar */}
          <div className="rounded-[8px] border border-[#e5e7eb] bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden rounded-md border border-[#f48721] px-3 py-1.5 text-xs font-semibold text-[#f48721]"
              >
                Filters
              </button>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort-select"
                  className="text-[13.5px] font-medium text-[#222831]"
                >
                  Sort By :
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-[5px] border border-gray-300 bg-white px-3 py-1.5 text-[13px] text-[#222831] outline-none focus:border-[#f48721]"
                >
                  <option value="default">Default Sorting</option>
                  <option value="latest">Sort by Latest</option>
                  <option value="oldest">Sort by Oldest</option>
                  <option value="price-asc">Price Low to High</option>
                  <option value="price-desc">Price High to Low</option>
                  <option value="offered">Offered Products</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-500 hidden sm:inline">
                {filteredProducts.length} items found
              </span>
              <select
                aria-label="Items per page"
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="rounded-[5px] border border-[#f48721]/60 bg-white px-3 py-1.5 text-[13px] font-medium text-[#f48721] outline-none"
              >
                <option value={16}>Default (16)</option>
                <option value={20}>Show 20</option>
                <option value={24}>Show 24</option>
                <option value={36}>Show 36</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {pagedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {pagedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
              <p className="text-lg font-semibold text-[#222831]">
                No products match your selected filters
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your price range or clearing category filters.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 rounded-md bg-[#f48721] px-5 py-2 text-sm font-semibold text-white hover:bg-[#df7412] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Pagination & Result Summary */}
          {filteredProducts.length > 0 && (
            <div className="rounded-[8px] border border-[#e5e7eb] bg-white px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-sm">
              <p className="text-xs sm:text-sm text-gray-500">
                Showing {(safePage - 1) * perPage + 1} -{" "}
                {Math.min(safePage * perPage, filteredProducts.length)} of{" "}
                {filteredProducts.length} results
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="rounded border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 disabled:opacity-40 hover:border-[#f48721] hover:text-[#f48721] cursor-pointer"
                >
                  &laquo; Previous
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setPage(i + 1)}
                    className={`h-7 min-w-[28px] rounded px-2 text-xs font-semibold cursor-pointer ${
                      safePage === i + 1
                        ? "bg-[#f48721] text-white"
                        : "border border-gray-200 text-gray-700 hover:border-[#f48721]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="rounded border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 disabled:opacity-40 hover:border-[#f48721] hover:text-[#f48721] cursor-pointer"
                >
                  Next &raquo;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[105] flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative z-10 w-[300px] max-w-[85vw] bg-[#faf8f4] h-full overflow-y-auto p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#222831]">Filter Products</h2>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-gray-500"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1320px] p-8">Loading collection...</div>}>
      <CollectionViewInner />
    </Suspense>
  );
}
