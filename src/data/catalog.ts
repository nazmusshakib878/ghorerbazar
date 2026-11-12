export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  subcategories: string[];
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
  highlight?: boolean;
  subcategories?: { label: string; href: string }[];
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  image: string;
  tagline: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  image: string;
  href: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  regularPrice?: number;
  image: string;
  gallery?: string[];
  category: string;
  categorySlug: string;
  subcategory?: string;
  brand: string;
  weight?: string;
  badgeLeft?: "Best Selling" | "New Arrival" | "Offered Items";
  saveText?: string;
  isTopSelling?: boolean;
  isFreeGiftPromo?: boolean;
  inStock: boolean;
  sections: (
    | "top-selling"
    | "natural-honey"
    | "premium-dates"
    | "cooking-essentials"
    | "organic-food"
    | "just-for-you"
  )[];
  shortDescription: string;
  highlights: string[];
  origin: string;
}

export const SITE_ASSETS = {
  logo: "https://cdn.ghorerbazar.com/company_logo/qJaKf1768887846.png",
  paymentGateway: "https://cdn.ghorerbazar.com/company_logo/faysy1756641916.png",
  googlePlayBadge: "https://ghorerbazar.com/assets/images/google-play.svg",
  appStoreBadge: "https://ghorerbazar.com/assets/images/app-store.svg",
  rightPromoBanner: {
    image: "https://cdn.ghorerbazar.com/banner/IVSLi1794206372-500x410.jpg",
    alt: "মধু স্পেশাল কম্বোপ্যাক-এ ২০০ টাকা ছাড়!",
    href: "/products/honey-special-combo-pack-4-types-honey",
  },
  midPromoBanner: {
    image: "https://cdn.ghorerbazar.com/banner/KQlqd1788006502-4000x1039.jpeg",
    alt: "Shosti Food Banner",
    href: "/brand/Shosti%20food",
  },
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    title: "অর্গানিক বিটরুট পাউডারের সাথে হানিরাজ লিচু ফ্লাওয়ার হানি স্যাশে বক্স ফ্রি",
    image: "https://cdn.ghorerbazar.com/banner/v4WL81794205199-dark-1000x400.png",
    href: "/products/organic-beetroot-powder-250g",
  },
  {
    id: "slide-2",
    title: "১ কেজি হানিরাজ কালিজিরার ফুলের মধুর সাথে হানিরাজ লিচু ফ্লাওয়ার হানি স্যাশে বক্স ফ্রি",
    image: "https://cdn.ghorerbazar.com/banner/y7Wvj1794204237-light-1000x400.png",
    href: "/products/black-seed-honey-1kg",
  },
  {
    id: "slide-3",
    title: "ঘরের বাজার - সবার জন্য ভালো",
    image: "https://cdn.ghorerbazar.com/banner/mM4zY1791177103-light-1000x400.jpg",
    href: "/collections/all-products",
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "cat-oil-ghee",
    name: "Oil & Ghee",
    slug: "oil-ghee",
    image: "https://cdn.ghorerbazar.com/category_images/Zf99g1774766372.png",
    subcategories: ["Mustard Oil", "Gawa Ghee", "Coconut Oil", "Olive Oil"],
  },
  {
    id: "cat-organic",
    name: "Organic",
    slug: "organic-5",
    image: "https://cdn.ghorerbazar.com/category_images/HJOrw1774766749.png",
    subcategories: ["Organic Vinegar", "Organic Powder", "Coconut Sugar", "Organic Honey"],
  },
  {
    id: "cat-honey",
    name: "Honey",
    slug: "honey-2",
    image: "https://cdn.ghorerbazar.com/category_images/KbWCe1774766391.png",
    subcategories: [
      "Sundarban Honey",
      "Black Seed Honey",
      "Lychee Flower Honey",
      "Honey Nuts",
      "Honeycomb",
      "African Organic Honey",
      "Sachet Box",
    ],
  },
  {
    id: "cat-dates",
    name: "Dates",
    slug: "dates",
    image: "https://cdn.ghorerbazar.com/category_images/wgCR01774766402.png",
    subcategories: ["Ajwa Dates", "Medjool Dates", "Safawi / Kalmi Dates", "Sukkari Dates"],
  },
  {
    id: "cat-spices",
    name: "Spices",
    slug: "spices",
    image: "https://cdn.ghorerbazar.com/category_images/hXyU71774766413.png",
    subcategories: ["Kala Bhuna Masala", "Cumin Powder", "Turmeric & Chili", "Whole Spices"],
  },
  {
    id: "cat-nuts-seeds",
    name: "Nuts & Seeds",
    slug: "nuts-seeds",
    image: "https://cdn.ghorerbazar.com/category_images/5u39t1774766425.png",
    subcategories: ["Cashew Nuts", "Almonds", "Chia Seeds", "Honey Nuts"],
  },
  {
    id: "cat-beverage",
    name: "Beverage",
    slug: "beverage",
    image: "https://cdn.ghorerbazar.com/category_images/AZG2N1774766442.png",
    subcategories: ["Green Tea", "Black Coffee", "Herbal Drinks"],
  },
  {
    id: "cat-rice",
    name: "Rice",
    slug: "rice",
    image: "https://cdn.ghorerbazar.com/category_images/Emr6I1774766667.png",
    subcategories: ["Chinigura Rice", "Kataribhog Rice", "Brown Rice"],
  },
  {
    id: "cat-flours-lentils",
    name: "Flours & Lentils",
    slug: "flours-lentils",
    image: "https://cdn.ghorerbazar.com/category_images/Lo11M1774766468.png",
    subcategories: ["Mashkalai Dal", "Masoor Dal", "Whole Wheat Flour"],
  },
  {
    id: "cat-functional-food",
    name: "Functional Food",
    slug: "functional-food",
    image: "https://cdn.ghorerbazar.com/category_images/JxBh61774766494.png",
    subcategories: ["Apple Cider Vinegar", "Beetroot Powder", "Moringa Powder", "Coconut Vinegar"],
  },
];

