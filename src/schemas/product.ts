import * as z from "zod";

// Enums
export const DifficultyEnum = z.enum(["EASY", "MEDIUM", "HARD", "EXPERT"]);

// ==========================
// COMPONENT SCHEMAS
// ==========================

export const ProductImageSchema = z.object({
    url: z.string().url("Invalid image URL"),
    altText: z.string().optional(),
    caption: z.string().optional(),
    sortOrder: z.coerce.number().int().default(0),
    isPrimary: z.boolean().default(false),
});

export const GameplayInfoSchema = z.object({
    minPlayers: z.coerce.number().int().min(1),
    maxPlayers: z.coerce.number().int().min(1),
    idealPlayers: z.string().optional(),
    avgPlayTime: z.coerce.number().int().min(1),
    minPlayTime: z.coerce.number().int().optional(),
    maxPlayTime: z.coerce.number().int().optional(),
    minAge: z.coerce.number().int().min(0),
    maxAge: z.coerce.number().int().optional(),
    difficulty: DifficultyEnum.optional(),
    setupTime: z.coerce.number().int().optional(),
    learningCurve: z.string().optional(),
});

export const StoreInfoSchema = z.object({
    weight: z.coerce.number().optional(),
    dimensions: z.string().optional(),
    boxContents: z.string().optional(),
    isShippable: z.boolean().default(true),
    shippingClass: z.string().optional(),
    hsnCode: z.string().optional(),
    gstRate: z.coerce.number().optional(),
    manufacturer: z.string().optional(),
    countryOfOrigin: z.string().optional(),
    warrantyInfo: z.string().optional(),
    returnPolicy: z.string().optional(),
    barcode: z.string().optional(),
    supplier: z.string().optional(),
    reorderLevel: z.coerce.number().int().optional(),
});

export const KeyFeatureSchema = z.object({
    title: z.string().min(1),
    description: z.string().optional(),
    icon: z.string().optional(),
    sortOrder: z.coerce.number().int().default(0),
});

export const ProductFAQSchema = z.object({
    question: z.string().min(1),
    answer: z.string().min(1),
    sortOrder: z.coerce.number().int().default(0),
    isActive: z.boolean().default(true),
});

// ==========================
// PRODUCT SCHEMA
// ==========================

export const ProductSchema = z.object({
    // Basic
    name: z.string().min(1, "Name is required"),
    slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric").optional(),
    sku: z.string().optional(),

    // Pricing
    actualPrice: z.coerce.number().min(0),
    discountedPrice: z.coerce.number().min(0).optional(),
    discountPercent: z.coerce.number().int().min(0).max(100).optional(),

    // Content
    description: z.string().min(1, "Description is required"),
    shortDescription: z.string().optional(),

    // Inventory
    isInStock: z.boolean().default(true),
    stockQuantity: z.coerce.number().int().min(0),
    lowStockAlert: z.coerce.number().int().min(0).default(5),

    // Media
    howToPlayVideo: z.string().url().optional().or(z.literal("")),
    images: z.array(ProductImageSchema).optional(),

    // Nested Relations (Input)
    gameplayInfo: GameplayInfoSchema.optional(),
    storeInfo: StoreInfoSchema.optional(),
    keyFeatures: z.array(KeyFeatureSchema).optional(),
    faqs: z.array(ProductFAQSchema).optional(),

    // Relation IDs (Taxonomy)
    categoryIds: z.array(z.string()).default([]),
    tagIds: z.array(z.string()).default([]),
    occasionIds: z.array(z.string()).default([]),
    moodIds: z.array(z.string()).default([]),
    badgeIds: z.array(z.string()).default([]),
    relatedProductIds: z.array(z.string()).default([]),

    // SEO
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),

    // Status
    isActive: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
    isNewArrival: z.boolean().default(false),
    isBestSeller: z.boolean().default(false),
});

// ==========================
// REVIEWS
// ==========================

export const ProductReviewSchema = z.object({
    rating: z.coerce.number().int().min(1).max(5),
    title: z.string().optional(),
    comment: z.string().min(1, "Comment is required"),
    guestName: z.string().optional(),
    guestEmail: z.string().email().optional(),
    images: z.array(z.string().url()).optional(),
});
