"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS, Product } from "@/data/catalog";

export interface CartItem {
  productId: number;
  slug: string;
  name: string;
  price: number;
  regularPrice?: number;
  image: string;
  weight?: string;
  quantity: number;
}

export interface CustomerOrder {
  orderId: string;
  customerName: string;
  phone: string;
  area: "inside-dhaka" | "outside-dhaka";
  address: string;
  note?: string;
  paymentMethod: "cod" | "bkash" | "nagad" | "sslcommerz";
  items: CartItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  total: number;
  status: "Order Placed" | "Confirmed" | "Packed" | "Out for Delivery" | "Delivered";
  createdAt: string;
}

export interface ProductReview {
  id: string;
  productSlug: string;
  author: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

interface ToastMessage {
  id: number;
  text: string;
  type: "success" | "info";
}

interface StoreContextValue {
  cart: CartItem[];
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: Product, quantity?: number, openDrawer?: boolean) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  wishlist: number[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: number) => boolean;
  orders: CustomerOrder[];
  placeOrder: (order: Omit<CustomerOrder, "orderId" | "status" | "createdAt">) => CustomerOrder;
  findOrder: (query: string) => CustomerOrder | undefined;
  reviews: ProductReview[];
  addReview: (review: Omit<ProductReview, "id" | "createdAt">) => void;
  user: { name: string; phone: string } | null;
  signIn: (name: string, phone: string) => void;
  signOut: () => void;
  showToast: (text: string, type?: "success" | "info") => void;
}

const STORAGE_KEY = "ghorerbazar_store_v1";

const SEEDED_ORDERS: CustomerOrder[] = [
  {
    orderId: "GB-10042",
    customerName: "Tariqul Islam",
    phone: "01711000042",
    area: "inside-dhaka",
    address: "House 18, Road 4, Block B, Banasree, Rampura, Dhaka",
    paymentMethod: "cod",
    items: [
      {
        productId: PRODUCTS[0].id,
        slug: PRODUCTS[0].slug,
        name: PRODUCTS[0].name,
        price: PRODUCTS[0].price,
        regularPrice: PRODUCTS[0].regularPrice,
        image: PRODUCTS[0].image,
        weight: PRODUCTS[0].weight,
        quantity: 1,
      },
      {
        productId: PRODUCTS[3].id,
        slug: PRODUCTS[3].slug,
        name: PRODUCTS[3].name,
        price: PRODUCTS[3].price,
        regularPrice: PRODUCTS[3].regularPrice,
        image: PRODUCTS[3].image,
        weight: PRODUCTS[3].weight,
        quantity: 1,
      },
    ],
    subtotal: 4190,
    deliveryCharge: 60,
    discount: 0,
    total: 4250,
    status: "Out for Delivery",
    createdAt: "2026-11-11T14:20:00+06:00",
  },
];

const SEEDED_REVIEWS: ProductReview[] = [
  {
    id: "rev-1",
    productSlug: "sundarban-honey",
    author: "Mahmud Hasan",
    rating: 5,
    comment:
      "Alhamdulillah, completely authentic Sundarban honey aroma and taste. Packaging was leak-proof and reached Dhaka within 24 hours.",
    createdAt: "2026-11-02",
  },
  {
    id: "rev-2",
    productSlug: "gawa-ghee-1kg",
    author: "Nusrat Jahan",
    rating: 5,
    comment:
      "Rich grainy dana texture and authentic Sirajganj ghee smell. Reminds me of homemade ghee.",
    createdAt: "2026-11-05",
  },
];

