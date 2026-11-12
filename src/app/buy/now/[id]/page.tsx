import { redirect } from "next/navigation";
import { PRODUCTS } from "@/data/catalog";

export default async function BuyNowByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = Number(id);
  const product = PRODUCTS.find((p) => p.id === numId) || PRODUCTS[0];
  redirect(`/checkout?buyNow=${encodeURIComponent(product.slug)}`);
}
