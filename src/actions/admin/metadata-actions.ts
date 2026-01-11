"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

// --- Tags ---

export async function getTags() {
    try {
        const tags = await db.tag.findMany({
            orderBy: { name: "asc" },
        });
        return { success: true, data: tags };
    } catch (error) {
        return { error: "Failed to fetch tags" };
    }
}

export async function createTag(name: string) {
    try {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const tag = await db.tag.create({
            data: { name, slug },
        });
        revalidatePath("/admin/products");
        return { success: true, data: tag };
    } catch (error) {
        return { error: "Failed to create tag" };
    }
}

// --- Occasions ---

export async function getOccasions() {
    try {
        const occasions = await db.occasion.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
        });
        return { success: true, data: occasions };
    } catch (error) {
        return { error: "Failed to fetch occasions" };
    }
}

// --- Moods ---

export async function getMoods() {
    try {
        const moods = await db.mood.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
        });
        return { success: true, data: moods };
    } catch (error) {
        return { error: "Failed to fetch moods" };
    }
}

// --- Badges ---

export async function getBadges() {
    try {
        const badges = await db.badge.findMany({
            where: { isActive: true },
            orderBy: { sortOrder: "asc" },
        });
        return { success: true, data: badges };
    } catch (error) {
        return { error: "Failed to fetch badges" };
    }
}

export async function createBadge(name: string) {
    try {
        const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const badge = await db.badge.create({
            data: { name, slug },
        });
        revalidatePath("/admin/products");
        return { success: true, data: badge };
    } catch (error) {
        return { error: "Failed to create badge" };
    }
}
