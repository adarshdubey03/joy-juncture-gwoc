"use server";

import { db } from "@/lib/db";
import { BlogList } from "./blog-list";
import Link from "next/link";
import { Plus } from "lucide-react";

export default async function AdminBlogsPage() {
    const blogs = await db.content.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: {
                select: { name: true }
            }
        }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
                <Link
                    href="/admin/blogs/new"
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-neutral-800 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    New Post
                </Link>
            </div>

            <div className="rounded-md border bg-white shadow-sm">
                <div className="p-4">
                    <BlogList blogs={blogs} />
                </div>
            </div>
        </div>
    );
}
