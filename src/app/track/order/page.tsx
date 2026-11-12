"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CustomerOrder, useStore } from "@/context/StoreContext";
import { formatTakaDecimals } from "@/data/catalog";

const STATUS_STEPS: CustomerOrder["status"][] = [
  "Order Placed",
  "Confirmed",
  "Packed",
  "Out for Delivery",
  "Delivered",
];

function TrackOrderInner() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";
  const { findOrder, orders } = useStore();

  const [searchInput, setSearchInput] = useState(initialId || "GB-10042");
  const [matchedOrder, setMatchedOrder] = useState<CustomerOrder | undefined>(
    () => findOrder(initialId || "GB-10042")
  );
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      setSearchInput(initialId);
      setMatchedOrder(findOrder(initialId));
    }
  }, [initialId, findOrder]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    setMatchedOrder(findOrder(searchInput));
  };

  const activeStepIdx = matchedOrder
    ? STATUS_STEPS.indexOf(matchedOrder.status)
    : 0;

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-8 space-y-6">
      <div className="rounded-xl bg-white border border-gray-200 p-6 sm:p-8 shadow-xs">
        <h1 className="text-2xl font-bold text-[#222831]">Track Your Order</h1>
        <p className="mt-1 text-sm text-gray-500">
          Enter your GhorerBazar Order ID (e.g., <span className="font-semibold text-[#f48721]">GB-10042</span>) or registered mobile number.
        </p>

        <form onSubmit={handleTrack} className="mt-4 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Order ID or Phone Number..."
            className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#f48721]"
          />
          <button
            type="submit"
            className="rounded-md bg-[#f48721] hover:bg-[#df7412] px-6 py-2.5 text-sm font-bold text-white transition-colors cursor-pointer"
          >
            Track Order
          </button>
        </form>

        {orders.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>Recent orders:</span>
            {orders.slice(0, 4).map((o) => (
              <button
                key={o.orderId}
                type="button"
                onClick={() => {
                  setSearchInput(o.orderId);
                  setMatchedOrder(o);
                }}
                className="rounded bg-[#faf8f4] border border-gray-200 px-2 py-0.5 font-semibold text-[#041f1e] hover:border-[#f48721] cursor-pointer"
              >
                {o.orderId}
              </button>
            ))}
          </div>
        )}
      </div>

      {matchedOrder ? (
        <div className="rounded-xl bg-white border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <span className="text-xs text-gray-500">Order ID</span>
              <h2 className="text-xl font-bold text-[#f48721]">
                {matchedOrder.orderId}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 block">Current Status</span>
              <span className="inline-block rounded-full bg-[#e7f6ec] px-3 py-1 text-xs font-bold text-[#088d2d]">
                {matchedOrder.status}
              </span>
            </div>
          </div>

          {/* 5-step progress tracker */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {STATUS_STEPS.map((step, idx) => {
              const done = idx <= activeStepIdx;
              return (
                <div
                  key={step}
                  className={`rounded-lg border p-3 text-center ${
                    done
                      ? "border-[#f48721] bg-[#fff8f1]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <div
                    className={`mx-auto mb-1.5 h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      done
                        ? "bg-[#f48721] text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span
                    className={`text-xs font-semibold ${
                      done ? "text-[#222831]" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Order Items & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 text-sm">
            <div className="rounded-lg bg-[#faf8f4] p-4 space-y-1.5">
              <h3 className="font-bold text-[#222831] mb-2">Delivery Details</h3>
              <p>
                <span className="text-gray-500">Recipient:</span>{" "}
                {matchedOrder.customerName}
              </p>
              <p>
                <span className="text-gray-500">Phone:</span> {matchedOrder.phone}
              </p>
              <p>
                <span className="text-gray-500">Address:</span>{" "}
                {matchedOrder.address}
              </p>
            </div>

            <div className="rounded-lg bg-[#faf8f4] p-4 space-y-2">
              <h3 className="font-bold text-[#222831]">Items Ordered</h3>
              {matchedOrder.items.map((item) => (
                <div key={item.productId} className="flex justify-between text-xs">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    {formatTakaDecimals(item.price * item.quantity)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                <span>Total</span>
                <span className="text-[#f48721]">
                  {formatTakaDecimals(matchedOrder.total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        searched && (
          <div className="rounded-xl bg-white border border-gray-200 p-8 text-center">
            <p className="font-semibold text-[#222831]">
              No order found matching &ldquo;{searchInput}&rdquo;
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Check your Order ID or contact support at +8809642922922.
            </p>
            <Link
              href="/collections/all-products"
              className="mt-4 inline-block text-sm font-semibold text-[#f48721] hover:underline"
            >
              Back to Shopping →
            </Link>
          </div>
        )
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-4xl p-8">Loading tracker...</div>}>
      <TrackOrderInner />
    </Suspense>
  );
}
