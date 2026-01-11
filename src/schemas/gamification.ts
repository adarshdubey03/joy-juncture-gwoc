import * as z from "zod";

// ==========================
// CONTENT
// ==========================
export const ContentStatusEnum = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export const EnquiryStatusEnum = z.enum([
    "NEW", "CONTACTED", "IN_PROGRESS", "QUOTE_SENT", "CONFIRMED", "COMPLETED", "DECLINED", "CLOSED"
]);

export const ContentSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    body: z.string().min(1),
    excerpt: z.string().optional(),
    status: ContentStatusEnum.default("DRAFT"),
    featuredImage: z.string().url().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),

    categoryIds: z.array(z.string()).optional(),
    tagIds: z.array(z.string()).optional(),
});

export const CorporateEnquirySchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    company: z.string().optional(),
    eventType: z.string().min(1),
    message: z.string().min(1),
    estimatedGuests: z.coerce.number().int().optional(),
    preferredDate: z.coerce.date().optional(),
    budget: z.coerce.number().optional(),
});

// ==========================
// GAMIFICATION (PUZZLES)
// ==========================
export const PuzzleTypeEnum = z.enum(["SUDOKU", "RIDDLE", "PUZZLE", "BRAIN_TEASER"]);
// DifficultyEnum imported if needed, but defining strict union here is fine or reuse
export const PuzzleDifficultyEnum = z.enum(["EASY", "MEDIUM", "HARD", "EXPERT"]);

export const PuzzleSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    type: PuzzleTypeEnum,
    difficulty: PuzzleDifficultyEnum.optional(),
    prompt: z.string().min(1),
    answer: z.string().min(1),
    hints: z.array(z.string()).optional(),
    pointReward: z.coerce.number().min(0),
    isActive: z.boolean().default(true),
    publishedAt: z.coerce.date().optional(),
    expiresAt: z.coerce.date().optional(),
});

export const PuzzleAttemptSchema = z.object({
    puzzleId: z.string(),
    answer: z.string().min(1),
});
