"use client";

import React from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { formatTaka, formatTakaDecimals } from "@/data/catalog";
import { SafeImage } from "@/components/SafeImage";
import { CloseIcon } from "@/components/Icons";

export function CartDrawer() {
  const {
    cart,
    subtotal,
    totalItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[1px] transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer Panel */}
      <aside
        aria-label="Shopping Cart"
        className="relative z-10 flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4 bg-[#faf8f4]">
          <div className="flex items-center gap-2">
            <h2 className="text-[15px] font-bold tracking-wide text-[#222831]">
              SHOPPING CART
            </h2>
            <span className="rounded-full bg-[#f48721] px-2 py-0.5 text-xs font-bold text-white">
              {totalItems}
            </span>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#6b7280] hover:text-[#f48721] transition-colors cursor-pointer"
          >
            <span>Close</span>
            <span>→</span>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="h-24 w-24 rounded-full bg-[#fff6ed] flex items-center justify-center mb-4">
                <svg
                  className="h-12 w-12 text-[#f48721]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4h2.5l2.2 10.5a1 1 0 001 .8h9.6a1 1 0 00.97-.76L21 7.5H6.2"
                  />
                  <circle cx="9.5" cy="19.5" r="1.5" />
                  <circle cx="17.5" cy="19.5" r="1.5" />
                </svg>
              </div>
              <p className="text-base font-semibold text-[#222831]">
                No items in your cart!
              </p>
              <p className="mt-1 text-sm text-gray-500 max-w-[240px]">
                Explore pure honey, mustard oil, ghee, and fresh dates to add to your basket.
              </p>
              <Link
                href="/collections/all-products"
                onClick={closeCart}
                className="mt-5 inline-flex items-center justify-center rounded-md bg-[#f48721] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#df7412] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-3.5 py-3.5">
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeCart}
                    className="h-[70px] w-[70px] shrink-0 rounded-md border border-gray-200 bg-white overflow-hidden"
                  >
                    <SafeImage
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain p-1"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={closeCart}
                        className="text-[13.5px] font-semibold text-[#222831] hover:text-[#f48721] line-clamp-2 leading-snug"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.productId)}
                        aria-label={`Remove ${item.name}`}
                        className="text-gray-400 hover:text-red-500 p-0.5 shrink-0 cursor-pointer"
                      >
                        <CloseIcon className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-1 text-[13px] font-bold text-[#f48721]">
                      {formatTaka(item.price)}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded border border-gray-300">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="h-7 w-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="h-7 min-w-[30px] px-1.5 flex items-center justify-center text-xs font-semibold text-[#222831] border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="h-7 w-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[13px] font-semibold text-[#222831]">
                        {formatTaka(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-5 bg-[#faf8f4] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-[#222831]">Subtotal:</span>
              <span className="text-lg font-bold text-[#f48721]">
                {formatTakaDecimals(subtotal)}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Delivery charge (৳60 Inside Dhaka / ৳120 Outside Dhaka) calculated at checkout.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={closeCart}
                className="rounded-md border border-[#f48721] bg-white py-2.5 px-3 text-sm font-semibold text-[#f48721] hover:bg-[#fff8f1] transition-colors cursor-pointer"
              >
                Continue Shop
              </button>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="inline-flex items-center justify-center rounded-md bg-[#f48721] py-2.5 px-3 text-sm font-semibold text-white hover:bg-[#df7412] transition-colors"
              >
                Checkout →
              </Link>
            </div>
            <button
              type="button"
              onClick={clearCart}
              className="w-full text-center text-xs text-gray-500 hover:text-red-600 underline pt-1 cursor-pointer"
            >
              Clear Shopping Cart
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
