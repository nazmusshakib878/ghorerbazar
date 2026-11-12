"use client";

import React, { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, formatTaka, formatTakaDecimals } from "@/data/catalog";
import { CustomerOrder, useStore } from "@/context/StoreContext";
import { SafeImage } from "@/components/SafeImage";

function CheckoutInner() {
  const searchParams = useSearchParams();
  const buyNowSlug = searchParams.get("buyNow");
  const buyNowQty = Math.max(1, Number(searchParams.get("qty") || "1") || 1);

  const { cart, clearCart, placeOrder, user, showToast } = useStore();

  const buyNowProduct = useMemo(
    () => (buyNowSlug ? PRODUCTS.find((p) => p.slug === buyNowSlug) : undefined),
    [buyNowSlug]
  );

  const checkoutItems = useMemo(() => {
    if (buyNowProduct) {
      return [
        {
          productId: buyNowProduct.id,
          slug: buyNowProduct.slug,
          name: buyNowProduct.name,
          price: buyNowProduct.price,
          regularPrice: buyNowProduct.regularPrice,
          image: buyNowProduct.image,
          weight: buyNowProduct.weight,
          quantity: buyNowQty,
        },
      ];
    }
    return cart;
  }, [buyNowProduct, buyNowQty, cart]);

  const [customerName, setCustomerName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [area, setArea] = useState<"inside-dhaka" | "outside-dhaka">(
    "inside-dhaka"
  );
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "cod" | "bkash" | "nagad" | "sslcommerz"
  >("cod");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<CustomerOrder | null>(
    null
  );

  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = area === "inside-dhaka" ? 60 : 120;

  const discount = useMemo(() => {
    if (appliedPromo === "GHORER10") return Math.round(subtotal * 0.1);
    if (appliedPromo === "HONEY200" && subtotal >= 1000) return 200;
    return 0;
  }, [appliedPromo, subtotal]);

  const total = Math.max(0, subtotal + deliveryCharge - discount);

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === "GHORER10" || code === "HONEY200") {
      setAppliedPromo(code);
      showToast(`Promo code ${code} applied!`);
    } else {
      showToast("Try GHORER10 (10% off) or HONEY200 (৳200 off ৳1,000+)", "info");
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (checkoutItems.length === 0) return;

    const order = placeOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      area,
      address: address.trim(),
      note: note.trim() || undefined,
      paymentMethod,
      items: checkoutItems,
      subtotal,
      deliveryCharge,
      discount,
      total,
    });

    if (!buyNowProduct) {
      clearCart();
    }
    setCompletedOrder(order);
    showToast(`Order ${order.orderId} confirmed!`);
  };

  if (completedOrder) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-xl bg-white border border-gray-200 p-8 text-center shadow-sm space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-[#e7f6ec] text-[#088d2d] flex items-center justify-center text-3xl font-bold">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-[#222831]">
            Thank You! Your Order Has Been Placed
          </h1>
          <p className="text-sm text-gray-600">
            Your order reference is{" "}
            <span className="font-bold text-[#f48721] text-base">
              {completedOrder.orderId}
            </span>
            . Our team will verify and dispatch your parcel shortly.
          </p>

          <div className="rounded-lg bg-[#faf8f4] border border-gray-200 p-4 text-left text-sm space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-500">Customer:</span>
              <span className="font-semibold text-[#222831]">
                {completedOrder.customerName} ({completedOrder.phone})
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Payment:</span>
              <span className="font-semibold uppercase text-[#222831]">
                {completedOrder.paymentMethod === "cod"
                  ? "Cash on Delivery"
                  : completedOrder.paymentMethod}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Payable:</span>
              <span className="font-bold text-[#f48721]">
                {formatTakaDecimals(completedOrder.total)}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href={`/track/order?id=${encodeURIComponent(
                completedOrder.orderId
              )}`}
              className="rounded-md bg-[#041f1e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#08312f]"
            >
              Track This Order
            </Link>
            <Link
              href="/"
              className="rounded-md bg-[#f48721] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#df7412]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-14 text-center">
        <div className="rounded-xl bg-white border border-gray-200 p-8 shadow-xs">
          <h1 className="text-xl font-bold text-[#222831]">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Add pure honey, ghee, mustard oil, or dates before proceeding to checkout.
          </p>
          <Link
            href="/collections/all-products"
            className="mt-5 inline-block rounded-md bg-[#f48721] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#df7412]"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1320px] px-3 sm:px-6 py-7">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#222831]">Checkout</h1>
        <nav className="text-xs text-gray-500">
          <Link href="/" className="hover:text-[#f48721]">
            Home
          </Link>{" "}
          &gt; <span className="text-[#222831] font-medium">Checkout</span>
        </nav>
      </div>

      <form
        onSubmit={handlePlaceOrder}
        className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start"
      >
        {/* Left: Shipping & Payment Form */}
        <div className="lg:col-span-7 rounded-xl bg-white border border-gray-200 p-5 sm:p-7 space-y-5 shadow-xs">
          <h2 className="text-base font-bold text-[#222831] border-b border-gray-100 pb-2.5">
            Delivery Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#222831] mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. MD. Rafiqul Islam"
                className="w-full rounded-md border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#f48721]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#222831] mb-1.5">
                Mobile Number *
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
          </div>

          <div>
            <span className="block text-xs font-semibold text-[#222831] mb-2">
              Delivery Zone *
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors ${
                  area === "inside-dhaka"
                    ? "border-[#f48721] bg-[#fff8f1]"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="area"
                    checked={area === "inside-dhaka"}
                    onChange={() => setArea("inside-dhaka")}
                    className="accent-[#f48721]"
                  />
                  <span className="text-sm font-medium text-[#222831]">
                    Inside Dhaka City
                  </span>
                </div>
                <span className="text-sm font-bold text-[#f48721]">৳60</span>
              </label>

              <label
                className={`flex items-center justify-between rounded-lg border p-3 cursor-pointer transition-colors ${
                  area === "outside-dhaka"
                    ? "border-[#f48721] bg-[#fff8f1]"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="area"
                    checked={area === "outside-dhaka"}
                    onChange={() => setArea("outside-dhaka")}
                    className="accent-[#f48721]"
                  />
                  <span className="text-sm font-medium text-[#222831]">
                    Outside Dhaka
                  </span>
                </div>
                <span className="text-sm font-bold text-[#f48721]">৳120</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#222831] mb-1.5">
              Full Delivery Address *
            </label>
            <textarea
              rows={3}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House, Road, Area, Thana, District..."
              className="w-full rounded-md border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#f48721]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#222831] mb-1.5">
              Order Note (Optional)
            </label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Any special delivery instruction..."
              className="w-full rounded-md border border-gray-300 px-3.5 py-2.5 text-sm outline-none focus:border-[#f48721]"
            />
          </div>

          {/* Payment Method */}
          <div className="pt-2">
            <h2 className="text-base font-bold text-[#222831] border-b border-gray-100 pb-2.5 mb-3">
              Payment Method
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "cod", label: "Cash on Delivery", sub: "Pay upon receiving" },
                { id: "bkash", label: "bKash Payment", sub: "Instant mobile wallet" },
                { id: "nagad", label: "Nagad Payment", sub: "Fast MFS checkout" },
                {
                  id: "sslcommerz",
                  label: "Card / SSLCommerz",
                  sub: "Visa, Mastercard, Nexus",
                },
              ].map((pm) => (
                <label
                  key={pm.id}
                  className={`flex items-start gap-2.5 rounded-lg border p-3 cursor-pointer ${
                    paymentMethod === pm.id
                      ? "border-[#f48721] bg-[#fff8f1]"
                      : "border-gray-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === pm.id}
                    onChange={() =>
                      setPaymentMethod(
                        pm.id as "cod" | "bkash" | "nagad" | "sslcommerz"
                      )
                    }
                    className="mt-1 accent-[#f48721]"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-[#222831]">
                      {pm.label}
                    </span>
                    <span className="block text-xs text-gray-500">{pm.sub}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5 rounded-xl bg-white border border-gray-200 p-5 sm:p-6 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-[#222831] border-b border-gray-100 pb-2.5">
            Order Summary ({checkoutItems.length})
          </h2>

          <div className="divide-y divide-gray-100 max-h-[300px] overflow-y-auto">
            {checkoutItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center gap-3 py-3 text-sm"
              >
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  className="h-14 w-14 rounded border border-gray-100 object-contain p-1 bg-white shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#222831] line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity} × {formatTaka(item.price)}
                  </p>
                </div>
                <span className="font-bold text-[#222831]">
                  {formatTaka(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Coupon Code */}
          <div className="flex gap-2 pt-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Coupon (try GHORER10)"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-xs outline-none focus:border-[#f48721]"
            />
            <button
              type="button"
              onClick={handleApplyPromo}
              className="rounded-md bg-[#041f1e] px-4 py-2 text-xs font-semibold text-white hover:bg-[#08312f] cursor-pointer"
            >
              Apply
            </button>
          </div>

          <div className="space-y-2 border-t border-gray-200 pt-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatTakaDecimals(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Charge</span>
              <span>{formatTakaDecimals(deliveryCharge)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#088d2d] font-semibold">
                <span>Discount ({appliedPromo})</span>
                <span>-{formatTakaDecimals(discount)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-2.5 text-base font-bold text-[#222831]">
              <span>Total Payable</span>
              <span className="text-[#f48721]">{formatTakaDecimals(total)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#f48721] hover:bg-[#df7412] py-3 text-sm font-bold text-white shadow-sm transition-colors cursor-pointer"
          >
            Confirm Order ({formatTakaDecimals(total)})
          </button>
        </div>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-[1320px] p-8">Loading checkout...</div>}>
      <CheckoutInner />
    </Suspense>
  );
}
