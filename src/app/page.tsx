import Link from "next/link";
import { PRODUCTS, SITE_ASSETS } from "@/data/catalog";
import { HeroSection } from "@/components/HeroSection";
import { FeaturedCategories } from "@/components/FeaturedCategories";
import { TopSellingSection } from "@/components/TopSellingSection";
import { BrandCarousel } from "@/components/BrandCarousel";
import { ProductCarouselSection } from "@/components/ProductCarouselSection";
import { JustForYouSection } from "@/components/JustForYouSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { SafeImage } from "@/components/SafeImage";

export default function HomePage() {
  const naturalHoney = PRODUCTS.filter((p) =>
    p.sections.includes("natural-honey")
  );
  const premiumDates = PRODUCTS.filter((p) =>
    p.sections.includes("premium-dates")
  );
  const cookingEssentials = PRODUCTS.filter((p) =>
    p.sections.includes("cooking-essentials")
  );
  const organicFood = PRODUCTS.filter((p) =>
    p.sections.includes("organic-food")
  );

  return (
    <div className="bg-[#faf8f4]">
      {/* Hero Slider + Promo Banner */}
      <HeroSection />

      {/* 10 Featured Categories Carousel */}
      <FeaturedCategories />

      {/* 2x2 Top Selling Products Showcase */}
      <TopSellingSection />

      {/* Our Brands Carousel */}
      <BrandCarousel />

      {/* All Natural Honey */}
      <ProductCarouselSection
        title="All Natural Honey"
        viewAllHref="/collections/honey-2"
        products={naturalHoney}
      />

      {/* Premium Dates */}
      <ProductCarouselSection
        title="Premium Dates"
        viewAllHref="/collections/dates"
        products={premiumDates}
      />

      {/* Mid-Page Promotional Banner */}
      <section className="mx-auto max-w-[1320px] px-3 sm:px-6 pb-11">
        <Link
          href={SITE_ASSETS.midPromoBanner.href}
          className="block rounded-[10px] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <SafeImage
            src={SITE_ASSETS.midPromoBanner.image}
            alt={SITE_ASSETS.midPromoBanner.alt}
            className="w-full h-auto max-h-[260px] object-cover"
          />
        </Link>
      </section>

      {/* Cooking Essentials */}
      <ProductCarouselSection
        title="Cooking Essentials"
        viewAllHref="/collections/cooking-essentials"
        products={cookingEssentials}
      />

      {/* Organic Certified */}
      <ProductCarouselSection
        title="Organic Certified"
        viewAllHref="/collections/organic-certified"
        products={organicFood}
      />

      {/* Just For You Grid */}
      <JustForYouSection />

      {/* Customer Testimonials Carousel */}
      <TestimonialsSection />
    </div>
  );
}
