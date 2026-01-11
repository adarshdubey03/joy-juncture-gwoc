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
    image: "/blogs/DMD5.jpg",
  },
  {
    title: "Power Cards in Dead Man's Deck",
    excerpt:
      "Learn the meaning and effects of each Power Card in Dead Man's Deck. Use this guide to play smarter confuse opponents, and lower your score strategically",
    image: "/blogs/DMD4.jpg",
  },
  {
    title: "Gameplay questions answered Dead Man's Deck FAQS",
    excerpt:
      "Get answers to common gameplay doubts in Dead Man's Deck. Learn about discard rules, Power Card effects, game ending conditions, and scoring tie-breakers",
    image: "/blogs/DMD3.jpg",
  },
  {
    title: "How to play Dead Man's Deck?",
    excerpt:
      "Learn how to play Dead Man's Deck, a memory-based strategy card game by Joy Juncture. Understand the rules, setup, scoring, and special actions in this simple guide for first-time players",
    image: "/DMD.jpg",
  },
];

export default function BlogsPage() {
  return (
    <main className="min-h-screen bg-[#FFF4D6]">
      {/* Page Header */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-black">
          The JJ Blog journal
        </h1>
        <p className="text-gray-600 max-w-2xl text-lg">
          Stories, thoughts, and ideas around games, play, human connection, and
          unforgettable experiences.
        </p>
      </section>

      {/* Blog List */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-32">
          {blogs.map((blog, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <article
                key={index}
                className={`relative flex ${
                  isReversed ? "justify-end" : "justify-start"
                }`}
              >
                {/* Visual Wrapper */}
                <div className="relative w-full md:w-[85%] h-[420px]">
                  {/* Image */}
                  <div
                    className={`absolute top-0 ${
                      isReversed ? "right-0" : "left-0"
                    } w-[45%] h-full rounded-3xl overflow-hidden z-10`}
                  >
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Black Content Box */}
                  <div
                    className={`absolute top-[-5px] bottom-[-5px] ${
                      isReversed ? "left-0 pr-[45%]" : "right-0 pl-[45%]"
                    } bg-[#161616] rounded-3xl p-10 md:p-14 shadow-xl flex flex-col justify-center`}
                  >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                      {blog.title}
                    </h2>

                    <p className="text-gray-400 leading-relaxed mb-10">
                      {blog.excerpt}
                    </p>

                    <button className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FFD84D] text-black font-semibold hover:scale-105 transition w-fit">
                      Read more
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
