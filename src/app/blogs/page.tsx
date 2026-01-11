import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { ArrowRight } from "lucide-react";

// Force dynamic to ensure fresh data if new blogs are added
export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = await db.blog.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  return (
    <main className="min-h-screen bg-[#FFF4D6] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('/contour-pattern.svg')] bg-repeat bg-[length:600px_auto] mix-blend-multiply" />

      {/* Header */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto relative z-10">
        <h1 className="text-6xl md:text-7xl font-fredoka font-black mb-6 text-black tracking-tight">
          The JJ Journal
        </h1>
        <p className="text-neutral-700 max-w-2xl text-xl font-medium leading-relaxed">
          Stories, thoughts, and ideas around games, play, human connection, and
          unforgettable experiences.
        </p>
      </section>

      {/* Grid */}
      <section className="pb-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col gap-16">
          {blogs.map((blog, index) => {
            const isReversed = index % 2 !== 0;

            return (
              <article key={blog.id}>
                <div
                  className={`flex flex-col md:flex-row ${isReversed ? "md:flex-row-reverse" : ""
                    } bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-neutral-100/50`}
                >
                  {/* Image */}
                  <div className="relative w-full md:w-[45%] h-[300px] md:h-auto overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-[55%] p-8 md:p-14 flex flex-col justify-center bg-white">
                    <span className="text-neutral-500 font-bold text-sm tracking-widest uppercase mb-4">
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>

                    <h2 className="text-3xl md:text-4xl font-fredoka text-black mb-3 leading-tight">
                      {blog.title}
                    </h2>

                    {blog.subtitle && (
                      <h3 className="text-lg md:text-xl font-medium text-neutral-400 mb-6 font-fredoka">
                        {blog.subtitle}
                      </h3>
                    )}

                    <p className="text-neutral-600 leading-relaxed text-lg mb-8 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#F4C752] text-black font-bold text-lg hover:opacity-90 transition-opacity w-fit"
                    >
                      Read Article
                      <ArrowRight size={20} />
                    </Link>
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
