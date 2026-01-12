import { db } from "@/lib/db";
import { ProductForm } from "@/components/admin/product-form";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategories } from "@/actions/admin/category-actions";
import { getBadges, getTags, getOccasions, getMoods } from "@/actions/admin/metadata-actions";
import { getProduct, getProducts } from "@/actions/admin/product-actions";

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>
}

const ProductPage = async (props: ProductPageProps) => {
    const params = await props.params;
    const { data: product } = await getProduct(params.id);

    if (!product) {
        notFound();
    }

    const { data: categories } = await getCategories();
    const { data: badges } = await getBadges();
    const { data: tags } = await getTags();
    const { data: occasions } = await getOccasions();
    const { data: moods } = await getMoods();
    const { data: products } = await getProducts();

    const formattedProduct = product ? JSON.parse(JSON.stringify(product)) : null;
    const formattedProducts = products ? JSON.parse(JSON.stringify(products)) : [];

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Product: {product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ProductForm
                            initialData={formattedProduct}
                            categories={categories || []}
                            badges={badges || []}
                            tags={tags || []}
                            occasions={occasions || []}
                            moods={moods || []}
                            products={formattedProducts}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default ProductPage;
