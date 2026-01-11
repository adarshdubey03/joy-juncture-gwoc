
import dotenv from "dotenv";
dotenv.config();

// @ts-ignore
import { PrismaClient, UserRole } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is missing!");
    process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const db = new PrismaClient({ adapter });

async function main() {
    console.log("Seeding dummy order...");

    // 1. Find or create a user
    let user = await db.user.findFirst({
        where: { email: "dummy.customer@example.com" },
    });

    if (!user) {
        console.log("Creating dummy user...");
        user = await db.user.create({
            data: {
                email: "dummy.customer@example.com",
                name: "Dummy Customer",
                phoneNumber: "+1234567890",
                role: UserRole.USER,
                emailVerified: new Date(),
            },
        });
    }
    console.log(`User ID: ${user.id}`);

    // 2. Find or create a product
    let product = await db.product.findFirst({
        where: { slug: "dummy-product" },
    });

    if (!product) {
        console.log("Creating dummy product...");
        product = await db.product.create({
            data: {
                name: "Dummy Product",
                slug: "dummy-product",
                description: "This is a dummy product for testing.",
                actualPrice: 100.00,
                stockQuantity: 50,
                isInStock: true,
                metaTitle: "Dummy Product",
            },
        });
    }
    console.log(`Product ID: ${product.id}`);

    // 3. Create Order
    console.log("Creating order...");
    const order = await db.order.create({
        data: {
            userId: user.id,
            status: "PENDING",
            paymentStatus: "PENDING",
            paymentMethod: "COD",

            // Pricing
            subtotal: 100.00,
            discount: 0,
            taxAmount: 18.00,
            shippingCost: 50.00,
            totalAmount: 168.00,

            // Shipping Details
            shippingName: "Dummy Customer",
            shippingPhone: "+1234567890",
            shippingStreet: "123 Dummy St",
            shippingCity: "Tech City",
            shippingState: "Innovation State",
            shippingPostalCode: "10001",
            shippingCountry: "India",

            // Items
            items: {
                create: {
                    productId: product.id,
                    productName: product.name,
                    unitPrice: product.actualPrice,
                    quantity: 1,
                    subtotal: 100.00,
                },
            },

            // Metadata
            ipAddress: "127.0.0.1",
            userAgent: "Seed Script",
        },
        include: {
            items: true,
        },
    });

    console.log(`Order created successfully! Order ID: ${order.id}`);
    console.log(order);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });
