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

export async function deleteBlogPost(id: string) {
    try {
        const session = await auth();
        if (!session?.user?.id) return { error: "Unauthorized" }; // Add Admin check ideally

        await db.content.delete({ where: { id } });

        revalidatePath("/admin/blogs");
        revalidatePath("/blogs");
        return { success: true };
    } catch (error) {
        console.error("Delete Blog Error", error);
        return { error: "Failed to delete blog post" };
    }
}
