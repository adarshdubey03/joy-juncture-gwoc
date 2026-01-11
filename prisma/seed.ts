
import 'dotenv/config'
import { db as prisma } from '../src/lib/db'

async function main() {

    const products = [
        {
            slug: "dead-mans-deck",
            name: "Dead Man’s Deck",
            description: "A tense bluffing card game where every move could be your last.",
            players: "3–6 players",
            duration: "20–30 minutes",
            difficulty: "Medium",
            mood: "Strategic",
            category: "Card Game",
            occasion: ["Friends", "Game Night"],
            badges: ["First-time friendly", "Best for groups"],
            image: "/games/dead-mans-deck.jpg",
            images: ["/games/dead-mans-deck.jpg", "/games/dead-mans-deck.jpg", "/games/dead-mans-deck.jpg"],
            price: 399,
            story: "Dead Man’s Deck is a fast-paced bluffing game where players take risks, read the table, and decide when to push their luck. One wrong move can cost you the round — or the entire game.",
            howToPlay: [
                "Each player is dealt a hand of cards.",
                "On your turn, play a card face-down and declare its value.",
                "Other players may challenge your claim.",
                "If you are caught bluffing, you lose the round."
            ],
            whatYoullLove: [
                "Game nights with friends",
                "Quick competitive sessions",
                "Players who enjoy mind games"
            ]
        },
        {
            slug: "mehfil",
            name: "Mehfil",
            description: "A conversational game inspired by gatherings, stories, and shared moments.",
            players: "4–8 players",
            duration: "30–45 minutes",
            difficulty: "Easy",
            mood: "Cozy",
            category: "Party",
            occasion: ["Family", "Friends"],
            badges: ["Conversation Starter", "Family Friendly"],
            image: "/games/mehfil.jpg",
            images: ["/games/mehfil.jpg", "/games/mehfil.jpg", "/games/mehfil.jpg"],
            price: 399,
            story: "Mehfil isn't just a game; it's an excuse to share stories you've never told before. From childhood memories to hypothetical scenarios, it brings everyone closer.",
            howToPlay: [
                "Draw a card and read the prompt.",
                "Share your story or answer the question.",
                "Others can ask follow-up questions or share related stories.",
                "Enjoy the conversation!"
            ],
            whatYoullLove: [
                "Deep conversations",
                "Learning new things about friends",
                "Relaxed atmosphere"
            ]
        },
        {
            slug: "tamasha",
            name: "Tamasha",
            description: "Fast, loud, and unpredictable — a party game that thrives on chaos.",
            players: "5+ players",
            duration: "20 minutes",
            difficulty: "Easy",
            mood: "Chaotic",
            category: "Party",
            occasion: ["Friends"],
            badges: ["High Energy", "Loud"],
            image: "/games/tamasha.jpg",
            images: ["/games/tamasha.jpg", "/games/tamasha.jpg", "/games/tamasha.jpg"],
            price: 399,
            story: "Tamasha brings the chaos of the streets to your living room. It's loud, fast, and completely unfair — just like life.",
            howToPlay: [
                "Draw a challenge card.",
                "Perform the action before time runs out.",
                "Sabotage others if you can.",
                "Last one standing wins."
            ],
            whatYoullLove: [
                "High energy groups",
                "Breaking the ice",
                "Laughing until it hurts"
            ]
        },
        {
            slug: "the-bloody-inheritance",
            name: "The Bloody Inheritance",
            description: "A narrative-driven murder mystery best played over an evening.",
            players: "6–10 players",
            duration: "2–3 hours",
            difficulty: "Hard",
            mood: "Strategic",
            category: "Mystery",
            occasion: ["Game Night"],
            badges: ["Immersive", "Roleplay"],
            image: "/games/bloody-inheritance.jpg",
            images: ["/games/bloody-inheritance.jpg", "/games/bloody-inheritance.jpg", "/games/bloody-inheritance.jpg"],
            price: 999,
            story: "A wealthy tycoon has been murdered, and the killer is one of you. Can you solve the mystery before the night ends, or will the killer strike again?",
            howToPlay: [
                "Assign characters to each player.",
                "Read your character background and secrets.",
                "Investigate clues and question others.",
                "Vote on who you think the killer is."
            ],
            whatYoullLove: [
                "Acting and roleplay",
                "Solving complex puzzles",
                "Thematic evenings"
            ]
        },
        {
            slug: "court52",
            name: "Court52",
            description: "A pickleball-inspired card game blending strategy and sport.",
            players: "2–4 players",
            duration: "15–20 minutes",
            difficulty: "Medium",
            mood: "Light",
            category: "Card",
            occasion: ["Friends"],
            badges: ["Sports Fan", "Travel Friendly"],
            image: "/games/court52.jpg",
            images: ["/games/court52.jpg", "/games/court52.jpg", "/games/court52.jpg"],
            price: 399,
            story: "Court52 brings the strategy of the court to the card table. Serve, volley, and smash your way to victory.",
            howToPlay: [
                "Deal cards to simulate a rally.",
                "Play higher value cards to win the point.",
                "Use special action cards to turn the tide.",
                "First to 11 points wins."
            ],
            whatYoullLove: [
                "Quick matches",
                "Strategic depth",
                "Pickleball fans"
            ]
        },
        {
            slug: "buzzed",
            name: "Buzzed",
            description: "A light-hearted drinking game built for laughs and late nights.",
            players: "4+ players",
            duration: "Unlimited",
            difficulty: "Easy",
            mood: "Chaotic",
            category: "Party",
            occasion: ["Friends"],
            badges: ["Adults Only", "Drinking Game"],
            image: "/games/buzzed.jpg",
            images: ["/games/buzzed.jpg", "/games/buzzed.jpg", "/games/buzzed.jpg"],
            price: 299,
            story: "The ultimate icebreaker for your next house party. Simple rules, hilarious prompts, and guaranteed fun.",
            howToPlay: [
                "Draw a card.",
                "Read the rule.",
                "Drink if it applies to you (or if you lose).",
                "Repeat until happy."
            ],
            whatYoullLove: [
                "Parties",
                "Getting to know people",
                "Simple fun"
            ]
        },
    ]

    for (const product of products) {
        await prisma.product.upsert({
            where: { slug: product.slug },
            update: product,
            create: product,
        })
    }

    console.log('Seeded rich product data!')
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
