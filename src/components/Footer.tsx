"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SITE_ASSETS } from "@/data/catalog";
import { BrandLogoSvg, MailIcon, PhoneIcon, TrackPinIcon } from "@/components/Icons";

export function Footer() {
  const [logoError, setLogoError] = useState(false);
  const [payImgError, setPayImgError] = useState(false);
  const [playErr, setPlayErr] = useState(false);
  const [appErr, setAppErr] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-6 text-[#4b5563]">
      <div className="mx-auto max-w-[1320px] px-3 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10">
          {/* Column 1: Brand Info & Contact */}
          <div className="lg:col-span-4 space-y-4 pr-0 lg:pr-6">
            <Link href="/" className="inline-block">
              {logoError ? (
                <BrandLogoSvg />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={SITE_ASSETS.logo}
                  alt="GhorerBazar"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="h-11 w-auto object-contain"
                />
              )}
            </Link>

            <p className="text-[14px] leading-relaxed text-[#555555]">
              Ghorer Bazar is an e-commerce platform dedicated to providing safe and
              reliable food to every home.
            </p>

            <ul className="space-y-2.5 text-[14px] text-[#4b5563]">
              <li className="flex items-start gap-2.5">
                <TrackPinIcon className="h-4 w-4 text-[#f48721] shrink-0 mt-1" />
                <span>Rampura, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <PhoneIcon className="h-4 w-4 text-[#f48721] shrink-0" />
                <a href="tel:+8809642922922" className="hover:text-[#f48721]">
                  +8809642922922
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MailIcon className="h-4 w-4 text-[#f48721] shrink-0" />
                <a
                  href="mailto:contact@ghorerbazar.com"
                  className="hover:text-[#f48721]"
                >
                  contact@ghorerbazar.com
                </a>
              </li>
            </ul>

            {/* Social Media Buttons */}
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="h-9 w-9 rounded-full bg-[#fdf4ec] text-[#f48721] hover:bg-[#f48721] hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="h-9 w-9 rounded-full bg-[#fdf4ec] text-[#f48721] hover:bg-[#f48721] hover:text-white flex items-center justify-center transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.38 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.29 3.9A12.14 12.14 0 013.06 4.8a4.28 4.28 0 001.32 5.71 4.25 4.25 0 01-1.94-.54v.05a4.28 4.28 0 003.43 4.2 4.3 4.3 0 01-1.93.07 4.28 4.28 0 004 2.97A8.59 8.59 0 012 19.08 12.12 12.12 0 008.56 21c7.88 0 12.19-6.53 12.19-12.19l-.01-.55A8.7 8.7 0 0022.46 6z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="h-9 w-9 rounded-full bg-[#fdf4ec] text-[#f48721] hover:bg-[#f48721] hover:text-white flex items-center justify-center transition-colors"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </div>

            {/* Mobile App Badges */}
            <div className="pt-2">
              <p className="text-[13.5px] font-semibold text-[#222831] mb-2.5">
                Download App on Mobile :
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.ghorerbazar.official"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block"
                >
                  {playErr ? (
                    <span className="inline-flex items-center gap-2 rounded-md bg-[#111827] text-white px-3 py-1.5 text-xs font-semibold">
                      Google Play
                    </span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={SITE_ASSETS.googlePlayBadge}
                      alt="Get it on Google Play"
                      referrerPolicy="no-referrer"
                      onError={() => setPlayErr(true)}
                      className="h-9 w-auto object-contain"
                    />
                  )}
                </a>
                <a
                  href="https://apps.apple.com/app/ghorer-bazar/id6764511612"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block"
                >
                  {appErr ? (
                    <span className="inline-flex items-center gap-2 rounded-md bg-white border border-gray-300 text-[#111827] px-3 py-1.5 text-xs font-semibold">
                      App Store
                    </span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={SITE_ASSETS.appStoreBadge}
                      alt="Download on the App Store"
                      referrerPolicy="no-referrer"
                      onError={() => setAppErr(true)}
                      className="h-9 w-auto object-contain"
                    />
                  )}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Information */}
          <div className="lg:col-span-2">
            <h3 className="text-[16px] font-semibold text-[#222831] mb-4">
              Information
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="/page/about-us" className="hover:text-[#f48721]">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/page/contact-us" className="hover:text-[#f48721]">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/page/company-information" className="hover:text-[#f48721]">
                  Company Information
                </Link>
              </li>
              <li>
                <Link href="/page/stories" className="hover:text-[#f48721]">
                  Ghorer Bazar Stories
                </Link>
              </li>
              <li>
                <Link href="/page/terms" className="hover:text-[#f48721]">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/page/privacy" className="hover:text-[#f48721]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/page/careers" className="hover:text-[#f48721]">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Shop By */}
          <div className="lg:col-span-2">
            <h3 className="text-[16px] font-semibold text-[#222831] mb-4">
              Shop By
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="/collections/oil-ghee" className="hover:text-[#f48721]">
                  Oil &amp; Ghee
                </Link>
              </li>
              <li>
                <Link href="/collections/honey-2" className="hover:text-[#f48721]">
                  Honey
                </Link>
              </li>
              <li>
                <Link href="/collections/dates" className="hover:text-[#f48721]">
                  Dates
                </Link>
              </li>
              <li>
                <Link href="/collections/spices" className="hover:text-[#f48721]">
                  Spices
                </Link>
              </li>
              <li>
                <Link href="/collections/nuts-seeds" className="hover:text-[#f48721]">
                  Nuts &amp; Seeds
                </Link>
              </li>
              <li>
                <Link href="/collections/beverage" className="hover:text-[#f48721]">
                  Beverage
                </Link>
              </li>
              <li>
                <Link href="/collections/functional-food" className="hover:text-[#f48721]">
                  Functional Foods
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="lg:col-span-2">
            <h3 className="text-[16px] font-semibold text-[#222831] mb-4">
              Support
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="/page/support" className="hover:text-[#f48721]">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/page/how-to-order" className="hover:text-[#f48721]">
                  How to Order
                </Link>
              </li>
              <li>
                <Link href="/track/order" className="hover:text-[#f48721]">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link href="/page/payment" className="hover:text-[#f48721]">
                  Payment
                </Link>
              </li>
              <li>
                <Link href="/page/shipping" className="hover:text-[#f48721]">
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#f48721]">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Consumer Policy */}
          <div className="lg:col-span-2">
            <h3 className="text-[16px] font-semibold text-[#222831] mb-4">
              Consumer Policy
            </h3>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="/page/happy-return" className="hover:text-[#f48721]">
                  Happy Return
                </Link>
              </li>
              <li>
                <Link href="/page/refund-policy" className="hover:text-[#f48721]">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/page/exchange" className="hover:text-[#f48721]">
                  Exchange
                </Link>
              </li>
              <li>
                <Link href="/page/cancellation" className="hover:text-[#f48721]">
                  Cancellation
                </Link>
              </li>
              <li>
                <Link href="/page/pre-order" className="hover:text-[#f48721]">
                  Pre-Order
                </Link>
              </li>
              <li>
                <Link href="/page/extra-discount" className="hover:text-[#f48721]">
                  Extra Discount
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright + Pay With Row (matching ghorerbazar.com) */}
        <div className="border-t border-gray-200 pt-5 flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="text-[13.5px] text-[#6b7280] shrink-0">
            Copyright &copy; 2026 GhorerBazar
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3">
            <span className="text-sm font-semibold text-[#222831] shrink-0">
              Pay With
            </span>
            {payImgError ? (
              <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs font-bold text-[#222831]">
                {["VISA", "Mastercard", "AMEX", "bKash", "Nagad", "Rocket", "SSLCOMMERZ"].map(
                  (label) => (
                    <span
                      key={label}
                      className="rounded border border-gray-200 bg-white px-2.5 py-1 shadow-2xs"
                    >
                      {label}
                    </span>
                  )
                )}
              </div>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={SITE_ASSETS.paymentGateway}
                alt="Pay With VISA, Mastercard, American Express, bKash, Nagad, Rocket, SSLCOMMERZ"
                referrerPolicy="no-referrer"
                onError={() => setPayImgError(true)}
                className="max-h-[72px] w-auto object-contain"
              />
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
