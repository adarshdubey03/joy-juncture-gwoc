import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ProductGallery } from "@/components/ProductGallery";
// import { ProductActions } from "@/components/ProductActions"; // Replaced by AddToCartButton
import AddToCartButton from "@/components/cart/AddToCartButton";
import { TrustBadges } from "@/components/TrustBadges";
import { RelatedProducts } from "@/components/RelatedProducts";

// Helper component for star rating
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-[#F4C752]">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < Math.floor(rating || 5) // Default to 5 if no rating
            ? "fill-current"
            : "text-neutral-300 fill-none"
            }`}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  );
}

function SpecCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-100 flex items-center gap-4 shadow-sm">
      <div className="w-12 h-12 bg-[#FFF4D6] rounded-full flex items-center justify-center text-2xl">
        {icon}
      </div>
      <div>
        <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mb-0.5">
          {label}
        </p>
        <p className="text-black font-bold text-lg leading-tight">{value}</p>
      </div>
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productData = await db.product.findUnique({
    where: { slug },
    include: {
      images: true,
      categories: { include: { category: true } },
      moods: { include: { mood: true } },
      gameplayInfo: true,
      badges: { include: { badge: true } },
      keyFeatures: true,
    },
  });

  if (!productData) {
    notFound();
  }

  const product = {
    id: productData.id,
    name: productData.name,
    slug: productData.slug,
    description: productData.description,
    price: Number(productData.discountedPrice || productData.actualPrice),
    image: productData.images.find((img) => img.isPrimary)?.url || productData.images[0]?.url || "/placeholder.png",
    images: productData.images.map((img) => img.url),
    category: productData.categories[0]?.category.name || "Game",
    badges: productData.badges.map((b) => b.badge.name),
    players: productData.gameplayInfo
      ? `${productData.gameplayInfo.minPlayers}-${productData.gameplayInfo.maxPlayers}`
      : "2-4",
    duration: productData.gameplayInfo ? `${productData.gameplayInfo.avgPlayTime} mins` : "30 mins",
    mood: productData.moods[0]?.mood.name || "Fun",
    story: productData.description,
    howToPlay: productData.keyFeatures.map((f) => f.title),
    whatYoullLove: productData.keyFeatures.map((f) => f.description || f.title),
  };

  // Mock reviews count/rating for now as they are not aggregated in this query yet
  const reviews = 42;
  const rating = 4.8;

  return (
    <main className="bg-[#FFF4D6] min-h-screen relative">
      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/contour-pattern.svg')] bg-repeat bg-[length:600px_auto] mix-blend-multiply" />

      <div className="max-w-6xl mx-auto px-4 pt-24 pb-12 lg:py-24 relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm font-medium mb-4 lg:mb-8 text-neutral-500">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start animate-fade-in">
          <ProductGallery
            images={product.images}
            name={product.name}
            badges={product.badges}
          />

          <div className="flex flex-col gap-6 pt-2">
            <div>
              <h1 className="font-fredoka text-4xl lg:text-6xl text-black mb-2 leading-[1.1]">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <StarRating rating={rating} />
                <span className="text-sm text-neutral-500 font-medium">
                  ({reviews} reviews)
                </span>
              </div>

              <div className="mb-6">
                <p className="text-3xl font-fredoka flex items-center gap-3">
                  ₹{product.price}
                  {/* If we had originalPrice in DB, show it. Prisma schema doesn't seem to have originalPrice yet based on my last read. */}
                  {/* If schema has it, we can use it. I'll stick to price for now. */}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Tax included.
                </p>
              </div>

              <p className="text-neutral-700 text-lg leading-relaxed font-medium mb-2">
                {product.description}
              </p>
            </div>

            {/* CTA & Actions */}
            <div className="pt-4 border-t border-neutral-200/50">
              <div className="flex flex-col gap-6 w-full">
                {/* Using our custom AddToCartButton logic */}
                <AddToCartButton
                  product={{
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.image
                  }}
                  className="w-full text-lg py-4"
                />
              </div>

              <div className="mt-6">
                <TrustBadges />
              </div>
            </div>
          </div>
        </section>

        {/* Specifications Grid */}
        <section className="mt-16 lg:mt-24">
          <h2 className="font-fredoka text-3xl text-black mb-8 text-center">
            Game Specs
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SpecCard label="Game Type" value={product.category} icon="🎲" />
            <SpecCard
              label="Players"
              value={product.players}
              icon="👥"
            />
            <SpecCard
              label="Duration"
              value={product.duration}
              icon="⏱️"
            />
            <SpecCard label="Mood" value={product.mood} icon="✨" />
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 lg:mt-28">
          {/* Story */}
          {product.story && (
            <section className="lg:col-span-7 bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-neutral-100">
              <h2 className="font-fredoka text-3xl text-black mb-6">
                The Story
              </h2>
              <p className="text-neutral-700 leading-8 text-lg">
                {product.story}
              </p>
            </section>
          )}

          {/* Ideal For */}
          {product.whatYoullLove.length > 0 && (
            <section className="lg:col-span-5 bg-[#F4C752]/10 rounded-3xl p-6 lg:p-10 border border-[#F4C752]/20">
              <h2 className="font-fredoka text-3xl text-black mb-6">
                Perfect For...
              </h2>
              <ul className="space-y-4">
                {product.whatYoullLove.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="bg-[#F4C752] rounded-full p-1 mt-1 shrink-0">
                      <svg
                        className="w-3 h-3 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-neutral-800 font-medium text-lg">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* How to Play - Visual Steps */}
        {product.howToPlay.length > 0 && (
          <section className="mt-16 lg:mt-28">
            <h2 className="font-fredoka text-4xl text-black mb-12 text-center">
              How to Play
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.howToPlay.map((step, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-3xl relative overflow-hidden shadow-sm group hover:-translate-y-2 transition-transform duration-300"
                >
                  <div className="absolute -right-4 -top-4 text-9xl font-fredoka text-[#FFF4D6] group-hover:text-[#F4C752]/20 transition-colors select-none">
                    {index + 1}
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-bold text-xl mb-4">Step {index + 1}</h3>
                    <p className="text-neutral-600 leading-relaxed font-medium">
                      {step}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <RelatedProducts currentSlug={product.slug} category={product.category} />
      </div>
    </main>
  );
}
