"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ProductSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
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
import { Product, Category, Badge, Tag, Occasion, Mood } from "@/generated/prisma";
import ImageUpload from "@/components/ui/image-upload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge as BadgeUI } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Save, X } from "lucide-react";

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
    const [filterQuery, setFilterQuery] = useState("");

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(filterQuery.toLowerCase()) &&
        p.id !== initialData?.id
    );

    const form = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: (initialData ? {
            ...initialData,
            actualPrice: initialData.actualPrice,
            stockQuantity: initialData.stockQuantity,
            lowStockAlert: initialData.lowStockAlert,
            badgeIds: initialData.badges ? initialData.badges.map((b: any) => b.badgeId) : [],
            tagIds: initialData.tags ? initialData.tags.map((t: any) => t.tagId) : [],
            categoryIds: initialData.categories ? initialData.categories.map((c: any) => c.categoryId) : [],
            occasionIds: initialData.occasions ? initialData.occasions.map((o: any) => o.occasionId) : [],
            moodIds: initialData.moods ? initialData.moods.map((m: any) => m.moodId) : [],
            relatedProductIds: initialData.relatedTo ? initialData.relatedTo.map((p: any) => p.id) : [],
            gameplayInfo: initialData.gameplayInfo || {
                minPlayers: 1,
                maxPlayers: 4,
                minAge: 0,
                avgPlayTime: 30,
            },
            storeInfo: initialData.storeInfo || {},
            sku: initialData.sku || undefined,
            description: initialData.description || undefined,
        } : {
            name: "",
            actualPrice: 0,
            stockQuantity: 0,
            lowStockAlert: 5,
            isActive: true,
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
                <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-7">
                        <TabsTrigger value="basic">📋 Basic Info</TabsTrigger>
                        <TabsTrigger value="gameplay">🎲 Gameplay</TabsTrigger>
                        <TabsTrigger value="media">🖼️ Media</TabsTrigger>
                        <TabsTrigger value="features">✨ Features</TabsTrigger>
                        <TabsTrigger value="faqs">❓ FAQs</TabsTrigger>
                        <TabsTrigger value="categorization">🏷️ Categories</TabsTrigger>
                        <TabsTrigger value="inventory">📦 Inventory</TabsTrigger>
                    </TabsList>

                    {/* BASIC INFO TAB */}
                    <TabsContent value="basic" className="space-y-6 mt-6">
                        <Card className="rounded-3xl border-none shadow-xl">
                            <CardHeader>
                                <CardTitle>Product Identity</CardTitle>
                                <CardDescription>Essential product information and pricing</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Product Name *</FormLabel>
                                            <FormControl><Input disabled={isPending} placeholder="e.g., Monopoly Classic Edition" {...field} /></FormControl>
                                            <FormDescription>The main display name for your product</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="sku" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                                            <FormControl><Input disabled={isPending} placeholder="e.g., MONO-CLS-001" {...field} /></FormControl>
                                            <FormDescription>Unique product code for inventory tracking</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="isActive" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select disabled={isPending} onValueChange={(val) => field.onChange(val === "true")} value={field.value ? "true" : "false"}>
                                                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                                <SelectContent>
                                                    <SelectItem value="true">✅ Active (Visible to customers)</SelectItem>
                                                    <SelectItem value="false">❌ Inactive (Hidden)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <Separator />

                                <div className="grid grid-cols-3 gap-4">
                                    <FormField control={form.control} name="actualPrice" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price (₹) *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    disabled={isPending}
                                                    placeholder="999.00"
                                                    {...field}
                                                    value={field.value as number}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const actualPrice = parseFloat(e.target.value) || 0;
                                                        field.onChange(actualPrice);

                                                        // Auto-calculate discount% if discounted price exists
                                                        const discountedPrice = form.getValues('discountedPrice') as number | undefined;
                                                        if (discountedPrice && discountedPrice > 0 && actualPrice > 0) {
                                                            const discountPercent = Math.round(((actualPrice - discountedPrice) / actualPrice) * 100);
                                                            form.setValue('discountPercent', discountPercent);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>Regular selling price</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="discountedPrice" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sale Price (₹)</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.01"
                                                    disabled={isPending}
                                                    placeholder="799.00"
                                                    {...field}
                                                    value={field.value as number || ''}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const discountedPrice = parseFloat(e.target.value) || 0;
                                                        field.onChange(discountedPrice || undefined);

                                                        // Auto-calculate discount% if actual price exists
                                                        const actualPrice = form.getValues('actualPrice') as number;
                                                        if (actualPrice && actualPrice > 0 && discountedPrice > 0) {
                                                            const discountPercent = Math.round(((actualPrice - discountedPrice) / actualPrice) * 100);
                                                            form.setValue('discountPercent', discountPercent);
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                {form.watch('actualPrice') && form.watch('discountedPrice') ?
                                                    `You save ₹${((form.watch('actualPrice') as number) - ((form.watch('discountedPrice') as number) || 0)).toFixed(2)}`
                                                    : 'Optional discounted price'
                                                }
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="discountPercent" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Discount %</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    disabled={isPending}
                                                    placeholder="20"
                                                    {...field}
                                                    value={field.value as number || ''}
                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                        const discountPercent = parseInt(e.target.value) || 0;
                                                        field.onChange(discountPercent || undefined);

                                                        // Auto-calculate discounted price if actual price exists
                                                        const actualPrice = form.getValues('actualPrice') as number;
                                                        if (actualPrice && actualPrice > 0 && discountPercent > 0 && discountPercent <= 100) {
                                                            const discountedPrice = actualPrice * (1 - discountPercent / 100);
                                                            form.setValue('discountedPrice', parseFloat(discountedPrice.toFixed(2)));
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormDescription>Discount percentage (0-100)</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <FormField control={form.control} name="shortDescription" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Short Description</FormLabel>
                                        <FormControl><Textarea disabled={isPending} placeholder="A quick tagline or elevator pitch for this product..." rows={2} {...field} /></FormControl>
                                        <FormDescription>Brief description shown in product cards (1-2 sentences)</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="description" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Description *</FormLabel>
                                        <FormControl><Textarea disabled={isPending} placeholder="Detailed product description..." rows={6} {...field} /></FormControl>
                                        <FormDescription>Complete product details, features, and selling points</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </CardContent>
                        </Card>



                        <Card className="rounded-3xl border-none shadow-xl">
                            <CardHeader>
                                <CardTitle>Visibility & Features</CardTitle>
                                <CardDescription>Control how this product appears on your store</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <FormField control={form.control} name="isFeatured" render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isPending} /></FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>⭐ Featured</FormLabel>
                                                <FormDescription>Show in featured section</FormDescription>
                                            </div>
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="isNewArrival" render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isPending} /></FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>🆕 New Arrival</FormLabel>
                                                <FormDescription>Mark as new</FormDescription>
                                            </div>
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="isBestSeller" render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isPending} /></FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel>🔥 Best Seller</FormLabel>
                                                <FormDescription>Popular product</FormDescription>
                                            </div>
                                        </FormItem>
                                    )} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* GAMEPLAY TAB */}
                    <TabsContent value="gameplay" className="space-y-6 mt-6">
                        <Card className="rounded-3xl border-none shadow-xl">
                            <CardHeader>
                                <CardTitle>Gameplay Specifications</CardTitle>
                                <CardDescription>Key gameplay details for board games and activities</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-4 gap-4">
                                    <FormField control={form.control} name="gameplayInfo.minPlayers" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>👥 Min Players</FormLabel>
                                            <FormControl>
                                                <Input type="number" disabled={isPending} placeholder="1" {...field} value={field.value as number} onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 1)} />
                                            </FormControl>
                                            <FormDescription>Minimum players</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="gameplayInfo.maxPlayers" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>👥 Max Players</FormLabel>
                                            <FormControl>
                                                <Input type="number" disabled={isPending} placeholder="4" {...field} value={field.value as number} onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 4)} />
                                            </FormControl>
                                            <FormDescription>Maximum players</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="gameplayInfo.minAge" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>🎂 Min Age</FormLabel>
                                            <FormControl>
                                                <Input type="number" disabled={isPending} placeholder="8" {...field} value={field.value as number} onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)} />
                                            </FormControl>
                                            <FormDescription>Minimum age</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="gameplayInfo.avgPlayTime" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>⏱️ Play Time (min)</FormLabel>
                                            <FormControl>
                                                <Input type="number" disabled={isPending} placeholder="30" {...field} value={field.value as number} onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 30)} />
                                            </FormControl>
                                            <FormDescription>Average duration</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>

                                <FormField control={form.control} name="gameplayInfo.difficulty" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Difficulty Level</FormLabel>
                                        <Select disabled={isPending} onValueChange={field.onChange} value={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="EASY">🟢 Easy - Perfect for beginners</SelectItem>
                                                <SelectItem value="MEDIUM">🟡 Medium - Some strategy needed</SelectItem>
                                                <SelectItem value="HARD">🟠 Hard - Experienced players</SelectItem>
                                                <SelectItem value="EXPERT">🔴 Expert - High complexity</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>How complex or challenging is this game?</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* MEDIA TAB */}
                    <TabsContent value="media" className="space-y-6 mt-6">
                        <Card className="rounded-3xl border-none shadow-xl">
                            <CardHeader>
                                <CardTitle>Product Images</CardTitle>
                                <CardDescription>Upload high-quality product photos (first image is the primary)</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField control={form.control} name="images" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Product Photos</FormLabel>
                                        <FormControl>
                                            <ImageUpload
                                                value={field.value?.map((image) => image.url) || []}
                                                disabled={isPending}
                                                onChange={(url: string) => field.onChange([...(field.value || []), { url, isPrimary: field.value?.length === 0, sortOrder: field.value?.length || 0 }])}
                                                onRemove={(url: string) => field.onChange((field.value?.filter((current: any) => current.url !== url)))}
                                            />
                                        </FormControl>
                                        <FormDescription>Recommended: Square images (1:1 ratio), at least 800x800px</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </CardContent>
                        </Card>



                        <Card className="rounded-3xl border-none shadow-xl">
                            <CardHeader>
                                <CardTitle>How to Play Video</CardTitle>
                                <CardDescription>Optional instructional video URL</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <FormField control={form.control} name="howToPlayVideo" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Video URL</FormLabel>
                                        <FormControl><Input disabled={isPending} placeholder="https://youtube.com/watch?v=..." {...field} /></FormControl>
                                        <FormDescription>YouTube or Vimeo link explaining how to play</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* CATEGORIZATION TAB */}
                    <TabsContent value="categorization" className="space-y-6 mt-6">
                        <Card className="rounded-3xl border-none shadow-xl">
                            <CardHeader>
                                <CardTitle>Categories & Tags</CardTitle>
                                <CardDescription>Help customers discover this product</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField control={form.control} name="categoryIds" render={() => (
                                    <FormItem>
                                        <FormLabel>Product Categories</FormLabel>
                                        <FormDescription>Select all categories that apply to this product</FormDescription>
                                        <div className="grid grid-cols-3 gap-4 mt-2">
                                            {categories.map((category) => (
                                                <FormField key={category.id} control={form.control} name="categoryIds" render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(category.id)}
                                                                onCheckedChange={(checked: boolean | string) => {
                                                                    return checked
                                                                        ? field.onChange([...(field.value || []), category.id])
                                                                        : field.onChange(field.value?.filter((value: string) => value !== category.id))
                                                                }}
                                                                disabled={isPending}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal cursor-pointer">{category.name}</FormLabel>
                                                    </FormItem>
                                                )} />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <Separator />

                                <FormField control={form.control} name="occasionIds" render={() => (
                                    <FormItem>
                                        <FormLabel>Occasions</FormLabel>
                                        <FormDescription>When is this product best used?</FormDescription>
                                        <div className="grid grid-cols-4 gap-3 mt-2">
                                            {occasions.map((occasion) => (
                                                <FormField key={occasion.id} control={form.control} name="occasionIds" render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(occasion.id)}
                                                                onCheckedChange={(checked: boolean | string) => {
                                                                    return checked
                                                                        ? field.onChange([...(field.value || []), occasion.id])
                                                                        : field.onChange(field.value?.filter((value: string) => value !== occasion.id))
                                                                }}
                                                                disabled={isPending}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal cursor-pointer">{occasion.name}</FormLabel>
                                                    </FormItem>
                                                )} />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <FormField control={form.control} name="moodIds" render={() => (
                                    <FormItem>
                                        <FormLabel>Moods & Themes</FormLabel>
                                        <FormDescription>What atmosphere does this create?</FormDescription>
                                        <div className="grid grid-cols-4 gap-3 mt-2">
                                            {moods.map((mood) => (
                                                <FormField key={mood.id} control={form.control} name="moodIds" render={({ field }) => (
                                                    <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-md border p-2">
                                                        <FormControl>
                                                            <Checkbox
                                                                checked={field.value?.includes(mood.id)}
                                                                onCheckedChange={(checked: boolean | string) => {
                                                                    return checked
                                                                        ? field.onChange([...(field.value || []), mood.id])
                                                                        : field.onChange(field.value?.filter((value: string) => value !== mood.id))
                                                                }}
                                                                disabled={isPending}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="text-sm font-normal cursor-pointer">{mood.name}</FormLabel>
                                                    </FormItem>
                                                )} />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                                <Separator />

                                <FormField control={form.control} name="badgeIds" render={() => (
                                    <FormItem>
                                        <FormLabel>Special Badges</FormLabel>
                                        <FormDescription>Highlight special features or certifications</FormDescription>
                                        <div className="flex flex-wrap gap-3 mt-2">
                                            {badges.map((badge) => (
                                                <FormField key={badge.id} control={form.control} name="badgeIds" render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <div className="flex items-center space-x-2">
                                                                <Checkbox
                                                                    checked={field.value?.includes(badge.id)}
                                                                    onCheckedChange={(checked: boolean | string) => {
                                                                        return checked
                                                                            ? field.onChange([...(field.value || []), badge.id])
                                                                            : field.onChange(field.value?.filter((value: string) => value !== badge.id))
                                                                    }}
                                                                    disabled={isPending}
                                                                />
                                                                <BadgeUI variant="outline">{badge.name}</BadgeUI>
                                                            </div>
                                                        </FormControl>
                                                    </FormItem>
                                                )} />
                                            ))}
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* INVENTORY TAB */}
                    <TabsContent value="inventory" className="space-y-6 mt-6">
                        <Card className="rounded-3xl border-none shadow-xl">
                            <CardHeader>
                                <CardTitle>Stock Management</CardTitle>
                                <CardDescription>Manage product availability and inventory</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <FormField control={form.control} name="stockQuantity" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>📦 Current Stock</FormLabel>
                                            <FormControl>
                                                <Input type="number" disabled={isPending} placeholder="100" {...field} value={field.value as number} onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 0)} />
                                            </FormControl>
                                            <FormDescription>Available quantity</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="lowStockAlert" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>⚠️ Low Stock Alert</FormLabel>
                                            <FormControl>
                                                <Input type="number" disabled={isPending} placeholder="5" {...field} value={field.value as number} onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.onChange(parseInt(e.target.value) || 5)} />
                                            </FormControl>
                                            <FormDescription>Notify when below</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />

                                    <FormField control={form.control} name="isInStock" render={({ field }) => (
                                        <FormItem className="flex flex-col justify-end">
                                            <FormLabel>Availability</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center space-x-2 h-10">
                                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                                                    <span className="text-sm">In Stock</span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                {/* SUBMIT BUTTONS */}
                <div className="flex items-center gap-4 pt-6 border-t">
                    <Button type="submit" disabled={isPending} size="lg">
                        <Save className="mr-2 h-4 w-4" />
                        {initialData ? "Update Product" : "Create Product"}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.push("/admin/products")} disabled={isPending}>
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                    </Button>
                    {isPending && <span className="text-sm text-muted-foreground">Saving...</span>}
                </div>
            </form >
        </Form >
    );
};
