"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getCategories() {
    try {
        const categories = await db.category.findMany({
            orderBy: { name: "asc" },
        });
        return { success: true, data: categories };
    } catch (error) {
        return { success: false, error: "Failed to fetch categories" };
    }
}

export async function createCategory(name: string) {
    if (!name) return { error: "Name is required" };

    try {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const category = await db.category.create({
            data: { name, slug },
        });
        revalidatePath("/admin/products");
        return { success: true, data: category };
    } catch (error) {
        return { error: "Failed to create category" };
    }
}

export async function deleteCategory(id: string) {
    try {
        await db.category.delete({ where: { id } });
        revalidatePath("/admin/products");
        return { success: true };
    } catch (error) {
        return { error: "Failed to delete category" };
    }
}
