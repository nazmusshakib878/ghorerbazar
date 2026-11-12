import Link from "next/link";
import { BRANDS } from "@/data/catalog";
import { SafeImage } from "@/components/SafeImage";

export default function AllBrandsPage() {
  return (
    <div className="mx-auto max-w-[1320px] px-3 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#222831]">Our Trusted Brands</h1>
        <nav className="text-xs text-gray-500">
          <Link href="/" className="hover:text-[#f48721]">
            Home
          </Link>{" "}
          &gt; <span className="text-[#222831] font-medium">All Brands</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {BRANDS.map((brand) => (
          <Link
            key={brand.id}
            href={`/brand/${encodeURIComponent(brand.slug)}`}
            className="group rounded-xl bg-white border border-gray-200 p-6 flex flex-col items-center text-center hover:border-[#f48721] hover:shadow-md transition-all"
          >
            <div className="h-24 flex items-center justify-center mb-3">
              <SafeImage
                src={brand.image}
                alt={brand.name}
                className="max-h-20 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            <h2 className="font-bold text-[#222831] group-hover:text-[#f48721]">
              {brand.name}
            </h2>
            <p className="text-xs text-gray-500 mt-1">{brand.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
