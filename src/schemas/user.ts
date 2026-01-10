import * as z from "zod";

export const UserRoleEnum = z.enum(["USER", "ADMIN", "SUPER_ADMIN", "CONTENT_MANAGER", "INVENTORY_MANAGER"]);

export const UserSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(), // Often read-only
    image: z.string().url().optional(),
    phoneNumber: z.string().optional(),
    role: UserRoleEnum.default("USER"),
    // Password usually handled separately
});

export const WalletSchema = z.object({
    balance: z.coerce.number().min(0),
});

export const PointTransactionReasonEnum = z.enum([
    "PRODUCT_PURCHASE",
    "EVENT_ATTENDANCE",
    "PUZZLE_COMPLETION",
    "ADMIN_ADJUSTMENT",
    "REDEMPTION",
    "REFUND",
    "BONUS",
]);

export const PointTransactionSchema = z.object({
    amount: z.coerce.number(), // Can be negative for redemptions
    reason: PointTransactionReasonEnum,
    description: z.string().optional(),
});
