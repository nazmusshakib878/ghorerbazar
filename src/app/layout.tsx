import type { Metadata } from "next";
import { Open_Sans, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { FloatingWidgets } from "@/components/FloatingWidgets";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GhorerBazar | Safe and Reliable Food E-Commerce",
  description:
    "Ghorer Bazar is an e-commerce platform dedicated to providing safe, pure, and reliable honey, mustard oil, ghee, dates, spices, and organic food to every home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${notoSansBengali.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#252a34] antialiased">
        <StoreProvider>
          <Header />
          <main className="flex-1 bg-[#faf8f4]">{children}</main>
          <Footer />
          <CartDrawer />
          <FloatingWidgets />
        </StoreProvider>
      </body>
    </html>
  );
}
