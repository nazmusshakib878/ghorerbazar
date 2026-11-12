"use client";

import React, { useEffect, useState } from "react";
import { TESTIMONIALS } from "@/data/catalog";
import { SafeImage } from "@/components/SafeImage";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "@/components/Icons";

export function TestimonialsSection() {
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, TESTIMONIALS.length - perView);
  const safeIndex = Math.min(index, maxIndex);
  const totalDots = Math.max(1, maxIndex + 1);

  return (
    <section className="mx-auto max-w-[1320px] px-3 sm:px-6 pb-12">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-2.5">
        <div className="relative">
          <h2 className="text-[20px] sm:text-[23px] font-semibold text-[#222831]">
            What Our Customers Say
          </h2>
          <span className="absolute left-0 -bottom-[11px] h-[2.5px] w-20 bg-[#f48721]" />
        </div>
      </div>

      <div className="relative group/testi">
        <button
          type="button"
          onClick={() => setIndex((i) => (i <= 0 ? maxIndex : i - 1))}
          aria-label="Previous testimonial"
          className="flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white border border-gray-200 text-[#222831] hover:bg-[#f48721] hover:text-white hover:border-[#f48721] items-center justify-center shadow-md lg:opacity-0 lg:group-hover/testi:opacity-100 transition-all cursor-pointer"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>

        <div className="overflow-hidden py-1">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${(safeIndex * 100) / perView}%)`,
            }}
          >
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                style={{ width: `${100 / perView}%` }}
                className="shrink-0 px-2.5"
              >
                <div className="h-full rounded-[10px] bg-white border border-[#ebebeb] p-5 sm:p-6 shadow-[0_3px_14px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-0.5 text-[#f59e0b]">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <StarIcon key={i} className="h-4 w-4" filled />
                      ))}
                    </div>
                    <p className="text-[13.5px] leading-relaxed text-[#4b5563] line-clamp-3">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <SafeImage
                      src={item.avatarSrc}
                      alt={item.name}
                      className="h-11 w-11 rounded-full object-cover border border-gray-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-[#222831] truncate">
                        {item.name}
                      </p>
                      <p className="text-[12px] text-gray-500 truncate">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIndex((i) => (i >= maxIndex ? 0 : i + 1))}
          aria-label="Next testimonial"
          className="flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 h-8 w-8 rounded-full bg-white border border-gray-200 text-[#222831] hover:bg-[#f48721] hover:text-white hover:border-[#f48721] items-center justify-center shadow-md lg:opacity-0 lg:group-hover/testi:opacity-100 transition-all cursor-pointer"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>

      {/* Orange Dot Indicators */}
      {totalDots > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {Array.from({ length: totalDots }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setIndex(idx)}
              aria-label={`Testimonials slide ${idx + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors cursor-pointer ${
                idx === safeIndex
                  ? "bg-[#f48721]"
                  : "border border-[#f48721] bg-transparent hover:bg-[#f48721]/30"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
