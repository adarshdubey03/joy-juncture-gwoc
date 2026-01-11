import { db } from "@/lib/db";
import ShopClient from "./ShopClient";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const dbProducts = await db.product.findMany({
    where: { isActive: true },
    orderBy: { dateAdded: "desc" },
    include: {
      categories: { include: { category: true } },
      occasions: { include: { occasion: true } },
      moods: { include: { mood: true } },
      images: true,
      badges: { include: { badge: true } },
      reviews: true,
      keyFeatures: true,
      gameplayInfo: true,
      storeInfo: true,
    },
  });

  const products = dbProducts.map((p) => {
    // Determine 'price' (current selling price) and 'originalPrice' (MSRP/Base)
    // If discountedPrice exists, that is the selling price.
    const price = p.discountedPrice ? Number(p.discountedPrice) : Number(p.actualPrice);
    const originalPrice = p.discountedPrice ? Number(p.actualPrice) : undefined;

    // Get primary image
    const primaryImage = p.images.find((img) => img.isPrimary)?.url || p.images[0]?.url || "/placeholder.png";

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      price,
      originalPrice,
      category: p.categories[0]?.category.name || "Uncategorized",
      image: primaryImage,
      badges: p.badges.map((b) => b.badge.name),
      description: p.description,
      images: p.images.map((img) => img.url),
      rating: p.reviews.length > 0
        ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length
        : 0,
      reviews: p.reviews.length,
      features: p.keyFeatures.map((f) => f.title),
      story: p.shortDescription || p.description,
      howToPlay: [], // Placeholder as schema structure differs
      whatYoullLove: [],
      occasion: p.occasions.map((o) => o.occasion.name),
      included: p.storeInfo?.boxContents ? [p.storeInfo.boxContents] : [],
      specifications: p.gameplayInfo
        ? {
          Players: `${p.gameplayInfo.minPlayers}-${p.gameplayInfo.maxPlayers}`,
          "Play Time": `${p.gameplayInfo.avgPlayTime} mins`,
          Age: `${p.gameplayInfo.minAge}+`,
        }
        : undefined,
      mood: p.moods[0]?.mood.name,
    };
  });

  return <ShopClient products={products} />;
}
