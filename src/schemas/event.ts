import * as z from "zod";

export const EventTypeEnum = z.enum(["GAME_NIGHT", "WORKSHOP", "CORPORATE", "SPECIAL_EVENT", "OTHER"]);

export const EventSchema = z.object({
    title: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    type: EventTypeEnum,

    startTime: z.coerce.date(),
    endTime: z.coerce.date().optional(),
    location: z.string().optional(),
    venue: z.string().optional(),

    capacity: z.coerce.number().int().min(1).optional(),
    pointReward: z.coerce.number().min(0).optional(),

    ticketPrice: z.coerce.number().min(0).optional(),
    earlyBirdPrice: z.coerce.number().min(0).optional(),
    earlyBirdExpiry: z.coerce.date().optional(),

    image: z.string().url().optional(),
    bannerImage: z.string().url().optional(),
    galleryImages: z.array(z.string().url()).optional(),

    isActive: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
    isCancelled: z.boolean().default(false),
});

export const EventRegistrationSchema = z.object({
    eventId: z.string(),
    userId: z.string(),
    ticketPrice: z.coerce.number().optional(),
    paymentId: z.string().optional(),
});
