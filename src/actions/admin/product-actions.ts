"use server";

import { db } from "@/lib/db";
import { PrismaClient } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import { ProductSchema } from "@/schemas";
import { z } from "zod";
import { auth } from "@/auth";

export async function getProducts() {
    try {
        const products = await db.product.findMany({
            orderBy: { dateAdded: "desc" },
            include: {
                categories: { include: { category: true } },
                badges: { include: { badge: true } },
                tags: { include: { tag: true } },
            }
        });

        const serializedProducts = products.map(product => ({
            ...product,
            actualPrice: product.actualPrice.toNumber(),
            discountedPrice: product.discountedPrice ? product.discountedPrice.toNumber() : null,
        }));

        return { success: true, data: serializedProducts };
    } catch (error) {
        console.error("GET_PRODUCTS_ERROR", error instanceof Error ? error.message : String(error));
        return { success: false, error: "Failed to fetch products" };
    }
}

export async function getProduct(id: string) {
    try {
        const product = await db.product.findUnique({
            where: { id },
            include: {
                categories: { include: { category: true } },
                badges: { include: { badge: true } },
                tags: { include: { tag: true } },
                occasions: { include: { occasion: true } },
                moods: { include: { mood: true } },
                relatedTo: true,
                gameplayInfo: true,
                storeInfo: true,
                images: { orderBy: { sortOrder: "asc" } },
                keyFeatures: { orderBy: { sortOrder: "asc" } },
                faqs: { orderBy: { sortOrder: "asc" } },
                inventoryLogs: {
                    orderBy: { createdAt: "desc" },
                    take: 20,
                    include: {
                        user: true
                    }
                }
            }
        });
        return { success: true, data: product };
    } catch (error) {
        return { success: false, error: "Failed to fetch product" };
    }
}

