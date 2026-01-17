
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/actions/admin/product-actions";
import { formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";


export default async function ProductsPage() {
    const { data: products } = await getProducts();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <Button asChild>
                    <Link href="/admin/products/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Link>
                </Button>
            </div>

            <Card className="rounded-3xl border-none shadow-xl bg-white">
                <CardHeader>
                    <CardTitle className="text-xl text-[#2E2A24]">Product Catalog</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-bold text-[#5A554B]">Product</TableHead>
                                <TableHead className="font-bold text-[#5A554B]">Category</TableHead>
                                <TableHead className="font-bold text-[#5A554B]">Price</TableHead>
                                <TableHead className="font-bold text-[#5A554B]">Stock</TableHead>
                                <TableHead className="font-bold text-[#5A554B]">Status</TableHead>
                                <TableHead className="text-right font-bold text-[#5A554B]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products?.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                                        No products found. Add one to get started.
                                    </TableCell>
                                </TableRow>
                            )}
                            {products?.map((product) => (
                                <TableRow key={product.id} className="hover:bg-gray-50 border-gray-100">
                                    <TableCell className="font-medium">
                                        <div className="text-[#2E2A24]">{product.name}</div>
                                        <div className="text-xs text-muted-foreground">{product.sku || "No SKU"}</div>
                                    </TableCell>
                                    <TableCell>
                                        {/* categories is an array of objects like { category: { name: ... } } */}
                                        {product.categories?.[0]?.category?.name || "Uncategorized"}
                                    </TableCell>
                                    <TableCell>{formatCurrency(Number(product.actualPrice))}</TableCell>
                                    <TableCell>
                                        {product.stockQuantity}
                                        {product.stockQuantity < product.lowStockAlert && (
                                            <span className="ml-2 text-red-500 text-xs font-bold">(Low)</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={product.isActive ? "default" : "secondary"} className={product.isActive ? "bg-green-100 text-green-800 hover:bg-green-200 border-none" : ""}>
                                            {product.isActive ? "Active" : "Inactive"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm" asChild className="hover:bg-amber-100 hover:text-amber-900">
                                            <Link href={`/admin/products/${product.id}`}>Edit</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
