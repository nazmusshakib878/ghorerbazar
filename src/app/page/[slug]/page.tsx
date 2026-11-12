import Link from "next/link";
import { STATIC_PAGES } from "@/data/catalog";

export default async function StaticInfoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = STATIC_PAGES[slug] || {
    title: "GhorerBazar Information",
    subtitle: "Safe & reliable food for every home",
    body: [
      "Thank you for visiting GhorerBazar. For assistance with orders, delivery, or product quality, call +8809642922922 or email contact@ghorerbazar.com.",
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-3 sm:px-6 py-10">
      <div className="rounded-xl bg-white border border-gray-200 p-6 sm:p-10 shadow-xs space-y-5">
        <nav className="text-xs text-gray-500">
          <Link href="/" className="hover:text-[#f48721]">
            Home
          </Link>{" "}
          &gt; <span className="text-[#222831] font-medium">{page.title}</span>
        </nav>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#222831]">
            {page.title}
          </h1>
          <p className="mt-1 text-sm font-medium text-[#f48721]">
            {page.subtitle}
          </p>
        </div>

        <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-[#4b5563] border-t border-gray-100 pt-5">
          {page.body.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className="pt-4">
          <Link
            href="/collections/all-products"
            className="inline-block rounded-md bg-[#f48721] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#df7412]"
          >
            Shop GhorerBazar Products
          </Link>
        </div>
      </div>
    </div>
  );
}