const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [orders, setOrders] = useState<CustomerOrder[]>(SEEDED_ORDERS);
  const [reviews, setReviews] = useState<ProductReview[]>(SEEDED_REVIEWS);
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.cart)) setCart(parsed.cart);
        if (Array.isArray(parsed.wishlist)) setWishlist(parsed.wishlist);
        if (Array.isArray(parsed.orders) && parsed.orders.length > 0) {
          setOrders(parsed.orders);
        }
        if (Array.isArray(parsed.reviews) && parsed.reviews.length > 0) {
          setReviews(parsed.reviews);
        }
        if (parsed.user && parsed.user.phone) setUser(parsed.user);
      }
    } catch {
      // Ignore malformed storage
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ cart, wishlist, orders, reviews, user })
      );
    } catch {
      // Ignore storage quota issues
    }
  }, [cart, wishlist, orders, reviews, user, hydrated]);

  const showToast = useCallback(
    (text: string, type: "success" | "info" = "success") => {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      setToasts((prev) => [...prev, { id, text, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 2800);
    },
    []
  );

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback(
    (product: Product, quantity = 1, openDrawer = true) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.productId === product.id);
        if (existing) {
          return prev.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [
          ...prev,
          {
            productId: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            regularPrice: product.regularPrice,
            image: product.image,
            weight: product.weight,
            quantity,
          },
        ];
      });
      showToast(`${product.name} added to cart`);
      if (openDrawer) setIsCartOpen(true);
    },
    [showToast]
  );

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const exists = prev.includes(product.id);
        if (exists) {
          showToast(`Removed ${product.name} from wishlist`, "info");
          return prev.filter((id) => id !== product.id);
        }
        showToast(`Saved ${product.name} to wishlist`);
        return [...prev, product.id];
      });
    },
    [showToast]
  );

  const isWishlisted = useCallback(
    (productId: number) => wishlist.includes(productId),
    [wishlist]
  );

  const placeOrder = useCallback(
    (orderData: Omit<CustomerOrder, "orderId" | "status" | "createdAt">) => {
      const randomNum = 10050 + Math.floor(Math.random() * 89000);
      const newOrder: CustomerOrder = {
        ...orderData,
        orderId: `GB-${randomNum}`,
        status: "Order Placed",
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    },
    []
  );

  const findOrder = useCallback(
    (query: string) => {
      const normalized = query.trim().toLowerCase();
      if (!normalized) return undefined;
      return orders.find(
        (o) =>
          o.orderId.toLowerCase() === normalized ||
          o.phone.toLowerCase().includes(normalized)
      );
    },
    [orders]
  );

  const addReview = useCallback(
    (review: Omit<ProductReview, "id" | "createdAt">) => {
      const newReview: ProductReview = {
        ...review,
        id: `rev-${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setReviews((prev) => [newReview, ...prev]);
      showToast("Thank you! Your review has been published.");
    },
    [showToast]
  );

  const signIn = useCallback(
    (name: string, phone: string) => {
      setUser({ name: name.trim() || "GhorerBazar Customer", phone: phone.trim() });
      showToast("Signed in successfully");
    },
    [showToast]
  );

  const signOut = useCallback(() => {
    setUser(null);
    showToast("Signed out", "info");
  }, [showToast]);

  const totalItems = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      totalItems,
      subtotal,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      wishlist,
      toggleWishlist,
      isWishlisted,
      orders,
      placeOrder,
      findOrder,
      reviews,
      addReview,
      user,
      signIn,
      signOut,
      showToast,
    }),
    [
      cart,
      totalItems,
      subtotal,
      isCartOpen,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      wishlist,
      toggleWishlist,
      isWishlisted,
      orders,
      placeOrder,
      findOrder,
      reviews,
      addReview,
      user,
      signIn,
      signOut,
      showToast,
    ]
  );

  return (
    <StoreContext.Provider value={value}>
      {children}
      {/* Toast Notifications */}
      <div
        aria-live="polite"
        className="fixed bottom-5 left-1/2 z-[1200] flex -translate-x-1/2 flex-col gap-2 pointer-events-none"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-lg transition-all ${
              t.type === "success" ? "bg-[#041f1e] border border-[#f48721]/40" : "bg-[#222831]"
            }`}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#f48721]" />
            <span>{t.text}</span>
          </div>
        ))}
      </div>
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used inside StoreProvider");
  }
  return ctx;
}
