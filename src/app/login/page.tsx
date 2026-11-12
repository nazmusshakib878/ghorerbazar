"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
import { formatTakaDecimals } from "@/data/catalog";

export default function LoginPage() {
  const { user, signIn, signOut, orders } = useStore();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
      return;
    }
    signIn(name || "GhorerBazar Member", phone);
  };

  if (user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
        <div className="rounded-xl bg-white border border-gray-200 p-6 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#f48721] font-bold">
              Customer Account
            </p>
            <h1 className="text-2xl font-bold text-[#222831] mt-0.5">
              Welcome, {user.name}
            </h1>
            <p className="text-sm text-gray-500">Phone: {user.phone}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-semibold text-[#222831] hover:border-[#f48721] hover:text-[#f48721] cursor-pointer"
          >
            Sign Out
          </button>
        </div>

        <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-xs">
          <h2 className="text-lg font-bold text-[#222831] mb-4">
            Recent Orders ({orders.length})
          </h2>
          <div className="divide-y divide-gray-100">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="py-3 flex flex-wrap items-center justify-between gap-3 text-sm"
              >
                <div>
                  <span className="font-bold text-[#f48721]">{order.orderId}</span>
                  <span className="text-gray-500 ml-2">
                    • {order.items.length} items
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-[#222831]">
                    {formatTakaDecimals(order.total)}
                  </span>
                  <Link
                    href={`/track/order?id=${encodeURIComponent(order.orderId)}`}
                    className="rounded bg-[#041f1e] px-3 py-1 text-xs font-semibold text-white hover:bg-[#08312f]"
                  >
                    Track
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="rounded-xl bg-white border border-gray-200 p-6 sm:p-8 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#222831]">Sign In</h1>
          <p className="text-sm text-gray-500 mt-1">
            Access your GhorerBazar orders &amp; saved wishlist
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#222831] mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-md border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#f48721]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#222831] mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01XXXXXXXXX"
              className="w-full rounded-md border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#f48721]"
            />
          </div>

          {otpSent && (
            <div>
              <label className="block text-xs font-semibold text-[#222831] mb-1">
                Verification Code (Demo: enter any 4 digits)
              </label>
              <input
                type="text"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="e.g. 1234"
                className="w-full rounded-md border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#f48721]"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-[#f48721] hover:bg-[#df7412] py-2.5 text-sm font-bold text-white transition-colors cursor-pointer"
          >
            {otpSent ? "Verify & Sign In" : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
