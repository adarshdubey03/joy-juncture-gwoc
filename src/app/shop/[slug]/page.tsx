
import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton";

// Define strict params type for Next.js 15+ (Params are async)
// However, in Next.js 14 it isn't async, but let's handle it safely.
// Checking package.json -> it's "next": "^16.0.10" (Wait, Next 16?? Probably User meant 15 RC or canary, but let's assume async params typically).
// Actually, Next.js 15 made params async.
// But standard type is:
type Props = {
  params: Promise<{ slug: string }>;
};

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-neutral-500 mb-1">{label}</p>
      <p className="text-neutral-800 font-medium">{value}</p>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: Props) {
  // Await params if using newer Next.js versions
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="bg-[#FFF4D6] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-24">
        {/* Back Link */}
        <Link
          href="/shop"
          className="text-sm text-neutral-600 hover:text-black transition"
        >
          ← Back to Play at Home
        </Link>

        {/* Hero */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-white">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-neutral-400">No Image</div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <h1 className="font-fredoka text-4xl text-black">
              {product.name}
            </h1>

            <p className="text-neutral-700 text-lg leading-relaxed">
              {product.description}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-xs rounded-full bg-[#F4C752] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="text-xl font-bold">
              ₹{product.price}
            </div>

            {/* CTA */}
            <div className="pt-4">
              {/* CTA */}
              <div className="pt-4">
                <AddToCartButton
                  product={{
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  }}
                  className="px-6 py-3"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Specifications */}
        <section className="mt-24 max-w-3xl">
          <h2 className="font-fredoka text-3xl text-black mb-8">
            Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12 text-sm">
            <Spec label="Game Type" value={product.category} />
            <Spec label="Occasion" value={product.occasion.join(", ")} />
            <Spec label="Players" value={product.players} />
            <Spec label="Duration" value={product.duration} />
            <Spec label="Mood" value={product.mood} />
            <Spec label="Difficulty" value={product.difficulty} />
          </div>
        </section>

        {/* Story */}
        {product.story && (
          <section className="mt-28 max-w-3xl">
            <h2 className="font-fredoka text-3xl text-black mb-6">
              The Idea Behind the Game
            </h2>
            <p className="text-neutral-700 leading-relaxed">
              {product.story}
            </p>
          </section>
        )}

        {/* How to Play */}
        {product.howToPlay.length > 0 && (
          <section className="mt-24 max-w-3xl">
            <h2 className="font-fredoka text-3xl text-black mb-6">
              How to Play
            </h2>
            <ol className="list-decimal list-inside space-y-4 text-neutral-700">
              {product.howToPlay.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {/* Ideal For (Mapped from whatYoullLove) */}
        {product.whatYoullLove.length > 0 && (
          <section className="mt-24 max-w-3xl">
            <h2 className="font-fredoka text-3xl text-black mb-6">
              Ideal For
            </h2>
            <ul className="list-disc list-inside space-y-3 text-neutral-700">
              {product.whatYoullLove.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Visual Walkthrough */}
        {product.images.length > 0 && (
          <section className="mt-28">
            <h2 className="font-fredoka text-3xl text-black mb-10">
              Visual Walkthrough
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="relative aspect-4/3 bg-white rounded-xl overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${product.name} walkthrough ${index + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