export async function createProduct(values: z.infer<typeof ProductSchema>) {
    const validatedFields = ProductSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const {
        categoryIds, badgeIds, tagIds, occasionIds, moodIds, relatedProductIds,
        images, gameplayInfo, storeInfo, keyFeatures, faqs,
        ...productData
    } = validatedFields.data;

    let slug = productData.slug;
    if (!slug) {
        slug = productData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    try {
        const product = await db.product.create({
            data: {
                ...productData,
                slug,
                // Relations (Many-to-Many - creating the join record)
                categories: categoryIds.length > 0 ? { create: categoryIds.map(id => ({ category: { connect: { id } } })) } : undefined,
                tags: tagIds.length > 0 ? { create: tagIds.map(id => ({ tag: { connect: { id } } })) } : undefined,
                occasions: occasionIds.length > 0 ? { create: occasionIds.map(id => ({ occasion: { connect: { id } } })) } : undefined,
                moods: moodIds.length > 0 ? { create: moodIds.map(id => ({ mood: { connect: { id } } })) } : undefined,
                badges: badgeIds.length > 0 ? { create: badgeIds.map(id => ({ badge: { connect: { id } } })) } : undefined,
                relatedTo: relatedProductIds.length > 0 ? { connect: relatedProductIds.map(id => ({ id })) } : undefined,

                // Nested Models (One-to-Many / One-to-One)
                images: images && images.length > 0 ? { createMany: { data: images } } : undefined,
                gameplayInfo: gameplayInfo ? { create: gameplayInfo } : undefined,
                storeInfo: storeInfo ? { create: storeInfo } : undefined,
                keyFeatures: keyFeatures && keyFeatures.length > 0 ? { createMany: { data: keyFeatures } } : undefined,
                faqs: faqs && faqs.length > 0 ? { createMany: { data: faqs } } : undefined,
            }
        });

        revalidatePath("/admin/products");
        return { success: "Product created!", data: product };
    } catch (error) {
        console.error("CREATE_PRODUCT_ERROR", error);
        return { error: "Something went wrong!" };
    }
}

export async function updateProduct(id: string, values: z.infer<typeof ProductSchema>) {
    const validatedFields = ProductSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const {
        categoryIds, badgeIds, tagIds, occasionIds, moodIds, relatedProductIds,
        images, gameplayInfo, storeInfo, keyFeatures, faqs,
        ...productData
    } = validatedFields.data;

    const session = await auth();

    try {
        await db.$transaction(async (tx) => {
            const currentProduct = await tx.product.findUnique({ where: { id } });

            // Inventory Log
            if (currentProduct && currentProduct.stockQuantity !== productData.stockQuantity) {
                const diff = productData.stockQuantity - currentProduct.stockQuantity;
                if (session?.user?.id) {
                    await tx.inventoryLog.create({
                        data: {
                            productId: id,
                            change: diff,
                            newStock: productData.stockQuantity,
                            reason: "Manual Adjustment",
                            userId: session.user.id,
                        }
                    });
                }
            }

            // Update Main Product
            await tx.product.update({
                where: { id },
                data: {
                    ...productData,

                    // Simple Relations (Re-set)
                    relatedTo: { set: relatedProductIds.map(id => ({ id })) },

                    // Join Tables (Delete all and recreate is safest for pure link tables)
                    // Strategies: 
                    // 1. deleteMany then createMany - simple
                    categories: { deleteMany: {}, create: categoryIds.map(id => ({ category: { connect: { id } } })) },
                    tags: { deleteMany: {}, create: tagIds.map(id => ({ tag: { connect: { id } } })) },
                    occasions: { deleteMany: {}, create: occasionIds.map(id => ({ occasion: { connect: { id } } })) },
                    moods: { deleteMany: {}, create: moodIds.map(id => ({ mood: { connect: { id } } })) },
                    badges: { deleteMany: {}, create: badgeIds.map(id => ({ badge: { connect: { id } } })) },

                    // Nested Models - Upsert
                    gameplayInfo: gameplayInfo ? {
                        upsert: {
                            create: gameplayInfo,
                            update: gameplayInfo,
                        }
                    } : undefined,

                    storeInfo: storeInfo ? {
                        upsert: {
                            create: storeInfo,
                            update: storeInfo,
                        }
                    } : undefined,
                }
            });

            // Handle Images (Replace logic: delete old, create new to respect sort order)
            // If we want to keep IDs constant, we'd need a more complex diff. 
            // For simple admin, replacing is acceptable but changes IDs.
            if (images) {
                await tx.productImage.deleteMany({ where: { productId: id } });
                if (images.length > 0) {
                    await tx.productImage.createMany({
                        data: images.map(img => ({ ...img, productId: id }))
                    });
                }
            }

            // Handle KeyFeatures (Replace)
            if (keyFeatures) {
                await tx.keyFeature.deleteMany({ where: { productId: id } });
                if (keyFeatures.length > 0) {
                    await tx.keyFeature.createMany({
                        data: keyFeatures.map(kf => ({ ...kf, productId: id }))
                    });
                }
            }

            // Handle FAQs (Replace)
            if (faqs) {
                await tx.productFAQ.deleteMany({ where: { productId: id } });
                if (faqs.length > 0) {
                    await tx.productFAQ.createMany({
                        data: faqs.map(faq => ({ ...faq, productId: id }))
                    });
                }
            }

        });

        revalidatePath("/admin/products");
        revalidatePath(`/admin/products/${id}`);
        return { success: "Product updated!" };
    } catch (error) {
        console.error("UPDATE_PRODUCT_ERROR", error);
        return { error: "Something went wrong!" };
    }
}
export async function deleteProduct(id: string) {
    try {
        await db.product.delete({ where: { id } });
        revalidatePath("/admin/products");
        return { success: "Product deleted!" };
    } catch (error) {
        return { error: "Failed to delete product" };
    }
}

export async function updateProductStatus(id: string, status: string) {
    try {
        await db.product.update({
            where: { id },
            data: { isActive: status === "ACTIVE" }
        });
        revalidatePath("/admin/products");
        return { success: "Status updated!" };
    } catch (error) {
        return { error: "Failed to update status" };
    }
}
