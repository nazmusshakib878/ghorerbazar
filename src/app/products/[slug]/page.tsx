"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS, formatTaka } from "@/data/catalog";
import { useStore } from "@/context/StoreContext";
import { SafeImage } from "@/components/SafeImage";
import { ProductCard } from "@/components/ProductCard";
import {
  CartIcon,
  HeartIcon,
  PhoneIcon,
  StarIcon,
  WhatsAppIcon,
} from "@/components/Icons";

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted, reviews, addReview } =
    useStore();

  const product = useMemo(
    () => PRODUCTS.find((p) => p.slug === params?.slug) || PRODUCTS[0],
    [params?.slug]
  );

  const images =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  // Review form state
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const productReviews = useMemo(
    () => reviews.filter((r) => r.productSlug === product.slug),
    [reviews, product.slug]
  );

  const averageRating = useMemo(() => {
    if (productReviews.length === 0) return 5;
    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / productReviews.length).toFixed(1));
  }, [productReviews]);

  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter(
      (p) => p.id !== product.id && p.categorySlug === product.categorySlug
    ).slice(0, 5);
  }, [product.id, product.categorySlug]);

  const wishlisted = isWishlisted(product.id);
  const saveAmount =
    product.regularPrice && product.regularPrice > product.price
      ? product.regularPrice - product.price
      : 0;

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=8801321208940&text=${encodeURIComponent(
    `Hello GhorerBazar, I want to order: ${product.name} (Qty: ${quantity}) - Price: ${formatTaka(
      product.price * quantity
    )}`
  )}`;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addReview({
      productSlug: product.slug,
      author: reviewerName.trim() || "Verified Customer",
      rating,
      comment: comment.trim(),
    });
    setReviewerName("");
    setComment("");
    setRating(5);
  };

  return (
    <div className="mx-auto max-w-[1320px] px-3 sm:px-6 py-6 space-y-8">
      {/* Breadcrumb */}
      <nav className="text-[13px] text-gray-500 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-[#f48721]">
          Home
        </Link>
        <span>&gt;</span>
        <Link
          href={`/collections/${product.categorySlug}`}
          className="hover:text-[#f48721]"
        >
          {product.category}
        </Link>
        <span>&gt;</span>
        <span className="text-[#222831] font-medium">{product.name}</span>
      </nav>

      {/* Main Product Panel */}
      <div className="rounded-xl bg-white border border-gray-200 p-4 sm:p-8 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Gallery */}
        <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4">
          {/* Vertical Thumbnails */}
          <div className="flex sm:flex-col gap-2.5 overflow-x-auto">
            {images.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(idx)}
                className={`h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-lg border-2 bg-white overflow-hidden p-1 cursor-pointer transition-all ${
                  selectedImage === idx
                    ? "border-[#f48721]"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <SafeImage
                  src={imgUrl}
                  alt={`${product.name} view ${idx + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative flex-1 rounded-xl border border-gray-100 bg-white aspect-square flex items-center justify-center p-4 overflow-hidden">
            {product.badgeLeft && (
              <span className="absolute top-3 left-3 z-10 rounded bg-[#f48721] px-2.5 py-1 text-xs font-semibold text-white">
                {product.badgeLeft}
              </span>
            )}
            {product.saveText && (
              <span className="absolute top-3 right-3 z-10 rounded bg-[#088d2d] px-2.5 py-1 text-xs font-semibold text-white">
                {product.saveText}
              </span>
            )}
            <SafeImage
              src={images[selectedImage] || product.image}
              alt={product.name}
              className="h-full w-full object-contain transition-transform duration-300 hover:scale-110"
            />
          </div>
        </div>

        {/* Right Info & Purchase Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <Link
                href={`/brand/${encodeURIComponent(product.brand)}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#faf8f4] border border-gray-200 px-3 py-1 text-xs font-semibold text-[#041f1e] hover:border-[#f48721]"
              >
                <span>Brand:</span>
                <span className="text-[#f48721]">{product.brand}</span>
              </Link>

              <span className="text-xs font-semibold text-[#088d2d] bg-[#e7f6ec] px-2.5 py-1 rounded-full">
                {product.inStock ? "In Stock • Ready to Ship" : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-[22px] sm:text-[28px] font-bold text-[#222831] leading-snug">
              {product.name}
            </h1>

            {/* Rating summary */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#f48721]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="h-4 w-4"
                    filled={i < Math.round(averageRating)}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveTab("reviews")}
                className="text-xs text-gray-500 hover:text-[#f48721] cursor-pointer"
              >
                ({productReviews.length} Customer{" "}
                {productReviews.length === 1 ? "Review" : "Reviews"})
              </button>
            </div>

            {/* Price Block */}
            <div className="flex items-baseline gap-3 flex-wrap py-2 border-y border-gray-100">
              <span className="text-[28px] font-extrabold text-[#f48721]">
                {formatTaka(product.price)}
              </span>
              {product.regularPrice && (
                <span className="text-[18px] text-gray-400 line-through">
                  {formatTaka(product.regularPrice)}
                </span>
              )}
              {saveAmount > 0 && (
                <span className="rounded-full bg-[#088d2d] px-2.5 py-0.5 text-xs font-bold text-white">
                  Save {formatTaka(saveAmount)}
                </span>
              )}
            </div>

            <p className="text-[14.5px] leading-relaxed text-[#4b5563]">
              {product.shortDescription}
            </p>

            {/* Quick specs */}
            <div className="grid grid-cols-2 gap-3 rounded-lg bg-[#faf8f4] p-3.5 text-xs border border-gray-100">
              <div>
                <span className="text-gray-500 block">Net Weight / Pack</span>
                <span className="font-semibold text-[#222831]">
                  {product.weight || "Standard Pack"}
                </span>
              </div>
              <div>
                <span className="text-gray-500 block">Origin</span>
                <span className="font-semibold text-[#222831]">
                  {product.origin}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-1">
              <span className="text-sm font-semibold text-[#222831]">
                Quantity:
              </span>
              <div className="inline-flex items-center rounded-md border border-gray-300 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="h-9 w-9 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  -
                </button>
                <span className="h-9 min-w-[44px] flex items-center justify-center text-sm font-bold text-[#222831] border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="h-9 w-9 flex items-center justify-center text-lg font-medium text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`inline-flex items-center gap-1.5 text-xs font-semibold cursor-pointer ${
                  wishlisted ? "text-[#f48721]" : "text-gray-500 hover:text-[#f48721]"
                }`}
              >
                <HeartIcon className="h-4 w-4" filled={wishlisted} />
                <span>{wishlisted ? "Saved in Wishlist" : "Add to Wishlist"}</span>
              </button>
            </div>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => addToCart(product, quantity, true)}
                className="inline-flex items-center justify-center gap-2 rounded-md border-[1.5px] border-[#f48721] bg-white py-3 px-5 text-[15px] font-bold text-[#f48721] hover:bg-[#f48721] hover:text-white transition-colors cursor-pointer"
              >
                <CartIcon className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/checkout?buyNow=${encodeURIComponent(
                      product.slug
                    )}&qty=${quantity}`
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#f48721] hover:bg-[#df7412] py-3 px-5 text-[15px] font-bold text-white shadow-sm transition-colors cursor-pointer"
              >
                <span>Buy Now</span>
              </button>
            </div>

            {/* WhatsApp & Hotline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#088d2d] hover:bg-[#077525] py-2.5 px-4 text-sm font-semibold text-white transition-colors"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>Order on WhatsApp</span>
              </a>

              <a
                href="tel:8809642922922"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#041f1e] hover:bg-[#08312f] py-2.5 px-4 text-sm font-semibold text-white transition-colors"
              >
                <PhoneIcon className="h-4 w-4 text-[#f48721]" />
                <span>Call for Order: 09642-922922</span>
              </a>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center text-[11.5px] text-gray-600">
            <div className="rounded-md bg-[#faf8f4] p-2">
              <span className="font-bold text-[#041f1e] block">100% Pure</span>
              Lab-Verified Quality
            </div>
            <div className="rounded-md bg-[#faf8f4] p-2">
              <span className="font-bold text-[#041f1e] block">Cash on Delivery</span>
              Pay at Your Doorstep
            </div>
            <div className="rounded-md bg-[#faf8f4] p-2">
              <span className="font-bold text-[#041f1e] block">Happy Return</span>
              7-Day Easy Return
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Description & Reviews */}
      <div className="rounded-xl bg-white border border-gray-200 overflow-hidden shadow-xs">
        <div className="flex border-b border-gray-200 bg-[#faf8f4]">
          <button
            type="button"
            onClick={() => setActiveTab("description")}
            className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === "description"
                ? "border-[#f48721] text-[#f48721] bg-white"
                : "border-transparent text-gray-600 hover:text-[#222831]"
            }`}
          >
            Description
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === "reviews"
                ? "border-[#f48721] text-[#f48721] bg-white"
                : "border-transparent text-gray-600 hover:text-[#222831]"
            }`}
          >
            Customer Reviews ({productReviews.length})
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === "description" ? (
            <div className="space-y-5 max-w-4xl">
              <h2 className="text-lg font-bold text-[#222831]">
                About {product.name}
              </h2>
              <p className="text-sm leading-relaxed text-[#4b5563]">
                {product.shortDescription}
              </p>

              <div>
                <h3 className="text-sm font-bold text-[#222831] mb-2.5">
                  Key Highlights &amp; Quality Assurance
                </h3>
                <ul className="space-y-2 text-sm text-[#4b5563] list-disc pl-5">
                  {product.highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="overflow-x-auto pt-2">
                <table className="w-full max-w-xl text-sm border border-gray-200 rounded-lg overflow-hidden">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="bg-[#faf8f4] px-4 py-2.5 font-semibold text-[#222831] w-40">
                        Brand
                      </td>
                      <td className="px-4 py-2.5 text-gray-600">{product.brand}</td>
                    </tr>
                    <tr>
                      <td className="bg-[#faf8f4] px-4 py-2.5 font-semibold text-[#222831]">
                        Category
                      </td>
                      <td className="px-4 py-2.5 text-gray-600">
                        {product.category}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#faf8f4] px-4 py-2.5 font-semibold text-[#222831]">
                        Pack Weight
                      </td>
                      <td className="px-4 py-2.5 text-gray-600">
                        {product.weight || "Standard"}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#faf8f4] px-4 py-2.5 font-semibold text-[#222831]">
                        Origin &amp; Storage
                      </td>
                      <td className="px-4 py-2.5 text-gray-600">
                        {product.origin} — Store in a cool, dry place away from direct sunlight.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Review Summary & List */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-5 rounded-lg bg-[#faf8f4] p-4 border border-gray-100">
                  <div className="text-center px-3">
                    <span className="block text-3xl font-extrabold text-[#222831]">
                      {averageRating}
                    </span>
                    <div className="flex items-center justify-center text-[#f48721] mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className="h-3.5 w-3.5"
                          filled={i < Math.round(averageRating)}
                        />
                      ))}
                    </div>
                    <span className="block text-xs text-gray-500 mt-1">
                      {productReviews.length} reviews
                    </span>
                  </div>
                  <div className="flex-1 space-y-1.5 text-xs">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = productReviews.filter(
                        (r) => r.rating === star
                      ).length;
                      const pct =
                        productReviews.length > 0
                          ? (count / productReviews.length) * 100
                          : star === 5
                          ? 100
                          : 0;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="w-8 font-medium">{star} ★</span>
                          <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                            <div
                              className="h-full bg-[#f48721]"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="w-5 text-right text-gray-500">
                            {count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {productReviews.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    No customer reviews yet. Be the first to review {product.name}!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {productReviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="rounded-lg border border-gray-200 p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-[#222831]">
                            {rev.author}
                          </span>
                          <span className="text-xs text-gray-400">
                            {rev.createdAt}
                          </span>
                        </div>
                        <div className="flex items-center text-[#f48721] my-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon
                              key={i}
                              className="h-3.5 w-3.5"
                              filled={i < rev.rating}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-[#4b5563]">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Review Form */}
              <form
                onSubmit={handleReviewSubmit}
                className="lg:col-span-5 rounded-xl border border-gray-200 p-5 bg-[#faf8f4] space-y-4 h-fit"
              >
                <h3 className="text-base font-bold text-[#222831]">
                  Write a Review
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-[#222831] mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#f48721]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#222831] mb-1">
                    Rating
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#f48721]"
                  >
                    <option value={5}>5 Stars — Excellent</option>
                    <option value={4}>4 Stars — Good</option>
                    <option value={3}>3 Stars — Average</option>
                    <option value={2}>2 Stars — Fair</option>
                    <option value={1}>1 Star — Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#222831] mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with purity, taste, and packaging..."
                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#f48721]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#f48721] hover:bg-[#df7412] py-2.5 text-sm font-bold text-white transition-colors cursor-pointer"
                >
                  Submit Review
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-2">
          <div className="flex items-center justify-between mb-5 border-b border-gray-200 pb-2.5">
            <h2 className="text-[20px] font-semibold text-[#222831]">
              Related Products
            </h2>
            <Link
              href={`/collections/${product.categorySlug}`}
              className="text-xs font-bold uppercase text-[#f48721] hover:underline"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
