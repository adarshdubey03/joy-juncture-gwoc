export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  badges?: string[];
  description: string;
  images: string[];
  rating: number;
  reviews: number;
  features: string[];
  story: string;
  howToPlay: string[];
  whatYoullLove?: string[];
  occasion?: string[];
  included?: string[];
  specifications?: Record<string, string>;
};

export const products: Product[] = [
  {
    id: "1",
    name: "Dead Man's Deck",
    slug: "dead-mans-deck",
    price: 399,
    originalPrice: 799,
    category: "Card Game",
    image: "/products/dead-mans-deck.jpg",
    badges: ["Bestseller", "Sale"],
    description:
      "A high-stakes bluffing card game where you bet, bluff, and try not to end up six feet under. Perfect for loud, chaotic game nights.",
    images: ["/products/dead-mans-deck.jpg", "/products/dead-mans-deck.jpg", "/products/dead-mans-deck.jpg"],
    rating: 4.8,
    reviews: 124,
    features: ["2-6 Players", "30-45 Mins", "Ages 14+"],
    story:
      "Legend has it this cursed deck was found on a ghost ship drifting in the middle of nowhere. Every hand you play pulls you deeper into a web of bluffing, betrayal, and last-minute turnarounds. Will you trust your instincts, or will you fold? The stakes are high, and one wrong move could leave you with nothing. But play your cards right, and you might just walk away with everything.",
    howToPlay: [
      "Deal 5 cards to each player and place the coin pile in the center.",
      "On your turn, either place a card face-down and declare its value or challenge the previous player.",
      "Bluff, bet, and outsmart your opponents — if you get caught lying, you pay the price.",
      "The last player standing with coins wins the round. Best of three rounds takes it all!",
    ],
    whatYoullLove: [
      "Heart-pounding moments when you call someone's bluff",
      "The chaos and laughter when everyone's trying to read each other",
      "Quick rounds that keep the energy high",
      "Perfect balance of strategy and luck",
    ],
    occasion: ["Game Night", "Party", "Date Night", "Birthday"],
    included: [
      "52 uniquely designed cards",
      "60 gold coins for betting",
      "Rulebook with variants",
      "Premium storage box",
    ],
    specifications: {
      "Players": "2-6",
      "Play Time": "30-45 minutes",
      "Age": "14+",
      "Difficulty": "Easy to Learn",
      "Components": "112 pieces",
    },
  },
  {
    id: "2",
    name: "Mehfil – The Ultimate Musical Card Game",
    slug: "mehfil",
    price: 399,
    originalPrice: 799,
    category: "Party Game",
    image: "/products/mehfil.png",
    badges: ["New", "Sale"],
    description:
      "A Bollywood and music-themed party game that turns every gathering into a full-on mehfil with singing, guessing, and friendly roasting.",
    images: ["/products/mehfil.png", "/products/mehfil.png", "/products/mehfil.png"],
    rating: 4.7,
    reviews: 89,
    features: ["3-8 Players", "20-40 Mins", "Ages 12+"],
    story:
      "Born from hostel jam sessions and late-night antakshari battles, Mehfil captures the chaos of desi music nights in one tiny box. Remember those nights when someone's terrible singing became legendary? When 'Dilwale Dulhania Le Jayenge' played for the hundredth time and everyone still sang along? This is that energy, bottled up and ready to explode.",
    howToPlay: [
      "Draw a prompt card and read it out loud — it might ask for a song, a lyric, or a quick performance.",
      "Race against the timer to sing, guess, or act out the clue.",
      "Earn points for speed, creativity, and crowd reactions. No cheating — the mehfil decides!",
      "The player with the most points at the end wins, but honestly, everyone's a winner when the vibes are this good.",
    ],
    whatYoullLove: [
      "Relive your favorite Bollywood memories",
      "Perfect ice-breaker for any gathering",
      "Works even if you 'can't sing' (especially then!)",
      "Gets everyone involved and laughing",
    ],
    occasion: ["Party", "Family Gathering", "Wedding", "Birthday"],
    included: [
      "200+ prompt cards",
      "Timer included",
      "Score sheets",
      "Rulebook with variants",
    ],
    specifications: {
      "Players": "3-8",
      "Play Time": "20-40 minutes",
      "Age": "12+",
      "Difficulty": "Super Easy",
      "Components": "220+ pieces",
    },
  },
  {
    id: "3",
    name: "Tamasha – The Bollywood Bid Card Game",
    slug: "tamasha",
    price: 399,
    originalPrice: 799,
    category: "Strategy",
    image: "/products/tamasha.jpeg",
    badges: ["Sale"],
    description:
      "A dramatic bidding and bluffing game where you build the most masaledaar Bollywood blockbuster.",
    images: ["/products/tamasha.jpeg", "/products/tamasha.jpeg", "/products/tamasha.jpeg"],
    rating: 4.6,
    reviews: 72,
    features: ["3-6 Players", "30-60 Mins", "Ages 13+"],
    story:
      "You're a producer in a wild Bollywood universe, bidding for stars, scripts, and scandals to create the next big hit. Will you go for the superstar with the massive price tag, or bet on the underdog script that might just surprise everyone? Every bid matters, every combo counts, and the most dramatic film wins.",
    howToPlay: [
      "Each round, reveal new cards representing actors, plot twists, and drama.",
      "Secretly bid using your limited budget to grab the best combos.",
      "Score points for complete film formulas and over-the-top combos.",
      "Outbid your rivals, make strategic alliances, and create the blockbuster that defines your legacy.",
    ],
    whatYoullLove: [
      "Strategic depth with Bollywood flair",
      "The thrill of secret bidding rounds",
      "Creating hilarious movie combos",
      "Perfect for groups who love a challenge",
    ],
    occasion: ["Game Night", "Party", "Family Time"],
    included: [
      "150+ character and plot cards",
      "Bidding chips",
      "Score trackers",
      "Rulebook",
    ],
    specifications: {
      "Players": "3-6",
      "Play Time": "30-60 minutes",
      "Age": "13+",
      "Difficulty": "Medium",
      "Components": "180+ pieces",
    },
  },
  {
    id: "4",
    name: "One More Round | Jigsaw Puzzle",
    slug: "one-more-round",
    price: 499,
    originalPrice: 649,
    category: "Puzzle",
    image: "/products/one-more-round.png",
    badges: ["Trending", "Sale"],
    description:
      "A cozy, beautifully illustrated jigsaw puzzle inspired by late-night card tables and 'just one more round' energy.",
    images: ["/products/one-more-round.png", "/products/one-more-round.png", "/products/one-more-round.png"],
    rating: 4.5,
    reviews: 41,
    features: ["500 Pieces", "Relaxing", "Frame-worthy Art"],
    story:
      "Inspired by real Joy Juncture game nights, this puzzle captures that 2AM moment when everyone says they'll sleep — after one more round. Every piece tells a story of laughter, strategy, and that perfect moment when time stands still and all that matters is the game.",
    howToPlay: [
      "Spread out the pieces, pick a good playlist, and start with the edges.",
      "Group similar colors, objects, and patterns together.",
      "Take snack breaks. Argue over who 'actually found that piece first'. Repeat.",
      "Frame it, gift it, or start all over again. The joy is in the journey.",
    ],
    whatYoullLove: [
      "Beautiful, frame-worthy artwork",
      "Perfect for solo relaxation or group bonding",
      "High-quality pieces that fit perfectly",
      "A conversation starter when displayed",
    ],
    occasion: ["Relaxation", "Gift", "Solo Time"],
    included: [
      "500 premium puzzle pieces",
      "Reference poster",
      "Reusable storage bag",
    ],
    specifications: {
      "Pieces": "500",
      "Size": "50 x 70 cm (completed)",
      "Age": "12+",
      "Difficulty": "Medium",
      "Material": "Premium cardboard",
    },
  },
  {
    id: "5",
    name: "The Bloody Inheritance | Murder Mystery Case File",
    slug: "bloody-inheritance",
    price: 999,
    originalPrice: 1999,
    category: "Mystery",
    image: "/products/bloody-inheritance.jpeg",
    badges: ["Limited Edition", "Sale"],
    description:
      "A cinematic murder mystery experience in a box. Study the evidence, interrogate alibis, and find the killer before they strike again.",
    images: ["/products/bloody-inheritance.jpeg", "/products/bloody-inheritance.jpeg", "/products/bloody-inheritance.jpeg"],
    rating: 4.9,
    reviews: 57,
    features: ["1-6 Players", "90-180 Mins", "Ages 16+"],
    story:
      "A wealthy patriarch is dead. A tangled web of relatives, secrets, and motives stands between you and the truth. Every document tells a story. Every alibi has a hole. Every suspect has something to hide. Can you piece together the puzzle before the evidence is lost forever?",
    howToPlay: [
      "Open the case file and lay out all documents, photos, and clues.",
      "Read character statements, timelines, and forensic details carefully.",
      "Work alone or with friends to build theories, eliminate suspects, and name the killer.",
      "Cross-reference evidence, question motives, and solve the mystery that has stumped investigators.",
    ],
    whatYoullLove: [
      "Immersive storytelling that pulls you in",
      "Real detective work with actual evidence",
      "Perfect for mystery lovers and puzzle solvers",
      "Replayable with different outcomes",
    ],
    occasion: ["Game Night", "Date Night", "Special Occasion"],
    included: [
      "Case file with all documents",
      "Character photos and profiles",
      "Evidence cards",
      "Solution envelope",
    ],
    specifications: {
      "Players": "1-6",
      "Play Time": "90-180 minutes",
      "Age": "16+",
      "Difficulty": "Challenging",
      "Components": "50+ pieces",
    },
  },
  {
    id: "6",
    name: "Judge Me & Guess",
    slug: "judge-me-and-guess",
    price: 999,
    originalPrice: 1499,
    category: "Party Game",
    image: "/products/judge-me-and-guess.png",
    badges: ["Sale"],
    description:
      "A hilarious party game where you judge your friends and guess their answers. Reveal secrets, share opinions, and discover who knows you best.",
    images: ["/products/judge-me-and-guess.png", "/products/judge-me-and-guess.png", "/products/judge-me-and-guess.png"],
    rating: 4.7,
    reviews: 95,
    features: ["3-8 Players", "30-60 Mins", "Ages 16+"],
    story:
      "Ever wondered what your friends really think about you? Or how well they know your deepest secrets? Judge Me & Guess is the game that brings out the truth, the laughs, and the 'I can't believe you said that!' moments. It's part confession, part guessing game, and 100% hilarious.",
    howToPlay: [
      "Each round, one player draws a question card and answers it secretly.",
      "Other players guess what the player answered and write down their predictions.",
      "Reveal the answers and see who knows each other best.",
      "Score points for correct guesses and prepare for the most entertaining revelations.",
    ],
    whatYoullLove: [
      "Discover hilarious truths about your friends",
      "Perfect ice-breaker for any group",
      "Gets everyone talking and laughing",
      "Reveals who really knows you best",
    ],
    occasion: ["Party", "Game Night", "Birthday", "Get Together"],
    included: [
      "200+ question cards",
      "Answer pads",
      "Scoring sheets",
      "Rulebook",
    ],
    specifications: {
      "Players": "3-8",
      "Play Time": "30-60 minutes",
      "Age": "16+",
      "Difficulty": "Easy",
      "Components": "250+ pieces",
    },
  },
  {
    id: "7",
    name: "Buzzed – The Drinking Card Game",
    slug: "buzzed",
    price: 299,
    originalPrice: 599,
    category: "Party Game",
    image: "/products/buzzed.jpeg",
    badges: ["Sale"],
    description:
      "A fast, hilarious drinking game that turns any chill hang into absolute chaos. Best played with responsible adults.",
    images: ["/products/buzzed.jpeg", "/products/buzzed.jpeg", "/products/buzzed.jpeg"],
    rating: 4.4,
    reviews: 63,
    features: ["3-10 Players", "15-30 Mins", "Ages 18+"],
    story:
      "Designed for house parties, after-parties, and that one friend who always says 'light drinks only' and then regrets everything. This is the game that turns 'just one drink' into stories you'll tell for years (or try to forget).",
    howToPlay: [
      "Take turns drawing prompt cards and reading them out loud.",
      "If a prompt applies to you, your friends, or the group, follow the instructions.",
      "Laugh, sip, and pace yourself — the game is fun, not a race.",
      "Play responsibly, know your limits, and remember: the best memories come from the best moments, not the most drinks.",
    ],
    whatYoullLove: [
      "Instant party starter",
      "Gets everyone laughing immediately",
      "Perfect for breaking the ice",
      "Hilarious prompts that reveal secrets",
    ],
    occasion: ["Party", "House Party", "Birthday"],
    included: [
      "150+ prompt cards",
      "Rule variations",
      "Responsible drinking guide",
    ],
    specifications: {
      "Players": "3-10",
      "Play Time": "15-30 minutes",
      "Age": "18+",
      "Difficulty": "Super Easy",
      "Components": "150+ pieces",
    },
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}


