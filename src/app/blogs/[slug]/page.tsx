import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import HeroNavbar from "@/components/hero/HeroNavbar";
import BigFooter from "@/components/BigFooter";
import { ArrowLeft } from "lucide-react";

export const revalidate = 60;

import Link from "next/link"; // Re-adding Link import as it was seemingly missing in the view above but used in code

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await db.content.findUnique({
        where: { slug: slug },
        select: { title: true, excerpt: true }
    });
    if (!post) return {};
    return {
        title: `${post.title} | Joy Juncture`,
        description: post.excerpt
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await db.content.findUnique({
        where: { slug: slug },
        include: {
            author: {
                select: { name: true, image: true }
            }
        }
    });

    if (!post || post.status !== "PUBLISHED") {
        // Allow admins to view drafts? For now, 404.
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <HeroNavbar />

            <article>
                {/* Hero / Header */}
                <div className="bg-[#FFF4D6] pt-32 pb-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        <Link href="/blogs" className="inline-flex items-center text-sm font-bold text-black/60 hover:text-black mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Stories
                        </Link>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 font-medium uppercase tracking-wider">
                            <span>{format(new Date(post.publishedAt!), "MMMM d, yyyy")}</span>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                                {post.author.image && (
                                    <Image src={post.author.image} width={24} height={24} className="rounded-full" alt="" />
                                )}
                                <span>{post.author.name}</span>
                            </div>
                        </div>

                        <h1 className="font-fredoka text-4xl md:text-6xl mb-6 leading-tight">
                            {post.title}
                        </h1>

                        {post.excerpt && (
                            <p className="text-xl text-neutral-700 leading-relaxed font-medium max-w-2xl">
                                {post.excerpt}
                            </p>
                        )}
                    </div>
                </div>

                {/* Cover Image */}
                {post.featuredImage && (
                    <div className="max-w-5xl mx-auto -mt-8 px-4 relative z-10">
                        <div className="aspect-[21/9] relative rounded-3xl overflow-hidden shadow-2xl">
                            <Image
                                src={post.featuredImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="max-w-3xl mx-auto px-4 py-16">
                    <div
                        className="prose prose-lg prose-yellow max-w-none md:prose-xl prose-img:rounded-2xl prose-headings:font-fredoka"
                        dangerouslySetInnerHTML={{ __html: post.body }}
                    />
                </div>
            </article>

            <BigFooter />
        </main>
    );
}
