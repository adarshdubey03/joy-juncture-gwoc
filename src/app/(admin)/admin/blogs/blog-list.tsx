"use client";

import { useState } from "react";
import { format } from "date-fns";
import { deleteBlogPost } from "@/actions/blog-actions";
import Link from "next/link";
import { Edit, Trash2, ExternalLink } from "lucide-react";

type Blog = {
    id: string;
    title: string;
    slug: string;
    status: string;
    publishedAt: Date | null;
    author: { name: string | null };
};

export function BlogList({ blogs }: { blogs: Blog[] }) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        setIsDeleting(id);
        const result = await deleteBlogPost(id);
        if (!result.success) {
            alert(result.error);
        }
        setIsDeleting(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                        <th className="px-4 py-3">Title</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Published</th>
                        <th className="px-4 py-3">Author</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                                No blog posts found. Create one to get started.
                            </td>
                        </tr>
                    ) : (
                        blogs.map((blog) => (
                            <tr key={blog.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="font-medium text-gray-900">{blog.title}</div>
                                    <div className="text-xs text-gray-500">/{blog.slug}</div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${blog.status === "PUBLISHED"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                        }`}>
                                        {blog.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {blog.publishedAt ? format(new Date(blog.publishedAt), "MMM d, yyyy") : "-"}
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {blog.author.name || "Unknown"}
                                </td>
                                <td className="px-4 py-3 text-right space-x-2 flex justify-end">
                                    <Link
                                        href={`/blogs/${blog.slug}`}
                                        target="_blank"
                                        className="text-gray-400 hover:text-blue-600"
                                        title="View Live"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        href={`/admin/blogs/${blog.id}`}
                                        className="text-gray-400 hover:text-blue-600"
                                        title="Edit"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        disabled={isDeleting === blog.id}
                                        className="text-gray-400 hover:text-red-600 disabled:opacity-50"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
