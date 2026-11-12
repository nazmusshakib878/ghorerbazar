"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS, PRODUCTS, SITE_ASSETS, formatTaka } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";
import { SafeImage } from "@/components/SafeImage";
import {
  BrandLogoSvg,
  CartIcon,
  ChevronDownIcon,
  CloseIcon,
  HeartIcon,
  MenuLinesIcon,
  PhoneIcon,
  SearchIcon,
  TrackPinIcon,
  UserIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems, openCart, wishlist, user } = useStore();

  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [logoError, setLogoError] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(q))
    ).slice(0, 7);
  }, [query]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    setMoreOpen(false);
    setSearchFocused(false);
  }, [pathname]);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    setSearchFocused(false);
    if (trimmed) {
      router.push(`/collections/all-products?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/collections/all-products");
    }
  };

  return (
    <>
      {/* Header Middle (White Bar) */}
      <header className="bg-white border-b border-[#eeeeee] relative z-[60]">
        <div className="mx-auto max-w-[1320px] px-3 sm:px-6 h-[74px] md:h-[82px] flex items-center justify-between gap-3 md:gap-6">
          {/* Mobile menu trigger + Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open category menu"
              className="lg:hidden p-2 -ml-1 rounded-md text-[#222831] hover:bg-gray-100"
            >
              <MenuLinesIcon className="h-6 w-6" />
            </button>

            <Link href="/" className="flex items-center shrink-0">
              {logoError ? (
                <BrandLogoSvg />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={SITE_ASSETS.logo}
                  alt="GhorerBazar"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="h-9 sm:h-11 w-auto object-contain"
                />
              )}
            </Link>
          </div>

          {/* Search Bar with Instant Autocomplete */}
          <div ref={searchRef} className="relative flex-1 max-w-[540px] hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <input
                type="text"
                value={query}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSearchFocused(true);
                }}
                placeholder="Search in..."
                aria-label="Search products"
                className="w-full h-[42px] rounded-md bg-[#f4f5f7] border border-transparent focus:border-[#f48721]/60 focus:bg-white pl-4 pr-11 text-[14px] text-[#222831] placeholder:text-[#6b7280] outline-none transition-colors"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-0 top-0 h-[42px] w-11 flex items-center justify-center text-[#222831] hover:text-[#f48721] transition-colors"
              >
                <SearchIcon className="h-[19px] w-[19px]" />
              </button>
            </form>

            {/* Instant Search Dropdown */}
            {searchFocused && query.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-[46px] rounded-lg bg-white border border-[#e5e7eb] shadow-[0_14px_34px_rgba(0,0,0,0.12)] overflow-hidden z-[90]">
                {searchResults.length > 0 ? (
                  <>
                    <div className="divide-y divide-gray-100 max-h-[380px] overflow-y-auto">
                      {searchResults.map((item) => (
                        <Link
                          key={item.id}
                          href={`/products/${item.slug}`}
                          onClick={() => setSearchFocused(false)}
                          className="flex items-center gap-3 px-3.5 py-2.5 hover:bg-[#fff8f1] transition-colors"
                        >
                          <SafeImage
                            src={item.image}
                            alt={item.name}
                            className="h-12 w-12 rounded border border-gray-100 object-cover shrink-0 bg-white"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-[13.5px] font-medium text-[#222831] truncate">
                              {item.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[13px] font-bold text-[#f48721]">
                                {formatTaka(item.price)}
                              </span>
                              {item.regularPrice && (
                                <span className="text-[12px] text-gray-400 line-through">
                                  {formatTaka(item.regularPrice)}
                                </span>
                              )}
                              <span className="text-[11px] text-gray-500 ml-auto">
                                {item.brand}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleSearchSubmit}
                      className="w-full py-2.5 text-center text-[13px] font-semibold text-[#f48721] bg-[#faf8f5] hover:bg-[#fff3e6] border-t border-gray-100 transition-colors"
                    >
                      View all results for &ldquo;{query.trim()}&rdquo;
                    </button>
                  </>
                ) : (
                  <div className="p-5 text-center text-sm text-gray-500">
                    No products matched &ldquo;{query.trim()}&rdquo;. Try searching Honey, Dates, Ghee, or Mustard Oil.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Header Action Icons */}
          <div className="flex items-center gap-3.5 sm:gap-5 shrink-0">
            <Link
              href="/track/order"
              className="hidden md:flex flex-col items-center gap-0.5 text-[#222831] hover:text-[#f48721] transition-colors"
            >
              <TrackPinIcon className="h-[22px] w-[22px]" />
              <span className="text-[11.5px] font-medium whitespace-nowrap">Track Order</span>
            </Link>

            <Link
              href="/login"
              className="hidden sm:flex flex-col items-center gap-0.5 text-[#222831] hover:text-[#f48721] transition-colors"
            >
              <UserIcon className="h-[22px] w-[22px]" />
              <span className="text-[11.5px] font-medium whitespace-nowrap max-w-[68px] truncate">
                {user ? user.name.split(" ")[0] : "Sign In"}
              </span>
            </Link>

            <Link
              href="/my/wishlists"
              className="relative flex flex-col items-center gap-0.5 text-[#222831] hover:text-[#f48721] transition-colors"
            >
              <div className="relative">
                <HeartIcon className="h-[22px] w-[22px]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 h-4 min-w-[16px] px-1 rounded-full bg-[#041f1e] text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </div>
              <span className="text-[11.5px] font-medium hidden sm:inline">Wishlist</span>
            </Link>

            <button
              type="button"
              onClick={openCart}
              aria-label="Open shopping cart"
              className="relative flex flex-col items-center gap-0.5 text-[#222831] hover:text-[#f48721] transition-colors cursor-pointer"
            >
              <div className="relative">
                <CartIcon className="h-[22px] w-[22px]" />
                <span className="absolute -top-2 -right-2.5 h-[18px] min-w-[18px] px-1 rounded-full bg-[#f48721] text-white text-[10.5px] font-bold flex items-center justify-center leading-none">
                  {totalItems}
                </span>
              </div>
              <span className="text-[11.5px] font-medium hidden sm:inline">Cart</span>
            </button>

            {/* More Dropdown */}
            <div ref={moreRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setMoreOpen((v) => !v)}
                className="flex flex-col items-center gap-0.5 text-[#222831] hover:text-[#f48721] transition-colors cursor-pointer"
              >
                <MenuLinesIcon className="h-[22px] w-[22px]" />
                <span className="text-[11.5px] font-medium">More</span>
              </button>

              {moreOpen && (
                <div className="absolute right-0 top-[52px] w-48 rounded-lg bg-white border border-gray-200 shadow-[0_12px_30px_rgba(0,0,0,0.12)] py-1.5 z-[95]">
                  <Link
                    href="/my/wishlists"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#222831] hover:bg-[#fff8f1] hover:text-[#f48721]"
                  >
                    <HeartIcon className="h-4 w-4 text-[#f48721]" />
                    <span>Wishlists</span>
                  </Link>
                  <Link
                    href="/faq"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#222831] hover:bg-[#fff8f1] hover:text-[#f48721]"
                  >
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#f48721] text-[10px] font-bold text-[#f48721]">
                      ?
                    </span>
                    <span>Faqs</span>
                  </Link>
                  <Link
                    href="/page/about-us"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#222831] hover:bg-[#fff8f1] hover:text-[#f48721]"
                  >
                    <TrackPinIcon className="h-4 w-4 text-[#f48721]" />
                    <span>About Us</span>
                  </Link>
                  <a
                    href="tel:8809642922922"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#222831] hover:bg-[#fff8f1] hover:text-[#f48721]"
                  >
                    <PhoneIcon className="h-4 w-4 text-[#f48721]" />
                    <span>Call Us</span>
                  </a>
                  <a
                    href="https://api.whatsapp.com/send/?phone=8801321208940&text=Hello%20GhorerBazar,%20I%20want%20to%20talk%20with%20you."
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#222831] hover:bg-[#fff8f1] hover:text-[#088d2d]"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#088d2d]" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden px-3 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search in..."
              className="w-full h-[38px] rounded-md bg-[#f4f5f7] pl-3.5 pr-10 text-sm text-[#222831] outline-none"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-0 top-0 h-[38px] w-10 flex items-center justify-center text-[#222831]"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      </header>

      {/* Sticky Main Navigation Bar (#041f1e) */}
      <nav
        aria-label="Main Categories"
        className="sticky top-0 z-50 bg-[#041f1e] text-white shadow-sm hidden lg:block"
      >
        <div className="mx-auto max-w-[1320px] px-6 flex items-center justify-between min-h-[50px]">
          <ul className="flex items-center justify-between w-full gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href.split("?")[0]));
              const hasSub = Boolean(item.subcategories && item.subcategories.length > 0);
              return (
                <li
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => hasSub && setOpenDropdown(item.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 py-3 px-1.5 text-[13.5px] font-medium whitespace-nowrap transition-colors text-white hover:text-[#f48721]"
                    >
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      className={`inline-flex items-center gap-1 py-3 px-1.5 text-[13.5px] font-medium whitespace-nowrap transition-colors ${
                        item.highlight || isActive
                          ? "text-[#f48721]"
                          : "text-white hover:text-[#f48721]"
                      }`}
                    >
                      <span>{item.label}</span>
                      {hasSub && <ChevronDownIcon className="h-3.5 w-3.5 opacity-80" />}
                    </Link>
                  )}

                  {hasSub && openDropdown === item.label && (
                    <div className="absolute left-0 top-full w-56 rounded-b-lg bg-white border border-gray-200 shadow-xl py-2 z-[75]">
                      {item.subcategories!.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-[13.5px] text-[#222831] hover:bg-[#fff8f1] hover:text-[#f48721] transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-[300px] max-w-[85vw] bg-white h-full overflow-y-auto shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-4 py-3.5 bg-[#041f1e] text-white">
              <span className="font-bold text-base">GhorerBazar Menu</span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-1 text-white/90 hover:text-[#f48721]"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="divide-y divide-gray-100 py-2">
              {NAV_ITEMS.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 text-sm font-medium text-[#222831] hover:bg-[#fff8f1] hover:text-[#f48721]"
                  >
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center justify-between px-4 py-3 text-sm font-medium ${
                      item.highlight ? "text-[#f48721]" : "text-[#222831]"
                    } hover:bg-[#fff8f1]`}
                  >
                    <span>{item.label}</span>
                    {item.subcategories && (
                      <ChevronDownIcon className="h-4 w-4 -rotate-90 text-gray-400" />
                    )}
                  </Link>
                )
              )}
            </div>
            <div className="mt-auto border-t border-gray-200 p-4 space-y-2.5 bg-[#faf8f4]">
              <Link
                href="/track/order"
                className="flex items-center gap-2 text-sm font-medium text-[#222831]"
              >
                <TrackPinIcon className="h-4 w-4 text-[#f48721]" />
                <span>Track Order</span>
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2 text-sm font-medium text-[#222831]"
              >
                <UserIcon className="h-4 w-4 text-[#f48721]" />
                <span>{user ? user.name : "Sign In / Register"}</span>
              </Link>
              <a
                href="tel:8809642922922"
                className="flex items-center gap-2 text-sm font-medium text-[#222831]"
              >
                <PhoneIcon className="h-4 w-4 text-[#f48721]" />
                <span>+8809642922922</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