export const NAV_ITEMS: NavItem[] = [
  { label: "Offer Zone", href: "/collections/offer-zone", highlight: true },
  {
    label: "Honey",
    href: "/collections/honey-2",
    subcategories: [
      { label: "All Natural Honey", href: "/collections/honey-2" },
      { label: "Sundarban Honey", href: "/collections/honey-2?sub=Sundarban+Honey" },
      { label: "Black Seed Honey", href: "/collections/honey-2?sub=Black+Seed+Honey" },
      { label: "Lychee Flower Honey", href: "/collections/honey-2?sub=Lychee+Flower+Honey" },
      { label: "Honey Nuts", href: "/collections/honey-2?sub=Honey+Nuts" },
      { label: "Honeycomb & Sachet Box", href: "/collections/honey-2?sub=Sachet+Box" },
    ],
  },
  { label: "Oil & Ghee", href: "/collections/oil-ghee" },
  {
    label: "Dates",
    href: "/collections/dates",
    subcategories: [
      { label: "All Premium Dates", href: "/collections/dates" },
      { label: "Ajwa Dates", href: "/collections/dates?sub=Ajwa+Dates" },
      { label: "Egyptian Medjool", href: "/collections/dates?sub=Medjool+Dates" },
      { label: "Safawi / Kalmi Dates", href: "/collections/dates?sub=Safawi+%2F+Kalmi+Dates" },
      { label: "Sukkari Malaki Dates", href: "/collections/dates?sub=Sukkari+Dates" },
    ],
  },
  {
    label: "Spices",
    href: "/collections/spices",
    subcategories: [
      { label: "All Spices", href: "/collections/spices" },
      { label: "Kala Bhuna Masala", href: "/collections/spices?sub=Kala+Bhuna+Masala" },
      { label: "Cumin Powder", href: "/collections/spices?sub=Cumin+Powder" },
    ],
  },
  {
    label: "Nuts & Seeds",
    href: "/collections/nuts-seeds",
    subcategories: [
      { label: "All Nuts & Seeds", href: "/collections/nuts-seeds" },
      { label: "Cashew Nuts", href: "/collections/nuts-seeds?sub=Cashew+Nuts" },
      { label: "Almonds", href: "/collections/nuts-seeds?sub=Almonds" },
      { label: "Honey Nuts", href: "/collections/nuts-seeds?sub=Honey+Nuts" },
    ],
  },
  {
    label: "Beverage",
    href: "/collections/beverage",
    subcategories: [
      { label: "All Beverages", href: "/collections/beverage" },
      { label: "Functional Drinks", href: "/collections/functional-food" },
    ],
  },
  { label: "Rice", href: "/collections/rice" },
  {
    label: "Flours & Lentils",
    href: "/collections/flours-lentils",
    subcategories: [
      { label: "All Flours & Lentils", href: "/collections/flours-lentils" },
      { label: "Mashkalai Dal", href: "/collections/flours-lentils?sub=Mashkalai+Dal" },
      { label: "Masoor Dal", href: "/collections/flours-lentils?sub=Masoor+Dal" },
    ],
  },
  { label: "Certified", href: "/collections/organic-certified" },
  { label: "Pickle", href: "/collections/pickle" },
  { label: "Tabaya", href: "/brand/Tabaya" },
];

