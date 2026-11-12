"use client";

import React, { useEffect, useRef, useState } from "react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackLabel?: string;
}

export function SafeImage({
  src,
  alt = "",
  className = "",
  fallbackLabel,
  ...rest
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setFailed(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setFailed(true);
    }
  }, [src]);

  if (failed || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#faf8f4] text-center p-3 text-[#6b7280] ${className}`}
        role="img"
        aria-label={alt || fallbackLabel || "GhorerBazar product image"}
      >
        <svg
          className="h-9 w-9 text-[#f48721]/70 mb-1.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5"
          />
        </svg>
        <span className="text-[11px] font-medium line-clamp-2 text-[#222831]">
          {fallbackLabel || alt || "GhorerBazar"}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}
