import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

interface RelatedProductsProps {
    currentSlug: string;
    category: string;
}

export function RelatedProducts({ currentSlug, category }: RelatedProductsProps) {
    // Simple suggestion logic: same category, excluding current, or just any other products
    const related = products
        .filter((p) => p.slug !== currentSlug && p.category === category)
        .slice(0, 4);

    // If not enough related by category, just fill with others
    if (related.length < 4) {
        const others = products
            .filter((p) => p.slug !== currentSlug && p.category !== category)
            .slice(0, 4 - related.length);
        related.push(...others);
    }

    return (
        <section className="mt-28 pt-16 border-t border-neutral-200">
            <h2 className="font-fredoka text-3xl text-black mb-12 text-center">
                You Might Also Like
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {related.map((product) => (
                    <div key={product.id} className="h-full">
                        <ProductCard product={product} variant="compact" />
                    </div>
                ))}
            </div>
        </section>
    );
}
