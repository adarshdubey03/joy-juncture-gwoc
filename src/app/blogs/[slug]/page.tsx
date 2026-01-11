import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const blog = await db.blog.findUnique({
        where: { slug },
    });

    if (!blog) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white relative">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-[60vh] bg-[#FFF4D6] rounded-b-[4rem] -z-10" />

            <article className="max-w-4xl mx-auto px-6 py-32 relative">
                <Link
                    href="/blogs"
                    className="inline-flex items-center gap-2 text-neutral-500 font-medium mb-12"
                >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
                        <ArrowLeft size={16} />
                    </div>
                    Back to Journal
                </Link>

                {/* Header */}
                <header className="mb-12 text-center">
                    <span className="text-black font-extrabold tracking-widest uppercase text-sm mb-6 block">
                        {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-fredoka text-black mb-6 leading-tight">
                        {blog.title}
                    </h1>
                    {blog.subtitle && (
                        <p className="text-2xl text-neutral-500 font-medium font-fredoka">
                            {blog.subtitle}
                        </p>
                    )}
                </header>

                {/* Feature Image */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-sm mb-16 border border-neutral-100">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Content Body */}
                <div className="prose prose-lg md:prose-xl prose-neutral mx-auto 
                    prose-headings:font-fredoka prose-headings:font-bold prose-headings:text-black prose-headings:tracking-tight prose-headings:mt-12 prose-headings:mb-6
                    prose-p:text-neutral-700 prose-p:leading-loose prose-p:mb-6
                    prose-strong:text-black prose-strong:font-bold
                    prose-ul:list-disc prose-ul:pl-6 prose-li:text-neutral-700 prose-li:mb-2
                    prose-a:text-[#F4C752] prose-a:no-underline hover:prose-a:underline
                    prose-img:rounded-3xl prose-img:shadow-lg prose-img:my-10
                    prose-blockquote:border-l-4 prose-blockquote:border-[#F4C752] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-neutral-50 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-xl">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </article>

            {/* Footer CTA */}
            <section className="bg-[#1F1B16] py-24 text-center mt-24">
                <div className="max-w-2xl mx-auto px-6">
                    <h2 className="text-4xl font-fredoka text-white mb-6">Loved reading this?</h2>
                    <p className="text-neutral-400 text-lg mb-8">
                        Check out our shop for games that bring these stories to life.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block bg-[#F4C752] text-black font-bold text-lg px-8 py-4 rounded-full hover:opacity-90 transition-opacity"
                    >
                        Visit Shop
                    </Link>
                </div>
            </section>
        </main>
    );
}