export const BRANDS: Brand[] = [
  {
    id: "brand-ghorerbazar",
    name: "GhorerBazar",
    slug: "GhorerBazar",
    image: "https://cdn.ghorerbazar.com/brand_images/7hNKq1768887947.png",
    tagline: "Safe & Reliable Everyday Foods",
  },
  {
    id: "brand-honeyraj",
    name: "Honeyraj",
    slug: "Honeyraj",
    image: "https://cdn.ghorerbazar.com/brand_images/RNTIU1763611802.png",
    tagline: "100% Raw & Unprocessed Natural Honey",
  },
  {
    id: "brand-glarvest",
    name: "Glarvest",
    slug: "Glarvest",
    image: "https://cdn.ghorerbazar.com/brand_images/8Gpl21757919440.png",
    tagline: "Cold-Pressed & Mediterranean Oils",
  },
  {
    id: "brand-khejuri",
    name: "Khejuri",
    slug: "Khejuri",
    image: "https://cdn.ghorerbazar.com/brand_images/8matO1757919401.png",
    tagline: "Handpicked Middle Eastern Dates",
  },
  {
    id: "brand-shosti",
    name: "Shosti food",
    slug: "Shosti food",
    image: "https://cdn.ghorerbazar.com/brand_images/lCfRt1759553456.png",
    tagline: "Pure Pantry Staples & Condiments",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 3,
    slug: "sundarban-honey",
    name: "Sundarban Honey 1kg",
    price: 2300,
    regularPrice: 2500,
    image: "https://cdn.ghorerbazar.com/productImages/nWkrb1793514099-light-1000x1000.jpg",
    gallery: [
      "https://cdn.ghorerbazar.com/productImages/nWkrb1793514099-light-1000x1000.jpg",
      "https://cdn.ghorerbazar.com/productImages/UaiPN1793514068-light-1000x1000.jpg",
    ],
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Sundarban Honey",
    brand: "Honeyraj",
    weight: "1 kg",
    saveText: "Save 8%",
    isTopSelling: true,
    inStock: true,
    sections: ["top-selling", "natural-honey", "just-for-you"],
    shortDescription:
      "Wildflower raw honey harvested straight from the deep mangrove forests of the Sundarbans by traditional Mawali honey collectors.",
    highlights: [
      "100% raw, unfiltered, and free from added sugar or preservatives",
      "Lab-tested for purity, natural pollen count, and moisture balance",
      "Rich in natural antioxidants, enzymes, and minerals",
      "Sealed in food-grade PET jar for safe nationwide delivery",
    ],
    origin: "Sundarbans, Bangladesh",
  },
  {
    id: 11,
    slug: "black-seed-honey-1kg",
    name: "Black Seed Honey 1kg",
    price: 1600,
    image: "https://cdn.ghorerbazar.com/productImages/LH2QX1793595320-light-2000x2000.jpg",
    gallery: [
      "https://cdn.ghorerbazar.com/productImages/LH2QX1793595320-light-2000x2000.jpg",
      "https://cdn.ghorerbazar.com/productImages/UaiPN1793514068-light-1000x1000.jpg",
    ],
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Black Seed Honey",
    brand: "Honeyraj",
    weight: "1 kg",
    isTopSelling: true,
    isFreeGiftPromo: true,
    inStock: true,
    sections: ["top-selling", "natural-honey", "just-for-you"],
    shortDescription:
      "Monofloral Kalijira (Black Seed) flower honey prized for its bold aroma, deep amber tone, and traditional wellness benefits.",
    highlights: [
      "Collected during peak black seed blossom season in Faridpur & Shariatpur",
      "Includes complimentary Honeyraj Lychee Flower Honey Sachet Box promo",
      "Naturally boosts immunity, digestion, and seasonal wellness",
      "Zero heat treatment — retains full enzymatic activity",
    ],
    origin: "Faridpur, Bangladesh",
  },
  {
    id: 12,
    slug: "local-maghi-sarisha-oil-5-ltr",
    name: "Deshi Mustard Oil 5 liter",
    price: 1700,
    regularPrice: 1800,
    image: "https://cdn.ghorerbazar.com/productImages/vkVdH1767248022.jpg",
    gallery: [
      "https://cdn.ghorerbazar.com/productImages/vkVdH1767248022.jpg",
    ],
    category: "Oil & Ghee",
    categorySlug: "oil-ghee",
    subcategory: "Mustard Oil",
    brand: "GhorerBazar",
    weight: "5 Litre",
    badgeLeft: "Best Selling",
    saveText: "Save 6%",
    isTopSelling: true,
    inStock: true,
    sections: ["top-selling", "cooking-essentials", "just-for-you"],
    shortDescription:
      "Authentic cold-pressed Deshi Maghi Sarisha (Mustard) Oil crafted in wooden/steel ghani presses for unmistakable pungency and aroma.",
    highlights: [
      "Pressed from 100% locally sourced Maghi mustard seeds",
      "Zero chemicals, artificial essence, or mineral oil blending",
      "Ideal for Bengali curries, bharta, pickles, and daily cooking",
      "Tamper-evident 5-liter family value container",
    ],
    origin: "Sirajganj & Pabna, Bangladesh",
  },
  {
    id: 14,
    slug: "gawa-ghee-1kg",
    name: "Gawa Ghee 1kg",
    price: 1890,
    regularPrice: 1990,
    image: "https://cdn.ghorerbazar.com/productImages/YPsni1793513651-light-1000x1000.jpg",
    gallery: [
      "https://cdn.ghorerbazar.com/productImages/YPsni1793513651-light-1000x1000.jpg",
    ],
    category: "Oil & Ghee",
    categorySlug: "oil-ghee",
    subcategory: "Gawa Ghee",
    brand: "GhorerBazar",
    weight: "1 kg",
    badgeLeft: "Best Selling",
    saveText: "Save 5%",
    isTopSelling: true,
    inStock: true,
    sections: ["top-selling", "cooking-essentials", "just-for-you"],
    shortDescription:
      "Traditional slow-simmered pure cow milk Gawa Ghee from Sirajganj with rich granular texture and aromatic golden color.",
    highlights: [
      "Prepared purely from fresh cow butterfat using Bilona-inspired slow heating",
      "Rich granular dana texture and nostalgic homemade aroma",
      "Zero vegetable oil, dalda, or artificial coloring",
      "Packed in airtight reusable glass/food-grade jar",
    ],
    origin: "Sirajganj, Bangladesh",
  },
  {
    id: 15,
    slug: "honey-special-combo-pack-4-types-honey",
    name: "Honey Special Combo Pack (4 Types Honey)",
    price: 1800,
    regularPrice: 2000,
    image: "https://cdn.ghorerbazar.com/banner/IVSLi1794206372-500x410.jpg",
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Sundarban Honey",
    brand: "Honeyraj",
    weight: "4 x 250g",
    badgeLeft: "Offered Items",
    saveText: "Save 10%",
    inStock: true,
    sections: ["natural-honey", "just-for-you"],
    shortDescription:
      "Special gift combo box featuring four signature Honeyraj varieties — Sundarban, Black Seed, Lychee Flower, and Mixed Flower honey — with ৳200 instant savings.",
    highlights: [
      "Includes 4 distinct regional honey varieties in one gift box",
      "Save ৳200 compared to buying jars individually",
      "Perfect for family wellness and festive gifting",
    ],
    origin: "Bangladesh",
  },
  {
    id: 16,
    slug: "honey-nuts-800gm",
    name: "Honey Nuts 800gm",
    price: 1700,
    image: "https://cdn.ghorerbazar.com/productImages/4BTRl1767443347.jpg",
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Honey Nuts",
    brand: "GhorerBazar",
    weight: "800 gm",
    badgeLeft: "Best Selling",
    inStock: true,
    sections: ["natural-honey", "just-for-you"],
    shortDescription:
      "Premium roasted almonds, cashews, walnuts, pistachios, raisins, and seeds generously infused in pure raw honey.",
    highlights: [
      "Packed with 7+ nutrient-dense dry fruits & seeds",
      "Pure natural honey infusion with zero glucose syrup",
      "Natural daily energy booster for adults and kids",
    ],
    origin: "Packed in Bangladesh",
  },
  {
    id: 17,
    slug: "black-seed-honey-500g",
    name: "Black Seed Honey 500g",
    price: 800,
    image: "https://cdn.ghorerbazar.com/productImages/UaiPN1793514068-light-1000x1000.jpg",
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Black Seed Honey",
    brand: "Honeyraj",
    weight: "500 gm",
    inStock: true,
    sections: ["natural-honey", "just-for-you"],
    shortDescription:
      "Convenient 500g jar of pure Kalijira (Black Seed) blossom honey, naturally rich and unheated.",
    highlights: [
      "100% raw monofloral Black Seed honey",
      "Ideal starter size for daily morning teaspoon routine",
    ],
    origin: "Faridpur, Bangladesh",
  },
  {
    id: 18,
    slug: "lichu-fuler-modhu-500-gm",
    name: "Lychee Flower Honey 500g",
    price: 700,
    image: "https://cdn.ghorerbazar.com/productImages/TtgOl1767418640.jpg",
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Lychee Flower Honey",
    brand: "Honeyraj",
    weight: "500 gm",
    inStock: true,
    sections: ["natural-honey", "just-for-you"],
    shortDescription:
      "Light golden, delicately floral honey collected from Dinajpur and Rajshahi lychee orchards.",
    highlights: [
      "Mild, kid-friendly floral sweetness with fruity finish",
      "Pairs wonderfully with tea, toast, yogurt, and warm water",
    ],
    origin: "Dinajpur, Bangladesh",
  },
  {
    id: 19,
    slug: "honeyraj-mixed-flower-honey-with-honeycomb-500g",
    name: "Mixed Flower Honey with comb 500g",
    price: 1000,
    image: "https://cdn.ghorerbazar.com/productImages/0ldaX1767531519.jpg",
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Honeycomb",
    brand: "Honeyraj",
    weight: "500 gm",
    inStock: true,
    sections: ["natural-honey", "just-for-you"],
    shortDescription:
      "Raw multifloral honey featuring an edible slice of natural beeswax honeycomb straight from the hive.",
    highlights: [
      "Unprocessed beeswax comb suspended in pure raw honey",
      "Rich mouthfeel and unmistakable authenticity",
    ],
    origin: "Bangladesh",
  },
  {
    id: 20,
    slug: "lichu-flower-honey-1kg",
    name: "Lychee Flower Honey 1kg",
    price: 1300,
    regularPrice: 1400,
    image: "https://cdn.ghorerbazar.com/productImages/nlewP1793514187-light-1000x1000.jpg",
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Lychee Flower Honey",
    brand: "Honeyraj",
    weight: "1 kg",
    saveText: "Save 7%",
    inStock: true,
    sections: ["natural-honey", "just-for-you"],
    shortDescription:
      "Family-sized 1kg jar of fragrant Lychee Flower honey harvested during the spring bloom.",
    highlights: [
      "Pure Dinajpur orchard harvest",
      "Great natural sugar alternative for beverages & desserts",
    ],
    origin: "Dinajpur, Bangladesh",
  },
  {
    id: 21,
    slug: "sundarban-honey-15g-x-24-pcs-box",
    name: "Sundarban Honey 15g X 24 pcs (BOX)",
    price: 768,
    image: "https://cdn.ghorerbazar.com/productImages/xtAP01776075952.png",
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Sachet Box",
    brand: "Honeyraj",
    weight: "15g × 24 pcs",
    badgeLeft: "New Arrival",
    inStock: true,
    sections: ["natural-honey", "just-for-you"],
    shortDescription:
      "24 single-serve 15g travel sachets of pure Sundarban honey for office, gym, travel, and school tiffin.",
    highlights: [
      "Mess-free hygienic single-use sachets",
      "Same lab-tested raw Sundarban honey on the go",
    ],
    origin: "Sundarbans, Bangladesh",
  },
  {
    id: 22,
    slug: "lychee-flower-honey-15g-x-24-pcs-box",
    name: "Lychee Flower Honey 15g X 24 pcs (BOX)",
    price: 432,
    image: "https://cdn.ghorerbazar.com/productImages/UxodJ1776075897.png",
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Sachet Box",
    brand: "Honeyraj",
    weight: "15g × 24 pcs",
    badgeLeft: "New Arrival",
    inStock: true,
    sections: ["natural-honey", "just-for-you"],
    shortDescription:
      "Box of 24 handy 15g sachets filled with pure floral Lychee Flower honey.",
    highlights: [
      "Convenient portion control for tea & breakfast",
      "Easy tear-open sachet packaging",
    ],
    origin: "Dinajpur, Bangladesh",
  },
  {
    id: 23,
    slug: "sundarban-honey-8g-x-24-pcs-box",
    name: "Sundarban Honey 8g X 24 pcs (BOX)",
    price: 432,
    image: "https://cdn.ghorerbazar.com/productImages/omV471776075964.png",
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Sachet Box",
    brand: "Honeyraj",
    weight: "8g × 24 pcs",
    badgeLeft: "New Arrival",
    inStock: true,
    sections: ["natural-honey", "just-for-you"],
    shortDescription:
      "Compact 8g × 24 sachet pack of Sundarban forest honey for daily single servings.",
    highlights: [
      "Pocket-sized pure energy sachet",
      "Zero artificial sweeteners",
    ],
    origin: "Sundarbans, Bangladesh",
  },
  {
    id: 24,
    slug: "lychee-flower-honey-8g-x-24-pcs-box",
    name: "Lychee Flower Honey 8g X 24 pcs (BOX)",
    price: 240,
    image: "https://cdn.ghorerbazar.com/productImages/tpOaP1776075938.png",
    category: "Honey",
    categorySlug: "honey-2",
    subcategory: "Sachet Box",
    brand: "Honeyraj",
    weight: "8g × 24 pcs",
    badgeLeft: "New Arrival",
    inStock: true,
    sections: ["natural-honey", "just-for-you"],
    shortDescription:
      "Box of 24 compact 8g sachets of Honeyraj Lychee Flower honey.",
    highlights: [
      "Affordable everyday sachet pack",
      "Pure orchard-collected floral honey",
    ],
    origin: "Dinajpur, Bangladesh",
  },
  {
    id: 25,
    slug: "ajwa-premium-fresh-dates-1kg",
    name: "Ajwa Premium Fresh Dates 1kg",
    price: 2200,
    image: "https://cdn.ghorerbazar.com/productImages/TY03p1782300772.webp",
    category: "Dates",
    categorySlug: "dates",
    subcategory: "Ajwa Dates",
    brand: "Khejuri",
    weight: "1 kg",
    inStock: true,
    sections: ["premium-dates", "just-for-you"],
    shortDescription:
      "Authentic soft and moist Madinah Ajwa dates carefully sorted and cold-stored for peak freshness.",
    highlights: [
      "Imported fresh harvest from Al-Madinah, Saudi Arabia",
      "Soft, fleshy texture with subtle caramel sweetness",
      "Rich in fiber, potassium, and natural antioxidants",
    ],
    origin: "Al-Madinah, Saudi Arabia",
  },
  {
    id: 26,
    slug: "egyptian-medjool-dates-1kg-jumbo",
    name: "Egyptian Medjool (Jumbo) 1kg",
    price: 2500,
    image: "https://cdn.ghorerbazar.com/productImages/yncs01793782995-light-1000x1000.jpg",
    category: "Dates",
    categorySlug: "dates",
    subcategory: "Medjool Dates",
    brand: "Khejuri",
    weight: "1 kg",
    badgeLeft: "Best Selling",
    inStock: true,
    sections: ["premium-dates", "just-for-you"],
    shortDescription:
      "Extra-large Jumbo Egyptian Medjool dates famed as the 'King of Dates' for their succulent, melt-in-the-mouth caramel bite.",
    highlights: [
      "Hand-selected jumbo grade size",
      "Naturally sweet without any sugar glaze",
    ],
    origin: "Egypt",
  },
  {
    id: 27,
    slug: "ajwa-premium-dates-large-1kg",
    name: "Ajwa Premium Fresh Dates 1kg (Large)",
    price: 2500,
    image: "https://cdn.ghorerbazar.com/productImages/brZpn1776762573.webp",
    category: "Dates",
    categorySlug: "dates",
    subcategory: "Ajwa Dates",
    brand: "Khejuri",
    weight: "1 kg (Large)",
    inStock: true,
    sections: ["premium-dates", "just-for-you"],
    shortDescription:
      "Large-grade Madinah Ajwa dates in hygienic gift-ready packaging.",
    highlights: [
      "Large size grade with deep dark hue",
      "Cold-chain maintained from import to doorstep",
    ],
    origin: "Saudi Arabia",
  },
  {
    id: 28,
    slug: "safawikalmi-dates-a-grade-1kg",
    name: "Safawi/kalmi Dates (A Grade) 1kg",
    price: 1300,
    image: "https://cdn.ghorerbazar.com/productImages/IyJYh1776762485.jpg",
    category: "Dates",
    categorySlug: "dates",
    subcategory: "Safawi / Kalmi Dates",
    brand: "Khejuri",
    weight: "1 kg",
    inStock: true,
    sections: ["premium-dates", "just-for-you"],
    shortDescription:
      "A-Grade dark, meaty Safawi (Kalmi) dates with mild balanced sweetness and clean chew.",
    highlights: [
      "Grade-A selected harvest",
      "Great daily snack and Ramadan Iftar staple",
    ],
    origin: "Saudi Arabia",
  },
  {
    id: 29,
    slug: "ajwa-premium-fresh-dates-500gm",
    name: "Ajwa Premium Fresh Dates 500gm",
    price: 1100,
    image: "https://cdn.ghorerbazar.com/productImages/EESft1782301652.webp",
    category: "Dates",
    categorySlug: "dates",
    subcategory: "Ajwa Dates",
    brand: "Khejuri",
    weight: "500 gm",
    inStock: true,
    sections: ["premium-dates", "just-for-you"],
    shortDescription:
      "500g pack of fresh, soft Madinah Ajwa dates ideal for personal daily nutrition.",
    highlights: [
      "Airtight 500g box",
      "Zero preservatives or glucose coating",
    ],
    origin: "Saudi Arabia",
  },
  {
    id: 30,
    slug: "egyptian-medjool-large-1kg",
    name: "Egyptian Medjool Large 1kg",
    price: 2200,
    image: "https://cdn.ghorerbazar.com/productImages/3ZQkL1793595352-light-1000x1000.jpg",
    category: "Dates",
    categorySlug: "dates",
    subcategory: "Medjool Dates",
    brand: "Khejuri",
    weight: "1 kg",
    inStock: true,
    sections: ["premium-dates", "just-for-you"],
    shortDescription:
      "Large Egyptian Medjool dates packed with rich, fibrous, natural fruit sweetness.",
    highlights: [
      "Plump, fresh texture",
      "Excellent natural energy snack",
    ],
    origin: "Egypt",
  },
  {
    id: 31,
    slug: "safawikalmi-dates-a-grade-500g",
    name: "Safawi/kalmi (A Grade) 500g",
    price: 700,
    image: "https://cdn.ghorerbazar.com/productImages/lLEg51774852853.jpeg",
    category: "Dates",
    categorySlug: "dates",
    subcategory: "Safawi / Kalmi Dates",
    brand: "Khejuri",
    weight: "500 gm",
    inStock: true,
    sections: ["premium-dates", "just-for-you"],
    shortDescription:
      "500g box of A-grade Safawi / Kalmi dates — soft, rich, and naturally nutritious.",
    highlights: [
      "Sorted Grade-A dates",
      "Convenient 500g pack",
    ],
    origin: "Saudi Arabia",
  },
  {
    id: 32,
    slug: "ajwa-premium-dates-500g-large",
    name: "Ajwa Premium Fresh Dates 500g (Large)",
    price: 1250,
    image: "https://cdn.ghorerbazar.com/productImages/3VEFg1771303741.webp",
    category: "Dates",
    categorySlug: "dates",
    subcategory: "Ajwa Dates",
    brand: "Khejuri",
    weight: "500 gm (Large)",
    inStock: true,
    sections: ["premium-dates", "just-for-you"],
    shortDescription:
      "Large-grade 500g box of succulent Madinah Ajwa dates.",
    highlights: [
      "Large plump berries",
      "Fresh cold-stored stock",
    ],
    origin: "Saudi Arabia",
  },
  {
    id: 33,
    slug: "sukkari-mufattal-malaki-dates-1kg",
    name: "Sukkari Mufattal Malaki Dates 1kg",
    price: 1500,
    image: "https://cdn.ghorerbazar.com/productImages/VpK6Q1776762386.jpg",
    category: "Dates",
    categorySlug: "dates",
    subcategory: "Sukkari Dates",
    brand: "Khejuri",
    weight: "1 kg",
    inStock: true,
    sections: ["premium-dates", "just-for-you"],
    shortDescription:
      "Golden honey-sweet Sukkari Mufattal Malaki dates prized across Saudi Arabia for their crisp-yet-soft bite.",
    highlights: [
      "Signature golden caramel flavor",
      "Pairs perfectly with Arabic coffee or tea",
    ],
    origin: "Al-Qassim, Saudi Arabia",
  },
  {
    id: 34,
    slug: "sukkari-mufattal-malaki-dates-3kg",
    name: "Sukkari Mufattal Malaki Dates 3kg",
    price: 4500,
    image: "https://cdn.ghorerbazar.com/productImages/sp98i1767589849.jpg",
    category: "Dates",
    categorySlug: "dates",
    subcategory: "Sukkari Dates",
    brand: "Khejuri",
    weight: "3 kg Carton",
    inStock: true,
    sections: ["premium-dates", "just-for-you"],
    shortDescription:
      "Original 3kg carton of Royal Sukkari Mufattal Malaki dates for families and gifting.",
    highlights: [
      "Sealed 3kg family carton",
      "Premium Royal Qassim grade",
    ],
    origin: "Al-Qassim, Saudi Arabia",
  },
  {
    id: 35,
    slug: "kala-bhuna-masala-500gm",
    name: "Kala Bhuna Masala-500gm",
    price: 1500,
    image: "https://cdn.ghorerbazar.com/productImages/5e9Vi1787487618-light-1000x1000.jpg",
    category: "Spices",
    categorySlug: "spices",
    subcategory: "Kala Bhuna Masala",
    brand: "GhorerBazar",
    weight: "500 gm",
    badgeLeft: "Offered Items",
    inStock: true,
    sections: ["cooking-essentials", "just-for-you"],
    shortDescription:
      "Authentic Chattogram-style aromatic Kala Bhuna spice blend prepared from 22+ roasted whole spices.",
    highlights: [
      "Zero artificial color, MSG, or tasting salt",
      "Small-batch freshly ground and packed",
    ],
    origin: "Bangladesh",
  },
  {
    id: 36,
    slug: "kala-bhuna-masala-250gm",
    name: "Kala Bhuna Masala-250gm",
    price: 750,
    image: "https://cdn.ghorerbazar.com/productImages/5e9Vi1787487618-light-1000x1000.jpg",
    category: "Spices",
    categorySlug: "spices",
    subcategory: "Kala Bhuna Masala",
    brand: "GhorerBazar",
    weight: "250 gm",
    badgeLeft: "Offered Items",
    inStock: true,
    sections: ["cooking-essentials", "just-for-you"],
    shortDescription:
      "250g pack of GhorerBazar's signature Kala Bhuna spice mix for rich traditional beef or mutton Kala Bhuna.",
    highlights: [
      "Ready-to-use authentic spice blend",
      "Enough for up to 5–6 kg of meat",
    ],
    origin: "Bangladesh",
  },
  {
    id: 37,
    slug: "ceylon-organic-coconut-vinegar-500ml",
    name: "Ceylon Organic Coconut Vinegar 500ml",
    price: 650,
    image: "https://cdn.ghorerbazar.com/productImages/GHKMJ1772862114.png",
    category: "Organic",
    categorySlug: "organic-5",
    subcategory: "Organic Vinegar",
    brand: "Glarvest",
    weight: "500 ml",
    inStock: true,
    sections: ["organic-food", "just-for-you"],
    shortDescription:
      "Naturally fermented Ceylon organic coconut blossom vinegar with probiotic 'mother' and mild mellow tang.",
    highlights: [
      "Certified organic Sri Lankan coconut sap vinegar",
      "Great for salad dressings, gut wellness, and marinades",
    ],
    origin: "Sri Lanka",
  },
  {
    id: 38,
    slug: "discovery-organic-apple-cider-vinegar-250ml",
    name: "Discovery Organic Apple Cider Vinegar 250ml",
    price: 520,
    image: "https://cdn.ghorerbazar.com/productImages/TTSB61772525925.png",
    category: "Organic",
    categorySlug: "organic-5",
    subcategory: "Organic Vinegar",
    brand: "Glarvest",
    weight: "250 ml",
    inStock: true,
    sections: ["organic-food", "just-for-you"],
    shortDescription:
      "Unfiltered, unpasteurized organic apple cider vinegar containing the living 'Mother' of vinegar.",
    highlights: [
      "Supports digestion, metabolism, and daily wellness",
      "Glass bottle packaging",
    ],
    origin: "Imported",
  },
  {
    id: 39,
    slug: "ceylon-organic-coconut-sugar-sl-200g",
    name: "Ceylon Organic Coconut Sugar (Sl) 200g",
    price: 650,
    image: "https://cdn.ghorerbazar.com/productImages/yEQlL1767517342.jpg",
    category: "Organic",
    categorySlug: "organic-5",
    subcategory: "Coconut Sugar",
    brand: "Glarvest",
    weight: "200 gm",
    inStock: true,
    sections: ["organic-food", "just-for-you"],
    shortDescription:
      "Unrefined low-GI organic coconut palm sugar with warm brown-butter caramel taste.",
    highlights: [
      "1:1 natural swap for refined white sugar",
      "Rich in trace minerals like iron, zinc, and potassium",
    ],
    origin: "Sri Lanka",
  },
  {
    id: 40,
    slug: "african-organic-wild-honey-500g",
    name: "African Organic Wild Honey 500g",
    price: 1150,
    regularPrice: 1250,
    image: "https://cdn.ghorerbazar.com/productImages/g7Qx11775107164.jpg",
    category: "Organic",
    categorySlug: "organic-5",
    subcategory: "Organic Honey",
    brand: "Honeyraj",
    weight: "500 gm",
    saveText: "Save 8%",
    inStock: true,
    sections: ["organic-food", "natural-honey", "just-for-you"],
    shortDescription:
      "Rare wild-harvested African forest honey with rich dark notes and high antioxidant profile.",
    highlights: [
      "Organic wildflower harvest",
      "Unheated and unfiltered",
    ],
    origin: "East Africa",
  },
  {
    id: 41,
    slug: "karkuma-organic-apple-cider-vinegar-480ml",
    name: "Karkuma Organic Apple Cider Vinegar (480ml)",
    price: 900,
    image: "https://cdn.ghorerbazar.com/productImages/nzvWc1767505402.jpg",
    category: "Functional Food",
    categorySlug: "functional-food",
    subcategory: "Apple Cider Vinegar",
    brand: "Shosti food",
    weight: "480 ml",
    inStock: true,
    sections: ["organic-food", "just-for-you"],
    shortDescription:
      "USDA-certified organic Karkuma Apple Cider Vinegar with the Mother for daily wellness routines.",
    highlights: [
      "USDA Organic & raw with the Mother",
      "Zero preservatives or artificial flavors",
    ],
    origin: "Bangladesh / Imported Apples",
  },
  {
    id: 42,
    slug: "organic-extra-virgin-coconut-oil-1ltr",
    name: "Organic Extra Virgin Coconut Oil 1ltr",
    price: 2080,
    image: "https://cdn.ghorerbazar.com/productImages/AsZsn1790246426-light-2000x2000.jpg",
    category: "Oil & Ghee",
    categorySlug: "oil-ghee",
    subcategory: "Coconut Oil",
    brand: "Glarvest",
    weight: "1 Litre",
    inStock: true,
    sections: ["organic-food", "cooking-essentials", "just-for-you"],
    shortDescription:
      "Cold-pressed organic extra virgin coconut oil suitable for cooking, bulletproof coffee, and skin & hair care.",
    highlights: [
      "100% cold-pressed from fresh organic coconut meat",
      "Unrefined, unbleached, and delightfully fragrant",
    ],
    origin: "Sri Lanka",
  },
  {
    id: 43,
    slug: "cashew-nuts-medium-size-1kg",
    name: "Cashew Nuts Medium Size 1kg",
    price: 2000,
    image: "https://cdn.ghorerbazar.com/productImages/xmShY1767096349.jpg",
    category: "Nuts & Seeds",
    categorySlug: "nuts-seeds",
    subcategory: "Cashew Nuts",
    brand: "GhorerBazar",
    weight: "1 kg",
    inStock: true,
    sections: ["just-for-you"],
    shortDescription:
      "Crisp, creamy whole medium-grade cashew nuts vacuum-packed for lasting crunch.",
    highlights: [
      "Whole W320/medium kernels with natural sweetness",
      "Rich in healthy fats, magnesium, and protein",
    ],
    origin: "Imported",
  },
  {
    id: 44,
    slug: "almond-1kg",
    name: "Almond 1kg",
    price: 1600,
    image: "https://cdn.ghorerbazar.com/productImages/IvsiP1767095664.jpg",
    category: "Nuts & Seeds",
    categorySlug: "nuts-seeds",
    subcategory: "Almonds",
    brand: "GhorerBazar",
    weight: "1 kg",
    inStock: true,
    sections: ["just-for-you"],
    shortDescription:
      "Premium Californian raw whole almonds loaded with vitamin E, fiber, and plant protein.",
    highlights: [
      "Raw, unsalted whole almonds",
      "Perfect for soaking overnight, snacking, or baking",
    ],
    origin: "California, USA",
  },
  {
    id: 45,
    slug: "glarvest-organic-extra-virgin-olive-oil-500-ml",
    name: "Glarvest Organic Extra Virgin Olive Oil 500 ml",
    price: 1400,
    image: "https://cdn.ghorerbazar.com/productImages/Nl9C61789057275-light-1000x1000.jpg",
    category: "Oil & Ghee",
    categorySlug: "oil-ghee",
    subcategory: "Olive Oil",
    brand: "Glarvest",
    weight: "500 ml",
    inStock: true,
    sections: ["organic-food", "cooking-essentials", "just-for-you"],
    shortDescription:
      "First cold-pressed Spanish/Mediterranean organic extra virgin olive oil for heart-healthy salads and sautéing.",
    highlights: [
      "Dark tinted glass bottle protects polyphenols",
      "Low acidity (<0.4%) extra virgin grade",
    ],
    origin: "Spain",
  },
  {
    id: 46,
    slug: "organic-beetroot-powder-250g",
    name: "Organic Beetroot Powder 250g",
    price: 850,
    image: "https://cdn.ghorerbazar.com/banner/v4WL81794205199-dark-1000x400.png",
    category: "Functional Food",
    categorySlug: "functional-food",
    subcategory: "Beetroot Powder",
    brand: "GhorerBazar",
    weight: "250 gm",
    badgeLeft: "Offered Items",
    inStock: true,
    sections: ["organic-food", "just-for-you"],
    shortDescription:
      "100% pure dehydrated organic beetroot superfood powder — promotes natural stamina, blood circulation, and smoothie nutrition.",
    highlights: [
      "Includes Free Lychee Flower Honey Sachet Box promo",
      "No fillers, maltodextrin, or artificial dyes",
    ],
    origin: "Bangladesh",
  },
  {
    id: 47,
    slug: "mashkalai-dal-1-kg",
    name: "Mashkalai Dal 1 Kg",
    price: 300,
    image: "https://cdn.ghorerbazar.com/productImages/unBAY1767438328.jpg",
    category: "Flours & Lentils",
    categorySlug: "flours-lentils",
    subcategory: "Mashkalai Dal",
    brand: "GhorerBazar",
    weight: "1 kg",
    inStock: true,
    sections: ["cooking-essentials", "just-for-you"],
    shortDescription:
      "Clean, stone-free, naturally sun-dried Bangladeshi Mashkalai Dal ready for traditional creamy lentil dishes.",
    highlights: [
      "100% unpolished natural harvest",
      "High protein and rich earthy flavor",
    ],
    origin: "Rajshahi, Bangladesh",
  },
  {
    id: 48,
    slug: "cumin-jira-powder-500gm",
    name: "Cumin (Jira) Powder 500gm",
    price: 880,
    image: "https://cdn.ghorerbazar.com/productImages/kGxNK1787487507-light-1000x1000.jpg",
    category: "Spices",
    categorySlug: "spices",
    subcategory: "Cumin Powder",
    brand: "GhorerBazar",
    weight: "500 gm",
    inStock: true,
    sections: ["cooking-essentials", "just-for-you"],
    shortDescription:
      "Freshly milled aromatic roasted Cumin (Jira) powder with zero husks, sawdust, or fillers.",
    highlights: [
      "100% pure whole cumin seeds ground in hygienic facility",
      "Strong natural aroma for curries and marinades",
    ],
    origin: "Packed in Bangladesh",
  },
  {
    id: 49,
    slug: "shosti-chinigura-aromatic-rice-5kg",
    name: "Shosti Dinajpur Chinigura Rice 5kg",
    price: 820,
    regularPrice: 880,
    image: "https://cdn.ghorerbazar.com/category_images/Emr6I1774766667.png",
    category: "Rice",
    categorySlug: "rice",
    subcategory: "Chinigura Rice",
    brand: "Shosti food",
    weight: "5 kg",
    saveText: "Save 7%",
    inStock: true,
    sections: ["cooking-essentials", "just-for-you"],
    shortDescription:
      "Fragrant aged Dinajpur Chinigura Polao rice with slender grains and rich aroma for biryani and festive dishes.",
    highlights: [
      "Naturally aged for fluffy non-sticky grains",
      "Free from artificial scenting",
    ],
    origin: "Dinajpur, Bangladesh",
  },
];

