import * as z from "zod";

// Enums
export const OrderStatusEnum = z.enum([
    "PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "REFUNDED"
]);

export const PaymentStatusEnum = z.enum([
    "PENDING", "PAID", "FAILED", "REFUNDED", "PARTIAL_REFUND"
]);

export const ShippingMethodEnum = z.enum(["STANDARD", "EXPRESS", "SAME_DAY"]);
export const PaymentMethodEnum = z.enum(["UPI", "CARD", "NET_BANKING", "WALLET", "COD"]);
export const CouponTypeEnum = z.enum(["PERCENTAGE", "FIXED_AMOUNT"]);

// ==========================
// SHIPPING
// ==========================
export const ShippingRateSchema = z.object({
    method: ShippingMethodEnum,
    minWeight: z.coerce.number().optional(),
    maxWeight: z.coerce.number().optional(),
    basePrice: z.coerce.number().min(0),
    perKgPrice: z.coerce.number().min(0).default(0),
    estimatedDays: z.coerce.number().int().min(1),
    isActive: z.boolean().default(true),
});

// ==========================
// CART & WISHLIST
// ==========================
export const CartItemSchema = z.object({
    productId: z.string(),
    quantity: z.coerce.number().int().min(1),
});

export const WishlistItemSchema = z.object({
    productId: z.string(),
});

// ==========================
// ORDER
// ==========================
export const OrderItemSchema = z.object({
    productId: z.string(),
    quantity: z.coerce.number().int().min(1),
    // Snapshots handled by server usually
});

export const OrderSchema = z.object({
    userId: z.string(),
    status: OrderStatusEnum.default("PENDING"),

    // Addresses
    shippingName: z.string().min(1),
    shippingPhone: z.string().min(1),
    shippingStreet: z.string().min(1),
    shippingCity: z.string().min(1),
    shippingState: z.string().min(1),
    shippingPostalCode: z.string().min(1),
    shippingCountry: z.string().default("India"),

    paymentMethod: PaymentMethodEnum.optional(),

    items: z.array(OrderItemSchema).min(1),
    couponCode: z.string().optional(),
});

// ==========================
// COUPON
// ==========================
export const CouponSchema = z.object({
    code: z.string().min(3).regex(/^[A-Z0-9_-]+$/, "Code must be uppercase alphanumeric"),
    type: CouponTypeEnum,
    amount: z.coerce.number().min(0),
    maxDiscount: z.coerce.number().optional(),
    minPurchase: z.coerce.number().optional(),
    maxUses: z.coerce.number().int().optional(),
    maxUsesPerUser: z.coerce.number().int().optional(),
    firstOrderOnly: z.boolean().default(false),
    startsAt: z.coerce.date().optional(),
    expiresAt: z.coerce.date().optional(),
    isActive: z.boolean().default(true),

    // Relations Input
    productIds: z.array(z.string()).optional(),
    categoryIds: z.array(z.string()).optional(),
});

// ==========================
// REFUND & INVENTORY
// ==========================
export const RefundRequestSchema = z.object({
    orderId: z.string(),
    amount: z.coerce.number().min(0),
    reason: z.string().min(5),
});

export const InventoryHoldSchema = z.object({
    productId: z.string(),
    quantity: z.coerce.number().int().min(1),
    expiresAt: z.coerce.date(),
});

export const InventoryLogSchema = z.object({
    productId: z.string(),
    change: z.coerce.number().int(),
    newStock: z.coerce.number().int(),
    reason: z.string().min(1),
    notes: z.string().optional(),
});

// ==========================
// AUDIT
// ==========================
export const OrderStatusChangeSchema = z.object({
    toStatus: OrderStatusEnum,
    reason: z.string().optional(),
    notes: z.string().optional(),
});
