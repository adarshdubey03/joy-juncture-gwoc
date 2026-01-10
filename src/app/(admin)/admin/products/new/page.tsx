
import { ProductForm } from "@/components/admin/product-form";
import { getCategories } from "@/actions/admin/category-actions";
import { getBadges, getTags, getOccasions, getMoods } from "@/actions/admin/metadata-actions";
import { getProducts } from "@/actions/admin/product-actions";

export default async function NewProductPage() {
    const { data: categories } = await getCategories();
    const { data: badges } = await getBadges();
    const { data: tags } = await getTags();
    const { data: occasions } = await getOccasions();
    const { data: moods } = await getMoods();
    const { data: products } = await getProducts();

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Add Product</h2>
                    <p className="text-muted-foreground">
                        Create a new product for your catalog.
                    </p>
                </div>

                <ProductForm
                    categories={categories || []}
                    badges={badges || []}
                    tags={tags || []}
                    occasions={occasions || []}
                    moods={moods || []}
                    products={products || []}
                />
            </div>
        </div>
    );
}