export const FAQ_ITEMS = [
  {
    q: "How can I place an order on GhorerBazar?",
    a: "Simply click 'Add To Cart' on your favorite items or click 'Buy Now' to go straight to Checkout. Enter your name, mobile number, and delivery address, select Cash on Delivery or online payment, and confirm your order in seconds.",
  },
  {
    q: "How long does delivery take inside and outside Dhaka?",
    a: "Inside Dhaka city, orders are typically delivered within 24–48 hours. Outside Dhaka across Bangladesh, delivery takes 2–4 business days via our trusted courier partners.",
  },
  {
    q: "Are your honey and oil products 100% pure and lab-tested?",
    a: "Yes. Every batch of Honeyraj honey, GhorerBazar Deshi Mustard Oil, and Gawa Ghee is sourced directly from trusted regional producers and undergoes strict quality & purity verification before packaging.",
  },
  {
    q: "What is your Happy Return & Refund policy?",
    a: "If you receive a damaged, wrong, or unsatisfactory item, contact our support hotline (+8809642922922) within 7 days of delivery for an instant replacement or full refund.",
  },
  {
    q: "Can I order via phone or WhatsApp?",
    a: "Yes! Call +8809642922922 or message us directly on WhatsApp (+8801321208940) with the product name and your delivery address.",
  },
];

