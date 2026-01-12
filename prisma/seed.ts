
import { PrismaClient, Difficulty, ContentStatus, UserRole } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'
import 'dotenv/config'

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log("Starting seed...");

    // 1. Ensure a Default Admin/Author User Exists
    const adminUser = await prisma.user.upsert({
        where: { email: "admin@joyjuncture.com" },
        update: {},
        create: {
            email: "admin@joyjuncture.com",
            name: "Joy Juncture Admin",
            role: "ADMIN",
            password: "hashed_password_placeholder", // ideally hash this if using real auth
        }
    });
    console.log("Admin user secured:", adminUser.id);

    // 2. Seed Reference Data (Categories, Moods, etc.)
    // We'll create helpers to make this cleaner

    const products = [
        {
            slug: "dead-mans-deck",
            name: "Dead Man’s Deck",
            description: "A tense bluffing card game where every move could be your last. Dead Man’s Deck is a fast-paced bluffing game where players take risks, read the table, and decide when to push their luck. One wrong move can cost you the round — or the entire game.",
            // Gameplay Info derived
            minPlayers: 3,
            maxPlayers: 6,
            minPlayTime: 20,
            maxPlayTime: 30,
            avgPlayTime: 25,
            minAge: 14,
            difficulty: "MEDIUM" as Difficulty,
            // Relations
            mood: "Strategic",
            category: "Card Game",
            occasions: ["Friends", "Game Night"],
            badges: ["First-time friendly", "Best for groups"],
            images: ["/products/dmd-1.jpg", "/products/dmd-2.jpg", "/products/dmd-3.jpg", "/products/dmd-4.jpg"],
            price: 399,
            howToPlayVideo: "https://example.com/dmd-tutorial",
            keyFeatures: [
                { title: "Bluffing Mechanics", description: "Test your poker face." },
                { title: "High Stakes", description: "Winner takes all." }
            ]
        },
        {
            slug: "mehfil",
            name: "Mehfil",
            description: "A conversational game inspired by gatherings, stories, and shared moments. Mehfil isn't just a game; it's an excuse to share stories you've never told before.",
            minPlayers: 4,
            maxPlayers: 8,
            minPlayTime: 30,
            maxPlayTime: 45,
            avgPlayTime: 40,
            minAge: 12,
            difficulty: "EASY" as Difficulty,
            mood: "Cozy",
            category: "Party",
            occasions: ["Family", "Friends"],
            badges: ["Conversation Starter", "Family Friendly"],
            images: ["/products/mehfil-1.jpeg", "/products/mehfil-3.png", "/products/mehfil2.jpeg"],
            price: 399,
            keyFeatures: [
                { title: "Storytelling", description: "Share personal stories." },
                { title: "Bonding", description: "Deepen relationships." }
            ]
        },
        {
            slug: "tamasha",
            name: "Tamasha",
            description: "Fast, loud, and unpredictable — a party game that thrives on chaos. Tamasha brings the chaos of the streets to your living room.",
            minPlayers: 5,
            maxPlayers: 12,
            minPlayTime: 20,
            maxPlayTime: 20,
            avgPlayTime: 20,
            minAge: 16,
            difficulty: "EASY" as Difficulty,
            mood: "Chaotic",
            category: "Party",
            occasions: ["Friends"],
            badges: ["High Energy", "Loud"],
            images: ["/products/tamasha-1.png", "/products/tamasha-2.jpeg", "/products/tamasha-3.jpeg"],
            price: 399,
            keyFeatures: [
                { title: "Chaos", description: "Unpredictable fun." }
            ]
        },
        {
            slug: "the-bloody-inheritance",
            name: "The Bloody Inheritance",
            description: "A narrative-driven murder mystery best played over an evening. A wealthy tycoon has been murdered, and the killer is one of you.",
            minPlayers: 6,
            maxPlayers: 10,
            minPlayTime: 120,
            maxPlayTime: 180,
            avgPlayTime: 150,
            minAge: 16,
            difficulty: "HARD" as Difficulty,
            mood: "Strategic",
            category: "Mystery",
            occasions: ["Game Night"],
            badges: ["Immersive", "Roleplay"],
            images: ["/products/TheBloodyInheritance.png"],
            price: 999,
            keyFeatures: [
                { title: "Immersive Story", description: "Live the mystery." }
            ]
        },
        {
            slug: "court52",
            name: "Court52",
            description: "A pickleball-inspired card game blending strategy and sport. Serve, volley, and smash your way to victory.",
            minPlayers: 2,
            maxPlayers: 4,
            minPlayTime: 15,
            maxPlayTime: 20,
            avgPlayTime: 18,
            minAge: 8,
            difficulty: "MEDIUM" as Difficulty,
            mood: "Light",
            category: "Card",
            occasions: ["Friends"],
            badges: ["Sports Fan", "Travel Friendly"],
            images: ["/products/court52-1.jpg", "/products/court52-2.jpg"],
            price: 399,
            keyFeatures: [
                { title: "Sporty", description: "Pickleball mechanics." }
            ]
        },
        {
            slug: "buzzed",
            name: "Buzzed",
            description: "A light-hearted drinking game built for laughs and late nights. The ultimate icebreaker for your next house party.",
            minPlayers: 4,
            maxPlayers: 20,
            minPlayTime: 30,
            maxPlayTime: 60,
            avgPlayTime: 45,
            minAge: 21,
            difficulty: "EASY" as Difficulty,
            mood: "Chaotic",
            category: "Party",
            occasions: ["Friends"],
            badges: ["Adults Only", "Drinking Game"],
            images: ["/products/buzzed-1.jpg", "/products/buzzed-2.jpg"],
            price: 299,
            keyFeatures: [
                { title: "Drinking Game", description: "Responsibly, of course." }
            ]
        }
    ];

    console.log(`Seeding ${products.length} products...`);

    for (const p of products) {
        // Prepare Relations

        // 1. Category
        const category = await prisma.category.upsert({
            where: { slug: p.category.toLowerCase().replace(/\s+/g, '-') },
            update: {},
            create: { name: p.category, slug: p.category.toLowerCase().replace(/\s+/g, '-') }
        });

        // 2. Mood
        const mood = await prisma.mood.upsert({
            where: { slug: p.mood.toLowerCase().replace(/\s+/g, '-') },
            update: {},
            create: { name: p.mood, slug: p.mood.toLowerCase().replace(/\s+/g, '-') }
        });

        // 3. Occasions
        const occasionIds = [];
        for (const occName of p.occasions) {
            const occ = await prisma.occasion.upsert({
                where: { slug: occName.toLowerCase().replace(/\s+/g, '-') },
                update: {},
                create: { name: occName, slug: occName.toLowerCase().replace(/\s+/g, '-') }
            });
            occasionIds.push(occ.id);
        }

        // 4. Badges
        const badgeIds = [];
        for (const badgeName of p.badges) {
            const badge = await prisma.badge.upsert({
                where: { slug: badgeName.toLowerCase().replace(/\s+/g, '-') },
                update: {},
                create: { name: badgeName, slug: badgeName.toLowerCase().replace(/\s+/g, '-') }
            });
            badgeIds.push(badge.id);
        }

        // Create Product
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: {
                name: p.name,
                description: p.description,
                actualPrice: p.price,
                // Update relations would be complex, primarily focusing on creation structure
            },
            create: {
                slug: p.slug,
                name: p.name,
                description: p.description,
                actualPrice: p.price,
                gameplayInfo: {
                    create: {
                        minPlayers: p.minPlayers,
                        maxPlayers: p.maxPlayers,
                        minPlayTime: p.minPlayTime,
                        maxPlayTime: p.maxPlayTime,
                        avgPlayTime: p.avgPlayTime,
                        minAge: p.minAge,
                        difficulty: p.difficulty,
                    }
                },
                images: {
                    create: p.images.map((url, idx) => ({
                        url,
                        isPrimary: idx === 0,
                        sortOrder: idx
                    }))
                },
                keyFeatures: {
                    create: p.keyFeatures
                },
                // Link Categories (Junction)
                categories: {
                    create: {
                        categoryId: category.id
                    }
                },
                // Link Moods
                moods: {
                    create: {
                        moodId: mood.id
                    }
                },
                // Link Occasions
                occasions: {
                    create: occasionIds.map(oId => ({ occasionId: oId }))
                },
                // Link Badges
                badges: {
                    create: badgeIds.map(bId => ({ badgeId: bId }))
                }
            }
        });
        console.log(`Upserted product: ${product.name}`);
    }


    // Seed Content (Replacing Blog)
    const contentItems = [
        {
            slug: "murder-mystery-game-night",
            title: "Murder Mystery Game Night",
            excerpt: "When Primarc Pecan’s Head Office in Mumbai wanted to break the monotony of a regular workday, they called Joy Juncture...",
            image: "/blogs/blog1.jpg",
            content: "<p>Full blog content html...</p>" // truncated for brevity but valid string
        },
        {
            slug: "haus-of-joy-udaipur",
            title: "Haus of Joy: A play-trip to Udaipur",
            excerpt: "Joy Juncture x Pickle Haus curated Haus of Joy; a 3-day play trip to Udaipur...",
            image: "/blogs/UdaipurTrip.webp",
            content: "<p>Trip details...</p>"
        }
    ];

    console.log("Seeding Content...");
    for (const item of contentItems) {
        await prisma.content.upsert({
            where: { slug: item.slug },
            update: {
                title: item.title,
                featuredImage: item.image,
            },
            create: {
                slug: item.slug,
                title: item.title,
                excerpt: item.excerpt,
                body: item.content,
                featuredImage: item.image,
                status: ContentStatus.PUBLISHED,
                publishedAt: new Date(),
                authorId: adminUser.id,
            }
        });
    }
    console.log("Seeded Content!");

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
