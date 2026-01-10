import * as z from "zod";

// Shared Enums (replicated from Prisma for validation)
// If you have a shared enums file, import from there. Otherwise define here.

// ==========================
// CATEGORY
// ==========================
export const CategorySchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    parentId: z.string().optional(),
    isActive: z.boolean().default(true),
    sortOrder: z.coerce.number().int().default(0),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
});

// ==========================
// TAG
// ==========================
export const TagSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
});

// ==========================
// BADGE
// ==========================
export const BadgeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
    isActive: z.boolean().default(true),
    sortOrder: z.coerce.number().int().default(0),
});

// ==========================
// OCCASION
// ==========================
export const OccasionSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    isActive: z.boolean().default(true),
    sortOrder: z.coerce.number().int().default(0),
});

// ==========================
// MOOD
// ==========================
export const MoodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required"),
    description: z.string().optional(),
    icon: z.string().optional(),
    color: z.string().optional(),
    isActive: z.boolean().default(true),
    sortOrder: z.coerce.number().int().default(0),
});
