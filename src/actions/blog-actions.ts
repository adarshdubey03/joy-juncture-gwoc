"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { ContentStatus } from "@/generated/prisma"; // Adjust based on your generation path

export async function createBlogPost(data: {
    title: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    status: ContentStatus;
    tags?: string[];
}) {
    try {
        const session = await auth();
        if (!session?.user?.id) return { error: "Unauthorized" };

        const slug = data.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

        // Check unique slug
        const existing = await db.content.findUnique({ where: { slug } });
        const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

        await db.content.create({
            data: {
                title: data.title,
                slug: finalSlug,
                body: data.content, // Map content to body
                excerpt: data.excerpt,
                featuredImage: data.featuredImage,
                status: data.status,
                authorId: session.user.id,
                publishedAt: data.status === "PUBLISHED" ? new Date() : null,
                // Handle tags if needed, implementation depends on Schema relations
                // for now ignoring tags relation since it needs connect/create logic and I don't see tag IDs
            }
        });

        revalidatePath("/admin/blogs");
        revalidatePath("/blogs");
        return { success: true };
    } catch (error) {
        console.error("Create Blog Error", error);
        return { error: "Failed to create blog post" };
    }
}

export async function updateBlogPost(id: string, data: {
    title: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    status: ContentStatus;
}) {
    try {
        const session = await auth();
        if (!session?.user?.id) return { error: "Unauthorized" };

        await db.content.update({
            where: { id },
            data: {
                title: data.title,
                body: data.content,
                excerpt: data.excerpt,
                featuredImage: data.featuredImage,
                status: data.status,
                // Update publishedAt only if switching to PUBLISHED? Or keep original?
                // Usually keep original if already set.
            }
        });

        revalidatePath("/admin/blogs");
        revalidatePath("/blogs");
        return { success: true };
    } catch (error) {
        console.error("Update Blog Error", error);
        return { error: "Failed to update blog post" };
    }
}

// ... existing deleteBlogPost function ...

export async function deleteBlogPost(id: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) return { error: "Unauthorized" };

        await db.content.delete({ where: { id } });

        revalidatePath("/admin/blogs");
        revalidatePath("/blogs");
        return { success: true };
    } catch (error) {
        console.error("Delete Blog Error", error);
        return { error: "Failed to delete blog post" };
    }
}

export async function getBlogDashboardStats() {
    try {
        const now = new Date();
        const [
            totalPosts,
            published,
            drafts,
            scheduled,
            viewsResult,
            allContent
        ] = await Promise.all([
            db.content.count(),
            db.content.count({ where: { status: "PUBLISHED", publishedAt: { lte: now } } }),
            db.content.count({ where: { status: "DRAFT" } }),
            db.content.count({ where: { publishedAt: { gt: now } } }),
            db.content.aggregate({ _sum: { viewCount: true } }),
            db.content.findMany({ select: { body: true } }) // For avg time calculation
        ]);

        // Calculate Average Read Time
        // Approx 200 words per minute
        let totalReadTimeSeconds = 0;
        allContent.forEach(post => {
            const wordCount = post.body ? post.body.split(/\s+/).length : 0;
            const readTimeSeconds = (wordCount / 200) * 60;
            totalReadTimeSeconds += readTimeSeconds;
        });
        const avgReadTime = allContent.length > 0 ? Math.round(totalReadTimeSeconds / allContent.length) : 0;

        // Note: Engagement and New Subs are not tracked in Content model yet. returning null or 0.

        return {
            totalPosts,
            published,
            drafts,
            scheduled,
            totalViews: viewsResult._sum.viewCount || 0,
            avgReadTimeSeconds: avgReadTime,
        };
    } catch (error) {
        console.error("Get Blog Stats Error", error);
        return {
            totalPosts: 0,
            published: 0,
            drafts: 0,
            scheduled: 0,
            totalViews: 0,
            avgReadTimeSeconds: 0
        };
    }
}

export async function getTopPosts(limit = 5) {
    try {
        const posts = await db.content.findMany({
            orderBy: { viewCount: "desc" },
            take: limit,
            select: {
                id: true,
                title: true,
                slug: true,
                viewCount: true,
                publishedAt: true,
            }
        });
        return posts;
    } catch (error) {
        console.error("Get Top Posts Error", error);
        return [];
    }
}

export async function getScheduledPosts() {
    try {
        const posts = await db.content.findMany({
            where: {
                publishedAt: {
                    gt: new Date()
                }
            },
            orderBy: { publishedAt: "asc" },
            take: 5,
            select: {
                id: true,
                title: true,
                slug: true,
                publishedAt: true,
                status: true
            }
        });
        return posts;
    } catch (error) {
        console.error("Get Scheduled Posts Error", error);
        return [];
    }
}
