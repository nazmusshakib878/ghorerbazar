"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FAQ_ITEMS } from "@/data/catalog";

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl px-3 sm:px-6 py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#222831]">
          Frequently Asked Questions
        </h1>
        <Link href="/" className="text-sm font-semibold text-[#f48721]">
          Home
        </Link>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, idx) => {
          const open = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-xl bg-white border border-gray-200 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 font-semibold text-[#222831] hover:text-[#f48721] cursor-pointer"
              >
                <span>{item.q}</span>
                <span className="text-xl text-[#f48721] leading-none">
                  {open ? "−" : "+"}
                </span>
              </button>
              {open && (
                <div className="px-5 pb-4 text-sm leading-relaxed text-[#4b5563] border-t border-gray-100 pt-3">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
