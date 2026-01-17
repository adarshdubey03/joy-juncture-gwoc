import { getBlogDashboardStats, getTopPosts, getScheduledPosts } from "@/actions/blog-actions";
import { BlogStats } from "@/components/admin/blogs/blog-stats";
import { TopPosts } from "@/components/admin/blogs/top-posts";
import { ContentCalendar } from "@/components/admin/blogs/content-calendar";
import { QuickActions } from "@/components/admin/blogs/quick-actions";
import { BlogList } from "./blog-list";
import { db } from "@/lib/db";
import { Separator } from "@/components/ui/separator";

export default async function AdminBlogsPage() {
    const stats = await getBlogDashboardStats();
    const topPosts = await getTopPosts();
    const scheduledPosts = await getScheduledPosts();

    // Fetch all blogs for the detailed list below (existing functionality)
    const allBlogs = await db.content.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            author: { select: { name: true } }
        },
        take: 10 // Limit for initial view? Or full list? Keeping full list or paginated in real app.
    });

    return (
        <div className="space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#2E2A24]">Blog Admin Studio</h2>
            </div>

            {/* 1. KEY METRICS */}
            <BlogStats stats={stats} />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {/* 2. TOP POSTS */}
                <TopPosts posts={topPosts} />

                {/* 3. CALENDAR */}
                <ContentCalendar scheduledPosts={scheduledPosts} />

                {/* 4. QUICK ACTIONS */}
                <QuickActions />
            </div>

            <Separator className="my-6" />

            {/* 5. EXISTING LIST VIEW */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold tracking-tight">Recent Posts</h3>
                <div className="rounded-md border bg-white shadow-sm">
                    <div className="p-4">
                        <BlogList blogs={allBlogs} />
                    </div>
                </div>
            </div>
        </div>
    );
}
