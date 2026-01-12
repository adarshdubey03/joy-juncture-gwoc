import { db } from "@/lib/db";
import { BlogForm } from "../blog-form";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await db.content.findUnique({
        where: { id: id }
    });

    if (!blog) notFound();

    return (
        <BlogForm initialData={{
            id: blog.id,
            title: blog.title,
            content: blog.body,
            excerpt: blog.excerpt || "",
            featuredImage: blog.featuredImage || "",
            status: blog.status
        }} />
    );
}
