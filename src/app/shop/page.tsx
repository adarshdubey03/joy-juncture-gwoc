import { db } from "@/lib/db";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const productsData = await db.product.findMany({
    where: { isActive: true },
    orderBy: { dateAdded: "desc" },
    include: {
      images: true,
      categories: { include: { category: true } },
      moods: { include: { mood: true } },
      occasions: { include: { occasion: true } },
      badges: { include: { badge: true } },
      reviews: true,
      keyFeatures: true,
    },
  });

  const products = productsData.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.discountedPrice ?? p.actualPrice),
    originalPrice: p.discountedPrice ? Number(p.actualPrice) : undefined,
    category: p.categories[0]?.category?.name || "Uncategorized",
    image: p.images.find((img) => img.isPrimary)?.url || p.images[0]?.url || "/placeholder.png",
    badges: p.badges.map((b) => b.badge.name),
    description: p.description,
    images: p.images.map((i) => i.url),
    rating: p.reviews.reduce((acc, r) => acc + r.rating, 0) / (p.reviews.length || 1),
    reviews: p.reviews.length,
    features: p.keyFeatures.map((f) => f.title),
    story: p.description, // Fallback
    howToPlay: [], // Fallback
    whatYoullLove: [],
    occasion: p.occasions.map((o) => o.occasion.name),
    included: [],
    specifications: {},
    mood: p.moods[0]?.mood?.name || "Unknown",
  })).sort((a, b) => {
    // Prioritize "Dead Man's Deck"
    const isA = a.name.toLowerCase().includes("dead man");
    const isB = b.name.toLowerCase().includes("dead man");
    if (isA && !isB) return -1;
    if (!isA && isB) return 1;
    return 0;
  });

  // @ts-ignore
  return <ShopClient products={products} />;
}
