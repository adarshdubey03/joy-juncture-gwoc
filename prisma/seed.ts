
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
            image: "/products/dead-mans-deck.jpg",
            images: ["/products/dmd-1.jpg", "/products/dmd-2.jpg", "/products/dmd-3.jpg", "/products/dmd-4.jpg"],
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
            image: "/products/mehfil.png",
            images: ["/products/mehfil-1.jpeg", "/products/mehfil-3.png", "/products/mehfil2.jpeg"],
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
            image: "/products/tamasha.jpeg",
            images: ["/products/tamasha-1.png", "/products/tamasha-2.jpeg", "/products/tamasha-3.jpeg", "/products/tamasha-4.jpeg"],
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
            image: "/products/bloody-inheritance.jpeg",
            images: ["/products/TheBloodyInheritance.png"],
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
            image: "/products/court52.png",
            images: ["/products/court52-1.jpg", "/products/court52-2.jpg", "/products/court52-3.jpg", "/products/court52-4.jpg"],
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
            image: "/products/buzzed.jpeg",
            images: ["/products/buzzed-1.jpg", "/products/buzzed-2.jpg"],
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

    // Seed Blogs
    const blogs = [
        {
            slug: "murder-mystery-game-night",
            title: "Murder Mystery Game Night at Primarc Pecan HO, Mumbai",
            subtitle: "Bringing teams together through mystery and mayhem",
            excerpt: "When Primarc Pecan’s Head Office in Mumbai wanted to break the monotony of a regular workday and bring their teams together, they called Joy Juncture...",
            image: "/blogs/blog1.jpg",
            content: `
              <p class="lead">When Primarc Pecan’s Head Office in Mumbai wanted to break the monotony of a regular workday and bring their teams together, they called Joy Juncture for an intervention.</p>
              
              <p>The office, usually buzzing with the sound of keyboards and meetings, was about to be transformed into a crime scene. The mission? Solve a cold-blooded murder before the clock ran out.</p>

              <h3>The Setup</h3>
              <p>We arrived with our signature "Murder Mystery" kit—character cards, evidence files, and a few hidden clues planted around the workspace. The goal wasn't just to play a game; it was to force cross-department collaboration. People who rarely spoke to each other were suddenly interrogating one another, sharing theories, and piecing together alibis.</p>

              <h3>The Gameplay</h3>
              <p>Teams were divided, roles were assigned, and the suspicion was immediate. Was it the quiet accountant? The boisterous sales lead? Or the intern who seemed to know a little <em>too</em> much?</p>
              <ul>
                <li><strong>Phase 1: Discovery.</strong> Teams analyzed the initial police report and character bios.</li>
                <li><strong>Phase 2: Interrogation.</strong> Accusations flew as players questioned each other's motives.</li>
                <li><strong>Phase 3: The Reveal.</strong> A dramatic conclusion where the true killer was unmasked (to much shock and applause).</li>
              </ul>

              <blockquote>"I haven't laughed this hard with my colleagues in years. It was exactly what we needed." — Primarc Pecan Employee</blockquote>

              <h3>why it worked</h3>
              <p>Corporate events often feel forced. This didn't. By stepping into characters, employees dropped their professional guards and interacted as humans first, colleagues second. That's the power of play.</p>
            `,
        },
        {
            slug: "haus-of-joy-udaipur",
            title: "Haus of Joy: A play-trip to Udaipur",
            subtitle: "3 days, 30 strangers, and endless joy",
            excerpt: "Joy Juncture x Pickle Haus curated Haus of Joy; a 3-day play trip to Udaipur with 30 strangers, JJ original Jord games, pickleball tournaments, late-night dancing, and unforgettable bonding. Read...",
            image: "/blogs/UdaipurTrip.webp",
            content: `
              <p class="lead">Imagine 30 strangers. A sprawling villa in Udaipur. And a single rule: No work talk, just play.</p>

              <p>This was <strong>Haus of Joy</strong>, a curated play-trip in collaboration with Pickle Haus. The idea was radical yet simple—what happens when you take adults out of their routines and give them permission to be kids again?</p>

              <h3>Day 1: Breaking the Ice</h3>
              <p>The trip kicked off not with small talk, but with 'Dead Man's Deck'. Nothing bonds a group faster than bluffing, betraying, and laughing over card games. By dinner time, the "strangers" label was gone.</p>

              <h3>Day 2: Sweat and Strategy</h3>
              <p>The morning began with a high-energy Pickleball tournament. The competitive spirits were high, but the vibe was supportive. Post-lunch, we switched gears to 'Mehfil', our storytelling game. Sitting in a circle, people shared personal stories, fears, and dreams.</p>

              <h3>The Outcome</h3>
              <p>We left Udaipur with 30 new friends and a renewed belief in the magic of community. It proved that you don't need years to build a bond; sometimes, you just need three days of pure, unadulterated joy.</p>
            `,
        },
        {
            slug: "creative-ways-dmd",
            title: "Creative ways to play Dead Man’s Deck",
            subtitle: "Spicing up your game night",
            excerpt: "Explore exciting twists to Dead Man's Deck! From party modes to money pots, food dares, and new scoring twists, here are alternate ways to keep the game fresh, competitive, and...",
            image: "/blogs/DMD5.jpg",
            content: `
               <p>So, you've mastered the basic rules of Dead Man's Deck. You know when to bluff, when to fold, and how to spot a liar. But are you ready to take it to the next level?</p>
               
               <h3>1. The "High Stakes" Variant</h3>
               <p>Instead of points, play for chips. assigning a monetary value (or candy value!) to each card makes every decision feel heavier. The tension in the room will be palpable.</p>

               <h3>2. The Drinking Game (21+)</h3>
               <p>Simple rule change: Every time you falsely accuse someone and get caught, you take a sip. If you successfully catch a liar, <em>they</em> take a sip. Please play responsibly!</p>

               <h3>3. Speed Mode</h3>
               <p>Reduce the thinking time. Players have only 5 seconds to make a move. This leads to panic, mistakes, and absolute chaos—which is exactly where the fun lies.</p>
             `,
        },
        {
            slug: "power-cards-dmd",
            title: "Power Cards in Dead Man's Deck",
            subtitle: "Master the strategy",
            excerpt: "Learn the meaning and effects of each Power Card in Dead Man's Deck. Use this guide to play smarter confuse opponents, and lower your score strategically",
            image: "/blogs/DMD4.jpg",
            content: `
               <p>The difference between a novice and a pro in Dead Man's Deck often comes down to one thing: how they use their Power Cards.</p>

               <h3>The Peek</h3>
               <p><strong>Effect:</strong> Look at one of your own cards.</p>
               <p><strong>Strategy:</strong> Use this early! Knowing your own hand is half the battle. Don't waste it late in the game when you should already have a mental map of your deck.</p>

               <h3>The Swap</h3>
               <p><strong>Effect:</strong> Swap a card with an opponent without looking.</p>
               <p><strong>Strategy:</strong> Chaos agent. Even if you don't know what you're getting, the psychological impact of messing with an opponent's carefully memorized hand is worth it.</p>
               
               <h3>The Shield</h3>
               <p><strong>Effect:</strong> Block an action directed at you.</p>
               <p><strong>Strategy:</strong> Hoard this. The end-game is where the attacks come flying. Saving a Shield for the final round can be the difference between winning and losing.</p>
             `,
        },
        {
            slug: "gameplay-questions-dmd",
            title: "Gameplay questions answered Dead Man's Deck FAQS",
            subtitle: "Clearing up the confusion",
            excerpt: "Get answers to common gameplay doubts in Dead Man's Deck. Learn about discard rules, Power Card effects, game ending conditions, and scoring tie-breakers",
            image: "/blogs/DMD3.jpg",
            content: `
               <p>We've collected the most common questions from our community discord and play-tests. Here is the definitive FAQ.</p>

               <h3>Q: What happens if the deck runs out?</h3>
               <p><strong>A:</strong> Shuffle the discard pile to form a new draw deck. The game continues until a player hits the victory condition.</p>

               <h3>Q: Can I use a 'Swap' card on myself?</h3>
               <p><strong>A:</strong> No. Swaps must involve another player. You can't just limitlessly cycle your own cards; you have to interact with the table.</p>

               <h3>Q: Tie-breakers?</h3>
               <p><strong>A:</strong> If two players finish with the same score, the player with the fewest "Power Cards" used wins. Efficiency matters!</p>
             `,
        },
        {
            slug: "how-to-play-dmd",
            title: "How to play Dead Man's Deck?",
            subtitle: "A beginner's guide",
            excerpt: "Learn how to play Dead Man's Deck, a memory-based strategy card game by Joy Juncture. Understand the rules, setup, scoring, and special actions in this simple guide for first-time players",
            image: "/games/dead-mans-deck.jpg",
            content: `
               <p>Welcome to <strong>Dead Man's Deck</strong>. It's a game of memory, bluffing, and pirates. Here is how you get started.</p>

               <h3>The Objective</h3>
               <p>To have the lowest score at the end of the game. Number cards add to your score; special cards can help you lower it.</p>

               <h3>Setup</h3>
               <ol>
                 <li>Deal 4 cards face-down to each player.</li>
                 <li>Arrange them in a 2x2 grid in front of you.</li>
                 <li>Peek at the bottom two cards <strong>once</strong>. Memorize them.</li>
               </ol>

               <h3>The Turn</h3>
               <p>Draw a card. You can either swap it with one of your hidden cards or discard it to use its power. The choice is yours, but remember: once you place a card face-down, you can't look at it again unless a card tells you to.</p>
             `,
        }
    ];

    for (const blog of blogs) {
        await prisma.blog.upsert({
            where: { slug: blog.slug },
            update: blog,
            create: blog,
        })
    }

    console.log('Seeded Blogs!');

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
