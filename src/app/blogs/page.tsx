import Image from "next/image";

const blogs = [
  {
    title: "Murder Mystery Game Night at Primarc Pecan HO, Mumbai",
    excerpt:
      "When Primarc Pecan’s Head Office in Mumbai wanted to break the monotony of a regular workday and bring their teams together, they called Joy Juncture...",
    image: "/blogs/MurderMysteryGameNight.jpg",
  },
  {
    title: "Haus of Joy: A play-trip to Udaipur",
    excerpt:
      "Joy Juncture x Pickle Haus curated Haus of Joy; a 3-day play trip to Udaipur with 30 strangers, JJ original Jord games, pickleball tournaments, late-night dancing, and unforgettable bonding. Read...",
    image: "/blogs/UdaipurTrip.webp",
  },
  {
    title: "Creative ways to play Dead Man’s Deck",
    excerpt:
      "Explore exciting twists to Dead Man's Deck! From party modes to money pots, food dares, and new scoring twists, here are alternate ways to keep the game fresh, competitive, and...",
    image: "/blogs/blog-2.jpg",
  },
  {
    title: "Power Cards in Dead Man's Deck",
    excerpt:
      "Learn the meaning and effects of each Power Card in Dead Man's Deck. Use this guide to play smarter confuse opponents, and lower your score strategically",
    image: "/blogs/blog-2.jpg",
  },
   {
    title: "Gameplay questions answered Dead Man's Deck FAQS",
    excerpt:
      "Get answers to common gameplay doubts in Dead Man's Deck. Learn about discard rules, Power Card effects, game ending conditions, and scoring tie-breakers",
    image: "/blogs/blog-2.jpg",
  },
   {
    title: "How to play Dead Man's Deck?",
    excerpt:
      "Learn how to play Dead Man's Deck, a memory-based strategy card game by Joy Juncture. Understand the rules, setup, scoring, and special actions in this simple guide for first-time players",
    image: "/blogs/blog-2.jpg",
  },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#0E0E0E] text-white">
      {/* Page Header */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          The JJ Blog journal
        </h1>
        <p className="text-gray-400 max-w-2xl text-lg">
          Stories, thoughts, and ideas around games, play, human connection, and
          unforgettable experiences.
        </p>
      </section>

      {/* Blog List */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-24">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="flex flex-col md:flex-row items-center gap-12"
            >
              {/* Image */}
              <div className="w-full md:w-1/2 relative h-90">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>

              {/* Content Block */}
              <div className="w-full md:w-1/2 bg-[#161616] rounded-3xl p-10 md:p-14 shadow-xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {blog.title}
                </h2>

                <p className="text-gray-400 leading-relaxed mb-10">
                  {blog.excerpt}
                </p>

                <button className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FFD84D] text-black font-semibold hover:scale-105 transition">
                  Read more
                  <span className="text-lg">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