export const STATIC_PAGES: Record<
  string,
  { title: string; subtitle: string; body: string[] }
> = {
  "about-us": {
    title: "About Us",
    subtitle: "Ghorer Bazar — Safe and Reliable Food for Every Home",
    body: [
      "Ghorer Bazar is an e-commerce platform dedicated to providing safe, pure, and reliable food to every home in Bangladesh.",
      "From raw Sundarbans mangrove honey and cold-pressed Maghi mustard oil to Sirajganj Gawa Ghee and handpicked Madinah dates, we bridge honest local farmers and trusted international sources directly with your family kitchen.",
      "Every item is carefully vetted, hygienically packed, and delivered swiftly to your doorstep from our hub in Rampura, Dhaka.",
    ],
  },
  "contact-us": {
    title: "Contact Us",
    subtitle: "We are here to help 7 days a week",
    body: [
      "Office & Hub: Rampura, Dhaka, Bangladesh",
      "Customer Care Hotline: +8809642922922",
      "WhatsApp Support: +8801321208940",
      "Email: contact@ghorerbazar.com",
    ],
  },
  "company-information": {
    title: "Company Information",
    subtitle: "GhorerBazar Food & Agro E-Commerce",
    body: [
      "GhorerBazar operates a direct-to-consumer quality assurance chain from harvest origin to doorstep delivery.",
      "Registered Operations Hub: Rampura, Dhaka-1219, Bangladesh.",
    ],
  },
  stories: {
    title: "Ghorer Bazar Stories",
    subtitle: "Harvest tales from Sundarbans, Dinajpur, and Sirajganj",
    body: [
      "Our sourcing team works alongside traditional Mawali honey collectors in the Sundarbans, orchard keepers in Dinajpur, and dairy artisans in Sirajganj.",
      "By paying fair farm-gate prices and eliminating adulterated middlemen layers, we preserve authentic taste and nutrition for Bangladeshi families.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    subtitle: "Customer service and purchasing guidelines",
    body: [
      "All listed prices are in Bangladeshi Taka (৳) and include applicable packaging standards.",
      "Orders are confirmed via SMS or phone verification when necessary before dispatch.",
    ],
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "How we safeguard your personal data",
    body: [
      "We collect only the name, phone number, and delivery address needed to fulfill and track your orders securely.",
      "We never sell or share customer information with unauthorized third parties.",
    ],
  },
  careers: {
    title: "Careers",
    subtitle: "Grow with GhorerBazar",
    body: [
      "Passionate about clean food supply chains, e-commerce logistics, or customer care? Send your CV to contact@ghorerbazar.com.",
    ],
  },
  support: {
    title: "Support Center",
    subtitle: "Fast assistance for orders, returns, and product questions",
    body: [
      "Call +8809642922922 between 9:00 AM and 10:00 PM daily, or reach us anytime on WhatsApp.",
    ],
  },
  "how-to-order": {
    title: "How to Order",
    subtitle: "3 simple steps to get pure food delivered",
    body: [
      "1. Browse categories or search for your desired items and click 'Add To Cart'.",
      "2. Open your Cart drawer and click 'Proceed to Checkout' (or click 'Buy now' directly).",
      "3. Fill in your shipping details and choose Cash on Delivery or online payment.",
    ],
  },
  payment: {
    title: "Payment Methods",
    subtitle: "Flexible and SSLCOMMERZ-secured payment options",
    body: [
      "Pay conveniently via Cash on Delivery (COD), bKash, Nagad, Rocket, Upay, Visa, Mastercard, American Express, and local bank portals verified by SSLCOMMERZ.",
    ],
  },
  shipping: {
    title: "Shipping & Delivery",
    subtitle: "Nationwide doorstep delivery across 64 districts",
    body: [
      "Inside Dhaka Metro: ৳60 flat delivery charge (24–48 hours).",
      "Outside Dhaka: ৳120 nationwide courier delivery (2–4 business days).",
    ],
  },
  "happy-return": {
    title: "Happy Return Policy",
    subtitle: "100% customer satisfaction guarantee",
    body: [
      "We stand behind every jar and bottle. If anything arrives damaged or doesn't meet your expectations, let us know within 7 days for a hassle-free replacement or refund.",
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    subtitle: "Transparent & timely refunds",
    body: [
      "Approved refunds for prepaid orders are processed back to your bKash, Nagad, or bank card within 5–7 working days.",
    ],
  },
  exchange: {
    title: "Exchange Policy",
    subtitle: "Easy item swap for wrong or damaged shipments",
    body: [
      "Contact our support hotline with your Order ID and our rider/courier will arrange a prompt exchange at zero extra delivery fee.",
    ],
  },
  cancellation: {
    title: "Order Cancellation",
    subtitle: "Cancel before dispatch with zero hassle",
    body: [
      "You may cancel any unshipped order anytime by calling +8809642922922 with your Order ID.",
    ],
  },
  "pre-order": {
    title: "Pre-Order",
    subtitle: "Reserve fresh seasonal harvests early",
    body: [
      "Seasonal items such as fresh Sundarbans Chaka honey, winter Khejur Gur, and special Ramadan dates cartons can be pre-ordered directly online.",
    ],
  },
  "extra-discount": {
    title: "Extra Discount & Offer Zone",
    subtitle: "Combo packs and seasonal savings",
    body: [
      "Explore our Offer Zone and apply promo codes like GHORER10 at checkout for additional savings on select bundles.",
    ],
  },
};

export function formatTaka(amount: number): string {
  return `৳${amount.toLocaleString("en-IN")}`;
}

export function formatTakaDecimals(amount: number): string {
  return `৳${amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
