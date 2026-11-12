import Link from "next/link";
import { BRANDS, PRODUCTS } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const brand = BRANDS.find(
    (b) => b.name.toLowerCase() === decoded.toLowerCase()
  );
  const brandProducts = PRODUCTS.filter(
    (p) => p.brand.toLowerCase() === decoded.toLowerCase()
  );

  return (
    <div className="mx-auto max-w-[1320px] px-3 sm:px-6 py-8">
      <div className="rounded-xl bg-white border border-gray-200 p-6 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#222831]">
            {brand?.name || decoded}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {brand?.tagline || "Authentic products from GhorerBazar partner brands"}
          </p>
        </div>
        <Link
          href="/all-brands"
          className="text-sm font-semibold text-[#f48721] hover:underline"
        >
          View All Brands →
        </Link>
      </div>

      {brandProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {brandProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-white border border-gray-200 p-10 text-center">
          <p className="text-gray-600">
            Explore our complete GhorerBazar pantry catalog.
          </p>
          <Link
            href="/collections/all-products"
            className="mt-4 inline-block rounded-md bg-[#f48721] px-5 py-2 text-sm font-semibold text-white"
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
}
