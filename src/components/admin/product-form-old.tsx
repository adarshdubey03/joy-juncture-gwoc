"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ProductSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { createProduct, updateProduct } from "@/actions/admin/product-actions";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Product, Category, Badge, Tag, Occasion, Mood } from "@/generated/prisma/client";
import ImageUpload from "@/components/ui/image-upload";
import Editor from "@/components/ui/editor";
import { Card, CardContent } from "@/components/ui/card";

interface ProductFormProps {
    initialData?: any;
    categories: Category[];
    badges?: Badge[];
    tags?: Tag[];
    occasions?: Occasion[];
    moods?: Mood[];
    products?: Product[];
}

export const ProductForm = ({ initialData, categories, badges = [], tags = [], occasions = [], moods = [], products = [] }: ProductFormProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    // Using vanilla React state for filter
    const [filterQuery, setFilterQuery] = useState("");

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(filterQuery.toLowerCase()) &&
        p.id !== initialData?.id
    );

    const form = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: (initialData ? {
            ...initialData,
            actualPrice: initialData.actualPrice, // Was price
            stockQuantity: initialData.stockQuantity, // Was stock
            lowStockAlert: initialData.lowStockAlert, // Was lowStockThreshold
            badgeIds: initialData.badges ? initialData.badges.map((b: any) => b.badgeId) : [],
            tagIds: initialData.tags ? initialData.tags.map((t: any) => t.tagId) : [],
            categoryIds: initialData.categories ? initialData.categories.map((c: any) => c.categoryId) : [],
            occasionIds: initialData.occasions ? initialData.occasions.map((o: any) => o.occasionId) : [],
            moodIds: initialData.moods ? initialData.moods.map((m: any) => m.moodId) : [],
            relatedProductIds: initialData.relatedTo ? initialData.relatedTo.map((p: any) => p.id) : [],

            // Nested Objects
            gameplayInfo: initialData.gameplayInfo || {
                minPlayers: 1,
                maxPlayers: 4,
                minAge: 0,
                avgPlayTime: 30,
            },
            storeInfo: initialData.storeInfo || {},

            // Legacy/Optional mappings fallback
            sku: initialData.sku || undefined,
            description: initialData.description || undefined,
        } : {
            name: "",
            actualPrice: 0,
            stockQuantity: 0,
            lowStockAlert: 5,
            isActive: true, // properties: isActive
            description: "",
            sku: "",
            images: [],
            badgeIds: [],
            tagIds: [],
            categoryIds: [],
            occasionIds: [],
            moodIds: [],
            relatedProductIds: [],
            gameplayInfo: {
                minPlayers: 1,
                maxPlayers: 4,
                minAge: 0,
                avgPlayTime: 30,
            },
        }) as z.infer<typeof ProductSchema>,
    });

    const onSubmit = (values: z.infer<typeof ProductSchema>) => {
        startTransition(() => {
            if (initialData) {
                updateProduct(initialData.id, values).then((data) => {
                    if (data.success) {
                        router.push("/admin/products");
                        router.refresh();
                    } else {
                        console.error(data.error);
                    }
                });
            } else {
                createProduct(values).then((data) => {
                    if (data.success) {
                        router.push("/admin/products");
                        router.refresh();
                    } else {
                        console.error(data.error);
                    }
                });
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-6 mb-4">
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="details">Details & Story</TabsTrigger>
                        <TabsTrigger value="specs">Specifications</TabsTrigger>
                        <TabsTrigger value="media">Media</TabsTrigger>
                        <TabsTrigger value="organization">Organization</TabsTrigger>
                        <TabsTrigger value="inventory">Inventory</TabsTrigger>
                    </TabsList>

                    {/* GENERAL TAB */}
                    <TabsContent value="general">
                        <Card>
                            <CardContent className="space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl><Input disabled={isPending} {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="categoryIds" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Category</FormLabel>
                                            <Select
                                                disabled={isPending}
                                                onValueChange={(val) => field.onChange([val])}
                                                value={field.value?.[0] || ""}
                                                defaultValue={field.value?.[0] || ""}
                                            >
                                                <FormControl><SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    {categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="actualPrice" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl><Input type="number" disabled={isPending} {...field} value={field.value as number} onChange={(e) => field.onChange(parseFloat(e.target.value))} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="isActive" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select
                                                disabled={isPending}
                                                onValueChange={(val) => field.onChange(val === "true")}
                                                value={field.value ? "true" : "false"}
                                            >
                                                <FormControl><SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    <SelectItem value="true">Active</SelectItem>
                                                    <SelectItem value="false">Inactive</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="sku" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SKU</FormLabel>
                                            <FormControl><Input disabled={isPending} {...field} value={field.value || ""} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* DETAILS TAB */}
                    <TabsContent value="details">
                        <Card>
                            <CardContent className="space-y-6 pt-4">
                                <FormField control={form.control} name="description" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl><Textarea disabled={isPending} {...field} /></FormControl>
                                        <FormDescription>Main product description.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                {/* Rich text fields removed/commented out temporarily as they were not in new Zod Schema explicitly or need mapping? Schema has description. No concept/story/setup in ProductSchema?
                                    Wait, ProductSchema in product.ts (Step 149) ONLY has 'description', 'shortDescription'.
                                    It does NOT have 'concept', 'story', 'setup', 'gameplay', 'winning'.
                                    These seemed to be legacy fields. 
                                    I will retain description and maybe shortDescription.
                                    If user wants rich content, I should add them back to Schema or map them to description?
                                    I will persist description.
                                */}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* SPECS TAB - NESTED NAMES */}
                    <TabsContent value="specs">
                        <Card>
                            <CardContent className="space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="gameplayInfo.minPlayers" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Min Players</FormLabel>
                                            <FormControl><Input type="number" disabled={isPending} {...field} value={field.value as number} onChange={(e) => field.onChange(parseInt(e.target.value))} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="gameplayInfo.maxPlayers" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Max Players</FormLabel>
                                            <FormControl><Input type="number" disabled={isPending} {...field} value={field.value as number} onChange={(e) => field.onChange(parseInt(e.target.value))} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="gameplayInfo.minAge" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Minimum Age</FormLabel>
                                            <FormControl><Input type="number" disabled={isPending} {...field} value={field.value as number} onChange={(e) => field.onChange(parseInt(e.target.value))} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="gameplayInfo.avgPlayTime" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Avg Play Time (mins)</FormLabel>
                                            <FormControl><Input type="number" disabled={isPending} {...field} value={field.value as number} onChange={(e) => field.onChange(parseInt(e.target.value))} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="gameplayInfo.difficulty" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Difficulty</FormLabel>
                                            <Select disabled={isPending} onValueChange={field.onChange} value={field.value}>
                                                <FormControl><SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    <SelectItem value="EASY">Easy</SelectItem>
                                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                                    <SelectItem value="HARD">Hard</SelectItem>
                                                    <SelectItem value="EXPERT">Expert</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* MEDIA TAB */}
                    <TabsContent value="media">
                        <Card>
                            <CardContent className="space-y-4 pt-4">
                                <FormField control={form.control} name="howToPlayVideo" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Video URL</FormLabel>
                                        <FormControl><Input disabled={isPending} placeholder="https://..." {...field} value={field.value || ""} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                {/* Image handling updated */}
                                <FormField
                                    control={form.control}
                                    name="images"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Images</FormLabel>
                                            <FormControl>
                                                <ImageUpload
                                                    value={field.value?.map((image) => image.url) || []}
                                                    disabled={isPending}
                                                    onChange={(url) => field.onChange([...(field.value || []), { url, isPrimary: field.value?.length === 0, sortOrder: field.value?.length || 0 }])}
                                                    onRemove={(url) => field.onChange((field.value?.filter((current) => current.url !== url)))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* ORGANIZATION TAB */}
                    <TabsContent value="organization">
                        <Card>
                            <CardContent className="pt-4 grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="font-semibold mb-2">Badges</h3>
                                    <div className="space-y-2 border p-4 rounded-md h-64 overflow-y-auto">
                                        <FormField
                                            control={form.control}
                                            name="badgeIds"
                                            render={() => (
                                                <FormItem>
                                                    {badges.map((badge) => (
                                                        <FormField
                                                            key={badge.id}
                                                            control={form.control}
                                                            name="badgeIds"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={badge.id}
                                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(badge.id)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...(field.value || []), badge.id])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value) => value !== badge.id
                                                                                            )
                                                                                        )
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal">
                                                                            {badge.name}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4 col-span-2">
                                    <h3 className="font-semibold mb-2">Related Products</h3>
                                    <Input
                                        placeholder="Search products..."
                                        value={filterQuery}
                                        onChange={(e) => setFilterQuery(e.target.value)}
                                        className="mb-2"
                                        disabled={isPending}
                                    />
                                    <div className="space-y-2 border p-4 rounded-md h-64 overflow-y-auto">
                                        <FormField
                                            control={form.control}
                                            name="relatedProductIds"
                                            render={() => (
                                                <FormItem>
                                                    {filteredProducts.map((product) => (
                                                        <FormField
                                                            key={product.id}
                                                            control={form.control}
                                                            name="relatedProductIds"

                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem
                                                                        key={product.id}
                                                                        className="flex flex-row items-center space-x-3 space-y-0 py-1"
                                                                    >
                                                                        <FormControl>
                                                                            <Checkbox
                                                                                checked={field.value?.includes(product.id)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                        ? field.onChange([...(field.value || []), product.id])
                                                                                        : field.onChange(
                                                                                            field.value?.filter(
                                                                                                (value) => value !== product.id
                                                                                            )
                                                                                        )
                                                                                }}
                                                                            />
                                                                        </FormControl>
                                                                        <FormLabel className="font-normal cursor-pointer flex-1">
                                                                            {product.name}
                                                                        </FormLabel>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* INVENTORY TAB */}
                    <TabsContent value="inventory">
                        <Card>
                            <CardContent className="space-y-4 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="stockQuantity" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Current Stock</FormLabel>
                                            <FormControl><Input type="number" disabled={isPending} {...field} value={field.value as number} onChange={(e) => field.onChange(parseInt(e.target.value))} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="lowStockAlert" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Low Stock Alert</FormLabel>
                                            <FormControl><Input type="number" disabled={isPending} {...field} value={field.value as number} onChange={(e) => field.onChange(parseInt(e.target.value))} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                                <div className="mt-6">
                                    <h3 className="font-semibold mb-2">Stock History</h3>
                                    <div className="border rounded-md">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>User</TableHead>
                                                    <TableHead>Change</TableHead>
                                                    <TableHead>New Stock</TableHead>
                                                    <TableHead>Reason</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {initialData?.inventoryLogs?.map((log: any) => (
                                                    <TableRow key={log.id}>
                                                        <TableCell>{new Date(log.createdAt).toLocaleDateString()}</TableCell>
                                                        <TableCell>{log.user?.name || "System"}</TableCell>
                                                        <TableCell className={log.change > 0 ? "text-green-600" : "text-red-600"}>
                                                            {log.change > 0 ? "+" : ""}{log.change}
                                                        </TableCell>
                                                        <TableCell>{log.newStock}</TableCell>
                                                        <TableCell>{log.reason}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <Button disabled={isPending} type="submit" className="w-full sm:w-auto">
                    {initialData ? "Save Changes" : "Create Product"}
                </Button>
            </form>
        </Form>
    );
};
