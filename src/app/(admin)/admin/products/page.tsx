"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"; // Need to create this component
import { Badge } from "@/components/ui/badge";

// Mock Data
const products = [
    { id: 1, name: "Dead Man's Deck", price: 999, stock: 45, category: "Card Game", status: "Active" },
    { id: 2, name: "Mehfil", price: 1499, stock: 12, category: "Party Game", status: "Active" },
    { id: 3, name: "Tamasha", price: 1299, stock: 0, category: "Strategy", status: "Out of Stock" },
    { id: 4, name: "One More Round", price: 1999, stock: 23, category: "Drinking Game", status: "Active" },
];

export default function ProductsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" /> Add Product
                </Button>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search products..." className="pl-10" />
                </div>
            </div>

            <div className="rounded-md border bg-white">
                <div className="w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Stock</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {products.map((product) => (
                                <tr key={product.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-4 align-middle font-medium">{product.name}</td>
                                    <td className="p-4 align-middle">{product.category}</td>
                                    <td className="p-4 align-middle">₹{product.price}</td>
                                    <td className="p-4 align-middle">{product.stock}</td>
                                    <td className="p-4 align-middle">
                                        <Badge variant={product.status === "Active" ? "default" : "destructive"}>
                                            {product.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4 align-middle text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
