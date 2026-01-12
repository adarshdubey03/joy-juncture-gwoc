"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost, updateBlogPost } from "@/actions/blog-actions";
import { ContentStatus } from "@/generated/prisma"; // Adjust import
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import Image from "next/image";

type BlogData = {
    id?: string;
    title: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    status: ContentStatus;
};

export function BlogForm({ initialData }: { initialData?: BlogData }) {
    const router = useRouter();
    const [formData, setFormData] = useState<BlogData>(initialData || {
        title: "",
        content: "",
        excerpt: "",
        featuredImage: "",
        status: "DRAFT" as ContentStatus,
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            if (initialData?.id) {
                // Update
                const result = await updateBlogPost(initialData.id, formData);
                if (!result.success) throw new Error(result.error);
            } else {
                // Create
                const result = await createBlogPost({
                    ...formData,
                    tags: [] // future support
                });
                if (!result.success) throw new Error(result.error);
            }
            router.push("/admin/blogs");
        } catch (error: any) {
            alert(error.message || "Failed to save");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between">
                <Link href="/admin/blogs" className="flex items-center text-sm text-gray-500 hover:text-black">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Link>
                <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-md hover:bg-neutral-800 disabled:opacity-50"
                >
                    <Save className="w-4 h-4" />
                    {isSaving ? "Saving..." : "Save Post"}
                </button>
            </div>

            <div className="space-y-4 bg-white p-6 rounded-lg border shadow-sm">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full text-2xl font-bold border-0 border-b border-gray-200 px-0 py-2 focus:ring-0 focus:border-black placeholder:text-gray-300"
                        placeholder="Enter post title..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value as ContentStatus })}
                            className="w-full border rounded-md px-3 py-2"
                        >
                            <option value="DRAFT">Draft</option>
                            <option value="PUBLISHED">Published</option>
                            <option value="ARCHIVED">Archived</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Cover Image URL</label>
                        <input
                            type="text"
                            value={formData.featuredImage || ""}
                            onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                            className="w-full border rounded-md px-3 py-2"
                            placeholder="https://..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                    <textarea
                        rows={3}
                        value={formData.excerpt || ""}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        className="w-full border rounded-md px-3 py-2 resize-none"
                        placeholder="Brief summary for cards and SEO..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Content (HTML allowed)</label>
                    <textarea
                        rows={15}
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full border rounded-md px-3 py-2 font-mono text-sm"
                        placeholder="# Write your content here..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Supports basic HTML or Markdown if you render it so.</p>
                </div>
            </div>
        </form>
    );
}
