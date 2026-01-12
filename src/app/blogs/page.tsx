import { db } from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import HeroNavbar from "@/components/hero/HeroNavbar";
import BigFooter from "@/components/BigFooter";

export const revalidate = 60; // Revalidate every minute

export default async function BlogsPage() {
  const posts = await db.content.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    include: {
      author: {
        select: { name: true, image: true }
      }
    }
  });

  return (
    <main className="min-h-screen bg-[#FFF4D6]">
      <HeroNavbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-4 bg-gradient-to-b from-[#FFE5E5] to-[#FFF4D6]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="font-fredoka text-5xl md:text-6xl mb-6">Joyful Stories</h1>
          <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
            Tips, tales, and inspiration for creating unforgettable moments of connection.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link key={post.id} href={`/blogs/${post.slug}`} className="group">
              <article className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 h-full flex flex-col border-2 border-transparent hover:border-black/5">
                <div className="aspect-video relative bg-gray-100">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-fredoka text-4xl">JJ</div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">
                    <span>{post.publishedAt ? format(new Date(post.publishedAt), "MMM d, yyyy") : "Draft"}</span>
                    <span>•</span>
                    <span>{post.author.name}</span>
                  </div>
                  <h2 className="font-fredoka text-2xl mb-3 leading-tight group-hover:text-[#F4C752] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="text-[#F4C752] font-bold text-sm uppercase tracking-wide group-hover:underline">
                    Read Story
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-xl font-fredoka">No stories published yet.</p>
          </div>
        )}
      </section>

      <BigFooter />
    </main>
  );
}
